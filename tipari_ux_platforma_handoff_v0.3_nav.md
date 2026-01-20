# Tipari.cz – UX Handoff Package (v0.3) – Platforma (web + responsive)

> **Určeno pro:** UI designéry + FE (handoff)  
> **Způsob čtení:** 1) IA & flows → 2) Obrazovky → 3) Mikrocopy/Notifikace → 4) Acceptance criteria → 5) Event tracking  
> **Datum:** 2026-01-20  
> **Autor:** Tipari Product & Design Council (simulace)

---

## Role, které přispěly (Tipari Product & Design Council)
1. **Facilitátor / Head of Product** – scope, prioritizace, trade‑offy, rozhodnutí/TBD
2. **UX Lead / Service Designer** – celkový koncept, toky, service blueprint v kostce
3. **Information Architect** – navigace, taxonomie, struktura seznamů
4. **Interaction Designer** – wireframy, stavy, edge‑cases, komponentové chování
5. **UX Writer (mikrocopy)** – texty, chyby, empty states, transparentní vysvětlení
6. **Behavioral Psychologist + Ethics/Trust reviewer** – frikce, jistota, férovost, prevence chyb
7. **Data / Product Analyst** – KPI, event tracking, funnel, měření úspěchu

---

## Zdroj pravdy (data & pravidla)
- **Primární (data + business logika):** `Tipari_Souhrn_Dat_DATA_v1.7.md` (DATA UZAMČENA)  
- **Doplňkový (proces podpisů včetně fyzického scanu):** `Tipari_Souhrn_Dat_a_Pravidel_DATA_v1.3_LOCKED.md` (DATA UZAMČENA)

> ⚠️ **Pozor na konflikt:** v1.7 uvádí „podpis výhradně elektronicky přes eSign“, zatímco v1.3 obsahuje i variantu fyzického podpisu + nahrání scanů. V tomto UX návrhu počítáme s **možností fyzického podpisu** (protože to vyžaduje zadání), ale v sekci **TBD** je vyznačeno, že je potřeba **sjednotit kanonická data** (jinak se rozjede implementace a UX).

---

# 1) Executive summary + scope
1. **Horní navigace je fixní** dle zadání: Logo + **Tikety, Rezervace, Provize, Investoři, Přehled, Notifikace, Profil**.
2. Primární “money flow” platformy je: **Tiket → Rezervace → (Souhlas+NDA) → Rezervační smlouva → Kapacita/fronta → Rozhodnutí developera → Financování → Provize → Fakturace**.
3. **Maskování identit** je zásadní: před Souhlas+NDA jsou některé údaje maskované; po podpisu Souhlas+NDA se odemknou (role‑based).
4. **Rezervace je multi‑step** a musí podporovat:  
   - náhled vzorů dokumentů (Souhlas, NDA, Rezervační smlouva),  
   - **inline založení nového investora** přímo ve wizardu,  
   - **fyzický podpis** Souhlas+NDA (upload) a až následně Rezervační smlouvu (upload).
5. **Kapacita tiketu se počítá až po podpisu Rezervační smlouvy investorem** (ne po Souhlas+NDA). To musí být explicitně vysvětleno obchodníkovi i developerovi.
6. **Provize & fakturace musí mít přehled pro všechny strany**, ale s role‑based viditelností (broker vidí jen svoje částky, developer vidí svoji platbu platformě, admin vidí vše).
7. UI musí být **anti‑error**: jasné “co teď”, SLA odpočty, potvrzovací dialogy u citlivých akcí, auditní stopa, návrat zpět do rozpracované rezervace.
8. MVP doporučení: **jedna “Rezervační timeline”** (Detail rezervace) jako single source of truth pro aktuální stav a další krok.

**Scope (MVP):**
- Webová aplikace Tipari.cz pro role **Obchodník, Developer, Admin**.  
- Investor je obsloužen přes **e-mail + eSign** (bez účtu v platformě).

---

# 2) Předpoklady + TBD + rizika

## Předpoklady
- Platforma je primárně web (desktop), ale musí být **plně použitelná na mobilu** (responsive).
- Investor **nemá účet** a všechny podpisy řeší přes odkaz v e-mailu (eSign / fyzický podpis podle varianty).
- Notifikace jsou minimálně **in‑app + e-mail** pro kritické kroky.

## TBD (max 7) – rozhodnutí pro PO / implementaci
1. **Podpisy: eSign-only vs. hybrid (eSign + fyzický scan)** – nutné sjednotit v kanonickém datovém dokumentu (v1.7 vs v1.3).  
2. **SLA hodnoty**: v různých částech podkladů se objevuje 24h i 48h; UX je navržen tak, aby vždy zobrazil konkrétní SLA z tiketu.  
3. **Zobrazení fronty**: smí obchodník vidět anonymizovaný počet rezervací ve frontě / kapacitě? (užitečné pro rozhodování, může ale leakovat aktivitu).  
4. **Investor e-mailové texty**: mají obsahovat název projektu/developera už ve výzvě k Souhlas+NDA, nebo až po podpisu? (právní & obchodní dopad).  
5. **Vstupní pole “Částka rezervace”**: je vždy povinná při vytvoření rezervace? (podklady zmiňují “investice”, ale kanonické pole je potřeba potvrdit).  
6. **Zrušení rezervace obchodníkem**: kdy je povoleno a s jakými důsledky? (vazba na pořadí ve frontě a kapacitu).  
7. **Dokumentové šablony**: kde se spravují (Admin/Profil?) a zda existuje verzeování šablon.

## Rizika
- **Nesoulad kanonických dokumentů** (podpisy) může vést k implementačnímu dluhu a nespolehlivým stavům.
- Příliš komplexní wizard bez dobrého “resume” zhorší dokončení (obchodníci často přerušují práci).
- Nejasná pravidla viditelnosti provizí/faktur mohou narušit důvěru.

---

# 3) Persony / role (stručně)
1. **Obchodník (broker/tipař)** – chce rychle vytvořit rezervaci pro investora, hlídat SLA, vyhrát kapacitu, a mít jasné “co teď”.
2. **Developer** – chce vidět relevantní rezervace (až když může jednat), rychle rozhodnout (podepsat/odmítnout), a mít přehled o platbách provize platformě.
3. **Admin** – audit, řešení sporů, správa tiketů/uživatelů, schvalování faktur, evidence.
4. **Investor (bez účtu)** – chce jednoduchý podpis, jasné vysvětlení, proč podepisuje Souhlas+NDA, a kontakt na obchodníka.

---

# 4) User flow (happy path + edge cases)

## 4.1 Happy path (broker → investor → developer)
1. **Broker** otevře **Tiket** → klikne **Vytvořit rezervaci**
2. Ve wizardu vybere nebo založí investora → zvolí způsob podpisu dokumentů → odešle
3. **Investor** podepíše **Souhlas + NDA** (eSign / fyzicky nahráno brokerem)
4. Platforma **odemkne identitu** (developer uvidí investora a brokera, broker uvidí odemčené detaily)
5. Investor podepíše **Rezervační smlouvu**
6. Pokud je rezervace v pořadí, vstoupí do **kapacity** tiketu → **developer** dostane výzvu k rozhodnutí
7. Developer **podepíše / odmítne** (podepsání aktivuje jednání)
8. Po financování a potvrzení se spustí **provize & fakturace**: developer platí platformě, broker fakturuje platformě, admin schvaluje.

## 4.2 Edge cases (nejdůležitější)
- Investor nepodepíše Souhlas+NDA včas → rezervace expirována → broker může zkusit znovu.
- Investor podepíše Souhlas+NDA, ale nepodepíše Rezervační smlouvu → expirováno.
- Rezervace podepsána investorem, ale **není v kapacitě** (čeká ve frontě) → broker vidí pořadí + odhad, developer nic nevidí.
- Developer odmítne → další rezervace ve frontě se posune do kapacity.
- Tiket expiroval / publikace skončila → nelze vytvářet nové rezervace (jen dojet rozpracované? TBD).
- Broker nahraje špatný dokument (nečitelný / nesprávný) → admin/broker musí mít možnost nahrát znovu + audit.

---

# 5) IA / Navigace (fixní horní menu)

## 5.1 Horní menu (dle zadání)
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [Logo]  Tikety  Rezervace  Provize  Investoři  Přehled  Notifikace  Profil   │
└──────────────────────────────────────────────────────────────────────────────┘
```

## 5.2 Doporučená struktura (podstránky)
> Pozn.: položky mohou být role‑based (např. Developer nemusí mít Investoři). Pokud musí být menu 100% stejné pro všechny role, skryté věci se nahradí stránkou “Nemáte oprávnění”.

1) **Tikety**
- /tickets (Seznam)
- /tickets/[TiketID] (Detail)
- (Admin) /tickets/[TiketID]/audit (volitelně jako záložka v detailu)

2) **Rezervace**
- /reservations (Seznam)
- /reservations/[RezervaceID] (Detail)
- /reservations/new (spouští wizard; v praxi modal nad tiketem)

3) **Provize**
- /commissions (Přehled)
- /commissions/[ID] (Detail provize / fakturace)

4) **Investoři**
- /investors (Seznam)
- /investors/[InvestorID] (Detail)
- /investors/new (použije se i jako inline drawer ve wizardu)

5) **Přehled**
- /overview (Dashboard – úkoly + metriky)
- (Admin) /overview/admin (správa – volitelně jako sekce v dashboardu)

6) **Notifikace**
- /notifications (Centrum)
- /notifications/settings (volitelně v Profilu)

7) **Profil**
- /profile (Můj účet, firma, nastavení, bezpečnost)
- (Admin) /profile/admin-settings (pokud nechceme extra menu)

---

# 6) Seznam obrazovek (MVP)

## Globální
- **GL-01** Shell + Horní navigace + breadcrumb + systém hlášek/toastů
- **GL-02** Modal: Rezervační wizard (multi‑step) + (volitelně) drawer “Nový investor”
- **GL-03** Modal: Náhled dokumentu (PDF viewer)

## Tikety
- **TI-01** Tikety – seznam
- **TI-02** Tiket – detail

## Rezervace
- **RE-01** Rezervace – seznam
- **RE-02** Rezervace – detail (role‑based varianty)

## Provize
- **PR-01** Provize – přehled
- **PR-02** Provize – detail / fakturační krok

## Investoři
- **IN-01** Investoři – seznam
- **IN-02** Investor – detail
- **IN-03** Investor – vytvořit/upravit (drawer / stránka)

## Přehled
- **OV-01** Přehled – dashboard

## Notifikace
- **NO-01** Notifikace – centrum

## Profil
- **PF-01** Profil – nastavení účtu

---

# 7) Specifikace obrazovek (wireframe + data + stavy + mikrocopy)

> Konvence v textu: proměnné uvádíme jako `[Proměnná]` (např. `[Číslo tiketu]`).

---

## GL-01 Shell + Horní navigace

### Účel
Konzistentní rámec pro všechny obrazovky, rychlá orientace a přístup k notifikacím.

### Rozhodovací údaje
- Aktivní sekce (highlight v menu)
- Počet nepřečtených notifikací
- Role uživatele (ne nutně viditelně, ale v profilu)

### Layout (ASCII)
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [Logo]  Tikety  Rezervace  Provize  Investoři  Přehled  Notifikace  Profil   │
├──────────────────────────────────────────────────────────────────────────────┤
│ Breadcrumb: [Sekce] / [Detail]                                               │
├──────────────────────────────────────────────────────────────────────────────┤
│ Page Header: [Název obrazovky]                     [Primární CTA]           │
│ Subheader:  krátké vysvětlení / filtr / stav                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                                                  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Komponenty
- TopNavItem (default/active/hover/focus)
- Badge (count)
- Breadcrumb
- Toast (success/error/info)
- Global “Help” link (doporučení: v Profilu)

### Stavy
- Offline / server error banner (non-blocking + retry)

### Mikrocopy
- Notifikace badge: „[Počet]“
- Globální error: „Něco se nepovedlo. Zkuste to znovu.“

---

## GL-02 Rezervační wizard (modal, multi‑step)

### Účel
Proobchodní vytvoření rezervace s minimem kroků, ale s podporou:
- výběr / založení investora inline,
- náhled vzorů dokumentů,
- eSign i fyzický podpis (scan upload),
- jasné “co se stane dál”.

### Kritická pravidla (musí být v UI explicitně)
- Bez Souhlas+NDA se **neodemknou identitní údaje** (ochrana dat).
- Kapacita/fronta se řeší **až po podpisu Rezervační smlouvy investorem**.
- Čas nahrání scanu může určovat pořadí ve frontě (u fyzického podpisu).

### Layout – Stepper (doporučená struktura)
> Doporučení: wizard jako **full-screen modal** na desktopu, na mobilu jako plná stránka.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [X Zavřít]  Vytvořit rezervaci – tiket [Číslo tiketu]                         │
│ Krok 1/4  Investor  →  Souhlas+NDA  →  Rezervační smlouva  →  Hotovo          │
├──────────────────────────────────────────────────────────────────────────────┤
│ Levý panel (shrnutí tiketu)        │ Pravý panel (obsah kroku)               │
│ - [TiketID] [Typ] [Stav]           │                                         │
│ - [Cílová částka]                  │                                         │
│ - [Min investice]                  │                                         │
│ - [SLA investora] / [SLA dev]      │                                         │
│ - Kapacita: [X] (info)             │                                         │
│------------------------------------│-----------------------------------------│
│ Transparentní vysvětlení           │                                         │
│ „Detaily projektu se odemknou      │                                         │
│  po podpisu Souhlasu + NDA.“       │                                         │
├──────────────────────────────────────────────────────────────────────────────┤
│ [Zpět]                                         [Pokračovat] / [Odeslat]      │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Krok 1: Investor (vybrat / založit)
**Rozhodovací údaje:** správný investor, kontaktní e-mail, základní způsobilost (min investice / preference – volitelně).

**UI prvky:**
- SearchSelect: „Vyberte investora“
- Secondary CTA: „+ Nový investor“
- (Volitelně) pole „Předpokládaná investice“ (TBD – závisí na kanonickém poli)

**Inline vytvoření investora (drawer):**
- Otevře se z wizardu bez ztráty kontextu.
- Po uložení se investor automaticky předvybere.

### Krok 2: Souhlas + NDA
**Rozhodovací údaje:** způsob podpisu, SLA, jaké údaje se po podpisu odemknou.

**UI prvky:**
- Dokumenty (2 položky):  
  - „Souhlas se sdílením údajů“ (Preview / Download)  
  - „NDA“ (Preview / Download)  
- Volba metody:  
  - (A) „Odeslat k e‑podpisu“  
  - (B) „Mám fyzicky podepsáno → nahraju scan“  

**Pokud e‑podpis:**
- Button: „Odeslat investorovi“  
- Text: „Investor obdrží e-mail s odkazem na podpis. Lhůta: [SLA].“

**Pokud fyzicky:**
- Upload 2 souborů: „Nahrát Souhlas (PDF/JPG)“ + „Nahrát NDA (PDF/JPG)“  
- Info: „Čas nahrání se použije jako čas podpisu pro audit a případně pořadí.“

### Krok 3: Rezervační smlouva
**Rozhodovací údaje:** opět metoda podpisu, a hlavně upozornění na frontu/kapacitu.

**UI prvky:**
- Dokument: „Rezervační smlouva“ (Preview / Download)
- Metoda: e‑podpis / fyzicky + upload
- Explicitní info box:
  - „Po podpisu Rezervační smlouvy se určí pořadí ve frontě.“
  - „Do kapacity se dostane jen [Kapacita] rezervací; ostatní čekají.“

### Krok 4: Hotovo
**Obsah:**
- Confirmation + “Next steps” timeline
- CTA: „Přejít na detail rezervace“
- Secondary: „Zpět na tiket“

**Timeline text (ukázka):**
1) Čekáme na podpis investora (Souhlas+NDA)  
2) Čekáme na podpis investora (Rezervační smlouva)  
3) Pokud budete v pořadí, developer rozhodne do [SLA dev]

### Stavy wizardu
- Loading: načítání investorů / odesílání e-mailu / upload
- Error: nevalidní soubor, selhání eSign, vypršel tiket
- Resume: „Rezervace je rozpracovaná“ → tlačítko „Pokračovat“

### Mikrocopy (klíčové)
- Primární CTA:
  - krok 1: „Pokračovat“
  - krok 2/3: „Odeslat investorovi“ / „Uložit dokumenty“
  - hotovo: „Přejít na detail rezervace“
- Transparentní vysvětlení (krok 2):
  - „Souhlas a NDA chrání investora i developera. Bez nich nemůžeme sdílet identitu stran.“

### Přístupnost
- Stepper musí být čitelný i bez barvy (text + čísla kroku)
- Uploady musí mít label + popis podporovaných formátů + chyby v textu
- Modal: trap focus, ESC zavírá (s varováním při neuložených změnách)

---

## GL-03 Modal: Náhled dokumentu (PDF viewer)

### Účel
Bezpečný náhled vzoru nebo vygenerované verze dokumentu.

### Layout (ASCII)
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [← Zpět]  Náhled: [Název dokumentu]                    [Stáhnout PDF] [X]    │
├──────────────────────────────────────────────────────────────────────────────┤
│ [PDF VIEWER AREA]                                                            │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Stavy
- Loading skeleton
- Error: „Dokument se nepodařilo načíst. Zkuste to znovu.“

---

## TI-01 Tikety – seznam

### Účel
Rychle vybrat vhodný tiket a přejít do detailu.

### Rozhodovací údaje
- Stav tiketu (zveřejněný/uzavřený/…)
- Parametry: typ, cílová částka, min investice, výnos, splatnost, kapacita a publikační okno (pokud je relevantní)

### Layout (ASCII)
```
┌─ TopNav ─────────────────────────────────────────────────────────────────────┐
│ Tikety                                                                       │
│ [Vyhledat tiket] [Filtry ▾]                         [Export? (Admin)]        │
├──────────────────────────────────────────────────────────────────────────────┤
│ Filtry: Stav ▾  Typ ▾  Publikační okno ▾  Min investice ▾  Výnos ▾            │
├──────────────────────────────────────────────────────────────────────────────┤
│ TABULKA / KARTY                                                              │
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ [Číslo tiketu] [Typ] [Stav] [Kapacita] [Min investice] [Výnos] [Splatnost]│ │
│ │ [Projekt*] [Developer*] (maskované dle pravidel)                           │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Komponenty
- FilterBar + chips
- TicketRow (table) / TicketCard (mobile)
- StatusBadge
- CapacityBadge (např. “Kapacita 2”)

### Data mapping (z kanonického slovníku)
- `[Číslo tiketu]`, `[Typ tiketu]`, `[Stav tiketu]`
- `[Kapacita rezervací]`, `[Publikační okno]`
- `[Cílová částka]`, `[Minimální investice]`, `[Předpokládaný výnos]`, `[Doba splatnosti]`
- `[Projekt]` a `[Developer]` mohou být maskované do odemknutí

### Stavy
- Empty: „Nejsou k dispozici žádné tikety podle zadaných filtrů.“
- Error: „Tikety se nepodařilo načíst.“

### Mikrocopy
- CTA v řádku: „Detail“
- Tooltip u maskování: „Zobrazí se po podpisu Souhlasu + NDA investorem.“

---

## TI-02 Tiket – detail

### Účel
Vyhodnotit tiket a vytvořit rezervaci.

### Rozhodovací údaje
- Klíčové parametry tiketu + SLA + kapacita
- Co je maskované a proč
- Jestli lze vytvořit rezervaci (stav tiketu + publikační okno)

### Layout (ASCII)
```
┌─ TopNav ─────────────────────────────────────────────────────────────────────┐
│ Tiket [Číslo tiketu]  [Stav badge]                    [Vytvořit rezervaci]   │
│ [Projekt*] / [Developer*] (maskované dle stavu)                               │
├──────────────────────────────────────────────────────────────────────────────┤
│ KPI pás:  [Cílová částka]  [Min investice]  [Výnos]  [Splatnost]  [Kapacita] │
├──────────────────────────────────────────────────────────────────────────────┤
│ Sekce: Parametry tiketu                                                      │
│ - Typ: [Typ tiketu]                                                          │
│ - Dlužník: [Dlužník]                                                         │
│ - ...                                                                        │
├──────────────────────────────────────────────────────────────────────────────┤
│ Sekce: Dokumenty / Materiály (pokud existují)                                │
│ [Dokument 1] [Náhled] [Stáhnout]                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ Sekce: Moje rezervace k tomuto tiketu (jen broker)                           │
│ - [RezervaceID] [Stav] [Další krok]                                          │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Komponenty
- Header + Primary CTA
- KPI cards
- Sections (accordion na mobile)
- MyReservationCard

### Stavy
- CTA “Vytvořit rezervaci” disabled + vysvětlení:
  - „Tiket není zveřejněný / publikační okno skončilo.“

### Mikrocopy (prodejní, ale férové)
- Info box:
  - „Detaily projektu a developera se odemknou až po podpisu Souhlasu a NDA investorem.“

---

## RE-01 Rezervace – seznam

### Účel
Jedno místo pro řízení rozpracovaných i aktivních rezervací (hlavně SLA a další krok).

### Rozhodovací údaje
- Stav rezervace + další akce
- SLA odpočty (investor/developer)
- Je rezervace v kapacitě / ve frontě

### Layout (ASCII)
```
┌─ TopNav ─────────────────────────────────────────────────────────────────────┐
│ Rezervace                                             [Nová rezervace +]     │
│ Filtry: Stav ▾  Tiket ▾  Datum ▾  Jen moje? (admin)                           │
├──────────────────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ [RezervaceID] [Tiket] [Investor] [Stav] [SLA] [Kapacita/fronta] [Akce]     │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Role‑based poznámky
- **Broker**: vidí svoje rezervace; u těch před Souhlas+NDA jsou některé údaje maskované.
- **Developer**: vidí rezervace až po odemknutí a hlavně ty, které jsou v kapacitě (doporučení: default filtr „V kapacitě“).
- **Admin**: vidí vše + pokročilé filtry.

### Stavy
- Empty: „Zatím nemáte žádné rezervace.“
- Empty s CTA: „Přejít na tikety“

---

## RE-02 Rezervace – detail (univerzální “timeline”)

### Účel
Single source of truth: status, dokumenty, další krok, audit, a prolink na provize.

### Rozhodovací údaje
- Kdo má teď udělat akci (investor vs developer vs admin)
- Jaký dokument chybí
- Zbývající čas (SLA)
- Jestli je rezervace v kapacitě / ve frontě
- Stav provize (informativně; role‑based částky)

### Layout (ASCII)
```
┌─ TopNav ─────────────────────────────────────────────────────────────────────┐
│ Rezervace [RezervaceID]   [Stav badge]             [Akce dle role]           │
│ Tiket: [Číslo tiketu]   Investor: [mask/unmask]   Developer: [mask/unmask]   │
├──────────────────────────────────────────────────────────────────────────────┤
│ TIMELINE (vertikální)                     │ Pravý panel (detaily)            │
│ 1) Vytvořeno                               │ - SLA: [odpočet]                 │
│ 2) Odesláno investorovi (Souhlas+NDA)      │ - Kapacita/fronta: [stav]        │
│ 3) Souhlas+NDA podepsáno                   │ - Dokumenty (preview/download)   │
│ 4) Odesláno investorovi (Rezervační sml.)  │ - Provize & fakturace (snapshot) │
│ 5) Podepsáno investorem                    │ - Audit log                       │
│ 6) V kapacitě → čeká developer             │                                  │
│ 7) Developer podepsal / odmítl             │                                  │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Komponenty
- StatusBadge + SLA countdown chip
- TimelineItem (state + timestamp + actor)
- DocumentListItem (locked/unlocked)
- ActionBar (role‑based)
- AuditLog (table)

### Dokumenty v detailu (3 položky)
- Souhlas se sdílením údajů (stav: čeká / potvrzen)
- NDA (stav: čeká / potvrzen)
- Rezervační smlouva (stav: čeká / potvrzen; pro developera dostupná až v kapacitě)

### Role‑based akce (příklady)
**Broker**
- „Znovu odeslat odkaz investorovi“ (eSign)
- „Nahrát scan Souhlas/NDA“ (pokud fyzicky)
- „Nahrát scan Rezervační smlouvy“ (pokud fyzicky)
- „Zrušit rezervaci“ (TBD – pravidla)

**Developer**
- Pokud „V kapacitě“: „Podepsat / Odmítnout“ (přesměruje na eSign)
- Pokud mimo kapacitu: žádná akce, jen info

**Admin**
- “Označit incident”, “Zobrazit kompletní audit”
- “Schválit/Zamítnout fakturu obchodníka” (v provizích)

### Stavy
- Loading skeleton (timeline + dokumenty)
- Error state s retry
- Empty dokument (neexistuje soubor): „Dokument zatím není k dispozici.“

### Mikrocopy (klíčové)
- Locked doc (developer): „Dokument se zpřístupní po vstupu rezervace do kapacity.“
- Fronta: „Rezervace čeká ve frontě. Pořadí se určuje podle času podpisu investora (u scanu podle času nahrání).“

### Přístupnost
- Timeline jako seznam (UL/LI) + aria-current pro aktivní krok
- Countdown nesmí být jen barvou, vždy i text “zbývá 03:12:45”

---

## PR-01 Provize – přehled

### Účel
Přehled provizí a navazujících fakturačních kroků (role‑based).

### Rozhodovací údaje
- Stav provize (kanonické číselníky)
- Kdo má udělat další krok (developer platba / broker faktura / admin schválení)

### Layout (ASCII)
```
┌─ TopNav ─────────────────────────────────────────────────────────────────────┐
│ Provize                                                                       │
│ Filtry: Stav ▾  Tiket ▾  Datum ▾                                             │
├──────────────────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ [Tiket] [Rezervace] [Moje částka] [Stav] [Další krok] [Akce]               │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Role‑based viditelnost (doporučení)
- Broker: sloupec **Moje provize** + stav; nevidí cizí provize.
- Developer: sloupec **Provize platformy k úhradě** + platební údaje.
- Admin: vidí oboje + může měnit stavy po kontrole.

### Stavy
- Empty: „Zatím nevznikly žádné provize.“
- Info: „Nárok na provizi vzniká až po potvrzeném financování.“

---

## PR-02 Provize – detail / fakturace

### Účel
Dovést uživatele k dalšímu kroku (zaplatit / nahrát fakturu / schválit).

### Layout (ASCII)
```
┌─ TopNav ─────────────────────────────────────────────────────────────────────┐
│ Provize – tiket [Číslo tiketu]   [Stav provize badge]                        │
├──────────────────────────────────────────────────────────────────────────────┤
│ Levý: Shrnutí                                │ Pravý: Akce dle role          │
│ - Rezervace: [RezervaceID]                   │ (Developer)                   │
│ - Částka platformy: [Kč]                     │ [Zobrazit fakturu] [Uhradit]  │
│ - Částka obchodníka: [Kč] (jen admin/broker) │                                │
│ - Splatnost: [Datum]                         │ (Broker)                      │
│                                              │ [Nahrát fakturu]              │
│                                              │ (Admin)                       │
│                                              │ [Schválit] [Zamítnout]        │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Data mapping (faktura)
- `[Číslo faktury]`, `[Vystavil]`, `[Komu]`, `[Částka]`, `[Splatnost]`, `[Stav faktury]`, `[Soubor]` (evidence)

### Mikrocopy
- Broker (před uploadem): „Podklady k fakturaci jsou připravené. Nahrajte prosím fakturu platformě.“
- Admin (zamítnutí): „Uveďte důvod zamítnutí (zobrazí se obchodníkovi).“

---

## IN-01 Investoři – seznam

### Účel
Evidence investorů obchodníka + rychlé založení a úpravy.

### Layout (ASCII)
```
┌─ TopNav ─────────────────────────────────────────────────────────────────────┐
│ Investoři                                             [Nový investor +]      │
│ [Vyhledat] [Filtry ▾]                                                          │
├──────────────────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ [Investor] [Stav] [Email] [Telefon] [Poznámka] [Akce]                     │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Stavy
- Empty: „Zatím nemáte žádné investory. Přidejte prvního.“

---

## IN-02 Investor – detail

### Účel
Detail kontaktu + (volitelně) investiční profil pro matching.

### Layout (ASCII)
```
┌─ TopNav ─────────────────────────────────────────────────────────────────────┐
│ Investor: [Jméno / Název]  [Stav]                           [Upravit]         │
├──────────────────────────────────────────────────────────────────────────────┤
│ Kontakty: Email, Telefon, ...                                                │
│ Poznámka                                                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│ (Volitelně) Investiční profil / preference (matching)                         │
│ - Regiony, typy projektů, min/max investice... (TBD dle kanonických polí)     │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## IN-03 Investor – vytvořit/upravit (drawer)

### Účel
Rychlé založení investora bez opuštění kontextu (zejména ve wizardu rezervace).

### Layout (ASCII)
```
┌──────────────────────────────────────────────┐
│ Nový investor                           [X]  │
├──────────────────────────────────────────────┤
│ [Jméno / Název]*                           │
│ [E-mail]*                                  │
│ [Telefon]                                  │
│ [Poznámka]                                 │
│ (Volitelně) Preference / profil            │
├──────────────────────────────────────────────┤
│ [Zrušit]                         [Uložit]   │
└──────────────────────────────────────────────┘
```

### Validace
- Email povinný a validní formát
- Jméno/Název povinné

---

## OV-01 Přehled – dashboard

### Účel
Proobchodní “home”: co dnes musím udělat + co mi utíká (SLA) + pipeline.

### Layout (ASCII)
```
┌─ TopNav ─────────────────────────────────────────────────────────────────────┐
│ Přehled                                                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│ KPI karty:                                                                    │
│ [Rozpracované rezervace] [Čeká investor] [V kapacitě] [Provize k řešení]     │
├──────────────────────────────────────────────────────────────────────────────┤
│ Moje úkoly (priority)                                                        │
│ 1) Rezervace [ID] – chybí NDA scan (zbývá 05:12) [Pokračovat]                │
│ 2) Provize [ID] – nahrajte fakturu (deadline ...) [Nahrát]                   │
├──────────────────────────────────────────────────────────────────────────────┤
│ (Admin) Fronta schvalování: faktury / incidenty                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mikrocopy
- „Co je potřeba udělat dnes“
- „Zbývá [čas]“

---

## NO-01 Notifikace – centrum

### Účel
Jednotný inbox (in‑app), filtrovatelné podle typu (rezervace/tikety/provize).

### Layout (ASCII)
```
┌─ TopNav ─────────────────────────────────────────────────────────────────────┐
│ Notifikace                                            [Označit vše jako přeč.]│
│ Filtry: Nepřečtené ▾  Typ ▾  Datum ▾                                          │
├──────────────────────────────────────────────────────────────────────────────┤
│ • [Čas] Rezervace [ID] – investor podepsal Souhlas+NDA. [Otevřít]            │
│ • [Čas] Provize – můžete vystavit fakturu (tiket [ID]). [Otevřít]            │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## PF-01 Profil – nastavení účtu

### Účel
Správa účtu, bezpečnosti, (volitelně) notifikačních preferencí, firemních údajů.

### Layout (ASCII)
```
┌─ TopNav ─────────────────────────────────────────────────────────────────────┐
│ Profil                                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ Záložky: Účet | Firma | Bezpečnost | Notifikace | Podpora                    │
│                                                                              │
│ Účet: Jméno, e-mail, role                                                    │
│ Firma: (developer/broker) fakturační údaje (TBD pole)                         │
│ Bezpečnost: změna hesla, 2FA (pokud bude)                                     │
│ Podpora: kontakt, nahlásit problém                                            │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

# 8) Notifikace a mikrotexty (událost → komu → kanál → text)

> Níže je návrh “proobchodní” mikrocopy. Finální wording právních částí musí potvrdit právník.

## 8.1 Kritické notifikace (MVP)
1) **Výzva k podpisu Souhlas + NDA (investor)**  
- Komu: investor (e-mail)  
- Text: „Prosíme o podpis Souhlasu a NDA pro pokračování v rezervaci. Odkaz: [Odkaz na podpis]. Lhůta: [Splatnost].“  
- Pozn.: vysvětlit důvod (GDPR/ochrana dat).

2) **Investor podepsal Souhlas + NDA (broker + admin)**  
- Kanál: in‑app + e-mail  
- Text: „Investor podepsal Souhlas a NDA. Detaily rezervace jsou odemčené.“  

3) **Výzva k podpisu Rezervační smlouvy (investor)**  
- Komu: investor (e-mail)  
- Text: „Prosíme o podpis rezervační smlouvy k tiketu [Číslo tiketu]. Odkaz: [Odkaz na podpis]. Lhůta: [Splatnost].“

4) **Investor podepsal Rezervační smlouvu (broker)**  
- Kanál: in‑app + e-mail  
- Text: „Investor podepsal rezervaci [Číslo rezervace]. Čekáme na výsledek kapacity a případně na rozhodnutí developera.“

5) **Rezervace vstoupila do kapacity (broker + developer)**  
- Kanál: in‑app + e-mail  
- Text (developer): „Nová rezervace v kapacitě – [Číslo rezervace]. Prosíme o rozhodnutí do [Splatnost].“  
- Text (broker): „Rezervace [ID] je v kapacitě. Čekáme na rozhodnutí developera.“

6) **Developer podepsal / odmítl**  
- Komu: broker (+ investor e-mailem)  
- Text: „Developer [podepsal/odmítl] rezervaci [ID].“ (+ důvod odmítnutí, pokud existuje)

7) **Financování potvrzeno**  
- Komu: broker (vítěz), admin  
- Text: „Financování potvrzeno – tiket [Číslo tiketu].“

8) **Provize k úhradě (developer)**  
- Komu: developer  
- Text: „Provize k úhradě: [Provize platformy] Kč (splatnost [Splatnost]).“

9) **Podklady k fakturaci pro brokera připraveny**  
- Komu: broker  
- Text: „Můžete vystavit fakturu – tiket [Číslo tiketu] (provize [Provize obchodníka] Kč).“

---

# 9) UI brief pro designéry (Figma‑ready)

## 9.1 Layout hierarchy
- TopNav (fixní)
- PageHeader (Title + Primary CTA + status badge)
- Content:  
  - seznamy = tabulka (desktop) / cards (mobile)  
  - detaily = 2‑column layout (desktop), single column + sticky action bar (mobile)

## 9.2 Klíčové UI vzory
- **Tabulka**: sticky header, row actions, sortable columns, skeleton
- **Stepper wizard**: numbered steps, clear “Back/Next”, resume
- **Timeline**: stavové kroky + timestamp + actor
- **Badge stavu**: tiket / rezervace / provize
- **File upload**: drag&drop, progress, preview, replace
- **PDF preview modal**: viewer + download

## 9.3 Design system požadavky (komponenty + stavy)
- Buttons: primary/secondary/tertiary + loading + disabled
- Input: text/email/phone/textarea + error + helper
- Select: searchable select
- Table: header, row, empty, loading
- Tabs
- Badge (status + count)
- Toast/Alert
- Modal (standard + fullscreen)
- Drawer (right side)
- Timeline component
- Countdown chip

## 9.4 Naming convention (Figma Frames)
- `GL_01_Shell`
- `TI_01_Tickets_List`
- `TI_02_Ticket_Detail`
- `RE_01_Reservations_List`
- `RE_02_Reservation_Detail`
- `GL_02_Reservation_Wizard_Step1…Step4`
- `PR_01_Commissions_List`
- `PR_02_Commission_Detail`
- `IN_01_Investors_List`
- `IN_02_Investor_Detail`
- `IN_03_Investor_Drawer`
- `OV_01_Overview_Dashboard`
- `NO_01_Notifications`
- `PF_01_Profile`

---

# 10) Checklist + Acceptance criteria + Next steps

## 10.1 UX/QA checklist (MVP)
- [ ] Každý stav rezervace má jasné “co dál” + CTA
- [ ] Maskování/odemknutí je vysvětleno transparentně
- [ ] SLA je viditelné a používá konkrétní hodnotu tiketu
- [ ] Upload dokumentů má validace (typ/velikost) + možnost nahrát znovu
- [ ] Neexistuje žádný dark pattern (žádné nucení, záměrné matení)
- [ ] Přístupnost: focus ring, klávesnice, chyby v textu, ne jen barvou
- [ ] Audit log v detailu rezervace (alespoň systémové události)

## 10.2 Acceptance criteria (výběr – klíčové)
### Rezervační wizard
- Uživatel může **vybrat investora** nebo **založit nového investora** bez opuštění wizardu.
- U každého dokumentu (Souhlas, NDA, Rezervační smlouva) existuje **Náhled vzoru**.
- Pokud je zvolen fyzický podpis, broker může nahrát scan a systém uloží soubor + timestamp.
- Po vytvoření rezervace systém zobrazí potvrzení + další kroky a odkaz na detail.

### Detail rezervace
- Zobrazuje timeline se stavem + timestampy.
- Dokument Rezervační smlouvy je pro developera **zamčený**, dokud rezervace není v kapacitě.
- Zobrazuje provizní snapshot a odkaz do sekce Provize.

### Provize
- Broker vidí jen svoje částky a stavy.
- Developer vidí částku k úhradě platformě + splatnost + podklady.
- Admin může schválit/zamítnout brokerovu fakturu s důvodem.

## 10.3 Analytics (event tracking – minimum)
- `ticket_list_viewed`
- `ticket_detail_viewed` (ticket_id)
- `reservation_wizard_opened` (ticket_id)
- `investor_created` (source=wizard/investors)
- `reservation_created` (ticket_id, investor_id)
- `doc_preview_opened` (doc_type)
- `doc_upload_completed` (doc_type, reservation_id)
- `esign_link_sent` (doc_type, reservation_id)
- `reservation_status_changed` (from, to)
- `commission_status_changed` (from, to)
- `invoice_uploaded` (commission_id)
- `invoice_approved` / `invoice_rejected` (admin)

## 10.4 Next steps
1. PO rozhodne TBD body (podpisy + SLA + fronta zobrazení).
2. UI tým vytvoří design v Figmě dle naming convention a komponent.
3. Rychlý usability test (5 uživatelů: 2 broker, 1 developer, 1 admin, 1 nový) – scénář: vytvořit rezervaci s fyzickým podpisem Souhlas+NDA.
4. Iterace mikrocopy (hlavně transparentní vysvětlení Souhlas+NDA).

---
