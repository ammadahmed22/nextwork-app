const { chromium } = require('playwright-chromium');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });

  const errors = [];
  page.on('pageerror', e => errors.push(e.message));

  await page.goto('http://localhost:8082', { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(6000);

  // Home - top
  await page.screenshot({ path: 'ss-home.png' });
  console.log('Home saved');

  // Scroll inside the ScrollView (RN web uses div scroll, not window)
  await page.evaluate(() => {
    const scrollable = document.querySelector('[data-testid="scrollview"]') ||
      document.querySelector('[style*="overflow"]') ||
      document.body;
    scrollable.scrollTop = 800;
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'ss-home-mid.png' });
  console.log('Home mid saved');

  // Explore tab
  const tabs = await page.$$('[role="tab"]');
  console.log('Tab count:', tabs.length);
  if (tabs[1]) { await tabs[1].click(); await page.waitForTimeout(2000); }
  await page.screenshot({ path: 'ss-explore.png' });
  console.log('Explore saved');

  // Community tab
  if (tabs[2]) { await tabs[2].click(); await page.waitForTimeout(2000); }
  await page.screenshot({ path: 'ss-community.png' });
  console.log('Community saved');

  // Profile tab
  if (tabs[3]) { await tabs[3].click(); await page.waitForTimeout(2000); }
  await page.screenshot({ path: 'ss-profile.png' });
  console.log('Profile saved');

  if (errors.length) console.log('ERRORS:', errors.slice(0, 5).join('\n'));
  else console.log('✓ No errors');
  await browser.close();
})().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
