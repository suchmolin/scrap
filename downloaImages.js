import { launch } from "puppeteer";
import { createWriteStream } from "fs";
import request from "request";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const data = JSON.parse(fs.readFileSync(__dirname + "/lessons.json", "utf8"));

// Función para agregar un tiempo de espera
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const browser = await launch();

  for (const item of data) {
    const ruta = `${item.title.split(" ").join("")}`.replace(/[^\w\s]/gi, "");
    console.log(ruta);
    if (item.urlImg) {
      request(item.urlImg).pipe(createWriteStream("img/" + ruta + ".webp"));
    }
    await sleep(500); // Espera 1 segundo (1000 milisegundos) antes de continuar con la siguiente iteración
  }

  console.log("Images downloaded");
  await browser.close();
})();
