import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();

  // Create mobile viewport context
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    recordVideo: { dir: './videos/' }
  });

  const page = await mobileContext.newPage();

  console.log("Navigating to preview server...");
  await page.goto('http://localhost:4173');

  // Wait for the app to load
  await page.waitForLoadState('networkidle');

  console.log("Taking mobile home screen screenshot...");
  await page.screenshot({ path: 'mobile_home.png', fullPage: true });

  console.log("Opening search overlay...");
  // Trigger open search via mobile bottom nav
  await page.click('nav.fixed.bottom-0 button');

  // Use a more specific locator for the mobile modal input
  const searchModalLocator = page.locator('div.fixed.inset-0.z-\\[100\\] input[placeholder="Search exercises, muscles..."]');
  await searchModalLocator.waitFor({ state: 'visible' });
  await page.screenshot({ path: 'mobile_search.png' });

  console.log("Typing 'squat' in search...");
  await searchModalLocator.fill('squat');
  // Wait for suggestions to render
  await page.waitForTimeout(500);

  console.log("Clicking first suggestion...");
  // Click first suggestion within the mobile overlay
  await page.click('div.fixed.inset-0.z-\\[100\\] ul.absolute.top-full li:first-child');

  // Wait for overlay to close and navigation/scrolling
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'mobile_search_results.png' });

  // Click first exercise card
  await page.click('a[href^="/exercise/"]');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000); // Allow image and animation to load

  console.log("Taking mobile detail screen screenshot...");
  await page.screenshot({ path: 'mobile_detail.png', fullPage: true });

  // Desktop Context Test
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const desktopPage = await desktopContext.newPage();
  console.log("Testing Desktop view...");
  await desktopPage.goto('http://localhost:4173');
  await desktopPage.waitForLoadState('networkidle');
  await desktopPage.screenshot({ path: 'desktop_home.png', fullPage: true });

  await browser.close();
  console.log("Verification complete.");
})();
