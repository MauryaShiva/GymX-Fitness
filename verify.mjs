import { chromium, devices } from "playwright";
import fs from "fs";

(async () => {
  const browser = await chromium.launch();

  // Test Mobile First
  const mobileContext = await browser.newContext({
    ...devices["iPhone 13 Pro"],
    recordVideo: {
      dir: "./videos-mobile",
    },
  });
  const mobilePage = await mobileContext.newPage();

  console.log("Navigating to home page (Mobile)...");
  await mobilePage.goto("http://localhost:4173");
  await mobilePage.waitForLoadState("networkidle");

  console.log("Testing search shortcut opening full-screen search (Mobile)...");
  // Tap the search icon from bottom nav
  await mobilePage.locator("nav.fixed.bottom-0 button:has-text('Search')").click();
  await mobilePage.waitForTimeout(1000); // Wait for modal animation
  await mobilePage.screenshot({ path: "mobile-search-overlay.png" });

  console.log("Testing closing full-screen search (Mobile)...");
  await mobilePage.locator("button[aria-label='Close search']").click();
  await mobilePage.waitForTimeout(1000);

  console.log("Testing navigation to Home Workouts via BottomNav...");
  await mobilePage.locator("nav.fixed.bottom-0 a[href='/home-workouts']").click();
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: "mobile-home-workouts.png" });

  console.log("Navigating to first Exercise Details from home page (Mobile)...");
  await mobilePage.goto("http://localhost:4173");
  await mobilePage.waitForLoadState("networkidle");
  // Wait for the exercises section to be populated
  await mobilePage.waitForSelector("#exercises a", { state: "visible" });
  await mobilePage.locator("#exercises a").first().click();
  await mobilePage.waitForLoadState("networkidle");
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: "mobile-exercise-detail.png" });

  await mobileContext.close();

  // Test Desktop Layouts
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: "./videos-desktop",
    },
  });
  const desktopPage = await desktopContext.newPage();

  console.log("Navigating to home page (Desktop)...");
  await desktopPage.goto("http://localhost:4173");
  await desktopPage.waitForLoadState("networkidle");
  await desktopPage.screenshot({ path: "desktop-home.png" });

  console.log("Testing navigation to Home Workouts via Top Navbar...");
  await desktopPage.locator("nav.sticky.top-0 a[href='/home-workouts']").click();
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: "desktop-home-workouts.png" });

  await desktopContext.close();
  await browser.close();
  console.log("Verification finished successfully!");
})();
