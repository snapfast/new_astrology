from playwright.sync_api import sync_playwright

def verify_logo(page):
    page.goto('http://localhost:3000')
    page.wait_for_load_state('networkidle')
    # Capture the logo component on the Navbar
    logo = page.locator('nav').locator('a').first
    logo.screenshot(path='/home/jules/verification.png')

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    verify_logo(page)
    browser.close()
