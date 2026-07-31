import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true
  });

  const page = await context.newPage();

  try {
    console.log('Navigating to app...');
    await page.goto('http://localhost:4173');

    // 1. Initial Mobile View Screenshot
    console.log('Taking screenshot of mobile home page...');
    await page.screenshot({ path: 'screenshot_mobile_home.png', fullPage: true });

    // 2. Open Search via Bottom Navigation
    console.log('Opening Search via Bottom Navigation...');
    // Target the specific BottomNav Search button
    await page.click('nav.fixed.bottom-0 button:has(span:text("Search"))');
    await page.waitForTimeout(1000); // Wait for AnimatePresence transition

    console.log('Taking screenshot of search overlay...');
    await page.screenshot({ path: 'screenshot_mobile_search.png' });

    // 3. Test Detail Page
    console.log('Navigating to Exercise Detail page (0001)...');
    await page.goto('http://localhost:4173/exercise/0001');
    await page.waitForTimeout(2000); // Wait for content to load

    console.log('Taking screenshot of Detail page...');
    await page.screenshot({ path: 'screenshot_mobile_detail.png', fullPage: true });

    console.log('Verification script completed successfully.');
  } catch (error) {
    console.error('Error during Playwright verification:', error);
  } finally {
    await browser.close();
  }
})();