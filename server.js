require("dotenv").config();
const { readSheet, writeRow } = require("./sheets");
const { appendToDoc } = require("./docs");
const { scrapeVidIQ } = require("./vidiqScraper");

async function main() {
  const rows = await readSheet();
  console.log("Rows fetched:", rows);


  for (let i = 0; i < rows.length; i++) {
    const [keyword, vidiqUrl] = rows[i];
    const rowNumber = i + 2;

    if (!keyword || !vidiqUrl) continue;

    console.log("Scraping:", keyword);

    const data = await scrapeVidIQ(vidiqUrl, keyword);

    await writeRow(rowNumber, [data.volume, data.competition, data.score]);

    const docText = `${keyword} | Volume: ${data.volume} | Competition: ${data.competition} | Score: ${data.score}`;

    await appendToDoc(docText);

    console.log("Done:", keyword);
  }
}

main();
