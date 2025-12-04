const puppeteer = require("puppeteer");

module.exports = {
  scrapeVidIQ: async (url, keyword) => {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    console.log("Page loaded. Looking inside the keywords table...");

    // Wait for keyword table rows
    await page.waitForSelector("table tbody tr", { timeout: 30000 });

    // Find the row containing the keyword
    const rows = await page.$$("table tbody tr");

    let volume = null;
    let change = null;

    for (let row of rows) {
      const rowKeyword = await row.$eval("td:nth-child(1)", el => el.textContent.trim().toLowerCase());
      
      if (rowKeyword.includes(keyword.toLowerCase())) {
        volume = await row.$eval("td:nth-child(2)", el => el.textContent.trim());
        change = await row.$eval("td:nth-child(3)", el => el.textContent.trim());
        break;
      }
    }

    if (!volume) {
      console.log("Keyword not found in table:", keyword);
      await browser.close();
      return { volume: 0, competition: 0, score: 0 };
    }

    console.log("Scraped:", { volume, change });

    await browser.close();

    return {
      volume: Number(volume.replace(/\D/g, "")),
      competition: 0, // not available in free plan
      score: 0        // not available in free plan
    };
  }
};
