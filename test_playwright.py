from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        # Emulate a mobile device (iPhone 13)
        iphone_13 = p.devices['iPhone 13']
        browser = p.chromium.launch()
        context = browser.new_context(**iphone_13)
        page = context.new_page()

        print("Navigating to http://localhost:4173")
        page.goto("http://localhost:4173")

        # Wait for the page to load
        page.wait_for_timeout(3000)

        # 1. Take a screenshot of the home page (Mobile view)
        print("Taking mobile_home.png screenshot...")
        page.screenshot(path="mobile_home.png")

        # 2. Open Search Overlay
        print("Opening search overlay...")
        # Since Navbar search icon is present on mobile, we can click it
        search_button = page.locator("nav button").first
        search_button.click()
        page.wait_for_timeout(1000)

        print("Taking mobile_search_overlay.png screenshot...")
        page.screenshot(path="mobile_search_overlay.png")

        # 3. Close Search Overlay
        close_button = page.locator("button:has(svg.lucide-x)")
        if close_button.count() > 0:
            close_button.first.click()
        page.wait_for_timeout(1000)

        # 4. Click on an exercise card to go to detail page
        print("Navigating to exercise detail...")
        # We need to scroll down a bit to see exercises
        page.evaluate("window.scrollBy(0, 1000)")
        page.wait_for_timeout(1000)

        # Look for the first exercise card link
        first_exercise = page.locator("a[href^='/exercise/']").first
        if first_exercise.count() > 0:
             first_exercise.click()
             page.wait_for_timeout(3000)
             print("Taking mobile_exercise_detail.png screenshot...")
             page.screenshot(path="mobile_exercise_detail.png")
        else:
             print("Could not find an exercise card to click.")

        browser.close()

if __name__ == "__main__":
    run()
