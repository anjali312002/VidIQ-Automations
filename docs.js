const { google } = require("googleapis");
require("dotenv").config();

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/documents"],
});

const docs = google.docs({ version: "v1", auth });

module.exports = {
  appendToDoc: async (text) => {
    await docs.documents.batchUpdate({
      documentId: process.env.DOC_ID,
      requestBody: {
        requests: [
          {
            insertText: {
              text: text + "\n",
              location: { index: 1 },
            },
          },
        ],
      },
    });
  },
};
