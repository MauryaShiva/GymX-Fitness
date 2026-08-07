import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();

  // Mobile Context
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
  });

  const url = "http://localhost:4173";

  try {
    // 2. Mobile Check
    console.log("Verifying Mobile...");
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(url, { waitUntil: "networkidle" });

    // Open Mobile Search Overlay via Bottom Nav
    try {
      console.log("Clicking mobile search button in bottom nav...");
      const searchButton = await mobilePage.locator('div.md\\:hidden.fixed.bottom-0').getByRole('button', { name: 'Search' });
      await searchButton.click();
      await mobilePage.waitForTimeout(1000); // Wait for animation
      await mobilePage.screenshot({ path: "mobile-search-overlay.png" });
    } catch (e) {
      console.log("Error testing mobile search overlay", e);
    }

    console.log("Verification complete! Check the screenshots.");
  } catch (error) {
    console.error("Verification failed:", error);
  } finally {
    await browser.close();
  }
})();