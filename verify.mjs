import { chromium } from "playwright";

(async () => {
  console.log("Starting visual verification script...");
  const browser = await chromium.launch();

  // Create a mobile viewport context (e.g., iPhone 13)
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });

  const page = await context.newPage();

  // Navigate to the local preview server
  await page.goto("http://localhost:4173/");

  // Wait for the app to load
  await page.waitForLoadState("networkidle");

  // Take a screenshot of the home page
  await page.screenshot({ path: "/app/screenshot-home-mobile.png", fullPage: true });
  console.log("Screenshot taken: screenshot-home-mobile.png");

  // Interact with BottomNav - Click Search/Exercises
  const searchButton = page.locator("nav.fixed.bottom-0 button").nth(0);
  if (await searchButton.isVisible()) {
    await searchButton.click();
    await page.waitForTimeout(1000); // Wait for overlay animation
    await page.screenshot({ path: "/app/screenshot-search-mobile.png" });
    console.log("Screenshot taken: screenshot-search-mobile.png");

    // Close the search overlay
    const closeBtn = page.locator(".fixed.inset-0 button").first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await page.waitForTimeout(500); // Wait for close animation
    }
  }

  // Navigate to an exercise detail page (using the first available card)
  const exerciseLink = page.locator('a[href^="/exercise/"]').first();
  if (await exerciseLink.isVisible()) {
    await exerciseLink.click();
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: "/app/screenshot-detail-mobile.png", fullPage: true });
    console.log("Screenshot taken: screenshot-detail-mobile.png");
  }

  await browser.close();
  console.log("Verification complete.");
})();
