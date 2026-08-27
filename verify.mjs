import { chromium } from 'playwright';

(async () => {
  // Setup mobile viewport
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }, // iPhone SE dimensions
    isMobile: true,
    hasTouch: true,
    recordVideo: {
      dir: 'videos/', // Video recording path
      size: { width: 375, height: 667 },
    }
  });

  const page = await context.newPage();

  console.log("Navigating to local preview server...");
  await page.goto('http://localhost:4173/');

  // Wait for the app to load
  await page.waitForTimeout(2000);

  console.log("Taking screenshot of Home Page...");
  await page.screenshot({ path: 'screenshots/home.png' });

  // Test Search Overlay
  console.log("Opening search overlay...");
  // Find the search icon in the bottom navigation (nav with md:hidden)
  await page.click('nav button:has(svg.lucide-search)');
  await page.waitForTimeout(1000);

  console.log("Taking screenshot of Search Overlay...");
  await page.screenshot({ path: 'screenshots/search_overlay.png' });

  // Close search overlay
  await page.click('button:has(svg.lucide-x)');
  await page.waitForTimeout(1000);

  // Navigate to Workouts tab using bottom navigation
  console.log("Navigating to Workouts...");
  // Make sure to click the mobile bottom nav specifically
  await page.click('.fixed.bottom-0 nav a[href="/home-workouts"]');
  await page.waitForTimeout(1000);

  console.log("Taking screenshot of Workouts Page...");
  await page.screenshot({ path: 'screenshots/workouts.png' });

  // Navigate to an exercise detail page (if one exists on the home page)
  console.log("Navigating to Home...");
  await page.click('.fixed.bottom-0 nav a[href="/"]');
  await page.waitForTimeout(2000);

  console.log("Clicking on the first exercise card...");
  const firstExercise = page.locator('a[href^="/exercise/"]').first();
  if (await firstExercise.isVisible()) {
    await firstExercise.click();
    await page.waitForTimeout(3000); // Wait for the detail page to load

    console.log("Taking screenshot of Exercise Detail Page...");
    await page.screenshot({ path: 'screenshots/exercise_detail.png', fullPage: false });
  } else {
    console.log("No exercise card found on home page, skipping detail page test.");
  }

  await context.close();
  await browser.close();
  console.log("Verification complete. Video and screenshots saved.");
})();
