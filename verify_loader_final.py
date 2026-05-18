import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 2000})

        try:
            print("Navigating to http://localhost:3000...")
            await page.goto("http://localhost:3000", timeout=30000)

            # Use a more specific selector for the button
            btn_selector = 'button[type="submit"]'
            # Wait for it to be attached and visible
            btn = await page.wait_for_selector(btn_selector)

            if btn:
                print("Button found. Scrolling into view...")
                await btn.scroll_into_view_if_needed()

                # Inject the 9 dots loader
                await page.evaluate("""
                    const btn = document.querySelector('button[type="submit"]');
                    btn.innerHTML = `
                        <div class="win-loader text-accent" style="margin: 0 auto; display: flex; justify-content: center; align-items: center;">
                            <div class="win-loader-dot"></div>
                            <div class="win-loader-dot"></div>
                            <div class="win-loader-dot"></div>
                            <div class="win-loader-dot"></div>
                            <div class="win-loader-dot"></div>
                            <div class="win-loader-dot"></div>
                            <div class="win-loader-dot"></div>
                            <div class="win-loader-dot"></div>
                            <div class="win-loader-dot"></div>
                        </div>
                    `;
                """)

                print("Loader injected. Waiting for animation...")
                await asyncio.sleep(2)

                # Capture the button specifically
                await btn.screenshot(path="loader_final_button_fixed.png")
                print("Button screenshot saved to loader_final_button_fixed.png")
            else:
                print("Button NOT found.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
