import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 12 Pro dimensions
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
    recordVideo: {
      dir: './videos/',
      size: { width: 390, height: 844 }
    }
  });

  const page = await context.newPage();

  try {
    // 1. Navigate to Home
    console.log("Navigating to home page...");
    await page.goto('http://localhost:4173/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: '/app/screenshot-home.png' });

    // 2. Click Bottom Nav Search shortcut to open overlay
    console.log("Opening search overlay...");
    await page.locator('nav.fixed.bottom-0 button').filter({ hasText: 'Search' }).click();
    await page.waitForTimeout(500); // Wait for animation
    await page.screenshot({ path: '/app/screenshot-search-overlay.png' });

    // 3. Navigate to Workouts tab
    console.log("Navigating to Workouts...");
    await page.locator('nav.fixed.bottom-0 a').filter({ hasText: 'Workouts' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wait for fade in
    await page.screenshot({ path: '/app/screenshot-workouts.png' });

    // 4. Click Home to go back
    console.log("Navigating back to Home...");
    await page.locator('nav.fixed.bottom-0 a').filter({ hasText: 'Home' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // 5. Scroll down to exercises section
    console.log("Scrolling to exercises...");
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/app/screenshot-exercises.png' });

    // 6. Click on the first exercise card
    console.log("Navigating to Exercise Details...");
    const firstExercise = page.locator('section#exercises a').first();
    await firstExercise.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wait for animation
    await page.screenshot({ path: '/app/screenshot-exercise-detail.png' });

    // 7. Click to show instructions
    console.log("Showing instructions...");
    await page.getByRole('button', { name: 'Instructions' }).click();
    await page.waitForTimeout(500); // wait for accordion
    await page.screenshot({ path: '/app/screenshot-exercise-instructions.png' });

    console.log("E2E Mobile test completed successfully.");
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await context.close();
    await browser.close();
  }
})();
