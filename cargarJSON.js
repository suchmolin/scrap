import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";

export default function loadJSON(name) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  return JSON.parse(fs.readFileSync(__dirname + name, "utf8"));
}
