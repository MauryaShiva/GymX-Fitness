import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();

  // Mobile context
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  // Desktop context
  const desktopContext = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    isMobile: false
  });

  try {
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto("http://localhost:4173");
    await mobilePage.waitForLoadState("networkidle");
    await mobilePage.screenshot({ path: "mobile_home.png", fullPage: true });

    // Test mobile search functionality
    await mobilePage.click("nav.fixed.bottom-0 button"); // Click search in bottom nav
    await mobilePage.waitForSelector(".fixed.inset-0"); // Wait for search overlay
    await mobilePage.screenshot({ path: "mobile_search_overlay.png" });

    // Click close button
    await mobilePage.click(".fixed.inset-0 button");

    // Go to exercise details
    await mobilePage.click("a[href^='/exercise/']");
    await mobilePage.waitForLoadState("networkidle");
    await mobilePage.screenshot({ path: "mobile_exercise_detail.png", fullPage: true });

    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto("http://localhost:4173");
    await desktopPage.waitForLoadState("networkidle");
    await desktopPage.screenshot({ path: "desktop_home.png", fullPage: true });

    console.log("Screenshots captured successfully.");
  } catch (error) {
    console.error("Error capturing screenshots:", error);
  } finally {
    await browser.close();
  }
})();
