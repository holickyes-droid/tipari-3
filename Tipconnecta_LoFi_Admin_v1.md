# Tipconnecta — Low‑fi (Admin / Platforma)
**Verze:** v1.0  
**Datum:** 2026-01-23  
**Scope:** Low‑fidelity návrhy (desktop) pro **Dashboard + 1. úroveň navigace** (stránky hned pod dashboardem).

---

## 0) Mini IA legenda
- **DASHBOARD** = systémový přehled + prioritní fronty + SLA alerty
- **LIST** = tabulka/karty + filtry + bulk akce
- **DETAIL** = detail entity + rozhodnutí/akce + audit
- **FORM** = konfigurace / záznam (např. výplata, platba)

---

## 1) První úroveň navigace (Admin)
1. **Uživatelé** *(LIST)*
2. **Projekty** *(LIST)*
3. **Rezervace** *(LIST)*
4. **Platby a provize** *(LIST)*
5. **Pool program** *(LIST/DASHBOARD)*
6. **Audit log** *(LIST)*
7. **Podpora a incidenty** *(LIST/DETAIL)*

---

## 2) Globální layout (Admin)
- **Topbar:** Logo | Globální search (uživatel / projekt / tiket / rezervace) | Notifikace (SLA breach) | Profil
- **Sidebar:** Dashboard + 1. úroveň
- **Práce admina = fronty** → preferovat tabulky, filtry, bulk akce

```text
+----------------------------------------------------------------------------------+
| TOPBAR: Logo | Search... | Notifications | Profile                                |
+----------------------+-----------------------------------------------------------+
| SIDEBAR              | PAGE HEADER: H1 + context actions                         |
| - Admin dashboard    |-----------------------------------------------------------|
| - Uzivatele          | CONTENT AREA                                              |
| - Projekty           |                                                           |
| - Rezervace          |                                                           |
| - Platby a provize   |                                                           |
| - Pool program       |                                                           |
| - Audit log          |                                                           |
| - Podpora/incidenty  |                                                           |
+----------------------+-----------------------------------------------------------+
```

---

# 3) Low‑fi návrhy stránek (Admin)

## 3.1 Admin dashboard — „Operace a rizika v reálném čase“
**Primární účel:** mít přehled o bottlenecks, SLA breach, schvalování a finančních tocích.

### Klíčové bloky
1) **SLA alerts (top)**
- podpisy (48h) — kolik rezervací v riziku / breach
- jednání (30 dní) — co se blíží ke konci

2) **Fronty ke schválení**
- pending Brokers
- pending Developers
- pending Projekty/Tikety (publikace)

3) **Marketplace health**
- # aktivních tiketů, kapacita, # rezervací/den
- time-to-active-reservation

4) **Finance**
- financování k potvrzení (pokud admin kontroluje doklady)
- payout ready / payout blocked

**Low‑fi wireframe**
```text
[H1: Admin dashboard]
----------------------------------------------------------------------------------------
[ALERT STRIP: SLA breaches / rizika]
- 3 rezervace: podpisy vyprsi do 2h
- 1 rezervace: breach (investor nepodepsal)
----------------------------------------------------------------------------------------
[Fronty]                                [Marketplace health]              [Finance]
- Uzivatele ke schvaleni (5)            - Aktivni tikety: 20              - Payout ready: 3
- Tikety ke schvaleni (4)               - Rezervace dnes: 2               - Blokovane: 1
- Projekty k revizi (2)                 - Median TTR: 1.8 dne
----------------------------------------------------------------------------------------
[Recent activity / audit highlights]
```

---

## 3.2 Uživatelé *(LIST)*
**Cíl:** onboarding & governance — schválit/odmítnout brokery a developery.

### Low‑fi wireframe
```text
[H1: Uzivatele]                         [Tabs: Brokers | Developers | Vse]
------------------------------------------------------------------------------------------------
[Filters: stav (pending/approved/rejected) | datum | zdroj]
------------------------------------------------------------------------------------------------
[Table]
| Uzivatel | Role | Firma | Stav | Datum zadosti | Rizika/flagy | Akce |
| Jan Novak | Broker | ... | Pending | dnes | - | [Otevrit] [Schvalit] [Odmítnout] |
| Dev s.r.o.| Dev    | ... | Pending | vcera| chybí ICO | [Otevrit] [Schvalit] |
------------------------------------------------------------------------------------------------
```

---

## 3.3 Projekty *(LIST)*
**Cíl:** kontrola kvality supply + publikace (projekty/tikety), nastavování kapacit/SLA (pokud je admin vlastní).

### Low‑fi wireframe
```text
[H1: Projekty]                           [Tabs: Projekty | Tikety]  [CTA: Export]
------------------------------------------------------------------------------------------------
[Filters: stav | developer | broker lead | kompletace podkladu | SLA]
------------------------------------------------------------------------------------------------
[Table (projekty)]
| Projekt | Developer | Broker lead | Stav | # Tiketu | Akce |
| P-12    | Dev X     | -           | OK   | 2 | [Detail] |
| L-01    | -         | Broker Y    | Ceka na prirazeni | - | [Detail] [Priradit dev] |
------------------------------------------------------------------------------------------------
```

---

## 3.4 Rezervace *(LIST)*
**Cíl:** monitoring procesu, SLA a řešení eskalací / výjimek.

### Low‑fi wireframe
```text
[H1: Rezervace]
------------------------------------------------------------------------------------------------
[Tabs: Vse | Ceka na podpis | Aktivni | Jednani | Financovano | Breach]
[Filters: stav | SLA | developer | broker | tiket | datum]
------------------------------------------------------------------------------------------------
[Table]
| Rezervace | Tiket | Broker | Developer | Stav | SLA | Akce |
| #123      | T-55  | B1     | Dev X     | Ceka na podpis | 05:32 | [Detail] [Eskalace] |
| #120      | T-40  | B2     | Dev Y     | Jednani        | 3 dny | [Detail] |
------------------------------------------------------------------------------------------------
```

---

## 3.5 Platby a provize *(LIST)*
**Cíl:** evidovat financování (proof), vypočítat split a zajistit výplaty.

### Low‑fi wireframe
```text
[H1: Platby a provize]
------------------------------------------------------------------------------------------------
[Tabs: Financovani potvrzeno | Provize k vyplate | Vyplaceno | Sporne]
------------------------------------------------------------------------------------------------
[Table]
| Rezervace | GMV | Celkova provize | Split (B1/B2/Platf) | Stav | Proof | Akce |
| #120      | ... | ...             | 25/25/50             | Ready | OK | [Vytvorit vyplatu] |
------------------------------------------------------------------------------------------------
```

---

## 3.6 Pool program *(LIST/DASHBOARD)*
**Cíl:** spravovat účastníky a výpočty (pokud aktivní v MVP).

### Low‑fi wireframe
```text
[H1: Pool program]
------------------------------------------------------------------------------------------------
[Summary cards] # ucastniku | aktualni pravidla | posledni alokace
------------------------------------------------------------------------------------------------
[Table: Ucastnici]
| Ucastnik | Role | Tier | Body/Score | Poznamka | Akce |
------------------------------------------------------------------------------------------------
```

---

## 3.7 Audit log *(LIST)*
**Cíl:** dohledatelnost (kdo, kdy, co viděl/podepsal/změnil).

### Low‑fi wireframe
```text
[H1: Audit log]
------------------------------------------------------------------------------------------------
[Filters: entity type | entity id | user | event | date range]
------------------------------------------------------------------------------------------------
[Table]
| Cas | User | Event | Entity | Detail |
------------------------------------------------------------------------------------------------
```

---

## 3.8 Podpora a incidenty *(LIST/DETAIL)*
**Cíl:** řešit tickety, incidenty, eskalace SLA breach.

```text
[H1: Podpora a incidenty]                     [CTA: Zalozit incident]
------------------------------------------------------------------------------------------------
[Tabs: Pozadavky | Incidenty | SLA eskalace]
[Table]
| ID | Typ | Priorita | Stav | Owner | Akce |
------------------------------------------------------------------------------------------------
```

---

## 4) Operativní poznámky (low‑fi)
- Admin potřebuje **fronty + filtry + bulk akce**, ne „hezké karty“.
- SLA breach má být **alarmující** (červené štítky, notifikace), ale bez chaosu (jeden „SLA panel“).
- Audit log je klíčový pro důvěru a případné spory — musí být rychle prohledatelný.

