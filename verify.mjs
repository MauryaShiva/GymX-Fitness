import { chromium, devices } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices['iPhone 12'],
    recordVideo: { dir: 'videos/' }
  });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:4173');

    // Trigger PWA install prompt event
    await page.evaluate(() => {
      const event = new Event('beforeinstallprompt');
      event.prompt = () => console.log('Prompt triggered');
      event.userChoice = Promise.resolve({ outcome: 'accepted' });
      window.dispatchEvent(event);
    });

    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/home.png' });

    // Open search from bottom nav
    const searchButton = page.locator('div.fixed.bottom-0').getByRole('button', { name: 'Search' });
    await searchButton.click();

    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/search_open.png' });

    // Type in search (target the mobile overlay input specifically)
    const searchInput = page.locator('div.fixed.inset-0').getByPlaceholder('Search exercises, muscles...');
    await searchInput.fill('bench press');

    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/search_results.png' });

    // Click suggestion
    const firstSuggestion = page.locator('div.fixed.inset-0').locator('ul > li').first();
    if (await firstSuggestion.isVisible()) {
        await firstSuggestion.click();
    } else {
        await page.keyboard.press('Enter');
    }

    await page.waitForTimeout(1000);

    // Scroll to exercises and take screenshot
    await page.evaluate(() => {
        document.getElementById('exercises')?.scrollIntoView();
    });

    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/exercises.png' });

    // Click first exercise card
    const firstExercise = page.locator('a[href^="/exercise/"]').first();
    await firstExercise.click();

    // Wait for exercise details to load
    await page.waitForSelector('h1');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/exercise_detail.png' });

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    const videoPath = await page.video().path();
    await context.close();
    await browser.close();
    console.log(`Video saved to: ${videoPath}`);
  }
})();
