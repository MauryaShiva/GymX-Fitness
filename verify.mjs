import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function runCuj(page) {
    console.log("Navigating to home page...");
    await page.goto("http://localhost:4173");
    await page.waitForTimeout(2000);

    // Screenshot: Home Page (Mobile View)
    await page.screenshot({ path: "/home/jules/verification/screenshots/home-mobile.png" });
    await page.waitForTimeout(500);

    // Navigate using Bottom Nav
    console.log("Clicking Workouts on bottom nav...");
    await page.locator('.md\\:hidden.fixed.bottom-0').getByText("Workouts").click();
    await page.waitForTimeout(2000);

    // Screenshot: Home Workouts Page (Mobile View)
    await page.screenshot({ path: "/home/jules/verification/screenshots/workouts-mobile.png" });
    await page.waitForTimeout(500);

    // Open Search Overlay
    console.log("Opening search overlay...");
    await page.locator('.md\\:hidden.fixed.bottom-0').getByText("Search").click();
    await page.waitForTimeout(1000);

    // Screenshot: Search Overlay (Mobile View)
    await page.screenshot({ path: "/home/jules/verification/screenshots/search-overlay.png" });
    await page.waitForTimeout(500);

    // Search for an exercise
    console.log("Searching for back...");
    // Only target the mobile search input which is inside the fixed overlay
    await page.locator('.fixed.inset-0.z-\\[100\\]').getByPlaceholder("Search exercises, muscles...").fill("back");
    await page.waitForTimeout(1000);

    // Click on suggestion
    await page.locator('.fixed.inset-0.z-\\[100\\]').getByRole('listitem').filter({ hasText: /^back$/ }).click();
    await page.waitForTimeout(2000);

    // Screenshot: Search Results
    await page.screenshot({ path: "/home/jules/verification/screenshots/search-results.png" });
    await page.waitForTimeout(500);

    // Click on an exercise card
    console.log("Clicking an exercise card...");
    await page.locator('a[href^="/exercise/"]').first().click();
    await page.waitForTimeout(3000);

    // Screenshot: Exercise Details Page (Mobile View)
    await page.screenshot({ path: "/home/jules/verification/screenshots/exercise-details.png" });
    await page.waitForTimeout(1000);
}

(async () => {
    const browser = await chromium.launch({ headless: true });
    // Emulate Mobile Device (iPhone 12 Pro)
    const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
        recordVideo: { dir: "/home/jules/verification/videos" }
    });
    const page = await context.newPage();

    try {
        await runCuj(page);
    } catch (e) {
        console.error("Test failed:", e);
    } finally {
        await context.close();
        await browser.close();

        // Find the most recently created video file
        const videoDir = "/home/jules/verification/videos";
        const files = fs.readdirSync(videoDir)
            .filter(file => file.endsWith('.webm'))
            .map(file => ({
                name: file,
                time: fs.statSync(path.join(videoDir, file)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time);

        if (files.length > 0) {
            console.log("Video saved to:", path.join(videoDir, files[0].name));
        } else {
            console.log("No video was saved.");
        }
    }
})();
