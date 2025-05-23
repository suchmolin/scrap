import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const archivoInicio = "/lessons.json";
const archivoFinal = "leccionesSinEdad.json";

const data = JSON.parse(fs.readFileSync(__dirname + archivoInicio, "utf8"));

const salida = [];

data.forEach((element) => {
  if (!element.edad) {
    salida.push(element);
  }
});

writeFileAsync(archivoFinal, JSON.stringify(salida, null, 2));

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
