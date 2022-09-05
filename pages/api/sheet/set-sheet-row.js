import { google } from 'googleapis';
import { v4 as uuid } from "uuid";

export default async function getSheetRow(req, res) {
    try {
        const range = 'A1:F1000';
        const { title, description, status } = JSON.parse(req.body);
        console.log(req.body);


        const valueInputOption = 'USER_ENTERED';

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

        const timeElapsed = Date.now();
        const now = new Date(timeElapsed);

        let values = [
            [uuid(), now.toISOString(), title, description, status]
        ]
        const resource = {
            values,
        }

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: process.env.SPREADSHEET_RANGE,
            valueInputOption,
            resource
        });

        console.log('%d cells created.', response.data.updates.updatedCells);

        res.status(200).json(response)

    } catch (error) {
        console.log(error.message);
        res.status(500).json('Ocurrio un error inesperado')
    }
}
