from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()

        # Desktop
        desktop_page = browser.new_page(viewport={"width": 1280, "height": 800})
        desktop_page.goto("http://localhost:5173")
        time.sleep(2)
        desktop_page.screenshot(path="desktop_layout.png", full_page=True)

        # Mobile
        mobile_page = browser.new_page(viewport={"width": 375, "height": 812})
        mobile_page.goto("http://localhost:5173")
        time.sleep(2)
        mobile_page.screenshot(path="mobile_layout.png", full_page=True)

        browser.close()

run()
