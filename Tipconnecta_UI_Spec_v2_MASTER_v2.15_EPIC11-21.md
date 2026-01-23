# Tipconnecta — UI zadávací dokumentace (v2) — MASTER
**Verze:** v2.15 (MASTER)
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
1) **Rychlé skenování**: broker do 1–3 minut pozná „fit / no‑fit“ bez otevírání 10 detailů.【214:6†Tipari_persona_obchodnik_partner_20m.md†L25-L32】
2) **Jasná odměna v Kč (bez DPH)** + základní parametry pro rozhodnutí (zajištění, LTV, lhůty).【214:14†Tipconnecta_Strategicky_Marketingovy_Deck_v1.md†L19-L29】
3) **SLA do expirace tiketu** (do kdy je možné založit novou rezervaci) + disabled chování po expiraci.【207:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L1-L7】
4) **Matching shod investora** (interní doporučení obchodníka; ne investiční poradenství).【203:1†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L3-L8】
5) **Preferenční filtr 20M+** (z profilu brokera) + uložené filtry, aby se broker nemusel „proklikávat“ pokaždé znovu.【214:1†Tipari_persona_obchodnik_partner_20m.md†L11-L17】
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
- Publikační okno je defaultně **90 dnů**; po vypršení **nelze založit novou rezervaci**, ale běžící rezervace mohou doběhnout.【207:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L1-L7】
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
  **„Doporučení, nikoli investiční poradenství.“**【203:1†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L3-L8】
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
- Filtry musí respektovat CZK-only (žádná změna měny).【207:4†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L34-L37】
- Pokud je tiket Expirovaný, nesmí být možné vytvořit novou rezervaci.【207:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L4-L7】

Analytické eventy:
- `ticket_list_viewed` (filters, sort)
- `ticket_card_impression` (ticket_id, position, filters, sort)
- `ticket_card_clicked` (ticket_id, position)
- `ticket_sort_changed` (sort_id)
- `filter_changed` (filter_name, value)
- `saved_filter_set_default` (filter_snapshot)
- `ticket_matchcount_clicked` (ticket_id)

Poznámky pro Figmu: — *(vynecháno dle zadání)*

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

Poznámky pro Figmu: — *(vynecháno dle zadání)*

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
   - Investor nemá login do aplikace; matching i evidence jsou interní nástroj obchodníka/admina. 【307:3†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L1-L9】

2) **Datový model investora a stavy musí sedět na kanon**  
   - Kanonická pole investora (12.4): typ investora, jméno/název firmy, daňová rezidence, stav záznamu (IČO jen pro právnickou osobu). 【307:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L13-L27】  
   - Stav investora: **Nový / Aktivní / Neaktivní / Zablokovaný**. 【307:16†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L8-L12】

3) **Bezpečnost & přístupová práva**  
   - Investoři jsou viditelní pouze vlastníkovi (brokerovi) a adminovi. Ostatní brokeři investory nevidí. 【307:5†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L38-L43】

4) **Matching musí být vysvětlitelný (důvod shody) + “not advice”**  
   - Matching je **doporučení**, nikoli investiční poradenství. 【307:3†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L5-L8】  
   - MVP: tvrdé filtry → “mimo kritéria”, měkké preference → pořadí + slovní hodnocení. 【307:5†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L10-L37】  
   - U každého investora musí být **důvod shody**. 【307:5†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L30-L33】

5) **Anti‑friction pro brokera (čas = nejdražší komodita)**  
   - Broker odmítá “nejasné” leady a chce kvalifikovat do 48 h. UI musí podporovat rychlé GO/NO‑GO: seznam → detail → rezervace. 【307:1†Tipari_persona_obchodnik_partner_20m.md†L23-L29】

6) **Blokátory pro odeslání rezervace musí být vidět už v CRM**  
   - Bez e‑mailu investora nejde poslat rezervaci k podpisu.  
   - Bez potvrzení právního důvodu evidence nesmí jít rezervaci odeslat. 【307:6†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L36-L42】

---

[SCREEN UI-170] Investoři — Seznam (broker)
Cíl uživatele:  
Rychle najít investora, zkontrolovat “fit” (min/max, regiony, zajištění, LTV) a buď otevřít detail, nebo rovnou vytvořit rezervaci (z tiketu / z investora).

Cíl byznysu:  
Zrychlit “time‑to‑first‑reservation” a zvýšit kvalitu rezervací (méně “mimo kritéria”). 【307:1†Tipari_persona_obchodnik_partner_20m.md†L23-L29】

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
  **Interní evidence. Vidíš ji jen ty a administrátor.** 【307:5†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L40-L43】
- Helper banner (jen pokud je nízká “kompletnost” u >50 % investorů):  
  **Tip: doplň minimální/maximum, regiony a zajištění — matching bude přesnější.**
- Filtry (labely):
  - **Stav:** Aktivní (default) / Nový / Neaktivní / Zablokovaný 【307:16†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L8-L12】
  - **Typ:** Fyzická osoba / Právnická osoba 【307:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L19-L21】
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
- Default filtr = Aktivní; “Nový/Neaktivní” zobrazit až po zapnutí filtru. 【307:5†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L35-L37】
- Změna stavu/archivace musí mít auditní stopu (blokace = audit). 【307:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L26-L27】

Analytické eventy:
- `investors_list_viewed` {user_role, filters_count}
- `investor_filter_changed` {filter_name, value}
- `investor_row_opened` {investor_id}
- `investor_create_clicked`
- `investor_import_clicked`

Poznámky pro Figmu:  
— (vynecháno dle zadání)

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
  **Bez potvrzení právního důvodu evidence nelze investorovi poslat rezervaci k podpisu.** 【307:6†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L41-L42】
- “Not advice” u doporučení:  
  **Doporučení, nikoli investiční poradenství.** 【307:3†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L5-L8】

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
- Investor je vždy “pod obchodníkem” (ownership). 【307:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L18-L19】
- Změna stavu na “Zablokovaný” vyžaduje důvod (audit). 【307:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L26-L27】

Analytické eventy:
- `investor_detail_viewed` {investor_id}
- `investor_status_changed` {investor_id, new_status, reason_filled}
- `investor_match_tab_opened` {investor_id}
- `ticket_opened_from_investor` {investor_id, ticket_id}

Poznámky pro Figmu:  
— (vynecháno dle zadání)

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
  **Investor není uživatelský účet. Sbíráme pouze nezbytná data pro komunikaci a podpisy.** 【311:6†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L13-L16】
- Checkbox (doporučeno):  
  **Potvrzuji, že mám právní důvod investora evidovat a kontaktovat.** 【311:2†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L13-L17】

Komponenty:
- Form (sections)
- RadioGroup (Typ investora)
- TextInput / EmailInput / PhoneInput
- Select (Stav záznamu)
- RangeInputs (Min/Max investice)
- MultiSelect (regiony, typy projektů, typy zajištění, formy financování)
- NumberInput (min výnos p.a., max délka, max LTV)
- Textarea (interní poznámka – pouze broker) 【311:2†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L11-L13】
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
- Edge: typ = právnická osoba → povinné IČO. 【307:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L20-L22】
- Edge: změna stavu na Zablokovaný → povinné pole “Důvod blokace” (textarea) + varování “Zablokovaný investor nejde použít pro rezervace.”

Validace a pravidla:
- `min_investice ≤ max_investice` (pokud obě vyplněné). (doporučení pro čistotu profilu)
- `max_LTV` 0–100 % (pokud vyplněno). 【311:2†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L11-L12】
- E‑mail formát; e‑mail není povinný pro uložení, ale je povinný pro odeslání k podpisu. 【307:6†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L41-L42】
- “Interní poznámka” se nikdy nezobrazuje developerovi. 【311:2†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L11-L13】
- Datum narození investora se v MVP nesbírá. 【311:2†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L15-L17】

Analytické eventy:
- `investor_form_viewed` {mode:create|edit}
- `investor_form_saved` {mode, investor_id, completeness_pct}
- `investor_form_validation_error` {field_name}
- `investor_save_and_reserve_clicked` {investor_id}

Poznámky pro Figmu:  
— (vynecháno dle zadání)

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
- Disclaimer: **Doporučení, nikoli investiční poradenství.** 【307:3†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L5-L8】
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
- Tvrdé filtry: měna, částka v min/max, doba ≤ max, region v preferovaných regionech. 【307:5†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L16-L20】
- Měkké preference: výnos ≥ min, typ projektu, typ zajištění, LTV ≤ limit. 【307:5†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L22-L26】
- Default: “Nový/Neaktivní” nezobrazovat bez přepnutí filtru. 【307:5†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L35-L37】
- U investora bez e‑mailu vypnout “Rezervovat” + tooltip “Doplň e‑mail investora.” 【307:6†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L41-L42】

Analytické eventy:
- `matching_viewed` {ticket_id, investors_count}
- `matching_filter_changed` {ticket_id, filter_name, value}
- `matching_investor_expanded` {ticket_id, investor_id}
- `matching_reserve_clicked` {ticket_id, investor_id, match_bucket}

Poznámky pro Figmu:  
— (vynecháno dle zadání)

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
- Disclaimer: **Doporučení, nikoli investiční poradenství.** 【307:3†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L5-L8】

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
- Stejná pravidla matchingu jako UI‑173. 【307:5†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L10-L33】

Analytické eventy:
- `investor_ticket_matches_viewed` {investor_id, tickets_count}
- `ticket_opened_from_match` {investor_id, ticket_id, match_bucket}

Poznámky pro Figmu:  
— (vynecháno dle zadání)

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
   - Fáze A (právní odemknutí): po podpisu **Souhlas + NDA** investorem se odemkne identita pro obchodníka i developera.【267:6†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L13-L19】
   - Fáze B (aktivace): po podpisu **rezervační smlouvy** oběma stranami se spustí obchodní lhůty (jednání/financování).【267:6†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L15-L20】

3) **Fronta a kapacita (top N) musí být čitelná a auditovatelná**
   - Pořadí určuje **čas podpisu rezervační smlouvy investorem**.【267:4†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L7-L13】
   - Do kapacity se započítávají rezervace až od podpisu investorem (Souhlas+NDA kapacitu neblokují).【267:4†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L7-L10】

4) **Developer jedná pouze s rezervacemi v kapacitě**
   - Rezervace mimo kapacitu je pro developera “read‑only”; smlouvu podepsanou investorem uvidí až po vstupu do kapacity. 【267:2†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L2-L9】

5) **Ukončení rezervace vždy s důvodem (pro spory a reporting)**
   - UI musí povinně zobrazovat důvod ukončení (např. expirace SLA, zamítnutí, profinancováno jiným investorem…).【267:9†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L1-L11】

6) **Stav “Spor” (pause)**
   - V režimu “Spor” jsou kroky zablokované a automatické lhůty pozastavené; řeší admin. 【267:4†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L2-L4】

---

## SLA & lhůty (MVP)
> V datech je podpis investora popsán jako 2 kroky (Souhlas+NDA → rezervační smlouva)【267:5†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L9-L17】.  
> **Rozhodnutí MVP:** posíláme 3 dokumenty jako **1 eSign envelope** a pro uživatelskou zkušenost zobrazujeme **1 deadline 48h na celý balík** (Souhlas + NDA + Rezervační smlouva).

- **Investor (balík podpisů):** default 48h od odeslání. (SLA “balíku” je rozhodnutí MVP; interně lze držet i dílčí timestampy.)【263:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L3-L8】
- **Developer (podpis/rozhodnutí):** default 48h od okamžiku, kdy je rezervace v kapacitě a investor podepsal rezervační smlouvu.【263:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L7-L9】【267:2†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L7-L9】
- **Jednání / profinancování:** default 30 dní od aktivace rezervace; admin může prodloužit.【263:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L9-L9】【267:2†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L11-L12】

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
  - **Investor** *(developer uvidí až po Souhlasu+NDA)*【267:6†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L23-L25】
  - **Stav**
  - **Na tahu**
  - **SLA**
  - **Fronta**
  - **Konec jednání** *(jen u aktivních)*【267:2†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L11-L12】

Komponenty:
- FiltersBar, ReservationTable, ReservationStatusChip, AssigneeChip, SLAClockBadge, QueuePositionBadge

Layout:
- Header: H1 + filtry
- Body: tabulka + stránkování

Stavy:
- Empty (žádná data): „Zatím nemáte žádné rezervace.“
- Empty (filtr): „Nic nenalezeno pro zvolené filtry.“ + CTA „Reset filtrů“
- Error: standard page error + „Zkusit znovu“
- Permission: developer nevidí rezervace před Souhlas+NDA (nezobrazovat vůbec).【267:6†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L23-L25】

Validace a pravidla:
- Fronta se zobrazuje až po podpisu rezervační smlouvy investorem (existuje pořadí).【267:4†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L7-L10】
- U ukončených rezervací vždy zobrazit důvod ukončení v detailu (z tabulky jen tooltip).【267:9†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L1-L11】

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
  - `ReservationStatusChip` (např. **Odesláno investorovi** / **Podepsáno investorem – ve frontě** / **Aktivní** …)【263:8†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L2-L7】
  - `AssigneeChip`: **Na tahu: Investor/Developer/Admin**
  - `SLAClockBadge`: **Zbývá 12 h** / **Vypršelo**
  - `QueuePositionBadge`: **Pozice 2/7 (v kapacitě)** / **Pozice 5/7 (mimo kapacitu)**【267:4†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L7-L12】

Komponenty:
- ProcessTimeline
- NextActionCard
- DocumentStatusList
- QueuePositionBadge
- AuditTrailMini
- DisputeBanner (pokud stav “Spor”)【267:4†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L2-L4】

Layout:
- Header: H1 + status row
- Body (2 sloupce):
  - Left: Timeline + Dokumenty + Audit
  - Right: NextActionCard + SLA detail

Stavy: loading / empty / error / success / edge cases
- **Spor:** banner „Rezervace je pozastavena (Spor). Automatické lhůty neběží. Kontaktujte admina.“【267:4†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L2-L4】
- **Profinancováno jiným investorem:** ukončit jako neúspěšné, bez odhalení vítěze ostatním brokerům.【263:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L7-L9】
- **Tiket expiroval, ale rezervace běžela:** zobrazit důvod ukončení „Tiket expiroval“ (pokud ukončeno) nebo info banner (pokud rezervace může doběhnout).【263:1†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L3-L5】【267:9†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L8-L11】

Validace a pravidla:
- Developer může podepsat/zamítnout jen rezervace **v kapacitě**.【267:4†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L11-L13】
- Zamítnutí developerem vyžaduje povinné odůvodnění.【267:2†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L12-L13】
- Zrušení adminem vyžaduje důvod (enum + poznámka).【267:9†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L9-L11】
- Dokument “Rezervační smlouva podepsaná investorem” je developerovi dostupná až při vstupu do kapacity.【267:2†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L2-L4】

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
Zrychlit aktivaci rezervací a snížit expirace SLA developera (48h).【263:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L7-L9】

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
- Zamítnutí: důvod povinný.【267:2†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L12-L13】

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

## Klíčová pravidla (z dat)
- Admin nastavuje a eviduje: splatnosti, potvrzení přijetí, potvrzení výplaty, změny s audit stopou.【207:16†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L2-L12】
- Pool program:
  - příspěvek vzniká při potvrzení úhrady provize platformě,
  - výplata po uzávěrce období,
  - anonymita ve vyhlášení (Obchodník A/B/C).【207:9†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L9-L18】【207:9†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L1-L3】

## Rozdělení provize (MVP)
- Použijeme defaultní rozdělení: **50/25/25** (platforma/broker1/broker2).【203:4†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L9-L11】
- UI vždy primárně komunikuje **částky bez DPH** (podle vašeho rozhodnutí).

## UI moduly
### A) Developer: Provize & faktury
- „Vaše platby“: seznam faktur od platformy
- Statusy: čeká / uhrazeno / po splatnosti (viz filtry pro Pool/export).【214:3†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L3-L12】
- Detail faktury: částka, DPH režim (pokud relevantní), PDF ke stažení.

### B) Broker: Moje provize & výplaty
- Přehled: očekávaná provize (pipeline), schválená, vyplacená
- Detail tiketu: „Provize vzniká po profinancování“ (copy motivace; success‑fee)

### C) Pool program: Přehled
- Panel: aktuální období, meta 1/meta 2, kvalifikace (progress)
- “Vyhlášení”: anonymizovaní obchodníci A/B/C.【207:9†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L1-L3】

## Komponenty
- `InvoiceTable` + `InvoiceStatusChip`
- `PayoutTimeline`
- `CommissionSplitBar` (50/25/25)
- `PoolProgressCard`
- `AnonymousLeaderboard` (A/B/C)
- `ExportButton` (CSV/XLSX)

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
- Subtext: **Odměna navíc podle aktivity. Vyhlášení probíhá anonymně.**【207:9†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L1-L3】
- Info: „Příspěvek do Poolu vzniká po úhradě provize platformě.“【207:9†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L9-L12】

Komponenty:
- PoolProgressCard, Leaderboard, Export

Layout:
- Header: H1
- Body: 2 sloupce (Progress | Leaderboard + historie)

Stavy:
- žádná aktivita: „Zatím nejsou žádné příspěvky v tomto období.“
- uzavřené období: read‑only, CTA „Zobrazit vyhlášení“

Validace:
- Anonymita: veřejná/“broker view” anonymní; admin view se jmény.【207:9†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L1-L3】

Analytické eventy:
- `pool_viewed`
- `pool_rules_opened`
- `pool_export_clicked`

Poznámky pro Figmu: — *(vynecháno dle zadání)*

ASCII wireframe:
[Header: Pool program]
-----------------------------------------
[Progress card]     [Leaderboard (A/B/C)]
[Meta 1/2]          [History list]
-----------------------------------------

---

# EPIC 20 — Admin UI: approval, override, audit log, export

## Proč
Admin je v MVP “gatekeeper”: schvaluje účty, nastavuje kapacity, potvrzuje financování a provádí opravy — vždy s auditní stopou.

## Pravidla z dat
- Admin může měnit kapacitu a publikační dobu tiketu (s důvodem a audit stopou).【207:16†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L10-L12】
- Developer nemůže upravovat zveřejněný tiket; může jen poslat žádost o změnu, kterou admin schválí/zamítne; v UI se zobrazí tag „upraveno“ + datum.【207:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L22-L28】

## Admin moduly (sitemap v UI)
1) **Dashboard admina**
   - rychlé boxy: Pending approvals, Pending signatures, Tickets expiring soon, Invoices overdue
2) **Uživatelé**
   - Brokers: schválení, úroveň (Partner/Premium/Elite), sloty
   - Developers: možnost více uživatelů na 1 developera (team management)
3) **Tikety**
   - kapacita, publish window, re-open, change requests
4) **Rezervace**
   - audit, SLA expirace, ruční ukončení
5) **Financování & provize**
   - potvrzení financování (developer input + admin override)
   - faktury, úhrady, výplaty
6) **Pool**
   - uzávěrka období, vyplacení, export
7) **Audit log**
   - filtry + detail změn

## Komponenty
- `AdminQueueTable`
- `ApprovalCard`
- `AdminOverrideModal` (povinný důvod + potvrzení)
- `AuditLogTable` + `AuditLogDetailDrawer`
- `ChangeRequestPanel`
- `RoleBadge`

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
- Filtry: typ entity (tiket/rezervace/provize/pool/użytkownik), datum od–do, admin uživatel, důvod
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

Poznámky pro Figmu: — *(vynecháno dle zadání)*

ASCII wireframe:
[Header: Audit log]
-------------------------------------------------
[Filters row]
[Table: Time | Action | Entity | Actor | Change]
-------------------------------------------------

---

# EPIC 21 — Globální UI patterns: navigace, stavy, jazyk, přístupnost

## 21.1 Navigace (role-based)
- Broker: Tikety, Rezervace, Investoři, Provize, Pool, Profil
- Developer: Tikety (moje), Rezervace (na mých tiketech), Financování/Provize, Profil
- Admin: Dashboard, Uživatelé, Tikety, Rezervace, Financování/Provize, Pool, Audit log

## 21.2 Systémové stavy (design + copy)
### Loading
- Skeletony: karty, tabulky, detail
### Empty
- Dvě úrovně: „nemáš data“ vs „filtry nic nenašly“
### Error
- Inline + page-level; vždy CTA „Zkusit znovu“
### Permission denied
- „K této části nemáte přístup.“ (kontakt admin)
### Maskování / odemknutí
- Konzistentní pattern: blurred/masked labels + info tooltip
- Po odemknutí: zvýraznit změnu (jemný highlight) + audit info

## 21.3 Lokalizace a formátování
- Měna pouze CZK; částky formát `12 500 000 Kč` (mezera jako oddělovač tisíců).【207:4†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L34-L37】
- Datum formát: `31. 1. 2026` + čas `14:30` (24h).

## 21.4 Terminologie (brand-safe)
- Nepoužívat „přímá půjčka“, používat „Zápůjčka / úvěr“.【207:11†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L22-L24】
- Matching vždy s disclaimery (ne poradenství).【203:1†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L5-L8】

## 21.5 Přístupnost (minimální standard)
- Kontrast textů a badge.
- Keyboard focus pro všechny interaktivní prvky.
- Tabulky: sticky header, správné pořadí tab index.

## Akceptační kritéria UI části (po EPIC 21)
- Všechny klíčové entity mají konzistentní zobrazení stavů (ticket/reservation/invoice/pool).
- Marketplace zobrazuje: **expiraci**, **LTV (pokud je)**, **zajištění**, **matching count**.
- Rezervace mají jednotný timeline komponent s „kdo je na tahu“.
- Admin má audit log a override modaly s důvodem.
- CZK-only a terminologie jsou konzistentní napříč appkou.

---

## Kolik EPICů zbývá?
- UI backlog pro MVP jsme plánovali do **EPIC 21**.  
- Tímto doplněním EPIC 15–21 je UI část **funkčně uzavřená** (další EPICy by už byly „nice‑to‑have“ nebo rozšíření mimo MVP — např. marketing site UI kit, dark mode, pokročilá vizualizace risk skóre).
