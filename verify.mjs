import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 375, height: 667 }, recordVideo: { dir: 'videos/' } }); // Mobile iPhone SE viewport
  const page = await context.newPage();

  console.log("Navigating to local preview server...");
  await page.goto('http://localhost:4173');
  await page.waitForLoadState('networkidle');
  console.log("Saving screenshot of Home page on mobile...");
  await page.screenshot({ path: 'home-mobile.png', fullPage: true });

  // Test Bottom Nav
  console.log("Clicking Workouts tab on Bottom Nav...");
  // Use a more specific selector to match the mobile bottom nav link, as desktop link is hidden
  await page.locator('.md\\:hidden.fixed.bottom-0').locator('a[href="/home-workouts"]').click();
  await page.waitForLoadState('networkidle');
  console.log("Saving screenshot of Workouts page on mobile...");
  await page.screenshot({ path: 'workouts-mobile.png', fullPage: true });

  // Test Search Overlay on mobile
  console.log("Clicking Search tab on Bottom Nav...");
  await page.locator('.md\\:hidden.fixed.bottom-0').locator('button').filter({ hasText: 'Search' }).click();
  await page.waitForTimeout(1000); // Wait for animation
  console.log("Saving screenshot of Search Overlay on mobile...");
  await page.screenshot({ path: 'search-mobile.png', fullPage: true });

  // Close search overlay
  console.log("Closing search overlay...");
  await page.click('button:has(svg.lucide-x)');
  await page.waitForTimeout(500);

  // Navigate to exercise detail
  console.log("Navigating back home to check exercise card...");
  await page.locator('.md\\:hidden.fixed.bottom-0').locator('a[href="/"]').click();
  await page.waitForLoadState('networkidle');

  console.log("Clicking on first exercise card...");
  // Use locator specifically for the exercise cards section if we can
  const firstCard = await page.locator('a[href^="/exercise/"]').first();
  if (await firstCard.count() > 0) {
    await firstCard.click();
    await page.waitForLoadState('networkidle');
    console.log("Saving screenshot of Exercise Detail on mobile...");
    await page.screenshot({ path: 'exercise-detail-mobile.png', fullPage: true });
  }

  // Test Desktop mode
  console.log("Switching to desktop viewport...");
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:4173');
  await page.waitForLoadState('networkidle');
  console.log("Saving screenshot of Home page on desktop...");
  await page.screenshot({ path: 'home-desktop.png', fullPage: true });

  if (await firstCard.count() > 0) {
    await firstCard.click();
    await page.waitForLoadState('networkidle');
    console.log("Saving screenshot of Exercise Detail on desktop...");
    await page.screenshot({ path: 'exercise-detail-desktop.png', fullPage: true });
  }

  await context.close();
  await browser.close();

  console.log("Verification complete.");
})();
