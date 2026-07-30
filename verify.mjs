import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // Mobile viewport (iPhone 12/13/14)
    recordVideo: { dir: './playwright-videos' }
  });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'home-mobile.png' });

    // Open Search using bottom nav button (specifically look inside the BottomNav element)
    await page.click('nav.fixed.bottom-0 button');
    await page.waitForTimeout(1000); // Wait for animation
    await page.screenshot({ path: 'search-mobile.png' });

    // Close search
    await page.click('button:has(svg.lucide-x)');
    await page.waitForTimeout(1000);

    // Scroll to exercises and click the first one
    await page.click('text=Showing Results for:');
    const firstCard = await page.locator('a[href^="/exercise/"]').first();
    await firstCard.scrollIntoViewIfNeeded();
    await firstCard.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wait for transition
    await page.screenshot({ path: 'exercise-detail-mobile.png' });

    console.log('Screenshots captured successfully');
  } catch (error) {
    console.error('Error during verification:', error);
  } finally {
    await context.close();
    await browser.close();
  }
})();
