from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()

        # Details page
        mobile_page = browser.new_page(viewport={"width": 375, "height": 812})
        mobile_page.goto("http://localhost:5173/exercise/0001")
        time.sleep(2)
        mobile_page.screenshot(path="mobile_details.png", full_page=True)

        browser.close()

run()
