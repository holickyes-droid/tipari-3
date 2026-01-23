# Tipconnecta — Low‑fi (Broker / Obchodník)
**Verze:** v2.0  
**Datum:** 2026-01-23  
**Scope:** Low‑fidelity návrhy (desktop) pro roli **Broker** – **všechny úrovně** (Dashboard + všechny podstránky ze sitemap).  
**Pozn.:** Záměrně bez vizuálního stylu — pouze rozložení bloků, hierarchie, navigace, primární CTA a klíčová data (**SLA, expirace tiketu, matching, LTV, kapacita**).

---

## 0) Mini IA legenda (co znamená typ stránky)
- **DASHBOARD** = přehled + to‑do + SLA + rychlé akce
- **LIST** = seznam entit (tabulka/karty) + filtry + bulk akce (kde dává smysl)
- **DETAIL** = detail entity + stav + akce + audit
- **FORM** = vytvoření / editace entity (validace, povinná pole)
- **STEPPER** = vícekrokový proces (wizard) s validacemi
- **TABS/SECTIONS** = vnitřní přepínání kontextu v detailu (bez opuštění stránky)
- **DRAWER/MODAL** = rychlá akce (editace, potvrzení, “are you sure”)

---

## 1) Navigace (1. úroveň pod Dashboardem)
**Prefix URL:** `/app/broker/...`

1. **Marketplace – Tikety (standardní nabídka)** *(LIST)* → `/tickets`
2. **Rezervace** *(LIST)* → `/reservations`
3. **Investoři (evidence)** *(LIST)* → `/investors`
4. **Projekty (lead od brokera)** *(LIST)* → `/leads`
5. **Provize a výplaty** *(LIST)* → `/commissions`
6. **Pool program** *(DASHBOARD/LIST)* → `/pool`
7. **Nastavení profilu** *(FORM/TABS)* → `/settings/...`
8. **Podpora** *(LIST/DETAIL)* → `/support`

---

## 2) Globální layout (pro všechny stránky brokera)
- **Topbar:** Logo | Globální hledání (Tikety / Rezervace / Investoři / Projekty) | Notifikace | Profil
- **Sidebar:** Dashboard + 1. úroveň navigace
- **Page header:** H1 + per‑page akce + kontextové “chips” (stav, SLA, expirace)
- **Základní patterny:** tabulka (LIST), 2‑sloupcový detail (DETAIL), sticky action panel (STEPPER)

### 2.1 Skeleton (globální)
```text
+----------------------------------------------------------------------------------+
| TOPBAR: Logo | Search... | Notifications | Profile                                |
+----------------------+-----------------------------------------------------------+
| SIDEBAR              | PAGE HEADER: H1 + context actions + status chips          |
| - Dashboard          |-----------------------------------------------------------|
| - Marketplace-Tikety | CONTENT AREA (cards / table / detail tabs / side panel)   |
| - Rezervace          |                                                           |
| - Investori          |                                                           |
| - Projekty (moje)    |                                                           |
| - Provize & vyplaty  |                                                           |
| - Pool program       |                                                           |
| - Nastaveni profilu  |                                                           |
| - Podpora            |                                                           |
+----------------------+-----------------------------------------------------------+
```

---

# 3) Stránky (Broker) — low‑fi

## 3.1 Dashboard (Broker) *(DASHBOARD)* — `/dashboard`
**Účel:** “Co je dnes potřeba udělat” + “kde je provize”.

**Bloky:**
1) **KPI strip (3–5 karet):** Aktivní rezervace | Čeká na podpis (48h) | Jednání končí (X dní) | Potenciální provize | Matchů k investorům  
2) **To‑do & SLA (nejvýše):** seznam úkolů s odpočtem + “kdo je na tahu”  
3) **Doporučené tikety (Matching):** karty s “fit” + CTA “Otevřít / Rezervovat”  
4) **Moje projekty (lead od brokera):** stavové štítky + “čeká na přiřazení”  
5) **Aktivity / audit feed:** podpisy, změny stavů, financování, payout

```text
[H1: Dashboard]                               [CTA: Rezervovat tiket] [CTA: Pridat investora]
----------------------------------------------------------------------------------------------
[KPI: Aktivni] [KPI: Ceka na podpis 48h] [KPI: Jednani konci] [KPI: Potencial provize] [KPI: Matchy]
----------------------------------------------------------------------------------------------
[TO-DO & SLA]
- Rezervace #123: Investor podepsat balík do 12:14 (zbyva 05:32) [Pripomenout]
- Rezervace #124: Developer podpis do 18:20 (zbyva 11:38)        [Kontaktovat]
- Tiket T-55: expiruje za 2 dny (posledni sance)                  [Otevrit tiket]
----------------------------------------------------------------------------------------------
[Doporucene tikety]  [card] [card] [card] ...
----------------------------------------------------------------------------------------------
[Moje leady/projekty]                                  [Aktivity / audit]
- Lead L-01 (ceka na prirazeni)                         - 10:12 Investor dokoncil podpisy
- Projekt P-16 (zverejneno - 3 tikety)                  - 09:40 Aktivovana rezervace #123
----------------------------------------------------------------------------------------------
```

---

## 3.2 Marketplace – Tikety (standardní nabídka) *(LIST)* — `/tickets`
**Cíl:** vybrat tiket + zkontrolovat **expiraci**, **kapacitu**, **zajištění/LTV**, **matching**.

**Řádek/karta tiketu (informační hierarchie):**
- Odměna brokera (Kč) *(dominantní)*
- Částka + výnos + splatnost + forma financování
- Zajištění + (volitelně) LTV / poměr k hodnotě zástavy
- **Platnost/expirace** (“zveřejněno do”, odpočet)
- **Kapacita** (např. 2/3) + “fronta” (mimo kapacitu)
- **Matching**: “Shoda: 4 investoři”

```text
[H1: Marketplace - Tikety]    [Search] [Filter] [Sort]             [Tabs: Vse | Doporucene | Sledovane]
-------------------------------------------------------------------------------------------------------
[Filters] (left)            | [LIST (table/cards)]
- Castka min/max            | +----------------------------------------------------------------------------------+
- Výnos min                | | Projekt #123 (mask)             Odmena: 250 000 Kc     [Chip: Zverejneno]       |
- Forma financovani         | | Castka: 50 000 000 | Výnos: 12% p.a. | Splatnost: 18m | LTV: 65% | Zajisteni |
- Zajisteni                 | | Expirace: 2d 4h | Kapacita: 2/3 (fronta: 1) | Match: 4 investori              |
- Lokalita (kraj)           | | [CTA: Detail]   [CTA: Rezervovat]                                       [Save] |
- Stav kapacity             | +----------------------------------------------------------------------------------+
-------------------------------------------------------------------------------------------------------
```

**2. úroveň:**
- Klik na kartu/řádek → **Tiket detail + Projekt sekce (mask/odemknuto)** `/tickets/:ticketId`
- CTA “Rezervovat” → **Rezervace stepper** `/tickets/:ticketId/reservations/new`

---

## 3.3 Tiket detail + Projekt (maskovaný / odemknutý) *(DETAIL)* — `/tickets/:ticketId`
**Pozice “detail projektu”:** je to **sekce uvnitř Tiket detailu** (ne samostatná položka v menu).

### A) Hlavička detailu (always)
- Název (mask/odemknuto), lokalita (kraj+město), tagy (typ projektu)
- Stav tiketu: Zveřejněný / Skrytý / Expirovaný / Uzavřený
- **Expirace tiketu:** odpočet (a po expiraci disable “Rezervovat”)
- **Kapacita:** 2/3 + vysvětlení fronty (podpis investora určuje pořadí)

### B) TABS/SECTIONS v detailu
- **Tab 1: Přehled** (ticket parametry + zajištění + CTA)
- **Tab 2: Projekt** (maskovaný/odemknutý projekt detail + dokumenty)
- **Tab 3: Rezervace na tiketu** (read‑only seznam + pořadí/kapacita)
- **Tab 4: Historie změn** (audit “upraveno”, změny publish okna, …)

```text
[H1: Projekt #123 (mask)  | Lokalita: Praha | Typ: Rezidencni]     [Chip: Zverejneno] [Expirace: 2d 4h]
[Sub: Tiket T-55 | Kapacita: 2/3 (fronta 1) | Match: 4 investori] [CTA: Rezervovat] [CTA: Ulozit]
-------------------------------------------------------------------------------------------------------
[TABS: Prehled | Projekt | Rezervace na tiketu | Historie]
-------------------------------------------------------------------------------------------------------
[Prehled]
[Card: Investicni parametry]        [Card: Zajisteni & LTV]                 [Side: Matching investori]
- Castka                            - Typy zajisteni                       - Investor A (fit 92%)
- Výnos p.a.                       - Poradi zastavy                        - Investor B (fit 85%)
- Splatnost                          - Poměr financ. k hodnote (LTV)         [CTA: Otevrit matching]
- Forma financovani                 - Zdroj oceneni
-------------------------------------------------------------------------------------------------------
[Rezervace & kapacita (inline summary)]
- V kapacite (2): #R120 (Investor podepsal), #R121 (cekame na podpis dev)
- Ve fronte (1): #R122 (mimo kapacitu)
-------------------------------------------------------------------------------------------------------
[Projekt tab]
- Projekt teaser / plny detail (viz nize)
```

### Projekt tab — **maskovaný režim (teaser)**
Zobrazit, aby broker dokázal rozhodnout, ale **bez citlivých identit**.

```text
[PROJECT CARD - MASK]
- Nazev: Projekt #123 (anonym)
- Developer: Developer #A (anonym)
- Lokalita: Praha, Praha 4
- Teaser popis (kratky)
- Dokumenty: "Predrezervacni" (2 soubory) [Download]
- Galerie: placeholder
[Info banner: "Odemkne se po podpisu Souhlasu + NDA investorem"]
```

### Projekt tab — **odemknutý režim (full)**
Po podpisu Souhlasu+NDA (v rámci podpisového balíku) investorem.

```text
[PROJECT CARD - FULL]
- Nazev projektu (plny)
- Developer (plny) + ICO + sidlo (+ kontakt dle nastaveni)
- Plny popis projektu
- Galerie obrazku
- Dokumenty: vsechny dostupne (podle viditelnosti)
```

---

## 3.4 Vytvořit rezervaci (stepper) *(STEPPER)* — `/tickets/:ticketId/reservations/new`
**Cíl:** rychle vybrat investora + poslat **1 eSign balík** (Souhlas + NDA + Rezervační smlouva).  
**SLA:** investor má **48h** na dokončení balíku (1 deadline). Developer podpis se spouští až když je rezervace “na řadě” (v kapacitě) a investor podepsal rezervační smlouvu.

### Step 0 — Předkontrola (inline banner)
- Tiket je “Zveřejněný” a neexpirovaný
- Broker má volný slot (limit aktivních rezervací)
- Investor má e‑mail (nutné pro eSign)

```text
[H1: Vytvorit rezervaci]  [Step 1/3]
[Context: Tiket T-55 | Expirace: 2d 4h | Kapacita: 2/3]
--------------------------------------------------------------------------------
[Step 1: Vyber investora]
[Search investor] [CTA: Novy investor]
[List of investors + quick-fit badges]
[Sticky footer: Back]                               [CTA: Pokracovat]
```

### Step 2 — Shrnutí + potvrzení
- Vybraný investor (kontakty)
- Shrnutí tiketu (částka, výnos, splatnost)
- Informace o maskování/odemknutí + auditní stopě
- Checkboxy: “Mám právní důvod investora evidovat a kontaktovat” (povinné)

```text
[Step 2/3: Shrnutí a potvrzeni]
[Left: Shrnutí investora + moznost upravit email]
[Right: Shrnutí tiketu + SLA]
- Investor ma 48h na podpis baliku
- Po podpisu Souhlasu+NDA se odemkne projekt a developer uvidi identitu
[Checkbox: Potvrzuji pravni duvod evidence a kontaktovani investora] (required)
[Sticky footer: Zpet]                               [CTA: Odeslat k podpisu]
```

### Step 3 — Odesláno (success)
- Status balíku (pending)
- Link pro investora (copy)
- CTA: “Přejít do rezervace detailu”
- CTA: “Poslat připomínku” (až za X hodin, rate limit)

```text
[Success: Rezervace odeslana]
- Rezervace #R123
- SLA: 48h (deadline: 12.2. 12:14)
- Dokumenty v baliku: Souhlas | NDA | Rezervacni smlouva
[CTA: Otevrit detail rezervace]   [CTA: Kopirovat odkaz pro investora]
```

---

## 3.5 Rezervace (list) *(LIST)* — `/reservations`
*(zachováno z v1, doplněno o expiraci tiketu + fázi kapacity)*

```text
[H1: Rezervace]   [Tabs: Vse | Ceka na podpis | Ve fronte | Aktivni | Jednani | Financovano | Zruseno]
-------------------------------------------------------------------------------------------------------
[Filters] Stav / SLA / Tiket expiruje / Kapacita (v kapacite vs fronta) / Investor / Projekt / Developer
-------------------------------------------------------------------------------------------------------
[Table]
| # | Tiket | Investor | Stav | SLA/Deadline | Kapacita | Kdo je na tahu | Akce |
|R1| T-55  | Inv A    | Ceka na podpis | 05:32 | - | Investor | [Otevrit] [Pripomenout] |
|R2| T-55  | Inv B    | Investor podepsal (fronta) | - | Mimo | System | [Otevrit] |
|R3| T-55  | Inv C    | Ceka na podpis dev | 11:38 | V kapacite | Developer | [Otevrit] |
-------------------------------------------------------------------------------------------------------
```

---

## 3.6 Rezervace detail + SLA timeline *(DETAIL)* — `/reservations/:reservationId`
**Cíl:** absolutní přehled (stav, dokumenty, deadline, kdo je na tahu) + bezpečné “next actions”.

### Sekce v detailu
1) **Header:** stav + odpočet SLA + rychlé akce (připomenout / zrušit)  
2) **Timeline (milníky):** vytvořeno → odesláno → podpisy → kapacita → aktivace → jednání → financováno  
3) **Dokumenty:** Souhlas, NDA, Rezervační smlouva (statusy, timestamps)  
4) **Účastníci:** Broker (já) | Investor (viditelný po podpisu Souhlasu+NDA developerovi) | Developer (odmaskován brokerovi po podpisu Souhlasu+NDA)  
5) **Projekt & tiket kontext:** linky na tiket detail  
6) **Audit feed:** systémové události + admin zásahy (read‑only)

```text
[H1: Rezervace #R123]    [Chip: Ceka na podpis investora]   [Deadline: 05:32]  [CTA: Pripomenout] [CTA: Zrusit]
---------------------------------------------------------------------------------------------------------------
[TIMELINE]
(1) Odeslano investorovi 12.2 12:14  --->  (2) Podpis baliku (SLA 48h)  --->  (3) Investor podepsal (OK)
(4) Fronta/kapacita (2/3)  --->  (5) Podpis developera (SLA 48h)  --->  (6) Aktivni rezervace (30d jednani)
(7) Financovano (proof)  --->  (8) Provize & vyplata
---------------------------------------------------------------------------------------------------------------
[DOKUMENTY]
- Souhlas (status: pending/signed, timestamp)
- NDA (status: pending/signed, timestamp)
- Rezervacni smlouva (status: pending/signed by investor / signed by dev)
[Pozn.: eSign 1 envelope – pokud provider neumi per-doc status, zobrazime "Balik: pending/signed"]
---------------------------------------------------------------------------------------------------------------
[UCASNICI]
- Broker: Ja (vidim vzdy)
- Investor: Inv A (vidim vzdy; developer vidi od faze A)
- Developer: Dev X (maskovany do podpisu Souhlasu+NDA investorem)
---------------------------------------------------------------------------------------------------------------
[PROJEKT/TIKET]
- Tiket: T-55 (link)
- Projekt: Projekt #123 (mask/full podle stavu)
---------------------------------------------------------------------------------------------------------------
[AUDIT / AKTIVITY]
- 12:14 odeslano k podpisu
- 12:20 investor otevrel link
- ...
```

**Edge states (zobrazení v detailu):**
- **Tiket expiroval během čekání:** rezervace může doběhnout (podpisy), ale UI ukáže warning “nelze zakládat nové rezervace”
- **Rezervace ve frontě (mimo kapacitu):** ukázat pořadí + vysvětlit, že developer akci uvidí až po vstupu do kapacity
- **SLA breach:** červený banner + CTA “zavřít rezervaci” (vyžaduje potvrzení)

---

## 3.7 Investoři (evidence) *(LIST)* — `/investors`
*(zachováno z v1)*

---

## 3.8 Investor detail *(DETAIL)* — `/investors/:investorId`
**Cíl:** mít “kartu investora” (preference + kontakty) a rychle spouštět matching / rezervaci.

**Sekce:**
- Profil (typ, jméno/firma, rezidence, kontakt)
- Preference (min/max investice, regiony, typ projektu, forma financování, zajištění, max poměr k hodnotě zástavy)
- Interní poznámka (jen broker)
- Historie (rezervace, výsledky)
- CTA: “Najít matching tikety” / “Přidat rezervaci na tiket”

```text
[H1: Investor A]                        [CTA: Matching tikety] [CTA: Upravit investora]
------------------------------------------------------------------------------------------------
[Left: Profil]                          [Right: Preference]
- Typ: FO/PO                             - Min/Max investice
- Email/Telefon                          - Regiony / Typy projektu
- Stav evidence                          - Forma financovani / Zajisteni / Max LTV
------------------------------------------------------------------------------------------------
[Historie rezervaci (table)]
| Rezervace | Tiket | Stav | Datum |
------------------------------------------------------------------------------------------------
[Interni poznamka brokera] (textarea, private)
```

---

## 3.9 Investor form (nový / editace) *(FORM)* — `/investors/new` a `/investors/:investorId/edit`
**Pattern:** 2‑sloupcový formulář + “validace při blur” + sticky Save.

```text
[H1: Novy investor]                                            [CTA: Ulozit]
------------------------------------------------------------------------------------------------
[Section: Identita]
- Typ investora (FO/PO)
- Jmeno/Nazev
- ICO (pokud PO)
- Danova rezidence
- Email (pro eSign) / Telefon
[Section: Preference]
- Min/Max investice
- Výnos (preference)
- Max delka
- Regiony (kraje)
- Typy projektu
- Forma financovani
- Zajisteni (ano/ne/prefer)
- Max pomer k hodnote zastavy (LTV)
[Section: Compliance]
[Checkbox: Prohlasuji pravni duvod evidence] (doporučeno/povinné dle rozhodnutí)
```

---

## 3.10 Matching *(LIST)* — kontext Investor nebo Tiket
**Varianty vstupu:**
- z **Investor detailu**: `/investors/:investorId/matching` → “matching tikety pro investora”
- z **Tiket detailu** (side panel CTA): `/tickets/:ticketId?tab=matching` → “matching investoři pro tiket”
- ze **Step 1 rezervace**: inline matching badge u investorů

### A) Matching: tikety pro investora (Investor → Tikety)
```text
[H1: Matching tikety pro Investor A]    [Filters: castka | region | forma | zajištění | expirace]
--------------------------------------------------------------------------------------------------
[Ticket list (cards/table) s "Fit score" + CTA "Otevrit" / "Rezervovat"]
```

### B) Matching: investoři pro tiket (Tiket → Investoři)
```text
[H1: Matching investori pro Tiket T-55] [Filters: kapacita | rychlost podpisu | typ investora]
--------------------------------------------------------------------------------------------------
[Investor list] + CTA "Vybrat do rezervace" (preselect ve stepperu)
```

---

## 3.11 Projekty (lead od brokera) *(LIST)* — `/leads`
*(zachováno z v1)*

---

## 3.12 Lead/Projekt detail + stav + přiřazení developera *(DETAIL)* — `/leads/:leadId`
**Cíl:** broker vidí, co se děje s jeho leadem a (po zveřejnění) i tikety v projektu.

### TABS
- **Tab 1: Lead / Projekt detail** (data z leadu, status timeline, přiřazení dev)
- **Tab 2: Tikety v projektu (po zveřejnění)** (seznam tiketů, rezervace, provize)

```text
[H1: Lead L-01 / Projekt (broker)]     [Chip: Ceka na prirazeni]      [CTA: Upravit lead] [CTA: Kontaktovat podporu]
---------------------------------------------------------------------------------------------------------------
[TABS: Lead detail | Tikety v projektu]
---------------------------------------------------------------------------------------------------------------
[Lead detail]
[Card: Zakladni info]
- Nazev (pracovni)
- Lokalita
- Typ projektu
- Strucny popis
[Card: Stavova timeline]
- Lead vytvoren -> Admin review -> Developer prirazen -> Projekt zalozen -> Tikety publikovany
[Card: Prirazeni developera]
- Stav: neprirazeno / prirazeno (Dev X)
- (pokud neprirazeno) CTA: "Pozadat admina o prirazeni" + pole "navrhovany developer" (optional)
---------------------------------------------------------------------------------------------------------------
[Tikety v projektu] (zobrazi se az po zverejneni aspon 1 tiketu)
[Table]
| Tiket | Stav | Expirace | Kapacita | # Rezervaci | Akce |
| T-55  | Zverejneno | 2d | 2/3 | 3 | [Otevrit tiket] |
```

---

## 3.13 Provize a výplaty *(LIST)* — `/commissions`
*(zachováno z v1, komunikace částek bez DPH)*

---

## 3.14 Provize detail & fakturace *(DETAIL)* — `/commissions/:commissionId`
**Cíl:** jasně ukázat **vznik nároku** a **stav výplaty** (bez překvapení).

**Sekce:**
- Kontext: rezervace + tiket + projekt
- Výpočet: celková provize (Kč) + split (Platforma 50 / Broker1 25 / Broker2 25)
- Stav: “čeká na profinancování” → “čeká na úhradu platformě” → “payout ready” → “vyplaceno”
- Podklady pro fakturu (platforma poskytuje identifikátory platby)

```text
[H1: Provize #C-120]   [Chip: Payout ready]   [CTA: Stahnout podklady] [CTA: Prejit na nastaveni fakturace]
-------------------------------------------------------------------------------------------------------------
[Card: Kontext]
- Rezervace #R120 | Tiket T-40 | Projekt P-10 | Developer Dev Y
[Card: Vypocet]
- Zaklad (profinancovano): 50 000 000 Kc
- Celkova provize: 2 500 000 Kc
- Split: Platforma 50% (1 250 000) | Broker1 25% (625 000) | Broker2 25% (625 000)
[Card: Stav & terminy]
- Datum vzniku naroku: ...
- Splatnost vyplaty: ...
- Datum vyplaty: ...
[Card: Doklady]
- Faktura obchodnika -> platforma (upload/status)
```

---

## 3.15 Pool program *(DASHBOARD/LIST)* — `/pool`
*(rozšířeno o leaderboard/periodu, pokud aktivní)*

```text
[H1: Pool program]
------------------------------------------------------------------------------------------------
[Card: Status] Ucast: Aktivni | Obdobi: H1 2026 | Meta 1: ... | Meta 2: ...
[Card: Můj obrat do poolu]  [Card: Poradi kvalifikovanych]  [Card: Odhad vyplaty]
------------------------------------------------------------------------------------------------
[Section: Historie period / vyplat]
[Table: Obdobi | Stav | Pool size | Moje alokace | Vyplaceno dne]
```

---

## 3.16 Nastavení profilu *(FORM/TABS)* — `/settings/...`
**TABS:** Firma a identita | Fakturace | Bankovní údaje | Notifikace

```text
[H1: Nastaveni]
------------------------------------------------------------------------------------------------
[TABS: Firma a identita | Fakturace | Bankovni udaje | Notifikace]             [CTA: Ulozit]
------------------------------------------------------------------------------------------------
[Form fields...]
```

---

## 3.17 Podpora *(LIST/DETAIL)* — `/support`
```text
[H1: Podpora]                                   [CTA: Napsat podporu]
------------------------------------------------------------------------------------------------
[FAQ accordion: proces, SLA, podpisy, provize]
[My requests table]
```

---

## 4) Poznámky (psychologie & obchod)
- **SLA + expirace** musí být “nepřehlédnutelné” (Dashboard + Rezervace + Tiket detail).
- **Odměna v Kč** je hlavní motivátor brokera → v Marketplace dominanta.
- **Maskování/odemknutí** vysvětlovat jako ochranu brokera i developera (“proti obcházení”).
- **Matching** zkracuje cestu k rezervaci: doporučení investora přímo z tiketu + pre‑select ve stepperu.
