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
    assert "2.817" in initial, initial
    assert len(api_requests) == 1, api_requests
    initial_kpis = page.locator("[data-pane='overblik'] .kpi-num").all_inner_texts()
    assert len(initial_kpis) == 4, initial_kpis
    assert initial_kpis[2] == "7.598", initial_kpis
    initial_cards = page.locator("[data-pane='overblik'] .team-card").all_inner_texts()
    assert initial_cards, "Ingen holdkort i Alle-udsnit"
    page.get_by_role("button", name="Hjemme/Ude", exact=True).click()
    home_away_cards = page.locator('[data-pane="hjemmeude"] .home-away-card')
    assert home_away_cards.count() == 2
    home_away_counts = home_away_cards.evaluate_all("cards => cards.map(card => Number(card.dataset.matchCount))")
    assert sum(home_away_counts) == 2817, home_away_counts
    assert page.locator('[data-pane="hjemmeude"] .home-away-note').count() == 0
    page.get_by_role("button", name="Kategori", exact=True).click()
    category_rows = page.locator('[data-pane="kategori"] tbody tr')
    assert category_rows.count() == 7
    category_names = category_rows.locator("td:first-child").all_inner_texts()
    assert category_names == ["Herresingle", "Damesingle", "Herredouble", "Damedouble", "Mixeddouble", "Fri single", "Fri double"], category_names
    category_counts = category_rows.locator("td:nth-child(2)").evaluate_all("cells => cells.map(cell => Number(cell.textContent.trim()))")
    assert sum(category_counts) == 20313, category_counts
    assert category_counts[-2:] == [3410, 2105], category_counts

    page.get_by_role("button", name="Spillere", exact=True).click()
    assert "Ikke fremmødt" not in page.locator('[data-pane="spillere"]').inner_text()

    page.get_by_role("button", name="🏅 Klub-karriere", exact=True).click()
    assert "Ikke fremmødt" not in page.locator('[data-pane="karriere"]').inner_text()

    page.get_by_role("button", name="Modstanderhold", exact=True).click()
    assert "Ikke fremmødt" not in page.locator('[data-pane="modstander"]').inner_text()

    page.get_by_role("button", name="🏅 Klub-karriere", exact=True).click()
    career_rows = page.locator('[data-pane="karriere"] tbody tr')
    assert career_rows.count() >= 3
    career_values = career_rows.locator("td").evaluate_all("cells => { const rows = []; for (let i = 0; i < cells.length; i += 5) rows.push(Array.from(cells).slice(i, i + 5).map(cell => cell.textContent.trim())); return rows; }")
    assert all(int(row[1]) + int(row[2]) + int(row[3]) == int(row[4]) for row in career_values[:3]), career_values[:3]
    career_name = career_values[0][0]
    career_total = career_values[0][4]
    page.get_by_role("button", name="Spillere", exact=True).click()
    page.locator("#player-search").fill(career_name)
    career_profile = page.locator('[data-pane="spillere"] .player-detail-row').first
    assert career_profile.is_visible() is False
    page.locator('[data-pane="spillere"] .player-row').first.click()
    assert career_profile.is_visible()
    assert career_total + " kampe totalt for klubben" in career_profile.inner_text()

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
    page.get_by_role("button", name="Spillere", exact=True).click()
    player_rows = page.locator('[data-pane="spillere"] .player-row')
    assert player_rows.count() >= 3
    player_names = []
    profiles = []
    for index in range(3):
        row = player_rows.nth(index)
        player_names.append(row.locator("td").first.inner_text())
        row.click()
        detail = row.locator("xpath=following-sibling::tr[1]")
        assert detail.is_visible()
        assert "Kategorier spillet" in detail.inner_text()
        assert "Sæson for sæson" in detail.inner_text()
        profiles.append({
            "name": player_names[-1],
            "kpis": detail.locator(".profile-kpis > div").all_inner_texts(),
            "categories": detail.locator(".profile-grid > div").nth(0).inner_text(),
            "seasons": detail.locator(".profile-season-table tbody tr").all_inner_texts()[:3],
            "identityNote": detail.locator(".identity-note").count() == 1,
        })
    assert [profile["kpis"] for profile in profiles] == [
        ["40\nKAMPE", "55%\nWINRATE", "7\nHOLD", "2\nSÆSONER"],
        ["40\nKAMPE", "65%\nWINRATE", "5\nHOLD", "2\nSÆSONER"],
        ["33\nKAMPE", "58%\nWINRATE", "5\nHOLD", "2\nSÆSONER"],
    ], profiles
    assert all("1. D" in profile["categories"] and "1. S" in profile["categories"] for profile in profiles), profiles
    assert [profile["identityNote"] for profile in profiles] == [True, False, True], profiles
    requests_before_player_filter = len(api_requests)
    page.locator("#player-search").fill(player_names[0])
    assert page.locator('[data-pane="spillere"] .player-row').count() == 1
    page.locator("#min-games").check()
    assert len(api_requests) == requests_before_player_filter
    assert len(api_requests) == 1, api_requests
    page.get_by_role("button", name="Modstanderhold", exact=True).click()
    opponent_rows = page.locator('[data-pane="modstander"] tbody tr')
    assert opponent_rows.count() > 0
    opponent_row_count = opponent_rows.count()
    assert page.locator('[data-pane="modstander"] .opponent-note').count() == 1
    opponents_before_sort = opponent_rows.all_inner_texts()
    page.get_by_role("button", name="Kampe", exact=True).click()
    opponents_after_matches = opponent_rows.all_inner_texts()
    assert opponents_after_matches != opponents_before_sort, (opponents_before_sort, opponents_after_matches)
    page.get_by_role("button", name="Winrate mod dem", exact=True).click()
    opponents_after_rate = opponent_rows.all_inner_texts()
    assert opponents_after_rate != opponents_after_matches, (opponents_after_matches, opponents_after_rate)
    assert len(api_requests) == 1, api_requests
    page.get_by_role("button", name="Sæson", exact=True).click()
    season_rows = page.locator('[data-pane="saeson"] tbody tr')
    assert season_rows.count() > 0
    assert page.locator('[data-pane="saeson"] .season-note').count() == 1
    season_count_without_dropdown = season_rows.count()
    season_value = page.locator('#season-filter option').nth(1).get_attribute('value')
    page.locator('#season-filter').select_option(season_value)
    assert page.locator('[data-pane="saeson"] tbody tr').count() == season_count_without_dropdown
    assert len(api_requests) == 1, api_requests
    print({"initial": initial, "initialKpis": initial_kpis, "initialFirstCard": initial_cards[0], "youth": youth, "youthKpis": youth_kpis, "youthFirstCard": youth_cards[0], "u9": u9, "u9Kpis": u9_kpis, "u9FirstCard": u9_cards[0], "homeAwayCounts": home_away_counts, "holdBeforeSort": before_sort[:2], "holdAfterMatches": after_matches[:2], "holdAfterRate": after_rate[:2], "players": player_names, "profiles": profiles, "opponentRows": opponent_row_count, "opponentBeforeSort": opponents_before_sort[:3], "opponentAfterMatches": opponents_after_matches[:3], "opponentAfterRate": opponents_after_rate[:3], "categoryRows": category_rows.count(), "categoryCounts": category_counts, "seasonRows": season_count_without_dropdown, "seasonFirstRows": season_rows.all_inner_texts()[:3], "seasonDropdownIgnored": True, "apiRequests": len(api_requests)})
    browser.close()
