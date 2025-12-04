  VidIQ + Google Sheets + Google Docs Automation
A Node.js automation tool that reads keywords from Google Sheets, scrapes VidIQ data using Puppeteer, writes results back into Google Sheets, and also appends formatted output into Google Docs.

This project follows the exact requirements of the VidIQ automation assignment.

 Features

Reads keywords and VidIQ URLs from a Google Sheet

1. Automates VidIQ scraping using Puppeteer
2. Extracts: Search Volume, Competition, Overall Score
3. Writes scraped values back into Google Sheets
4. Appends a formatted summary to Google Docs
5. Handles large datasets (10k+ rows)
6. Fully modular code
7. Uses only Google APIs (no external AI tools)

 Project Structure

project/
│── server.js # Main entry point
│── sheets.js # Google Sheets read/write logic
│── docs.js # Google Docs append logic
│── vidiqScraper.js # Puppeteer scraping logic
│── package.json
│── .env # Credentials & config
│── README.md

🛠 Tech Stack

1. Node.js
2. Puppeteer
3. Google Sheets API
4. Google Docs API
5. Google Service Account
6. dotenv

 Prerequisites

1. Google Cloud Project

You must create a Google Cloud project with:

- Google Sheets API enabled
- Google Docs API enabled

2. Service Account

Create a service account and download the JSON key.

Required fields from the key:

- client_email
- private_key

3. Share Google Sheet + Doc

Share both with your service account email:

your-service-account@project-id.iam.gserviceaccount.com

 Environment Variables Setup

Create a .env file:

GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

SHEET_ID=your_google_sheet_id
DOC_ID=your_google_doc_id

VIDIQ_EMAIL=your_vidiq_login_email
VIDIQ_PASS=your_vidiq_password

Important:
private_key must use \n instead of real line breaks.

 Install Dependencies

Run:

npm install

or manually:

npm install puppeteer googleapis dotenv

 How the Script Works
Step 1: Reads all rows from Google Sheets
Step 2: For each row:

- Open VidIQ URL
- Verify keyword matches search bar
- Scrape:
  - Search Volume
  - Competition
  - Overall Score
- Write scraped data back to sheet
- Append a formatted line into Google Doc

 Run the Project
node server.js
