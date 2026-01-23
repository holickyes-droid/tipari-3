# Tipconnecta — Low‑fi (Developer)
**Verze:** v1.0  
**Datum:** 2026-01-23  
**Scope:** Low‑fidelity návrhy (desktop) pro **Dashboard + 1. úroveň navigace** (stránky hned pod dashboardem).

---

## 0) Mini IA legenda
- **DASHBOARD** = přehled + úkoly + SLA
- **LIST** = seznam entit (tabulka/karty) + filtry
- **DETAIL** = detail entity + stav + akce
- **FORM** = formulář (vytvoření/editace)

---

## 1) První úroveň navigace (Developer)
> Stránky dostupné v hlavní navigaci **přímo pod Dashboardem**.

1. **Projekty** *(LIST)*
2. **Rezervace (napříč tikety)** *(LIST)*
3. **Poplatky a provize platformě** *(LIST)*
4. **Nastavení profilu** *(FORM)*
5. **Podpora** *(LIST/DETAIL)*

---

## 2) Globální layout (Developer)
- **Topbar:** Logo | Globální hledání (Projekty/Tikety/Rezervace) | Notifikace | Profil
- **Sidebar:** Dashboard + 1. úroveň navigace
- **Kontextové akce:** často na úrovni projektu (vytvořit tiket) a rezervace (podepsat / potvrdit financování)

```text
+----------------------------------------------------------------------------------+
| TOPBAR: Logo | Search... | Notifications | Profile                                |
+----------------------+-----------------------------------------------------------+
| SIDEBAR              | PAGE HEADER: H1 + context actions                         |
| - Dashboard          |-----------------------------------------------------------|
| - Projekty           | CONTENT AREA                                              |
| - Rezervace          |                                                           |
| - Poplatky & provize |                                                           |
| - Nastaveni profilu  |                                                           |
| - Podpora            |                                                           |
+----------------------+-----------------------------------------------------------+
```

---

# 3) Low‑fi návrhy stránek (Developer)

## 3.1 Dashboard (Developer) — „Kdo čeká na podpis / potvrzení a co je v pipeline“
**Primární účel:** řídit rezervace a rychle dotahovat financování (SLA, podpisy, potvrzení financování).

**Klíčové bloky:**
1) **KPI strip**
- Aktivní rezervace (po podpisu)
- Rezervace čekající na podpis (48h)
- Tikety publikované / draft / čeká na schválení
- Financování potvrzené (30 dní) / GMV

2) **To‑do & SLA**
- „Podepsat balík“ (developer podpis)
- „Dodat podklady“ (pokud brzdí)
- „Potvrdit financování“ (form)

3) **Moje projekty (rychlý přehled)**
- poslední 5 projektů + status a počet tiketů

4) **Aktivity**
- audit feed: podpisy, aktivace rezervací, změny stavu, doplnění proof

**Low‑fi wireframe**
```text
[H1: Dashboard]                           [CTA: Vytvorit projekt] [CTA: Vytvorit tiket]
----------------------------------------------------------------------------------------
[KPI: Aktivni rezervace] [KPI: Ceka na podpis (48h)] [KPI: Tikety publikovane] [KPI: GMV]
----------------------------------------------------------------------------------------
[To-do & SLA]
- Rezervace #124: Podepsat do 18:20 (zbyva 11:38)             [Akce: Otevrit]
- Rezervace #120: Potvrdit financovani (cekame na proof)      [Akce: Potvrdit]
----------------------------------------------------------------------------------------
[Moje projekty - mini list]                         [Aktivity / audit feed]
- Projekt A (2 tikety, 1 rezervace)                 - 10:12 Investor podepsal balík
- Projekt B (draft)                                 - 09:40 Aktivovana rezervace #124
----------------------------------------------------------------------------------------
```

---

## 3.2 Projekty *(LIST)*
**Cíl uživatele:** spravovat projekty a jejich tikety (v detailu projektu).  
**Cíl byznysu:** zajistit kvalitní supply (tikety) a rychlý proces publikace/rezervace.

### Low‑fi wireframe
```text
[H1: Projekty]                                               [CTA: Vytvorit projekt]
------------------------------------------------------------------------------------------------
[Tabs: Vse | Draft | Ceka na schvaleni | Publikovano]
[Search] [Filters: stav | lokalita | typ projektu]
------------------------------------------------------------------------------------------------
[Table]
| Projekt | Stav | # Tiketu | # Rezervaci | Posledni aktivita | Akce |
| P-12    | Publikovano | 2 | 1 | vcera | [Otevrit] |
| P-18    | Draft       | 0 | 0 | dnes  | [Otevrit] |
------------------------------------------------------------------------------------------------
```

**Navigace na podstránky (2. úroveň)**
- Klik na řádek → **Projekt detail** (obsahuje: tikety v projektu, nastavení projektu, dokumenty)
- V projektu CTA „Vytvořit tiket“ → ticket form/stepper (mimo 1. úroveň)

---

## 3.3 Rezervace (napříč tikety) *(LIST)*
**Cíl uživatele:** vidět stav rezervací, podpisy, SLA a kroky k uzavření financování.  
**SLA:** podpis celého balíku do 48h (investor i developer).

### Low‑fi wireframe
```text
[H1: Rezervace]                         [Tabs: Vse | Ceka na podpis | Aktivni | Jednani | Financovano | Zruseno]
---------------------------------------------------------------------------------------------------------------
[Filters] Stav / Projekt / Tiket / Datum / SLA breach
---------------------------------------------------------------------------------------------------------------
[Table]
| Rezervace | Projekt | Tiket | Stav | SLA odpočet | Kdo je na tahu | Akce |
| #124      | P-12    | T-57  | Ceka na podpis | 11:38 | Developer | [Podepsat] [Otevrit] |
| #120      | P-10    | T-40  | Jednani        | 3 dny | Broker    | [Otevrit] |
| #118      | P-08    | T-33  | Aktivni        | 24 dny| Developer | [Potvrdit financovani] |
---------------------------------------------------------------------------------------------------------------
```

---

## 3.4 Poplatky a provize platformě *(LIST)*
**Cíl uživatele:** mít přehled o poplatcích/take‑rate platformy a o tom, co je splatné / uhrazené.

### Low‑fi wireframe
```text
[H1: Poplatky a provize platforme]
------------------------------------------------------------------------------------------------
[Summary cards] [Splatne] [Po splatnosti] [Uhrazeno (30d)] [Ocekavane]
------------------------------------------------------------------------------------------------
[Table]
| Obdobi | Projekt/Tiket | Zaklad (GMV) | Poplatek platforme | Stav | Splatnost | Doklad | Akce |
| 01/26  | P-12 / T-57   | ...          | ...                | Ceka | ...      | ...    | [Detail] |
------------------------------------------------------------------------------------------------
```

---

## 3.5 Nastavení profilu *(FORM)*
**Must‑have:** možnost více uživatelů na jednoho developera (správa účtů firmy).

### Low‑fi wireframe
```text
[H1: Nastaveni profilu]
------------------------------------------------------------------------------------------------
[Tabs: Firma a identita | Uzivatele firmy | Bankovni udaje | Notifikace]
------------------------------------------------------------------------------------------------
[Uzivatele firmy]
- Table: Jmeno | Email | Role | Stav pozvanky | Akce (pozvat, odebrat)
[CTA: Pozvat uzivatele]
```

---

## 3.6 Podpora *(LIST/DETAIL)*
- FAQ (proces rezervací, podpisy, podklady)
- Kontakt + ticketing

```text
[H1: Podpora]                                   [CTA: Napsat podporu]
------------------------------------------------------------------------------------------------
[FAQ accordion]
[My requests]
```

---

## 4) Psychologie & procesní jistota (low‑fi poznámky)
- Developer je „driver“ uzavření financování → **To‑do & SLA** musí dominovat dashboardu.
- V každém seznamu rezervací musí být jasně: **kdo je na tahu** + **kolik času zbývá**.
- „Poplatky a provize platformě“ má být transparentní a „bez překvapení“ (zvyšuje ochotu opakovat).

