import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // Mobile viewport
  });
  const page = await context.newPage();

  // Navigate to local server
  await page.goto('http://localhost:4173'); // Preview server

  // Wait for initial load and take screenshot
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'mobile-home.png' });

  // Open search overlay - be more specific about the mobile navigation button
  await page.click('.md\\:hidden a:has-text("Exercises")');
  await page.waitForTimeout(1000); // Wait for animation
  await page.screenshot({ path: 'mobile-search.png' });

  // Close search overlay by pressing escape or finding the exact button
  await page.keyboard.press('Escape'); // Alternative way to close if button isn't found easily or is hidden. Wait, there's a button. Let's try the X icon
  await page.click('button:has(svg.lucide-x)'); // The X icon button
  await page.waitForTimeout(1000);

  // Navigate to exercise detail
  // Scroll down a bit to ensure a card is in view, though playwright usually auto-scrolls
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(500);
  await page.click('a[href^="/exercise/"]:visible');
  await page.waitForTimeout(2000); // wait for page transition
  await page.screenshot({ path: 'mobile-detail.png' });

  await browser.close();

  // Desktop
  const desktopBrowser = await chromium.launch();
  const desktopContext = await desktopBrowser.newContext({
      viewport: { width: 1280, height: 720 },
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:4173');
  await desktopPage.waitForTimeout(2000);
  await desktopPage.screenshot({ path: 'desktop-home.png' });
  await desktopBrowser.close();
})();
