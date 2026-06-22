import { chromium } from 'C:/Users/Ammad Ahmed/AppData/Local/npm-cache/_npx/a80a913f4f8f2557/node_modules/playwright/index.mjs';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:8082', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4000);
await page.screenshot({ path: 'C:/Users/Ammad Ahmed/nextwork-app/screenshot-home.png', fullPage: true });
console.log('Screenshot saved: screenshot-home.png');

// scroll down and take another
await page.evaluate(() => window.scrollTo(0, 500));
await page.waitForTimeout(1000);
await page.screenshot({ path: 'C:/Users/Ammad Ahmed/nextwork-app/screenshot-scroll.png', fullPage: false });
console.log('Scroll screenshot saved');

await browser.close();
