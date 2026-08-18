import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 12 Pro dimensions for mobile testing
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
    recordVideo: { dir: 'videos/' },
  });

  const page = await context.newPage();

  try {
    console.log("Navigating to Home Page...");
    await page.goto('http://localhost:4173');

    // Wait for the BottomNav to appear
    await page.waitForSelector('nav.fixed.bottom-0');
    await page.screenshot({ path: 'screenshots/home_mobile.png' });
    console.log("Took screenshot of Home Page.");

    // Click on the Search tab in the bottom nav to trigger the overlay
    console.log("Clicking Search tab...");
    const searchTab = page.locator('nav.fixed.bottom-0 a').filter({ hasText: 'Search' });
    await searchTab.click();

    // Wait for the overlay input to appear and type a search term
    await page.waitForSelector('input[placeholder="Exercises, muscles, equipment..."]');
    await page.screenshot({ path: 'screenshots/search_overlay.png' });
    console.log("Took screenshot of Search Overlay.");

    await page.fill('input[placeholder="Exercises, muscles, equipment..."]', 'squat');
    // Wait for suggestions to render
    await page.waitForSelector('li.cursor-pointer', { timeout: 5000 }).catch(() => console.log("No suggestions found in time"));
    await page.screenshot({ path: 'screenshots/search_suggestions.png' });

    // Click on the first suggestion to search and close overlay
    console.log("Clicking first suggestion...");
    await page.locator('li.cursor-pointer').first().click();

    // Wait for overlay to animate out
    await page.waitForTimeout(500);

    // Wait for Exercise Cards to appear
    await page.waitForSelector('a[href^="/exercise/"]');

    // Click on the first exercise card (scoping the locator to avoid intercepting elements if any)
    console.log("Clicking first exercise card...");
    await page.locator('a[href^="/exercise/"]').first().click();

    // Wait for Detail page to load (checking for Start Workout button on mobile)
    await page.waitForSelector('button:has-text("Start Workout")');
    await page.screenshot({ path: 'screenshots/exercise_details.png' });
    console.log("Took screenshot of Exercise Details.");

    console.log("Verification complete.");
  } catch (e) {
    console.error("Verification failed:", e);
    await page.screenshot({ path: 'screenshots/error_state.png' });
  } finally {
    await context.close();
    await browser.close();
  }
})();
