import { chromium, devices } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices['iPhone 12'],
  });
  const page = await context.newPage();

  // Navigate to the app
  await page.goto('http://localhost:4173/');

  // Wait for it to load
  await page.waitForTimeout(2000);

  // Take screenshot of home page
  await page.screenshot({ path: 'screenshot-home-mobile.png' });

  // Open the search overlay via the mobile bottom nav
  const searchTab = page.locator('div.md\\:hidden button').nth(0);
  await searchTab.click();

  // Wait for the overlay animation to complete
  await page.waitForTimeout(1000);

  // Take screenshot of the overlay
  await page.screenshot({ path: 'screenshot-search-overlay.png' });

  // Enter a search term
  // Fix strict mode violation by targeting the visible mobile input
  const searchInput = page.locator('div.md\\:hidden input[placeholder="Search exercises, muscles..."]');
  await searchInput.fill('bench');
  await page.waitForTimeout(1000);

  // Click on the first suggestion to navigate and close the overlay
  // Ensure we click the visible suggestion in the mobile overlay
  const firstSuggestion = page.locator('div.md\\:hidden ul li').first();
  await firstSuggestion.click();

  // Wait for search results
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshot-search-results.png' });

  // Click on the first exercise card
  const firstExerciseCard = page.locator('a[href^="/exercise/"]').first();
  await firstExerciseCard.click();

  // Wait for page transition and details to load
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshot-exercise-detail.png' });

  // Open instructions accordion
  const instructionsButton = page.getByText('Instructions');
  await instructionsButton.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshot-exercise-instructions.png' });

  await browser.close();

  console.log("Playwright E2E Test Completed Successfully!");
  process.exit(0);
})();
