import { chromium } from "playwright";
import fs from "fs";

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone X viewport
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  const page = await context.newPage();

  console.log("Navigating to local preview server...");
  await page.goto("http://localhost:4173", { waitUntil: "networkidle" });

  // Wait a moment for animations/fonts to settle
  await page.waitForTimeout(2000);

  // 1. Screenshot of the Home Screen (Mobile view)
  await page.screenshot({ path: "screenshot-home-mobile.png" });
  console.log("Saved screenshot-home-mobile.png");

  // 2. Open Search via Bottom Nav Search Button
  console.log("Opening mobile search overlay...");
  // Using locator for the Search button in the bottom nav
  const searchButton = page.locator("nav.fixed.bottom-0 button").first();
  await searchButton.click();

  // Wait for the overlay to animate in
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "screenshot-search-mobile.png" });
  console.log("Saved screenshot-search-mobile.png");

  // 3. Type to get suggestions and click one to navigate
  console.log("Typing 'squat' in search...");
  // Using locator that is inside the mobile modal to make sure it's visible
  const searchInput = page.locator(".fixed.inset-0 input[placeholder='Search exercises, muscles...']").first();
  await searchInput.fill("squat");
  await page.waitForTimeout(500); // Wait for suggestions to appear
  await page.screenshot({ path: "screenshot-search-suggestions.png" });

  // Since both desktop and mobile overlays are rendered, make sure to click the visible mobile one.
  const firstSuggestion = page.locator(".fixed.inset-0 ul.absolute.top-full li").first();
  await firstSuggestion.click();
  console.log("Clicked search suggestion");

  // Wait for the scrolling/results to appear
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "screenshot-search-results.png" });
  console.log("Saved screenshot-search-results.png");

  // 4. Click the first exercise card to go to details page
  console.log("Navigating to exercise details...");
  const firstExerciseCard = page.locator("a[href^='/exercise/']").first();
  await firstExerciseCard.click();

  // Wait for details page to load
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "screenshot-details-mobile.png" });
  console.log("Saved screenshot-details-mobile.png");

  await browser.close();
  console.log("Verification complete.");
})();
