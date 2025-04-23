import puppeteer from 'puppeteer';
import fs from 'fs';
import { google } from 'googleapis';

// [1] Puppeteer로 이미지 캡처
const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/opt/render/project/src/.cache/puppeteer/chrome/linux-*/chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
const page = await browser.newPage();

await page.goto('https://www.showstudio.com/collections/spring-summer-2025/miu-miu?gallery=1&look=1', {
  waitUntil: 'networkidle2'
});
await page.setViewport({ width: 1600, height: 1000 });

const filePath = 'miu-miu-ss2025.png';
await page.screenshot({ path: filePath, fullPage: true });
await browser.close();

// [2] Google Drive 업로드 설정
const auth = new google.auth.GoogleAuth({
  keyFile: '/etc/secrets/credentials.json', // Render에 Secret File로 올린 경로
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});
const driveService = google.drive({ version: 'v3', auth });

async function uploadFile() {
  const fileMetadata = { name: filePath };
  const media = {
    mimeType: 'image/png',
    body: fs.createReadStream(filePath),
  };

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id',
  });

  console.log('✅ 업로드 완료! 파일 ID:', response.data.id);
}

await uploadFile();
