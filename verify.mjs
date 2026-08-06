import { chromium, devices } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices['iPhone 13'],
    recordVideo: {
      dir: 'videos/'
    }
  });

  const page = await context.newPage();

  console.log('Navigating to http://localhost:4173/');
  await page.goto('http://localhost:4173/');

  // Wait for the app to load
  await page.waitForTimeout(2000);

  // Take screenshot of home page
  await page.screenshot({ path: 'home-mobile.png', fullPage: true });
  console.log('Took screenshot of home page');

  // Find and click the search button in bottom nav
  console.log('Opening mobile search...');
  await page.click('nav.md\\:hidden button:has-text("Search")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'search-overlay-mobile.png' });
  console.log('Took screenshot of search overlay');

  // Close the search
  await page.click('button:has(svg.lucide-x)');
  await page.waitForTimeout(500);

  // Click on the first exercise card using the 'href' of the card.
  console.log('Navigating to exercise details...');
  await page.click('a[href^="/exercise/"]');
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'exercise-details-mobile.png', fullPage: true });
  console.log('Took screenshot of exercise details');

  await context.close();
  await browser.close();
  console.log('Verification completed!');
})();
