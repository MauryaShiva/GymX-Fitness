import { chromium } from "playwright";
import fs from "fs";

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone X viewport
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });

  const page = await context.newPage();

  // Start recording video
  await context.tracing.start({ screenshots: true, snapshots: true, name: "mobile-recording" });

  try {
    await page.goto("http://localhost:4173/");
    await page.waitForTimeout(1000); // Wait for initial render

    // Screenshot 1: Home page (Header, Bottom Nav)
    await page.screenshot({ path: "/app/mobile_home.png", fullPage: false });

    // Click on search in bottom nav
    const searchButton = page.locator('nav.fixed.bottom-0 button').first(); // Since the other nav items are Links (a tags), the search is the only button
    await searchButton.click();
    await page.waitForTimeout(800); // Wait for overlay animation

    // Screenshot 2: Search Overlay
    await page.screenshot({ path: "/app/mobile_search_overlay.png", fullPage: false });

    // Type in search
    // Using nth(1) because the first one is the desktop one which is hidden via CSS
    const searchInput = page.locator('input[placeholder="Search exercises, muscles..."]').nth(1);
    await searchInput.fill("chest");
    await page.waitForTimeout(500); // Wait for suggestions

    // Screenshot 3: Search suggestions
    await page.screenshot({ path: "/app/mobile_search_suggestions.png", fullPage: false });

    // Click on a suggestion
    // Target only the visible suggestions in the mobile overlay container
    const firstSuggestion = page.locator('.fixed.inset-0 ul > li').first();
    await firstSuggestion.click({ force: true });
    await page.waitForTimeout(1000); // Wait for search overlay to close and scroll

    // Screenshot 4: Filtered exercises
    await page.screenshot({ path: "/app/mobile_search_results.png", fullPage: false });

    // Click on the first exercise card (needs to target the Link)
    const firstExerciseCard = page.locator('a[href^="/exercise/"]').first();
    await firstExerciseCard.click();
    await page.waitForTimeout(1500); // Wait for page transition

    // Screenshot 5: Exercise Details Page
    await page.screenshot({ path: "/app/mobile_exercise_detail.png", fullPage: false });

    // Click show instructions
    const instructionsButton = page.locator('button', { hasText: 'View Instructions' }).first();
    await instructionsButton.click();
    await page.waitForTimeout(500);

    // Screenshot 6: Exercise Instructions
    await page.screenshot({ path: "/app/mobile_exercise_instructions.png", fullPage: false });

    // Stop recording and save
    await context.tracing.stop({ path: "/app/mobile_trace.zip" });

    console.log("Verification complete. Screenshots saved.");
  } catch (error) {
    console.error("Error during verification:", error);
  } finally {
    await browser.close();
  }
})();
