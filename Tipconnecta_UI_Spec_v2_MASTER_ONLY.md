# Tipconnecta — UI zadávací dokumentace (v2) — MASTER
**Verze:** v2.19 (UI ONLY)
**Datum poslední aktualizace:** 2026-01-23  
**Jazyk UI:** CZ  
**Platforma:** interní web aplikace (za loginem), responzivní desktop  
**Použité zdroje (pouze):**
- Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md  
- Tipconnecta_Strategicky_Marketingovy_Deck_v1.md  
- Tipari_persona_obchodnik_partner_20m.md  

---

## Executive summary (co tento dokument pokrývá)
Tento dokument pokrývá UI část specifikace (desktop web app):

- **EPIC 11:** Design system & UI kit (desktop) + accessibility — tokeny, komponenty, patterny a baseline WCAG
- **EPIC 12:** UI ↔ Backend kontrakt — permissions, view‑modely pro UI, SLA/countdown standard, error‑copy, analytické eventy (doplněk k UX EPIC 12)
- **EPIC 13:** Screen kit & template mapping — page templates + mapování všech UX screens
- **EPIC 14:** UI QA & dokončení UI části — responsivita desktopu, content QA, a11y checklist
- **EPIC 15–21:** Hi‑fi specifikace klíčových částí UI (Marketplace → Rezervace → Finance/Pool → Admin → globální patterny)

> Pozn.: UX část (EPIC 1–10) je v samostatném dokumentu **Tipconnecta — UX zadávací dokumentace (v2) — MASTER**.  
> EPIC 12 existuje v UX dokumentu jako „handoff pack“ (data model + API + analytics). V tomto UI dokumentu držíme **UI‑relevantní kontrakt** (permissions, view‑modely, UI error‑copy, UI eventy), aby šlo kreslit a implementovat hi‑fi obrazovky bez dohadů.

---

# EPIC 11 — Design system & UI kit (desktop) + Accessibility
## Cíl EPICu
- Sjednotit vizuální a interakční jazyk napříč aplikací (web/app), aby systém působil jako **„private‑banking calm“**: čistý, věcný, vysoce čitelný.
- Zajistit, že všechny klíčové obrazovky používají stejné komponenty, stavy a vzory (loading/empty/error/success).
- Minimalizovat UX frikci: konzistentní formuláře, tabulky, karty, statusy a SLA odpočty („kdo je na tahu, do kdy“).
- Založit škálovatelný základ pro post‑MVP (více rolí, více typů tiketů, více dokumentů), aniž by se rozpadla UI konzistence.

## In‑scope (MVP)
- Design tokens (barvy, typografie, spacing, radius, shadow, ikonografie) a jejich **semantické použití**.
- App shell (navigace, header, breadcrumbs, page layout).
- Základní knihovna komponent (tlačítka, inputy, selecty, tabulka, karty, badge, alert, modal, toast).
- Klíčové patterny: **Process header**, **Masking/unlock**, **SLA countdown**, **Audit log row**, **Proof pack block** (LTV, zajištění, dokumenty).
- Accessibility baseline (WCAG: kontrast, focus, klávesnice, error messages).

## Out‑of‑scope (post‑MVP)
- Dark mode.
- Pokročilé grafy (portfolio analytics), plný „design language“ pro marketing (ilustrace, video).
- Komplexní datagrid (inline edit, multi‑row actions) — v MVP jednoduché tabulky.

---

## [DS-000] Zásady UI (principy) + struktura UI kitu

Cíl uživatele:
Rychle chápat, co je kde, co je důležité a jaký je další krok.

Cíl byznysu:
Vyšší důvěra a nižší chybovost v kritických procesech (rezervace, podpisy, financování, provize).

Primární CTA / sekundární CTA:
- N/A (průřezový standard)

KPI:
- snížení support ticketů na „kde to najdu / co to znamená“
- snížení drop‑off ve flow (signup → 1. akce, rezervace → aktivace)

Obsah (texty 1:1):
- Pravidlo #1: **Stav + deadline + další krok je vždy nad foldem.**
- Pravidlo #2: **Jedna obrazovka = jedna primární akce.**
- Pravidlo #3: **Částky primárně v Kč (bez DPH), % sekundárně.**
- Pravidlo #4: **Bez slibů výnosů, bez „investice“ v copy (používat rezervace/financování).**
- Pravidlo #5: **Maskované informace mají vždy vysvětlení „proč“ a „co se odemkne kdy“.**

Komponenty:
- N/A (principy)

Layout:
- N/A

Stavy:
- N/A

Validace a pravidla:
- Každá nová obrazovka musí používat existující komponenty; nové komponenty pouze po schválení (design governance).

Analytické eventy:
- N/A

ASCII wireframe:
[— Neaplikuje se —]

---

## [DS-010] Design tokens — barvy, typografie, spacing, radius, shadow, ikony

Cíl uživatele:
Číst a rozhodovat se rychle, bez vizuálního stresu.

Cíl byznysu:
Konzistentní „fintech“ dojem + snazší škálování UI a rychlejší práce design/vývoj.

Primární CTA / sekundární CTA:
- N/A

KPI:
- konzistence UI (interní design QA checklist ≥ 95 %)
- zkrácení času na návrh nové obrazovky (reuse komponent)

Obsah (texty 1:1):
### 1) Barvy (role‑based, semantické)
- **Primary / Brand:** Tipari Blue `#215EF8` (primární akce, odkazy)
- **Text strong:** Dark Navy `#040F2A` (nadpisy)
- **Surface:** bílá (hlavní), světlé šedé pozadí (sekundární plochy)
- **Border:** jemná šedá (oddělovače, tabulky, karty)
- **Status:**
  - Success (zelená) — „Potvrzeno / Aktivní / Profinancováno“
  - Warning (oranžová) — „Blíží se deadline“
  - Danger (červená) — „Expirace / Zamítnuto / Chyba“
  - Info (modrá) — „Systémová informace“

> Pozn.: Konkrétní odstíny neutrálních a status barev se doladí v UI návrhu, důležité je držet **semantiku** (ne „náhodné hex kódy“).

### 2) Typografie (desktop)
- H1: stránkový nadpis (1×/screen)
- H2: sekce (max 3–5/stránka)
- H3: card title
- Body: hlavní text
- Caption/Meta: pomocné popisky, tabulkové meta, datumy, SLA
- Mono (volitelně): pro ID, reference, audit log

### 3) Spacing scale (4px baseline)
- 4 / 8 / 12 / 16 / 24 / 32 / 40 / 56 / 72

### 4) Radius & shadow
- Radius: 8 (karty, inputy), 12 (větší karty/modaly)
- Shadow: jemný (karta na světlém backgroundu), případně jen outline

### 5) Ikonografie
- Outline ikony, jednotná stroke tloušťka
- Ikony používat jako **sekundární** signál (nikdy ne samotná informace)

Komponenty:
- N/A

Layout:
- N/A

Stavy:
- N/A

Validace a pravidla:
- Status barvy nikdy nepoužívat jako jediný nosič informace (vždy text + ikonka).
- Odkazy i focus stavy musí být rozlišitelné i bez barvy (underline/focus ring).

Analytické eventy:
- N/A

ASCII wireframe:
[— Neaplikuje se —]

---

## [DS-020] Layout a navigace — App shell (desktop)

Cíl uživatele:
Rychle se zorientovat (kde jsem) a přepínat mezi „Marketplace / Moje rezervace / Finance“.

Cíl byznysu:
Zkrátit time-to-action a snížit ztracení uživatele v procesu (hlavně broker).

Primární CTA / sekundární CTA:
- N/A (strukturální)

KPI:
- nav_click_depth
- bounce_rate (in-app) po přihlášení
- time_to_first_action

Obsah (texty 1:1):
### Nav (role-based)
**Broker**
- Marketplace
- Moje rezervace
- Projekty (jen pokud hybrid: „Přivedené projekty“)
- Finance
- Profil / Nastavení

**Developer**
- Tikety & projekty
- Rezervace (přijaté)
- Finance
- Tým
- Profil / Nastavení

**Admin**
- Schvalování (uživatelé, tikety)
- Tikety / Projekty
- Rezervace
- Finance & Pool
- Nastavení systému
- Audit log

Komponenty:
- Left nav (collapsible)
- Top bar (breadcrumb, page actions, user menu)
- Page header (H1, meta, primary CTA area)
- Content container

Layout:
- Desktop: left nav (fixed), content area (max width), sticky top bar
- Page header vždy obsahuje: H1 + krátké meta (např. „Aktualizováno…“) + primární CTA (pokud existuje)

Stavy:
- responsive collapse nav pro užší desktop (např. 1024px)

Validace a pravidla:
- Role‑based access: položky nav se zobrazují pouze relevantním rolím.

Analytické eventy:
- nav_item_clicked {role, item}
- breadcrumb_clicked {level, role}
- user_menu_opened

ASCII wireframe:
[Left nav] | [Top bar: Breadcrumbs .......... User]
-----------|--------------------------------------------------------
           | [H1 Page]                     [Primary CTA]
           | [Meta / SLA banner if relevant]
           | -------------------------------------------------------
           | [Content blocks...]

---

## [DS-030] Komponenta: Button (tlačítka)

Cíl uživatele:
Jasně poznat, co je hlavní akce a co je vedlejší.

Cíl byznysu:
Vyšší konverze na kritické kroky, méně misclicků (zejména u „zamítnout“).

Primární CTA / sekundární CTA:
- N/A (komponenta)

KPI:
- misclick_rate (proxy: rychlý undo/back)
- conversion_rate na primární CTA v kritických flow

Obsah (texty 1:1):
### Varianty
- Primary (solid) — hlavní akce
- Secondary (outline) — vedlejší akce
- Tertiary (ghost/link) — pomocné akce
- Destructive (solid/outline) — rušící akce (zamítnout, zrušit)

### Velikosti
- M (default), S (v tabulkách/toolbaru)

### Stavy
- default / hover / active
- disabled
- loading (spinner + zamknuté klikání)

### Content pravidla
- 2–4 slova, sloveso na začátku: „Odeslat k podpisu“, „Potvrdit financování“
- Nikdy nepoužívat „OK“ a „Ano“ bez kontextu
- Destructive vždy s jasným slovem „Zamítnout“, „Zrušit“

Komponenty:
- Button

Layout:
- Primary CTA vpravo v page header nebo sticky action area
- Secondary CTA vlevo / vedle primary (max 1)

Stavy:
- loading state blokuje dvojklik (idempotence na UI úrovni)

Validace a pravidla:
- Destructive akce vždy s confirm modalem (viz DS‑080), pokud je nevratná.

Analytické eventy:
- ui_button_clicked {component_variant, label, screen_id}

ASCII wireframe:
[(Primary) Odeslat k podpisu] [(Secondary) Uložit] [Tertiary link]

---

## [DS-040] Komponenta: Form field (input, textarea, select) + validace

Cíl uživatele:
Vyplnit údaje bez chyb a mít okamžitě jasné, co je špatně.

Cíl byznysu:
Méně chyb v datech (investor e-mail, částky), méně supportu.

Primární CTA / sekundární CTA:
- N/A

KPI:
- form_error_rate
- form_completion_time

Obsah (texty 1:1):
### Struktura pole
- Label (povinný)
- Input / Select
- Helper text (volitelný)
- Error message (jen při chybě)

### Povinné prvky
- Povinné pole označit „*“ a textem „Povinné“ v helperu (ne jen hvězdička).
- Error message konkrétní: „Zadejte platný e‑mail (např. jmeno@firma.cz).“

### Typy polí (MVP)
- text, email, phone
- numeric (částky) — s formátováním „20 000 000“
- select (jednovýběr)
- multi‑select (pro tagy/typ financování)
- textarea
- date (picker nebo maskovaný input)

Komponenty:
- Input
- Select
- Textarea
- Helper + Error text
- Inline icon (valid/invalid)

Layout:
- Form grid 2 sloupce pro desktop (pokud to dává smysl), jinak 1 sloupec
- Pole seskupovat do sekcí s H2/H3

Stavy:
- default / focus / filled
- error
- disabled
- read‑only (např. odemčené identity po aktivaci)

Validace a pravidla:
- Validace on blur + při submitu
- Server‑side error mapovat na konkrétní pole, pokud je to možné

Analytické eventy:
- ui_form_field_error {field, error_type, screen_id}
- ui_form_submitted {screen_id, has_error}

ASCII wireframe:
[Label] [Input........]
[Helper text]
[Error message if any]

---

## [DS-050] Komponenta: Table (seznamy) + filtry

Cíl uživatele:
Najít správný tiket/rezervaci rychle, porovnat parametry a mít jistotu v pořadí.

Cíl byznysu:
Vyšší aktivace (broker), rychlejší rozhodování (developer), nižší chaos.

Primární CTA / sekundární CTA:
- N/A (pattern)

KPI:
- filter_apply_rate
- row_open_rate
- time_to_find_ticket

Obsah (texty 1:1):
### Zásady tabulek
- 1 řádek = 1 entita (tiket/rezervace/faktura)
- První sloupec vždy obsahuje „název“ + sekundární meta
- Poslední sloupec: stav + SLA badge + quick action (pokud existuje)

### Filtry (MVP)
- Search (fulltext: název, ID)
- Status
- Datum (range)
- Částka (min/max)
- LTV (range) — pokud je dostupné
- „Jen moje“ / „Jen přivedené projekty“ (broker hybrid)

### Sorting
- Default: podle relevance (např. „nejbližší deadline“ pro rezervace)
- Umožnit sort na klíčových numeric sloupcích (částka, odměna)

Komponenty:
- Table
- Column header (sortable)
- Filter bar
- Filter chips
- Pagination

Layout:
- Nad tabulkou: H1 + KPI/meta + filter bar
- Tabulka: sticky header, row hover, klik řádku otevře detail

Stavy:
- empty: „Žádné výsledky“ + doporučení upravit filtry
- loading: skeleton rows
- error: inline banner „Data se nepodařilo načíst“

Validace a pravidla:
- Filtry musí být shareable v URL (post‑MVP) — MVP stačí v session.

Analytické eventy:
- ui_table_filter_applied {table_id, filters}
- ui_table_sort_changed {table_id, column, direction}
- ui_table_row_opened {table_id, entity_id}

ASCII wireframe:
[H1] [Meta]                         [Primary CTA]
[Search] [Status ▼] [Částka ▾] [LTV ▾] [Reset]
--------------------------------------------------------
| Název | Částka | Odměna | Stav + SLA | ... |
| row   | ...    | ...    | ...        | ... |
--------------------------------------------------------

---

## [DS-060] Pattern: Card (tiket / rezervace / KPI)

Cíl uživatele:
Rychle vyhodnotit a porovnat „to podstatné“ bez čtení detailu.

Cíl byznysu:
Zrychlení rozhodnutí = více rezervací, méně „scroll fatigue“.

Primární CTA / sekundární CTA:
- N/A

KPI:
- card_click_rate
- comparison_time

Obsah (texty 1:1):
### Ticket Card (MVP content order)
1) Název tiketu / projektu
2) Částka (Kč) + typ financování
3) Odměna brokera (Kč bez DPH)
4) Zajištění (tagy)
5) LTV (pokud dostupné)
6) Stav + platnost tiketu (SLA do expirace)

### Reservation Card (MVP content order)
1) Název tiketu
2) Investor (mask/unmask)
3) Stav + „kdo je na tahu“
4) Deadline odpočet
5) Quick action (pokud relevantní)

Komponenty:
- Card container
- Title + meta
- KPI row (amount, reward, LTV)
- Tag list
- Status pill + countdown pill

Layout:
- Grid 2–3 karty na řádek (desktop), dle šířky

Stavy:
- skeleton card
- empty state grid

Validace a pravidla:
- Nikdy nezobrazovat citlivé identity, pokud není splněn unlock.

Analytické eventy:
- ui_card_opened {card_type, entity_id}

ASCII wireframe:
[Card]
[Title]
[Amount] [Reward] [LTV]
[Tags...]
[Status pill] [Countdown]

---

## [DS-070] Pattern: Status & SLA (badge + countdown + process header)

Cíl uživatele:
Okamžitě vědět, co se děje, do kdy, a co bude následovat.

Cíl byznysu:
Zrychlení průchodu SLA (48h/48h/30 dní) a snížení sporů.

Primární CTA / sekundární CTA:
- N/A

KPI:
- time_to_next_step
- SLA_breach_rate

Obsah (texty 1:1):
### Status pill
- Krátký stav: „Čeká na podpis investora“, „V kapacitě“, „Aktivní“, „Profinancováno“
- Barva podle semantiky (info/warn/success/danger)

### Countdown pill (SLA)
- „Do vypršení: 17 h 32 min“
- Pokud < 6h: zobrazit jako Warning + ikonku
- Pokud expirováno: Danger + „Expirace“

### Process header (page pattern)
- Levá část: Status + krátké vysvětlení
- Pravá část: Deadline + hlavní CTA („Znovu poslat“, „Podepsat“, „Potvrdit financování“)
- Pod tím: krokovník (Timeline) pro orientaci

Komponenty:
- Badge/Status pill
- Countdown pill
- Banner / Process header container
- Stepper/Timeline (viz DS‑090)

Layout:
- Vždy nad foldem na detailových stránkách (rezervace, tiket, finance)

Stavy:
- loading: skeleton header
- error: banner

Validace a pravidla:
- Countdown musí používat jednotnou time zónu a formát (CZ).  
- Deadline vždy i jako datum/čas (ne jen „zbývá…“), kvůli přesnosti.

Analytické eventy:
- ui_sla_banner_viewed {entity_type, entity_id, sla_type, remaining_hours}
- ui_sla_primary_action_clicked {sla_type, action}

ASCII wireframe:
[Status pill] [Text: Kdo je na tahu]                [Do: 24. 1. 2026 14:00] [CTA]
[Timeline: 1) Souhlas+NDA 2) Rezervace 3) Kapacita 4) Jednání 5) Financování]

---

## [DS-080] Pattern: Feedback (alert banner, toast, modal, confirm)

Cíl uživatele:
Získat jasnou zpětnou vazbu, co se stalo, a jak to případně opravit.

Cíl byznysu:
Méně nejasností → méně supportu a sporů.

Primární CTA / sekundární CTA:
- N/A

KPI:
- error_recovery_rate
- support_contact_rate po chybě

Obsah (texty 1:1):
### Alert banner (inline)
- Info: „Odeslali jsme investorovi e‑mail s podpisem.“
- Warning: „Zbývá méně než 6 hodin do vypršení.“
- Danger: „Podpis se nepodařilo ověřit. Zkuste to znovu.“

### Toast (krátká akce)
- „Uloženo.“
- „Zkopírováno do schránky.“

### Confirm modal (nevratné akce)
- Title: „Opravdu chcete zamítnout rezervaci?“
- Body: „Po zamítnutí se rezervace posune ve frontě a investora nelze aktivovat bez nové rezervace.“
- CTA: „Zamítnout“ (destructive)
- Secondary: „Zpět“

Komponenty:
- Alert banner
- Toast
- Modal
- Button variants

Layout:
- Banner pod page headerem
- Toast vpravo nahoře (desktop)

Stavy:
- stacking toast max 3
- modal focus trap (accessibility)

Validace a pravidla:
- Modal musí mít klávesové ovládání: ESC zavře, Enter potvrdí (jen pokud není destructive default).
- Při destructive akcích nesmí být default focus na destructive CTA.

Analytické eventy:
- ui_alert_shown {type, message_id, screen_id}
- ui_modal_opened {modal_id}
- ui_modal_confirmed {modal_id}

ASCII wireframe:
[Banner: Warning ...]
[Modal]
[Title]
[Body]
[(Destructive) Zamítnout] [(Secondary) Zpět]

---

## [DS-090] Komponenta: Timeline / Stepper (procesní krokovník)

Cíl uživatele:
Rozumět procesu a vědět, kolik kroků zbývá.

Cíl byznysu:
Vyšší důvěra („proces je pod kontrolou“) a nižší drop‑off.

Primární CTA / sekundární CTA:
- N/A

KPI:
- stepper_view_rate na klíčových detailech
- dropoff_rate mezi kroky

Obsah (texty 1:1):
### Kroky (MVP)
1) Souhlas + NDA
2) Rezervační smlouva (investor)
3) Kapacita (developer)
4) Jednání (30 dní)
5) Financování (potvrzení)
6) Provize (vypořádání)

Stavy kroků:
- done / current / upcoming / blocked (např. čeká na podpis)

Komponenty:
- Stepper (horizontal)
- Step label
- Status icon (done/current)

Layout:
- pod process headerem na detailech rezervace a tiketu

Stavy:
- na malém desktopu může přejít do „mini“ režimu (zobrazí jen current + next)

Validace a pravidla:
- Kroky musí odpovídat reálným stavům entity (rezervace/tiket).

Analytické eventy:
- ui_stepper_viewed {entity_type, entity_id, current_step}

ASCII wireframe:
[1 done]—[2 current]—[3 upcoming]—[4 upcoming]—[5 upcoming]—[6 upcoming]

---

## [DS-100] Accessibility baseline (MVP)

Cíl uživatele:
Používat aplikaci i bez myši, s větším zoomem a s asistivními technologiemi.

Cíl byznysu:
Nižší právní a reputační riziko; vyšší použitelnost pro všechny.

Primární CTA / sekundární CTA:
- N/A

KPI:
- accessibility QA pass rate (interní checklist)

Obsah (texty 1:1):
### Minimální standard (MVP)
- Kontrast textu a UI prvků splňuje WCAG AA (zejména text na barevných pozadích).
- Klávesnice: vše dosažitelné přes TAB, jasný focus ring.
- Form error: textová hláška + vazba na konkrétní pole.
- Tabulky: správné hlavičky, čitelné řádky, sort je ovladatelný klávesnicí.
- Modal: focus trap, ESC zavře, návrat focusu.

Komponenty:
- N/A

Layout:
- N/A

Stavy:
- N/A

Validace a pravidla:
- Podpora zoom 125–150 % bez rozbití layoutu (desktop).

Analytické eventy:
- N/A

ASCII wireframe:
[— Neaplikuje se —]

---

---

---

# EPIC 12 — UI ↔ Backend kontrakt (permissions, view‑modely, SLA, chyby, analytics)

## Cíl EPICu
- Zajistit, že hi‑fi UI jde realizovat bez „domýšlení“: UI přesně ví, **jaká data dostane**, kdo je **smí vidět**, jak zobrazit **SLA/countdown**, jaké existují **chyby** a jak je komunikovat.
- Snížit riziko incidentů v citlivých místech (maskování/odmaskování, fronta/kapacita, provize), zejména u hybrid brokera (broker2).

## In‑scope (MVP)
- Permission kontrakt: **Role × Akce × Data** (včetně broker1 vs broker2).
- View‑modely (payloady) pro klíčové UI bloky: TicketCard, TicketDetail, ReservationRow/Detail, Matching list, Finance/Commission, Pool.
- Standard UI pro SLA: termíny, countdown, thresholds pro warning.
- Error‑copy standard (CZ) + mapování na error codes.
- UI eventy pro měření (doplněk k AN‑100 v UX EPIC 12).

## Out‑of‑scope
- DB schéma, interní implementace integrací a low‑level field mapping u eSign providera (řeší vývoj).
- Kompletní event dictionary (je v UX EPIC 12, zde držíme UI‑vrstvu).

## Nejasnosti (otázky na mě)
- Žádné — doplňuji podle kanonických dat a logiky MVP.

## Předpoklady (co doplňujeme sami)
- Časová zóna: **Europe/Prague**; všechna SLA počítáme z timestampů.
- Formát data/času (CZ): `dd. mm. yyyy` a `dd. mm. yyyy, HH:MM` (24h).
- Formát částek: `20 000 000 Kč` (mezery), komunikace **bez DPH**.
- Investor nemá účet; všechny investor‑akce jsou přes eSign odkaz (envelope).

---

## [PERM-100] Role × Permissions (MVP) — kontrakt pro UI

Cíl uživatele:
Mít správné informace ve správný čas a nevidět nic, co vytváří riziko obcházení nebo GDPR incident.

Cíl byznysu:
Ochrana introdukcí (auditní stopa), minimalizace sporů a zneužití, jasná odpovědnost v procesech.

Primární CTA / sekundární CTA:
- N/A

KPI:
- # incidentů „leak“ (PII / maskování) = 0
- # sporů o introdukci (s auditním důkazem)

Obsah (texty 1:1):

### 1) Role v systému (MVP)
- **Admin (Platforma)** — globální přístup + override (vždy s důvodem a auditní stopou).
- **Broker (Organizace)** — 2 úrovně:
  - `OWNER` (správa investorů, finance, tým)
  - `MEMBER` (marketplace, rezervace)
- **Developer (Organizace)** — 3 úrovně:
  - `OWNER` (vše v rámci org)
  - `MEMBER` (projekty, tikety, rezervace)
  - `FINANCE` (finance/invoice workflow + potvrzení profinancování, pokud to nechceme blokovat jen na OWNER)

### 2) Kontextové role brokera na rezervaci
- **Broker1 = přivedl investora** (`broker1_org_id`)  
  → vidí investorův záznam (PII), vytváří rezervaci, komunikuje eSign, fakturuje provizi.
- **Broker2 = přivedl projekt** (`broker2_org_id`, hybrid)  
  → má nárok na podíl provize a potřebuje přehled o průběhu, **ale investor je pro něj PII, které nepotřebuje**.

**Doporučení pro MVP (anti‑obcházení):**
- Broker2 v UI vidí u rezervací pouze **anonymizovaný investor label** (`Investor #1234` / `Investor A`) + parametry (částka, stav, deadliny, provize), **nikoli jméno/e‑mail** investora.
- Plné PII investora je pouze pro Broker1 + Admin + (Developer po Souhlas+NDA).

### 3) Přístup k dokumentům (MVP)
- **Souhlas GDPR + NDA (Platforma ↔ Investor):**
  - Admin: ano
  - Broker1: ano (pro audit / důkaz)
  - Broker2: ne (nepotřebuje)
  - Developer: ano **až po podpisu investora** (Souhlas+NDA)
- **Rezervační smlouva (Developer ↔ Investor):**
  - Broker1: ano (po podpisu investora)
  - Developer: ano **až při vstupu rezervace do kapacity** (kdy je vyžadována jeho akce)
  - Admin: ano
  - Broker2: ne (stačí status + proof, bez dokumentu)

### 4) Přístup k financím / provizím (MVP)
- Broker1 i Broker2 vidí **svůj podíl** na provizi + status payout.
- Developer vidí pouze **platform invoice** (co má uhradit platformě) a status „uhrazeno/neuhrazeno“.
- Admin vidí vše (splity, faktury, payout).

Komponenty:
- N/A

Layout:
- N/A

Stavy:
- N/A

Validace a pravidla:
- V každém API payloadu musí být explicitně vyhodnoceno, zda uživatel smí vidět PII (např. `can_view_investor_pii: true/false`).
- Pokud `can_view_investor_pii=false`, UI nikdy nesmí renderovat jméno/e‑mail ani v tooltipu či exportu.

Analytické eventy:
- `permission_denied_shown` {screen_id, action, entity_type}

ASCII wireframe:
[— Neaplikuje se —]

---

## [DATA-115] Sloty brokera & kapacita tiketu — co se počítá (MVP)

Cíl uživatele:
Vědět, proč mu systém dovolí / nedovolí vytvořit další rezervaci a jak funguje fronta/kapacita na tiketu.

Cíl byznysu:
Udržet férovou konkurenci a zabránit „zahlcení“ systému jedním brokerem.

Primární CTA / sekundární CTA:
- N/A

KPI:
- # rezervací blokovaných kvůli slotům (a jejich následné dokončení)
- # sporů o pořadí ve frontě = 0

Obsah (texty 1:1):

### 1) Sloty brokera (capacity na běžící rezervace)
- **Slot = kapacita na současně otevřené (běžící) rezervace** u brokera.  
- Sloty nastavuje **admin** na úrovni broker profilu (`slots_total`).
- Slot se považuje za obsazený pro rezervace ve stavech:
  - `ESIGN_SENT`, `ESIGN_COMPLETED`, `QUEUE`, `IN_CAPACITY`, `DEV_SIGNED`, `ACTIVE_NEGOTIATION`, `FUNDED_CONFIRMED`, `DISPUTE`
- Slot se uvolní, když rezervace přejde do:
  - `CLOSED_SUCCESS` nebo `CLOSED_FAIL`

**UI data potřeba:**
- `broker_slots_total`
- `broker_slots_used`
- `broker_slots_remaining`

### 2) Kapacita tiketu (top N akčních rezervací)
- Každý tiket má `capacity_total_N` (admin).
- **Do kapacity se počítají rezervace až od podpisu investora** (v MVP je to `ESIGN_COMPLETED`, protože envelope obsahuje i rezervační smlouvu).
- Po podpisu investora:
  - pokud je volno, rezervace jde do `IN_CAPACITY` a startuje SLA developera,
  - pokud je kapacita obsazená, rezervace jde do `QUEUE` a čeká na posun.
- Pořadí ve frontě určuje timestamp podpisu investora (first‑come first‑served).
- Když rezervace v kapacitě odpadne (reject, SLA expired, fail), systém:
  - automaticky posune další rezervaci z `QUEUE` do `IN_CAPACITY`,
  - založí audit event `res_entered_capacity`,
  - pošle notifikaci developerovi.

**UI data potřeba pro tiket:**
- `capacity_total_N`
- `capacity_used`
- `queue_count`
- `is_user_in_capacity` (na konkrétní rezervaci)

Komponenty:
- CapacityPill (např. „Kapacita 2/3“), QueuePositionBadge, SlotCounter

Layout:
- N/A

Stavy:
- pokud broker nemá slot → UI banner „Vyčerpaná kapacita“
- pokud tiket expiroval → CTA disabled (nové rezervace ne)

Validace a pravidla:
- UI nesmí blokovat odeslání eSign jen proto, že kapacita tiketu je plná (správné chování je „po podpisu půjde do fronty“).

Analytické eventy:
- `broker_slot_limit_hit` {broker_org_id}
- `ticket_capacity_full_viewed` {ticket_id}

ASCII wireframe:
[— Neaplikuje se —]

---

## [VM-140] View‑model: Provize (CommissionCase) + Faktury (MVP)

Cíl uživatele:
Vidět, kdy vznikl nárok na provizi, jaký je stav fakturace a kdy přijde výplata.

Cíl byznysu:
Zrychlit cashflow a snížit ruční dohledávání.

Primární CTA / sekundární CTA:
- N/A (view‑model)

KPI:
- time_to_platform_payment
- time_to_broker_payout

Obsah (texty 1:1):

### CommissionCaseVM (povinná pole)
- `commission_id`
- `reservation_id`, `ticket_id`
- `funded_amount_czk`
- `total_fee_pct` (v MVP 5 %; v UI komunikace bez DPH)
- `split`:
  - `platform_pct=50`
  - `broker1_pct=25` (nebo `50`, pokud broker2 neexistuje)
  - `broker2_pct=25` (pokud existuje)
- `amounts_net_czk` (platform, broker1, broker2)
- `status` (WAITING_PLATFORM_INVOICE → WAITING_PAYMENT → … → PAYOUT_DONE)
- `platform_invoice` {status, due_date, file_url?}
- `broker_invoice` {status, file_url?} (pro každého brokera zvlášť, pokud 2)
- `timestamps` (payment_confirmed_at, payout_done_at)

Komponenty:
- StatusStepper, InvoiceBlock, AmountSplitRow

Layout:
- N/A

Stavy:
- pokud chybí funded_amount → provize ještě nevznikla (UI ukáže „Čeká na profinancování“)

Validace a pravidla:
- Broker vidí jen svůj podíl a své faktury (a agregát).
- Developer nevidí broker faktury; vidí platform invoice.

Analytické eventy:
- `commission_viewed` {commission_id, role}
- `invoice_upload_clicked` {commission_id, issuer_role}

ASCII wireframe:
[— Neaplikuje se —]

---

## [VM-150] View‑model: Pool program (MVP)

Cíl uživatele:
Pochopit, že existuje bonus program, jak funguje období a jaké jsou výsledky (bez PII).

Cíl byznysu:
Retence brokerů a motivace k aktivitě.

Primární CTA / sekundární CTA:
- N/A

KPI:
- pool_participation_rate
- broker_retention

Obsah (texty 1:1):

### PoolPeriodVM (povinná pole)
- `pool_period_id`
- `period_start`, `period_end`
- `status` (OPEN/CLOSED/PAID_OUT)
- `rules_snapshot` (text/meta; v MVP stačí odkaz/summary)
- `progress` (volitelné): kolik je v poolu (agregát), počet kvalifikovaných aktivit
- `winners[]` (anonymizované štítky A/B/C + výhra částka)

Komponenty:
- PoolCard, PeriodStatusBadge, WinnersTable

Layout:
- N/A

Stavy:
- pokud pool není aktivní → UI sekci skrýt (feature flag) nebo zobrazit „Brzy“ (dle rozhodnutí)

Validace a pravidla:
- V pool výsledcích nikdy nezobrazovat PII.

Analytické eventy:
- `pool_viewed` {pool_period_id}
- `pool_rules_opened` {pool_period_id}

ASCII wireframe:
[— Neaplikuje se —]

---

## [VM-100] View‑model: TicketCard (Marketplace)

Cíl uživatele:
Rychle rozhodnout, zda tiket stojí za otevření detailu.

Cíl byznysu:
Zkrátit time‑to‑first‑reservation a zvednout kvalitu výběru.

Primární CTA / sekundární CTA:
- N/A (view‑model)

KPI:
- ticket_open_rate
- reservation_start_rate

Obsah (texty 1:1):

### TicketCardVM (povinná pole pro UI)
- `ticket_id`
- `ticket_type` (DLUHOVÝ/KAPITÁLOVÝ)
- `target_amount_czk`
- `expected_yield_pa_pct`
- `duration_months`
- `region` (kraj)
- `security_types[]` (+ pořadí, pokud relevantní)
- `ltv_pct` (nullable)
- `broker_reward_net_czk` (vypočtená odměna pro brokera v Kč)
- `publish_to` (pro countdown expirace)
- `status` (PUBLISHED/HIDDEN/EXPIRED/CLOSED…)
- `masking_level` (TEASER/UNLOCKED) + `masked_fields[]`
- `match_count` (nullable; pokud existuje matching modul)

### TicketCardVM (doporučená pole)
- `min_investment_czk` (nullable)
- `use_of_funds_top_tags[]` (např. „Výstavba 60 %“)
- `capacity_total_N` + `capacity_used` (pro UI indikaci konkurence; volitelné)

Komponenty:
- TicketCard (Compact/Expanded), StatusBadge, CountdownBadge, MatchCountBadge

Layout:
- N/A

Stavy:
- `status=EXPIRED` → CTA disabled + tooltip „Po expiraci nelze zakládat nové rezervace.“
- `ltv_pct=null` → UI text „LTV neuvedeno“ (nechybovat).

Validace a pravidla:
- UI nikdy nesmí zobrazit odmaskované údaje, pokud `masking_level=TEASER`.
- Countdown se počítá z `publish_to` v CZ timezone.

Analytické eventy:
- `ticket_card_impression` {ticket_id, position, filters}

ASCII wireframe:
[— Neaplikuje se —]

---

## [VM-110] View‑model: TicketDetail (“Decision Pack”)

Cíl uživatele:
Vyhodnotit tiket a spustit matching / rezervaci.

Cíl byznysu:
Zvýšit konverzi do rezervace a snížit nekvalitní rezervace.

Primární CTA / sekundární CTA:
- N/A (view‑model)

KPI:
- detail_to_reservation_rate

Obsah (texty 1:1):

### TicketDetailVM (povinná pole)
- vše z TicketCardVM +
- `project_id`
- `project_teaser` (maskovaný/odemknutý text)
- `attachments[]` (meta: name, type, size, url, visibility_rules)
- `use_of_funds_split[]` (category, pct; součet 100 %)
- `capacity_total_N`, `queue_count` (kolik podepsaných čeká mimo kapacitu; volitelné)
- `sla_investor_sign_hours=48` (pro UI copy; nebo přímo timestamp deadline per reservation)
- `sla_developer_decision_hours=48`
- `negotiation_days=30`

Komponenty:
- TiketHero, MetricGrid, AttachmentList, UseOfProceedsTable/Chart, StickyCTA

Layout:
- N/A

Stavy:
- pokud chybí attachments → „Podklady nejsou nahrané“ + ReadyScore nízké (MVP)

Validace a pravidla:
- `use_of_funds_split` musí být 100 % (server validace; UI může renderovat i partial, ale musí ukázat „Nesoučet 100 %“ jako warning).
- Dokumenty s vyšší citlivostí respektují `visibility_rules` (masking).

Analytické eventy:
- `ticket_detail_viewed` {ticket_id, masking_level}

ASCII wireframe:
[— Neaplikuje se —]

---

## [VM-120] View‑model: Rezervace (Row + Detail)

Cíl uživatele:
Vědět, kde je rezervace „zaseklá“, kdo je na tahu a do kdy.

Cíl byznysu:
Snížit SLA expirace a zvýšit win‑rate do profinancování.

Primární CTA / sekundární CTA:
- N/A (view‑model)

KPI:
- sla_breach_rate
- time_in_stage

Obsah (texty 1:1):

### ReservationVM (povinná pole)
- `reservation_id`, `ticket_id`, `project_id`
- `stage` (DRAFT/ESIGN_SENT/ESIGN_COMPLETED/QUEUE/IN_CAPACITY/DEV_SIGNED/ACTIVE_NEGOTIATION/FUNDED_CONFIRMED/CLOSED_…)
- `deadlines`:  
  - `investor_sign_deadline_at` (T+48h od odeslání envelope)  
  - `developer_decision_deadline_at` (od vstupu do kapacity)  
  - `negotiation_deadline_at` (od aktivace)
- `queue_position` (nullable) + `in_capacity` (bool)
- `funded_amount_czk` (nullable) + `funded_date` (nullable)
- `broker_reward_net_czk` (nullable; až po profinancování finální)

### Investor identifikace (dle permissions)
- pokud `can_view_investor_pii=true`:
  - `investor_name`, `investor_company` (nullable), `investor_email` (pro audit)
- jinak:
  - `investor_label` (např. „Investor A“, „Investor #1234“)

### Broker2 view (hybrid, project introducer)
- Broker2 musí dostat `reservation_visibility=LIMITED` + `investor_label` vždy.
- Broker2 vidí: stage, deadliny, částku, status financování, provizní případ.

Komponenty:
- ProcessHeader (stage + countdown), Timeline, StatusBadge, ActionBar

Layout:
- N/A

Stavy:
- `stage=CLOSED_FAIL` → UI musí ukázat `failure_reason` (enum → CZ text)
- `stage=DISPUTE` → blokace finance akcí, banner „Probíhá řešení sporu“.

Validace a pravidla:
- Developer vidí investorem podepsanou rezervační smlouvu až při `in_capacity=true`.
- Přechody stavů musí být auditované (timestamp + actor).

Analytické eventy:
- `reservation_stage_viewed` {reservation_id, stage}

ASCII wireframe:
[— Neaplikuje se —]

---

## [VM-130] View‑model: Matching (Doporučení investorů)

Cíl uživatele:
Rychle vybrat investora, který „sedí“, a mít argumenty proč.

Cíl byznysu:
Zvýšit kvalitu rezervací a snížit ruční práci brokera.

Primární CTA / sekundární CTA:
- N/A (view‑model)

KPI:
- match_to_reservation_rate

Obsah (texty 1:1):

### MatchingItemVM (na 1 investora)
- `investor_id`
- `display_name` (broker interní název: firma + osoba)
- `match_score` (0–100) + `match_level` (HIGH/MED/LOW)
- `reasons[]` (max 3): např. „Částka v rozsahu“, „Preferuje zajištění: nemovitost“, „Max LTV 65 % (tiket 62 %)“
- `hard_mismatches[]` (pokud existují): např. „Výnos mimo rozsah“
- `recommended_amount_czk` (optional; pokud investor má max limit)

### UI pravidlo (compliance)
- vždy disclaimer: „Doporučení, nikoli investiční poradenství.“

Komponenty:
- MatchingTable/List, ScoreBadge, ReasonChips

Layout:
- N/A

Stavy:
- prázdný výsledek: „Pro tento tiket nemáme žádné vhodné investory.“
- bez investorů u brokera: CTA „Přidat investora“.

Validace a pravidla:
- Matching endpoint nesmí vracet PII mimo brokerovu organizaci.
- `reasons[]` nesmí obsahovat citlivá data jiných subjektů (jen parametry).

Analytické eventy:
- `matching_item_clicked` {ticket_id, investor_id, match_score}

ASCII wireframe:
[— Neaplikuje se —]

---

## [SLA-100] SLA & countdown standard (UI)

Cíl uživatele:
Okamžitě vidět deadline a „kdo je na tahu“.

Cíl byznysu:
Minimalizovat promeškání SLA a urychlit konverzi.

Primární CTA / sekundární CTA:
- N/A

KPI:
- sla_warning_seen_rate
- sla_breach_rate

Obsah (texty 1:1):
- SLA badge má 4 stavy:
  1) `Zbývá 48 h` (default)
  2) `Zbývá 12 h` (warning threshold; zvýraznit)
  3) `Zbývá 1 h` (danger)
  4) `Lhůta vypršela` (disabled akce + vysvětlení)
- Tiket expirace (publikační okno):
  - `Zbývá {X} dní` (>= 8 dní)
  - `Zbývá {X} dní` (<= 7 dní, warning)
  - `Expirovaný` (po publish_to; bez nových rezervací)

Komponenty:
- CountdownBadge, ProcessHeader, StatusBanner

Layout:
- N/A

Stavy:
- `SLA_EXPIRED` → banner + CTA „Zpět na seznam / vytvořit novou rezervaci“ (dle kontextu)

Validace a pravidla:
- Countdown se řídí server timestamps (ne lokálním časem klienta, pokud je rozdíl).

Analytické eventy:
- `sla_warning_shown` {entity_type, entity_id, deadline_type, hours_left_bucket}

ASCII wireframe:
[— Neaplikuje se —]

---

## [ERR-110] Error‑copy (CZ) — mapování pro UI

Cíl uživatele:
Rozumět chybě a vědět, co dělat dál.

Cíl byznysu:
Snížit drop‑off a support zátěž.

Primární CTA / sekundární CTA:
- N/A

KPI:
- retry_success_rate
- support_contact_rate

Obsah (texty 1:1):
- `AUTH_REQUIRED`: **Platnost relace vypršela. Přihlaste se prosím znovu.**
- `PERMISSION_DENIED`: **K této akci nemáte oprávnění.**
- `NOT_FOUND`: **Tuto položku se nepodařilo najít.**
- `VALIDATION_ERROR`: **Zkontrolujte prosím zvýrazněná pole.**
- `CONFLICT_STATE`: **Stav se mezitím změnil. Akci nelze dokončit.**
- `SLA_EXPIRED`: **Lhůta vypršela. Rezervace byla uzavřena.**
- `CAPACITY_LIMIT_REACHED`: **Máte vyčerpanou kapacitu otevřených rezervací. Dokončete běžící rezervace nebo kontaktujte administrátora.**
- `ESIGN_PROVIDER_ERROR`: **Nepodařilo se odeslat podpis. Zkuste to prosím znovu.**
- `UPLOAD_FAILED`: **Soubor se nepodařilo nahrát. Zkuste to prosím znovu.**

Komponenty:
- InlineAlert, Toast, ErrorPage (fallback)

Layout:
- N/A

Stavy:
- `retryable=true` → CTA „Zkusit znovu“
- `retryable=false` → CTA „Kontaktovat podporu“ (v MVP: e‑mail)

Validace a pravidla:
- Nikdy nezobrazovat technický stacktrace; correlation_id jen pro admin debug.

Analytické eventy:
- `ui_error_shown` {error_code, screen_id, retryable}

ASCII wireframe:
[— Neaplikuje se —]

---

## [AN-110] UI eventy (doplněk k AN‑100)

Cíl uživatele:
- N/A

Cíl byznysu:
Měřit reálné chování v UI (filtry, kliky, drop‑off) bez PII.

Primární CTA / sekundární CTA:
- N/A

KPI:
- conversion funnel dle AN‑100
- feature adoption (matching, saved filters, reminders)

Obsah (texty 1:1):
### UI‑level eventy (doporučení)
- `ui_screen_viewed` {screen_id, role}
- `ui_primary_cta_clicked` {screen_id, cta_id}
- `ui_filter_applied` {screen_id, filter_snapshot}
- `ui_tab_switched` {screen_id, tab_id}
- `ui_export_clicked` {scope}
- `ui_support_clicked` {context}

PII pravidla:
- Do UI eventů nikdy neposílat: jméno/e‑mail investora, název odmaskovaného projektu, dokumenty.

Komponenty:
- N/A

Layout:
- N/A

Stavy:
- N/A

Validace a pravidla:
- UI eventy se posílají až po potvrzení, že uživatel je přihlášen (má org + roli).

Analytické eventy:
- (toto je jejich definice)

ASCII wireframe:
[— Neaplikuje se —]

---

# EPIC 13 — Screen kit & template mapping (Hi‑Fi aplikace)

## Cíl EPICu
- Převést všechny UX obrazovky na **opakovatelný set UI šablon** (page templates), aby se v UI nevymýšlelo „od nuly“ a všechny části aplikace působily jednotně.
- Zajistit, že klíčové motivátory persony (rychlost, důvěra, ochrana proti obcházení, jasná provize) jsou viditelné **v layoutu i v hierarchii**.
- Urychlit práci ve Figmě: designér skládá screens z template + komponent, místo kreslení ad‑hoc.

## Nejasnosti (otázky na mě)
- **Žádné —** pro EPIC 13 a 14 doplňuji volby „logicky“ jako default.

## Předpoklady (co doplňujeme sami)
- **Breakpoints (desktop‑first):** 1280 / 1024 / 768 px. Pod 768 px aplikaci v MVP nepodporujeme (zobrazí se „desktop only“ banner).
- **Formát data/času (CZ):** `dd. mm. yyyy` a `dd. mm. yyyy, HH:MM` (24h), časová zóna Europe/Prague.
- **Formát částek:** `20 000 000 Kč` (mezery jako oddělovač tisíců), primárně **bez DPH**; kde je to důležité, doplnit „bez DPH“ jako caption.
- **Hlavní navigace:** role‑based (viz DS‑020), v detailu vždy breadcrumbs.
- **Základní hustota UI:** „calm“ (whitespace), ale tabulky mají být **informativní** (ne příliš roztažené).

---

## [TPL-010] Template: Auth / Gate (Centered card)

Cíl uživatele:
Rychle se přihlásit nebo požádat o přístup a pochopit, že jde o uzavřený pilot.

Cíl byznysu:
Kvalitní onboarding partnerů (broker/developer) + jasné očekávání admin approval.

Primární CTA / sekundární CTA:
- Primární: dle obrazovky („Přihlásit se“, „Odeslat žádost“)
- Sekundární: „Zapomenuté heslo“, „Zpět“

KPI:
- login_success_rate
- signup_submit_rate
- approval_wait_dropoff_rate

Obsah (texty 1:1):
- Headline je vždy konkrétní (např. „Přihlášení“, „Požádat o přístup“)
- Perex vždy vysvětluje gating: „Přístup získáte po schválení administrátorem.“

Komponenty:
- Logo
- Card container (max‑width 520–600)
- Form fields (label + hint + error)
- Primary button (+ loading)
- Inline alert (error/success)
- Stepper (pokud 2‑kroková žádost)

Layout (popis zón):
- Header: Logo
- Body: Centered card
- Footer: legal microcopy

Stavy:
- loading: disabled CTA + spinner
- error: inline alert
- success: redirect na „Čeká na schválení“

Validace a pravidla:
- Email validace (format)
- Heslo: min. 10 znaků (MVP), zobrazení „show/hide“

Analytické eventy:
- ui_auth_viewed {screen_id}
- ui_auth_submitted {screen_id, role}
- ui_auth_error {screen_id, error_code}

ASCII wireframe:
[Logo]
--------------------------------
[ Card ]
[ H1 ]
[ Perex ]
[ Form fields... ]
[ Primary CTA ]
[ Links / Secondary ]
--------------------------------

---

## [TPL-020] Template: App List — Card Grid (Marketplace)

Cíl uživatele:
Rychle „proskenovat“ tikety a najít ty, které splňují filtr 20M+ a mají dobrou odměnu/proof.

Cíl byznysu:
Zvýšit počet otevřených detailů a zahájených rezervací.

Primární CTA / sekundární CTA:
- Primární: „Otevřít detail“ (na kartě / klik)
- Sekundární: „Uložit filtr“, „Zobrazit shody“ (na detailu)

KPI:
- marketplace_card_open_rate
- ticket_detail_view_rate
- reservation_start_rate

Obsah (texty 1:1):
- H1: „Marketplace“
- Subtext: „Vyberte tiket a založte rezervaci. Identita projektu se odemkne až po podpisu Souhlasu a NDA.“
- Filtry (labely): „Hledat“, „Status“, „Částka“, „Kraj“, „Forma financování“, „Zajištění“, „LTV“
- Na kartě vždy: **částka (Kč)**, **odměna (Kč bez DPH)**, **platnost (do expirace)**, **LTV (pokud je)**

Komponenty:
- Page header (H1 + meta)
- Filter bar (search + selects + chips + reset)
- Card grid (2–3 sloupce)
- Ticket Card (DS‑060)
- Empty state module

Layout (popis zón):
- Header: H1 + krátké vysvětlení + (volitelně) „Moje filtry“
- Body: Filter bar → grid karet
- Footer: pagination (pokud je)

Stavy:
- loading: skeleton cards (min. 6)
- empty: „Nenašli jsme žádný tiket pro zvolené filtry.“
- error: banner + „Zkusit znovu“

Validace a pravidla:
- „LTV“ se zobrazuje jen pokud je vyplněno (jinak „LTV: neuvedeno“).
- Platnost tiketu vždy jako **zbývá X dní** + datum „Platnost do“.

Analytické eventy:
- ui_marketplace_viewed {role}
- ui_filter_applied {filters}
- ui_ticket_card_opened {ticket_id}
- ui_ticket_card_compare_added {ticket_id} (post‑MVP)

ASCII wireframe:
[H1 Marketplace] [Subtext]
[Search][Status][Částka][Kraj][Forma][Zajištění][LTV] [Reset]
----------------------------------------------------------
[Card][Card][Card]
[Card][Card][Card]
----------------------------------------------------------
[Pagination]

---

## [TPL-030] Template: App List — Table (Inbox / Finance / Admin)

Cíl uživatele:
Pracovat efektivně se seznamem (rezervace, faktury, uživatelé) a filtrovat podle stavu a deadline.

Cíl byznysu:
Zrychlit SLA kroky (hlavně u rezervací) a snížit operační chyby.

Primární CTA / sekundární CTA:
- Primární: dle kontextu (např. „Export“, „Vytvořit“)
- Sekundární: „Reset filtrů“

KPI:
- list_filter_usage
- row_open_rate
- time_to_next_step

Obsah (texty 1:1):
- H1 podle sekce (např. „Rezervace“, „Finance“, „Schvalování“)
- Filtry vždy obsahují: Search, Status, Datum; podle entity navíc Částka / LTV / „Jen moje“

Komponenty:
- Table (DS‑050)
- Filter bar + chips
- Status pill + countdown pill (DS‑070)
- Row actions (… menu)

Layout:
- Header: H1 + meta + primary actions
- Body: filter bar → table
- Footer: pagination

Stavy:
- loading: skeleton rows
- empty: „Žádné výsledky“
- error: banner

Validace a pravidla:
- SLA sloupec je povinný u rezervací (kdo je na tahu + deadline).

Analytické eventy:
- ui_table_viewed {table_id}
- ui_table_filter_applied {table_id, filters}
- ui_table_row_opened {table_id, entity_id}

ASCII wireframe:
[H1]                                   [Primary CTA]
[Search][Status][Datum][Částka][LTV] [Reset]
--------------------------------------------------------
| Entita | Meta | Stav | SLA | Akce |
| ...    | ...  | ...  | ... | ...  |
--------------------------------------------------------

---

## [TPL-040] Template: Detail — 2‑column + Process Header (Ticket / Projekt / Rezervace / Finance)

Cíl uživatele:
Na detailu okamžitě vidět stav, deadline, další krok a klíčová čísla (částka, odměna, LTV, zajištění).

Cíl byznysu:
Snížit drop‑off v klíčových krocích (rezervace → podpisy → aktivace → financování).

Primární CTA / sekundární CTA:
- Primární: dle stavu (např. „Znovu poslat eSign“, „Podepsat“, „Potvrdit financování“)
- Sekundární: „Zobrazit audit“, „Zobrazit shody“, „Stáhnout dokumenty“

KPI:
- detail_primary_action_rate
- sla_breach_rate
- support_contact_rate

Obsah (texty 1:1):
- Nadpis: název entity + ID
- Process header vždy obsahuje:
  - Status pill + „kdo je na tahu“
  - Deadline (zbývá + datum/čas)
  - Hlavní CTA

Komponenty:
- Breadcrumbs
- Process header (DS‑070)
- Section cards (DS‑060)
- Proof pack (DS‑095)
- Timeline / audit (DS‑090, DS‑094)
- Sticky summary card (right column)

Layout (popis zón):
- Header: breadcrumbs → H1 → meta
- Body: 2 sloupce
  - Left: sekce detailu (parametry, dokumenty, timeline, audit)
  - Right: sticky summary (částka, odměna, LTV, zajištění, platnost) + CTA blok

Stavy:
- loading: skeleton header + skeleton sekcí
- error: banner + retry
- empty: relevantní jen pro sekce (např. „Zatím žádné dokumenty“)

Validace a pravidla:
- Maskované informace se odemknou pouze po splnění pravidel (unlock).
- Všechny downloady dokumentů musí logovat audit event.

Analytické eventy:
- ui_detail_viewed {entity_type, entity_id}
- ui_detail_primary_clicked {entity_type, entity_id, action}
- ui_section_expanded {entity_type, section_id}

ASCII wireframe:
[Breadcrumbs]
[H1 Název + #ID]
[Status pill][Kdo je na tahu]            [Deadline] [Primary CTA]
---------------------------------------------------------------
| Left column (sections)     | Right sticky summary            |
| - Parametry                | - Částka                        |
| - Zajištění + LTV          | - Odměna (bez DPH)              |
| - Dokumenty                | - Platnost tiketu               |
| - Timeline                 | - Quick links                   |
| - Audit log                |                                 |
---------------------------------------------------------------

---

## [TPL-050] Template: Wizard / Form (Step flow)

Cíl uživatele:
Dokončit kritickou akci bez chyb: vybrat investora → poslat eSign balík, nebo založit tiket.

Cíl byznysu:
Minimalizovat rozpracované / nedokončené procesy.

Primární CTA / sekundární CTA:
- Primární: „Pokračovat“ / „Odeslat“
- Sekundární: „Uložit a zavřít“ (jen kde dává smysl), „Zpět“

KPI:
- wizard_completion_rate
- form_error_rate
- time_to_submit

Obsah (texty 1:1):
- Krokovník: „1) Investor  2) Podpisy“
- Helper text: „Investor má 48 hodin na podpis balíku dokumentů.“
- CTA: „Odeslat k podpisu“

Komponenty:
- Stepper (DS‑090)
- Form inputs (DS‑030)
- Summary sidebar (volitelně)
- Sticky footer bar (CTA)

Layout:
- Header: H1 + stepper + meta
- Body: form sections
- Sticky footer: primary CTA + sekundární

Stavy:
- loading: CTA spinner
- error: inline errors + error summary
- success: success screen / redirect na detail

Validace a pravidla:
- Před odesláním eSign validovat povinné údaje investora (minimálně e‑mail).
- U krokových formulářů ukládat „draft“ (post‑MVP); MVP alespoň varovat při opuštění.

Analytické eventy:
- ui_wizard_step_viewed {wizard_id, step}
- ui_wizard_submitted {wizard_id}
- ui_form_validation_failed {form_id, field_id}

ASCII wireframe:
[H1]
[Stepper: 1—2]
-----------------------------------------
[Form section...]
-----------------------------------------
[Sticky footer: Back]        [Primary CTA]

---

## [TPL-060] Template: Dashboard (Role home)

Cíl uživatele:
Mít „jedno místo“, které ukáže co hoří (deadliny) a jaký je progres (rezervace, financování, provize).

Cíl byznysu:
Zvýšit aktivitu a retenci (uživatel se vrací kvůli přehledu).

Primární CTA / sekundární CTA:
- Primární: „Otevřít nejbližší deadline“
- Sekundární: „Zobrazit vše“

KPI:
- dashboard_weekly_active
- sla_feed_open_rate

Obsah (texty 1:1):
- Broker: „Dnes je na tahu“ + „Nové tikety podle vašich filtrů“
- Developer: „Rezervace v kapacitě“ + „K potvrzení financování“
- Admin: „Schvalování“ + „SLA porušení“ + „Finance“

Komponenty:
- KPI cards
- SLA feed list
- Quick action cards
- Table snippet (last 5)

Layout:
- Header: H1 + období
- Body: 2–3 sloupce widgetů (podle role)

Stavy:
- empty: „Zatím nic k řešení.“ + CTA na marketplace/tikety
- loading: skeleton widgets

Validace a pravidla:
- Vždy zobrazit alespoň 1 rychlou akci.

Analytické eventy:
- ui_dashboard_viewed {role}
- ui_dashboard_widget_clicked {widget_id}

ASCII wireframe:
[H1 Přehled]
[Widget: SLA feed]   [Widget: KPI]   [Widget: Quick actions]
[Table snippet...]

---

## [TPL-070] Template: Settings (Admin / Team)

Cíl uživatele:
Upravit parametry systému nebo týmu bez ztráty kontextu.

Cíl byznysu:
Udržet konzistenci pravidel (SLA, kapacity, DPH, pool) a audit.

Primární CTA / sekundární CTA:
- Primární: „Uložit“
- Sekundární: „Zrušit“

KPI:
- settings_change_success_rate
- settings_audit_completeness

Obsah (texty 1:1):
- H1: „Nastavení“
- Sekce: „Parametry & SLA“, „Sloty & programy“, „Finance & DPH“, „eSign & notifikace“, „Uživatelé & organizace“

Komponenty:
- Sub‑nav (left)
- Form sections
- Table/list (pro položky)
- Modal „Upravit parametr“

Layout:
- 2‑column: left sub‑nav + right content

Stavy:
- loading: skeleton
- error: banner

Validace a pravidla:
- Každá změna parametru vyžaduje „Důvod změny“ (audit).

Analytické eventy:
- ui_settings_viewed {section_id}
- ui_setting_changed {setting_key}
- ui_setting_saved {section_id}

ASCII wireframe:
[H1 Nastavení]
-----------------------------------------
| Subnav | Content (form/table)         |
-----------------------------------------

---

## [TPL-080] Template: Modal (Confirm / Edit)

Cíl uživatele:
Bezpečně potvrdit nevratnou akci nebo provést malou úpravu.

Cíl byznysu:
Snížit chyby a spory (zejména u zamítnutí rezervace a admin override).

Primární CTA / sekundární CTA:
- Primární: „Potvrdit“ / „Uložit“
- Sekundární: „Zpět“

KPI:
- destructive_action_cancel_rate
- modal_error_rate

Komponenty:
- Modal container
- Title, body, actions
- Input (pokud edit)
- Alert (pokud risk)

Layout:
- Center modal, max‑width 560–680

Stavy:
- loading: CTA spinner
- error: inline alert

Validace a pravidla:
- Destructive CTA vždy jako poslední a vizuálně „danger“.

Analytické eventy:
- ui_modal_opened {modal_id}
- ui_modal_confirmed {modal_id}
- ui_modal_cancelled {modal_id}

ASCII wireframe:
[Modal title]
[Body text]
[Secondary]   [Primary danger]

---

## [TPL-090] Template: Drawer (Side panel)

Cíl uživatele:
Rychle zobrazit doplňující informace bez opuštění kontextu (matching, audit, quick detail).

Cíl byznysu:
Zrychlit rozhodování a snížit přepínání mezi obrazovkami.

Primární CTA / sekundární CTA:
- Primární: dle kontextu (např. „Vybrat investora“, „Zkopírovat“)
- Sekundární: „Zavřít“

KPI:
- drawer_open_rate
- drawer_primary_action_rate

Komponenty:
- Drawer container (right)
- Header + close
- List / table mini
- CTA footer (sticky)

Layout:
- Pravý panel 420–520 px, scroll independent

Stavy:
- loading: skeleton
- empty: „Žádné shody“ / „Zatím žádné události“
- error: inline banner

Validace a pravidla:
- Po zavření vrátit focus na spouštěcí prvek (a11y).

Analytické eventy:
- ui_drawer_opened {drawer_id}
- ui_drawer_action {drawer_id, action}

ASCII wireframe:
[Drawer header] [X]
--------------------------------
[Content...]
--------------------------------
[Sticky footer CTA]

---

## [MAP-000] Mapování UX screen IDs → UI templates (kompletní)

> Cíl: aby UI designér přesně věděl, kterou šablonu použít pro každý UX screen.

### 1) Auth & gating
| UX Screen ID | Role | Doporučená šablona | Poznámka |
|---|---|---|---|
| AUTH-01 | all | TPL-010 | login |
| AUTH-02 | all | TPL-010 | request access step 1 |
| AUTH-03A | broker | TPL-010 + TPL-050 | request access step 2 (form) |
| AUTH-03B | developer | TPL-010 + TPL-050 | request access step 2 (form) |
| AUTH-04 | all | TPL-010 | „čeká na schválení“ |
| AUTH-05 | all | TPL-010 | gate screen (pending/onboarding/blocked) |
| AUTH-06 | all | TPL-010 | reset hesla |

### 2) Admin approval (pilot: přístupy do aplikace)
| UX Screen ID | Role | Doporučená šablona | Poznámka |
|---|---|---|---|
| ADMIN-01 | admin | TPL-030 | seznam žádostí (signup) |
| ADMIN-02 | admin | TPL-040 | detail žádosti + rozhodnutí |

### 3) Broker — Marketplace, projekty a rezervace
| UX Screen ID | Role | Doporučená šablona | Poznámka |
|---|---|---|---|
| BRK-200 | broker | TPL-020 | marketplace card grid + **platnost tiketu + LTV + odměna + shody** |
| BRK-210 | broker | TPL-040 | projekt detail (maskovaný) |
| BRK-211 | broker | TPL-040 | projekt detail (odemčený) |
| BRK-220 | broker | TPL-050 | rezervace krok 1: vybrat investora |
| BRK-221 | broker | TPL-050 | investor create/edit (form) |
| BRK-230 | broker | TPL-050 | rezervace krok 2: odeslat eSign (48h SLA) |
| BRK-240 | broker | TPL-030 | rezervace list |
| BRK-241 | broker | TPL-040 | rezervace detail + timeline + audit |
| BRK-250 | broker | TPL-040 | pool přehled (broker) |
| BRK-LEAD-10 | broker (hybrid) | TPL-050 | lead projekt — vytvořit/odeslat |
| BRK-LEAD-11 | broker (hybrid) | TPL-040 | lead projekt — detail + přiřazení developera |

### 4) Broker — „Moje rezervace“ (zjednodušené obrazovky)
| UX Screen ID | Role | Doporučená šablona | Poznámka |
|---|---|---|---|
| B-RES-01 | broker | TPL-030 | seznam |
| B-RES-02 | broker | TPL-040 | detail |
| B-RES-03 | broker | TPL-080 | modal „připomenout / znovu poslat“ |

### 5) Developer — Projekty & Tikety (supply)
| UX Screen ID | Role | Doporučená šablona | Poznámka |
|---|---|---|---|
| DEV-PROJ-01 | developer | TPL-030 | projekty list |
| DEV-PROJ-02 | developer | TPL-050 | projekt detail create/edit (sekce + upload) |
| DEV-TKT-01 | developer | TPL-030 | tikety list |
| DEV-TKT-02 | developer | TPL-050 | tiket detail create/edit + readiness + submit ke schválení |
| DEV-CHG-01 | developer | TPL-030 | žádosti o úpravu — list |
| DEV-CHG-02 | developer | TPL-050 | žádost o úpravu — nový požadavek |

### 6) Developer — Rezervace (inbox)
| UX Screen ID | Role | Doporučená šablona | Poznámka |
|---|---|---|---|
| D-RES-01 | developer | TPL-030 | inbox rezervací + SLA |
| D-RES-02 | developer | TPL-040 | detail + rozhodnutí |
| D-RES-03 | developer | TPL-080 | modal zamítnutí |

### 7) Admin — Schvalování supply (projekty/tikety/leady/změny)
| UX Screen ID | Role | Doporučená šablona | Poznámka |
|---|---|---|---|
| ADM-APP-10 | admin | TPL-030 | schvalování inbox (projekty/tikety/leady/změny) |
| ADM-TKT-10 | admin | TPL-040 | tiket — schválení & publikace (readiness + publish window + kapacita) |
| ADM-CHG-10 | admin | TPL-040 | žádost o úpravu tiketu — rozhodnutí + audit |

### 8) Admin — Rezervace
| UX Screen ID | Role | Doporučená šablona | Poznámka |
|---|---|---|---|
| A-RES-01 | admin | TPL-030 | seznam rezervací |
| A-RES-02 | admin | TPL-040 | detail + override + audit + spor |

### 9) Finance & provize
| UX Screen ID | Role | Doporučená šablona | Poznámka |
|---|---|---|---|
| DEV-500 | developer | TPL-030 | fakturace list (k úhradě) |
| DEV-510 | developer | TPL-040 | detail faktury |
| BRK-500 | broker | TPL-030 | přehled provizí |
| BRK-510 | broker | TPL-040 | podklady k fakturaci + upload proof |
| BRK-520 | broker | TPL-040 | pool detail/progres |
| ADM-500 | admin | TPL-060 | finance dashboard |
| ADM-510 | admin | TPL-040 | detail provizního případu |
| ADM-520 | admin | TPL-030 | pool období list |
| ADM-530 | admin | TPL-040 | pool období detail + výplaty |
| ADM-540 | admin | TPL-030 | exporty |
| ADM-550 | admin | TPL-030 | audit log (table) |

### 10) Dashboards (role‑based)
| UX Screen ID | Role | Doporučená šablona | Poznámka |
|---|---|---|---|
| BRK-010 | broker | TPL-060 | SLA feed + nové tikety |
| DEV-010 | developer | TPL-060 | rezervace v kapacitě + financování |
| ADM-010 | admin | TPL-060 | schvalování + SLA breaches + finance |

### 11) Profil & nastavení (role‑based)
| UX Screen ID | Role | Doporučená šablona | Poznámka |
|---|---|---|---|
| SET-100 | broker/dev/admin | TPL-070 | profil & nastavení (sekce) |
| SET-101 | broker/dev/admin | TPL-080 / TPL-090 | požadavek na změnu citlivých údajů |
| SET-110 | developer (owner) | TPL-070 | tým developera — správa členů |
| SET-111 | developer (owner) | TPL-080 | pozvat člena (modal) |
| SET-120 | broker/dev/admin | TPL-070 | GDPR — export/smazání |
| SET-130 | broker/dev/admin | TPL-050 | podpora — vytvořit požadavek |

### 12) Admin — Ops inbox (podpora / požadavky)
| UX Screen ID | Role | Doporučená šablona | Poznámka |
|---|---|---|---|
| ADM-700 | admin | TPL-030 | ops inbox — seznam požadavků |
| ADM-701 | admin | TPL-040 | ops inbox — detail požadavku |

### 13) Nastavení (admin: systémové parametry)
| UX Screen ID | Role | Doporučená šablona | Poznámka |
|---|---|---|---|
| ADM-600 | admin | TPL-070 | nastavení přehled |
| ADM-610 | admin | TPL-070 | parametry & SLA |
| ADM-611 | admin | TPL-080 | upravit parametr modal/drawer |
| ADM-620 | admin | TPL-070 | sloty & programy |
| ADM-630 | admin | TPL-070 | finance & DPH |
| ADM-640 | admin | TPL-070 | eSign & notifikace |
| ADM-650 | admin | TPL-070 | uživatelé & organizace |
| ADM-651 | admin | TPL-040 | detail uživatele |

### 14) Pre‑login web (marketing)
| UX Screen ID | Role | Doporučená šablona | Poznámka |
|---|---|---|---|
| WEB-001 | public | (Web template) | rozcestník |
| WEB-010 | public | (Web template) | landing broker |
| WEB-020 | public | (Web template) | landing developer |
| WEB-030 | public | (Web template) | jak to funguje |
| WEB-040 | public | (Web template) | důvěra & FAQ |
| WEB-050 | public | (Web template) | kontakt |

### 15) Systémové notifikace (UI styl, ne „app screens“)
| UX Screen ID | Kanál | Doporučený styl | Poznámka |
|---|---|---|---|
| SYS-EMAIL-01 | e‑mail | Email layout (brand header + CTA) | výzva k podpisu |
| SYS-EMAIL-02 | e‑mail | Email layout | reminder |
| SYS-EMAIL-03 | e‑mail | Email layout | expirace/odmítnutí |
| SYS-INAPP-01 | in‑app | Toast/Notification center | číselník |
| SYS-INAPP-02 | in‑app | Notification center (TPL-030) | notifikační centrum (list) |

### 16) Tech/spec bloky (nejsou UI obrazovky)
- DATA-100, DATA-110, API-100, API-120, ERR-100, AN-100 jsou podklady pro vývoj/měření a **nejsou** designované jako UI screens (viz UX dokument EPIC 12 — Handoff pack).

# EPIC 14 — UI QA & „handoff“ pro design (bez Figmy poznámek)

## Cíl EPICu
- Uzavřít UI část tak, aby design šel hladce realizovat: **komponentní coverage, obsahová konzistence, a11y baseline, responsivita desktopu**.
- Minimalizovat riziko „design driftu“ mezi obrazovkami a rolemi.

## Nejasnosti (otázky na mě)
- Žádné.

## Předpoklady (co doplňujeme sami)
- QA probíhá ve 2 kolech: (1) interní design QA, (2) „pilot feedback“ od 3 brokerů + 1 developera (klik prototyp).

---

## [QA-000] UI Done‑Definition (kdy je UI hotové)

Cíl uživatele:
Dostat konzistentní a předvídatelný UI.

Cíl byznysu:
Rychlejší implementace + méně změn po vývoji.

Primární CTA / sekundární CTA:
- N/A

KPI:
- UI_QA_pass_rate
- UI_regression_count

Obsah (texty 1:1):
UI je „hotové“, když:
1) Všechny obrazovky používají jednu z template TPL‑010…090 (žádné „one‑off“ layouty).
2) Každá obrazovka má navržené stavy: loading, empty, error, success.
3) Všechny klíčové komponenty mají definované varianty a stavy (hover/focus/disabled/loading).
4) Kritické procesy mají jasný Process header + SLA countdown (rezervace, podpisy, financování, expirace tiketu).
5) Copy je konzistentní se slovníkem (rezervace ≠ investice; bez slibů výnosů).
6) Kontrast a focus splňuje WCAG AA.

Komponenty:
- N/A

Layout:
- N/A

Stavy:
- N/A

Validace a pravidla:
- Každý nový UI pattern musí projít DS review (aby nevznikaly duplicity).

Analytické eventy:
- ui_qa_checklist_completed {scope, pass_rate}

ASCII wireframe:
[— Neaplikuje se —]

---

## [QA-010] Responsivita (desktop‑first) — pravidla

Cíl uživatele:
Používat appku i na menším laptopu bez horizontálního scrollu.

Cíl byznysu:
Méně frikce u brokerů (často laptop na cestách).

Primární CTA / sekundární CTA:
- N/A

KPI:
- horizontal_scroll_rate (proxy)
- table_overflow_incidents

Obsah (texty 1:1):
### Breakpoint 1280+
- Sidebar plná, 2‑column detail (left+right sticky) je default.
- Card grid 3 sloupce (marketplace).

### Breakpoint 1024–1279
- Sidebar může být „collapsed“ (jen ikony) jako default.
- Card grid 2 sloupce.
- Detail stále 2‑column, ale right summary může přejít na „top summary“ (pod process header) pokud obsah přetéká.

### Breakpoint 768–1023
- Sidebar collapsed vždy.
- Detail: 1‑column (summary box nahoře), sticky CTA footer volitelně.
- Tabulky: preferovat „priority columns“ + horizontální scroll pouze pokud není jiné řešení; ideálně použít zkrácené sloupce a „row expand“.

Komponenty:
- Sidebar (collapsible)
- Table (responsive columns)
- Sticky summary / top summary

Layout:
- Viz výše

Stavy:
- N/A

Validace a pravidla:
- Žádný obsah nesmí být nedostupný bez scrollu; u table použít row expand.

Analytické eventy:
- ui_breakpoint_rendered {breakpoint}

ASCII wireframe:
[— Neaplikuje se —]

---

## [QA-020] Content & formatting QA (částky, datumy, termíny, slovník)

Cíl uživatele:
Rozumět číslům a termínům bez interpretace.

Cíl byznysu:
Nižší počet sporů a dotazů „co to znamená“.

Primární CTA / sekundární CTA:
- N/A

KPI:
- content_inconsistency_bugs
- terminology_violation_count

Obsah (texty 1:1):
### Částky
- Vždy: `XX XXX XXX Kč` (bez desetinných míst, pokud není potřeba)
- Provize: „Odměna brokera (bez DPH)“
- % jen sekundárně v tooltipu nebo detailu

### Datum/čas
- Deadline vždy dvojmo: „Zbývá 17 h“ + „Do 24. 1. 2026 14:00“

### Slovník (zakázané výrazy v UI)
- „investice“ → používat „rezervace / financování“
- „přímá půjčka“ → „zápůjčka / úvěr“
- „garantovaný výnos“ → zakázáno; pouze „očekávaný výnos“ (pokud je v datech)

### Matching disclaimer
- V matchingu vždy text: „Matching je doporučení, nejde o investiční poradenství.“

Komponenty:
- Tooltip (pro vysvětlení)
- Caption/meta text

Layout:
- N/A

Stavy:
- N/A

Validace a pravidla:
- Texty musí projít „copy lint“ (kontrola zakázaných slov).

Analytické eventy:
- ui_glossary_tooltip_opened {term}

ASCII wireframe:
[— Neaplikuje se —]

---

## [QA-025] Privacy & masking QA (PII, anti‑obcházení)

Cíl uživatele:
Mít jistotu, že citlivé údaje jsou viditelné pouze oprávněným rolím a až ve správný okamžik.

Cíl byznysu:
0 incidentů s únikem PII + ochrana introdukcí (broker1/broker2) + auditní vymahatelnost.

Primární CTA / sekundární CTA:
- N/A

KPI:
- pii_leak_incidents (target 0)
- masking_rule_violations_found (target 0)
- dispute_resolution_time (snížení)

Obsah (texty 1:1):
### Checklist — co musí projít (MVP)
1) **Broker1 vs Broker2 (hybrid)**
   - Broker1 vidí investor PII (jméno, firma, e‑mail) v rezervaci a v auditních dokladech.
   - Broker2 nevidí PII investora nikdy; vidí pouze `Investor A / Investor #1234` + stav + deadliny + částky + svůj split provize.
2) **Developer odemčení**
   - Developer vidí jméno investora a brokera až po podpisu **Souhlasu + NDA** (součást eSign balíku).
3) **Maskování v UI**
   - Maskované hodnoty se nesmí objevit v: tooltipu, exportu, search autocomplete, „recent items“, notifikacích.
   - PDF/attachment odkazy respektují `visibility_rules` (pokud je dokument citlivý, musí být skryt).
4) **Ověření per komponenta**
   - TicketCard, TicketDetail, ReservationRow/Detail, Finance/Commission, Admin override.
5) **Audit stopa**
   - Každé odemčení identity a každá admin override akce musí mít: kdo, kdy, proč (reason).

Komponenty:
- MaskedValue (placeholder + tooltip „Pro odemčení je nutný podpis Souhlasu + NDA.“)
- PermissionGateInline (inline blok s vysvětlením + CTA „Požádat admina“)
- AuditTrailMini / AuditLogTable

Layout:
- N/A

Stavy:
- `can_view_investor_pii=false` → renderovat pouze anonymní label + vysvětlení
- `permission_denied` → inline alert + disable action

Validace a pravidla:
- UI musí používat pouze explicitní flagy z backendu (`can_view_investor_pii`, `masking_level`, `visibility_rules`).
- Pokud jsou v payloadu omylem poslána PII, UI je **nesmí renderovat** bez can_view flagu (double safety).

Analytické eventy:
- ui_masked_value_shown {screen_id, field}
- ui_pii_blocked {screen_id, attempted_field}
- ui_admin_override_viewed {screen_id, entity_id}

ASCII wireframe:
[— Neaplikuje se —]

---

## [QA-030] Accessibility QA checklist (MVP)

Cíl uživatele:
Ovládání klávesnicí, čitelnost, jasné chyby.

Cíl byznysu:
Snížit riziko a zvýšit použitelnost.

Primární CTA / sekundární CTA:
- N/A

KPI:
- a11y_issues_found
- a11y_issues_fixed

Obsah (texty 1:1):
### Must‑pass checklist
- Focus ring viditelný na všech interaktivních prvcích.
- Tab order: logický (nav → obsah → CTA).
- Modal: focus trap, ESC, návrat focusu.
- Form errors: text + zvýraznění pole + aria‑describedby.
- Kontrast min. WCAG AA.
- Klikací cíle min. 44×44 px (desktop doporučení).

Komponenty:
- Focus ring token
- Error message pattern

Layout:
- N/A

Stavy:
- N/A

Validace a pravidla:
- Před release projít automatickým audit nástrojem + manuální průchod.

Analytické eventy:
- ui_a11y_issue_logged {type, component}

ASCII wireframe:
[— Neaplikuje se —]

---

## [QA-040] Komponentní coverage report (co musí existovat v DS)

Cíl uživatele:
Mít všechny potřebné UI prvky bez improvizace.

Cíl byznysu:
Rychlejší implementace a méně „dodělávek“.

Primární CTA / sekundární CTA:
- N/A

KPI:
- ds_component_coverage_rate

Obsah (texty 1:1):
### Must‑have komponenty/varianty pro implementaci všech UX screens
- Button: primary/secondary/tertiary + loading + destructive
- Input: text, number (Kč), percent, email, phone
- Select: single + multi (tag chip)
- Date: single + range (filtry)
- Table: sortable + sticky header + row actions + row expand (768–1023)
- Card: ticket/reservation/KPI
- Badge/Status + Countdown (SLA)
- Stepper/Timeline
- Drawer (matching, quick audit)
- Modal (confirm/edit)
- File upload (dropzone + list souborů) — pro dokumenty a faktury
- Empty state module (icon + text + CTA)
- Toast + inline banner
- Breadcrumbs
- Pagination

Komponenty:
- N/A (je to seznam)

Layout:
- N/A

Stavy:
- N/A

Validace a pravidla:
- Pokud v DS chybí file upload nebo date range, doplnit před kreslením financí a admin settings.

Analytické eventy:
- ds_component_added {component_id}

ASCII wireframe:
[— Neaplikuje se —]

---

## [QA-050] Minimální UI test scénáře (klik prototyp)

Cíl uživatele:
Dokázat udělat klíčovou práci bez zaváhání.

Cíl byznysu:
Ověřit, že UI podporuje revenue engine (rezervace → financování → provize).

Primární CTA / sekundární CTA:
- N/A

KPI:
- task_success_rate
- time_on_task
- perceived_trust_score (1–7)

Obsah (texty 1:1):
### Broker (persona 20M+)
1) Najdi tiket 20M+ v Praze/Brně, otevři detail, zkontroluj zajištění + LTV + platnost.
2) Otevři matching, vyber investora, odešli eSign balík.
3) V detailu rezervace zjisti, kdo je na tahu a do kdy, a pošli reminder.

### Developer
4) V inboxu najdi rezervaci v kapacitě, otevři detail, podepiš / zamítni.
5) U profinancované rezervace potvrď financování.

### Admin
6) Schval žádost brokera.
7) Uprav Kapacita_N a ověř, že se změna propsala + je v auditu.

Komponenty:
- N/A

Layout:
- N/A

Stavy:
- N/A

Validace a pravidla:
- Každý scénář musí mít připravené stavy (success + error).

Analytické eventy:
- ui_usability_task_completed {task_id, success, seconds}

ASCII wireframe:
[— Neaplikuje se —]

## [QA-060] Analytics QA (bez PII) + funnel coverage

Cíl uživatele:
- N/A

Cíl byznysu:
Mít měření připravené pro MVP rozhodnutí (co funguje / nefunguje) bez rizika PII.

Primární CTA / sekundární CTA:
- N/A

KPI:
- event_coverage_rate (key screens ≥ 95 %)
- pii_in_events_incidents (target 0)

Obsah (texty 1:1):
### Must‑track (MVP)
- Screen views: Marketplace, Ticket detail, Matching panel, Reservation detail, Finance, Admin approval.
- Klíčové akce: poslat eSign, připomenout, developer approve/reject, potvrdit profinancování, upload invoice/proof.
- SLA: warning shown, SLA expired.

### PII pravidla (hard)
- Nikdy neposílat: investor_name, investor_email, project_name (unlocked), attachment_url.
- Povolené jsou pouze ID a agregáty (ticket_id, reservation_id, role, status, score_bucket).

### QA postup
1) Projít hlavní scénáře (QA-050) a ověřit, že pro každý krok vzniká event.
2) Zkontrolovat payloady eventů na PII (automatický regex check + ruční kontrola).
3) Ověřit, že error eventy mají correlation_id (pro admin debug), ale nikdy neobsahují PII.

Komponenty:
- N/A

Layout:
- N/A

Stavy:
- N/A

Validace a pravidla:
- Eventy posílat až po validním loginu (org + role).

Analytické eventy:
- ui_analytics_qa_completed {pass_rate, issues_found}

ASCII wireframe:
[— Neaplikuje se —]

---

# EPIC 15 — Tikety: Marketplace UI (SLA do expirace, LTV, Matching)

## Kontrola EPIC 15 (co musí být splněno v UI)
Aby marketplace reálně fungoval pro cílovou personu (partner/hybrid broker 20M+), potřebuje UI splnit 6 věcí:
1) **Rychlé skenování**: broker do 1–3 minut pozná „fit / no‑fit“ bez otevírání 10 detailů.
2) **Jasná odměna v Kč (bez DPH)** + základní parametry pro rozhodnutí (zajištění, LTV, lhůty).
3) **SLA do expirace tiketu** (do kdy je možné založit novou rezervaci) + disabled chování po expiraci.
4) **Matching shod investora** (interní doporučení obchodníka; ne investiční poradenství).
5) **Preferenční filtr 20M+** (z profilu brokera) + uložené filtry, aby se broker nemusel „proklikávat“ pokaždé znovu.
6) **Stavový design** (loading/empty/error) + jednoznačné důvody disabled CTA (skrytý/expirace/uzavřený).

---

## Co je v EPIC 15 už správně (a držíme)
- Badge **SLA do expirace** (zbývá X dní / expirace) + tooltip.
- Zobrazení **LTV** s variantou „neuvedeno“ (bez chyb).
- **Shody (matching)** jako indikace + otevření panelu v detailu.
- Stavy: loading/empty/error/disabled CTA.

---

## Co doplňujeme (aby to bylo „hi‑fi ready“)

### A) Default sort a řazení (MVP)
**Cíl:** broker otevře marketplace a nejdřív vidí „nejčerstvější a aktivní“ tikety (rychlost + méně zbytečného času).

**Doporučení pro MVP (bez složité relevance):**
- Default sort: **Nejnovější** (`published_at DESC`)
- Hard rule: `EXPIRED` a `HIDDEN` vždy **na konci** (nebo defaultně skryté v aktivním filtru).
- Nabídnout sort volby:
  - Nejnovější
  - Odměna (nejvyšší)
  - Platnost (nejdřív expiruje)
  - Výnos p.a. (nejvyšší)
  - Částka (nejvyšší)

**UI komponenta:** `SortDropdown` (vpravo nad listem, vedle počtu výsledků).

### B) Preference brokera (20M+) + uložené filtry (MVP)
**Cíl:** broker neřeší nastavení pokaždé; marketplace se „chová jako jeho pracovní stůl“.

**MVP pravidla:**
- Po přihlášení brokerovi aplikujeme **výchozí preferenční filtr** z profilu:
  - `min_amount_czk = 20 000 000` (default pro tuto personu)
  - `region[]` (pokud má nastaveno)
  - `ticket_type / instrument` (pokud má nastaveno)
- Uložené filtry:
  - MVP: **1 uložený filtr „Moje výchozí“** (editovatelný)
  - Vždy držet filtry v URL (shareable deep link; zjednodušuje support).

### C) TicketCard — detailní specifikace (hierarchie + interakce)
**Hierarchie obsahu (na kartě):**
1) **Částka** (největší číslo)
2) **Odměna brokera** (Kč, bez DPH) — zvýrazněná (důvod otevřít)
3) Meta řádek: **Výnos p.a. / Doba / Region**
4) Risk/proof řádek: **Zajištění + LTV**
5) **Expirace** + (volitelně) **Shody: N**

**Interakce:**
- Klik na kartu = otevřít detail
- Klik na „Shody: N“ = otevřít drawer s matchingem (bez opuštění kontextu)
- Hover = zvýraznění borderu + zřetelný focus ring pro klávesnici

**Stavy TicketCard:**
- Default / Hover / Focus / Selected
- Disabled: EXPIRED/HIDDEN/CLOSED → karta je čitelná, ale CTA je disabled + důvod v tooltipu
- Skeleton: zachovat layout (3 řádky + badge místa)

### D) SLA expirace tiketu — pravidla (zpřesnění)
- Publikační okno je defaultně **90 dnů**; po vypršení **nelze založit novou rezervaci**, ale běžící rezervace mohou doběhnout.
- Zobrazení:
  - `Zbývá {X} dní` (>= 2 dny)
  - `Zbývá {X} h` (posledních 48 hodin)
  - `Expirovaný` (po `publish_to`)
- Doplnit i absolutní datum: `Platnost do 31. 3. 2026` (caption).

### E) LTV — pravidla pro komunikaci (MVP)
- Pokud `ltv_pct` chybí: **„LTV: neuvedeno“** + tooltip „Doporučeno doplnit — zrychluje rozhodování.“
- Pokud je vyplněno: `LTV: 62 %` + tooltip „Poměr financování k hodnotě zástavy (informativní).“
- Nikdy neprezentovat LTV jako garanci — jen informativní parametr.

### F) Matching — pravidla (MVP)
- Matching je interní doporučení pro brokera a musí mít disclaimer:  
  **„Doporučení, nikoli investiční poradenství.“**
- V listu tiketů zobrazujeme jen count; detailní „důvody shody“ až v drawer/detailu.
- Pokud broker nemá investory, místo „Shody“ zobrazit CTA **„Přidat investora“**.

---

## Komponenty (nové/rozšířené)
- `TicketCard` (varianty: Compact / Expanded)
  - prvky: Title (maskovaný), Amount, Reward (broker fee), Yield p.a., Duration, Region,
    Collateral badge, LTV badge, Expiry countdown, Matching count, Status badge
- `CountdownBadge` (reusable: ticket expiry, SLA deadlines)
- `RiskMetaRow` (ikona + label + hodnota + tooltip)
- `MatchCountBadge`
- `StatusBadge` (Aktivní / Skrytý / Expirovaný / Uzavřený / Upraveno)
- `FilterPanel` (sticky on left, collapsible)
- `SortDropdown`

## Stavové varianty (UI)
- Loading: skeleton karty (3–6), zachovat layout.
- Empty (po filtrech): „Nenalezli jsme tikety v tomto filtru.“
- Empty (bez tiketů): „Zatím nejsou žádné aktivní tikety.“
- Disabled CTA:
  - tiket Expirovaný / Skrytý / Uzavřený: CTA „Zobrazit detail“ aktivní, ale akce „Založit rezervaci“ v detailu disabled.
- Error: „Nelze načíst tikety. Zkuste to znovu.“ (CTA: Obnovit)

---

## [SCREEN UI-150] Tikety — Marketplace (v2.11)
Cíl uživatele:  
Najít vhodný tiket během 1–3 minut a rozhodnout, zda jde do rezervace.

Cíl byznysu:  
Zrychlit „time‑to‑first‑reservation“ a zvýšit kvalitu rezervací.

Primární CTA / sekundární CTA:  
- Primární: **Zobrazit detail** (klik na kartu)  
- Sekundární: **Uložit filtr jako výchozí** / **Přidat investora**

KPI:  
- CTR z listu do detailu tiketu  
- % tiketů s využitím matchingu  
- time‑to‑reservation start  
- filter_reuse_rate (kolik uživatelů používá uložený filtr)

Obsah (texty 1:1):
- H1: **Tikety**
- Subtext: **Vyberte tiket podle parametrů. Identita projektu se odemyká až po podpisu Souhlasu + NDA.**
- Filtry (labely): Částka, Výnos p.a., Doba, Region, Forma financování, Zajištění, LTV (pokud existuje), Stav tiketu
- Sort: **Seřadit podle** (Nejnovější / Odměna / Platnost / Výnos p.a. / Částka)
- Badge expirace: **Zbývá {X} dní** / **Zbývá {X} h** / **Expirovaný**
- Badge matching: **Shody: {N}**
- Tooltip matchingu: **Doporučení, nikoli investiční poradenství.**
- Caption na kartě: **Odměna bez DPH**

Komponenty:
- Header + (vpravo) SortDropdown + výsledky count
- FilterPanel
- TicketCard list (grid 2–3 sloupce)
- Pagination (MVP)

Layout:
- Header: H1 + subtext + (vpravo) sort + „Uložené filtry“
- Body: 2 sloupce (Filtry 320 px | List)
- Footer: pagination

Stavy:
- loading / empty / error (viz výše)

Validace a pravidla:
- Filtry musí respektovat CZK-only (žádná změna měny).
- Pokud je tiket Expirovaný, nesmí být možné vytvořit novou rezervaci.

Analytické eventy:
- `ticket_list_viewed` (filters, sort)
- `ticket_card_impression` (ticket_id, position, filters, sort)
- `ticket_card_clicked` (ticket_id, position)
- `ticket_sort_changed` (sort_id)
- `filter_changed` (filter_name, value)
- `saved_filter_set_default` (filter_snapshot)
- `ticket_matchcount_clicked` (ticket_id)

ASCII wireframe:
[Header: Tikety | (Uložené filtry)           (Seřadit podle ▼)  (N výsledků)]
--------------------------------------------------------------------------------
[Filters]                               [TicketCard][TicketCard]
- Částka                                [TicketCard][TicketCard]
- Výnos p.a.                            [TicketCard][TicketCard]
- Doba                                  ...
- Region
- Zajištění
- LTV
- Stav
--------------------------------------------------------------------------------
[Pagination]

# EPIC 16 — Tiket Detail: “Decision Pack” UI (zajištění, LTV, podklady, ready‑score)

## Kontrola EPIC 16 (co musí být splněno v UI)
1) **Dva režimy detailu (Maskovaný teaser vs. Odemknutý detail)**  
   - Teaser: maskovaný název projektu i developera, placeholder obrázky, **jen předrezervační dokumenty**.  
   - Odemknutý: po podpisu **Souhlasu + NDA investorem** (v rámci eSign balíku) se odemkne identita, obrázky a dokumenty dle viditelnosti.  
   - Nesmí vzniknout nekonzistence (odemknutý obrázek, ale maskovaný název, nebo naopak).

2) **Decision pack hierarchie pro „rychlé GO/NO‑GO“ (1–3 min)**  
   Pořadí bloků musí odpovídat tomu, jak broker kvalifikuje deal:
   1) Částka / Výnos p.a. / Doba / Region  
   2) Zajištění + pořadí (1./2.)  
   3) LTV (pokud existuje)  
   4) Využití prostředků (rozpad 100 %)  
   5) Podklady (checklist + ready score)  
   6) Kapacita & fronta (kolik je „obsazeno“)  
   7) Matching investorů (doporučení, nikoli poradenství)

3) **Kapacita a fronta = agregovaně, bez úniku dat**  
   - Broker nesmí vidět investory jiných brokerů ani jejich identitu.  
   - V UI je povoleno ukazovat **jen souhrnné počty**: `v_kapacitě / kapacita_N` a `ve_frontě`.

4) **Ready score není risk rating**  
   - Ready score říká pouze „**kompletnost podkladů**“, ne kvalitu/bezpečnost investice.  
   - Musí obsahovat disclaimer: „Platforma podklady neověřuje.“

5) **CTA „Rezervovat tiket“ musí být dostupné i v teaser režimu**  
   Broker zakládá rezervaci na základě teaser info. V detailu musí být jasné:
   - co je ještě zamčeno a kdy se to odemkne,
   - jaké jsou lhůty (SLA) a co znamená „fronta / kapacita“.

6) **Konzervativní compliance copy**  
   - Nikde neimplikujeme investiční poradenství ani garanci výnosu.  
   - U matchingu povinně „Doporučení, nikoli investiční poradenství.“

---

## Klíčová data a pravidla (ze zdrojů)
- Maskování/odmaskování: teaser režim vs právní odemknutí po Souhlasu+NDA.  
- Zajištění: kanonický seznam + pravidlo pořadí u zástavy nemovitosti.  
- LTV: informativní, doporučené; posudek/odhad volitelný; platforma podklady neověřuje.  
- Využití prostředků: procenta, součet 100 %, povinný disclaimer.  
- Publikační okno tiketu: po expiraci nelze zakládat nové rezervace.

---

## Režimy detailu (MVP)

### A) Maskovaný detail (teaser režim)
**Kdy:**  
- před odesláním rezervace investorovi,  
- po odeslání až do podpisu Souhlasu + NDA investorem.

**UI pravidla:**
- **Název projektu:** `Projekt #123` (anonym)  
- **Developer:** `Developer #D45` (anonym)  
- **Obrázky:** placeholder (thumbnail + galerie)  
- **Popis projektu:** jen „teaser“ (zkrácený/anonymizovaný)  
- **Dokumenty:** pouze ty, které admin označí jako **předrezervační**  
- **Lock placeholder:** ostatní dokumenty se zobrazí jako „Zamčeno“ blok s textem *„Odemkne se po podpisu Souhlasu + NDA investorem.“*

### B) Odemknutý detail (po Souhlasu + NDA)
**Kdy:**  
Jakmile investor podepíše Souhlas + NDA (auditní stopa introdukce).

**UI pravidla:**
- Odemknout: plný název projektu, developer, obrázky, plné dokumenty dle viditelnosti.  
- Zobrazit badge: **„Odemknuto“** + datum/čas (kvůli důvěře a auditu).  
- U dokumentů rozlišit:  
  - „Předrezervační“ (byly vidět už předtím)  
  - „Odemknuté“ (viditelné až po Souhlasu+NDA)

---

## Ready score (MVP) — definice
Cíl: broker rychle pozná, jestli je „balíček“ aspoň standardně připravený.

**Zobrazení (doporučení):**
- Badge: **Minimum / Standard / Kompletní**
- Vedle toho: `Podklady: {x}/{y} doporučených` (bez detailu citlivých názvů, pokud jsou uzamčené)

**MVP logika (bez kódu, ale implementovatelná):**
- Definujeme 5 skupin „doporučených“ podkladů (stačí 1 soubor v každé skupině):
  1) **Přehled / term sheet / info memorandum**  
  2) **Zajištění** (např. shrnutí zajištění, LV / listiny / struktura zástavy)  
  3) **Finance projektu** (rozpočet / finanční model / cashflow)  
  4) **Využití prostředků** (tabulka % + případně doplňující soubor)  
  5) **Fotky / vizuály / situace** (aspoň základní vizuální materiál)

- Hodnocení:
  - **Minimum:** 1–2 skupiny  
  - **Standard:** 3–4 skupiny  
  - **Kompletní:** 5/5 skupin

**Disclaimer (povinný):**
„Platforma podklady neověřuje. Slouží jako evidence pro audit a komunikaci.“

---

## UI moduly v detailu (layout bloky)
1) **Hero (Projekt + tiket summary)**
   - Thumbnail (placeholder / reálný)
   - Název projektu + developer (maskovaný/odemknutý)
   - Lokalita (kraj + město), typ projektu
   - Ticket status + expirace
   - KPI metriky: Částka, Výnos p.a., Doba, Odměna brokera (Kč bez DPH)

2) **Parametry tiketu**
   - Forma financování (kanonické labely)
   - Minimální investice (pokud existuje)
   - Publikační okno (od/do) + odpočet expirace

3) **Zajištění & vymahatelnost**
   - seznam typů zajištění + pořadí (1./2.) tam, kde relevantní
   - procesní posílení (notářský zápis apod.) jako tagy
   - tooltipy: „informativní, není garance“

4) **LTV**
   - `LTV: 62 %` nebo `LTV: neuvedeno`
   - pokud je zajištění „Zástavní právo k nemovitosti“, LTV je doporučené (ale v MVP neblokuje)

5) **Využití prostředků**
   - stacked bar + tabulka kategorií (%)
   - povinný disclaimer pod blokem (copy‑ready)

6) **Podklady**
   - Ready score badge + checklist skupin (5 skupin, viz výše)
   - `AttachmentList` s rozlišením:
     - „Předrezervační“ (viditelné v teaser)
     - „Zamčeno / odemkne se po Souhlasu+NDA“
     - „Odemknuté“ (po unlocku)

7) **Kapacita & fronta**
   - badge: `Kapacita: {used}/{N}`  
   - badge: `Ve frontě: {queue}`  
   - tooltip: „Pořadí určuje čas podpisu investora. Do kapacity se počítá až podpis rezervační smlouvy.“

8) **Matching investorů** (EPIC 17)
9) **Rezervace (CTA + mini timeline)** (EPIC 18)
   - mini timeline: „Odeslání → eSign (48 h) → (v kapacitě) potvrzení developera (48 h) → jednání (30 dní)“

---

## Komponenty (rozšíření)
- `TiketHero` (varianty: Teaser / Unlocked)
- `MaskingBanner` (Info)
- `MetricGrid`
- `CollateralList` + `CollateralTag`
- `LTVPanel`
- `UseOfProceedsChart` + `UseOfProceedsTable`
- `ReadyScoreBadge` + `ReadyChecklist`
- `AttachmentList` (varianty: Pre-reservation / Locked / Unlocked)
- `CapacityQueueBadges`
- `TimelineMini`
- `StickyCTA` (Rezervovat / Zobrazit shody / Přidat investora / Zkopírovat shrnutí)

---

## [SCREEN UI-160] Tiket — Detail (broker)
Cíl uživatele:  
Vyhodnotit tiket během několika minut a rozhodnout o dalším kroku (matching / rezervace).

Cíl byznysu:  
Zvýšit konverzi do rezervace a snížit rezervace bez fit investora (méně frikce u developera).

Primární CTA / sekundární CTA:
- Primární: **Rezervovat tiket**
- Sekundární: **Zobrazit shody investorů** / **Přidat investora** / **Zkopírovat shrnutí**

KPI:
- `ticket_detail_viewed → reservation_started`
- time‑to‑decision
- % tiketů, u kterých broker otevře Podklady / Zajištění (signal kvality decision packu)

Obsah (texty 1:1):
- H1: **Tiket**
- Banner (teaser):  
  **Identita projektu se odemkne po podpisu Souhlasu + NDA investorem. Do té doby jsou některé podklady zamčené.**
- Banner (odemknuto):  
  **Odemknuto po Souhlasu + NDA investorem.**
- Sekce: **Projekt**, **Parametry tiketu**, **Zajištění**, **LTV**, **Využití prostředků**, **Podklady**, **Kapacita & fronta**, **Doporučení investorů**
- Matching disclaimer (povinně u panelu):  
  **Doporučení, nikoli investiční poradenství.**
- Využití prostředků disclaimer (povinně):  
  „Uvedené využití prostředků je plánované a může se v průběhu realizace projektu měnit v závislosti na vývoji projektu.“
- Ready score disclaimer (povinně):  
  „Platforma podklady neověřuje. Slouží jako evidence pro audit a komunikaci.“

Komponenty:
- TiketHero (Teaser/Unlocked)
- Section blocks (cards)
- ReadyScoreBadge + checklist
- AttachmentList (s lock stavy)
- CapacityQueueBadges
- StickyCTA (pravý panel)
- MatchingPanel (EPIC 17)

Layout:
- Header: breadcrumb (Tikety → Detail)
- Body: 2/3 content + 1/3 sticky sidebar
  - Sidebar: CTA + odměna + expirace + kapacita + mini timeline (SLA)
- Footer: audit meta (Zveřejněno / Upraveno / ID tiketu)

Stavy:
- **Loading:** skeleton pro hero + 3–5 sekcí + sidebar
- **Error:** „Nelze načíst detail tiketu. Zkuste to znovu.“ (CTA: Obnovit)
- **Teaser vs Unlocked:** přepnutí banneru + odmaskování identity, obrázků a dokumentů
- **Ticket Expirovaný / Skrytý:** CTA „Rezervovat“ disabled + tooltip „Tiket je mimo nabídku“
- **Ticket Uzavřený (profinancovaný):** CTA disabled + banner „Profinancováno — ostatní rezervace zanikly“
- **Kapacita plná:** CTA povolena (rezervaci lze vytvořit), ale zobrazit varování: „Kapacita je plná — rezervace půjde do fronty.“
- **Žádné předrezervační dokumenty:** zobrazit empty state v Podklady: „Zatím bez předrezervačních podkladů.“
- **Žádní investoři u brokera:** sekundární CTA „Přidat investora“ prominentně (vede do EPIC 17)

Validace a pravidla:
- Využití prostředků: součet musí být 100 % (jinak zobrazit „Data nejsou kompletní“ banner; pro brokera read‑only).  
- Maskování musí být konzistentní napříč všemi bloky (název, developer, obrázky, dokumenty).  
- V UI používat kanonické labely formy financování (např. „Zápůjčka / úvěr“).  
- Částky zobrazovat v CZK a provizi primárně v Kč (bez DPH).

Analytické eventy:
- `ticket_detail_viewed` (ticket_id, mode=teaser/unlocked)
- `ticket_section_opened` (ticket_id, section_id)
- `attachment_clicked` (ticket_id, doc_id, locked=true/false, doc_group)
- `ready_score_viewed` (ticket_id, level, missing_groups_count)
- `capacity_tooltip_opened` (ticket_id)
- `reservation_cta_clicked` (ticket_id)
- `match_panel_opened` (ticket_id)

ASCII wireframe:
[Header: ← Tikety / Detail]
--------------------------------------------------------------------------------
[Hero: (IMG placeholder/real)  Projekt #123 / Developer #D45   (Status) (Expirace)]
[Meta: Lokalita | Typ projektu]            [Sticky Panel]
[Metrics: Částka | Výnos p.a. | Doba | Odměna] - Odměna brokera (Kč bez DPH)
--------------------------------------------------------------------------------  - Expirace (countdown)
[Projekt teaser / popis]                     - Kapacita: 2/3  | Ve frontě: 4
[Parametry tiketu]                           - Mini timeline (SLA)
[Zajištění & pořadí]                         - CTA Rezervovat
[LTV panel]                                  - CTA Shody / Přidat investora
[Využití prostředků (graf + tabulka)] 
[Podklady: Ready score + checklist + list]
[Kapacita & fronta (tooltip)]
[Matching summary]
--------------------------------------------------------------------------------
# EPIC 17 — Investoři: CRM + Matching UI (broker tool)

## Kontrola EPIC 17 (co musí být splněno v UI)
1) **Investor je interní záznam v evidenci obchodníka (ne účet)**  
   - Investor nemá login do aplikace; matching i evidence jsou interní nástroj obchodníka/admina. 

2) **Datový model investora a stavy musí sedět na kanon**  
   - Kanonická pole investora (12.4): typ investora, jméno/název firmy, daňová rezidence, stav záznamu (IČO jen pro právnickou osobu).   
   - Stav investora: **Nový / Aktivní / Neaktivní / Zablokovaný**. 

3) **Bezpečnost & přístupová práva**  
   - Investoři jsou viditelní pouze vlastníkovi (brokerovi) a adminovi. Ostatní brokeři investory nevidí. 

4) **Matching musí být vysvětlitelný (důvod shody) + “not advice”**  
   - Matching je **doporučení**, nikoli investiční poradenství.   
   - MVP: tvrdé filtry → “mimo kritéria”, měkké preference → pořadí + slovní hodnocení.   
   - U každého investora musí být **důvod shody**. 

5) **Anti‑friction pro brokera (čas = nejdražší komodita)**  
   - Broker odmítá “nejasné” leady a chce kvalifikovat do 48 h. UI musí podporovat rychlé GO/NO‑GO: seznam → detail → rezervace. 

6) **Blokátory pro odeslání rezervace musí být vidět už v CRM**  
   - Bez e‑mailu investora nejde poslat rezervaci k podpisu.  
   - Bez potvrzení právního důvodu evidence nesmí jít rezervaci odeslat. 

---

[SCREEN UI-170] Investoři — Seznam (broker)
Cíl uživatele:  
Rychle najít investora, zkontrolovat “fit” (min/max, regiony, zajištění, LTV) a buď otevřít detail, nebo rovnou vytvořit rezervaci (z tiketu / z investora).

Cíl byznysu:  
Zrychlit “time‑to‑first‑reservation” a zvýšit kvalitu rezervací (méně “mimo kritéria”). 

Primární CTA / sekundární CTA:
- Primární: **Nový investor**
- Sekundární: **Import (CSV)** (MVP volitelné) / **Filtrovat** / **Export** (admin only)

KPI:
- `investor_created`
- `investor_profile_completed` (>= 70 % polí preferencí)
- `investor_selected → reservation_started`

Obsah (texty 1:1):
- H1: **Investoři**
- Subtext:  
  **Interní evidence. Vidíš ji jen ty a administrátor.** 
- Helper banner (jen pokud je nízká “kompletnost” u >50 % investorů):  
  **Tip: doplň minimální/maximum, regiony a zajištění — matching bude přesnější.**
- Filtry (labely):
  - **Stav:** Aktivní (default) / Nový / Neaktivní / Zablokovaný 
  - **Typ:** Fyzická osoba / Právnická osoba 
  - **Min investice / Max investice**
  - **Regiony**
  - **Zajištění:** Ano / Ne / Preferováno
  - **Max LTV**
- Tabulka – sloupce (MVP):
  1) Investor (Název/Jméno)
  2) Typ
  3) Stav
  4) Rozsah (min–max) + měna
  5) Regiony (zkráceně, tooltip full)
  6) Zajištění (badge)
  7) Max LTV (pokud vyplněno)
  8) Kompletnost (0–100 %, progress pill)
  9) Akce (⋯): Otevřít / Upravit / Změnit stav / Archivovat

Komponenty:
- PageHeader (H1 + CTA)
- SearchInput (name/email/poznámka)
- FilterBar (chips)
- DataTable + RowActionsMenu
- StatusBadge, TypePill, CompletenessPill
- EmptyState

Layout (popis zón):
- Header: H1 + “Nový investor”
- Body: Filtry nahoře, tabulka
- Right side (volitelné): “Rychlé tipy” (skryté v MVP)

Stavy: loading / empty / error / success / edge cases
- Loading: skeleton table
- Empty:  
  **Zatím tu nemáš žádného investora.**  
  CTA: **Přidat prvního investora**
- Error: “Nepodařilo se načíst investory. Zkus to prosím znovu.”
- Edge: investor bez e‑mailu → řádek badge “Bez e‑mailu” (varování pro rezervace)

Validace a pravidla:
- Default filtr = Aktivní; “Nový/Neaktivní” zobrazit až po zapnutí filtru. 
- Změna stavu/archivace musí mít auditní stopu (blokace = audit). 

Analytické eventy:
- `investors_list_viewed` {user_role, filters_count}
- `investor_filter_changed` {filter_name, value}
- `investor_row_opened` {investor_id}
- `investor_create_clicked`
- `investor_import_clicked`

ASCII wireframe:
[Header: Logo | Nav | Profil]
--------------------------------
[H1 Investoři]                         [CTA: Nový investor]
[Subtext: Interní evidence...]
[Search ________] [Stav ▼] [Typ ▼] [Regiony ▼] [Zajištění ▼] [More filters]
--------------------------------
| Investor | Typ | Stav | Rozsah | Regiony | Zajištění | Max LTV | % | ⋯ |
| ...                                                               ... |
--------------------------------

---

[SCREEN UI-171] Investor — Detail (broker)
Cíl uživatele:  
Mít “1 stránku pravdy” o investorovi: kontakt, preference, stav a historie rezervací.

Cíl byznysu:  
Zvýšit úspěšnost matchingu a opakované použití investorů (retence brokerů).

Primární CTA / sekundární CTA:
- Primární: **Upravit investora**
- Sekundární: **Najít shody (tikety)** / **Vytvořit rezervaci** (vybrat tiket) / **Změnit stav**

KPI:
- `investor_detail_viewed`
- `match_from_investor_opened`
- `reservation_started` (z detailu investora)

Obsah (texty 1:1):
- H1: **Investor**
- Sekce: **Základní údaje**, **Preference**, **Historie**, **Doporučené tikety**
- GDPR/Compliance helper (pokud není potvrzen právní důvod evidence):  
  **Bez potvrzení právního důvodu evidence nelze investorovi poslat rezervaci k podpisu.** 
- “Not advice” u doporučení:  
  **Doporučení, nikoli investiční poradenství.** 

Komponenty:
- DetailHeader (H1 + status badge + actions)
- InfoList (read-only fields)
- PreferencesCard (chips + edit)
- Tabs (Historie / Doporučené tikety)
- ReservationsTable (link do rezervace)
- TicketsMatchTable (match score + CTA otevřít tiket)

Layout (popis zón):
- Header: H1 + Stav + akce
- Body: 2 sloupce
  - Left: Základní údaje + kontakt
  - Right: Preference + “kompletnost”
- Bottom: Tabs (Historie / Doporučené tikety)

Stavy: loading / empty / error / success / edge cases
- Empty “Historie”: **Zatím bez rezervací.**
- Empty “Doporučené tikety”:  
  **Pro lepší shody doplň preference investora (min/max, regiony, zajištění).**
- Edge: Zablokovaný investor → vypnout “Vytvořit rezervaci” + tooltip “Investor je zablokovaný.”

Validace a pravidla:
- Investor je vždy “pod obchodníkem” (ownership). 
- Změna stavu na “Zablokovaný” vyžaduje důvod (audit). 

Analytické eventy:
- `investor_detail_viewed` {investor_id}
- `investor_status_changed` {investor_id, new_status, reason_filled}
- `investor_match_tab_opened` {investor_id}
- `ticket_opened_from_investor` {investor_id, ticket_id}

ASCII wireframe:
[Header: Logo | Nav | Profil]
--------------------------------
[H1 Investor] [Status badge]                    [Upravit] [⋯]
--------------------------------
[Left column: Základní údaje]   [Right column: Preference + % kompletnost]
- Typ / Název / IČO
- Daňová rezidence
- Email / Telefon
- Adresa
                               - min/max + měna
                               - regiony
                               - zajištění + typy
                               - max LTV
--------------------------------
[Tabs: Historie | Doporučené tikety]
[Table...]
--------------------------------

---

[SCREEN UI-172] Investor — Vytvořit / Upravit (broker)
Cíl uživatele:  
Zadat investora během 1–3 minut a mít dost dat pro matching + podpisy.

Cíl byznysu:  
Snížit drop‑off v aktivaci brokera (první investor → první rezervace).

Primární CTA / sekundární CTA:
- Primární: **Uložit investora**
- Sekundární: **Uložit a vytvořit rezervaci** / **Zrušit**

KPI:
- `investor_created`
- `investor_profile_completed`

Obsah (texty 1:1):
- H1: **Nový investor** / **Upravit investora**
- Sekce: **Identita a kontakt**, **Preference**, **Interní poznámka**
- Info line:  
  **Investor není uživatelský účet. Sbíráme pouze nezbytná data pro komunikaci a podpisy.** 
- Checkbox (doporučeno):  
  **Potvrzuji, že mám právní důvod investora evidovat a kontaktovat.** 

Komponenty:
- Form (sections)
- RadioGroup (Typ investora)
- TextInput / EmailInput / PhoneInput
- Select (Stav záznamu)
- RangeInputs (Min/Max investice)
- MultiSelect (regiony, typy projektů, typy zajištění, formy financování)
- NumberInput (min výnos p.a., max délka, max LTV)
- Textarea (interní poznámka – pouze broker) 
- Inline validation + toast

Layout (popis zón):
- Header: H1
- Body: 2 sloupce (desktop)
  - Left: Identita + kontakt + stav
  - Right: Preference (match)
- Footer: CTA bar (Uložit / Uložit a vytvořit rezervaci)

Stavy: loading / empty / error / success / edge cases
- Success toast: **Investor uložen.**
- Error: “Zkontroluj prosím označená pole.”
- Edge: typ = právnická osoba → povinné IČO. 
- Edge: změna stavu na Zablokovaný → povinné pole “Důvod blokace” (textarea) + varování “Zablokovaný investor nejde použít pro rezervace.”

Validace a pravidla:
- `min_investice ≤ max_investice` (pokud obě vyplněné). (doporučení pro čistotu profilu)
- `max_LTV` 0–100 % (pokud vyplněno). 
- E‑mail formát; e‑mail není povinný pro uložení, ale je povinný pro odeslání k podpisu. 
- “Interní poznámka” se nikdy nezobrazuje developerovi. 
- Datum narození investora se v MVP nesbírá. 

Analytické eventy:
- `investor_form_viewed` {mode:create|edit}
- `investor_form_saved` {mode, investor_id, completeness_pct}
- `investor_form_validation_error` {field_name}
- `investor_save_and_reserve_clicked` {investor_id}

ASCII wireframe:
[Header: Logo | Nav | Profil]
--------------------------------
[H1 Nový investor]
--------------------------------
[Left: Identita & kontakt]          [Right: Preference]
(Typ radio)                         (Min/Max investice + měna)
(Název/Jméno)                       (Min výnos p.a.)
(IČO - conditional)                 (Max délka investice)
(Daňová rezidence)                  (Regiony multi)
(Email, Telefon)                    (Zajištění + typy)
(Stav)                              (Max LTV)
[Checkbox: právní důvod evidence]
--------------------------------
[Footer CTA: Uložit] [Uložit a vytvořit rezervaci] [Zrušit]

---

[SCREEN UI-173] Shody investorů pro tiket (broker) — “Matching panel”
Cíl uživatele:  
Z jednoho tiketu rychle vybrat správného investora (nebo pochopit, že “mimo kritéria”).

Cíl byznysu:  
Zvýšit kvalitu rezervací a snížit práci developera s nerelevantními rezervacemi.

Primární CTA / sekundární CTA:
- Primární: **Rezervovat** (u vybraného investora)
- Sekundární: **Otevřít detail investora** / **Přidat investora** / **Zobrazit mimo kritéria**

KPI:
- `matching_viewed`
- `matching_investor_selected`
- `matching → reservation_started`

Obsah (texty 1:1):
- H1: **Shody investorů**
- Ticket mini‑summary:
  - **Částka**, **Výnos p.a.**, **Doba**, **Region**, **Zajištění**, **LTV** (pokud vyplněno)
  - **Platnost do:** {date} (odpočet v UI – “zbývá X dní”)
- Disclaimer: **Doporučení, nikoli investiční poradenství.** 
- Segmenty:
  - **Vysoká shoda**
  - **Střední shoda**
  - **Nízká shoda**
  - **Mimo kritéria** (collapsed)

Komponenty:
- Drawer / Modal / Inline section (dle kontextu: tiket detail vs. marketplace)
- TicketMiniCard
- MatchScoreBadge (High/Med/Low/Out)
- MatchReasonChips + “Detail shody” popover
- InvestorRow (name + status + completeness)
- PrimaryActionButton per row: “Rezervovat”

Layout (popis zón):
- Left (nebo top): Ticket mini‑summary + filtry
- Right (nebo body): seznam investorů se skupinami

Stavy: loading / empty / error / success / edge cases
- Loading: “Počítám shody…” + skeleton rows
- Empty: **Nemáš žádné aktivní investory.** CTA: **Přidat investora**
- Empty (no matches): **Žádná shoda podle kritérií.** CTA: **Zobrazit mimo kritéria**
- Error: “Matching je dočasně nedostupný.”

Validace a pravidla:
- Tvrdé filtry: měna, částka v min/max, doba ≤ max, region v preferovaných regionech. 
- Měkké preference: výnos ≥ min, typ projektu, typ zajištění, LTV ≤ limit. 
- Default: “Nový/Neaktivní” nezobrazovat bez přepnutí filtru. 
- U investora bez e‑mailu vypnout “Rezervovat” + tooltip “Doplň e‑mail investora.” 

Analytické eventy:
- `matching_viewed` {ticket_id, investors_count}
- `matching_filter_changed` {ticket_id, filter_name, value}
- `matching_investor_expanded` {ticket_id, investor_id}
- `matching_reserve_clicked` {ticket_id, investor_id, match_bucket}

ASCII wireframe:
--------------------------------
[H1 Shody investorů]
[Ticket mini card: částka | výnos | doba | region | zajištění | LTV | platnost do]
[Filter: Stav] [Show “Mimo kritéria” toggle]
--------------------------------
[Vysoká shoda]
- Investor A  [badge Aktivní] [%]  [Reason chips...]   [CTA Rezervovat]
- Investor B  ...
[Střední shoda]
...
[Collapsed: Mimo kritéria (12)]
--------------------------------

---

[SCREEN UI-174] Shody tiketů pro investora (broker) — “Ticket recommendations”
Cíl uživatele:  
Z profilu investora rychle najít relevantní tikety.

Cíl byznysu:  
Zvýšit opakované rezervace (broker retence).

Primární CTA / sekundární CTA:
- Primární: **Otevřít tiket**
- Sekundární: **Filtrovat** / **Zobrazit mimo kritéria**

KPI:
- `match_from_investor_opened`
- `ticket_opened_from_investor`

Obsah (texty 1:1):
- H1: **Doporučené tikety**
- Disclaimer: **Doporučení, nikoli investiční poradenství.** 

Komponenty:
- TicketCards / DataTable
- MatchScoreBadge
- MatchReasonChips
- EmptyState

Layout (popis zón):
- Header: H1 + filtry
- Body: list/tables

Stavy: loading / empty / error / success / edge cases
- Empty: “Nevidím žádné tikety pro zadané preference. Zkus upravit preference nebo zobrazit mimo kritéria.”

Validace a pravidla:
- Stejná pravidla matchingu jako UI‑173. 

Analytické eventy:
- `investor_ticket_matches_viewed` {investor_id, tickets_count}
- `ticket_opened_from_match` {investor_id, ticket_id, match_bucket}

ASCII wireframe:
--------------------------------
[H1 Doporučené tikety]
[Filters...]
--------------------------------
[Ticket card] [Match badge] [Reason chips] [CTA Otevřít tiket]
[Ticket card] ...
--------------------------------
# EPIC 18 — Rezervace: UI pro SLA, frontu, timeline a “kdo je na tahu”

## Kontrola EPIC 18 (co musí být splněno v UI)
Aby šel proces rezervace v praxi řídit (pro brokera/hybrid brokera i developera), UI musí splnit:

1) **„Kdo je na tahu“ + SLA všude, kde se rozhoduje o času**
   - Seznam rezervací musí mít sloupec **Na tahu** a **SLA odpočet**.
   - Detail rezervace musí mít **jednu dominantní “Next action” kartu**.

2) **Dvoufázové odmaskování identit (compliance + důkaz introdukce)**
   - Fáze A (právní odemknutí): po podpisu **Souhlas + NDA** investorem se odemkne identita pro obchodníka i developera.
   - Fáze B (aktivace): po podpisu **rezervační smlouvy** oběma stranami se spustí obchodní lhůty (jednání/financování).

3) **Fronta a kapacita (top N) musí být čitelná a auditovatelná**
   - Pořadí určuje **čas podpisu rezervační smlouvy investorem**.
   - Do kapacity se započítávají rezervace až od podpisu investorem (Souhlas+NDA kapacitu neblokují).

4) **Developer jedná pouze s rezervacemi v kapacitě**
   - Rezervace mimo kapacitu je pro developera “read‑only”; smlouvu podepsanou investorem uvidí až po vstupu do kapacity. 

5) **Ukončení rezervace vždy s důvodem (pro spory a reporting)**
   - UI musí povinně zobrazovat důvod ukončení (např. expirace SLA, zamítnutí, profinancováno jiným investorem…).

6) **Stav “Spor” (pause)**
   - V režimu “Spor” jsou kroky zablokované a automatické lhůty pozastavené; řeší admin. 

---

## SLA & lhůty (MVP)
> V datech je podpis investora popsán jako 2 kroky (Souhlas+NDA → rezervační smlouva).  
> **Rozhodnutí MVP:** posíláme 3 dokumenty jako **1 eSign envelope** a pro uživatelskou zkušenost zobrazujeme **1 deadline 48h na celý balík** (Souhlas + NDA + Rezervační smlouva).

- **Investor (balík podpisů):** default 48h od odeslání. (SLA “balíku” je rozhodnutí MVP; interně lze držet i dílčí timestampy.)
- **Developer (podpis/rozhodnutí):** default 48h od okamžiku, kdy je rezervace v kapacitě a investor podepsal rezervační smlouvu.
- **Jednání / profinancování:** default 30 dní od aktivace rezervace; admin může prodloužit.

---

## UI komponenty (konzistentně napříč appkou)
- `ReservationStatusChip` (kanonické stavy rezervace + barvy)
- `AssigneeChip` (Na tahu: Investor / Developer / Admin / Vy)
- `SLAClockBadge` (odpočet + stav: ok / warning / expired)
- `QueuePositionBadge` (Pozice X/Y, “v kapacitě”)
- `ProcessTimeline` (stepper + timestamps + SLA)
- `NextActionCard` (primární CTA dle role/stavu)
- `DocumentStatusList` (Souhlas, NDA, Rezervační smlouva)
- `DisputeBanner` + `DisputeLockState` (pro stav “Spor”)
- `AuditTrailMini` (poslední události + kdo/kdy)

---

## [SCREEN UI-181] Rezervace — Seznam (SLA + Na tahu + Fronta)
Cíl uživatele:  
Rychle najít rezervace, které vyžadují akci (časově kritické), a řídit pipeline.

Cíl byznysu:  
Snížit expirace SLA a zrychlit průchod do financování.

Primární CTA / sekundární CTA:
- Primární: **Otevřít detail rezervace**
- Sekundární (dle role): **Připomenout investorovi** / **Podepsat (developer)** / **Export** (admin)

KPI:
- % expirací investora (48h balík)
- % expirací developera (48h)
- time‑to‑sign (investor), time‑to‑decision (developer)
- % rezervací, které se posunou do “Aktivní”

Obsah (texty 1:1):
- H1: **Rezervace**
- Filtry: **Stav**, **Na tahu**, **Tiket**, **Developer**, **Datum**
- Tabulka – sloupce:
  - **Tiket**
  - **Investor** *(developer uvidí až po Souhlasu+NDA)*
  - **Stav**
  - **Na tahu**
  - **SLA**
  - **Fronta**
  - **Konec jednání** *(jen u aktivních)*

Komponenty:
- FiltersBar, ReservationTable, ReservationStatusChip, AssigneeChip, SLAClockBadge, QueuePositionBadge

Layout:
- Header: H1 + filtry
- Body: tabulka + stránkování

Stavy:
- Empty (žádná data): „Zatím nemáte žádné rezervace.“
- Empty (filtr): „Nic nenalezeno pro zvolené filtry.“ + CTA „Reset filtrů“
- Error: standard page error + „Zkusit znovu“
- Permission: developer nevidí rezervace před Souhlas+NDA (nezobrazovat vůbec).

Validace a pravidla:
- Fronta se zobrazuje až po podpisu rezervační smlouvy investorem (existuje pořadí).
- U ukončených rezervací vždy zobrazit důvod ukončení v detailu (z tabulky jen tooltip).

Analytické eventy:
- `reservation_list_viewed` (role, default_filter)
- `reservation_list_filtered` (filters)
- `reservation_row_opened` (reservation_id, ticket_id)

ASCII wireframe:
[Header: Rezervace]
[Filters: Stav | Na tahu | Tiket | Developer | Datum]
----------------------------------------------------------
[Table: Ticket | Investor | Stav | Na tahu | SLA | Fronta | Konec jednání]
----------------------------------------------------------

---

## [SCREEN UI-180] Rezervace — Detail (timeline + dokumenty + next action)
Cíl uživatele:  
Vidět aktuální stav rezervace (SLA, fronta, dokumenty) a udělat správný další krok.

Cíl byznysu:  
Zvýšit completion podpisů a zrychlit přechod rezervace do “Aktivní” a “Financování potvrzeno”.

Primární CTA / sekundární CTA (role-based):
- Broker:
  - Primární: **Připomenout investorovi**
  - Sekundární: **Znovu odeslat eSign odkaz**
- Developer (jen pokud “v kapacitě”):
  - Primární: **Podepsat rezervační smlouvu**
  - Sekundární: **Zamítnout investora**
- Admin:
  - Primární: **Prodloužit SLA** / **Nastavit “Spor”**
  - Sekundární: **Zrušit rezervaci** (s důvodem)

KPI:
- % dokončení podpisů investorem (48h balík)
- % developer decision (48h)
- time‑to‑active, time‑to‑funded
- # admin override zásahů

Obsah (texty 1:1):
- H1: **Rezervace**
- Status řádek:
  - `ReservationStatusChip` (např. **Odesláno investorovi** / **Podepsáno investorem – ve frontě** / **Aktivní** …)
  - `AssigneeChip`: **Na tahu: Investor/Developer/Admin**
  - `SLAClockBadge`: **Zbývá 12 h** / **Vypršelo**
  - `QueuePositionBadge`: **Pozice 2/7 (v kapacitě)** / **Pozice 5/7 (mimo kapacitu)**

Komponenty:
- ProcessTimeline
- NextActionCard
- DocumentStatusList
- QueuePositionBadge
- AuditTrailMini
- DisputeBanner (pokud stav “Spor”)

Layout:
- Header: H1 + status row
- Body (2 sloupce):
  - Left: Timeline + Dokumenty + Audit
  - Right: NextActionCard + SLA detail

Stavy: loading / empty / error / success / edge cases
- **Spor:** banner „Rezervace je pozastavena (Spor). Automatické lhůty neběží. Kontaktujte admina.“
- **Profinancováno jiným investorem:** ukončit jako neúspěšné, bez odhalení vítěze ostatním brokerům.
- **Tiket expiroval, ale rezervace běžela:** zobrazit důvod ukončení „Tiket expiroval“ (pokud ukončeno) nebo info banner (pokud rezervace může doběhnout).

Validace a pravidla:
- Developer může podepsat/zamítnout jen rezervace **v kapacitě**.
- Zamítnutí developerem vyžaduje povinné odůvodnění.
- Zrušení adminem vyžaduje důvod (enum + poznámka).
- Dokument “Rezervační smlouva podepsaná investorem” je developerovi dostupná až při vstupu do kapacity.

Analytické eventy:
- `reservation_detail_viewed` (reservation_id, ticket_id, role, status)
- `esign_reminder_sent` (reservation_id, stage=investor_package)
- `esign_link_resent` (reservation_id)
- `developer_decision_started` (reservation_id)
- `developer_rejected` (reservation_id, reason_code)
- `sla_extended` (entity=reservation, stage, old_deadline, new_deadline)
- `reservation_dispute_set` (reservation_id, dispute_reason)
- `reservation_dispute_resolved` (reservation_id, outcome)

ASCII wireframe:
[Header: Rezervace | Status chip | Na tahu | SLA | Fronta]
--------------------------------------------------------------
[Timeline + timestamps]                   [Next action card]
[Dokumenty: Souhlas | NDA | Rez. sml.]    [CTA / Secondary]
[Audit mini log]                          [SLA detail]
--------------------------------------------------------------

---

## [SCREEN UI-182] Developer — Rozhodnutí o rezervaci (sign / reject)
Cíl uživatele:  
Rychle podepsat nebo zamítnout rezervaci, když je “v kapacitě”, bez zmatku v dokumentech.

Cíl byznysu:  
Zrychlit aktivaci rezervací a snížit expirace SLA developera (48h).

Primární CTA / sekundární CTA:
- Primární: **Otevřít eSign a podepsat**
- Sekundární: **Zamítnout (s odůvodněním)**

KPI:
- time‑to‑developer‑sign
- % zamítnutí developerem
- % expirací SLA developera

Obsah (texty 1:1):
- H1: **Rozhodnutí o rezervaci**
- Info: **Tato rezervace je v kapacitě. Prosím podepište rezervační smlouvu do 48 hodin.**
- Pole: **Důvod zamítnutí** (jen pokud “Zamítnout”)
  - placeholder: „Stručně uveďte důvod (povinné)…“

Komponenty:
- SummaryCard (Investor + obchodník + tiket)
- SLAClockBadge
- PrimaryButton (eSign)
- DangerButton (Zamítnout)
- Textarea (Reason)

Layout:
- Modal / Dedicated page (prefer: modal z detailu)
- Top: summary + SLA, Bottom: CTA

Stavy:
- disabled: pokud rezervace není v kapacitě, CTA “Podepsat/Zamítnout” skryté a místo toho info „Čeká ve frontě“.

Validace:
- Zamítnutí: důvod povinný.

Analytické eventy:
- `developer_sign_clicked` (reservation_id)
- `developer_reject_submitted` (reservation_id, reason_length)

ASCII wireframe:
[Modal: Rozhodnutí o rezervaci]
----------------------------------------
[Summary: Investor | Obchodník | Tiket]  [SLA]
[Primary CTA: Otevřít eSign a podepsat]
[Danger CTA: Zamítnout]
[Textarea: důvod (only if reject)]
----------------------------------------

---

# EPIC 19 — Provize, fakturace, výplaty + Pool program (UI)

## Kontrola EPIC 19 (co musí být splněno v UI)
Aby šlo v MVP **reálně vypořádat peníze** (bez bankovní integrace) a zároveň udržet audit + důvěru, UI musí:

1) Umožnit **developerovi potvrdit profinancování** (datum, částka, proof / nebo povinná poznámka).
2) Od profinancování spočítat **provizi a podíly** (v Kč jako základ bez DPH) a udržet kontrolní součty + zaokrouhlení.
3) Podporovat **split obchodníků** (obchodník 2 může být 0 %) a mít to transparentně v admin UI i v “broker view” (bez odhalování cizích citlivých detailů).
4) Podporovat **fakturační tok**:
   - platforma → developer (faktura; PDF v app + e-mail),
   - broker → platforma (broker nahraje fakturu; platforma eviduje a uhradí).
5) Zobrazit **SLA splatností**:
   - provize developer → platforma: default 14 dní,
   - výplata brokerům po přijetí: default 3 dny (od přijetí faktury brokera).
6) Umožnit adminovi **ruční potvrzení plateb** + upload proof + audit důvodů (ops realita MVP).
7) Pokud je aktivní **Pool program**, zobrazit motivaci a progres a udržet anonymitu v “vyhlášení”.

---

## Klíčová pravidla (kanonická logika)
- Platforma v UI počítá a komunikuje **částky jako základ v Kč (bez DPH)**; DPH je řešeno až na fakturách dle režimu vystavitele.
- Provize se počítá z **finální profinancované částky** a splatnost se počítá od **data přijetí na účet developera** (ne od kliknutí).
- Faktura platformy developerovi:
  - PDF musí být dostupné v app + poslané e-mailem,
  - režim DPH je nastavitelný per faktura,
  - po vystavení je faktura “uzamčená” (opravy mimo platformu).
- Po ručním potvrzení úhrady provize platformě systém:
  - zpřístupní brokerům podklady k fakturaci,
  - aktivuje nárok na výplatu a zároveň obrat do Poolu.
- Lhůta pro výplatu brokerů je defaultně **3 dny po přijetí faktury** brokera (admin může upravit).

---

## Rozdělení provize (MVP nastavení)
**Produktové rozhodnutí:** celková provize = **5 %** z profinancované částky (bez DPH v UI).  
**Default split:**
- platforma 50 %
- broker 1: 25 %
- broker 2: 25 %  
> Pokud je jen 1 broker: broker 2 = 0 % a broker 1 = 50 % (admin může změnit; součet vždy 100 %).

---

## UI komponenty (reusable)
- `CommissionSummaryCard` (tiket + profinancovaná částka + provize + splatnosti)
- `CommissionSplitBar` (platforma / broker1 / broker2; součet 100 %)
- `InvoiceStatusChip` (rozpracovaná / odeslaná / přijata / uhrazena / po splatnosti / sporná…)
- `PayoutStatusChip` (čeká na fakturu / faktura přijata / vyplaceno / sporné)
- `ProofUpload` (PDF/JPG/PNG; s názvem + datumem)
- `MoneyBreakdownTable` (základ / DPH / celkem; vždy CZK)
- `SLAClockBadge` (používáme i z EPIC 18)

---

## [SCREEN UI-191] Developer — Potvrdit profinancování
Cíl uživatele:  
Rychle a správně potvrdit, že investor skutečně poslal peníze (spustí provizi a uzavře tiket).

Cíl byznysu:  
Získat “source of truth” pro finance ops, spustit fakturaci a minimalizovat spory.

Primární CTA / sekundární CTA:
- Primární: **Potvrdit profinancování**
- Sekundární: **Uložit jako koncept** (pokud je potřeba doplnit proof)

KPI:
- time_to_funding_confirmed (od aktivace rezervace)
- % potvrzení s proof vs s poznámkou
- # admin oprav (quality signal)

Obsah (texty 1:1):
- H1: **Potvrdit profinancování**
- Info: **Potvrzením spustíte provizi a uzavřete tiket pro další rezervace.**
- Pole:
  - **Datum přijetí na účet** (date) — povinné
  - **Finální profinancovaná částka (CZK)** — povinné
  - **Podklady (volitelné)** — upload
  - **Poznámka** — povinná jen pokud nejsou přiložené podklady
- Inline rekapitulace:
  - „Splatnost provize: {datum} (14 dní od data přijetí).“
  - „Provize (základ, bez DPH): {částka}“ (computed)

Komponenty:
- Form (DatePicker, AmountInput, ProofUpload, Textarea)
- CommissionSummaryCard (preview)

Layout:
- Header: H1 + info
- Body: form (2 sloupce: pole | preview card)
- Sticky CTA: Potvrdit profinancování

Stavy:
- loading: skeleton preview
- success: toast „Profinancování potvrzeno.“
- error: „Nelze uložit. Zkuste to znovu.“

Validace a pravidla:
- Datum přijetí <= dnešní datum (lze potvrdit zpětně, ale k reálnému datu).
- Částka > 0; měna CZK-only.
- Pokud proof chybí, poznámka je povinná.

Analytické eventy:
- `funding_confirm_viewed` (ticket_id)
- `funding_confirm_submitted` (ticket_id, amount, has_proof)
- `funding_confirm_failed` (ticket_id, error_code)

ASCII wireframe:
[H1 Potvrdit profinancování]      [Preview: provize + splatnosti]
---------------------------------------------------------------
[Datum přijetí]  [Částka CZK]
[Upload podkladů] 
[Poznámka (required if no proof)]
---------------------------------------------------------------
[Sticky CTA: Potvrdit profinancování]

---

## [SCREEN UI-192] Developer — Faktury (od platformy)
Cíl uživatele:  
Vidět všechny faktury od platformy (provize), jejich stav a splatnost.

Cíl byznysu:  
Zrychlit úhrady provize a snížit “po splatnosti”.

Primární CTA / sekundární CTA:
- Primární: **Otevřít detail faktury**
- Sekundární: **Stáhnout PDF**

KPI:
- invoice_payment_rate
- avg_days_to_pay
- overdue_rate

Obsah (texty 1:1):
- H1: **Faktury**
- Filtry: Stav (čeká/uhrazeno/po splatnosti/sporná), Období
- Tabulka sloupce:
  - Číslo faktury
  - Tiket
  - Základ (CZK)
  - DPH
  - Celkem
  - Splatnost
  - Stav

Komponenty:
- InvoiceTable, InvoiceStatusChip, SLAClockBadge

Layout:
- Header: H1 + filtry
- Body: tabulka

Stavy:
- empty: „Zatím tu nejsou žádné faktury.“
- error/loading standard

Validace a pravidla:
- Hodnoty faktury jsou “read-only” (po vystavení se nemění).

Analytické eventy:
- `invoice_list_viewed` (role=developer)
- `invoice_row_opened` (invoice_id)
- `invoice_pdf_downloaded` (invoice_id)

ASCII wireframe:
[H1 Faktury]
[Filters: Stav | Období]
---------------------------------------------------------
[Table: # | Tiket | Základ | DPH | Celkem | Splatnost | Stav]
---------------------------------------------------------

---

## [SCREEN UI-193] Developer — Detail faktury
Cíl uživatele:  
Rychle pochopit, za co je faktura, a stáhnout si PDF.

Cíl byznysu:  
Minimalizovat dotazy supportu a urychlit platby.

Primární CTA / sekundární CTA:
- Primární: **Stáhnout PDF**
- Sekundární: **Zobrazit platební instrukce**

KPI:
- pdf_download_rate
- support_contact_rate

Obsah (texty 1:1):
- H1: **Faktura #{invoice_number}**
- Meta:
  - Tiket: {ticket_ref}
  - Vystaveno: {date}
  - Splatnost: {date}
  - Stav: {chip}
- Sekce „Částky“:
  - Základ (bez DPH): {amount_net}
  - DPH: {vat}
  - Celkem: {gross}
- Sekce „Identifikace platby“:
  - Variabilní symbol: {vs}
  - Zpráva pro příjemce: {msg} (pokud existuje)
- Poznámka:
  - „Tato faktura je evidenční podklad. Případné opravy řeší účetnictví mimo platformu.“

Komponenty:
- InvoiceHeaderCard
- MoneyBreakdownTable
- CopyableField (VS)
- PrimaryButton (Download PDF)

Layout:
- Header: H1 + status
- Body: 2 sloupce (Amounts | Payment identifiers)

Stavy:
- missing_pdf: „PDF zatím není nahrané. Kontaktujte admina.“
- error/loading standard

Validace a pravidla:
- PDF je povinně dostupné, pokud stav >= “odeslaná”.

Analytické eventy:
- `invoice_detail_viewed` (invoice_id)
- `invoice_payment_instructions_opened` (invoice_id)

ASCII wireframe:
[H1 Faktura #12345] [Status chip]
---------------------------------------------------
[Částky: Základ | DPH | Celkem]   [VS | Zpráva]
[CTA: Stáhnout PDF]
---------------------------------------------------

---

## [SCREEN UI-194] Broker — Moje provize & výplaty
Cíl uživatele:  
Mít přehled, kolik provize “čeká”, kolik je k fakturaci a co už bylo vyplaceno.

Cíl byznysu:  
Retence brokerů + méně ručních dotazů „kdy mi to pošlete“.

Primární CTA / sekundární CTA:
- Primární: **Otevřít detail provize na tiketu**
- Sekundární: **Stáhnout podklady k fakturaci** (pokud dostupné)

KPI:
- broker_invoice_upload_rate
- time_to_broker_invoice
- time_to_payout

Obsah (texty 1:1):
- H1: **Provize**
- Přehled karet:
  - **Čeká na profinancování** (pipeline)
  - **K fakturaci** (podklady dostupné)
  - **Vyplaceno**
- Tabulka sloupce:
  - Tiket
  - Profinancováno dne
  - Můj podíl (základ, bez DPH)
  - Stav (čeká / podklady dostupné / faktura nahraná / vyplaceno)
  - Termín výplaty (pokud znám; default 3 dny)

Komponenty:
- SummaryCardsRow
- CommissionTable
- PayoutStatusChip
- SLAClockBadge

Layout:
- Header: H1 + přehled karty
- Body: tabulka

Stavy:
- empty: „Zatím tu nemáte žádné provize.“
- loading/error standard

Validace a pravidla:
- Dokud není adminem potvrzená úhrada provize platformě, broker nesmí vidět “jistotu” výplaty (jen pipeline).

Analytické eventy:
- `broker_commission_viewed`
- `broker_commission_row_opened` (ticket_id)

ASCII wireframe:
[H1 Provize]
[Cards: Pipeline | K fakturaci | Vyplaceno]
---------------------------------------------------------
[Table: Tiket | Profinancováno | Můj podíl | Stav | Termín]
---------------------------------------------------------

---

## [SCREEN UI-195] Broker — Detail provize (tiket)
Cíl uživatele:  
Vidět přesnou částku, podklady k fakturaci a poslat fakturu platformě.

Cíl byznysu:  
Zrychlit dodání faktur a výplaty.

Primární CTA / sekundární CTA:
- Primární: **Nahrát fakturu platformě**
- Sekundární: **Stáhnout podklady k fakturaci** / **Kontaktovat admina**

KPI:
- upload_invoice_completion_rate
- time_to_upload_invoice

Obsah (texty 1:1):
- H1: **Provize — {ticket_ref}**
- Sekce „Podíl“:
  - „Můj podíl (základ, bez DPH): {amount_net}“
  - „Pokud jste plátce DPH, připočtěte DPH na své faktuře.“
- Sekce „Podklady pro fakturaci“:
  - Identifikace tiketu/projektu
  - Platební reference (pokud existuje)
  - Termín výplaty (odhad): „do {date}“ (default 3 dny po přijetí faktury)
- Sekce „Moje faktura“:
  - Stav: nenahraná / nahraná / přijata adminem / vyplaceno
  - Číslo faktury, datum vystavení, datum splatnosti (pokud vyplněno)
  - Soubor: PDF (download)

Komponenty:
- CommissionSummaryCard
- CopyableFields (IDs)
- PayoutStatusChip
- FileCard (invoice PDF)
- PrimaryButton (Upload)

Layout:
- Header: H1 + status
- Body: 2 sloupce (Podklady | Moje faktura)

Stavy:
- podklady_nejsou: banner „Podklady budou dostupné po potvrzení úhrady provize platformě.“
- sporné: banner + kontakt admin

Validace a pravidla:
- Nahrání faktury: PDF povinné; číslo faktury povinné; datum vystavení povinné.
- Platforma standardně neřeší dobropisy/storna jako samostatný tok (výjimečně “zrušena” + poznámka).

Analytické eventy:
- `broker_commission_detail_viewed` (ticket_id)
- `broker_invoice_upload_clicked` (ticket_id)
- `broker_invoice_downloaded` (ticket_id)

ASCII wireframe:
[H1 Provize — Tiket XYZ] [Status chip]
---------------------------------------------------
[Podklady k fakturaci]          [Moje faktura]
[IDs + reference]               [Upload / file]
[Termín výplaty]                [Stav]
---------------------------------------------------

---

## [SCREEN UI-196] Broker — Nahrát fakturu (modal)
Cíl uživatele:  
Rychle poslat fakturu platformě a minimalizovat chyby.

Cíl byznysu:  
Zrychlit ops a výplaty.

Primární CTA / sekundární CTA:
- Primární: **Odeslat fakturu**
- Sekundární: **Zrušit**

Obsah (texty 1:1):
- Title: **Nahrát fakturu platformě**
- Pole:
  - Číslo faktury (text) — povinné
  - Datum vystavení (date) — povinné
  - Datum splatnosti (date) — volitelné
  - Soubor (PDF) — povinné
- Helper text: „Základ provize je bez DPH. DPH řešíte na své faktuře podle svého režimu.“

Komponenty:
- Modal, TextInput, DatePicker, FileUpload, PrimaryButton

Validace:
- PDF required, max size (MVP: 20 MB), povolené typy: PDF.

Analytické eventy:
- `broker_invoice_upload_submitted` (ticket_id, has_due_date)

ASCII wireframe:
[Modal: Nahrát fakturu]
-----------------------------
[# faktury] [datum] [splatnost]
[Upload PDF]
[CTA Odeslat]
-----------------------------

---

## [SCREEN UI-197] Admin — Financování & provize (ops tab)
Cíl uživatele:  
Mít jeden “operations” stůl: kdo potvrdil financování, jaké jsou splatnosti, co je po splatnosti a co čeká na výplaty.

Cíl byznysu:  
Snížit manuální chaos a incidenty v payout ops.

Primární CTA / sekundární CTA:
- Primární: **Otevřít detail**
- Sekundární: **Potvrdit úhradu** / **Vystavit fakturu** / **Potvrdit výplatu** (dle stavu)

KPI:
- overdue_invoices_count
- payout_cycle_time
- # manual overrides

Obsah (texty 1:1):
- H1: **Financování & provize**
- Tab: **Čeká na potvrzení financování** | **Faktury developerům** | **Výplaty brokerům**
- Tabulka (reusable) sloupce:
  - Tiket
  - Developer
  - Profinancováno dne
  - Profinancovaná částka
  - Provize (základ) + split
  - Splatnost provize (14d)
  - Stav (čeká/uhrazeno/po splatnosti)
  - Výplaty brokerům (stav + termín)

Komponenty:
- AdminQueueTable
- InvoiceStatusChip
- PayoutStatusChip
- SLAClockBadge
- CommissionSplitBar

Layout:
- Header: H1 + tabs
- Body: tabulka

Stavy:
- empty: „Nic k řešení v této záložce.“
- error/loading standard

Validace:
- Admin override vyžaduje důvod (audit).

Analytické eventy:
- `admin_financeops_viewed` (tab)
- `admin_financeops_row_opened` (ticket_id)

ASCII wireframe:
[H1 Financování & provize] [Tabs]
---------------------------------------------------------
[Table: Tiket | ... | Splatnost | Stav | Výplaty]
---------------------------------------------------------

---

## [SCREEN UI-198] Admin — Vystavit / nahrát fakturu platformy developerovi
Cíl uživatele:  
Založit a uložit kopii faktury platformy developerovi do systému.

Cíl byznysu:  
Mít auditovatelný podklad, který developer vidí v app.

Primární CTA / sekundární CTA:
- Primární: **Uložit fakturu**
- Sekundární: **Zrušit**

Obsah (texty 1:1):
- H1: **Faktura platformy developerovi**
- Pole:
  - Číslo faktury — povinné
  - Datum vystavení — povinné
  - Datum splatnosti — předvyplnit (14 dní od data přijetí)
  - Režim DPH (s DPH / bez DPH) — povinné
  - Sazba DPH (default 21 %) — pokud s DPH
  - PDF faktury — povinné
  - Variabilní symbol — doporučeno

Komponenty:
- Form + FileUpload (PDF)

Validace:
- Po uložení je faktura uzamčená (read-only); opravy mimo platformu.

Analytické eventy:
- `admin_invoice_uploaded` (invoice_id, ticket_id, vat_mode)

ASCII wireframe:
[H1 Faktura platformy developerovi]
----------------------------------------
[# | vystaveno | splatnost]
[DPH mode | sazba] [VS]
[Upload PDF]
[CTA Uložit]
----------------------------------------

---

## [SCREEN UI-199] Admin — Potvrdit úhradu provize + spustit výplaty
Cíl uživatele:  
Ručně potvrdit přijetí platby provize a tím odemknout “broker payouts” + Pool.

Cíl byznysu:  
Udržet konzistenci cashflow a spustit payout proces bez chyb.

Primární CTA / sekundární CTA:
- Primární: **Potvrdit úhradu provize**
- Sekundární: **Označit jako sporné** / **Upravit částku/datum** (s audit důvodem)

Obsah (texty 1:1):
- Title: **Potvrdit úhradu provize platformě**
- Pole:
  - Datum přijetí na účet platformy — povinné
  - Přijatá částka — povinné
  - Proof (volitelné) — upload
  - Poznámka — volitelná
- Rekapitulace (read-only):
  - „Provize (základ): …“
  - „Rozdělení: platforma / broker 1 / broker 2“ (částky bez DPH)
  - „Podklady k fakturaci budou brokerům zpřístupněny po potvrzení.“
  - „Termín výplaty brokerům: {datum} (default 3 dny; počítáno od přijetí faktury brokera).“

Komponenty:
- Modal/Drawer
- MoneyBreakdownTable
- CommissionSplitBar
- ProofUpload

Stavy:
- success: toast „Úhrada potvrzena. Brokerům byly zpřístupněny podklady k fakturaci.“
- error standard

Validace:
- Částka > 0; CZK-only.
- Admin edit (override) vždy vyžaduje důvod + zapisuje se do audit logu.

Analytické eventy:
- `admin_commission_payment_confirmed` (ticket_id, amount, received_date)
- `admin_commission_marked_dispute` (ticket_id, reason)

ASCII wireframe:
[Modal: Potvrdit úhradu provize]
----------------------------------------
[Datum přijetí] [Částka] [Upload proof]
[Rekap: split + podklady pro brokery]
[CTA Potvrdit]
----------------------------------------

---

## [SCREEN UI-201] Admin — Faktura brokera přijata (kontrola + párování)
Cíl uživatele:  
Potvrdit, že faktura brokera byla doručena / je správná, a spustit odpočet výplaty.

Cíl byznysu:  
Zrychlit výplaty a snížit chyby v párování (VS / částky / DPH režim).

Primární CTA / sekundární CTA:
- Primární: **Označit jako přijatou**
- Sekundární: **Vrátit k doplnění** / **Označit jako spornou**

KPI:
- time_to_invoice_received
- % faktur vrácených k doplnění
- payout_sla_breach_rate

Obsah (texty 1:1):
- Title: **Faktura brokera — kontrola**
- Rekap: Tiket + broker + částka podílu (základ bez DPH)
- Pole:
  - Číslo faktury — povinné
  - Datum vystavení — povinné
  - Datum splatnosti — volitelné
  - PDF faktury — povinné (pokud broker nenahrál) / read-only (pokud nahrál)
  - Identifikace platby (VS / zpráva pro příjemce) — volitelné, podpůrné
- Info box: **Po přijetí faktury běží lhůta pro výplatu (default 3 dny; nastavitelné).**

Komponenty:
- Drawer/Modal
- CommissionSummaryCard
- FileCard (PDF)
- InvoiceStatusChip

Layout:
- Compact drawer z admin ops tabulky

Stavy:
- missing_file: „Chybí PDF faktury.“
- dispute: banner „Sporné — pozastaveno.“

Validace:
- Číslo faktury + datum vystavení povinné.
- “Přijatá” může být až po tom, co je potvrzená úhrada provize platformě (jinak broker ještě nemá nárok).

Analytické eventy:
- `admin_broker_invoice_received` (ticket_id, broker_id, invoice_number)
- `admin_broker_invoice_returned` (ticket_id, broker_id, reason_code)
- `admin_broker_invoice_marked_dispute` (ticket_id, broker_id, dispute_reason)

ASCII wireframe:
[Drawer: Faktura brokera — kontrola]
---------------------------------------
[Summary: Tiket | Broker | Podíl]
[# faktury] [datum] [splatnost]
[PDF]
[CTA: Označit jako přijatou]
---------------------------------------

---

## [SCREEN UI-202] Admin — Potvrdit výplatu brokerovi (ručně)
Cíl uživatele:  
Zadat do systému, že výplata proběhla (datum, částka, proof) — bez bankovní integrace.

Cíl byznysu:  
Auditovat výplaty a předcházet sporům.

Primární CTA / sekundární CTA:
- Primární: **Potvrdit výplatu**
- Sekundární: **Označit jako sporné**

KPI:
- payout_cycle_time
- payout_sla_breach_rate

Obsah (texty 1:1):
- Title: **Potvrdit výplatu brokerovi**
- Rekap:
  - Broker
  - Tiket
  - Částka k úhradě (základ + případně DPH dle faktury brokera)
- Pole:
  - Datum výplaty — povinné
  - Vyplacená částka (CZK) — povinné
  - Proof (volitelné) — upload
  - Poznámka — volitelné
- SLA řádek: „Termín výplaty: {date} (default 3 dny).“

Komponenty:
- Drawer/Modal
- MoneyBreakdownTable
- ProofUpload
- PayoutStatusChip
- SLAClockBadge

Validace:
- Výplata může být potvrzena jen pokud je faktura brokera ve stavu “přijatá”.
- Částka > 0; CZK-only.

Analytické eventy:
- `admin_broker_payout_confirmed` (ticket_id, broker_id, paid_amount, paid_date)
- `admin_broker_payout_marked_dispute` (ticket_id, broker_id, dispute_reason)

ASCII wireframe:
[Drawer: Potvrdit výplatu brokerovi]
---------------------------------------
[Summary: Broker | Tiket | Částka]
[Datum výplaty] [Částka] [Upload proof]
[SLA badge]
[CTA: Potvrdit výplatu]
---------------------------------------

---

## [SCREEN UI-190] Pool program — Přehled
Cíl uživatele:  
Chápat, jak se plní Pool a jaká je šance na odměnu (motivační mechanika).

Cíl byznysu:  
Retence brokerů + motivace k aktivitě (rezervace → profinancování).

Primární CTA / sekundární CTA:
- Primární: **Zobrazit pravidla Poolu**
- Sekundární: **Stáhnout export** (admin) / **Zobrazit historii období**

KPI:
- retence brokerů (MAU)
- aktivita: # rezervací / broker / období
- % kvalifikovaných brokerů

Obsah (texty 1:1):
- H1: **Pool program**
- Subtext: **Odměna navíc podle aktivity. Vyhlášení probíhá anonymně.**
- Info: „Pool je financovaný z podílu platformy na provizi. Podíly brokerů se Pool programem nesnižují.“

Komponenty:
- PoolProgressCard, AnonymousLeaderboard, ExportButton

Layout:
- Header: H1
- Body: 2 sloupce (Progress | Leaderboard + historie)

Stavy:
- žádná aktivita: „Zatím nejsou žádné příspěvky v tomto období.“
- uzavřené období: read‑only, CTA „Zobrazit vyhlášení“

Validace:
- Anonymita: broker view anonymní; admin view se jmény.

Analytické eventy:
- `pool_viewed`
- `pool_rules_opened`
- `pool_export_clicked`

ASCII wireframe:
[Header: Pool program]
-----------------------------------------
[Progress card]     [Leaderboard (A/B/C)]
[Meta 1/2]          [History list]
-----------------------------------------

---

# EPIC 20 — Admin UI: approval, override, audit log, export

## Kontrola EPIC 20 (co musí být splněno v UI)
Admin je v MVP “gatekeeper” a zároveň “ops”. Aby platforma fungovala bez ručních dohledávaček mimo systém, Admin UI musí pokrýt:

1) **Schvalování účtů** (broker + developer) — stav účtu + audit. 
2) **Nastavení limitů a parametrů** (sloty brokerů, kapacity, SLA) — globálně i per tiket/per rezervaci. 
3) **Správu tiketu po publikaci** (hide / expired / re-open + publish window)
4) **Change request tok** (developer → admin) s blokátory (aktivní rezervace / vygenerovaný eSign) + výjimka s auditem
5) **Rezervace ops zásahy** (Spor, ruční ukončení, override SLA) s povinným důvodem a stopkou automatů
6) **Audit log + exporty** (pro řešení sporů i interní kontrolu).

---

## Role a principy
- Admin vidí všechna data (včetně odmaskovaných identit), ale **každý ruční zásah musí mít auditní stopu** (kdo, kdy, co, proč).
- Admin může měnit parametry, ale nesmí zpětně měnit již vydané dokumenty / faktury (read-only historie).

---

## Admin moduly (sitemap v UI)
1) **Dashboard**
2) **Uživatelé & approvals**
3) **Tikety & kapacity**
4) **Změny tiketu (change requests)**
5) **Rezervace ops**
6) **Financování & provize** (navazuje na EPIC 19)
7) **Pool management**
8) **Audit log**

---

## UI komponenty (reusable)
- `AdminQueueTable` (listy “k řešení”)
- `AdminOverrideModal` (povinný důvod + potvrzení)
- `AuditLogTable` + `AuditLogDetailDrawer`
- `RoleBadge`, `AccountStatusChip`
- `ParamEditorRow` (value + recommended range + impact note)
- `ChangeRequestPanel` (diff / proposed changes)
- `DangerZone` (ruční ukončení, spory)

---

## [SCREEN UI-203] Admin — Dashboard
Cíl uživatele:  
Rychle vidět, co dnes hoří (approvals, expirace, po splatnosti) a jedním klikem se dostat do detailu.

Cíl byznysu:  
Zkrátit ops reakční dobu a zabránit zbytečným expiracím.

Primární CTA / sekundární CTA:
- Primární: **Otevřít detail položky**
- Sekundární: **Zobrazit vše** (přejít do modulu)

KPI:
- admin_time_to_action (od vzniku položky)
- % SLA breach (investor eSign / developer eSign / payout)
- # pending approvals older_than_24h

Obsah (texty 1:1):
- H1: **Admin dashboard**
- Sekce “Fronty” (cards):
  - **Čeká na schválení účtu** (Brokers / Developers)
  - **Tikety expirované brzy** (do 7 dnů)
  - **Rezervace po deadline** (Souhlas+NDA/Rezervace/Developer podpis)
  - **Provize po splatnosti** (developer faktury)
  - **Výplaty brokerům po splatnosti** (3 dny)
- Rychlé filtry: “Pouze po splatnosti”, “Jen dnes”

Komponenty:
- DashboardCardsGrid
- AdminQueuePreviewTable (top 5 položek)

Layout:
- Header: H1 + quick filters
- Body: grid cards + tabulka “poslední události”

Stavy:
- empty: „Žádné otevřené úkoly. 🎉“

Validace:
- — (dashboard je read-only)

Analytické eventy:
- `admin_dashboard_viewed`
- `admin_dashboard_card_opened` (card_type)
- `admin_dashboard_item_opened` (entity_type, entity_id)

ASCII wireframe:
[H1 Admin dashboard] [Quick filters]
------------------------------------------------
[Card: approvals] [Card: expiring tickets] [Card: overdue]
[Card: overdue invoices] [Card: payouts due] [Card: disputes]
------------------------------------------------
[Table: poslední události / top 5 tasks]
------------------------------------------------

---

## [SCREEN UI-204] Admin — Approvals (uživatelé)
Cíl uživatele:  
Zpracovat žádosti o registraci (self signup) a udržet kontrolu pilotu.

Cíl byznysu:  
Kvalita sítě (brokerů/developerů) + bezpečnost (gating).

Primární CTA / sekundární CTA:
- Primární: **Otevřít žádost**
- Sekundární: **Schválit** / **Zamítnout** (z listu jen u jednoduchých případů)

KPI:
- approval_cycle_time
- approval_accept_rate
- # zamítnutí dle důvodu

Obsah (texty 1:1):
- H1: **Schvalování uživatelů**
- Tabs: **Brokeři** | **Developeři** | **Všichni**
- Filtry: Stav (čeká na schválení / aktivní / pozastaveno), datum registrace
- Tabulka sloupce:
  - Jméno/Firma
  - Role (RoleBadge)
  - E-mail
  - Datum registrace
  - Stav účtu
  - Akce

Komponenty:
- AdminQueueTable
- AccountStatusChip
- RoleBadge

Layout:
- Header: H1 + tabs + filtry
- Body: tabulka

Stavy:
- empty: „Žádné žádosti k vyřízení.“

Validace:
- Zamítnutí vyžaduje důvod (enum + text).

Analytické eventy:
- `admin_approvals_viewed` (tab)
- `admin_approval_opened` (user_id)
- `admin_approval_bulk_action_used` (action, count)

ASCII wireframe:
[H1 Schvalování uživatelů]
[Tabs] [Filters]
---------------------------------------------------------
[Table: Name | Role | Email | Registered | Status | Action]
---------------------------------------------------------

---

## [SCREEN UI-205] Admin — Detail žádosti (broker / developer)
Cíl uživatele:  
Bezpečně schválit nebo zamítnout účet na základě dat z registrace a interní kontroly.

Cíl byznysu:  
Kvalita pilotu + minimalizace rizika (fake účty, špatné fakturační údaje).

Primární CTA / sekundární CTA:
- Primární: **Schválit účet**
- Sekundární: **Zamítnout** / **Pozastavit účet**

KPI:
- approval_to_first_action (po schválení: první tiket / první rezervace)
- rejection_reason_distribution

Obsah (texty 1:1):
- H1: **Žádost o schválení — {jméno/firma}**
- Stav: **Čeká na schválení** / Aktivní / Pozastaveno
- Sekce “Identifikace”:
  - role
  - jméno + firma
  - IČO / DIČ (pokud existuje)
  - kontakty (e-mail, telefon)
  - adresa
- Sekce “Nastavení účtu” (pro brokera):
  - Level: Partner / Premium / Elite (dropdown)
  - Slot limit (override) — číslo
  - Poznámka: „Sloty lze nastavovat globálně i per broker.“
- Sekce “Nastavení účtu” (pro developera):
  - Developer organizace (vybrat / vytvořit)
  - Přístup: **Více uživatelů na 1 developera** (team) — zapnuto v MVP (admin správa)

Komponenty:
- DetailHeader + status chip
- ReadonlyFieldGrid
- Dropdown + NumberInput
- AdminOverrideModal (pro změny po schválení)

Layout:
- Header: H1 + status + CTA
- Body: 2 sloupce (Identifikace | Nastavení účtu)

Stavy:
- approve_success: „Účet schválen.“
- reject_success: „Účet zamítnut.“
- suspend_state: banner „Účet je pozastaven.“

Validace:
- Při schválení brokera musí být vyplněný level + slot limit (default podle levelu).
- Při zamítnutí je povinný důvod.

Analytické eventy:
- `admin_user_approved` (user_id, role, level)
- `admin_user_rejected` (user_id, reason_code)
- `admin_user_suspended` (user_id, reason)

ASCII wireframe:
[H1 Žádost o schválení] [Status] [Approve] [Reject]
-----------------------------------------------------
[Identifikace fields]         [Level + Slot limit / Org]
-----------------------------------------------------

---

## [SCREEN UI-207] Admin — Tikety (správa)
Cíl uživatele:  
Mít přehled o všech tiketech a rychle řešit expirace, skrývání a re-open.

Cíl byznysu:  
Udržet marketplace čistý a aktuální.

Primární CTA / sekundární CTA:
- Primární: **Otevřít tiket**
- Sekundární: **Skrýt** / **Re-open** / **Změnit kapacitu**

KPI:
- # tickets_published
- # tickets_reopened
- % tickets_expired_without_reservation

Obsah (texty 1:1):
- H1: **Tikety**
- Filtry: Stav (Zveřejněný / Skrytý / Expirovaný / Uzavřený), Developer, Expiruje do X dní
- Tabulka sloupce:
  - Tiket
  - Developer
  - Kapacita N
  - Zveřejněno do (publikační okno)
  - Stav
  - Tag „upraveno“ (datum)

Komponenty:
- AdminTicketsTable
- StatusChip
- QuickActionMenu

Layout:
- Header: H1 + filtry
- Body: tabulka

Stavy:
- empty: „Žádné tikety.“

Validace:
- Re-open je dostupný jen ze stavu Skrytý nebo Expirovaný.

Analytické eventy:
- `admin_tickets_viewed`
- `admin_ticket_opened` (ticket_id)
- `admin_ticket_quick_action_used` (ticket_id, action)

ASCII wireframe:
[H1 Tikety] [Filters]
---------------------------------------------------------
[Table: Tiket | Developer | Kapacita | Zveřejněno do | Stav]
---------------------------------------------------------

---

## [SCREEN UI-208] Admin — Tiket detail (Admin panel)
Cíl uživatele:  
Nastavit kapacitu, publish window a SLA per tiket; řešit re-open/hide a change requests.

Cíl byznysu:  
Udržet konzistenci pravidel a minimalizovat incidenty.

Primární CTA / sekundární CTA:
- Primární: **Uložit změny**
- Sekundární: **Skrýt tiket** / **Re-open** / **Schválit změnu**

KPI:
- # overrides
- % tickets_with_custom_capacity
- # change_requests_resolved

Obsah (texty 1:1):
- H1: **Tiket — Admin nastavení**
- Sekce “Stav a publikace”:
  - Stav: Zveřejněný / Skrytý / Expirovaný / Uzavřený
  - Publikační okno (dny) — default 90; editovatelné
  - Zveřejněno do (datum) — odvozené
  - Akce: Skrýt / Re-open (nastaví nové publikační okno)
- Sekce “Kapacita a fronta”:
  - Kapacita N (1–10; doporučeno 1–3)
  - Tooltip: „Do kapacity se počítá až podpis rezervační smlouvy investorem.“
- Sekce “SLA”:
  - eSign balík (investor) — 48h (MVP sjednocené)  
  - Developer podpis — 48h  
  - Jednání/financování — 30 dní  
  - Splatnost provize — 14 dní  
  - Výplata brokerům — 3 dny  
  *(vše editovatelné per tiket; doporučené rozsahy viz parametr registry)*
- Sekce “Žádosti o změnu”:
  - list posledních žádostí + stav + otevřít detail

Komponenty:
- ParamEditorRow (value + range)
- AdminOverrideModal (povinný důvod)
- ChangeRequestList

Layout:
- Header: H1 + primary CTA
- Body: sekce v accordionu (Publication / Capacity / SLA / Change Requests)

Stavy:
- locked_fields: při uzavřeném tiketu (profinancovaný) jsou publish/capacity read-only (jen re-open není relevantní)
- conflict_warning: pokud změna ovlivní běžící rezervace (zobrazit potvrzení)

Validace:
- Kapacita > 0.
- Publish window >= 1 den.
- Každý override vyžaduje důvod a zapisuje se do audit logu.

Analytické eventy:
- `admin_ticket_settings_viewed` (ticket_id)
- `admin_ticket_settings_changed` (ticket_id, field, from, to)
- `admin_ticket_hidden` / `admin_ticket_reopened`

ASCII wireframe:
[H1 Tiket — Admin nastavení] [Uložit změny]
---------------------------------------------------------
[Section: Stav + publikace]
[Section: Kapacita]
[Section: SLA]
[Section: Žádosti o změnu]
---------------------------------------------------------

---

## [SCREEN UI-209] Admin — Žádost o úpravu tiketu (detail)
Cíl uživatele:  
Rozhodnout o žádosti developera a (pokud schválím) propsat změny do tiketu.

Cíl byznysu:  
Bezpečné změny bez rozbití běžících rezervací.

Primární CTA / sekundární CTA:
- Primární: **Schválit změnu**
- Sekundární: **Zamítnout** / **Schválit s úpravou**

KPI:
- change_request_resolution_time
- % requests rejected
- # overrides due to active reservations

Obsah (texty 1:1):
- H1: **Žádost o úpravu tiketu**
- Meta: podal (developer), datum podání, stav žádosti
- Sekce “Popis”:
  - Popis změny (text)
  - Navržené změny (struktura / text)
- Sekce “Návrh promítnutí”:
  - Admin mapuje navržené změny do konkrétních polí tiketu (diff view)
- Blokátory:
  - Pokud existují aktivní rezervace nebo vygenerovaný eSign, ukázat banner „Změna je blokovaná.“
  - CTA: **Udělít výjimku** (vyžaduje audit důvod)
- Po realizaci:
  - Tiket dostane tag **„upraveno“ + datum**.

Komponenty:
- ChangeRequestPanel (diff)
- AdminOverrideModal
- DecisionButtons

Layout:
- Header: H1 + decision CTA
- Body: 2 sloupce (Popis | Diff editor)

Stavy:
- approved: toast „Schváleno.“
- rejected: toast „Zamítnuto.“
- realized: status „Realizováno“ (read-only)

Validace:
- Zamítnutí vyžaduje poznámku.
- Schválení s úpravou ukládá finální hodnoty do tiketu + audit.

Analytické eventy:
- `admin_change_request_viewed` (request_id)
- `admin_change_request_approved` (request_id)
- `admin_change_request_rejected` (request_id, reason_code)
- `admin_change_request_override_used` (request_id)

ASCII wireframe:
[H1 Žádost o úpravu tiketu] [Approve] [Reject]
---------------------------------------------------------
[Popis změny]              [Diff editor: field -> value]
[Navržené změny]           [CTA Schválit s úpravou]
---------------------------------------------------------

---

## [SCREEN UI-210] Admin — Rezervace (detail + ops zásahy)
Cíl uživatele:  
Vyřešit incident/spor, ručně ukončit rezervaci nebo prodloužit lhůty.

Cíl byznysu:  
Zabránit chaosu a udržet férovost fronty.

Primární CTA / sekundární CTA:
- Primární: **Uložit zásah**
- Sekundární: **Označit jako spor** / **Ukončit rezervaci**

KPI:
- dispute_resolution_time
- # manual cancellations
- # deadline extensions

Obsah (texty 1:1):
- H1: **Rezervace — Admin**
- Banner “Spor”:
  - „Rezervace je pozastavena. Automatické ukončování dle lhůt je vypnuté.“
- Sekce “Ops zásahy”:
  - Změnit stav: (Spor / Vrátit do procesu / Ukončit)
  - Upravit deadline: eSign balík / developer podpis / jednání (nové datum/čas)
  - Důvod zásahu (povinné)
- Sekce “Kontext”:
  - timeline (z EPIC 18)
  - odkazy na eSign envelope, faktury, audit log

Komponenty:
- DangerZone
- AdminOverrideModal
- Timeline
- LinksList

Layout:
- Header: H1 + status
- Body: 2 sloupce (Ops zásahy | Kontext + timeline)

Stavy:
- cannot_modify: pokud je rezervace uzavřená (jen read-only)

Validace:
- Každá změna stavu/deadline vyžaduje důvod.
- Při ukončení povinný reason code (enum) + text.

Analytické eventy:
- `admin_reservation_viewed` (reservation_id)
- `admin_reservation_marked_dispute` (reservation_id, reason)
- `admin_reservation_deadline_changed` (reservation_id, field, from, to)
- `admin_reservation_terminated` (reservation_id, reason_code)

ASCII wireframe:
[H1 Rezervace — Admin] [Status]
---------------------------------------------------------
[Ops zásahy: stav + deadline + důvod]   [Timeline + odkazy]
---------------------------------------------------------

---

## [SCREEN UI-211] Admin — Nastavení (registr parametrů)
Cíl uživatele:  
Mít jedno místo pro “všechna čísla” (sloty, SLA, limity) a jejich doporučené rozsahy.

Cíl byznysu:  
Zabránit “skrytým konstantám” v implementaci a umožnit rychlou ops změnu.

Primární CTA / sekundární CTA:
- Primární: **Uložit změny**
- Sekundární: **Vrátit na default**

KPI:
- # settings_changes
- # settings_rollbacks

Obsah (texty 1:1):
- H1: **Nastavení**
- Tab: **Sloty brokerů** | **SLA & lhůty** | **Tikety** | **Provize & výplaty**
- Každý řádek:
  - Název parametru
  - Hodnota
  - Doporučené rozmezí
  - Dopad změny (hint)
  - Kde se aplikuje (globálně / per tiket / per rezervaci)

Komponenty:
- SettingsTable (ParamEditorRow)
- AdminOverrideModal (povinný důvod při změně)

Validace:
- systém brání nesmyslům (0, záporné; součet podílů ≠ 100 %).

Analytické eventy:
- `admin_settings_viewed` (tab)
- `admin_setting_changed` (key, from, to)
- `admin_settings_saved`

ASCII wireframe:
[H1 Nastavení] [Tabs] [Uložit]
---------------------------------------------------------
[Table: Param | Value | Range | Impact | Scope]
---------------------------------------------------------

---

## [SCREEN UI-200] Admin — Audit log
Cíl uživatele:  
Dohledat, kdo co kdy změnil (důvěra, compliance, řešení sporů).

Cíl byznysu:  
Snížit reputační a právní riziko + umožnit řešit “kdo koho přivedl”.

Primární CTA / sekundární CTA:
- Primární: **Zobrazit detail události**
- Sekundární: **Exportovat (CSV)**

KPI:
- time‑to‑resolve dispute (interní)
- # manuálních zásahů admina (měřit pro budoucí automatizace)

Obsah (texty 1:1):
- H1: **Audit log**
- Filtry: typ entity (tiket/rezervace/provize/pool/uživatel), datum od–do, admin uživatel, důvod
- Sloupce: čas, akce, entita, kdo provedl, změna

Komponenty:
- AuditLogTable
- Detail drawer

Layout:
- Full width table + sticky filters row

Stavy:
- empty: „Žádné události v tomto období.“
- error/loading standard

Validace:
- Override modaly vyžadují důvod (free text + enum), jinak nelze uložit.

Analytické eventy:
- `admin_auditlog_viewed`
- `admin_auditlog_filtered`
- `admin_auditlog_exported`

ASCII wireframe:
[Header: Audit log]
-------------------------------------------------
[Filters row]
[Table: Time | Action | Entity | Actor | Change]
-------------------------------------------------

---

# EPIC 21 — Globální UI patterns: navigace, stavy, jazyk, přístupnost

## Kontrola EPIC 21 (co musí být splněno v UI)
Aby byla aplikace konzistentní napříč rolemi a šla bez dohadů implementovat, musí být v UI hotové tyto „globální patterny“:

1) **Jednotný app shell** (navigace, breadcrumbs, page header, layout grid) pro Broker/Developer/Admin.
2) **Standard systémových stavů** (loading/empty/error/permission/locked/expired) — stejné komponenty a stejné copy.
3) **Standard feedbacku** (toast vs banner vs inline) + potvrzovací modaly pro destruktivní akce.
4) **Form patterns**: validace, formátování částek/%, povinné/volitelné, „unsaved changes“ warning.
5) **List & table patterns**: filtry, chips, sort, pagination, row actions, export (admin).
6) **Document patterns**: upload/download, locked dokumenty, eSign envelope status, audit downloadů.
7) **Audit & compliance**: důvody override/destruktivních akcí, bezpečné maskování (PII), “not advice” disclaimer.
8) **Lokalizace & formátování**: CZK-only, datum/čas, zaokrouhlení, tisícové oddělovače.
9) **Terminologie**: zakázané výrazy a povinné disclaimery.
10) **Přístupnost (min. baseline)**: focus, klávesnice, kontrasty, modal trap.

---

## 21.1 App shell & navigace (role-based)

### Left nav (primární navigace)
- **Broker:** Tikety, Rezervace, Investoři, Provize, Pool, Profil  
- **Developer:** Tikety (moje), Rezervace (na mých tiketech), Faktury, Profil  
- **Admin:** Dashboard, Uživatelé, Tikety, Rezervace, Financování/Provize, Pool, Audit log  

### Top bar (sekundární)
- Aktivní organizace (pokud uživatel může patřit do více org v post‑MVP; v MVP 1 org, ale UI s tím počítá)
- Uživatel (avatar + menu: Profil, Odhlásit)
- Globální alert slot (např. „Údržba“, „Session brzy vyprší“)

### Breadcrumbs
- Povinné na všech detailech a wizards:
  - Tikety → Detail
  - Rezervace → Detail
  - Provize → Detail
  - Admin → Modul → Detail

### Page header (standard)
- H1 + krátký subtext (1 věta) + pravá strana pro primary actions (např. Export / Uložit / Schválit).
- Pokud stránka obsahuje tabulku, filtry jsou pod page headerem jako „sticky row“ (na scroll).

---

## 21.2 Systémové stavy (design + copy)

### Loading
- **Page loading:** skeleton pro header + hlavní bloky (karty / tabulka / sekce detailu).
- **Action loading:** CTA přejde do `loading` + disabled; žádné dvojité kliky.
- Copy: bez „Loading…“, raději vizuální skeleton.

### Empty states (2 typy)
- **„Nemáš data“** (onboarding prázdno):
  - Např. „Zatím nemáte žádné rezervace.“
  - CTA: „Prohlédnout tikety“ / „Přidat investora“ (dle role).
- **„Filtry nic nenašly“** (prázdno po filtraci):
  - „Nic nenalezeno pro zvolené filtry.“
  - CTA: „Reset filtrů“

### Error
- **Page error:** banner s krátkým textem + CTA „Zkusit znovu“.
- **Inline error (form):** u pole + souhrn nahoře (u dlouhých formulářů).
- Doporučené copy:
  - „Něco se nepovedlo. Zkuste to znovu.“
  - „Nemáme spojení. Obnovte stránku.“

### Permission denied / Gate
- Copy: „K této části nemáte přístup.“ + „Kontaktujte administrátora.“
- Pokud dává smysl: CTA „Požádat admina“ (post‑MVP), v MVP jen info.

### Locked / Masked / Expired
- **Locked:** placeholder + info „Odemkne se po podpisu Souhlasu + NDA investorem.“
- **Expired (tiket):** badge „Expirovaný“ a CTA k vytvoření nové rezervace disabled (detail zůstává čitelný).
- **Expired (SLA):** SLA badge „Vypršelo“ + next action se změní na „Kontaktujte admina“ / „Ukončeno“.

---

## 21.3 Feedback, potvrzení a notifikace

### Toast (krátké potvrzení)
Použít pro:
- úspěšné uložení,
- odeslání reminderu,
- upload dokumentu.

Copy pattern:
- Success: „Uloženo.“ / „Odesláno.“
- Error: „Nepodařilo se uložit. Zkuste to znovu.“

### Banner (důležité a trvalejší)
Použít pro:
- varování o expiraci („Zbývá méně než 48 h…“),
- kapacita plná (info, že rezervace půjde do fronty),
- „Spor“ stav,
- compliance hlášky (matching „not advice“).

### Confirm modals (destruktivní akce)
- Akce: „Zamítnout“, „Ukončit rezervaci“, „Skrýt tiket“, „Udělít výjimku“
- Povinné prvky:
  - jasný popis dopadu,
  - důvod (pokud audit vyžaduje),
  - „Confirm“ tlačítko jako destructive + sekundární „Zrušit“.

---

## 21.4 Form patterns (validace + UX)

### Povinné/volitelné
- Povinné pole: bez hvězdiček (preferujeme), ale „Povinné“ se komunikuje hintem u skupiny nebo na konci sekce.
- Volitelné pole: označit „(volitelné)“ přímo v labelu.

### Validace (pattern)
- Validovat při blur + před submit.
- Form error:
  - krátký, konkrétní text („Zadejte částku v Kč.“)
  - žádné technické hlášky (error codes do logu, ne do UI)

### Formátování částek
- CZK input:
  - při psaní povolit jen čísla + mezery, automatické oddělení tisíců,
  - vždy zobrazit jednotku „Kč“ v suffixu.
- % input:
  - zobrazit `%` jako suffix, interně ukládat jako číslo.

### „Unsaved changes“
- Pokud uživatel změnil hodnoty a odejde:
  - modal: „Máte neuložené změny. Opravdu chcete odejít?“

---

## 21.5 Tabulky & listy (filtry, sort, akce)

### Filtry (standard)
- Filtry vždy jako:
  - kontrolky nahoře + chipy aktivních filtrů pod nimi (click-to-remove).
- Reset filtrů vždy dostupný.

### Sort
- Jeden sort dropdown vpravo nad tabulkou/listem.

### Row actions
- Primární akce: klik na řádek (otevře detail).
- Sekundární akce: `…` menu (Export, Změnit stav, Odeslat reminder).

### Pagination
- MVP: klasická pagination + počet položek na stránku (volitelně).

### Export (admin)
- CSV export jako sekundární CTA, s confirm modalem u velkých datasetů (post‑MVP throttle).

---

## 21.6 Dokumenty & eSign (zobrazení + bezpečnost)

### Upload (Proof / Faktury / Podklady)
- Povolené formáty: PDF, JPG, PNG (MVP).
- Vždy zobrazit:
  - název souboru, datum nahrání, kdo nahrál.
- Stavy uploadu: uploading / success / failed (retry).

### Locked dokumenty
- V seznamu dokumentů zobrazit „Zamčeno“ řádek:
  - název skupiny + text „Odemkne se po podpisu…“ (bez PII).
- Klik na locked dokument otevře vysvětlení (bez odemknutí).

### eSign envelope status
- Status labely (MVP):
  - Připraveno / Odesláno / Podepsáno investorem / Podepsáno developerem / Dokončeno / Vypršelo / Chyba
- Vždy udržet link „Znovu poslat“ jen pro roli, která smí (broker/admin) a jen dokud není dokončeno.

---

## 21.7 Audit & důvěra (průřezové patterny)

### Audit trail mini
- Na detailech vždy ukázat poslední 3 události + CTA „Zobrazit audit log“.

### Destruktivní akce a override
- Povinný důvod (enum + text) a zapisovat do audit logu:
  - admin override SLA,
  - udělení výjimky na change request,
  - ukončení rezervace.

### Compliance disclaimers (povinné)
- Matching: „Doporučení, nikoli investiční poradenství.“
- Využití prostředků: „Plánované, může se změnit.“
- Ready score: „Platforma podklady neověřuje.“

---

## 21.8 Lokalizace a formátování
- Měna pouze CZK; částky formát `12 500 000 Kč` (mezera jako oddělovač tisíců).
- Datum formát: `31. 1. 2026` + čas `14:30` (24h).
- Částky v UI komunikujeme jako **základ bez DPH** (DPH řeší faktura).  
- Zaokrouhlení:
  - V UI zobrazovat celé Kč (0 desetinných), pokud není důvod jinak (např. DPH výpočet může mít haléře pouze na faktuře).

---

## 21.9 Terminologie (brand-safe)
- Nepoužívat „přímá půjčka“, používat „Zápůjčka / úvěr“.
- Nepoužívat „investice“ jako primární termín; používat „rezervace / financování“.
- U odměn vždy „Odměna / provize (bez DPH)“.
- Statusy: preferovat krátké, jednoznačné labely (Odesláno, Podepsáno, Ve frontě, V kapacitě, Aktivní, Profinancováno, Ukončeno).

---

## 21.10 Přístupnost (minimální standard)
- Kontrast textů a badge (WCAG AA).
- Keyboard focus pro všechny interaktivní prvky (včetně karet, row actions).
- Modal: focus trap, ESC, návrat focusu.
- Tabulky: sticky header, správné pořadí tab index, rozumné zkrácení textů + tooltip.

---

## Akceptační kritéria UI části (po EPIC 21)
- Všechny klíčové entity mají konzistentní zobrazení stavů (ticket/reservation/invoice/pool).
- Marketplace zobrazuje: **expiraci**, **LTV (pokud je)**, **zajištění**, **matching count**.
- Rezervace mají jednotný timeline komponent s „kdo je na tahu“ a SLA badge.
- Admin má audit log a override modaly s důvodem.
- CZK-only a terminologie jsou konzistentní napříč appkou.
- Nikde v UI ani analytice neuniká PII mimo definované permission flagy.

---

## Kolik EPICů zbývá?
- UI backlog pro MVP jsme plánovali do **EPIC 21**.  
- Tímto doplněním EPIC 15–21 je UI část **funkčně uzavřená** (další EPICy by už byly „nice‑to‑have“ nebo rozšíření mimo MVP — např. pokročilé dashboardy, dark mode, marketing site UI kit).
