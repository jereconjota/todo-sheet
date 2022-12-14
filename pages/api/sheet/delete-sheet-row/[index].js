import { google } from 'googleapis';

export default async function deleteSheetRow(req, res) {
    try {
        const index = parseInt(req.query.index) + 2;
        const valueInputOption = 'USER_ENTERED';
        
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


        //POST https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:clear  //BORRA CONTENIDO SIN BORRAR FILA
        // const response = await sheets.spreadsheets.values.clear({
        //     spreadsheetId: process.env.SHEET_ID,
        //     range,
        // });
        // console.log(response.data);

        const resource = {
            "requests": [
                {
                    "deleteDimension": {
                        "range": {
                            "sheetId": 0,
                            "dimension": "ROWS",
                            "startIndex": index - 1,
                            "endIndex": index
                        }
                    }
                }
            ],
        }

        const response = await sheets.spreadsheets.batchUpdate({
            spreadsheetId: process.env.SPREADSHEET_ID,
            resource: resource
        });

        // const response = await sheets.spreadsheets.get({  //con este endpoint conseguimos el sheetId
        //     spreadsheetId: process.env.SHEET_ID,
        // });
        // console.log(response.data.sheets);


        res.status(200).json(response.data)

    } catch (error) {
        console.log(error.message);
        res.status(500).json('Ocurrio un error inesperado')
    }
}