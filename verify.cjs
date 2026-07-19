const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  // Simulate mobile device
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    recordVideo: {
      dir: './playwright-videos/',
      size: { width: 375, height: 812 }
    }
  });

  const page = await context.newPage();

  console.log('Navigating to homepage...');
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(2000);

  // Take screenshot of homepage
  console.log('Taking screenshot of homepage...');
  await page.screenshot({ path: 'homepage_mobile.png' });

  // Click on Exercises (Search) in bottom nav
  console.log('Opening search overlay via bottom nav...');
  await page.click('text="Exercises"');
  await page.waitForTimeout(1000);

  // Take screenshot of search overlay
  console.log('Taking screenshot of search overlay...');
  await page.screenshot({ path: 'search_overlay_mobile.png' });

  // Type something and search (use visible locator)
  console.log('Searching for "squat"...');
  await page.locator('input[placeholder="Search exercises..."]').locator('visible=true').fill('squat');
  await page.waitForTimeout(500);

  // Click first suggestion if it appears, otherwise press enter
  const firstSuggestion = page.locator('ul.absolute.top-full li').first();
  if (await firstSuggestion.isVisible()) {
    console.log('Clicking suggestion...');
    await firstSuggestion.click();
  } else {
    console.log('Pressing Enter...');
    await page.keyboard.press('Enter');
  }

  await page.waitForTimeout(2000);

  // Take screenshot of search results
  console.log('Taking screenshot of search results...');
  await page.screenshot({ path: 'search_results_mobile.png' });

  // Wait for the exercise card to be visible
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(1000);

  // Take screenshot of scrolled search results
  console.log('Taking screenshot of scrolled search results...');
  await page.screenshot({ path: 'search_results_scrolled.png' });

  // Use force click on the first exercise card since the overlay might be interfering
  console.log('Navigating to exercise detail...');
  await page.click('a[href^="/exercise/"]', { force: true });
  await page.waitForTimeout(2000);

  // Take screenshot of exercise detail page
  console.log('Taking screenshot of exercise detail page...');
  await page.screenshot({ path: 'exercise_detail_mobile.png' });

  // Scroll down a bit
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(1000);

  console.log('Taking screenshot of exercise detail scrolled...');
  await page.screenshot({ path: 'exercise_detail_mobile_scrolled.png' });

  // Close context to save video
  await context.close();
  await browser.close();
  console.log('Verification complete. Video and screenshots saved.');
})();
