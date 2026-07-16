const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 12 Pro dimensions
    recordVideo: { dir: './videos/' }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173/');
  await page.goto('http://localhost:5173/');

  console.log('Waiting for network idle...');
  await page.waitForLoadState('networkidle');

  console.log('Testing page transition to Workouts...');
  await page.click('nav.fixed.bottom-0 >> text=Workouts');
  await page.waitForTimeout(1000);

  console.log('Testing page transition back to Home...');
  await page.click('nav.fixed.bottom-0 >> text=Home');
  await page.waitForTimeout(1000);

  console.log('Testing PWA banner visibility by firing custom event...');
  // The banner will only show if the event is dispatched, so let's simulate it
  await page.evaluate(() => {
    const event = new CustomEvent('beforeinstallprompt', { bubbles: true, cancelable: true });
    event.prompt = () => {};
    event.userChoice = Promise.resolve({ outcome: 'accepted' });
    window.dispatchEvent(event);
  });

  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'final_pwa_banner.png' });

  console.log('Scrolling to check performance...');
  await page.mouse.wheel(0, 1000);
  await page.waitForTimeout(500);

  await context.close();
  await browser.close();
})();
