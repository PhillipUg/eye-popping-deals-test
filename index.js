const puppeteer = require('puppeteer')
require('dotenv').config();

function extractItems() {
  const extractedElements = document.querySelectorAll('.promotions-list-table-body > div.promo-item-display a.a-link-normal'); 
  const items = [];
  for (let element of extractedElements) {
    items.push({ content: element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerText, url: element.href});
  }
  return items;
}

async function scrapeInfiniteScrollItems(page, extractItems, itemTargetCount, scrollDelay = 1000) {
  let items = [];
  try {
    let previousHeight;
    while (items.length < itemTargetCount) {
      items = await page.evaluate(extractItems);
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      await page.waitForTimeout(scrollDelay);
    }
  } catch (e) { }
  return items;
}

const run = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage();
  page.setViewport({ width: 900, height: 926 });
  await page.goto(process.env.SITE_URL, { waitUntil: 'networkidle0' });
  await page.type('input[type="email"]', process.env.EMAIL)
  await page.type('input[type="password"]', process.env.PASSWORD)
  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle0' })
  ])
  console.log('fetching promo codes....')
  const items = await scrapeInfiniteScrollItems(page, extractItems, 100);

  console.log({promo_codes: items, total: items.length})
  await browser.close()
 }

run().catch(err=>{
  console.log("Caught Error: ", err)
})