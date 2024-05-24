/* eslint-disable no-unused-vars */
import puppeteer from "puppeteer";
import fs from "fs/promises";

async function handleDynamicWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  });
  const page = await browser.newPage();
  const opt = { from: "en", to: "es", timeout: 1000, headless: true };
  await page.goto(
    "https://education.lego.com/en-us/lessons/?grades=Grades+6-8&products=SPIKE%E2%84%A2+Prime+with+Python,BricQ+Motion+Prime,MINDSTORMS%C2%AE+EV3+Core+Set,Renewable+Energy+Add-on+Set,Pneumatics+Add-on+Set"
  );

  const cokiesButon = await page.waitForSelector(".sc-m0v8m0-9"); // Asegúrate de reemplazar esto con el selector de CSS correcto.
  await cokiesButon.click();
  await page.waitForSelector(".sc-1k8yoot-1"); // Asegúrate de reemplazar esto con el selector de CSS correcto.
  await page.waitForSelector('button[data-testid="load-more-button"]'); // Asegúrate de reemplazar esto con el selector de CSS correcto.

  for (let i = 0; i <= 10; i++) {
    //37 = 467 -> 12 = 163 -> 3 = 49 -> 3 = 52 -> 4 = 65 -> 10 = 141
    const res = await page.$$('button[data-testid="load-more-button"]');
    if (res[1]) {
      await res[1].click();
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }

  await autoScroll(page);

  //  await new Promise((resolve) => setTimeout(resolve, 100000));

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
  fs.writeFile("primariaAlta.json", JSON.stringify(data, null, 2));

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
