import fs from "fs";
import puppeteer from "puppeteer";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const archivoInicio = "/lessons.json";
const archivoFinal = "lessonInfo.json";

const data = JSON.parse(fs.readFileSync(__dirname + archivoInicio, "utf8"));

async function scrapLessons(data) {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 100,
  });
  const page = await browser.newPage();
  const lessonInfo = [];

  for (let i = 0; i < data.length; i++) {
    console.log(i + 1, "lecciones de", data.length);
    await page.goto(data[i].redir);
    if (i === 0) {
      const cokiesButon = await page.waitForSelector(".sc-m0v8m0-9");
      await cokiesButon.click();
    }

    const box = await page.$eval(".sc-1rjdr9n-3", (el) => {
      return el.innerHTML;
    });

    lessonInfo.push({ id: data[i].id, title: data[i].title, html: box });
  }

  writeFileAsync(archivoFinal, JSON.stringify(lessonInfo, null, 2));

  /*const box = await page.evaluate(() => {
    const box = document.querySelector(".sc-1rjdr9n-3");
    console.log(box);
    return `${box}`;
  });*/

  //await new Promise((resolve) => setTimeout(resolve, 10000));
  await browser.close();
}

scrapLessons(data);

function writeFileAsync(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
