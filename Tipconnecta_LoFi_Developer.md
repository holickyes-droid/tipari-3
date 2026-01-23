# Tipconnecta — Low‑fi (Developer)
**Verze:** v2.0  
**Datum:** 2026-01-23  
**Scope:** Low‑fidelity návrhy (desktop) pro roli **Developer** – **všechny úrovně** (Dashboard + všechny podstránky ze sitemap).

---

## 0) Mini IA legenda
- **DASHBOARD** = přehled + SLA + úkoly + rychlé akce
- **LIST** = tabulka/karty + filtry
- **DETAIL** = detail entity + stav + akce + audit
- **FORM** = vytvoření/editace (validace)
- **STEPPER** = vícekrokový proces (wizard)
- **TABS/SECTIONS** = vnitřní přepínání v detailu (bez opuštění stránky)
- **DRAWER/MODAL** = rychlá akce (potvrzení, doplnění, upload)

---

## 1) Navigace (1. úroveň pod Dashboardem)
**Prefix URL:** `/app/developer/...`

1. **Projekty** *(LIST)* → `/projects`
2. **Rezervace (napříč tikety)** *(LIST)* → `/reservations`
3. **Poplatky a provize platformě** *(LIST)* → `/fees`
4. **Nastavení profilu** *(FORM/TABS)* → `/settings/...`
5. **Podpora** *(LIST/DETAIL)* → `/support`

*(Volitelně v budoucnu: globální „Tikety“ v navigaci; pro MVP stačí v rámci projektů.)*

---

## 2) Globální layout (Developer)
- **Topbar:** Logo | Globální hledání (Projekty/Tikety/Rezervace) | Notifikace | Profil
- **Sidebar:** Dashboard + 1. úroveň
- **Page header:** H1 + kontextové akce (nejčastěji “Vytvořit tiket”, “Podepsat”, “Potvrdit financování”)

```text
+----------------------------------------------------------------------------------+
| TOPBAR: Logo | Search... | Notifications | Profile                                |
+----------------------+-----------------------------------------------------------+
| SIDEBAR              | PAGE HEADER: H1 + context actions + status chips          |
| - Dashboard          |-----------------------------------------------------------|
| - Projekty           | CONTENT AREA                                              |
| - Rezervace          |                                                           |
| - Poplatky & provize |                                                           |
| - Nastaveni profilu  |                                                           |
| - Podpora            |                                                           |
+----------------------+-----------------------------------------------------------+
```

---

# 3) Stránky (Developer) — low‑fi

## 3.1 Dashboard (Developer) *(DASHBOARD)* — `/dashboard`
**Účel:** “Kdo čeká na podpis / potvrzení” + rychlý přehled supply (projekty/tikety).

**Bloky:**
1) KPI strip: Rezervace čekající na podpis (48h) | Aktivní rezervace (jednání) | Tikety zveřejněné | Tikety draft/ke schválení | GMV (30 dní)  
2) To‑do & SLA: podpisy, doplnění podkladů, potvrzení financování  
3) Moje projekty: stav + # tiketů + # rezervací  
4) Aktivita / audit

```text
[H1: Dashboard]                           [CTA: Vytvorit projekt] [CTA: Vytvorit tiket]
----------------------------------------------------------------------------------------
[KPI: Ceka na podpis (48h)] [KPI: Aktivni jednani] [KPI: Tikety zverejnene] [KPI: GMV]
----------------------------------------------------------------------------------------
[TO-DO & SLA]
- Rezervace #R124: Podepsat do 18:20 (zbyva 11:38)                [Akce: Otevrit]
- Rezervace #R120: Potvrdit financovani (cekame na proof)         [Akce: Potvrdit]
- Tiket T-55: expiruje za 2 dny (posledni sance na naplneni)       [Akce: Otevrit tiket]
----------------------------------------------------------------------------------------
[Moje projekty - mini list]                         [Aktivity / audit]
- Projekt P-12 (2 tikety, 1 rezervace)              - 10:12 Investor dokoncil podpisy
- Projekt P-18 (draft)                               - 09:40 Aktivovana rezervace #R124
----------------------------------------------------------------------------------------
```

---

## 3.2 Projekty *(LIST)* — `/projects`
**Cíl:** spravovat projekty a jejich tikety.

```text
[H1: Projekty]                                               [CTA: Vytvorit projekt]
------------------------------------------------------------------------------------------------
[Tabs: Vse | Draft | Ceka na schvaleni | Publikovano | Skryto]
[Search] [Filters: lokalita | typ projektu | developer team]
------------------------------------------------------------------------------------------------
[Table]
| Projekt | Stav | # Tiketu | # Rezervaci | Posledni aktivita | Akce |
| P-12    | Publikovano | 2 | 1 | vcera | [Otevrit] |
| P-18    | Draft       | 0 | 0 | dnes  | [Otevrit] |
------------------------------------------------------------------------------------------------
```

**2. úroveň:** klik → **Projekt detail** `/projects/:projectId`

---

## 3.3 Projekt detail *(DETAIL + TABS)* — `/projects/:projectId`
**TABS:** Přehled | Tikety | Dokumenty | Team (uživatelé firmy) | Historie (audit)

```text
[H1: Projekt P-12]  [Chip: Publikovano]  [Lokalita: Praha]   [CTA: Vytvorit tiket] [CTA: Upravit projekt]
-----------------------------------------------------------------------------------------------------------
[TABS: Prehled | Tikety | Dokumenty | Team | Historie]
-----------------------------------------------------------------------------------------------------------
[Prehled]
[Card: Zakladni info]                 [Card: Stav & publikace]              [Card: Rychle statistiky]
- Nazev, typ, lokalita                - stav projektu                        - # tiketu
- Strucny/Plny popis                  - publikacni okno (read-only)          - # rezervaci
-----------------------------------------------------------------------------------------------------------
```

### Projekt detail — tab “Tikety” *(LIST uvnitř detailu)*
```text
[TAB: Tikety]                                                     [CTA: Novy tiket]
-----------------------------------------------------------------------------------------------------------
[Table]
| Tiket | Stav | Castka | Výnos | Splatnost | Expirace | Kapacita | # Rezervaci | Akce |
| T-55  | Zverejneno | 50m | 12% | 18m | 2d | 2/3 | 3 | [Detail] |
| T-56  | Draft     | ... | ... | ...| -  | -   | 0 | [Detail] |
-----------------------------------------------------------------------------------------------------------
```

### Projekt detail — tab “Dokumenty”
- seznam souborů + štítek viditelnosti (předrezervační / odemkne se po Souhlasu+NDA / interní)
- upload (pokud povoleno) + verzování

```text
[TAB: Dokumenty]                               [CTA: Nahrat dokument]
-----------------------------------------------------------------------------------------------------------
[Table]
| Soubor | Kategorie | Viditelnost | Nahrano | Akce |
| LV.pdf | Due diligence | Odemknute po Souhlasu+NDA | ... | [Download] [Edit meta] |
| Teaser.pdf | Prezentace | Predrezervacni | ... | [Download] |
-----------------------------------------------------------------------------------------------------------
```

### Projekt detail — tab “Team”
**Must‑have:** více uživatelů k jednomu developerovi.

```text
[TAB: Team]                                        [CTA: Pozvat uzivatele]
-----------------------------------------------------------------------------------------------------------
[Table]
| Jmeno | Email | Role (Owner/Admin/Member) | Stav pozvanky | Akce |
| ...   | ...   | Owner                    | Aktivni       | [Spravovat]
| ...   | ...   | Member                   | Ceka          | [Zrusit pozvanku]
-----------------------------------------------------------------------------------------------------------
```

---

## 3.4 Tiket detail *(DETAIL + TABS)* — `/tickets/:ticketId`
*(dostupné z Projekt detailu nebo globálního vyhledávání)*

**TABS:** Přehled | Rezervace na tiketu | SLA & kapacita | Historie změn

```text
[H1: Tiket T-55] [Chip: Zverejneno] [Expirace: 2d 4h]     [CTA: Pozadat o upravu] [CTA: Skryt tiket? (admin)]
--------------------------------------------------------------------------------------------------------------
[TABS: Prehled | Rezervace | SLA & kapacita | Historie]
--------------------------------------------------------------------------------------------------------------
[Prehled]
[Card: Investicni parametry]       [Card: Zajisteni & LTV]         [Card: Provize platformy (read-only)]
- Castka                           - Typy zajisteni               - Castka provize (Kc)
- Výnos p.a.                      - Poradi zastavy               - Split (platf/b1/b2) (read-only)
- Splatnost                        - Poměr financ. k hodnote
- Forma financovani                - Zdroj oceneni
```

### Tab “Rezervace na tiketu” *(LIST)*
- rozlišit: čeká na podpis investora / investor podepsal (fronta vs kapacita) / čeká na podpis dev / aktivní jednání / financováno / zrušeno

```text
[TAB: Rezervace na tiketu]
--------------------------------------------------------------------------------------------------------------
[Table]
| Rezervace | Investor | Broker | Stav | Kapacita | Deadline (pokud bezi) | Akce |
| R-120     | Investor A | Broker X | Ceka na podpis dev | V kapacite | 11:38 | [Otevrit] [Podepsat] |
| R-121     | Investor B | Broker Y | Investor podepsal (fronta) | Mimo | - | [Otevrit] |
--------------------------------------------------------------------------------------------------------------
```

---

## 3.5 Nový / edit tiket *(FORM/STEPPER)* — `/projects/:projectId/tickets/new` (a edit jen pokud draft)
**Pozn.:** pokud je tiket už zveřejněný, developer **needitujeme** — místo toho “Žádost o úpravu” (viz níže).

### Varianta A: Form (rychlé MVP)
```text
[H1: Novy tiket]                                                [CTA: Ulozit draft] [CTA: Odeslat ke schvaleni]
---------------------------------------------------------------------------------------------------------------
[Section: Investicni parametry]
- Typ tiketu (dluhovy/kapitalovy)
- Cilova castka (CZK)
- Predpokladany výnos (% p.a.)
- Splatnost (mesice)
- Forma financovani
[Section: Zajisteni]
- Je zajištěno? (ano/ne)
- Typy zajisteni (multi-select)
- Poradi zastavy (1/2/...)
- Poměr financ. k hodnote zastavy (LTV) (optional)
- Zdroj oceneni (optional)
[Section: Dlužník a účet]
- Dlužník (text)
- Bankovni ucet developera (pro instrukce)
[Section: Dokumenty (odkaz na projekt docs)]
- info: "Dokumenty spravujete v Projekt > Dokumenty"
[Validation hints]
- co blokuje “Odeslat ke schválení”
```

### Varianta B: “Žádost o úpravu tiketu” (pokud je tiket zveřejněný)
- pole “popis změny” + navržené hodnoty (volitelné)
- ukázat, zda je žádost blokovaná (aktivní rezervace / odesláno investorům)

```text
[H1: Pozadat o upravu tiketu T-55]
---------------------------------------------------------------------------------------------------------------
[Banner: Nelze upravovat zverejneny tiket primo. Zadejte zadost adminovi.]
[Textarea: Popis zmeny a duvod] (required)
[Optional: navrzene hodnoty]
[CTA: Odeslat zadost]
```

---

## 3.6 Rezervace (napříč tikety) *(LIST)* — `/reservations`
*(z v1, doplněno o “kapacita vs fronta” a “kdo je na tahu”)*

```text
[H1: Rezervace]     [Tabs: Vse | Ceka na podpis | Ve fronte | Aktivni | Jednani | Financovano | Zruseno]
--------------------------------------------------------------------------------------------------------
[Filters] Stav / Projekt / Tiket / Kapacita / Deadline breach
--------------------------------------------------------------------------------------------------------
[Table]
| Rezervace | Projekt | Tiket | Stav | Kapacita | Deadline | Kdo je na tahu | Akce |
| R-124     | P-12    | T-57  | Ceka na podpis dev | V kapacite | 11:38 | Developer | [Podepsat] [Otevrit] |
| R-121     | P-12    | T-57  | Investor podepsal (fronta) | Mimo | - | System | [Otevrit] |
| R-118     | P-08    | T-33  | Jednani | - | 24 dnu | Developer | [Otevrit] |
--------------------------------------------------------------------------------------------------------
```

---

## 3.7 Rezervace detail + rozhodnutí *(DETAIL)* — `/reservations/:reservationId`
**Cíl:** rozhodnout podepsat / odmítnout (s důvodem) + řídit jednání a financování.

**Sekce:**
1) Header: stav + deadline + akce (Podepsat / Odmítnout / Kontakt)  
2) Timeline: podpisy → kapacita → aktivace → jednání → financování  
3) Dokumenty: rezervační smlouva (podepsaná investorem/oběma) + odkazy  
4) Účastníci: Broker + Investor (viditelné od fáze A)  
5) Financování: “Potvrdit financování” + historie proof  
6) Audit: změny a zásahy admina

```text
[H1: Rezervace R-124]  [Chip: Ceka na podpis developera]   [Deadline: 11:38]
[CTA: Podepsat] [CTA: Odmitnout] [CTA: Kontaktovat brokera]
------------------------------------------------------------------------------------------------------------
[TIMELINE]
- Investor dokoncil Souhlas+NDA -> identita odemcena (audit)
- Investor podepsal rez. smlouvu -> Poradi ve fronte: #2 -> V kapacite: ANO
- SLA developera: 48h (deadline...)
- Po podpisu: aktivace -> jednani 30 dni
------------------------------------------------------------------------------------------------------------
[DOKUMENTY]
- Rezervacni smlouva (podepsana investorem) [Download]
- Rezervacni smlouva (podepsana obema)      [Download] (az po podpisu dev)
------------------------------------------------------------------------------------------------------------
[UCASNICI]
- Investor: ...
- Broker: ...
(CTAs: kopirovat kontakt)
------------------------------------------------------------------------------------------------------------
[FINANCOVANI]
[Banner: Po profinancovani vyplnte potvrzeni financovani a nahrajte proof]
[CTA: Potvrdit financovani]  (vede na /financing)
[History table: datum | castka | proof | vlozil]
```

**Odmítnutí (modal/drawer):**
- povinné “Důvod zamítnutí” + (volitelně) poznámka

---

## 3.8 Potvrdit financování *(FORM)* — `/reservations/:reservationId/financing`
**Kdo:** developer (admin může také).

**Povinné:**
- Částka profinancování (CZK)
- Datum převodu / připsání
- Proof (soubor / screenshot)
- Poznámka (optional)

```text
[H1: Potvrdit financovani]    [Context: Rezervace R-124 | Tiket T-57 | Investor ...]
------------------------------------------------------------------------------------------------
[Form]
- Castka (CZK) (required)
- Datum (required)
- Proof upload (required)
- Poznamka (optional)
[CTA: Ulozit a odeslat]
------------------------------------------------------------------------------------------------
[Info: potvrzeni spousti provizni proces]
```

---

## 3.9 Poplatky a provize platformě *(LIST)* — `/fees`
**Cíl:** transparentně ukázat, co je splatné (a jak zaplatit) + evidence proof úhrady.

```text
[H1: Poplatky a provize platforme]
------------------------------------------------------------------------------------------------
[Summary cards] [Splatne] [Po splatnosti] [Uhrazeno (30d)] [Ocekavane]
------------------------------------------------------------------------------------------------
[Table]
| Provize | Rezervace | Zaklad (GMV) | Castka provize | Stav | Splatnost | Identifikator platby | Akce |
| P-001   | R-124     | 50 000 000   | 2 500 000      | Splatne | 14 dni | VS: 1234567890 | [Detail] [Nahrat proof] |
------------------------------------------------------------------------------------------------
```

**Detail platby (volitelně jako drawer):**
- instrukce k úhradě (účet platformy, VS, zpráva)
- upload proof úhrady
- statusy: čeká / potvrzeno / sporné

---

## 3.10 Nastavení profilu *(FORM/TABS)* — `/settings/...`
**TABS:** Firma a identita | Bankovní údaje | Notifikace | Team (uživatelé firmy)

```text
[H1: Nastaveni]
------------------------------------------------------------------------------------------------
[TABS: Firma a identita | Bankovni udaje | Notifikace | Team]                    [CTA: Ulozit]
------------------------------------------------------------------------------------------------
[Form fields...]
```

---

## 3.11 Podpora *(LIST/DETAIL)* — `/support`
```text
[H1: Podpora]                                   [CTA: Napsat podporu]
------------------------------------------------------------------------------------------------
[FAQ: podpisy, kapacita, SLA, financovani, provize]
[My requests]
```

---

## 4) Poznámky (proces & důvěra)
- Developer potřebuje extrémně jasně: **“Je rezervace v kapacitě?”** a **“Mám teď něco dělat?”**.
- Zobrazení fronty (mimo kapacitu) snižuje frustraci a podporuje plánování.
- “Potvrdit financování” musí být rychlé a auditovatelné (částka, datum, proof, kdo vložil).
