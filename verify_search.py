from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        # iPhone 13 dimensions
        context = browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
            device_scale_factor=3
        )
        page = context.new_page()
        # Navigate to homepage
        page.goto('http://localhost:5173')

        # Wait for the mobile inline search button to be visible and click it
        page.wait_for_selector('button:has-text("Search exercises, muscles...")', timeout=5000)
        page.click('button:has-text("Search exercises, muscles...")')

        # Wait for the overlay to appear
        page.wait_for_selector('div.fixed.inset-0.z-50', timeout=5000)

        # Type into the visible search input
        page.locator('div.fixed.inset-0.z-50 input[placeholder="Search exercises..."]').fill('squat')
        time.sleep(1) # wait for suggestions to render

        # Take screenshot of the search overlay
        page.screenshot(path='/home/jules/verification/screenshots/search_overlay.png')
        browser.close()

if __name__ == '__main__':
    run()
