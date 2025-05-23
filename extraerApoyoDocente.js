import loadJSON from "./cargarJSON.js";
import writeJSON from "./escribirArchivo.js";
import puppeteer from "puppeteer";

const data = loadJSON("/lessons.json");
const info = loadJSON("/lessonInfo.json");

const browser = await puppeteer.launch({
  headless: true,
  slowMo: 100,
});
const page = await browser.newPage();
const lessonInfo = [];

for (let i = 0; i < 10; i++) {
  console.log(i + 1, "lecciones de", data.length, data[i].title);
  await page.goto(data[i].urlOriginal);

  const box = await page.$eval(".sc-1by4a7p-1", (el) => {
    return el.innerHTML;
  });

  let elemento = info.find((e) => e.id === data[i].id);

  lessonInfo.push({ ...elemento, teacher: box });
}
writeJSON("lessonInfoTeacher.json", JSON.stringify(lessonInfo, null, 2));

await browser.close();
