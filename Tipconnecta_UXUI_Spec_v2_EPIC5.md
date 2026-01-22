# Tipconnecta — UX/UI Spec (v2) — EPIC 5
## EPIC 5 — Finance & vypořádání provizí + Pool program + Exporty & Audit
> **Kontext (fixní pravidla):**
> - Platforma je B2B a **Investor nemá přístup do aplikace** (všechny podpisy/komunikace probíhají e‑mailem/eSign).
> - Pro brokera je klíčové: **provize v Kč**, jasné lhůty a auditní stopa (pocit „private banking calm“).
---
## 5.1 Cíl EPICu (proč existuje)
**Uživatel (Developer / Broker)** potřebuje vidět „co je hotovo, kdo je na tahu, kdy a kolik dostanu/zaplatím“, včetně podkladů pro fakturaci a predikce termínů.
**Byznys** potřebuje:
- snížit spory a ruční dohadování (důkaz introdukce + audit),
- zrychlit inkaso developer → platforma (SLA, připomínky),
- zrychlit payout platforma → broker (SLA, připravené podklady),
- vytvořit operativní reporting (exporty .xlsx) místo složité analytiky.
---
## 5.2 Rozsah MVP (co má být hotové)
### Must-have (MVP)
1) **Provizní případ** vzniká po profinancování (potvrzeno developerem) a je dohledatelný v UI pro všechny zúčastněné.
2) **Developer** vidí fakturu platformy, splatnost a stav úhrady (čeká/uhrazeno/po splatnosti).
3) **Admin** spravuje: vystavení faktury platformy, ruční potvrzení přijetí platby, a následně zpřístupnění podkladů k fakturaci brokerům.
4) **Broker** vidí „podklady k fakturaci“ a může nahrát svou fakturu (číslo, datumy, částky, PDF) + sledovat výplatu.
5) **Pool program** je aktivní v UI: broker vidí stav, admin umí uzavírat období a exportovat anonymizované výsledky.
6) **Exporty (.xlsx)**: Profinancované tikety, Provize a vypořádání, Pool, Audit log.
### Nice-to-have (po MVP)
- Developer „Nahlásit uhrazeno“ (předsignal adminovi) + upload potvrzení
- Automatické párování plateb (bank feed)
- Automatická tvorba faktur brokerů (pokud OSVČ / šablona)
---
## 5.3 Klíčové entity (datový model – UX pohled)
### 5.3.1 PROVIZNI_PRIPAD (1 = 1 profinancovaný tiket)
Minimální pole (z pohledu UI/UX):
- `provizni_pripad_id`
- `tiket_id`, `projekt_id`, `rezervace_id`
- `developer_org_id`
- `broker_1_user_id`, `broker_2_user_id?`
- `datum_prijeti_financi_developer` (finální datum)
- `castka_profinancovana_final` (CZK)
- `provize_pct` (dle smlouvy)
- `provize_zaklad_bez_dph`
- `rezim_dph` + `dph_castka` + `celkem_k_uhrade_developer`
- `faktura_platformy_cislo`, `faktura_platformy_pdf`, `datum_vystaveni`, `datum_splatnosti` (default 14 dnů od přijetí financí; upravitelné admin)
- `stav_uhrady_platforme` (čeká/uhrazeno/po splatnosti)
- `datum_prijeti_platby_platforma` (zadává admin ručně)
- `broker_1_invoice_*`, `broker_2_invoice_*` + `broker_1_payout_date`, `broker_2_payout_date` (admin)
### 5.3.2 POOL_OBDOBI & POOL_PRISPEVEK
- Parametry období: meta_100m, meta_200m, procento_do_poolu, limit_kvalifikovanych, uzaverka_datum, stav (otevřené/uzavřené/vyplacené).
- Pravidla anonymizace: obchodníci se v „vyhlášení“ zobrazují jako A/B/C.
---
## 5.4 Business pravidla (MVP – hard rules)
### 5.4.1 Vznik nároku a splatnosti
- Nárok na provizi vzniká po **profinancování** (potvrzeno developerem).
- Splatnost faktury platformy: **14 dní od data přijetí financí na účet developera**, admin může upravit.
- Výplata brokerům: v kanonické logice se používá SLA „do 3 dnů od obdržení faktury obchodníka“ (ručně potvrzené adminem).
### 5.4.2 Provize a split (produktové nastavení pro MVP)
- **Celková provize: 5 %** z finální profinancované částky (komunikace v UI bez DPH – částky uvádíme primárně „bez DPH“).
- Split:
  - Platforma: **50 %** z provize
  - Broker 1: **25 %**
  - Broker 2: **25 %**
- Pokud není Broker 2, Broker 1 dostane i jeho podíl (tj. Broker 1 = 50 %). *(viz Předpoklady)*
### 5.4.3 Pool program – zásadní pravidla
- Parametry: meta 100 mil (kvalifikace), meta 200 mil (winner takes all), limit kvalifikovaných = 3 (první tři).
- Obrat se počítá z profinancovaných tiketů, kde je obchodník Broker 1 nebo Broker 2; pokud je stejný člověk v obou rolích, počítá se jen jednou.
- Zařazení do období: dle data profinancování; pozdní potvrzení platby lze připsat do období do uzávěrky (default konec pololetí + 14 dní).
- Rozdělení:
  - pokud někdo dosáhne 200 mil jako první → **100 % Poolu** (winner takes all)
  - jinak: 1 kvalifikovaný → 100 %, 2–3 kvalifikovaní → poměrně dle obratu
  - pokud se nekvalifikuje nikdo → 50 % platforma, 50 % rollover (default)
---
## 5.5 Hlavní user flows (happy path)
### Flow A — Developer zaplatí provizi platformě (standard)
1. Developer potvrdí profinancování (částka + datum + proof).
2. Admin vystaví a nahraje fakturu platformy (PDF), nastaví splatnost (default +14 dní).
3. Developer vidí v aplikaci stav „Čeká na úhradu“, stáhne fakturu, uhradí.
4. Admin ručně potvrdí přijetí platby → stav „Uhrazena platformě“.
### Flow B — Broker vystaví fakturu platformě a dostane výplatu
1. Po potvrzení platby (developer→platforma) se brokerovi zpřístupní „Podklady k fakturaci“.
2. Broker nahrává fakturu (číslo, datum vystavení/splatnosti, částky, PDF).
3. Admin označí fakturu jako přijatou.
4. Admin potvrdí odeslání platby brokerovi → broker vidí „Vyplaceno“ + datum (volitelně reference platby).
### Flow C — Pool period (pololetí)
1. Příspěvky do Poolu vznikají z provizních případů v období (podle nastavení).
2. Broker sleduje obrat + kvalifikaci (bez identit ostatních).
3. Admin uzavře období a vyhodnotí výplatu; brokerům se zobrazí anonymní „vyhlášení“.
---
# 5.6 Obrazovky (UI + copy + logika)
## [DEV-500] Fakturace (Developer) — Přehled provizí k úhradě
Cíl uživatele:
- Najít faktury k úhradě, vidět splatnost, stáhnout PDF a mít jistotu, že je vše dohledatelné.
Cíl byznysu:
- Zrychlit inkaso a snížit počet dotazů „kolik a kam poslat“.
Primární CTA / sekundární CTA:
- Primární: **Stáhnout fakturu (PDF)**
- Sekundární: Zobrazit detail / Kontaktovat podporu
KPI:
- % faktur uhrazených před splatností
- DSO (průměr dní do úhrady)
- # stažení faktury / faktura
Obsah (texty 1:1):
- H1: **Fakturace**
- Subtext: „Zde najdete provize k úhradě za profinancované tikety. Splatnost se počítá od data přijetí financí na váš účet.“
- Tab empty: „Zatím nemáte žádné provize k úhradě.“
- Helper: „Částky zobrazujeme primárně **bez DPH**. Detail DPH je vždy uveden ve faktuře.“
Komponenty:
- Page header + tab navigation (např. Tikety / Rezervace / Fakturace / Profil)
- Summary cards: „Čeká na úhradu“, „Po splatnosti“, „Uhrazena“
- Table: faktury
- Row actions: download / detail
Layout:
- Header (nav)
- Body: summary cards (3)
- Body: table
Stavy:
- loading: skeleton table
- empty: empty state
- error: „Nepodařilo se načíst faktury. Zkuste to znovu.“
Validace a pravidla:
- Status „Po splatnosti“ se počítá podle `datum_splatnosti` vs dnešní datum.
- U faktury musí být dostupné PDF; pokud chybí, zobrazit „Čeká na vystavení (admin)“.
Analytické eventy:
- `dev_billing_list_viewed` {developer_org_id}
- `dev_invoice_pdf_downloaded` {invoice_id, tiket_id, amount_net}
- `dev_invoice_detail_opened` {invoice_id}
ASCII wireframe:
[Header: Logo | Tikety | Rezervace | Fakturace | Profil]
--------------------------------------------------------
[H1 Fakturace]
[Subtext ...]
[Cards: Čeká na úhradu | Po splatnosti | Uhrazena]
--------------------------------------------------------
[Table]
| Faktura | Tiket | Profinancováno | Provize (bez DPH) | Splatnost | Stav | Akce |
| ... |
--------------------------------------------------------
---
## [DEV-510] Fakturace — Detail faktury (Developer)
Cíl uživatele:
- Pochopit „za co platím“, kdy je splatnost, mít jasné instrukce.
Cíl byznysu:
- Minimalizovat „kde najdu VS / IBAN“ dotazy.
Primární CTA / sekundární CTA:
- Primární: **Stáhnout fakturu (PDF)**
- Sekundární: Kopírovat variabilní symbol / Kontaktovat podporu
KPI:
- download rate
- support rate per invoice
Obsah (texty 1:1):
- H1: „Faktura {číslo faktury}“
- Badge stavu: „Čeká na úhradu“ / „Po splatnosti“ / „Uhrazena“
- Sekce „Shrnutí“:
  - „Tiket: {tiket_id}“
  - „Profinancováno: {datum}“
  - „Profinancovaná částka: {CZK}“
  - „Provize platformy (bez DPH): {CZK}“
  - „Splatnost: {datum}“
- Sekce „Platba“:
  - „Platební údaje najdete ve faktuře. Pro rychlé párování použijte variabilní symbol.“
  - Pole: VS (read-only + copy)
- Sekce „Dokument“: náhled/odkaz na PDF
Komponenty:
- Detail header (back)
- Status badge
- Key-value list
- Copy-to-clipboard
- PDF preview link
Layout:
- Header (back + title + status)
- 2-column: left summary, right actions + PDF
Stavy:
- error: „Faktura není dostupná. Kontaktujte administrátora.“
- edge: PDF missing → ukázat „Čeká na vystavení faktury adminem.“
Validace a pravidla:
- VS musí být přítomné pro fakturované případy (jinak fallback: číslo faktury).
Analytické eventy:
- `dev_invoice_detail_viewed` {invoice_id}
- `dev_invoice_vs_copied` {invoice_id}
ASCII wireframe:
[Header: ← Zpět]   [Faktura 2026-001]   [Badge: Čeká na úhradu]
--------------------------------------------------------------
[Left]
- Tiket ...
- Profinancováno ...
- Provize (bez DPH) ...
- Splatnost ...
[Right]
[Button: Stáhnout PDF]
[VS: 2026001] [Copy]
[Link: Kontaktovat podporu]
--------------------------------------------------------------
---
## [BRK-500] Provize (Broker) — Přehled + LTV
Cíl uživatele:
- Vidět, kdy vznikne nárok, kolik je „na cestě“ a co je potřeba udělat (vystavit fakturu).
Cíl byznysu:
- Zvýšit retenci brokerů díky transparentnímu „payout“ a auditovatelnosti (bariéra obcházení).
Primární CTA / sekundární CTA:
- Primární: **Zobrazit podklady k fakturaci**
- Sekundární: Nahrát fakturu / Filtry
KPI:
- Time-to-invoice (od zpřístupnění podkladů do nahrání faktury)
- % faktur nahraných do deadline
- Broker LTV (vyplaceno celkem)
Obsah (texty 1:1):
- H1: **Provize**
- Subtext: „Provize vzniká až po profinancování. Podklady k fakturaci zpřístupníme po úhradě provize developerem.“
- Staty (top):
  - „Čeká na úhradu platformě: {CZK}“
  - „K fakturaci: {CZK}“
  - „Vyplaceno celkem: {CZK}“
- Empty: „Zatím nemáte žádné provize. Jakmile bude některý tiket profinancován, uvidíte ho zde.“
- Tooltip (deadline): „Deadline pro vystavení faktury nastavuje administrátor.“
Komponenty:
- Summary stats cards
- Filter bar
- Table/list
- Status pills
Layout:
- Header
- Stats row
- Table
Stavy:
- loading / empty / error
- edge: „K fakturaci“, ale chybí částky → „Chybí výpočet provize, kontaktujte admin.“
Validace a pravidla:
- Částky zobrazovat primárně bez DPH (DPH řeší broker na své faktuře dle svého režimu).
Analytické eventy:
- `brk_commission_list_viewed` {broker_user_id}
- `brk_commission_row_opened` {provizni_pripad_id, status}
ASCII wireframe:
[Header: Logo | Marketplace | Rezervace | Provize | Pool | Profil]
-----------------------------------------------------------------
[H1 Provize]
[Subtext ...]
[Cards: Čeká na úhradu | K fakturaci | Vyplaceno celkem]
-----------------------------------------------------------------
[Filters: období | stav | projekt | developer]
[Table]
| Tiket | Profinancováno | Vaše provize (bez DPH) | Stav | Akce |
-----------------------------------------------------------------
---
## [BRK-510] Podklady k fakturaci (Broker) — Detail + nahrání faktury
Cíl uživatele:
- Rychle a bez chyb vystavit fakturu a nahrát ji.
Cíl byznysu:
- Minimalizovat chyby v dokladech a zrychlit payout.
Primární CTA / sekundární CTA:
- Primární: **Nahrát fakturu**
- Sekundární: Stáhnout podklady (PDF/CSV) / Kontaktovat podporu
KPI:
- invoice_upload_rate
- admin_rejection_rate (nesoulad částek)
Obsah (texty 1:1):
- H1: „Provize – podklady k fakturaci“
- Badge: „K fakturaci“ / „Faktura nahrána“ / „Vyplaceno“
- Sekce „Podklady“:
  - „Tiket: {tiket_id}“
  - „Developer: {developer_name}“
  - „Profinancováno: {datum}“
  - „Profinancovaná částka: {CZK}“
  - „Vaše provize (bez DPH): {CZK}“
  - „Podklady zpřístupněny: {datum}“
  - „Deadline pro vystavení faktury: {datum / —}“
- Sekce „Jak vystavit fakturu“:
  - „Fakturujete platformě Tipconnecta.“
  - „Doporučené položky na faktuře: “
    - „Provize za zprostředkování financování – Tiket {tiket_id}“
  - „Částka (bez DPH): {CZK}“
  - „Variabilní symbol: {VS}“
- Form „Nahrání faktury“:
  - Číslo faktury (required)
  - Datum vystavení (required)
  - Datum splatnosti (required)
  - Jste plátce DPH? (toggle, prefill z profilu)
  - DPH % (pokud plátce; default 21)
  - Částka bez DPH (prefill, editable)
  - DPH (auto)
  - Celkem (auto)
  - Upload PDF (required)
Komponenty:
- Key-value summary
- Instruction callout
- Form inputs + file upload
- Success toast
Layout:
- Left: podklady + instrukce
- Right: formulář upload
Stavy:
- success: „Faktura nahrána. Jakmile ji přijmeme a odešleme platbu, uvidíte to zde.“
- error upload: „Nepodařilo se nahrát soubor.“
- validation: viz níže
Validace a pravidla:
- PDF je povinné.
- Datum splatnosti ≥ datum vystavení.
- Částka bez DPH musí odpovídat vypočtené částce (tolerance ± 1 Kč) – pokud mimo, označit jako „Vyžaduje kontrolu adminem“.
- Po nahrání faktury je možné ji nahradit jen do doby, než admin označí jako přijatou (pak už jen přes admin).
Analytické eventy:
- `brk_invoice_upload_started` {provizni_pripad_id}
- `brk_invoice_uploaded` {provizni_pripad_id, invoice_amount_net, vat_payer}
- `brk_invoice_upload_failed` {provizni_pripad_id, error_code}
ASCII wireframe:
[Header: ← Zpět] [Provize – podklady k fakturaci] [Badge]
----------------------------------------------------------
[Left]
[Podklady: tiket, developer, datum, částka, provize]
[Callout: Jak vystavit fakturu + VS + položka]
[Right]
[Form: číslo, datumy, DPH toggle, částky, upload PDF]
[Button: Nahrát fakturu]
----------------------------------------------------------
---
## [BRK-520] Pool program (Broker)
Cíl uživatele:
- Vidět, jak si vede v bonusovém programu (motivace + retence).
Cíl byznysu:
- Zvýšit opakované používání a GMV díky gamifikaci (ale „private banking“ styl, bez hype).
Primární CTA / sekundární CTA:
- Primární: (žádná akce) / případně „Zobrazit pravidla“
- Sekundární: Zobrazit historii
KPI:
- % aktivních brokerů, kteří otevřou Pool screen
- % brokerů, kteří zvýší aktivitu po dosažení 50 % mety
Obsah (texty 1:1):
- H1: **Pool program**
- Subtext: „Bonusový program vyhodnocujeme po pololetích. Ostatní obchodníky v aplikaci neidentifikujeme.“
- Sekce „Aktuální období“:
  - „Období: {1. 1. – 30. 6. 2026}“
  - „Váš obrat: {CZK}“
  - „Kvalifikace (100 mil.): {Ano/Ne}“
  - „Winner takes all (200 mil.): {Ano/Ne}“
  - „Stav: Otevřené / Uzavřené / Vyplacené“
- Sekce „Jak se obrat počítá“:
  - „Obrat se počítá z profinancovaných tiketů, kde jste Broker 1 nebo Broker 2 (pokud jste v obou rolích, počítá se jen jednou).“
  - „Zařazení do období se řídí datem profinancování; pozdní potvrzení lze připsat do období do uzávěrky.“
- Sekce „Pořadí (anonymně)“ – pouze pokud jste kvalifikovaný nebo po uzávěrce:
  - „Obchodník A: {obrat} | podíl | částka“
  - „Obchodník B: …“
  - „Obchodník C: …“
- Sekce „Historie“: minulá období, anonymní vyhlášení
Komponenty:
- Progress bar k metě 100M a 200M
- Info cards
- Anonym leaderboard (A/B/C)
- Accordion pro pravidla
Layout:
- Header
- 2 columns: left progress + stats, right rules + anonym leaderboard
Stavy:
- pool disabled: „Pool program není v této fázi aktivní.“
- not qualified: leaderboard skrytý, jen vlastní progres
Validace a pravidla:
- Nikdy nezobrazit identity jiných brokerů (kromě admina).
Analytické eventy:
- `brk_pool_viewed` {broker_user_id, pool_period_id}
- `brk_pool_rules_opened` {pool_period_id}
ASCII wireframe:
[Header: ... | Pool]
------------------------------
[H1 Pool program]
[Subtext ...]
[Left]
[Progress 100M]
[Progress 200M]
[Cards: Váš obrat | Kvalifikace | Stav]
[Right]
[Accordion: Jak se počítá obrat]
[Anonym leaderboard A/B/C (conditional)]
------------------------------
---
## [ADM-500] Finance (Admin) — Dashboard provizí
Cíl uživatele:
- Mít jeden „pipeline“ pohled na provizní případy + co je potřeba udělat.
Cíl byznysu:
- Operativní řízení inkasa a payout.
Primární CTA / sekundární CTA:
- Primární: Otevřít detail provize
- Sekundární: Export / Filtry
KPI:
- # případů po splatnosti
- průměrný čas od profinancování do úhrady platformě
- průměrný čas od přijetí faktury brokera do payout
Obsah (texty 1:1):
- H1: **Finance**
- Cards (počty): „Čeká na vystavení faktury“, „Čeká na úhradu“, „Po splatnosti“, „K fakturaci brokerům“, „Čeká na výplatu“
- Filtry: datum profinancování, splatnost, stav, developer, broker, pool období
- Tab empty: „Nenalezeny žádné provizní případy pro zvolené filtry.“
Komponenty:
- Summary cards
- Filter bar
- Table
- Quick actions
Layout:
- Header
- Cards row
- Filters
- Table
Stavy:
- loading / empty / error
Validace a pravidla:
- Stavové labely musí odpovídat datům (invoice uploaded? payment confirmed? broker invoice received?).
Analytické eventy:
- `adm_finance_dashboard_viewed` {admin_user_id}
- `adm_finance_filter_used` {filters}
- `adm_provize_opened` {provizni_pripad_id}
ASCII wireframe:
[Header: Admin | Tikety | Rezervace | Finance | Pool | Exporty | Audit]
----------------------------------------------------------------------
[H1 Finance]
[Cards: čeká vystavit | čeká úhradu | po splatnosti | k fakturaci | k výplatě]
[Filters ...]
[Table: provizní případy + stavy + akce]
----------------------------------------------------------------------
---
## [ADM-510] Detail provizního případu (Admin)
Cíl uživatele:
- Kompletně odbavit 1 případ od profinancování až po payout brokerům + audit.
Cíl byznysu:
- Minimalizace sporů, rychlost a kontrola.
Primární CTA / sekundární CTA:
- Primární: **Uložit změny**
- Sekundární (kontextové): Nahrát fakturu platformy / Potvrdit přijetí platby / Označit fakturu brokera jako přijatou / Potvrdit výplatu
KPI:
- time_to_collect (funding→paid to platform)
- time_to_payout (broker invoice→payout)
- # ručních korekcí
Obsah (texty 1:1):
- H1: „Provize – Tiket {tiket_id}“
- Sekce „Financování (zdroj pravdy)“:
  - datum přijetí financí na účet developera (finální)
  - finální částka
  - podklady (ano/ne) + soubor / důvod
- Sekce „Výpočet provize“:
  - provize % (dle smlouvy)
  - základ bez DPH
  - rozpad: platforma / broker 1 / broker 2
  - příspěvek do Poolu (pokud se uplatňuje) + období
- Sekce „Faktura platformy (developer → platforma)“:
  - číslo faktury, VS, datum vystavení, splatnost (+14 dní default), PDF upload
  - stav úhrady + datum přijetí platby na účet platformy (ručně)
- Sekce „Doklady brokerů a výplaty“ (Broker 1 + Broker 2):
  - číslo faktury, datum vystavení, splatnost, datum přijetí, datum úhrady (admin)
- Sekce „Audit / historie“: seznam událostí
Komponenty:
- Tabs / accordion sections
- File upload
- Status chips
- Timeline/audit list
- Danger zone: „Označit jako spor“
Layout:
- Header (back)
- Left: finance + invoices
- Right: actions panel + audit
Stavy:
- validation errors (např. missing invoice pdf)
- edge: broker2 missing → skrýt jeho blok, ale rozpad musí dávat smysl
- dispute state: všechny akce disabled kromě poznámky/admin override
Validace a pravidla:
- Splatnost faktury platformy default = `datum_prijeti_financi_developer + 14 dnů` (upravitelné).
- Potvrzení přijetí platby platformou je „gate“ pro zpřístupnění podkladů brokerům.
- Každá ruční změna (částka/datum/splatnost) vyžaduje důvod (kód + volný text) a zapisuje se do audit logu.
Analytické eventy:
- `adm_provize_detail_viewed` {provizni_pripad_id}
- `adm_invoice_platform_uploaded` {provizni_pripad_id, invoice_no}
- `adm_payment_platform_confirmed` {provizni_pripad_id, received_date, amount}
- `adm_broker_invoice_marked_received` {provizni_pripad_id, broker_id}
- `adm_broker_payout_confirmed` {provizni_pripad_id, broker_id, payout_date}
ASCII wireframe:
[Header: ← Zpět] [Provize – Tiket T-123] [Status chips]
--------------------------------------------------------
[Left: Sections]
- Financování
- Výpočet provize
- Faktura platformy (upload + splatnost)
- Doklady brokerů + výplaty
[Right: Actions]
[Button: Uložit]
[Context buttons]
[Audit timeline]
--------------------------------------------------------
---
## [ADM-520] Pool program (Admin) — Přehled období
Cíl uživatele:
- Spravovat pololetní období, parametry a stav.
Cíl byznysu:
- Kontrolovatelnost, export a anonymizace.
Primární CTA / sekundární CTA:
- Primární: Otevřít období
- Sekundární: Vygenerovat export / Vygenerovat anonymní vyhlášení
KPI:
- počet období uzavřených včas
- počet kvalifikovaných
Obsah (texty 1:1):
- H1: **Pool program**
- Subtext: „Vyhodnocujeme pololetně. V aplikaci se ostatní obchodníci anonymizují.“
- Table: období, stav, meta, saldo poolu, # kvalifikovaných
Komponenty:
- Table + filter (stav, datum)
- Buttons export
Layout:
- Header
- Table
Stavy:
- empty (je-li první období)
Validace a pravidla:
- U exportů existuje i anonymní varianta (A/B/C).
Analytické eventy:
- `adm_pool_list_viewed` {admin_user_id}
- `adm_pool_export_generated` {pool_period_id, anonymized: bool}
ASCII wireframe:
[Header: ... | Pool]
---------------------------
[H1 Pool program]
[Table: období | stav | meta 100/200 | saldo | kvalifikovaní | akce]
---------------------------
---
## [ADM-530] Pool období — Detail + uzávěrka + výplaty (Admin)
Cíl uživatele:
- Uzavřít období, vidět top 3, připravit a potvrdit výplaty.
Cíl byznysu:
- Transparentní pravidla + účetní stopa.
Primární CTA / sekundární CTA:
- Primární: **Uzavřít období** (pokud otevřené) / **Označit jako vyplacené**
- Sekundární: Export / Anonymní vyhlášení
KPI:
- čas od konce období do uzávěrky
- počet manuálních zásahů
Obsah (texty 1:1):
- H1: „Pool období {1. 1. – 30. 6. 2026}“
- Stav badge: Otevřené / Uzavřené / Vyplacené
- Parametry: meta 100, meta 200, limit kvalifikovaných, procento do poolu, uzávěrka (datum)
- Sekce „Kvalifikovaní (interně)“:
  - seznam brokerů + obrat + čas dosažení mety (tie-break)
- Sekce „Anonymní vyhlášení“:
  - Obchodník A/B/C + obrat + podíl + částka
- Sekce „Výplaty“:
  - pro každého kvalifikovaného: částka, datum výplaty, reference platby (volitelně)
Komponenty:
- Summary block
- Tables (internal + anonym)
- Action buttons
Layout:
- Header
- 2-column: left detail, right actions
Stavy:
- none qualified: zobrazit pravidlo rollover 50/50 (platforma/rollover) + akce „Potvrdit rollover“.
Validace a pravidla:
- Uzávěrka uzamkne pořadí a výsledky (audit).
- Po vyplacení nelze měnit bez „admin override“ důvodu.
Analytické eventy:
- `adm_pool_period_viewed` {pool_period_id}
- `adm_pool_period_closed` {pool_period_id}
- `adm_pool_payout_confirmed` {pool_period_id, broker_id, amount}
ASCII wireframe:
[Header: ← Zpět] [Pool období ...] [Badge]
-------------------------------------------
[Left]
[Parametry období]
[Table: kvalifikovaní (interně)]
[Table: anonym vyhlášení A/B/C]
[Table: výplaty]
[Right]
[Button: Uzavřít období / Vyplacené]
[Button: Export]
-------------------------------------------
---
## [ADM-540] Exporty (Admin)
Cíl uživatele:
- Vygenerovat provozní exporty do Excelu podle definic.
Cíl byznysu:
- Provozní kontrola bez další analytiky (MVP).
Primární CTA / sekundární CTA:
- Primární: **Vygenerovat export**
- Sekundární: Stáhnout poslední export
KPI:
- # exportů týdně
- # auditovaných exportů (musí být 100 %)
Obsah (texty 1:1):
- H1: **Exporty**
- Karty exportů:
  1) „Profinancované tikety“
  2) „Provize a vypořádání“
  3) „Pool (období a výsledky)“
  4) „Auditní log“
- Pro každý export: popis + filtry + tlačítko „Vygenerovat .xlsx“
- Poznámka: „Každý export obsahuje metadata (čas generování, kdo generoval, filtry, počet řádků).“
Komponenty:
- Export cards
- Filter modal
- Toast „Export připraven“
Layout:
- Grid karet
Stavy:
- generating: spinner + disable button
- error: „Export se nepodařilo vygenerovat.“
Validace a pravidla:
- Exporty musí respektovat oprávnění (admin plná data; developer jen své; broker jen své).
Analytické eventy:
- `adm_export_started` {export_type, filters}
- `adm_export_completed` {export_type, row_count}
- `adm_export_failed` {export_type, error}
ASCII wireframe:
[Header: ... | Exporty]
------------------------
[H1 Exporty]
[Card: Profinancované tikety] [Filters] [Generate]
[Card: Provize a vypořádání]  [Filters] [Generate]
[Card: Pool]                  [Filters] [Generate]
[Card: Auditní log]           [Filters] [Generate]
------------------------
---
## [ADM-550] Audit log (Admin) — Přehled událostí
Cíl uživatele:
- Najít a doložit ruční zásahy, změny a incidenty.
Cíl byznysu:
- Ochrana proti sporům, compliance a dohledatelnost.
Primární CTA / sekundární CTA:
- Primární: Filtry
- Sekundární: Export
KPI:
- # audit záznamů (kompletnost)
- time_to_find incident (operativní)
Obsah (texty 1:1):
- H1: **Auditní log**
- Subtext: „Každý záznam je jedna auditní událost.“
- Tabulka (min. sloupce): datum/čas, oblast, událost, role aktéra, aktér, entita, entity_id, shrnutí změny, původní→nové, důvod, podklady ano/ne
- Filtry: datum od–do, oblast, událost, role aktéra, entita+id
Komponenty:
- Filter drawer
- Table
- Row expand (detail změny)
Layout:
- Header
- Filters
- Table
Stavy:
- empty: „Pro zvolené filtry nejsou žádné události.“
- error: „Audit log nelze načíst.“
Validace a pravidla:
- Audit log je read-only (nelze mazat ani editovat z UI).
Analytické eventy:
- `adm_audit_viewed` {admin_user_id}
- `adm_audit_filter_used` {filters}
- `adm_audit_row_opened` {audit_event_id}
ASCII wireframe:
[Header: ... | Audit]
----------------------
[H1 Auditní log]
[Filters drawer]
[Table: datum/čas | oblast | událost | aktér | entita | změna | ...]
----------------------
---
## 5.7 Akceptační kritéria (vývoj)
### Developer (Fakturace)
- Developer vidí všechny provizní případy svého developera + přístup ke stažení PDF faktury (pokud existuje).
- Stav „po splatnosti“ se přepíná automaticky dle data splatnosti.
### Broker (Provize + Pool)
- Broker vidí pouze své provizní případy (kde je broker1/broker2).
- Podklady k fakturaci se zobrazí až po admin potvrzení úhrady developer→platforma.
- Broker umí nahrát fakturu a vidí její stav + datum výplaty (po potvrzení adminem).
- V Pool obrazovce nikdy neuvidí identity ostatních brokerů; jen A/B/C.
### Admin (Finance/Pool/Export/Audit)
- Admin umí u provizního případu: nahrát fakturu platformy, změnit splatnost, potvrdit přijetí platby, spravovat broker faktury a payout.
- Exporty generují .xlsx s metadaty a respektují oprávnění.
- Audit log se generuje pro ruční zásahy a exporty.
---
## Nejasnosti (otázky na vás)
1) Má platforma být v MVP „plátce DPH“ (tj. faktury platforma→developer default s DPH), nebo to řešíme jako nastavení u developera a případů? *(v datech existuje režim DPH na faktuře; potřeba rozhodnout default pro UI.)*
## Předpoklady (doplňuji logicky)
1) Pokud není Broker 2, Broker 1 dostává i jeho podíl (tj. broker share = 50 % z celkové provize).
2) Deadline pro vystavení faktury brokerem je admin-konfigurovatelný; default nastavíme na **14 dní od zpřístupnění podkladů**.
3) Čísla účtů / platební údaje platformy i developerů jsou primárně součástí faktury (abychom neměli citlivé údaje v UI); v UI zobrazujeme jen VS a „stáhnout PDF“.
