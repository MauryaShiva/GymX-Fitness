import { chromium, devices } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices['iPhone 12'],
    recordVideo: {
      dir: 'videos/',
      size: { width: 390, height: 844 }
    }
  });
  const page = await context.newPage();

  // Navigate to the preview server
  await page.goto('http://localhost:4173');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Take a screenshot of the home page
  await page.screenshot({ path: 'screenshot_home.png' });

  // Open search overlay
  const searchButton = page.locator('nav.fixed.bottom-0 button').first();
  if (await searchButton.isVisible()) {
      await searchButton.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'screenshot_search.png' });

      // Close search overlay
      const closeSearchButton = page.locator('button.bg-surface.text-text-secondary').first();
      if(await closeSearchButton.isVisible()) {
          await closeSearchButton.click();
          await page.waitForTimeout(500);
      }
  }

  // Click on an exercise card
  const exerciseCard = page.locator('a.group').first();
  if (await exerciseCard.isVisible()) {
      await exerciseCard.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000); // Wait for animations
      await page.screenshot({ path: 'screenshot_exercise_detail.png' });
  }

  await context.close();
  await browser.close();
  console.log('E2E test finished, screenshots and video generated.');
})();
