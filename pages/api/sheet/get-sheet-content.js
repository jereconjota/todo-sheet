import { google } from 'googleapis';

export default async function getSheetContent(req, res) {
    try {

        //Auth client
        // const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
        //Auth jwt
        const target = ["https://www.googleapis.com/auth/spreadsheets"];
        const jwt = new google.auth.JWT(
          process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
          null,
          (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
          target
        );

        const sheets = google.sheets({ version: 'v4', auth:jwt });
        
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: process.env.SPREADSHEET_RANGE,
        });
        const content = response.data.values;

        if (content.length){
            const response = content.map((task) => ({
                id: task[0],
                created_at: task[1],
                title: task[2],
                description: task[3],
                status: task[4]
            }))
            res.status(200).json(response.slice(1, response.length))
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Ocurrio un error inesperado')
    }
}
