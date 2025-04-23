const puppeteer = require('puppeteer');

const brands = [
  'miu-miu',
  'chanel',
  'coperni',
  'jacquemus',
  'celine',
  'acne-studios',
  'saint-laurent',
  'loewe',
  'our-legacy',
  'lemaire'
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (const brand of brands) {
    const url = `https://www.showstudio.com/collections/spring-summer-2025/${brand}?gallery=1&look=1`;

    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.setViewport({ width: 1600, height: 1000 });
      await page.screenshot({ path: `${brand}-look1.png`, fullPage: true });
      console.log(`✅ ${brand} 캡처 완료`);
    } catch (error) {
      console.log(`❌ ${brand} 캡처 실패:`, error.message);
    }
  }

  await browser.close();
})();
