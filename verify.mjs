import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // Mobile viewport (iPhone 12/13)
    recordVideo: {
      dir: 'videos/', // Directory where videos will be saved
      size: { width: 390, height: 844 }
    }
  });

  const page = await context.newPage();

  try {
    console.log("Navigating to home page...");
    await page.goto('http://localhost:4173');

    // Wait for the app to load
    await page.waitForLoadState('networkidle');

    console.log("Taking home screenshot...");
    await page.screenshot({ path: 'home-mobile.png', fullPage: true });

    console.log("Opening mobile search overlay...");
    const searchNavButton = page.locator('nav.md\\:hidden button[aria-label="Search"]');
    await searchNavButton.click();
    await page.waitForTimeout(500); // Wait for overlay animation
    await page.screenshot({ path: 'search-overlay.png' });

    console.log("Searching for 'squat'...");
    await page.locator('.fixed.inset-0 input[placeholder="Search exercises, muscles..."]').fill('squat');
    // Wait for suggestions
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'search-suggestions.png' });

    // Click a suggestion to navigate to results
    const suggestion = page.locator('.fixed.inset-0 ul li').first();
    await suggestion.click();

    await page.waitForTimeout(500);
    await page.screenshot({ path: 'search-results.png' });

    console.log("Navigating to exercise details...");
    // Click on the first exercise card. Need to restrict selector to the grid
    const exerciseCard = page.locator('#exercises a').first();
    await exerciseCard.click();

    await page.waitForTimeout(1000); // wait for page load and animation
    await page.screenshot({ path: 'exercise-details.png', fullPage: true });

    console.log("Playwright verification completed successfully!");

  } catch (e) {
    console.error("Test failed: ", e);
  } finally {
    // Make sure to close the context to flush the video
    await context.close();
    await browser.close();
  }
})();