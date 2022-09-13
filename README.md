## Simple ToDo app 
### Used NextJS with Google Spreadsheets as Database

First of all, you need create your project on google cloud, you can visit through this [link](https://console.developers.google.com/projectcreate) for that.

On APIs & Services page, enable  [Google Sheets API](https://console.cloud.google.com/apis/api/sheets.googleapis.com).
After that, you need create your credentials (Service Account) on [Credencials page](https://console.cloud.google.com/iam-admin/serviceaccounts/create). Copy the mail you'll see under Service Account.

On Service Account page, click on ADD KEY, choose JSON as type. Then your credentials will be automatically downloaded. This contain the credencials to connect the next app.

Now you can create a new spreadsheet, and add this header << id, created_at, title, description, status >>, then, shere with service account mail you copied before.

### Environment variables

Complete you .env file with the keys on JSON file downloaded.
You can get the spreadsheet id on the url ( htps://docs.google.com/spreadsheets/d/__1IciJtr0y46tAaVQMQJr9KVEdkwgOFMXQosURItkQSRw__/edit )

```
GOOGLE_SHEETS_PRIVATE_KEY=[YOUR KEY]
GOOGLE_SHEETS_CLIENT_EMAIL=[YOUR ACCOUNT EMAIL]
SPREADSHEET_ID=[YOU CAN GET THIS ON URL OF YOUR SHEETS]
SPREADSHEET_NAME=[SHEET NAME]
```

---
### Run the project

Remember install dependencies 

```bash
npm i
```

and run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you choose 'ToDo whitout persistence' (_/use-context/..._), your task will be lost when you refresh the page.
If you choose 'ToDo with google sheets' (_/sheets/..._), your task will be saved on your google spreadsheet.



---

### Testing

This project use cypress for testing.

```bash
npm run dev
&&
npm run cyress
```
after that, you can see the cypress interface and select _E2E testing_ testing type. Select chrome browser and go to _cypress/e2e/integration/app.spec.cy.js_ and run the test.
