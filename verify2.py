from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()

        # Mobile
        mobile_page = browser.new_page(viewport={"width": 375, "height": 812})
        mobile_page.goto("http://localhost:5173")
        time.sleep(2)
        # Click search icon
        mobile_page.click("nav button")
        time.sleep(1)
        mobile_page.screenshot(path="mobile_search.png")

        browser.close()

run()
