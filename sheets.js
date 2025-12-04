const { google } = require("googleapis");
require("dotenv").config();

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

module.exports = {
  readSheet: async () => {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "Sheet1!A2:F",
    });
    return res.data.values || [];
  },

  writeRow: async (rowIndex, values) => {
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.SHEET_ID,
      range: `Sheet1!D${rowIndex}:F${rowIndex}`,
      valueInputOption: "RAW",
      resource: { values: [values] },
    });
  },
};
