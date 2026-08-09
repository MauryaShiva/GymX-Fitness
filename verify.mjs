import { chromium } from "playwright";

(async () => {
  console.log("Starting visual verification...");

  // Launch browser
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: "./videos/",
      size: { width: 375, height: 812 }
    },
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  });

  const page = await context.newPage();

  try {
    console.log("Navigating to home page...");
    await page.goto("http://localhost:4173");
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: "screenshot_home_mobile.png", fullPage: true });

    console.log("Clicking mobile search button in BottomNav...");
    // Target the specific lucide icon button in the bottom nav via its label or position
    await page.locator('nav.md\\:hidden button:has-text("Search")').click();
    await page.waitForTimeout(1000); // wait for overlay animation
    await page.screenshot({ path: "screenshot_search_overlay.png" });

    console.log("Closing search overlay...");
    await page.locator('button.bg-surface > svg.lucide-x').click();
    await page.waitForTimeout(1000); // wait for overlay close animation

    console.log("Scrolling to exercise cards...");
    await page.locator('#exercises').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    console.log("Clicking first exercise card...");
    await page.locator('a[href^="/exercise/"]').first().click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wait for image to load/animate
    await page.screenshot({ path: "screenshot_exercise_detail_mobile.png", fullPage: true });

    console.log("Testing detail instructions toggle...");
    await page.getByText('Step-by-Step Instructions').click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "screenshot_exercise_detail_instructions.png" });

    console.log("Verification complete!");
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await context.close();
    await browser.close();
  }
})();
