from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:3000/btr')

    # Wait for page to load and fill form to generate charts
    page.fill('input[placeholder="The earthly name of the soul..."]', 'Jane Doe')
    page.fill('input[type="date"]', '1990-01-01')
    page.fill('input[placeholder="City, Country"]', 'New Delhi')
    page.wait_for_timeout(2000)
    page.keyboard.press("ArrowDown")
    page.keyboard.press("Enter")

    page.wait_for_timeout(4000)

    page.screenshot(path='/home/jules/verification/btr-page-bottom.png', full_page=True)
    browser.close()
