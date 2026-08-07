import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();

  // Mobile Context
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
  });

  // Desktop Context
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  const url = "http://localhost:4173";

  try {
    // 1. Desktop Check
    console.log("Verifying Desktop...");
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(url, { waitUntil: "networkidle" });
    await desktopPage.screenshot({ path: "desktop-home.png", fullPage: true });

    // Click on an exercise (if visible)
    try {
      await desktopPage.waitForSelector('a[href^="/exercise/"]', { timeout: 3000 });
      const firstExerciseDesktop = await desktopPage.$('a[href^="/exercise/"]');
      if (firstExerciseDesktop) {
        await firstExerciseDesktop.click();
        await desktopPage.waitForLoadState("networkidle");
        await desktopPage.waitForTimeout(1000); // Wait for animation
        await desktopPage.screenshot({ path: "desktop-detail.png", fullPage: true });
      }
    } catch (e) {
      console.log("Could not navigate to detail page on desktop");
    }

    // 2. Mobile Check
    console.log("Verifying Mobile...");
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(url, { waitUntil: "networkidle" });
    await mobilePage.screenshot({ path: "mobile-home.png" });

    // Open Mobile Search Overlay via Bottom Nav
    try {
      console.log("Clicking mobile search button in bottom nav...");
      const searchButton = await mobilePage.getByRole('button', { name: 'Search', exact: false });
      await searchButton.click();
      await mobilePage.waitForTimeout(1000); // Wait for animation
      await mobilePage.screenshot({ path: "mobile-search-overlay.png" });

      // Close overlay
      const closeButton = await mobilePage.locator('button').filter({ hasText: '' }).nth(1); // Rough guess for X button if role fails
      await mobilePage.keyboard.press('Escape'); // Or try escape
      await mobilePage.waitForTimeout(500);
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