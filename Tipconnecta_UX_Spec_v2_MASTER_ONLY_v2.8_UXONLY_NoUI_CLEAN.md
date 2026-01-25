# Tipconnecta — UX Spec (CLEAN, CANONICAL, UX-only, No UI Kit)

**Verze:** 2.8.0  
**Datum:** 2026-01-24  
**Stav:** CANONICAL (nahrazuje duplicitní/zdrojové sekce v předchozím master dokumentu)

---

## Jak s tím pracovat ve Figmě (Gemini 3 Pro)

Cíl: aby AI ve Figmě nevymýšlela nové varianty a držela se jednotných pravidel.

1) **Když si něco odporuje napříč soubory, platí tato priorita:**
   1. Tento soubor (UX Spec) — chování obrazovek, UX copy, interakce
   2. `Tipconnecta_Souhrn_Dat_DATA_FINAL_CLEAN` — datové pole, enumerace, business pravidla
   3. `Tipconnecta_Sitemap_*` — navigace, IA, názvosloví sekcí
   4. Brand manual — barvy, typografie, tone (vizuál)
   5. Persona / Marketing deck — kontext, nikoli rozhodnutí o UI

2) **AI nesmí měnit jiné stránky, než které jsou explicitně v promptu.**  
3) **AI nesmí přidávat nové funkce.** Pouze implementovat to, co je v tomto dokumentu a v datovém souhrnu.  
4) V UI používej **české texty** uvedené níže (nepřekládávej je).

---

## Terminologie (sjednoceno)

- **Tiket**: investiční příležitost (zobrazená brokerovi v sekci „Tikety“).
- **Projekt**: reálný development/projekt, pod který tiket spadá.
- **Rezervace**: proces, kterým broker „přiřadí“ investora k tiketu a odešle mu podpisový balík.
- **Podpisový balík**: sada dokumentů k podpisu (Souhlas se sdílením údajů, NDA, Rezervační smlouva).
- **Maskování / uzamčení**: část citlivých informací (zejm. dokumenty, galerie, identita developera) je skryta do podpisu Souhlasu se sdílením údajů investorem.

> Pozn.: V UI už nepoužíváme label „Marketplace“. V interní komunikaci je „Tikety“ = marketplace.

---

## Role (zkráceně)

- **Broker (Partner)**: prohlíží tikety, vybírá investora, zakládá rezervace, sleduje provize.
- **Developer**: spravuje své projekty/tikety, podepisuje, sleduje rezervace.
- **Admin**: konfigurace, uživatelé, limity, šablony dokumentů, audit.

---

## Globální UX pravidla

### Formátování
- **Měna:** mezery jako tisícové oddělovače, „Kč“ (např. `25 000 000 Kč`)
- **Procenta:** 1 desetinné místo (např. `9.5 % p.a.`)
- **Datum:** `d. m. yyyy` (např. `24. 2. 2026`)
- **Relativní čas k expiraci:** `za X dní` (pokud X ≥ 0), při prošlé expiraci `- X dní`

### Stavy a badge (základ)
- **ZAMČENO / ČÁSTEČNĚ UZAMČENO:** tiket má omezený přístup k citlivým datům do podpisu Souhlasu (a typicky i NDA) investorem.
- **POSLEDNÍ MÍSTA:** kapacita téměř naplněná (hranice dle datového souhrnu).
- **NAPLNĚNO:** kapacita plná.
- **VOLNÁ KAPACITA:** standardní stav, kapacita volná.

---

# BROKER — TIKETY & REZERVACE (DETAILNÍ SPEC)

## [BRK-200] Tikety — Seznam (hlavní stránka)

**Účel:** Broker rychle najde vhodný tiket, zkontroluje klíčové parametry a spustí rezervaci výběrem investora.

### Layout stránky
- Nadpis: **„Tikety“**
- Informační banner (INFO):
  - Text: **„Identita projektu se odemkne po podpisu Souhlasu se sdílením údajů. Do té doby jsou některé podklady zamčené.“**
- Toolbar:
  - Search input (placeholder): **„Hledat podle ID nebo názvu…“**
  - Sort dropdown (label): **„Řadit dle:“**
    - Default: **„Nejbližší expirace“**
    - Další volby (min): „Nejvyšší výnos“, „Nejvyšší objem“, „Nejvyšší odměna brokera“
  - Tlačítko: **„Filtry“** (otevírá panel / dropdown filtrů)

### Karta tiketu (opakující se prvek)
Karta je horizontální, se 3 zónami: **Náhled / Informace / Akce**.

#### 1) Náhled (vlevo)
- Pokud je tiket „uzamčený“:
  - zobraz placeholder (šedý blok) + ikona zámku + label **„ZAMČENO“**
- Pokud není uzamčený:
  - zobraz **cover image** projektu
  - **Volitelné (nově):** ikonka „galerie“ + počet fotek (např. `+8`)  
  - Klik na náhled (nebo ikonku galerie) → otevře **Galerii (lightbox)** (viz [BRK-215])

#### 2) Informace (střed)
- Horní řádek badge:
  - `TicketCode` (např. `TIK-2024-001`)
  - Stavové badge dle stavu (ČÁSTEČNĚ UZAMČENO / POSLEDNÍ MÍSTA / NAPLNĚNO / VOLNÁ KAPACITA)
- Název: `ProjectName` (pokud je plně anonymizovaný režim zapnutý, lze použít `Tiket #{TicketCode}` — viz datový souhrn)
- Meta řádek:
  - ikona lokality + `Region/City`
  - ikona kalendáře + **„Expirace: {date}“** + relativní text v závorce (např. `(za 6 dní)`)

- KPI řádek (minimálně):
  - **Objem**: `ticket_volume`
  - **Výnos p.a.**: `yield_pa`
  - **Splatnost**: `term_months` (zobrazení `XX měsíců`)
  - **Kapacita**: progress bar + `reserved_tranches/total_tranches` (např. `2/3`)

#### 3) Akce (vpravo)
- Řádek „Zajištění“:
  - label **„Zajištění“** + hodnota (např. `1. v pořadí`)
- „Odměna brokera (bez DPH)“ + částka
- Primary CTA: **„Vybrat investora“**
  - klik → otevře modal **Zahájit rezervaci (1/2)** (viz [BRK-220]) a předvyplní tiket

### Filtry (minimální sada)
- Stav tiketu: Aktivní / Uzavřeno / Naplněno
- Uzamčení: Uzamčené / Odemčené
- Lokalita (kraj)
- Typ zajištění
- Rozmezí výnosu
- Rozmezí objemu

---

## [BRK-210] Tiket — Detail

**Účel:** Broker vidí detailní parametry tiketu + může (a) otevřít galerii, (b) stáhnout podklady, (c) zobrazit matching investorů, (d) spustit rezervaci.

### Struktura stránky
- Breadcrumb: **„Tikety / Tiket #{TicketCode}“**
- Hlavní obsah je ve 2 sloupcích:
  - Levý sloupec: obsah (galerie, sekce)
  - Pravý sloupec: sticky „souhrn“ karty + proces + matching

### 1) Galerie (hero blok nahoře)
- Grid:
  - vlevo 1 velký obrázek (cover)
  - vpravo 2 menší náhledy (další fotky)
- Overlay CTA na velkém obrázku: **„Zobrazit galerii“**
- Klik → otevře **Galerii (lightbox)** (viz [BRK-215])
- Pokud je tiket uzamčený:
  - místo fotek použij placeholdery
  - CTA „Zobrazit galerii“ je disabled + tooltip: „Dostupné po podpisu Souhlasu se sdílením údajů.“

### 2) Sekce „Projekt“
- Karta s popisem projektu (teaser text).
- Pod kartou 2 mini KPI:
  - **Min. investice** (resp. min. rezervace dle datového modelu)
  - **Lokalita**

### 3) Sekce „Parametry tiketu“
- Tabulka 2 sloupce:
  - Typ investice
  - Minimální výše rezervace
  - Celkový objem
  - Výnos
  - Splatnost
  - Úrokové období

### 4) Sekce „Zajištění“
- Karta s pořadím zajištění + popis zástavy (text)
- Samostatná karta „LTV“ jako donut/gauge s hodnotou v %

### 5) Sekce „Využití prostředků“
- Text + INFO box:
  - „Uvedené využití prostředků je plánované a může se v průběhu realizace projektu měnit…“

### 6) Sekce „Podklady“
- Nadpis: **„Podklady“**
- Vpravo nahoře štítek: **„Ready Score: {A/B/C}“**
- Seznam souborů:
  - Název dokumentu
  - Velikost + typ (PDF/DOC)
  - Ikona „download“
- Pokud je dokument privátní a tiket uzamčený:
  - řádek disabled + ikona zámku + badge „Privátní“
- Poznámka pod seznamem:
  - „Platforma podklady neověřuje. Slouží jako evidence pro audit a komunikaci.“

### 7) Sekce „Doporučení investorů“
- Textový úvod (1–2 věty) + seznam doporučených investorů
- Každý řádek:
  - avatar + jméno / firma + krátký důvod (např. „Dlouhodobý zájem o Praha“)
  - sekundární CTA **„Nabídnout“** (otevře [BRK-220] s předvybraným investorem)

### Pravý sloupec (sticky karty)

#### A) Karta „Zbývá k profinancování“
- Nadpis: **„ZBÝVÁ K PROFINANCOVÁNÍ“**
- Velká částka: `remaining_to_fund`
- Progress: **„Naplňenost kapacity“** + %  
- Doplňky:
  - `reserved_tranches/total_tranches` (např. `2/3 tranší obsazeno`)
  - `queue_count` (např. `12 ve frontě`)
- Řádky:
  - „Odměna brokera“ + částka
  - „Expirace tiketu“ + datum
- Primary CTA: **„Vybrat investora“** → [BRK-220]
- Microcopy pod CTA: **„48h na podpis balíku dokumentů.“**

#### B) Karta „Průběh procesu“
- Timeline (minimální):
  1. Rezervace — „Okamžitě“
  2. Podpis smlouvy — „Do 48 hodin“
  3. Převod prostředků — „Do 5 dnů“

#### C) Karta „Shody s investory“
- Souhrn: **Vysoká / Střední / Nízká** (počty)
- Top 3 investoři (jméno + krátký důvod)
- CTA: **„Zobrazit matching“** → otevře [BRK-240]

---

## [BRK-215] Galerie — Lightbox (komponenta)

- Otevření z:
  - náhledu na kartě tiketu ([BRK-200])
  - hero galerie na detailu ([BRK-210])
- Obsah:
  - velký obrázek + šipky (další/předchozí)
  - strip thumbnails
  - (volitelné) popisek fotky
- Zavření:
  - X, ESC, klik mimo
- Uzamčený tiket:
  - galerie se neotevře; místo toho tooltip/informace „Dostupné po podpisu Souhlasu…“

---

## [BRK-220] Zahájit rezervaci — Modal (1/2)

**Nadpis:** „Zahájit rezervaci (1/2)“  
**Podnadpis:** „Vyberte investora pro tento tiket.“

### Obsah
- Shrnutí vybraného tiketu (náhled + název + `#{TicketCode}` + objem + výnos)
- Sekce **„Investoři“**
  - Dropdown/select s placeholderem: „Vyberte investora ze seznamu…“
  - CTA link: **„+ Přidat nového investora“**
  - Info text: „Investor není uživatel platformy – přijde mu e-mail s podpisem.“
- Sekce **„Poznámka pro investora (volitelné)“** (textarea, placeholder: „Dobrý den, posílám k podpisu…“)

### Akce
- Secondary: „Zrušit“
- Primary: „Pokračovat“ → otevře [BRK-230]

---

## [BRK-230] Potvrzení rezervace — Modal (2/2)

**Nadpis:** „Potvrzení rezervace (2/2)“  
**Podnadpis:** „Zkontrolujte údaje před odesláním k podpisu.“

### Obsah
- Blok: **„Co investor podepíše (1 balík)“**
  - Souhlas se sdílením údajů
  - NDA (Dohoda o mlčenlivosti)
  - Rezervační smlouva
- Výstražný box (warning):
  - Nadpis: „48 hodin na celý balík dokumentů“
  - Text: „Pokud nedojde k podpisu v tomto limitu, rezervace bude automaticky zrušena.“
- Rekapitulace investora:
  - „Investor:“ + jméno
  - „Email:“ + email
- Povinný checkbox:
  - **„Potvrzuji, že mám souhlas klienta k provedení závazné rezervace kapacity.“**
  - podpůrný text: „Zároveň beru na vědomí 48h lhůtu pro podpis.“
- CTA:
  - Secondary: „Zpět“
  - Primary: **„Potvrdit rezervaci“**
    - po potvrzení: toast „Rezervace odeslána k podpisu“ + zavřít modal

---

## [BRK-240] Matching investorů — Modal / Drawer

**Účel:** Broker vidí seznam investorů se skóre shody pro daný tiket.

### Otevření
- Z detailu tiketu: CTA „Zobrazit matching“ (karta „Shody s investory“)

### Obsah
- Nadpis: „Shody s investory“
- Subhead: „Tiket #{TicketCode} · {Objem} · {Lokalita}“
- Search input: „Hledat investora…“
- Toggle: „Zahrnout nové a neaktivní investory“
- Filter dropdown: „Všechny shody / Vysoká / Střední / Nízká / Mimo kritéria“
- Seznam položek:
  - avatar + jméno
  - badge shody (Vysoká/Střední/Nízká/Mimo kritéria)
  - chips s důvody (např. „Částka v rozsahu“, „Region odpovídá“, „LTV 60% ≤ limit 65%“)
  - CTA: „Vybrat“ (předvybere investora a otevře [BRK-220])

---

# DEVELOPER / ADMIN (high-level, bez detailu)

> Tyto části jsou úmyslně zkrácené, aby AI ve Figmě nemíchala varianty. Detailní rozpracování doplníme až při implementaci konkrétních obrazovek.

## Developer
- Projekty → vytváření a správa projektů, nahrávání podkladů, správa tiketů.
- Rezervace → přehled rezervací, podpisy, stavy, komunikace s brokerem.

## Admin
- Nastavení systému → šablony dokumentů, SLA lhůty, role/permission, audit.
- Uživatelé → správa brokerů/developerů/investorů, deaktivace.

---

## Changelog (2.8.0 vs 2.7)
- Odstraněny duplicitní sekce `[BRK-200/210/220/230]` a sjednoceny jako CANONICAL.
- Sjednoceno názvosloví: v UI pouze „Tikety“ (ne „Marketplace“).
- Doplněna **galerie** pro kartu tiketu + detail tiketu + lightbox komponenta.
- Sjednocena logika podpisu: **1 balík dokumentů** + **48h** limit v UI.
