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
        # Ensure we navigate using the actual valid URL format
        page.goto('http://localhost:5173/')

        # Click on the first exercise link to navigate to the detail page
        page.wait_for_selector('a[href^="/exercise/"]', timeout=5000)
        page.click('a[href^="/exercise/"]')

        # Wait for the detail image to load (we can wait for h1 to be sure it's the detail page)
        page.wait_for_selector('h1', timeout=5000)
        time.sleep(1) # Extra second for animations to settle

        # Take screenshot
        page.screenshot(path='/home/jules/verification/screenshots/detail_screen.png')
        browser.close()

if __name__ == '__main__':
    run()
