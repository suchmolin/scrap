import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const archivoInicio = "/lessons.json";
const archivoFinal = "lessonUID.json";

const data = JSON.parse(fs.readFileSync(__dirname + archivoInicio, "utf8"));

data.forEach((lesson) => {
  lesson.id = uuidv4();
});

const writeFileAsync = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

await writeFileAsync(archivoFinal, JSON.stringify(data, null, 2));
