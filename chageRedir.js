import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const archivoInicio = "/lessons.json";
const archivoFinal = "lessonRedir.json";

const data = JSON.parse(fs.readFileSync(__dirname + archivoInicio, "utf8"));

const changeRedir = async (data) => {
  data.forEach((lesson) => {
    lesson.redir = "/TeacherResources/ExploreLessons/" + lesson.id;
  });
};

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

await changeRedir(data);

await writeFileAsync(archivoFinal, JSON.stringify(data, null, 2));
