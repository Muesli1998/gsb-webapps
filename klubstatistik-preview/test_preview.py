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
    initial_kpis = page.locator("[data-pane='overblik'] .kpi-num").all_inner_texts()
    assert len(initial_kpis) == 4, initial_kpis
    initial_cards = page.locator("[data-pane='overblik'] .team-card").all_inner_texts()
    assert initial_cards, "Ingen holdkort i Alle-udsnit"

    page.get_by_role("button", name="Ungdom", exact=True).click()
    assert page.locator("#youth-filters").is_visible()
    youth = page.locator("#dataset-status").inner_text()
    assert youth != initial
    youth_kpis = page.locator("[data-pane='overblik'] .kpi-num").all_inner_texts()
    assert youth_kpis != initial_kpis, (initial_kpis, youth_kpis)
    youth_cards = page.locator("[data-pane='overblik'] .team-card").all_inner_texts()
    assert youth_cards and youth_cards != initial_cards

    page.get_by_role("button", name="U9").click()
    u9 = page.locator("#dataset-status").inner_text()
    assert u9 != youth
    u9_kpis = page.locator("[data-pane='overblik'] .kpi-num").all_inner_texts()
    assert u9_kpis != youth_kpis, (youth_kpis, u9_kpis)
    u9_cards = page.locator("[data-pane='overblik'] .team-card").all_inner_texts()
    assert u9_cards and u9_cards != youth_cards
    assert len(api_requests) == 1, api_requests

    page.get_by_role("button", name="Hold", exact=True).click()
    assert page.locator('[data-pane="hold"]').is_visible()
    assert not page.locator('[data-pane="overblik"]').is_visible()
    before_sort = page.locator('[data-pane="hold"] tbody tr').all_inner_texts()
    page.get_by_role("button", name="Kampe", exact=True).click()
    after_matches = page.locator('[data-pane="hold"] tbody tr').all_inner_texts()
    assert after_matches != before_sort, (before_sort, after_matches)
    page.get_by_role("button", name="Winrate", exact=True).click()
    after_rate = page.locator('[data-pane="hold"] tbody tr').all_inner_texts()
    assert after_rate != after_matches, (after_matches, after_rate)
    assert "ukendt" in page.locator('[data-pane="hold"]').inner_text().lower()
    assert len(api_requests) == 1, api_requests
    print({"initial": initial, "initialKpis": initial_kpis, "initialFirstCard": initial_cards[0], "youth": youth, "youthKpis": youth_kpis, "youthFirstCard": youth_cards[0], "u9": u9, "u9Kpis": u9_kpis, "u9FirstCard": u9_cards[0], "holdBeforeSort": before_sort[:2], "holdAfterMatches": after_matches[:2], "holdAfterRate": after_rate[:2], "apiRequests": len(api_requests)})
    browser.close()
