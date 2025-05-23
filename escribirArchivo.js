import fs from "fs";
export default function writeJSON(name, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(name, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
