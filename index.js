const siteUrl = 'https://affiliate-program.amazon.com/home/promohub/promocodes?returnFromLogin=1&openid.assoc_handle=amzn_associates_us&openid.claimed_id=https%3A%2F%2Fwww.amazon.com%2Fap%2Fid%2Famzn1.account.AHUEFFKJSG5M23YOINTRD5WPNC6Q&openid.identity=https%3A%2F%2Fwww.amazon.com%2Fap%2Fid%2Famzn1.account.AHUEFFKJSG5M23YOINTRD5WPNC6Q&openid.mode=id_res&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.op_endpoint=https%3A%2F%2Fwww.amazon.com%2Fap%2Fsignin&openid.response_nonce=2021-02-01T09%3A47%3A14Z1458129365790748877&openid.return_to=https%3A%2F%2Faffiliate-program.amazon.com%2Fhome%2Fpromohub%2Fpromocodes%3FreturnFromLogin%3D1&openid.signed=assoc_handle%2Cclaimed_id%2Cidentity%2Cmode%2Cns%2Cop_endpoint%2Cresponse_nonce%2Creturn_to%2Cns.pape%2Cpape.auth_policies%2Cpape.auth_time%2Csigned&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.auth_policies=SinglefactorWithMobileVerification&openid.pape.auth_time=2021-02-01T09%3A47%3A10Z&openid.sig=nghWENFwGmYbl5s4p6xHfNgenjGyb2Q92xaDXfd2nnc%3D&serial=&'

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
      console.log(items)
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
  page.setViewport({ width: 1280, height: 926 });
  await page.goto(siteUrl, { waitUntil: 'networkidle0' });
  await page.type('input[type="email"]', process.env.EMAIL)
  await page.type('input[type="password"]', process.env.PASSWORD)
  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle0' })
  ])
  
  const items = await scrapeInfiniteScrollItems(page, extractItems, 50);

  console.log(items)

}

run().catch(err=>{
  console.log("Caught Error: ", err)
})