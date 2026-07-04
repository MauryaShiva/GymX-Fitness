from playwright.sync_api import sync_playwright

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
        # Navigate to homepage and wait for exercises to load
        page.goto('http://localhost:5173')

        # Wait for an exercise card to be visible
        page.wait_for_selector('a[href^="/exercise/"]', timeout=5000)

        # Scroll to the first exercise card
        card = page.locator('a[href^="/exercise/"]').first
        card.scroll_into_view_if_needed()

        # Take a screenshot specifically of the card area
        page.screenshot(path='/home/jules/verification/screenshots/card_layout.png')
        browser.close()

if __name__ == '__main__':
    run()
