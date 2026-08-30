import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // Mobile viewport
    recordVideo: { dir: './videos/' }
  });

  const page = await context.newPage();

  try {
    console.log("Navigating to home page...");
    await page.goto('http://localhost:4173');

    // Wait for the app to load
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'home-mobile.png' });
    console.log("Captured home page");

    // Click the search icon in the bottom nav to open overlay
    console.log("Opening search overlay...");
    await page.click('nav.md\\:hidden a[href="#search"], nav.md\\:hidden button');

    // Wait for overlay to animate in
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'search-overlay.png' });
    console.log("Captured search overlay");

    // Type in search
    console.log("Typing in search...");
    const inputLocator = page.locator('div.z-\\[100\\] input[type="text"]');
    await inputLocator.waitFor({ state: 'visible' });
    await inputLocator.fill('back');
    await page.waitForTimeout(1000);

    await page.screenshot({ path: 'search-typing.png' });

    // Click a suggestion
    console.log("Clicking suggestion...");
    await page.click('div.z-\\[100\\] ul li:first-child');
    await page.waitForTimeout(1000);

    // Click first exercise card
    console.log("Clicking first exercise card...");
    await page.click('#exercises a:first-child');
    await page.waitForTimeout(2000);

    await page.screenshot({ path: 'exercise-detail.png' });
    console.log("Captured exercise detail page");

  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await context.close();
    await browser.close();
  }
})();
