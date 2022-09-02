import { google } from 'googleapis';

export async function getSheetContent() {
    try {
        const range = 'A1:J9';
    
        const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
        const sheets = google.sheets({ version: 'v4', auth });
        
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range,
        });

        const content = response.data.values;

        if (content.length){
            return content.map((task) => ({
                id: task[0],
                created_at: task[1],
                title: task[2],
                description: task[3],
                status: task[4]
            }))
        }

    } catch (error) {
        console.log(error);
    }
    return [];
}
