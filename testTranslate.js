import { translating } from "./translate.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const data = JSON.parse(fs.readFileSync(__dirname + "/lessons.json", "utf8"));

async function traducirData(data) {
  const resp = await Promise.all(
    data.map(async (item, i) => {
      for (let key in item) {
        if (key !== "redir" && key !== "urlImg") {
          item[key] = await translating(item[key]);
        }
      }
      console.log(i + 1 + " of " + data.length + " items translated");
      return item;
    })
  );
  return resp;
}

console.log(await traducirData(data));
