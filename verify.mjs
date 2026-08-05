import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // Mobile viewport (iPhone 12)
    recordVideo: { dir: 'videos/' },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:4173');
  await page.goto('http://localhost:4173');

  // Wait for the page to load
  await page.waitForTimeout(2000);
  console.log('Taking Home page screenshot');
  await page.screenshot({ path: 'screenshot_home.png', fullPage: true });

  // Scroll down to Exercises section to verify ExerciseCard
  console.log('Scrolling to Exercises section');
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(1000);
  console.log('Taking Exercises section screenshot');
  await page.screenshot({ path: 'screenshot_exercises.png' });

  // Try to click first exercise card
  try {
    console.log('Clicking on an exercise card');
    const firstExerciseCard = page.locator('a[href^="/exercise/"]').first();
    if (await firstExerciseCard.isVisible()) {
        await firstExerciseCard.click();
        await page.waitForTimeout(3000); // wait for page transition and GIF load
        console.log('Taking Exercise Detail screenshot');
        await page.screenshot({ path: 'screenshot_detail.png', fullPage: true });
    }
  } catch(e) {
    console.log('Could not click exercise card:', e.message);
  }

  // Go back to Home
  console.log('Navigating back to Home');
  await page.goto('http://localhost:4173');
  await page.waitForTimeout(1000);

  // Open mobile search overlay
  console.log('Opening mobile search overlay');
  try {
     const searchButton = page.locator('nav.md\\:hidden button').nth(0);
     if (await searchButton.isVisible()) {
        await searchButton.click();
        await page.waitForTimeout(1000);
        console.log('Taking Search Overlay screenshot');
        await page.screenshot({ path: 'screenshot_search.png' });
     }
  } catch(e) {
      console.log('Could not open search:', e.message);
  }

  await context.close();
  await browser.close();
  console.log('Verification completed.');
})();