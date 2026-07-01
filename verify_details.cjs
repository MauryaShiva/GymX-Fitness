const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();

  // Assuming '0001' or similar is a valid exercise ID in the mock data
  await page.goto('http://localhost:5173/exercise/0001');

  await page.waitForTimeout(3000); // Give enough time for layout, animations

  await page.screenshot({ path: 'mobile_exercise_detail.png', fullPage: false });

  await browser.close();
  console.log("Details screenshot captured successfully.");
})();
