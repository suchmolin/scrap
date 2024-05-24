import puppeteer from "puppeteer";

export async function translating(textToTranslate) {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);

  const replace = textToTranslate.split(" ").join("%20");
  const fullUrl = `https://translate.google.com/?sl=en&tl=es&text=${replace}%0A&op=translate`;
  await page.goto(fullUrl);

  try {
    await Promise.race([
      page.waitForSelector("[jsname='W297wb']"),
      page.waitForSelector(".HwtZe"),
    ]);
  } catch (error) {
    console.error(error + "No se encontró ninguna de las clases");
  }

  const data = await page.evaluate(() => {
    return (
      document.querySelector("[jsname='W297wb']")?.innerText ||
      document.querySelectorAll(".HwtZe")[1]?.innerText ||
      "untranslated"
    );
  });

  await browser.close();
  return data;
}
