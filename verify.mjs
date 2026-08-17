import { chromium, devices } from 'playwright';

(async () => {
  // Use iPhone 13 Pro viewport for mobile testing
  const mobileViewport = devices['iPhone 13 Pro'].viewport;

  const browser = await chromium.launch();

  const context = await browser.newContext({
    viewport: mobileViewport,
    recordVideo: {
      dir: 'videos/', // Ensure this directory exists or Playwright creates it
      size: mobileViewport,
    },
  });

  const page = await context.newPage();

  console.log("Navigating to http://localhost:4173/");
  await page.goto('http://localhost:4173/');

  // Wait for the main page to load completely
  await page.waitForLoadState('networkidle');
  console.log("Page loaded. Taking home screenshot.");
  await page.screenshot({ path: 'mobile-home.png' });

  console.log("Testing search toggle from Bottom Nav...");
  // Click the Search tab on the bottom navigation
  // Focus exclusively on the bottom nav to avoid matching desktop UI elements hidden by CSS
  const searchTab = page.locator('nav.fixed.bottom-0 button', { hasText: 'Search' });
  await searchTab.waitFor({ state: 'visible' });
  await searchTab.click();

  // Wait for the full-screen mobile search overlay to appear and be ready
  // Wait for the "Search" heading to be visible in the mobile layout
  const searchOverlayHeading = page.locator('h2', { hasText: 'Search' }).first();
  await searchOverlayHeading.waitFor({ state: 'visible' });

  // Give it a brief moment to finish any Framer Motion spring animations
  await page.waitForTimeout(500);

  console.log("Search overlay open. Taking search overlay screenshot.");
  await page.screenshot({ path: 'mobile-search.png' });

  // Close the search overlay
  const closeButton = page.locator('button[aria-label="Search"]').nth(1); // X button is the second button inside the search overlay usually, or we can use generic button selection
  // actually in SearchExercises.jsx mobile view, we just have a button with the X lucide icon inside the header
  const overlayCloseButton = page.locator('.fixed.inset-0.z-50 button').first();
  await overlayCloseButton.click();

  await page.waitForTimeout(500);

  console.log("Navigating to an exercise detail page...");
  // Find the first exercise card and click it
  // Since we have the search section above, we might need to scroll down or just click the first link that starts with /exercise/
  const firstExerciseCard = page.locator('a[href^="/exercise/"]').first();
  await firstExerciseCard.waitFor({ state: 'visible' });

  // Scroll it into view if needed
  await firstExerciseCard.scrollIntoViewIfNeeded();

  await firstExerciseCard.click();

  // Wait for the detail page to load (wait for the "Hide/Show Instructions" button which indicates details loaded)
  const instructionsButton = page.locator('button', { hasText: /Instructions/ });
  await instructionsButton.waitFor({ state: 'visible' });

  await page.waitForTimeout(1000); // give the image some time to load
  console.log("Detail page loaded. Taking detail page screenshot.");
  await page.screenshot({ path: 'mobile-detail.png' });

  // Close context to ensure video is saved
  await context.close();
  await browser.close();

  console.log("Verification complete. Screenshots and video saved.");
})();
