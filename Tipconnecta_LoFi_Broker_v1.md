# Tipconnecta — Low‑fi (Broker / Obchodník)
**Verze:** v1.0  
**Datum:** 2026-01-23  
**Scope:** Low‑fidelity návrhy (desktop) pro **Dashboard + 1. úroveň navigace** (stránky hned pod dashboardem).  
**Pozn.:** Záměrně bez vizuálního stylu — pouze bloky, hierarchie, navigace, primární CTA a klíčová data (SLA, matching, LTV).

---

## 0) Mini IA legenda (pro rychlou orientaci)
- **DASHBOARD** = přehled + rychlé akce + to‑do/SLA
- **LIST** = seznam entit (tabulka/karty) + filtry
- **DETAIL** = detail entity + stav + akce (z LIST přes row/card click)
- **STEPPER** = vícekrokový proces (wizard) s validacemi

---

## 1) První úroveň navigace (Broker)
> Toto jsou stránky dostupné v hlavní navigaci **přímo pod Dashboardem**.

1. **Marketplace – Tikety (standardní nabídka)** *(LIST)*
2. **Rezervace** *(LIST)*
3. **Investoři (evidence)** *(LIST)*
4. **Projekty (lead od brokera)** *(LIST)*
5. **Provize a výplaty** *(LIST)*
6. **Pool program** *(DASHBOARD/LIST)*
7. **Nastavení profilu** *(FORM)*
8. **Podpora** *(LIST/DETAIL)*

---

## 2) Globální layout (pro všechny stránky brokera)
- **Topbar:** Logo | Globální hledání (entity: Tikety / Rezervace / Investoři / Projekty) | Notifikace | Profil
- **Sidebar (levý panel):** Dashboard + 1. úroveň navigace (viz výše)
- **Obsah:** max‑width container (např. 1200–1360px), uvnitř bloky (cards, tabulky)

### 2.1 Low‑fi skeleton (globální)
```text
+----------------------------------------------------------------------------------+
| TOPBAR: Logo | Search... | Notifications | Profile                                |
+----------------------+-----------------------------------------------------------+
| SIDEBAR              | PAGE HEADER: H1 + context actions                         |
| - Dashboard          |-----------------------------------------------------------|
| - Marketplace-Tikety | CONTENT AREA (cards / table / panels)                     |
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

# 3) Low‑fi návrhy stránek (Broker)

## 3.1 Dashboard (Broker) — „Co je dnes potřeba udělat a kde je potenciální provize“
**Primární účel:** rychle najít tikety, vytvořit rezervaci, pohlídat SLA a vidět stav provizí.

**Klíčové bloky (shora dolů):**
1) **KPI strip (3–5 karet):**
- Aktivní rezervace (po podpisu)  
- Rezervace čekající na podpis (SLA 48h)  
- Potenciální provize (odhad) / Vyplaceno (posledních 30 dní)  
- Nové tikety (24h/7 dní)  
- Matchů k investorům (kolik shod pro doporučení)

2) **To‑do & SLA (nejdůležitější)**
- seznam položek s odpočtem + „kdo je na tahu“
- typy úkolů: „Investor musí podepsat balík“, „Developer musí podepsat“, „Jednání končí za X dní“, „Chybí podklady“

3) **Doporučené tikety (Matching)**
- horizontální karty (3–6) se stručnými parametry: Odměna, Částka, LTV, Platnost, Match count

4) **Moje projekty (lead od brokera) – stav**
- mini‑seznam 5 posledních leadů + status (čeká na přiřazení / přiřazeno / publikováno)

5) **Aktivity (audit feed)**
- stream: podpisy, změny stavu rezervací, potvrzení financování, vyplacení

**Low‑fi wireframe**
```text
[H1: Dashboard]                               [CTA: Rezervovat tiket] [CTA: Pridat investora]
----------------------------------------------------------------------------------------------
[KPI card: Aktivni rezervace] [KPI: Ceka na podpis (48h)] [KPI: Potencial provize] [KPI: Matchy]
----------------------------------------------------------------------------------------------
[To-do & SLA (list)]
- Rezervace #123: Investor musi podepsat do 12:14 (zbyva 05:32)  [Akce: Pripomenout investorovi]
- Rezervace #124: Developer musi podepsat do 18:20 (zbyva 11:38) [Akce: Kontaktovat developera]
- Rezervace #120: Jednani konci za 3 dny                                        [Akce: Otevrit]
----------------------------------------------------------------------------------------------
[Doporucene tikety (cards row)]
[Ticket card] [Ticket card] [Ticket card] [Ticket card]
----------------------------------------------------------------------------------------------
[Moje projekty (lead od brokera) - mini list]          [Aktivity / audit feed]
- Projekt A (ceka na prirazeni)                        - 10:12 Podepsano NDA (Investor X)
- Projekt B (publikovano)                              - 09:40 Aktivovana rezervace #123
----------------------------------------------------------------------------------------------
```

---

## 3.2 Marketplace – Tikety (standardní nabídka) *(LIST)*
**Cíl uživatele:** vybrat vhodný tiket, rychle ověřit parametry (LTV, zajištění, odměna) a vytvořit rezervaci.  
**Cíl byznysu:** zrychlit „time‑to‑reservation“ a zvýšit likviditu marketplace.

### Informační hierarchie (na kartě/řádku tiketu)
- **1) Odměna brokera (Kč)** *(největší číslo)*
- **2) Částka tiketu** + typ financování
- **3) Zajištění + LTV** (pokud relevantní)
- **4) Platnost / Expirace tiketu (SLA)** + dostupná kapacita (např. 2/3)
- **5) Matching**: „Shoda s investory: 4“ (klik vede na doporučené investory)

### Low‑fi wireframe
```text
[H1: Marketplace - Tikety]    [Search] [Filter] [Sort]                         [Tabs: Vse | Doporucene | Sledovane]
---------------------------------------------------------------------------------------------------------------
[Filters left (optional)] | [Ticket list - cards or table]
- Castka (min/max)        |  +---------------------------------------------------------------------------------+
- Odmena (min)            |  | Ticket: "Projekt X" (maskovany)       Odmena: 250 000 Kc                         |
- LTV (max)               |  | Castka: 50 000 000 Kc | Zajisteni: zastava 1. poradi | LTV: 65 %                 |
- Typ financovani         |  | Platnost do: 12.2. 12:00 (zbyva 2d 4h) | Kapacita: 2/3 | Match: 4 investori     |
- Lokalita                |  | [CTA: Detail]   [CTA: Rezervovat]                                          [Icon: Save]
- Stav kapacity           |  +---------------------------------------------------------------------------------+
                           |  (repeat rows)
---------------------------------------------------------------------------------------------------------------
```

**Navigace na podstránky (2. úroveň)**
- Klik na řádek/kartu → **Tiket detail** (v detailu je „Projekt detail“ jako sekce/karta, maskovaná/odemknutá)
- CTA „Rezervovat“ → **Rezervace stepper** (výběr investora + eSign balík)

---

## 3.3 Rezervace *(LIST)*
**Cíl uživatele:** vidět všechny své rezervace, SLA odpočty a „kdo je na tahu“.  
**Klíčová data:**  
- **SLA 48h**: investor podepisuje **celý balík** (Souhlas+NDA+Rezervace) do 48h od vytvoření rezervace  
- **Jednání (např. 30 dní)**: po aktivaci rezervace běží okno pro uzavření financování

### Low‑fi wireframe
```text
[H1: Rezervace]                       [Tabs: Vse | Ceka na podpis | Aktivni | Jednani | Financovano | Zruseno]
--------------------------------------------------------------------------------------------------------------
[Filters]  Stav / Tiket / Datum / SLA (breach) / Investor / Projekt / Developer
--------------------------------------------------------------------------------------------------------------
[Table]
| Rezervace | Tiket | Investor | Stav | SLA odpočet | Kdo je na tahu | Akce |
| #123      | T-55  | Investor A | Ceka na podpis | 05:32 | Investor | [Otevrit] [Pripomenout] |
| #124      | T-57  | Investor B | Ceka na podpis | 11:38 | Developer| [Otevrit] [Kontaktovat] |
| #120      | T-40  | Investor C | Jednani        | 3 dny | Broker   | [Otevrit]               |
--------------------------------------------------------------------------------------------------------------
[Side panel (optional): SLA timeline legend / statuses]
```

**Navigace na podstránky (2. úroveň)**
- Klik na řádek → **Rezervace detail + SLA timeline** (detail obsahuje podpisy, audit, dokumenty, stav jednání)

---

## 3.4 Investoři (evidence) *(LIST)*
**Cíl uživatele:** spravovat databázi investorů a jejich investiční preferenci pro matching.  
**Cíl byznysu:** zvýšit kvalitu matchů a zrychlit rezervace.

### Low‑fi wireframe
```text
[H1: Investori]                                                [CTA: Pridat investora]
------------------------------------------------------------------------------------------------
[Search] [Filters: velikost investice | typ | lokalita | riziko | rychlost podpisu | stav souhlasu]
------------------------------------------------------------------------------------------------
[Table / Cards]
| Investor | Segment | Kapacita (Kc) | Preferovane LTV | Poznamka | Stav souhlasu | Akce |
| A        | HNWI    | 10-20m        | <= 65%          | ...      | OK (audit)    | [Detail] [Edit] |
| B        | FO      | 50m+          | <= 60%          | ...      | Chybi         | [Detail] [Vyžádat] |
------------------------------------------------------------------------------------------------
```

**Navigace na podstránky (2. úroveň)**
- Investor detail (audit souhlasů/NDA, preference, historie rezervací)
- Editace investora

---

## 3.5 Projekty (lead od brokera) *(LIST)*
**Cíl uživatele:** vidět **projekty, které broker přinesl**, jejich stav a přiřazení developera; po zveřejnění vidět i tikety v projektu.  
**Důležité:** toto není „standardní nabídka“ — je to **vlastní dealflow brokera**.

### Low‑fi wireframe
```text
[H1: Projekty (lead od brokera)]                                  [CTA: Pridat lead projektu]
------------------------------------------------------------------------------------------------
[Tabs: Vse | Ceka na prirazeni | Prirazeno | Zverejneno (tikety) | Zamitnuto]
------------------------------------------------------------------------------------------------
[Table]
| Projekt/Lead | Stav | Developer | # Tiketu | # Rezervaci | GMV (odhad) | Akce |
| L-01         | Ceka na prirazeni | -        | - | - | - | [Otevrit] |
| P-12         | Prirazeno         | Dev X    | 2 | 1 | ... | [Otevrit] |
| P-16         | Zverejneno        | Dev Y    | 3 | 2 | ... | [Otevrit] |
------------------------------------------------------------------------------------------------
[Inside "Projekt detail" (2. uroven) budou 2 sekce/tabs:]
- Lead/Projekt detail + stav + prirazeni developera
- Tikety v projektu (po zverejneni)
```

---

## 3.6 Provize a výplaty *(LIST)*
**Cíl uživatele:** rozumět „co už vzniklo“, „co je očekávané“ a „kdy přijde výplata“.

### Low‑fi wireframe
```text
[H1: Provize a vyplaty]
------------------------------------------------------------------------------------------------
[Summary cards]  [Vyplaceno (30d)] [Ocekavano] [Ve zpracovani] [Posledni vyplata]
------------------------------------------------------------------------------------------------
[Table]
| Rezervace | Tiket | Stav | Provize (Kc) | Split (B1/B2/Platforma) | Datum vzniku naroku | Datum vyplaty | Akce |
| #120      | T-40  | Financovano | 250 000 | 25/25/50 | 12.1. | 15.1. | [Detail] |
------------------------------------------------------------------------------------------------
```

---

## 3.7 Pool program *(DASHBOARD/LIST)*
**Cíl uživatele:** vidět stav účasti v poolu, pravidla a očekávané bonusy (pokud jsou definované).

### Low‑fi wireframe
```text
[H1: Pool program]
------------------------------------------------------------------------------------------------
[Card: Status]  Ucast: Aktivni | Tier: Founding | Prinos: X | Odhad bonusu: Y
------------------------------------------------------------------------------------------------
[Section: Jak pool funguje] (stručné vysvětlení + pravidla)
[Section: Historie] (tabulka rozdělení / připsání)
```

---

## 3.8 Nastavení profilu *(FORM)*
**Obsah (bloky):**
- Firma & identita
- Fakturační údaje
- Bankovní účet pro výplaty
- Notifikace

### Low‑fi wireframe
```text
[H1: Nastaveni profilu]
------------------------------------------------------------------------------------------------
[Tabs: Firma a identita | Fakturace | Bankovni udaje | Notifikace]
------------------------------------------------------------------------------------------------
[Form fields ...]                                              [CTA: Ulozit zmeny]
```

---

## 3.9 Podpora *(LIST/DETAIL)*
**Obsah:**
- FAQ (proces, SLA, podpisy, provize)
- Kontakt (email/telefon)
- Založit požadavek

### Low‑fi wireframe
```text
[H1: Podpora]                                   [CTA: Napsat podporu]
------------------------------------------------------------------------------------------------
[FAQ accordion list]
[My requests table]
```

---

## 4) Psychologie & obchodní principy (low‑fi poznámky)
- **SLA/odpočty musí být vždy viditelné** (Dashboard + Rezervace list) → snižuje stres a zvyšuje akci.
- **Odměna v Kč** je primární motivátor brokera → v Marketplace vždy nahoře.
- **Ochrana vztahů** → jasně označit „maskované/odemknuté“ a proč.
- **Matching** (investoři) → pocit kontroly („komu to mohu poslat“) + zrychlení rezervace.

