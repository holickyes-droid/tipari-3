# Tipconnecta — Low‑fi (Admin / Platforma)
**Verze:** v2.0  
**Datum:** 2026-01-23  
**Scope:** Low‑fidelity návrhy (desktop) pro roli **Admin** – **všechny úrovně** (Dashboard + všechny podstránky ze sitemap).

---

## 0) Mini IA legenda
- **DASHBOARD** = systémový přehled + prioritní fronty + SLA alerty
- **LIST** = tabulka + filtry + bulk akce
- **DETAIL** = detail entity + rozhodnutí/akce + audit
- **FORM** = konfigurace / záznam (platba, payout, override)
- **TABS/SECTIONS** = detail rozdělený na logické bloky
- **DRAWER/MODAL** = rychlá akce s povinným důvodem (audit)

---

## 1) Navigace (1. úroveň pod Dashboardem)
**Prefix URL:** `/app/admin/...`

1. **Uživatelé** *(LIST)* → `/users/...`
2. **Projekty** *(LIST)* → `/projects`
3. **Rezervace** *(LIST)* → `/reservations`
4. **Platby a provize** *(LIST)* → `/payments` a `/payouts`
5. **Pool program** *(LIST/DASHBOARD)* → `/pool`
6. **Audit log** *(LIST)* → `/audit`
7. **Podpora a incidenty** *(LIST/DETAIL)* → `/support`

---

## 2) Globální layout (Admin)
- **Topbar:** Logo | Search (uživatel/projekt/tiket/rezervace) | Notifikace (SLA breach) | Profil
- **Sidebar:** Dashboard + 1. úroveň
- **Práce admina = fronty** → preferovat tabulky, filtry, bulk akce, jasné stavy

```text
+----------------------------------------------------------------------------------+
| TOPBAR: Logo | Search... | Notifications | Profile                                |
+----------------------+-----------------------------------------------------------+
| SIDEBAR              | PAGE HEADER: H1 + context actions + status chips          |
| - Admin dashboard    |-----------------------------------------------------------|
| - Uzivatele          | CONTENT AREA (queues / tables / detail panels)            |
| - Projekty           |                                                           |
| - Rezervace          |                                                           |
| - Platby a provize   |                                                           |
| - Pool program       |                                                           |
| - Audit log          |                                                           |
| - Podpora/incidenty  |                                                           |
+----------------------+-----------------------------------------------------------+
```

---

# 3) Stránky (Admin) — low‑fi

## 3.1 Admin dashboard *(DASHBOARD)* — `/dashboard`
**Účel:** operace + rizika v reálném čase.

**Bloky:**
1) SLA alerts: podpisy (48h), jednání (30 dní), expirace tiketů  
2) Fronty ke schválení: brokři, developeři, projekty/tikety, žádosti o úpravu tiketu  
3) Marketplace health: aktivní tikety, rezervace/den, time‑to‑reservation  
4) Finance: financování k ověření, provize po splatnosti, payout ready/blocked  
5) Audit highlights (poslední zásahy adminů)

```text
[H1: Admin dashboard]
----------------------------------------------------------------------------------------
[ALERT STRIP]
- 3 rezervace: podpis vyprsi do 2h
- 1 rezervace: SLA breach (investor nepodepsal)
- 5 tiketů: expiruje do 48h
----------------------------------------------------------------------------------------
[Queues]                                [Marketplace health]              [Finance]
- Brokers pending (5)                   - Aktivni tikety: 20              - Provize po splatnosti: 2
- Developers pending (2)                - Rezervace dnes: 2               - Payout ready: 3
- Tikety ke schvaleni (4)               - Median TTR: 1.8 dne             - Sporne: 1
- Zadosti o upravu (3)
----------------------------------------------------------------------------------------
[Recent admin actions / audit highlights]
```

---

## 3.2 Uživatelé *(LIST)* — `/users/brokers` a `/users/developers`
**Cíl:** onboarding & governance — schválit/odmítnout.

```text
[H1: Uzivatele]                      [Tabs: Brokers | Developers]
------------------------------------------------------------------------------------------------
[Filters: stav (pending/approved/rejected) | datum | region | rizika]
------------------------------------------------------------------------------------------------
[Table]
| Uzivatel | Role | Firma | Stav | Datum | Rizika/flagy | Akce |
| Jan Novak | Broker | ... | Pending | dnes | - | [Otevrit] [Schvalit] [Odmítnout] |
| Dev s.r.o.| Dev    | ... | Pending | vcera| chybi ICO | [Otevrit] [Schvalit] |
------------------------------------------------------------------------------------------------
```

### 3.2.1 Uživatel detail + schválení *(DETAIL)* — `/users/.../:userId`
**Sekce:**
- Účet (email, role, stav)
- Profil (dle role: broker vs developer; povinná pole)
- Smluvní potvrzení (checkboxy/čas) — rámcová smlouva, mlčenlivost, provizní podmínky…
- Rizika/flagy
- Audit (změny stavu)

**Akce:** Schválit / Odmítnout / Pozastavit / Požádat o doplnění (message)

```text
[H1: Uzivatel Jan Novak]   [Chip: Pending]      [CTA: Schvalit] [CTA: Odmitnout] [CTA: Pozastavit]
----------------------------------------------------------------------------------------------------
[TABS: Profil | Smlouvy/Consent | Rizika | Audit]
----------------------------------------------------------------------------------------------------
[Profil]
- Identita + kontakty
- Regiony
- U brokera: uroveň + sloty
- U developera: ICO, sidlo, opravnena osoba
----------------------------------------------------------------------------------------------------
[Smlouvy/Consent]
- Rámcová smlouva (status, datum)
- Mlčenlivost (status, datum)
- Provizní podmínky (status, datum)
----------------------------------------------------------------------------------------------------
[Audit]
- log změn stavů
```

**Odmítnutí (modal):** povinný důvod + poznámka.

---

## 3.3 Projekty *(LIST)* — `/projects` (+ volitelně `/tickets`)
**Cíl:** kontrola kvality supply + publikace + přiřazování leadů.

```text
[H1: Projekty]                         [Tabs: Projekty | Tikety | Leady]     [CTA: Export]
------------------------------------------------------------------------------------------------
[Filters: stav | developer | broker lead | kompletace podkladu | publikacni okno]
------------------------------------------------------------------------------------------------
[Table (projekty)]
| Projekt/Lead | Typ | Developer | Broker lead | Stav | # Tiketu | Akce |
| P-12         | Rezidencni | Dev X | - | OK | 2 | [Detail] |
| L-01         | ...        | -     | Broker Y | Ceka na prirazeni | - | [Detail] [Priradit dev] |
------------------------------------------------------------------------------------------------
```

### 3.3.1 Projekt detail + schválení/publikace *(DETAIL)* — `/projects/:projectId`
**TABS:** Přehled | Tikety | Dokumenty & viditelnost | Publikace | Audit

```text
[H1: Projekt P-12]   [Chip: Ceka na schvaleni]    [CTA: Schvalit] [CTA: Zamitnout] [CTA: Skryt]
------------------------------------------------------------------------------------------------
[TABS: Prehled | Tikety | Dokumenty | Publikace | Audit]
------------------------------------------------------------------------------------------------
[Prehled]
- Nazev, lokalita, typ, popis
- Developer profil summary
------------------------------------------------------------------------------------------------
[Dokumenty]
- seznam dokumentů + nastavení viditelnosti (predrezervacni / odemknute / interni)
------------------------------------------------------------------------------------------------
[Publikace]
- nastaveni publikacniho okna (od/do)
- policy: co se maskuje / kdy se odemkne
```

### 3.3.2 Tiket detail (admin) *(DETAIL)* — `/tickets/:ticketId`
**TABS:** Přehled | Kapacita & SLA | Provize (nastavení) | Rezervace/Fronta | Žádosti o úpravu | Audit

```text
[H1: Tiket T-55] [Chip: Ceka na schvaleni]        [CTA: Schvalit a zverejnit] [CTA: Skryt] [CTA: Expirovat]
-----------------------------------------------------------------------------------------------------------
[TABS: Prehled | Kapacita&SLA | Provize | Rezervace | Upravy | Audit]
-----------------------------------------------------------------------------------------------------------
[Kapacita & SLA]
- Kapacita rezervaci na tiketu (N)
- Pravidlo konkurence (fronta)
- SLA investor (balik): 48h (nastavitelne)
- SLA developer podpis: 48h (nastavitelne)
- Jednani/funding: 30 dni (nastavitelne)
- Provize splatnost: 14 dni (nastavitelne)
-----------------------------------------------------------------------------------------------------------
[Provize]
- Castka provize platformy (Kc) + (volitelne %)
- Split platf/broker1/broker2 (sum 100)
-----------------------------------------------------------------------------------------------------------
```

**Admin akce (s povinným důvodem):**
- změna SLA/kapacity
- skrytí/re‑open
- výjimka změny tiketu při aktivních rezervacích
- ruční změna stavu

---

## 3.4 Rezervace *(LIST)* — `/reservations`
**Cíl:** monitoring procesu, SLA a řešení eskalací/výjimek.

```text
[H1: Rezervace]
------------------------------------------------------------------------------------------------
[Tabs: Vse | Ceka na podpis | Ve fronte | Aktivni | Jednani | Financovano | Breach]
[Filters: stav | SLA | developer | broker | tiket | datum]
------------------------------------------------------------------------------------------------
[Table]
| Rezervace | Tiket | Broker | Developer | Stav | Kapacita | Deadline | Akce |
| R-123     | T-55  | B1    | Dev X     | Ceka na podpis investora | - | 05:32 | [Detail] [Eskalace] |
| R-120     | T-40  | B2    | Dev Y     | Jednani | - | 3 dny | [Detail] |
------------------------------------------------------------------------------------------------
```

### 3.4.1 Rezervace detail + zásahy *(DETAIL)* — `/reservations/:reservationId`
**TABS:** Přehled | Dokumenty & podpisy | Kapacita/fronta | Financování & provize | Audit

```text
[H1: Rezervace R-123]   [Chip: Ceka na podpis investora]   [Deadline: 05:32]
[CTA: Prodlouzit SLA] [CTA: Zrusit rezervaci] [CTA: Zmenit stav (override)]
------------------------------------------------------------------------------------------------
[TABS: Prehled | Dokumenty | Kapacita | Financovani | Audit]
------------------------------------------------------------------------------------------------
[Prehled]
- kontext tiketu/projektu
- ucastnici (broker, investor, developer)
- timeline milniku
------------------------------------------------------------------------------------------------
[Dokumenty]
- Souhlas / NDA / Rezervacni smlouva (statusy, timestamps)
- eSign envelope info
------------------------------------------------------------------------------------------------
[Kapacita]
- Poradi rezervace na tiketu
- V kapacite ANO/NE + duvod
- Moznost rucne “prehodit” (jen s duvodem) (spise výjimečně)
------------------------------------------------------------------------------------------------
[Financovani]
- potvrzeni financovani (kdo vlozil, castka, datum, proof)
- vazba na provizi
```

**Override pattern (modal):**
- povinný důvod (číselník) + poznámka
- náhled dopadu (“co to udělá s provizí a payout”)

---

## 3.5 Platby a provize *(LIST)* — `/payments` a `/payouts`
Rozdělit na dvě hlavní stránky (2 taby v jedné sekci nebo dvě položky v menu).

### 3.5.1 Přijaté platby (developer → platforma) *(LIST)* — `/payments`
```text
[H1: Platby od developeru]
------------------------------------------------------------------------------------------------
[Filters: stav | po splatnosti | developer | datum]
------------------------------------------------------------------------------------------------
[Table]
| Platba | Provize | Developer | Castka | Splatnost | Stav | Proof | Akce |
| PAY-01 | C-120   | Dev Y     | ...    | ...      | Ceka | -     | [Detail] [Potvrdit prijem] |
------------------------------------------------------------------------------------------------
```

### 3.5.2 Výplaty brokerům (platforma → broker) *(LIST)* — `/payouts`
```text
[H1: Vyplaty brokerum]
------------------------------------------------------------------------------------------------
[Filters: stav | broker | datum]
------------------------------------------------------------------------------------------------
[Table]
| Vyplata | Broker | Castka | Obdobi | Stav | Doklady | Akce |
| OUT-01  | Broker X | ... | 01/26 | Ready | 2 faktury | [Detail] [Oznacit odeslano] |
------------------------------------------------------------------------------------------------
```

### 3.5.3 Detail platby / výplaty *(DETAIL)* — `/payments/:paymentId` a `/payouts/:payoutId`
**Platba detail:** kontext provize, instrukce, proof, audit, status.  
**Výplata detail:** seznam provizí zahrnutých ve výplatě, doklady, bank info, potvrzení odeslání.

---

## 3.6 Pool program *(LIST/DASHBOARD)* — `/pool`
**Admin funkce:** zapnout/vypnout, nastavit parametry, sledovat kvalifikované, export.

```text
[H1: Pool program]
------------------------------------------------------------------------------------------------
[Card: Aktivni?] [Toggle ON/OFF]
[Card: Parametry] procento do poolu | meta 1 | meta 2 | limit kvalifikovanych | pravidlo rollover
[CTA: Ulozit parametry]
------------------------------------------------------------------------------------------------
[Section: Aktualni obdobi]
- progress k meta 1/meta 2
- seznam kvalifikovanych (anonym label + obrat + cas dosazeni)
[CTA: Export do CSV]
------------------------------------------------------------------------------------------------
[Section: Historie obdobi]
```

---

## 3.7 Audit log *(LIST)* — `/audit`
```text
[H1: Audit log]
------------------------------------------------------------------------------------------------
[Filters: entity type | entity id | user | event | date range]
------------------------------------------------------------------------------------------------
[Table]
| Cas | User | Event | Entity | Detail |
------------------------------------------------------------------------------------------------
```

**Audit detail (drawer):** ukázat “před/po” shrnutí, důvod zásahu, odkazy na entity.

---

## 3.8 Podpora a incidenty *(LIST/DETAIL)* — `/support`
```text
[H1: Podpora a incidenty]                     [CTA: Zalozit incident]
------------------------------------------------------------------------------------------------
[Tabs: Pozadavky | Incidenty | SLA eskalace]
[Table]
| ID | Typ | Priorita | Stav | Owner | Akce |
------------------------------------------------------------------------------------------------
```

---

## 4) Operativní poznámky
- Každý **admin override** = povinný důvod + audit (bez výjimek).
- U tiketů a rezervací vždy jasně vidět: **kapacita**, **fronta**, **deadline**, **kdo je na tahu**.
- Finance sekce musí být “účetně čitelná” (IDs, VS, doklady, timestamps).
