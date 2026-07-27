import { chromium, devices } from 'playwright';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices['Pixel 5'],
    recordVideo: {
      dir: './videos/',
      size: { width: 393, height: 852 }
    }
  });

  const page = await context.newPage();

  try {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshot-home-mobile.png' });

    // Click on mobile search in BottomNav
    await page.click('nav.md\\:hidden button:has-text("Search")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshot-search-mobile.png' });

    // We have two inputs (desktop hidden and mobile visible). Select the mobile one using a more specific selector
    await page.fill('.md\\:hidden input[placeholder="Search exercises, muscles..."]', 'chest');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshot-search-suggestions-mobile.png' });

    // Close search overlay
    await page.click('button:has(svg.lucide-x)');
    await page.waitForTimeout(1000);

    // Scroll to exercises section
    await page.evaluate(() => {
      document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshot-exercises-mobile.png' });

  } catch (error) {
    console.error('Playwright script error:', error);
  } finally {
    const video = await page.video();
    if (video) {
        console.log(`Video saved at: ${await video.path()}`);
    }
    await context.close();
    await browser.close();
  }
})();
