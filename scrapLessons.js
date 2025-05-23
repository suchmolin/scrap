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
  let sinRespuesta = 0;
  let enIngles = 0;
   const lang = ["es-es","es-mx","en-us"]//arreglo

  for (let i = 400 ; i < data.length; i++) {
    console.log(i + 1, "lecciones de", data.length);
    let flag = false;

    for(let j=0; j<lang.length; j++){    
      console.log("testing url:", data[i].urlOriginal.replace("es-es", lang[j]));
      
      await page.goto(data[i].urlOriginal.replace("es-es", lang[j]));
      if (i === 0) {
        const cokiesButon = await page.waitForSelector(".lvmmt61");
        await cokiesButon.click();
      }
      if (await page.$(".sc-1rjdr9n-3") !== null) {
        const box = await page.$eval(".sc-1rjdr9n-3", (el) => {
          return el.innerHTML;
        });
        const teacherbox = await page.$eval(".sc-1by4a7p-1", (el) => {
          return el.innerHTML;
        });
        
        lessonInfo.push({ id: data[i].id, title: data[i].title, html: box, teacher: teacherbox, lang: lang[j] });
        if(lang[j] === "en-us"){
          enIngles++
          console.log("En ingles: ", enIngles);
        }
        flag = true;
        break
      }
    }
        
    if (!flag) {
      lessonInfo.push({ id: data[i].id, title: data[i].title, html: "No se pudo extraer la información" });
      sinRespuesta++
      console.log("Sin respuesta: ", sinRespuesta);
    }
  }
  
  writeFileAsync(archivoFinal, JSON.stringify(lessonInfo, null, 2));
  
  //await new Promise((resolve) => setTimeout(resolve, 10000));

  /*const box = await page.evaluate(() => {
    const box = document.querySelector(".sc-1rjdr9n-3");
    console.log(box);
    return `${box}`;
  });*/
  console.log("Sin respuesta: ", sinRespuesta);
  
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
