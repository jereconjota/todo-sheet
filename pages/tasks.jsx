// import { google } from 'googleapis';

// export async function getServerSideProps({ query }) {

//     const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

//     const sheets = google.sheets({ version: 'v4', auth });


// }


import { google } from 'googleapis';

export default function Post({ content }) {
    return <article>

        {content.map((item,i)=>(
            <p key={i}>{item}</p>
        ))}
    </article>
}


export async function getServerSideProps({ query }) {

    // const { id } = query;
    const range = 'A1:J1000';

    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range,
    });
    console.log(response.data);
    const content = response.data.values;

    return {
        props: {
            content
        }
    }
}
