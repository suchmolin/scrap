// Importaciones
import { translate } from "@vitalets/google-translate-api";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Constantes
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const data = JSON.parse(fs.readFileSync(__dirname + "/lessons.json", "utf8"));

// Funciones
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function translateWithDelay(text, options) {
  await sleep(5000); // Espera 5 segundo
  return translate(text, options);
}

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

// Lógica principal
async function main() {
  const resp = await Promise.all(
    data.map(async (item) => {
      for (let key in item) {
        if (key !== "redir" && key !== "urlImg") {
          item[key] = (await translateWithDelay(item[key], { to: "es" })).text;
        }
      }
      return item;
    })
  );

  try {
    await writeFileAsync(
      "lessonsTranslated.json",
      JSON.stringify(resp, null, 2)
    );
  } catch (err) {
    console.error("Error writing file:", err);
  }
}

main();
