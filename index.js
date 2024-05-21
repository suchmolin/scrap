import puppeteer from "puppeteer";

async function handleDynamicWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
  });
  const page = await browser.newPage();
  await page.goto("https://education.lego.com/en-us/lessons/");
  await page.waitForSelector(".sc-1k8yoot-1"); // Asegúrate de reemplazar esto con el selector de CSS correcto.
  await page.waitForSelector('[data-testid="load-more-button"]'); // Asegúrate de reemplazar esto con el selector de CSS correcto.
  await page.click('[data-testid="load-more-button"]');

  if (page.queryObjects("Showing")) {
    console.log("yes----------------------------");
  }

  const data = await page.evaluate(() => {
    const quotes = document.querySelectorAll(".sc-1k8yoot-1");
    const data = [...quotes].map((quote) => {
      const quoteText = quote.querySelector(".sc-1k8yoot-3").innerText;
      return quoteText;
    });

    return data;
  });
  console.log(data);
  await browser.close();
}

handleDynamicWebPage();
