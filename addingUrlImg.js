import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const data = JSON.parse(fs.readFileSync(__dirname + "/lessons.json", "utf8"));

const final = data.map((item) => {
  const ruta = `${item.title.split(" ").join("")}`.replace(/[^\w\s]/gi, "");
  return {
    ...item,
    urlImg: item.urlImg ? `/img/lessonsImg/${ruta}.webp` : null,
  };
});
fs.writeFile("lessonsUrlImg.json", JSON.stringify(final, null, 2), (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("File written successfully");
  }
});
