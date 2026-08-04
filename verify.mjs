import { chromium } from "playwright";

async function verifyMobilePWA() {
  const browser = await chromium.launch();

  // Set up mobile viewport mapping
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
    recordVideo: {
      dir: './videos/',
      size: { width: 375, height: 812 },
    }
  });

  const page = await context.newPage();

  // 1. Visit App
  await page.goto("http://localhost:4173/");

  // 2. Wait for the initial load and snap mobile home
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "mobile-home.png" });
  console.log("Captured Home Screen.");

  // 3. Open Search Overlay by tapping search on BottomNav
  // Finding search icon from BottomNav
  await page.click('div.fixed.bottom-0 button:has(svg.lucide-search)');
  await page.waitForTimeout(500); // let framer motion animate
  await page.screenshot({ path: "mobile-search.png" });
  console.log("Captured Full-screen Mobile Search.");

  // Close search
  await page.click('button:has(svg.lucide-x)');
  await page.waitForTimeout(500);

  // 4. Tap the first exercise to navigate to Detail page
  await page.click('a[href^="/exercise/"]');
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "mobile-detail.png", fullPage: true });
  console.log("Captured Mobile Exercise Detail Screen.");

  await context.close();
  await browser.close();
}

async function verifyDesktop() {
  const browser = await chromium.launch();

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: './videos/',
      size: { width: 1440, height: 900 },
    }
  });

  const page = await context.newPage();

  await page.goto("http://localhost:4173/");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "desktop-home.png" });
  console.log("Captured Desktop Home Screen.");

  await context.close();
  await browser.close();
}

(async () => {
  console.log("Starting E2E Verification...");
  await verifyMobilePWA();
  await verifyDesktop();
  console.log("Verification complete.");
})();
