# Tipconnecta — UX/UI specifikace (v2)  
## EPIC 3: Rezervace — podpisy, fronta/kapacita, aktivace, spory

**Datum:** 2026‑01‑22  
**Jazyk UI:** CZ  
**Platforma:** interní web aplikace (za loginem), responzivní desktop  

---

## Rozhodnutí platná pro EPIC 3 (MVP)

1) **SLA investora:** 1 deadline **48 hodin** na celý podpisový balík (Souhlas + NDA + Rezervační smlouva).  
2) **eSign balík:** investorovi se posílají 3 dokumenty jako **1 eSign envelope** (s průběžnými stavy pro každý dokument).  
3) **Signup režim:** self‑signup + admin approval (řešeno v EPIC 1; zde jen návaznosti v notifikacích).  
4) **Multi‑user developer:** jeden developer může mít více uživatelů (must‑have).  
5) **Pool program:** je aktivní v UI (řešeno v samostatném EPIC; zde jen návaznosti na „milníky“).  

---

## 3.1 Cíl EPIC 3

### Cíl uživatele (Broker / Obchodník)
- Mít **okamžitý přehled**, kdo je na tahu (investor / developer / admin), do kdy, a v jakém stavu podpisy jsou.
- Minimalizovat riziko „obcházení“ přes jasně doložitelnou stopu (audit) a řízené odmaskování.
- Umět investora **rychle dotlačit k podpisu** (remindery, jednoduchý link, jasný deadline).

### Cíl uživatele (Developer)
- Vidět, že došlo k právnímu odemknutí (Souhlas+NDA), kdo je investor a broker.
- Rozhodovat **jen u rezervací v kapacitě** (top N), rychle a s minimem admin práce.
- Umět rezervaci **potvrdit podpisem** nebo **zamítnout s odůvodněním**.

### Cíl byznysu
- Zrychlit a zprůhlednit proces rezervací (SLA + audit) a snížit drop‑off v podpisovém kroku.
- Zajistit procesní důvěru a minimalizovat spory (audit log + incident/spor režim).
- Vytvořit měřitelný funnel: „odesláno → podpisy → kapacita → aktivní“.

---

## 3.2 Klíčové pojmy & status model (UI)

### Terminologie (UI slovník)
- **Rezervace** = procesní krok, který řídí podpisy a pořadí; není to investiční produkt.
- **Aktivní rezervace** = podepsáno investorem i developerem (startuje okno jednání).
- **Jednání** = fáze uvnitř „Aktivní“ (není to další stav rezervace).
- **Kapacita** = počet rezervací, které mohou být současně „v kapacitě“ (top N).
- **Fronta** = pořadí podle času podpisu investora na rezervační smlouvě.

### Kanonické stavy rezervace (pro UI štítky)
1. Rozpracovaná  
2. Odesláno investorovi (čeká na podpis balíku)  
3. Souhlas + NDA podepsány (čeká na podpis rezervační smlouvy) *(interní milník, bez nového SLA)*  
4. Podepsáno investorem – ve frontě (mimo kapacitu)  
5. Podepsáno investorem – v kapacitě (čeká na podpis/rozhodnutí developera)  
6. Aktivní (podepsáno oběma stranami)  
7. Financování potvrzeno *(EPIC 4/5, zde jen read‑only placeholder v detailu)*  
8. Ukončeno neúspěšně  
9. Spor  

> Pozn.: V MVP používáme **1 investor SLA** 48h pro celý balík. Stav 3 se používá jen pro informování a auditní logiku.

### „Na tahu“ (operativní indikátor)
- **Investor** (do podpisu všech dokumentů v envelope)
- **Developer** (po vstupu do kapacity do podpisu/rozhodnutí)
- **Admin** (jen při sporu / override / expirace, není standardní „tah“)
- **Hotovo** (aktivní / financováno / ukončeno)

---

## 3.3 UX principy pro EPIC 3

1) **Timeline & jistota:** každá rezervace má krokovník (Rezervace → Podpisy → Aktivace → Jednání → Financování → Provize).  
2) **Jedna dominantní informace:** „kdo je na tahu + deadline“.  
3) **Minimalizace kognitivní zátěže:** tabulky pro přehled, detail pro vysvětlení.  
4) **Audit jako feature, ne jako právní šum:** audit log je dostupný (alespoň „co se stalo“), admin vidí full detail.  
5) **Bez hype:** věcné, kultivované texty, vykání; nepoužíváme sliby ani „výnosy“.  

---

## 3.4 Klíčové user flows

### Flow 3A — Broker sleduje podpisy investora (happy path)
1) Broker odešle eSign envelope investorovi.  
2) Investor podepíše Souhlas+NDA → systém odemkne identitu a zobrazí rezervaci developerovi.  
3) Investor podepíše rezervační smlouvu (v rámci stejného envelope) → určí se pořadí ve frontě a případný vstup do kapacity.  
4) Pokud rezervace vstoupí do kapacity, developer má možnost podepsat / zamítnout.

### Flow 3B — Investor nedokončí podpis do 48h
- Reservation = „Ukončeno neúspěšně“ s důvodem „Investor nedokončil podpis balíku včas“.  
- Pokud investor podepsal Souhlas+NDA, audit záznam zůstává.

### Flow 3C — Developer rozhoduje v kapacitě (happy path)
1) Rezervace vstoupí do kapacity (top N).  
2) Developer má 48h na podpis/rozhodnutí.  
3) Developer podepíše → rezervace „Aktivní“, startuje 30 dní jednání (deadline v detailu).  
4) Developer zamítne → rezervace „Ukončeno neúspěšně“, povinný důvod.

### Flow 3D — Spor / incident
- Admin přepne rezervaci do „Spor“ → pozastaví automatické deadline joby.  
- Po vyřešení admin vrátí do původního stavu (pokud to dává smysl) nebo ukončí s důvodem.

---

## 3.5 Seznam obrazovek (EPIC 3)

### Broker (Obchodník)
- **[B-RES-01]** Moje rezervace (seznam)  
- **[B-RES-02]** Detail rezervace (broker)  
- **[B-RES-03]** Modal: Připomenout podpis / znovu poslat eSign  

### Developer
- **[D-RES-01]** Rezervace (inbox)  
- **[D-RES-02]** Detail rezervace (developer)  
- **[D-RES-03]** Modal: Zamítnout rezervaci  

### Admin
- **[A-RES-01]** Admin — Rezervace (seznam + filtry)  
- **[A-RES-02]** Admin — Detail rezervace (override + audit + spor)

### Systémové šablony (copy)
- **[SYS-EMAIL-01]** Email investor: Žádost o podpis balíku  
- **[SYS-EMAIL-02]** Email investor: Připomínka (24h / 6h)  
- **[SYS-EMAIL-03]** Email investor: Expirace / odmítnutí  
- **[SYS-INAPP-01]** In‑app notifikace (copy číselník)  

---

# Obrazovky

## [B-RES-01] Moje rezervace (seznam)

Cíl uživatele:  
Rychle zjistit, které rezervace vyžadují akci (připomenout podpis / čekat / reagovat na zamítnutí) a jak si vede pipeline.

Cíl byznysu:  
Zvýšit aktivaci rezervací (podpisy), snížit ztrátu času a zvýšit retenci brokerů díky transparentnímu procesu.

Primární CTA / sekundární CTA:  
- Primární: **Otevřít detail**  
- Sekundární: **Připomenout podpis** (pouze když „Na tahu: Investor“ a není expirováno)

KPI:  
- time‑to‑first‑action na nově odeslané rezervaci  
- % rezervací s investor podpisem do 48h  
- % rezervací v kapacitě → aktivních

Obsah (texty 1:1):  
- H1: **Moje rezervace**  
- Subtext: **Přehled podpisů, kapacity a stavu jednání. Vždy vidíte, kdo je na tahu a do kdy.**  
- Filtry (labely):  
  - **Stav** (Vše / Na tahu investor / Na tahu developer / Aktivní / Ukončeno / Spor)  
  - **Tiket / projekt** (fulltext)  
  - **Investor** (fulltext)  
  - **Datum** (poslední změna)  
- Sloupce tabulky:  
  1) **Tiket** (název + ID)  
  2) **Investor** (název firmy / jméno; pokud ještě neodemčeno, zobrazit: „— (čeká na podpis Souhlas+NDA)“)  
  3) **Na tahu** (Investor / Developer / Admin / Hotovo)  
  4) **Deadline** (např. „za 17 h“ + datum/čas)  
  5) **Fronta / kapacita** (např. „2/7“ + badge „V kapacitě“ / „Mimo kapacitu“)  
  6) **Stav** (štítek)  
  7) **Poslední změna**  
  8) **Akce** (… menu: Otevřít detail / Připomenout podpis / Zobrazit audit (read‑only) )

Komponenty:  
- Page header + breadcrumbs (Rezervace)  
- Tabs/segmented control „Stav“  
- Search input  
- Table (sortable)  
- Status badge  
- „Na tahu“ badge  
- Countdown chip (deadline)  
- Kebab menu (row actions)  
- Empty state panel

Layout (popis zón):  
- Header: H1 + subtext  
- Body: filtry (řádek) → tabulka  
- Footer: stránkování

Stavy:  
- loading: skeleton tabulky  
- empty: „Zatím nemáte žádné rezervace. Začněte výběrem tiketu.“ + CTA „Přejít na tikety“  
- error: „Nepodařilo se načíst rezervace. Zkuste to znovu.“ + CTA „Zkusit znovu“  
- edge cases:  
  - expirováno: deadline = „—“ + stav „Ukončeno neúspěšně“  
  - spor: banner v řádku „Spor — pozastaveno administrátorem“

Validace a pravidla:  
- „Připomenout podpis“ dostupné jen pokud: stav není Ukončeno/Spor/Financování potvrzeno a Na tahu = Investor.  
- „Fronta/kapacita“ se zobrazuje až po podpisu rezervační smlouvy investorem (do té doby „—“).

Analytické eventy:  
- `reservation_list_viewed` {role, filter_status, sort, search_used}  
- `reservation_row_action_clicked` {action, reservation_id, role}  
- `reservation_reminder_opened` {reservation_id, origin:"list"}  

Poznámky pro Figmu:  
— (vynecháno dle instrukce)

Wireframe (ASCII):
[Header: Logo | Rezervace | Tikety | Projekty | Účet]
----------------------------------------------------
[H1 Moje rezervace]
[Subtext: přehled podpisů, kapacity, stavu]
[Filter: Stav v] [Search tiket/investor] [Date range]
----------------------------------------------------
| Tiket | Investor | Na tahu | Deadline | Fronta | Stav | ... |
| ...                                                           |
----------------------------------------------------
[Pagination]

---

## [B-RES-02] Detail rezervace (broker)

Cíl uživatele:  
Získat „single source of truth“ pro konkrétní rezervaci: krokovník, podpisy, kapacita, co dělat teď.

Cíl byznysu:  
Snížit nejasnosti a podporovat dokončení podpisů; posílit důvěru v auditní stopu.

Primární CTA / sekundární CTA:  
- Primární (dle stavu):  
  - **Připomenout podpis investorovi** (na tahu investor)  
  - **Zobrazit dokumenty** (po právním odemknutí)  
- Sekundární: **Zobrazit auditní log**

KPI:  
- % rezervací, u kterých broker odešle reminder  
- čas do dokončení podpisů po reminderu  
- počet otevření detailu vs drop‑off

Obsah (texty 1:1):  
- Breadcrumbs: **Rezervace / {ID rezervace}**  
- H1: **Rezervace {ID}**  
- Meta:  
  - **Tiket:** {název tiketu}  
  - **Na tahu:** {Investor/Developer/Admin/Hotovo}  
  - **Deadline:** {čas do expirace}  
  - **Stav:** {štítek}  
- Krokovník (horizontální):  
  1) Rezervace  
  2) Podpisy  
  3) Aktivace  
  4) Jednání  
  5) Financování  
  6) Provize  
- Sekce „Podpisy“ (karta):  
  - **Souhlas se sdílením údajů:** {Podepsáno / Čeká / Odmítnuto}  
  - **NDA:** {Podepsáno / Čeká / Odmítnuto}  
  - **Rezervační smlouva:** {Podepsáno / Čeká / Odmítnuto}  
  - Text nápovědy: **Dokumenty jsou odeslané jako jeden balík. Investor má na podpis 48 hodin od odeslání.**  
- Sekce „Fronta & kapacita“ (karta):  
  - **Pořadí:** {pozice}/{celkem}  
  - **Kapacita tiketu:** {N}  
  - Badge: **V kapacitě** / **Mimo kapacitu**  
  - Pomocný text:  
    - pokud mimo kapacitu: **Rezervace čeká ve frontě. Developer podepisuje jen rezervace v kapacitě.**  
- Sekce „Identita & přístup“ (karta):  
  - **Investor:** {jméno/firmní název} (zobrazit až po podpisu Souhlasu+NDA)  
  - **Developer:** {developer} (plně po odmaskování)  
  - **Broker:** {vy}  
  - Poznámka: **Identita se odemyká po podpisu Souhlasu+NDA.**  
- Sekce „Dokumenty“ (karta):  
  - Před odmaskováním: **Dokumenty se zpřístupní po právním odemknutí.**  
  - Po odmaskování: seznam dostupných podkladů (read‑only, download).  
- Sekce „Auditní log“ (collapsed): posledních 5 událostí + „Zobrazit vše“.

Komponenty:  
- Breadcrumbs  
- Header summary card (status + SLA)  
- Stepper / timeline  
- Cards  
- Status pills pro dokumenty  
- Button + secondary link  
- Collapsible audit log  
- Toasty pro akce (reminder odeslán)

Layout (popis zón):  
- Header: breadcrumbs, H1, meta, CTA button group  
- Body: 2 sloupce  
  - Left: Krokovník + Podpisy + Fronta/Kapacita  
  - Right: Identita & přístup + Dokumenty + Audit log

Stavy:  
- loading: skeleton karty  
- error: „Nepodařilo se načíst rezervaci.“  
- success: toast „Připomínka odeslána“  
- edge cases:  
  - Ukončeno neúspěšně: zobrazit „Důvod ukončení“ (read‑only) + audit  
  - Spor: banner „Rezervace je pozastavena administrátorem.“ + kontakt na support  
  - Mimo kapacitu: dokument „Rezervační smlouva“ je skrytý, viditelný bude až po vstupu do kapacity

Validace a pravidla:  
- Investor identitu zobrazit až po podpisu Souhlas+NDA.  
- „Připomenout podpis“: rate limit 1× / 6 hodin (MVP doporučení) + log do auditu.  
- „Dokumenty“: respektovat viditelnost (předrezervační vs po odmaskování).

Analytické eventy:  
- `reservation_detail_viewed` {reservation_id, role, status}  
- `reservation_reminder_sent` {reservation_id, channel:"email", reason:"manual"}  
- `reservation_documents_opened` {reservation_id, count, role}  
- `reservation_audit_opened` {reservation_id, role}  

Poznámky pro Figmu:  
— (vynecháno dle instrukce)

Wireframe (ASCII):
[Header: ...]
----------------------------------------------------
[Breadcrumbs]
[H1 Rezervace R-12345]   [CTA: Připomenout podpis]
[Meta: Ticket | Na tahu | Deadline | Stav]
[Stepper: Rezervace > Podpisy > Aktivace > Jednání > Financování > Provize]
----------------------------------------------------
[Left col]
[Card: Podpisy (3 řádky statusů + nápověda)]
[Card: Fronta & kapacita (pozice, badge)]
[Right col]
[Card: Identita & přístup]
[Card: Dokumenty (zamčeno/odemčeno)]
[Accordion: Audit log]
----------------------------------------------------

---

## [B-RES-03] Modal: Připomenout podpis / znovu poslat eSign

Cíl uživatele:  
Rychle poslat investorovi připomínku bez hledání e‑mailu a bez ručního psaní.

Cíl byznysu:  
Snížit drop‑off v podpisovém kroku.

Primární CTA / sekundární CTA:  
- Primární: **Odeslat připomínku**  
- Sekundární: **Zrušit**

KPI:  
- CTR z reminderu na eSign link  
- podpis do 6/24h po reminderu

Obsah (texty 1:1):  
- Title: **Připomenout podpis investorovi**  
- Text: **Investor má na podpis balíku 48 hodin od odeslání. Připomínka odejde e‑mailem.**  
- Pole (read‑only):  
  - **Komu:** {investor email}  
  - **Předmět:** „Tipconnecta: Prosba o podpis dokumentů k rezervaci {ID}“  
- Přepínač (volitelně): **Přidat krátkou poznámku** (textarea)  
  - Placeholder: „Např. Jsme blízko deadlinu, prosím o podpis dnes.“  
- Inline warning (pokud rate limit): **Připomínku lze poslat nejdříve za {X} hodin.**

Komponenty:  
- Modal  
- Read-only fields  
- Toggle + textarea  
- Primary/secondary buttons

Layout (popis zón):  
- Modal header → body → footer buttons

Stavy:  
- success: toast „Připomínka odeslána“  
- error: „Nepodařilo se odeslat připomínku.“ + retry  
- disabled: rate limit

Validace a pravidla:  
- Poznámka max 300 znaků.  
- Rate limit: 1× / 6h (MVP).  
- Logovat do auditu: kdo poslal, kdy, komu.

Analytické eventy:  
- `reservation_reminder_modal_opened` {reservation_id, origin}  
- `reservation_reminder_sent` {reservation_id, has_note, note_length_bucket}  
- `reservation_reminder_failed` {reservation_id, error_type}  

Poznámky pro Figmu:  
— (vynecháno dle instrukce)

Wireframe (ASCII):
[Modal: Připomenout podpis]
--------------------------------
[Text]
[Komu: email (ro)]
[Předmět (ro)]
[Toggle: Přidat poznámku]
[Textarea]
--------------------------------
[Cancel] [Odeslat připomínku]

---

## [D-RES-01] Rezervace (inbox) — developer

Cíl uživatele:  
Vidět přehled rezervací u svých tiketů a rychle poznat, kde je potřeba akce (v kapacitě).

Cíl byznysu:  
Zrychlit developer response time a tím aktivace rezervací.

Primární CTA / sekundární CTA:  
- Primární: **Otevřít detail**  
- Sekundární: **Filtrovat: Vyžaduje akci**

KPI:  
- % rezervací v kapacitě s rozhodnutím do 48h  
- průměrný čas do podpisu developera

Obsah (texty 1:1):  
- H1: **Rezervace**  
- Subtext: **Rezervace se zobrazí po právním odemknutí (Souhlas + NDA). Podepisujete jen rezervace v kapacitě.**  
- Filtry:  
  - **Vyžaduje akci** (on/off)  
  - **Tiket** (fulltext)  
  - **Stav** (Vše / V kapacitě / Mimo kapacitu / Aktivní / Ukončeno / Spor)  
- Tabulka sloupců:  
  1) **Tiket**  
  2) **Investor**  
  3) **Broker**  
  4) **Kapacita** (V kapacitě / Mimo kapacitu + pozice)  
  5) **Deadline** (pouze pokud v kapacitě a čeká na rozhodnutí)  
  6) **Stav**  
  7) **Akce** (Otevřít detail)

Komponenty:  
- Table  
- Filter bar  
- Badge „Vyžaduje akci“  
- Countdown chip

Layout (popis zón):  
- Header + filtry + tabulka

Stavy:  
- empty: „Zatím nemáte žádné rezervace.“  
- edge: mimo kapacitu — bez CTA k podpisu, pouze detail

Validace a pravidla:  
- Developer vidí rezervace až po podpisu Souhlas+NDA investorem (právní odemknutí).  
- Rezervační smlouva (PDF) je dostupná až při vstupu rezervace do kapacity.

Analytické eventy:  
- `dev_reservation_inbox_viewed` {filter_action_required, status_filter}  
- `dev_reservation_row_opened` {reservation_id}  

Poznámky pro Figmu:  
— (vynecháno dle instrukce)

Wireframe (ASCII):
[Header]
--------------------------------
[H1 Rezervace]
[Subtext]
[Filter: Vyžaduje akci] [Search tiket] [Status]
--------------------------------
| Tiket | Investor | Broker | Kapacita | Deadline | Stav | >
--------------------------------

---

## [D-RES-02] Detail rezervace (developer)

Cíl uživatele:  
Rychle rozhodnout: podepsat / zamítnout (pouze pokud je rezervace v kapacitě).

Cíl byznysu:  
Maximalizovat rychlost rozhodnutí a snížit churn developerů díky „procesní kontrole“.

Primární CTA / sekundární CTA:  
- Pokud rezervace **v kapacitě a čeká na rozhodnutí**:  
  - Primární: **Podepsat rezervační smlouvu**  
  - Sekundární: **Zamítnout**  
- Pokud mimo kapacitu: primární CTA není (jen read‑only přehled).

KPI:  
- developer decision rate (signed vs rejected)  
- time to decision  
- % expirací developer SLA

Obsah (texty 1:1):  
- Breadcrumbs: **Rezervace / {ID}**  
- H1: **Rezervace {ID}**  
- Meta: Ticket, Stav, Kapacita (pozice), Deadline (pokud relevantní)  
- Banner (dle stavu):  
  - mimo kapacitu: **Rezervace je ve frontě. K podpisu se zpřístupní po vstupu do kapacity.**  
  - v kapacitě: **Vyžaduje váš podpis do {deadline}.**  
  - spor: **Pozastaveno administrátorem.**  
- Karta „Strany“: Investor, Broker, Developer (vy)  
- Karta „Dokumenty“:  
  - Souhlas + NDA: stav (podepsáno) + „Zobrazit audit“  
  - Rezervační smlouva:  
    - pokud v kapacitě: tlačítko **Otevřít dokument** + stav „podepsáno investorem“  
    - pokud mimo kapacitu: „Zamčeno — zpřístupní se po vstupu do kapacity“  
- Karta „Audit log“: posledních 10 událostí (developer view = jen relevantní)

Komponenty:  
- Banner (info/warning)  
- CTA button group  
- Cards  
- Document row with lock state  
- Audit log list

Layout (popis zón):  
- Header: breadcrumbs, H1, CTA  
- Body: 2 sloupce  
  - Left: banner + dokumenty  
  - Right: strany + audit

Stavy:  
- loading / error  
- success: po podpisu redirect do „Aktivní“ + toast „Rezervace aktivována“  
- edge: developer SLA vypršelo → stav „Ukončeno neúspěšně“

Validace a pravidla:  
- „Podepsat“ je enabled jen pokud: rezervace v kapacitě + investor podepsal rezervační smlouvu + není spor + není ukončeno.  
- Zamítnutí vyžaduje povinný důvod (modal).

Analytické eventy:  
- `dev_reservation_detail_viewed` {reservation_id, status, in_capacity}  
- `dev_reservation_sign_clicked` {reservation_id}  
- `dev_reservation_reject_clicked` {reservation_id}  
- `dev_reservation_document_opened` {reservation_id, doc_type}  

Poznámky pro Figmu:  
— (vynecháno dle instrukce)

Wireframe (ASCII):
[Breadcrumbs]
[H1 Rezervace R-12345]    [CTA: Podepsat] [Zamítnout]
----------------------------------------------------
[Banner dle stavu]
[Left]
[Card Dokumenty: Souhlas+NDA (ok), Rezervační smlouva (lock/ok)]
[Right]
[Card Strany]
[Card Audit log]
----------------------------------------------------

---

## [D-RES-03] Modal: Zamítnout rezervaci (developer)

Cíl uživatele:  
Jednoduše zamítnout rezervaci s důvodem, aby byla auditovatelná a komunikovatelná brokerovi.

Cíl byznysu:  
Snížit „tiché“ expirace, získat data o důvodech a zlepšovat kvalitu tiketů.

Primární CTA / sekundární CTA:  
- Primární: **Zamítnout rezervaci**  
- Sekundární: **Zrušit**

KPI:  
- % zamítnutí s vyplněným důvodem (100 %)  
- top reason distribution

Obsah (texty 1:1):  
- Title: **Zamítnout rezervaci**  
- Text: **Vyberte důvod. Informace se zobrazí brokerovi a uloží do auditu.**  
- Pole:  
  - **Důvod (povinné)** (select)  
    - „Nesplňuje parametry tiketu“  
    - „Chybí podklady / dokumentace“  
    - „Kapacita a časové možnosti“  
    - „Investor neprošel interním screeningem“  
    - „Jiné“  
  - **Poznámka (volitelně)** (textarea, max 500 znaků)

Komponenty:  
- Modal  
- Select  
- Textarea  
- Buttons

Layout (popis zón):  
- Modal

Stavy:  
- error: „Nepodařilo se zamítnout. Zkuste to znovu.“  
- success: toast + redirect na detail (stav ukončeno)

Validace a pravidla:  
- Důvod povinný.  
- Pokud „Jiné“, poznámka povinná.

Analytické eventy:  
- `dev_reservation_reject_submitted` {reservation_id, reason_code, has_note}  

Poznámky pro Figmu:  
— (vynecháno dle instrukce)

Wireframe (ASCII):
[Modal Zamítnout rezervaci]
---------------------------
[Důvod v] (required)
[Poznámka]
---------------------------
[Cancel] [Zamítnout]

---

## [A-RES-01] Admin — Rezervace (seznam + filtry)

Cíl uživatele:  
Operativně dohlížet na proces, řešit expirace, override a spory.

Cíl byznysu:  
MVP „concierge“ řízení kvality procesu bez chaosu.

Primární CTA / sekundární CTA:  
- Primární: **Otevřít detail**  
- Sekundární: **Export audit** (MVP optional)

KPI:  
- počet zásahů admina / týden  
- průměrný čas do vyřešení sporu

Obsah (texty 1:1):  
- H1: **Rezervace (Admin)**  
- Filtry: Stav, role na tahu, tiket, broker, developer, datum, „vyžaduje zásah“  
- Tabulka: ID, tiket, broker, investor, developer, stav, deadline, poslední změna, flags (Spor / Expirace blízko)

Komponenty:  
- Admin table  
- Filters  
- Flags/alerts

Layout:  
- Standard admin list

Stavy: loading/empty/error

Validace a pravidla:  
- Admin vidí všechno.  
- „Vyžaduje zásah“ = SLA < 6h / Spor / ruční override pending.

Analytické eventy:  
- `admin_reservation_list_viewed` {filters}  
- `admin_reservation_opened` {reservation_id}  

Poznámky pro Figmu:  
— (vynecháno dle instrukce)

Wireframe (ASCII):
[H1 Rezervace (Admin)]
[Filters...]
| ID | Ticket | Broker | Investor | Developer | Stav | Deadline | Flags |
...

---

## [A-RES-02] Admin — Detail rezervace (override + audit + spor)

Cíl uživatele:  
Mít plný audit, řešit override (deadline, kapacita, stav), založit/uzavřít spor.

Cíl byznysu:  
Zajistit „pravdu v čase“ a minimalizovat reputační škody při incidentech.

Primární CTA / sekundární CTA:  
- Primární: **Uložit změny** (pouze pokud admin něco mění)  
- Sekundární: **Založit spor** / **Uzavřít spor**

KPI:  
- počet incidentů/sporů  
- průměrný čas do uzavření incidentu

Obsah (texty 1:1):  
- H1: **Rezervace {ID} (Admin)**  
- Sekce „Override“:  
  - **Prodlužení SLA investora** (datum/čas) + povinný důvod  
  - **Prodlužení SLA developera** (datum/čas) + povinný důvod  
  - **Změna stavu** (select) + povinný důvod  
- Sekce „Spor“:  
  - **Typ incidentu** (procesní / finanční / právní / bezpečnostní)  
  - **Závažnost** (low/med/high)  
  - **Popis**  
  - **Stav řešení** (open / investigating / resolved)  
- Sekce „Audit log (full)“: filtrování + export

Komponenty:  
- Forms  
- Required reason fields  
- Audit timeline/table  
- Attachments (pro podklady)

Layout:  
- 2 sloupce: Override/Spor vlevo, Audit vpravo

Stavy:  
- validation errors (důvod povinný)  
- success toast „Změna uložena a zapsána do auditu.“

Validace a pravidla:  
- Každý ruční zásah admina vyžaduje **důvod** a vytváří novou auditní událost.  
- Ve stavu „Spor“ jsou uživatelská CTA pro podpisy zablokovaná.

Analytické eventy:  
- `admin_override_submitted` {reservation_id, override_type}  
- `admin_dispute_opened` {reservation_id, incident_type, severity}  
- `admin_dispute_closed` {reservation_id, outcome}  

Poznámky pro Figmu:  
— (vynecháno dle instrukce)

Wireframe (ASCII):
[H1 Rezervace R-12345 (Admin)]
----------------------------------------------------
[Left]
[Override card: SLA investor] [reason]
[Override card: SLA developer] [reason]
[Change status] [reason]
[Dispute card: type, severity, description, status]
[Right]
[Audit log full + filters + export]
----------------------------------------------------

---

# Systémové šablony (copy)

## [SYS-EMAIL-01] Email investor — Žádost o podpis balíku

Subject:  
**Tipconnecta: Prosba o podpis dokumentů k rezervaci {TIKET_NAZEV}**

Body (plain text):  
Dobrý den,  

prosíme o podpis dokumentů k rezervaci tiketu **{TIKET_NAZEV}**. Podpis probíhá elektronicky a zabere obvykle několik minut.  

**Deadline pro podpis: {DEADLINE_DATUM_CAS} (48 hodin od odeslání)**  

Podepsat dokumenty: {ESIGN_LINK}  

Balík obsahuje:  
1) Souhlas se sdílením údajů (pro zpřístupnění detailů developerovi)  
2) NDA (dohoda o mlčenlivosti)  
3) Rezervační smlouva (developer ↔ investor)  

V případě dotazů odpovězte prosím na tento e‑mail nebo kontaktujte svého poradce.  

S pozdravem  
Tipconnecta

---

## [SYS-EMAIL-02] Email investor — Připomínka podpisu

Subject:  
**Tipconnecta: Připomínka — podpis dokumentů k rezervaci {TIKET_NAZEV}**

Body:  
Dobrý den,  

připomínáme podpis dokumentů k rezervaci **{TIKET_NAZEV}**.  

**Zbývá času: {TIME_LEFT}**  
Podepsat dokumenty: {ESIGN_LINK}  

S pozdravem  
Tipconnecta

---

## [SYS-EMAIL-03] Email investor — Expirace / odmítnutí

Subject:  
**Tipconnecta: Rezervace vypršela**

Body:  
Dobrý den,  

rezervace tiketu **{TIKET_NAZEV}** byla ukončena, protože dokumenty nebyly podepsány včas (48 hodin od odeslání) nebo byl podpis odmítnut.  

Pokud máte zájem pokračovat, požádejte prosím svého poradce o zaslání nové rezervace.  

S pozdravem  
Tipconnecta

---

## [SYS-INAPP-01] In‑app notifikace — číselník (MVP)

1) **Rezervace odeslána investorovi**  
Text: „Rezervace {ID} byla odeslána investorovi. Deadline pro podpis: {DEADLINE}.“  

2) **Investor podepsal Souhlas + NDA**  
Text: „Investor podepsal Souhlas + NDA. Odemkli jsme identitu a zpřístupnili rezervaci developerovi.“  

3) **Investor podepsal rezervační smlouvu**  
Text: „Investor podepsal rezervační smlouvu. Rezervace je ve frontě: {POSITION}/{TOTAL}.“  

4) **Rezervace vstoupila do kapacity**  
Text: „Rezervace {ID} je v kapacitě. Developer má na rozhodnutí {DEADLINE}.“  

5) **Rezervace aktivní**  
Text: „Rezervace {ID} je aktivní. Od dneška běží jednání (30 dní).“  

6) **Rezervace zamítnuta developerem**  
Text: „Developer zamítl rezervaci {ID}. Důvod: {REASON}.“  

7) **Rezervace ve sporu**  
Text: „Rezervace {ID} je pozastavena (Spor). Administrátor prověřuje situaci.“

---

## Nejasnosti (otázky na vás)
- Žádné blokující otázky pro EPIC 3 (pokračuji podle logiky + rozhodnutí).

## Předpoklady (co jsme doplnili sami)
- Remindery mají **rate limit 1× / 6 hodin** (MVP ochrana proti spamu).  
- V developer organizaci může podpis provést kterýkoliv přihlášený uživatel (audit zachytí konkrétní osobu).  
- „Poznámka do reminderu“ je volitelná (max 300 znaků).  
