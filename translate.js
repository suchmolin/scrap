import puppeteer from "puppeteer";

export async function translating(textToTranslate) {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 100,
  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);

  const replace = textToTranslate.split(" ").join("%20");
  const fullUrl = `https://translate.google.com/?sl=en&tl=es&text=${replace}%0A&op=translate`;
  await page.goto(fullUrl);

  await page.waitForSelector("[jsname='W297wb']");

  const data = await page.evaluate(() => {
    return document.querySelector("[jsname='W297wb']").innerText;
  });

  await browser.close();
  return data;
}
