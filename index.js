/* eslint-disable no-unused-vars */
import puppeteer from "puppeteer";
import fs from "fs/promises";

const archivoFinal = "lessons" + ".json";

async function handleDynamicWebPage() {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 100,
  });
  const page = await browser.newPage();
  const opt = { from: "en", to: "es", timeout: 1000, headless: true };
  await page.goto(
    "https://education.lego.com/es-mx/lessons/?products=WeDo+2.0+Core+Set"
  );

  const cokiesButon = await page.waitForSelector(".sc-m0v8m0-9"); // Asegúrate de reemplazar esto con el selector de CSS correcto.
  await cokiesButon.click();
  await page.waitForSelector(".sc-1k8yoot-1"); // Asegúrate de reemplazar esto con el selector de CSS correcto.
  await page.waitForSelector('button[data-testid="load-more-button"]'); // Asegúrate de reemplazar esto con el selector de CSS correcto.

  for (let i = 0; i <= 2; i++) {
    //37 = 467 -> 12 = 163 -> 3 = 49 -> 3 = 52 -> 4 = 65 -> 10 = 141
    const res = await page.$$('button[data-testid="load-more-button"]');
    if (res[0]) {
      await res[0].click();
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }

  await autoScroll(page);

  // await new Promise((resolve) => setTimeout(resolve, 100000));

  const data = await page.evaluate(() => {
    const quotes = document.querySelectorAll(".sc-1k8yoot-1");

    const data = [...quotes].map((quote) => {
      const redir = quote.href;
      const catTitle = quote.querySelector(".sc-1k8yoot-7").innerText;
      const title = quote.querySelector(".sc-1k8yoot-3").innerText;
      const subtitle = quote.querySelector(".sc-1k8yoot-4").innerText;
      const description = quote.querySelector(
        ".sc-jnOGJG > .ukqtbd0"
      ).innerText;
      const categories = quote.querySelector(".sc-1k8yoot-8").innerText;

      const tags = quote.querySelectorAll(".sc-1k8yoot-11 ");
      const duration = tags[0].innerText;
      const level = tags[1].innerText;
      const grade = "Primaria Alta 9 - 11"; //tags[2].innerText;

      const urlImg = quote.querySelector("img")
        ? quote.querySelector("img").src
        : null;

      return {
        redir,
        catTitle,
        title,
        subtitle,
        description,
        categories,
        duration,
        level,
        grade,
        urlImg,
      };
    });

    return data;
  });

  console.log("***** exported " + data.length + " lesson's info ******");
  fs.writeFile(archivoFinal, JSON.stringify(data, null, 2));

  await browser.close();
}

handleDynamicWebPage();

async function autoScroll(page) {
  await page.evaluate(async () => {
    window.scrollTo(0, 0);

    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}
