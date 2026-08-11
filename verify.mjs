import { chromium } from "playwright";
import fs from "fs";

(async () => {
  const browser = await chromium.launch({ headless: true });

  // Set up mobile viewport
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 12/13/14 size
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
    recordVideo: {
      dir: 'videos/'
    }
  });

  const page = await context.newPage();

  try {
    console.log("Navigating to local preview server...");
    await page.goto("http://localhost:4173");
    await page.waitForLoadState('networkidle');

    console.log("Capturing Home Mobile View...");
    await page.screenshot({ path: "mobile_home.png", fullPage: true });

    console.log("Opening mobile search overlay...");
    // Find and click the search button in the bottom nav
    const searchButton = page.locator('.md\\:hidden.fixed.bottom-0').getByText('Search', { exact: true });
    await searchButton.click();
    await page.waitForTimeout(1000); // wait for animation

    console.log("Capturing Search Overlay...");
    await page.screenshot({ path: "mobile_search_overlay.png" });

    console.log("Closing mobile search overlay...");
    try {
        await page.mouse.click(10, 10); // click somewhere outside to try and close, or click X
        const closeBtn = page.locator('.fixed.inset-0.z-\\[100\\] button').first();
        await closeBtn.click();
    } catch (e) {
        await page.keyboard.press('Escape');
    }
    await page.waitForTimeout(1000);

    // Make sure overlay is really closed by forcing click on an element underneath using force: true
    console.log("Navigating to Exercise Detail...");
    await page.waitForSelector('a[href^="/exercise/"]');
    const firstExerciseCard = page.locator('a[href^="/exercise/"]').first();
    await firstExerciseCard.click({ force: true });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // wait for page transition

    console.log("Capturing Exercise Detail Mobile View...");
    await page.screenshot({ path: "mobile_exercise_detail.png", fullPage: true });

    console.log("Verification completed successfully!");
  } catch (error) {
    console.error("Verification failed:", error);
  } finally {
    // Make sure to close the context to save the video
    await context.close();
    await browser.close();

    // Find the recorded video
    const videoDir = fs.readdirSync('videos/');
    const webmFile = videoDir.find(file => file.endsWith('.webm'));
    if (webmFile) {
      console.log(`Video recorded: videos/${webmFile}`);
    }
  }
})();
