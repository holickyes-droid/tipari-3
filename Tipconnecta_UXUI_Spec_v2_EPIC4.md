# EPIC 4 — BRK: Tikety / Marketplace (SLA platnosti tiketu + Matching investorů + LTV)

## Proč tento EPIC
Broker (obchodník) potřebuje v marketplace rychle:
- poznat, **kolik času zbývá do konce platnosti tiketu** (publikační okno / „Zveřejněno do“),
- vidět **LTV a zajištění** (bez složitostí),
- vidět **párování shod s investory** (match) a jedním krokem poslat investora do podpisů.

Tento EPIC doplňuje přesně tyto 3 oblasti do broker části marketplace.

## Scope (MVP)
- BRK marketplace list (karty/tabelární list) rozšířený o: **Platnost do / zbývá**, **LTV**, **Match summary**
- Ticket detail (broker) rozšířený o: **SLA panel**, **LTV panel**, **Match panel**
- Matching drawer/modal: **seznam investorů s hodnocením + důvody + filtry**
- Entry point do rezervace: **„Vybrat investora → Odeslat k podpisu“** (navazuje na EPIC 3)

## Non-goals (teď neděláme)
- redesign investora evidence (pouze quick add email, pokud chybí)
- změna pravidel kapacity/fronty (pouze transparentní zobrazení)
- scoring „quality ticket score“ (může přijít později)

---

## Rozhodnutí & pravidla (z dat + logika)
1) **Platnost tiketu**
- Tiket má publikační okno a může mít explicitní datum „Zveřejněno do“. Po uplynutí publikačního okna je tiket „Expirovaný“. Nové rezervace už nelze vytvořit; existující rezervace mohou doběhnout (informativně).  
2) **LTV**
- LTV je v první verzi **doporučené**, ne povinné. Pokud chybí posudek / odhad, neblokujeme publikaci. LTV a hodnota zástavy slouží jako evidence a pro matching; platforma podklady neověřuje.  
3) **Matching investorů**
- Matching kombinuje tvrdé filtry (měna, částka, doba, region) a měkké preference (výnos, typ projektu, typ zajištění, LTV). Výstupem je seznam investorů s hodnocením a důvody. Noví/neaktivní investoři jsou defaultně skrytí.

---

# Obrazovky (EPIC 4)

## [BRK-200] Tikety — Marketplace

Cíl uživatele:
- Najít tiket, který sedí jeho investorům (20M+, 1. zástava apod.), vidět čas do expirace a rychle přejít do rezervace.

Cíl byznysu:
- Zrychlit “time‑to‑first‑reservation” a zvýšit počet relevantních rezervací (vyšší close rate).

Primární CTA / sekundární CTA:
- Primární: **Vybrat investora**
- Sekundární: Detail tiketu

KPI:
- % ticket_card → match_open
- % match_open → investor_selected
- % investor_selected → reservation_sent
- průměrný čas od vstupu do marketplace k výběru investora
- % tiketů zobrazených s LTV (pokrytí dat)

Obsah (texty 1:1):
- H1: **Marketplace tiketů**
- Subtext: **Vyberte tiket a spárujte ho s investorem ze své evidence. Detaily projektu se odemknou až po podpisu Souhlasu + NDA investorem.**
- Search placeholder: **Hledat podle ID tiketu / města / typu projektu…**
- Filtry (labely):
  - **Částka (Kč)**
  - **Výnos p.a. (%)**
  - **Doba (měsíce)**
  - **Region**
  - **Zajištění**
  - **LTV (max.)**
  - **Platnost (zbývá)**
  - **Shoda s investory**
  - Toggle: **Zobrazit i tikety bez LTV**
  - Dropdown: **Zobrazit: Aktivní / Historie**
- Prázdný stav (bez výsledků):
  - H: **Nic jsme nenašli**
  - Text: **Zkuste upravit filtry, nebo zobrazit historii.**
  - CTA: **Resetovat filtry**
- Karta tiketu (hlavní pole):
  - Badge: **Zbývá {X dní}** / **Končí dnes** / **Končí za {X hodin}**
  - Nadpis: **Tiket #{ID} — {Typ projektu} ({Region})**
  - Meta řádek: **Částka {XX 000 000 Kč} · {Výnos % p.a.} · {Doba} měs. · Zajištění: {typ + pořadí}**
  - LTV řádek: **LTV: {XX %}** nebo **LTV: neuvedeno**
  - Match řádek: **Shody: {Vysoká} · {Střední} · {Nízká}** (klik = otevře matching)
  - Finance řádek (pravý sloupec): **Odměna brokera: {XXX 000 Kč} (bez DPH)**
  - CTA: **Vybrat investora**
  - Secondary link: **Detail**

Komponenty:
- Page header (H1 + subtext)
- Search input
- Filter bar (chips + dropdowns + range sliders)
- Ticket list (cards nebo table rows)
- Badge “čas do expirace”
- Inline “match summary” pill
- Empty state
- Pagination / “Načíst další”

Layout (popis zón):
- Header: H1 + subtext + search
- Body:
  - Filtry (sticky pod headerem)
  - List tiketů (cards 2‑column grid nebo 1‑column list)
- Footer: pagination

Stavy:
- loading: skeleton karet + spinner v listu
- empty: “Nic jsme nenašli” + reset
- error: “Marketplace se nepodařilo načíst. Zkuste to znovu.” + CTA “Znovu načíst”
- edge cases:
  - tiket má LTV prázdné → zobrazuje “neuvedeno”
  - tiket má “končí za <24h” → badge “Končí dnes” + zvýraznění
  - tiket je uzavřený/expirovaný (v Historii) → CTA disabled + tooltip “Tiket je referenční / expirovaný”

Validace a pravidla:
- Filtr LTV:
  - pokud je “Zobrazit i tikety bez LTV” OFF → tikety bez LTV se skryjí
  - pokud ON → tikety bez LTV se zobrazí a LTV label je “neuvedeno”
- “Shoda s investory”:
  - defaultně počítá pouze investory ve stavu Aktivní
  - Nový/Neaktivní se nezapočítá, dokud broker nezapne filtr v matchingu
- “Platnost (zbývá)”:
  - výpočet z `publish_end_at` (preferuj “Zveřejněno do”; jinak publish_start + publikační okno)

Analytické eventy:
- `brk_marketplace_viewed` (user_id, role, default_filters)
- `brk_marketplace_filters_applied` (filters_json)
- `brk_ticket_card_impression` (ticket_id, time_to_expiry_days, ltv_present, match_high_count)
- `brk_ticket_card_match_opened` (ticket_id, source=list|card_pill)
- `brk_ticket_detail_opened` (ticket_id, source=list)
- `brk_ticket_primary_cta_clicked` (ticket_id, cta=select_investor)

ASCII wireframe:
[Header: Logo | Marketplace | Rezervace | Provize | Profil]
---------------------------------------------------------
[H1 Marketplace tiketů]
[Subtext: ... odemknou až po Souhlasu+NDA ...]
[Search: Hledat ... ]   [Zobrazit: Aktivní v]
[Filters: Částka v] [Výnos v] [Doba v] [Region v] [Zajištění v] [LTV slider] [Platnost v] [Shoda v] [ ] Zobrazit i bez LTV
---------------------------------------------------------
[Card: Zbývá 12 dní]   [Odměna brokera: 250 000 Kč]
[Tiket #128 — Rezidence (Praha)]
[20 000 000 Kč · 10 % p.a. · 12 měs. · Zástava 1. pořadí]
[LTV: 60 %]   [Shody: 2 vysoká · 4 střední · 6 nízká]
[Vybrat investora] [Detail]
---------------------------------------------------------
[Pagination]

---

## [BRK-210] Tiket — Detail (Broker)

Cíl uživatele:
- Zjistit, jestli je tiket pro jeho investory vhodný (zajištění, LTV, parametry) a zvolit investora pro rezervaci.

Cíl byznysu:
- Zvyšovat kvalitu rezervací (méně “mimo kritéria”) a zrychlit start procesu.

Primární CTA / sekundární CTA:
- Primární: **Vybrat investora a rezervovat**
- Sekundární: **Zpět do marketplace**

KPI:
- ticket_detail_view → match_open rate
- ticket_detail_view → reservation_sent rate
- drop‑off na detailu (scroll depth)

Obsah (texty 1:1):
- Breadcrumb: **Marketplace / Tiket #{ID}**
- H1: **Tiket #{ID}**
- Subtitle: **{Typ projektu} · {Region}**
- Panel “Rychlé parametry”:
  - **Částka:** {XX 000 000 Kč}
  - **Výnos:** {X % p.a.}
  - **Doba:** {X měsíců}
  - **Forma financování:** {Zápůjčka / úvěr | Mezanin | ...}
  - **Zajištění:** {typ + pořadí}
  - **LTV:** {XX %} / **Neuvedeno**
- Panel “Platnost & dostupnost”:
  - **Platnost do:** {DD. MM. YYYY}
  - **Zbývá:** {X dní / X hodin}
  - **Kapacita rezervací:** {obsazeno N / kapacita N}
  - Helper: **Po skončení platnosti nelze založit nové rezervace.**
- Panel “Proces & lhůty” (timeline):
  - **1) Podpis dokumentů investorem:** 48 h
  - **2) Podpis developera:** 48 h (od podpisu investora)
  - **3) Jednání / financování:** 30 dní (od aktivace)
  - Helper: **Lhůty může administrátor upravit na úrovni tiketu.**
- Panel “Shody s investory”:
  - Summary chips: **2 vysoká · 4 střední · 6 nízká**
  - CTA: **Zobrazit matching**
  - Top 3 investoři (preview):
    - **Jan Novák — Vysoká shoda**
      - důvody: “částka v rozsahu · region odpovídá · zajištění sedí”
      - CTA: **Vybrat**
- Panel “Odměna”:
  - **Odměna brokera (bez DPH): {XXX 000 Kč}**
  - Micro: **Nárok vzniká až po profinancování.**

Komponenty:
- Breadcrumb
- Sticky action bar (Vybrat investora)
- Summary cards (parametry, platnost, proces, odměna)
- Matching preview list
- Tooltip/info icon pro LTV, platnost

Layout (popis zón):
- Header: breadcrumb + H1 + sticky CTA
- Body: 2 sloupce
  - Left: parametry + zajištění/LTV + popis + dokumenty (pokud relevantní)
  - Right (sidebar): platnost + proces + shody + odměna

Stavy:
- loading: skeleton panelů
- error: ticket se nepodařilo načíst
- edge:
  - LTV neuvedeno → zobrazit “Neuvedeno” + helper “Doporučeno doplnit (pro rychlejší rozhodnutí)”
  - Končí dnes → varovný callout “Tiket končí dnes – doporučujeme odeslat investora co nejdříve.”
  - Historie (uzavřený/expirovaný) → primární CTA disabled

Validace a pravidla:
- Pokud ticket_state != “Zveřejněný” → zakázat vytvoření nové rezervace.
- “Kapacita rezervací” je informační; kapacitu blokují až aktivní rezervace (po podpisu oběma stranami).

Analytické eventy:
- `brk_ticket_detail_viewed` (ticket_id, ticket_state, time_to_expiry_hours, ltv_present)
- `brk_ticket_match_preview_clicked` (ticket_id)
- `brk_ticket_match_opened` (ticket_id, source=detail)
- `brk_ticket_select_investor_clicked` (ticket_id, source=detail_preview|detail_cta)

ASCII wireframe:
[Header: Logo | Marketplace | Rezervace | Provize | Profil]
---------------------------------------------------------
[Breadcrumb: Marketplace / Tiket #128]
[H1 Tiket #128]  [Sticky CTA: Vybrat investora a rezervovat]
[Rezidence · Praha]
---------------------------------------------------------
[Left col]
[Card Parametry: Částka, Výnos, Doba, Forma financování]
[Card Zajištění & LTV]
[Card Popis (maskované / detail dle stavu)]
---------------------------------------------------------
[Right col]
[Card Platnost & dostupnost]
[Card Proces & lhůty (timeline)]
[Card Shody s investory (2/4/6 + top 3 + CTA)]
[Card Odměna brokera]
---------------------------------------------------------

---

## [BRK-220] Matching investorů — Drawer (pro tiket)

Cíl uživatele:
- Najít “nejlepší” investor fit (rychle) a jedním klikem pokračovat do rezervace / odeslání podpisů.

Cíl byznysu:
- Snížit rezervace “mimo kritéria” a zrychlit start podpisů.

Primární CTA / sekundární CTA:
- Primární: **Vybrat investora**
- Sekundární: **Upravit investora** / **Zavřít**

KPI:
- match_open → investor_selected
- investor_selected → reservation_sent
- % investorů ve stavu Aktivní vs Nový/Neaktivní (kvalita evidence)

Obsah (texty 1:1):
- Title: **Shody s investory**
- Subtitle: **Tiket #{ID} · {Částka} · {Region}**
- Note: **Matching je doporučení pro výběr. Nejde o investiční poradenství.**
- Search placeholder: **Hledat investora…**
- Filtry:
  - Toggle: **Zahrnout nové a neaktivní investory**
  - Dropdown: **Zobrazit: Vysoká / Střední / Nízká / Mimo kritéria**
- Investor row:
  - Name: **{Jméno / firma}**
  - Badge: **Vysoká shoda** | **Střední shoda** | **Nízká shoda** | **Mimo kritéria**
  - Důvody:
    - “částka v rozsahu”
    - “region odpovídá”
    - “zajištění sedí”
    - “LTV 60 % ≤ limit 65 %” / “LTV neuvedeno”
  - CTA: **Vybrat**
  - Secondary: **Detail investora**

Komponenty:
- Drawer / modal
- Search
- Filter toggle + dropdown
- Investor list rows
- Badge component (match rating)
- Inline reason bullets
- CTA buttons

Layout (popis zón):
- Header: title + subtitle + close
- Body: search + filters + scroll list
- Footer (sticky): kontextový “Vybraný investor: …” + CTA “Pokračovat”

Stavy:
- loading: skeleton list
- empty (žádní investoři):
  - H: **Nemáte žádné aktivní investory**
  - Text: **Přidejte alespoň jednoho investora do evidence, abychom mohli počítat shody.**
  - CTA: **Přidat investora**
- empty (žádný match po filtrech):
  - Text: **Zkuste zahrnout i nové/neaktivní investory nebo změnit filtr shody.**
- edge:
  - investor “Zablokovaný” → nezobrazovat (nebo zobrazit jen adminovi; v BRK UI skrýt)

Validace a pravidla:
- Defaultně zobrazovat pouze investory ve stavu **Aktivní**.
- Pokud investor nesplní tvrdý filtr (měna/částka/doba/region), spadá do **Mimo kritéria**.
- LTV:
  - Pokud investor má max LTV a tiket má LTV → použít jako měkkou preferenci.
  - Pokud tiket LTV nemá → nepovýšit skóre; zobrazit důvod “LTV neuvedeno”.

Analytické eventy:
- `brk_match_drawer_opened` (ticket_id, match_counts)
- `brk_match_filters_changed` (ticket_id, include_inactive, rating_filter)
- `brk_match_investor_selected` (ticket_id, investor_id, match_rating)
- `brk_match_investor_row_clicked` (ticket_id, investor_id)

ASCII wireframe:
[Drawer: Shody s investory   (X)]
[Tiket #128 · 20 000 000 Kč · Praha]
[Note: Matching je doporučení...]
[Search investor...]
[ ] Zahrnout nové a neaktivní   [Rating filter v]
-------------------------------------------------
[Investor Jan Novák] [Vysoká shoda] [Vybrat]
- částka v rozsahu
- region odpovídá
- zajištění sedí
- LTV 60 % ≤ limit 65 %
-------------------------------------------------
[Investor ABC s.r.o.] [Mimo kritéria]
- částka mimo rozsah (max 15M)
[Detail investora]
-------------------------------------------------
[Sticky footer: Vybraný investor: Jan Novák] [Pokračovat]

---

## [BRK-230] Potvrzení rezervace — Modal (navazuje na EPIC 3)

Cíl uživatele:
- Potvrdit, že chce zahájit proces rezervace pro vybraného investora a poslat mu podpisový balík.

Cíl byznysu:
- Minimalizovat chyby (špatný investor) a zajistit, že máme kontakt (e-mail) pro eSign.

Primární CTA / sekundární CTA:
- Primární: **Odeslat investorovi k podpisu**
- Sekundární: Zrušit

KPI:
- reservation_confirm_open → reservation_sent
- % případů, kdy chyběl e-mail investora (data quality)

Obsah (texty 1:1):
- Title: **Potvrdit rezervaci**
- Summary:
  - **Tiket:** #{ID}
  - **Investor:** {Jméno / firma}
  - **Odměna brokera:** {XXX 000 Kč} (bez DPH)
- SLA box:
  - **Investor má 48 hodin na podpis dokumentů.**
  - **Po podpisu investora má developer 48 hodin na potvrzení.**
- Kontakt:
  - Label: **E‑mail investora (pro podpis)**
  - Pokud chybí: inline warning: **Bez e‑mailu nemůžeme poslat podpisový balík.**
  - CTA inline: **Doplnit e‑mail**
- Checkbox:
  - **Potvrzuji, že mám oprávnění kontaktovat investora a evidovat jeho údaje pro účely rezervace.**
- Footer note:
  - **Detaily projektu se odemknou po podpisu Souhlasu + NDA investorem.**

Komponenty:
- Modal
- Summary rows
- SLA info box
- Email input (inline edit)
- Checkbox consent
- Primary/secondary buttons

Stavy:
- validation error:
  - chybí e‑mail → blokovat odeslání
  - checkbox unchecked → blokovat odeslání
- success:
  - toast: **Odesláno. Čekáme na podpis investora (48 h).**
  - redirect: detail rezervace (EPIC 3)

Validace a pravidla:
- E‑mail je povinný pro odeslání (i když je v evidenci doporučený).
- Checkbox musí být checked.

Analytické eventy:
- `brk_reservation_confirm_opened` (ticket_id, investor_id)
- `brk_reservation_email_added` (investor_id, source=confirm_modal)
- `brk_reservation_sent_esign` (ticket_id, investor_id)

ASCII wireframe:
[Modal: Potvrdit rezervaci (X)]
Tiket: #128
Investor: Jan Novák
Odměna brokera: 250 000 Kč (bez DPH)
------------------------------------
[SLA box]
Investor má 48 hodin na podpis dokumentů.
Poté má developer 48 hodin na potvrzení.
------------------------------------
[E‑mail investora (pro podpis)]
[ input ]  (pokud chybí -> warning)
[ ] Potvrzuji, že mám oprávnění...
------------------------------------
[Zrušit]          [Odeslat investorovi k podpisu]

---

## Nejasnosti (otázky na tebe)
- Žádné blokující pro EPIC 4 (doplnili jsme logicky).

## Předpoklady (co jsme doplnili sami)
- “Historie” v marketplace bude obsahovat i **Uzavřené** a **Expirované** tikety pro referenci (read‑only).
- “Match summary” (počty shod na kartě) se počítá jen nad investory ve stavu **Aktivní** (Nový/Neaktivní jsou defaultně mimo).
- Pokud tiket nemá LTV, matching ho **nevyřazuje** (není tvrdý filtr), ale snižuje skóre a explicitně to ukáže v důvodech.
