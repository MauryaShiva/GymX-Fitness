import { chromium } from "playwright";

(async () => {
  console.log("Starting visual verification...");

  // Launch browser with iPhone 13 Pro Max viewport
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 428, height: 926 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    recordVideo: {
      dir: './videos/',
      size: { width: 428, height: 926 }
    }
  });

  const page = await context.newPage();

  try {
    // 1. Visit Home Page
    console.log("Navigating to home page...");
    await page.goto("http://localhost:4173", { waitUntil: "networkidle" });
    await page.screenshot({ path: "screenshot_home_mobile.png", fullPage: true });

    // 2. Open Search Overlay (via BottomNav or Navbar shortcut)
    console.log("Opening search overlay...");
    // Try to click the search button in the bottom nav
    await page.click('nav.fixed.bottom-0 button:has-text("Search")');
    await page.waitForTimeout(1000); // Wait for animation
    await page.screenshot({ path: "screenshot_search_overlay.png" });

    // 3. Perform a search
    console.log("Performing a search...");
    const searchInput = page.locator('.fixed.inset-0 input[type="text"]').first();
    await searchInput.fill("chest");
    await page.waitForTimeout(500); // Wait for suggestions
    await page.screenshot({ path: "screenshot_search_suggestions.png" });

    // Click on a suggestion to close overlay and trigger search
    console.log("Clicking a search suggestion...");
    await page.click('.fixed.inset-0 ul li:first-child');
    await page.waitForTimeout(2000); // Wait for search results to load and scroll
    await page.screenshot({ path: "screenshot_search_results.png", fullPage: true });

    // 4. Navigate to Exercise Details
    console.log("Navigating to exercise details...");
    // Click the first exercise card
    const firstExerciseCard = page.locator('#exercises a').first();
    await firstExerciseCard.click();
    await page.waitForTimeout(3000); // Wait for page transition and GIF load
    await page.screenshot({ path: "screenshot_exercise_details_mobile.png", fullPage: true });

    console.log("Verification successful.");

  } catch (error) {
    console.error("Verification failed:", error);
  } finally {
    const videoPath = await page.video().path();
    console.log(`Video saved to: ${videoPath}`);
    await context.close();
    await browser.close();
  }
})();
