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
        page.goto('http://localhost:5173/')
        page.wait_for_selector('a[href^="/exercise/"]', timeout=5000)
        page.click('a[href^="/exercise/"]')
        page.wait_for_selector('h1', timeout=5000)

        # Click "View Instructions" button
        page.click('button:has-text("View Instructions")')
        time.sleep(1) # wait for animation

        page.screenshot(path='/home/jules/verification/screenshots/detail_instructions_open.png')
        browser.close()

if __name__ == '__main__':
    run()
