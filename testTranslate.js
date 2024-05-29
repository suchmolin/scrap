import translateText from "./traducir.js";
import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const archivoInicio = "/parte2.json";
const archivoFinal = "parte2Translated.json";

const data = JSON.parse(fs.readFileSync(__dirname + archivoInicio, "utf8"));

async function traducirData(data) {
  for (let i = 0; i < data.length; i++) {
    console.log("Translating lesson", i + 1, "/" + data.length, data[i].title);
    for (let key in data[i]) {
      if (
        key !== "redir" &&
        key !== "urlImg" &&
        key !== "duration" &&
        key !== "grade"
      ) {
        data[i][key] = await translateText(data[i][key]);
      }
    }
  }
  return data;
  /*const resp = await Promise.all(
    data.map(async (item) => {
      for (let key in item) {
        if (key !== "redir" && key !== "urlImg") {
          item[key] = await translating(item[key]);
        }
      }

      return item;
    })
  );
  return resp;*/
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

// Uso:
try {
  await writeFileAsync(
    archivoFinal,
    JSON.stringify(await traducirData(data), null, 2)
  );
} catch (err) {
  console.error("Error writing file:", err);
}
