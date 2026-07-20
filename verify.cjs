const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  // Simulate Mobile screen size (iPhone 12 Pro size)
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
    recordVideo: { dir: './videos/' }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // Wait for animations to settle

  console.log('Taking screenshot of Home Mobile...');
  await page.screenshot({ path: 'home-mobile.png' });

  console.log('Clicking on mobile search icon in sticky header...');
  // Assuming the search icon is in the header inside the md:hidden button
  await page.click('nav button:has(svg)');
  await page.waitForTimeout(1000);

  console.log('Taking screenshot of Mobile Search Overlay...');
  await page.screenshot({ path: 'search-overlay-mobile.png' });

  // Close the search overlay
  console.log('Closing search overlay...');
  await page.click('button:has(svg.lucide-x)'); // The X close button
  await page.waitForTimeout(1000);

  console.log('Scrolling down to exercises...');
  await page.mouse.wheel(0, 1500);
  await page.waitForTimeout(1500);

  console.log('Clicking the first exercise card...');
  // Find the first exercise card (link inside #exercises area, or just any exercise card)
  await page.click('a[href^="/exercise/"] >> nth=0');

  console.log('Waiting for Exercise Details page to load...');
  await page.waitForURL('**/exercise/*');
  await page.waitForTimeout(2000);

  console.log('Taking screenshot of Exercise Details on Mobile...');
  await page.screenshot({ path: 'exercise-details-mobile.png' });

  console.log('Clicking Show Instructions...');
  await page.click('button:has-text("Instructions")');
  await page.waitForTimeout(1000);

  console.log('Taking screenshot with Instructions open...');
  await page.screenshot({ path: 'exercise-details-instructions-mobile.png' });

  await context.close();
  await browser.close();

  console.log('Done!');
})();
