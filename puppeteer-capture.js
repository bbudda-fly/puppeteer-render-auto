const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 쇼스튜디오 예시 페이지
  await page.goto('https://www.showstudio.com/collections/spring-summer-2025/miu-miu?gallery=1&look=1', {
    waitUntil: 'networkidle2'
  });

  await page.setViewport({ width: 1600, height: 1000 });

  // 이미지 캡처
  await page.screenshot({ path: 'miu-miu-ss2025.png', fullPage: true });

  await browser.close();
})();
