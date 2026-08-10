import { chromium } from "playwright";
import fs from "fs";
import path from "path";

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // Mobile viewport (iPhone X)
    recordVideo: { dir: "./videos/" }, // Record video of interaction
  });

  const page = await context.newPage();

  try {
    console.log("Navigating to local preview server...");
    await page.goto("http://localhost:4173/");

    console.log("Taking initial screenshot (Mobile Home)...");
    await page.screenshot({ path: "mobile-home.png" });

    // Open Mobile Search via Bottom Navigation
    console.log("Clicking Search in BottomNav...");
    // Target the bottom nav search button (which is in the hidden md:hidden container)
    await page.locator("div.md\\:hidden button").filter({ hasText: "Search" }).click();

    // Wait for the search overlay to animate in
    await page.waitForTimeout(1000);

    console.log("Taking screenshot of Search Overlay...");
    await page.screenshot({ path: "mobile-search-overlay.png" });

    // Close search overlay
    console.log("Closing Search Overlay...");
    await page.locator("button[aria-label='Close search']").click();
    await page.waitForTimeout(500);

    // Verify Desktop View as well
    console.log("Switching to Desktop View...");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(500); // Allow responsive layout adjustments
    console.log("Taking screenshot of Desktop Home...");
    await page.screenshot({ path: "desktop-home.png" });

    console.log("All screenshots and video captured successfully!");
  } catch (error) {
    console.error("Error during Playwright verification:", error);
  } finally {
    const videoPath = await page.video().path();
    await context.close();
    await browser.close();

    console.log(`Video saved at: ${videoPath}`);
  }
})();
