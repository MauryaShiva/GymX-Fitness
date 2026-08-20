import { chromium, devices } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext(devices['iPhone 13']);
  const page = await context.newPage();

  console.log("Navigating to Home...");
  await page.goto("http://localhost:4173/");

  // Wait for the app to be fully loaded
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  await page.screenshot({ path: "screenshot_home_mobile.png" });
  console.log("Home mobile screenshot saved.");

  console.log("Opening Search Overlay...");
  // Click the search toggle in the bottom nav or top nav (mobile)
  await page.locator('div.md\\:hidden.relative.mb-8').click();
  await page.waitForTimeout(500); // Wait for animation

  await page.screenshot({ path: "screenshot_search_open.png" });
  console.log("Search overlay screenshot saved.");

  console.log("Typing 'squat'...");
  // We have multiple inputs (one desktop, one mobile overlay). We need to select the visible one in the overlay
  await page.locator('div.fixed.inset-0.z-\\[100\\] input').fill('squat');
  await page.waitForTimeout(1000); // Wait for suggestions

  console.log("Clicking first suggestion...");
  // Click the first suggestion that matches (ignoring exact case) IN THE OVERLAY
  await page.locator('div.fixed.inset-0.z-\\[100\\] ul.absolute.top-full li').first().click();
  await page.waitForTimeout(1000); // Wait for search to execute and scroll

  await page.screenshot({ path: "screenshot_search_results.png" });
  console.log("Search results screenshot saved.");

  console.log("Navigating to first exercise detail...");
  // Click the first exercise card (MotionLink rendered as 'a')
  await page.locator('a[href^="/exercise/"]').first().click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500); // Wait for animations and images to load

  await page.screenshot({ path: "screenshot_exercise_detail.png" });
  console.log("Exercise detail screenshot saved.");

  await browser.close();
  console.log("Verification complete.");
})();
