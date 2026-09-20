import os
from playwright.sync_api import sync_playwright


URL = os.environ.get("PREVIEW_URL", "http://127.0.0.1:8761/klubstatistik.html")


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    api_requests = []
    page.on("request", lambda request: api_requests.append(request.url) if "/api/data" in request.url else None)
    page.goto(URL, wait_until="networkidle")
    initial = page.locator("#dataset-status").inner_text()
    assert "2.818" in initial, initial
    assert len(api_requests) == 1, api_requests

    page.get_by_role("button", name="Ungdom", exact=True).click()
    assert page.locator("#youth-filters").is_visible()
    youth = page.locator("#dataset-status").inner_text()
    assert youth != initial

    page.get_by_role("button", name="U9").click()
    u9 = page.locator("#dataset-status").inner_text()
    assert u9 != youth
    assert len(api_requests) == 1, api_requests

    page.get_by_role("button", name="Hold", exact=True).click()
    assert page.locator('[data-pane="hold"]').is_visible()
    assert not page.locator('[data-pane="overblik"]').is_visible()
    assert len(api_requests) == 1, api_requests
    print({"initial": initial, "youth": youth, "u9": u9, "apiRequests": len(api_requests)})
    browser.close()
