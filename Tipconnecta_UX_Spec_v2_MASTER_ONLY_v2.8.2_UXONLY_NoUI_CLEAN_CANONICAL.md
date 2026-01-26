# Tipconnecta — UX zadávací dokumentace (v2) — MASTER
**Verze:** v2.8.2 (UX ONLY)
**Datum poslední aktualizace:** 2026-01-26
**Jazyk aplikace:** CZ  
**Platforma:** interní web aplikace (za loginem), responzivní desktop  
**Použité zdroje (pouze):**
- Tipconnecta_Souhrn_Dat_DATA_FINAL_CLEAN_v1.4.0_CANONICAL.md  
- Tipconnecta_Strategicky_Marketingovy_Deck_v1.3.0_CLEAN_CANONICAL.md  
- Tipconnecta_Persona_BrokerPartner_20m_v1.3.0_CLEAN_CANONICAL.md


---

## Executive summary (co tento dokument pokrývá)
Tento dokument slučuje a sjednocuje specifikace pro EPIC 1–10 + EPIC 12 (handoff).
- **EPIC 1:** Přístup, účty, onboarding, admin approval (gating pilotu)
- **EPIC 2:** Broker — Marketplace tiketů + detail projektu + start rezervace (výběr investora)
- **EPIC 3:** Rezervace — eSign podpisy, fronta/kapacita, aktivace, spory + systémové notifikace
- **EPIC 4:** Broker marketplace doplnění: **SLA platnosti tiketu**, **Investor matching**, **LTV**
- **EPIC 5:** Finance — provize, fakturace, payout, **Pool program**, exporty a audit
- **EPIC 6:** Supply — Projekty & Tikety (Developer + Admin), schvalování/publikace, lead projekty (hybrid broker) + žádosti o úpravu
- **EPIC 7:** Profil, tým & nastavení — notifikace (in‑app), multi‑user developer, GDPR a podpora
- **EPIC 8:** Přehled & dashboardy — role‑based home, SLA feed a rychlé akce (Broker + Developer + Admin)
- **EPIC 9:** Administrace & nastavení systému — parametry (SLA/kapacity/DPH/pool), programy & sloty, uživatelé & organizace
- **EPIC 10:** Pre‑login web (akvizice) — landingy Broker/Developer, „Jak to funguje“, Důvěra & compliance, book‑a‑call
- **EPIC 12:** Handoff pack — datový model, API potřeby, error model a analytics dictionary (pro vývoj + měření)


> Pozn.: EPIC 4 **rozšiřuje** (a místy „přepisuje“) broker marketplace obrazovky z EPIC 2 v oblastech: platnost tiketu, matching, LTV.

---

## Changelog (KANONICKÁ CLEAN verze)

### v2.8.2 (2026-01-26)
- Vyřešeno: všechny dřívější „Nejasnosti“ → převedeny na **uzavřená rozhodnutí** (bez pracovních komentářů).
- Upraveno: **Top navigation** (hlavní menu nahoře, žádný sidebar) jako globální pravidlo pro všechny role.
- Upřesněno: **SLA 48 h** běží jednotně od okamžiku, kdy broker **odešle** eSign balík investorovi (1 envelope; v eSign 2 navazující kroky).
- Doplněno: **rozpracované rezervace** (koncepty) + možnost „pokračovat“ (rychlý návrat do modálu).
- Změněno: galerie projektu/tiketu → **bez modálu** (hero obrázek + thumbnail galerie, šipky; v maskovaném stavu pouze rozmazání).
- Doplněno: **matching** v kartě tiketu i v detailu (škálovatelný seznam pro desítky investorů) + náhled znaleckého posudku/komentáře admina.
- Doplněno: u projektu (teaser i detail) **součet provizí všech tiketů** v projektu (bez DPH).
- Upraveno: vizualizace kapacity → preferovaně **počet tiketů/slotů** (segmentový indikátor), ne jen procentuální progress bar.
- Doplněno: fakturace → admin může zadat **předmět fakturace**; sjednoceno i pro případné „pool“ bonusy.
- Upraveno: EPIC 10 (pre‑login web) označen jako **de‑scope pro MVP**; FAQ přesunuto do app po přihlášení.

### v2.8.1 (2026-01-25)
- Doplněno: galerie v **kartě tiketu** (thumbnail) a v **detailu tiketu** (hero + „Zobrazit galerii“).
- Sladěno: stránka **Tikety** (row-card layout) + modály rezervace (1/2, 2/2) dle posledních návrhů.
- Opraveno: kolize ID (BRK-210/BRK-220/BRK-230) → unikátní ID, Matching drawer = **BRK-225**, Projekt teaser = **BRK-110**.
- Zachováno: ostatní části platformy (Broker / Developer / Admin) beze změny obsahu, pouze bez duplicitních sekcí.

---


## Decision log (freeze pro MVP — sjednocené, bez dalších otázek)
### Core produktová pravidla
- Investor má **1 jednotný deadline 48 h** na podpis celého balíku dokumentů (Souhlas + NDA + Rezervační smlouva) — **počítá se od okamžiku odeslání k podpisu brokerem**.
- Dokumenty se posílají jako **1 eSign envelope**; v eSign probíhá **navazující podepisování** (nejprve Souhlas+NDA, poté Rezervační smlouva) v jednom okně.
- Po podpisu investora (rezervační smlouvy) vzniká **fronta**; do kapacity jde vždy **top N** rezervací.
- **Kapacita_N** nastavuje admin (default dle dat / MVP), rezervace mimo kapacitu čekají ve frontě.
- Po vstupu do kapacity má developer **48 h** na rozhodnutí (podepsat / zamítnout).
- Po aktivaci rezervace běží **jednání 30 dní**; pokud se do té doby nepotvrdí financování → rezervace končí neúspěšně a posouvá se další z fronty.
- Tiket má **publikační okno** (default 90 dní, admin může upravit) — po expiraci nelze zahajovat nové rezervace; existující doběhnou.

### Signup / přístup
- MVP režim: **self signup + admin approval**.
- Aplikace je **za loginem**; investor nemá účet v aplikaci (podepisuje mimo app přes eSign).

### Pre‑login web (akvizice)
- Pre‑login sekce je **bez citlivých dat a bez seznamu tiketů**; slouží pouze pro vysvětlení procesu a konverzi do self‑signup / domluvení callu.
- Veřejný obsah nikdy nesmí používat terminologii „investice“ (používáme „rezervace“, „financování“, „tiket“).

### Organizace a role
- **Hybrid broker:** broker může přinést i projekt (lead) a projekt lze založit brokerem před zasmluvněním developera; později se přiřadí developerovi. Broker, který projekt přivedl, má přehled o rezervacích a profinancování, protože má provizní podíl.
- **Multi‑user developer (MVP must‑have):** více uživatelů může patřit pod jednu developer organizaci (min. role: Owner / Member / Finance).

### Provize (komunikace v aplikaci)
- Celková provize: **5 %** z finální profinancované částky.
- Split: **platforma 50 %**, **broker 1 25 %**, **broker 2 25 %**.
- Pokud neexistuje broker 2, jeho podíl se **nepřesouvá na brokera 1**; zůstává platformě (Tipconnecta) podle kanonického dělení provizí.
- V aplikaci komunikujeme částky **primárně bez DPH**; pokud se na faktuře uplatňuje DPH, zobrazí se rozpad v detailu faktury (podle nastavení/parametrů).

### eSign & remindery
- Kanál: e‑mail link (MVP); SMS/OTP není nutné (volitelně post‑MVP).
- Remindery: automatické (T+24h, T+42h / 6h před expirací) + ruční „znovu poslat“ s rate‑limit 1×/6h.

### Pool program
- Pool program je v MVP **aktivní v aplikaci** (broker vidí progres; admin spravuje období + exporty).

---

## Otevřené (neblokující) — backlog na post‑MVP / právní/ops
- Výběr eSign providera + finální šablony dokumentů (NDA, Souhlas GDPR, Rezervační smlouva).
- Automatické párování bankovních plateb (bank feed) vs ruční potvrzení (MVP ručně).
- Rozšíření rolí (např. Compliance/Legal) a granularita oprávnění.

---

---

## EPIC 1 (zdrojový dokument)

## 0) Co se mění oproti předchozí verzi
- **SLA investora je sjednocené:** 1 deadline **48 h** na celý balík dokumentů (Souhlas + NDA + Rezervační smlouva).  
- **Pilotní gating:** self‑signup + **admin approval**.

---

## 1) Kickoff & porozumění (max 8 vět)
Tipconnecta je B2B platforma, která propojuje **brokery (obchodníky)** a **developery** s cílem profinancovat konkrétní **tikety** přes investory. Většina citlivých informací o projektu je před odesláním rezervace **zamaskovaná** a odemkne se až po právním kroku (Souhlas+NDA). Investor není uživatel platformy; jde o interní záznam brokera a investor podepisuje dokumenty mimo platformu (eSign). Po podpisu rezervační smlouvy investorem vstupuje rezervace do **fronty** a může se dostat „do kapacity“ (top N), kde developer podepisuje / zamítá. Po profinancování developerem vzniká nárok na provizi (success‑fee). Platforma je interní, za loginem, CZ jazyk potvrzen.

---

## 2) Odpovědi, které už máme z dat (nemusíme se ptát)
- **Investor není uživatelský účet** a je veden jako „záznam v evidenci obchodníka“, vždy pod konkrétním brokerem.  
- Rezervace má **dvoufázové odmaskování** (po Souhlasu+NDA se odemknou identity a detail; aktivace až po podpisu rezervační smlouvy investorem i developerem).  
- Stavy rezervace zahrnují „odesláno investorovi“, „Souhlas+NDA potvrzeny“, „podepsáno investorem ve frontě / v kapacitě“, „aktivní“, „financování potvrzeno“.  
- Role „broker 1“ = přivedl investora, „broker 2“ = přivedl projekt (relevantní pro split / reporting).  
- Pole profilu brokera i developera včetně povinností a toho, kdo je vyplňuje, jsou definované (včetně úrovní a slotů u brokera).

---

## 3) Rozhodnutí uzavřené (dříve „Nejasnosti“) — VYŘEŠENO

Tato kapitola nahrazuje dřívější „otázky na ownera“. Rozhodnutí jsou zvolená tak, aby:
- odpovídala kanonickým datům (SLA, role, stavy),  
- dala adminovi plnou kontrolu nad platformou,  
- a zároveň byla UX obchodně jednoduchá (minimum kroků, jasné CTA, auditní stopa).

### 3.1 Scope & moduly v MVP
1. **Pool program:** v MVP je **aktivní v UI** (Broker vidí výkon + žebříček; Admin nastavuje období a pravidla).  
2. **Pre‑login web:** v MVP **neřešíme návrh veřejných landingů**. Počítáme ale s budoucím webem: pokud je uživatel přihlášený a navštíví veřejnou část, uvidí CTA „Přejít do aplikace“.  
3. **FAQ / Jak to funguje:** není na veřejném webu; v MVP bude **po přihlášení** v části „Nápověda“.

### 3.2 Gating pilotu (self‑signup + admin approval)
1. Self‑signup je povolen pro Broker i Developer. Po registraci je účet ve stavu **Pending approval** (read‑only / bez přístupu do marketplace).  
2. Admin approval má 3 výsledky: **Approve / Request more info / Reject**.  
3. Doporučený checklist (MVP): IČO / OR kontrola, validace e‑mailu a telefonu, kontrola role (broker vs developer), základní AML/KYC „fit“ (interní), potvrzení podmínek platformy. Vše se loguje (audit).

### 3.3 Multi‑uživatelé na firmu (Developer)
1. Je to **MVP must‑have**: jeden developer může mít více uživatelů.  
2. Role v rámci firmy: **Owner** (správa členů), **Member** (běžná práce), **Finance** (přístup k fakturaci / výplatám).  
3. Pozvánky: Owner posílá invite e‑mailem; Admin může přidat/odebrat členy (full control).

### 3.4 Dokumenty & podpisy (eSign) + SLA
1. Dokumenty se posílají jako **1 eSign envelope** (1 link).  
2. V eSign proběhne **2‑krokové podepisování v jednom okně**:  
   - Krok A: **Souhlas se zpracováním + NDA** (Platforma ↔ Investor)  
   - Krok B: **Rezervační smlouva** (Developer ↔ Investor)  
   Po dokončení A se automaticky zobrazí B.  
3. **SLA 48 h** je jednotné pro celý balík a **začíná běžet okamžikem odeslání** rezervace brokerem investorovi (timestamp `sent_to_investor_at`).  
4. Remindery: automaticky **T+24h** a **T+42h** + ruční „Znovu poslat“ (rate‑limit 1×/6h).  
5. Minimální data investora pro eSign: **firma + kontaktní osoba + e‑mail** (povinné). Telefon je volitelný.

### 3.5 Matching & posudky (škálovatelně)
1. Matching je viditelný na **kartě tiketu** i v **detailu tiketu**.  
2. U jednoho tiketu může být **desítky investorů** → matching se zobrazuje v draweru/panelu s filtrem, stránkováním a exportem.  
3. Admin může k tiketu připojit:  
   - **znalecký posudek / zdroj** (odkaz) a metadata (autor/organizace, datum),  
   - krátký **admin komentář** („co je důležité“).  
   Broker vidí náhled + odkaz na zdroj.

### 3.6 „Hlídací pes“ (watchlist + e‑mail digests)
1. Broker může u tiketu/projektu zapnout **Sledovat** (watchlist).  
2. Nastavení hlídacího psa: interval (denně / 2× týdně / týdně), typy notifikací (nové tikety, změna stavu, nové matching shody).  
3. E‑maily chodí opakovaně dle intervalu; v e‑mailu je přehled „co je nového“ + deep‑linky do aplikace.

### 3.7 Globální navigace & layout
1. Aplikace používá **top navigation (menu nahoře)**; žádný levý sidebar.  
2. V top‑nav: hlavní sekce role (Broker/Developer/Admin) + rychlé akce (např. „Vytvořit lead“, „Export“) + user menu (profil, nastavení, nápověda).  
3. Všechny obrazovky jsou desktop‑first, responsivní.

### 3.8 Spory / incidenty (MVP‑lite)
1. Spory řešíme v MVP jako **admin‑managed incident**: založení sporu, přiřazení tiketu/rezervace, poznámky, přílohy, statusy.  
2. Broker/Developer mohou nahlásit problém přes jednoduchý formulář, ale workflow spravuje Admin.

---

## 4) Předpoklady (sjednoceno s kanonickými daty; bez pracovních poznámek)

- **Telefon při registraci** (Broker/Developer): povinný pro pilot (rychlé ověření), lze změnit post‑MVP.  
- **Investor není uživatel platformy**; je to záznam brokera. Pro eSign je povinný e‑mail.  
- **Přístup do marketplace**: až po dokončení „legal onboarding“ role (souhlasy / podmínky) + admin approval.  
- **Auditní stopa**: všechny klíčové kroky (odeslání eSign, podpisy, změna stavu, přidání/invite uživatele) se logují.  
- **Maskování obsahu**: před odemknutím se citlivé texty skrývají/teasují a **obrázky se pouze rozmazávají** (neodstraňují).  
- **Admin je single account** (zatím jeden); systém je připraven na více adminů (post‑MVP).

---

## 5) Úkoly / deliverables pro komplexní UX zadávací dokumentaci (checklist)
### 5.1 Foundation (Product + Domain)
- [ ] Konsolidovat **glossary** (projekt, tiket, rezervace, investor záznam, kapacita, SLA, aktivace, financování, provize).
- [ ] Definovat **MVP scope** vs. post‑MVP (včetně Pool, multi‑user, spory).
- [ ] Matrix **Role × Permissions** (Broker, Developer, Admin + budoucí Team roles).
- [ ] Decision log (1 stránka) + změny verzí.

### 5.2 UX
- [ ] Persony (min. Broker + Developer + Admin) + JTBD (z dat + doplnění).
- [ ] Customer Journey (broker/developer) s milníky: maskování → Souhlas+NDA → rezervační smlouva → kapacita → aktivace → financování → provize.
- [ ] Sitemap + navigační koncept (desktop).
- [ ] Klíčové user flows (happy path + edge cases):
  - signup + admin approval
  - publish ticket (developer + admin)
  - browse + detail (mask/unmask)
  - create reservation + eSign 48h balík
  - queue/capacity + developer decision
  - financing confirmation
  - provize: fakturace developer→platforma, obchodník→platforma, payout
  - admin override / incident
- [ ] Wireframy (text/ASCII) pro každou obrazovku.
- [ ] Prázdné stavy, error stavy, loading stavy pro každý flow.

### 5.4 Copywriting
- [ ] Tone of voice pravidla + slovník (co říkáme / neříkáme).
- [ ] Mikrocopy knihovna (error hlášky, SLA deadliny, důvěra, NDA).
- [ ] Full text pro každou obrazovku + notifikační e-maily.

### 5.5 Data & procesní logika (pro vývoj)
- [ ] Datový model (entity + povinná pole) a state machines (rezervace, tiket, projekt, účet).
- [ ] Validace a pravidla (client/server).
- [ ] Auditní stopa: co logujeme, kdo vidí, export.
- [ ] API requirements (endpoints, payloads) + webhooky pro eSign.
- [ ] Analytický tracking plán (eventy + parametry) + KPI funnel.

### 5.6 Testování
- [ ] Testovací scénáře (usability) pro brokera: „najdu deal 20M+ a pošlu investora k podpisu do 3 min“.  
- [ ] Testovací scénáře pro developera: „zvládnu podepsat/odmítnout a neztratím pořadí ve frontě“.
- [ ] Bezpečnostní review (citlivé info + maskování + přístupová práva).

---

# EPIC 1 – Přístup, účty, onboarding, admin approval
## Cíl EPICu
- Umožnit self‑signup pro brokera a developera.
- Zajistit pilotní gating přes admin approval.
- Po schválení vynutit dokončení profilu + smluvních potvrzení dle role.
- Zajistit základní správu účtu (login, reset hesla).

---

## [AUTH-01] Přihlášení
Cíl uživatele: Přihlásit se do Tipconnecty.  
Cíl byznysu: Bezpečný vstup do app; minimalizovat support na přístup.  
Primární CTA / sekundární CTA: **Přihlásit se** / Zapomenuté heslo, Požádat o přístup  
KPI: login_success_rate, login_error_rate, forgot_password_rate

Obsah (texty 1:1):
- H1: „Přihlášení“
- Perex: „Tipconnecta je uzavřený pilotní klub. Přístup získáte po schválení administrátorem.“
- Field label: „Přihlašovací e‑mail“
- Field label: „Heslo“
- CTA primary: „Přihlásit se“
- Link: „Zapomenuté heslo“
- Divider: „Nemáte účet?“
- CTA secondary: „Požádat o přístup“
- Footer microcopy: „Přihlášením souhlasíte s podmínkami používání a zpracováním údajů.“

Stavy:
- loading: disabled CTA + spinner
- error: „Nesprávný e‑mail nebo heslo.“
- success: redirect podle stavu účtu (pending / onboarding / app)

Validace a pravidla:
- email validace
- heslo min. 8 znaků
- rate limit (server)

Analytické eventy:
- auth_login_viewed
- auth_login_submitted {has_error, error_type}
- auth_forgot_password_clicked
- auth_signup_clicked

---

## [AUTH-02] Požádat o přístup – krok 1/2 (Účet + role)
Cíl uživatele: Vytvořit účet a vybrat roli (Broker / Developer).  
Cíl byznysu: Získat kvalifikovanou žádost do pilotu; minimalizovat fake účty.  
Primární CTA / sekundární CTA: **Pokračovat** / Zpět na přihlášení  
KPI: signup_start_rate, step1_completion_rate, dropoff_step1

Obsah (texty 1:1):
- H1: „Požádat o přístup“
- Perex: „Pilotní přístup schvaluje administrátor. Zabere to 1–2 minuty.“
- Role selector label: „Jsem“
  - Option A: „Broker / obchodník (přivádím investory a/nebo dealy)“
  - Option B: „Developer (publikuji tikety, řeším financování)“
- Field label: „Pracovní e‑mail“
- Field label: „Telefon“
- Field label: „Heslo“
- Help: „Použijte pracovní kontakt – zrychlí to schválení.“
- CTA primary: „Pokračovat“
- CTA secondary: „Zpět na přihlášení“

Stavy:
- loading: CTA disabled
- error: „Tento e‑mail už v systému existuje.“
- edge: role nevybrána → disable CTA

Validace a pravidla:
- e‑mail unikátní, formát
- telefon formát (CZ +420 / 9 číslic)
- heslo min. 8 znaků
- role povinná

Analytické eventy:
- auth_signup_step1_viewed
- auth_signup_step1_submitted {role, has_error, error_type}

---

## [AUTH-03A] Požádat o přístup – krok 2/2 (Broker žádost)
Cíl uživatele: Dodat údaje pro schválení brokera.  
Cíl byznysu: Mít data pro admin approval + budoucí matching.  
Primární CTA / sekundární CTA: **Odeslat žádost** / Zpět  
KPI: signup_submit_rate_broker, dropoff_step2_broker

Obsah (texty 1:1):
- H1: „Broker profil (pro schválení)“
- Perex: „Tyto údaje vidí administrátor. Váš účet aktivujeme po ověření.“
- Field: „Typ subjektu“ (Fyzická osoba / Právnická osoba)
- Conditional fields:
  - FO: „Jméno a příjmení“
  - PO: „Název společnosti“, „IČO“
- Field: „Adresa sídla / bydliště“
- Field: „Kontaktní e‑mail“ (prefill = login email, editable)
- Field: „Kontaktní telefon“ (prefill = login phone)
- Field: „Region působnosti“ (multi-select kraje)
- Optional:
  - „Specializace“ (multi-select)
  - „Preferovaný způsob komunikace“ (telefon / e‑mail / WhatsApp / jiné)
- Checkbox: „Potvrzuji, že mám oprávnění evidovat údaje investorů a kontaktovat je.“
- CTA: „Odeslat žádost“
- Microcopy: „Po schválení doplníte smluvní dokumenty a fakturační údaje.“

Stavy:
- error: chybějící povinné pole (inline)
- success: redirect na „Žádost odeslána“

Validace a pravidla:
- PO: IČO povinné, validace 8 číslic
- region povinný (min 1)
- adresa povinná
- prohlášení povinné

Analytické eventy:
- auth_signup_step2_broker_viewed
- auth_signup_step2_broker_submitted {subject_type, regions_count, has_error, error_type}

----------------------------------      3) Přístup do nabídky

[Typ subjektu v]  (FO/PO)

[FO] [Jméno a příjmení ________]
[PO] [Název společnosti _______] [IČO ________]

[Adresa _______________________]
[Kontaktní e-mail _____________]
[Kontaktní telefon ____________]
[Regiony (multi)  [Praha] [JMK] ...]
[+ Volitelné: Specializace ...]
[+ Volitelné: Komunikace v]

[ ] Potvrzuji oprávnění evidovat údaje investorů
[(CTA) Odeslat žádost]   [Zpět]

---

## [AUTH-03B] Požádat o přístup – krok 2/2 (Developer žádost)
Cíl uživatele: Dodat údaje pro schválení developera.  
Cíl byznysu: Získat supply stranu s kvalitními tikety; připravit zasmluvnění.  
Primární CTA / sekundární CTA: **Odeslat žádost** / Zpět  
KPI: signup_submit_rate_dev, dropoff_step2_dev

Obsah (texty 1:1):
- H1: „Developer profil (pro schválení)“
- Perex: „Tyto údaje vidí administrátor. Přístup aktivujeme po ověření.“
- Field: „Typ subjektu“ (Právnická osoba / Fyzická osoba podnikatel)
- Field: „Název společnosti“
- Field: „IČO“
- Optional: „DIČ“
- Field: „Sídlo společnosti“
- Field: „Země registrace“ (default: Česká republika)
- Field: „Kontaktní e‑mail“ (prefill)
- Field: „Kontaktní telefon“ (prefill)
- Oprávněná osoba:
  - „Jméno“, „Funkce“, „E‑mail“, „Telefon“
- Optional:
  - „Zaměření“ (typy projektů)
  - „Regiony působnosti“ (kraje)
  - „Typické financování“
- CTA: „Odeslat žádost“
- Microcopy: „Po schválení nastavíme zasmluvnění a budete moci publikovat tiket.“

Stavy:
- error inline
- success → „Žádost odeslána“

Validace a pravidla:
- company name, IČO, adresa, country, authorized person required
- IČO 8 číslic

Analytické eventy:
- auth_signup_step2_dev_viewed
- auth_signup_step2_dev_submitted {subject_type, has_error, error_type}

---

## [AUTH-04] Žádost odeslána (čeká na schválení)
Cíl uživatele: Vědět, co se děje a kdy získá přístup.  
Cíl byznysu: Snížit support dotazy „kdy mi to schválíte“.  
Primární CTA / sekundární CTA: **Zpět na přihlášení** / Kontaktovat support  
KPI: pending_screen_to_login, support_contact_rate

Obsah (texty 1:1):
- H1: „Žádost jsme přijali“
- Text: „Váš účet teď ověřuje administrátor. Ozveme se vám e‑mailem.“
- Bullets:
  - „Běžně do 1 pracovního dne.“
  - „Pokud budeme něco potřebovat doplnit, napíšeme vám.“
- CTA: „Zpět na přihlášení“
- Secondary: „Kontaktovat podporu“

Stavy:
- N/A

Validace a pravidla:
- N/A

Analytické eventy:
- auth_signup_submitted_success
- support_contact_clicked {context:"pending"}

---

## [AUTH-05] Stav účtu (gate screen – varianty)
> Zobrazí se po loginu, pokud účet není „aktivní a onboardovaný“.

Varianty:
A) Čeká na schválení  
B) Zamítnuto  
C) Pozastaveno  
D) Zablokováno

Cíl uživatele: Rozumět stavu účtu a dalším krokům.  
Cíl byznysu: Transparentnost, audit, snížení supportu.  
Primární CTA / sekundární CTA: podle varianty (Kontaktovat podporu / Zpět)  
KPI: status_view_rate, reapply_rate, support_contact_rate

Obsah (texty 1:1) – příklad varianta A:
- H1: „Účet čeká na schválení“
- Text: „Administrátor ověřuje vaši žádost. Jakmile bude hotovo, pošleme e‑mail.“
- CTA: „Kontaktovat podporu“
- Link: „Odhlásit se“

Stavy:
- N/A

Validace a pravidla:
- N/A

Analytické eventy:
- account_status_viewed {status}
- support_contact_clicked {context:"account_status", status}

---

## [AUTH-06] Zapomenuté heslo
Cíl uživatele: Obnovit přístup.  
Cíl byznysu: Snížit support.  
Primární CTA / sekundární CTA: **Odeslat odkaz** / Zpět na přihlášení  
KPI: reset_request_rate, reset_success_rate

Obsah (texty 1:1):
- H1: „Obnovit heslo“
- Text: „Pošleme vám e‑mail s odkazem na nastavení nového hesla.“
- Field: „E‑mail“
- CTA: „Odeslat odkaz“
- Link: „Zpět na přihlášení“

Stavy:
- success: „Odkaz jsme poslali, zkontrolujte e‑mail.“
- error: „Tento e‑mail v systému neznáme.“

Validace a pravidla:
- email validace

Analytické eventy:
- auth_reset_viewed
- auth_reset_submitted {has_error, error_type}

---

## [ADMIN-01] Admin – Přehled žádostí (schválení účtů)
Cíl uživatele: Rychle schválit/odmítnout žádosti o přístup.  
Cíl byznysu: Řídit kvalitu pilotního klubu („omezený klub“).  
Primární CTA / sekundární CTA: **Otevřít detail** / Rychlé schválení (volitelné)  
KPI: time_to_approval, approval_rate, rejection_rate

Obsah (texty 1:1):
- H1: „Žádosti o přístup“
- Tabs: „Čeká“ / „Schválené“ / „Zamítnuté“
- Table columns:
  - Datum žádosti
  - Role (Broker/Developer)
  - Jméno / Společnost
  - Region / Zaměření
  - Stav
  - Akce
- Empty state: „Žádné čekající žádosti.“

Stavy:
- loading: skeleton table
- error: „Nelze načíst žádosti.“

Validace a pravidla:
- akce vyžadují potvrzení (Approve/Reject)
- audit: každé rozhodnutí ukládá důvod

Analytické eventy:
- admin_applications_viewed
- admin_application_opened {application_id}
- admin_application_approved {application_id, role}
- admin_application_rejected {application_id, role, reason_code}

---

## [ADMIN-02] Admin – Detail žádosti (schválení / odmítnutí)
Cíl uživatele: Rozhodnout o přístupu + nastavit parametry.  
Cíl byznysu: Kvalita klubu, kontrola slotů/SLA.  
Primární CTA / sekundární CTA: **Schválit** / Zamítnout, Vyžádat doplnění (volitelné)  
KPI: decision_time, completeness_rate

Obsah (texty 1:1):
- H1: „Detail žádosti“
- Sekce: „Účet“ (e‑mail, telefon, role)
- Sekce: „Profil“ (dle role – pole ze signup)
- Sekce (pouze broker): „Nastavení brokera“
  - Úroveň: Partner/Premium/Elite
  - Limit aktivních rezervací (slotů)
- Sekce: „Interní poznámka admina“
- CTA: „Schválit účet“
- Secondary: „Zamítnout“ (vyžaduje důvod)
- Confirm modals:
  - Approve: „Schválit účet a aktivovat přístup?“
  - Reject: „Zamítnout účet“ + důvod (dropdown + text)

Stavy:
- loading: skeleton
- error: „Nelze načíst detail.“

Validace a pravidla:
- broker: level + slot limit povinné
- reject: reason povinný
- audit: uložit decision + admin note + timestamp

Analytické eventy:
- admin_application_detail_viewed {application_id}
- admin_application_approved {application_id, broker_level, slots}
- admin_application_rejected {application_id, reason_code}

-------------------------------- -------------------------
[Účet: email, telefon, role]     [(CTA) Schválit]
[Profil: pole...]                [Zamítnout]
[Broker nastavení: level, slots] [Poznámka admina]

---

## EPIC 2 (zdrojový dokument — očištěno o interní citace)

# Tipconnecta — UX zadávací dokumentace (EPIC 2)
**Verze:** v2.8.2 (UX ONLY)
**Datum:** 2026-01-23
**Scope:** interní aplikace za loginem (responzivní desktop), role: Broker/Obchodník, Developer, Admin.
**Zdroje (pouze tyto 3 soubory):**
- `Tipconnecta_Souhrn_Dat_DATA_FINAL_CLEAN_v1.2.1_CANONICAL.md`
- `Tipconnecta_Strategicky_Marketingovy_Deck_v1.2.1_CLEAN_CANONICAL.md`
- `Tipconnecta_Persona_BrokerPartner_20m_v1.2.1_CLEAN_CANONICAL.md`

---

## 0) Shrnutí změn (oproti původní logice v datech)
1) **SLA investora sjednocené:** 1 deadline **48h** na podpis celého balíku (Souhlas + NDA + Rezervační smlouva).
   - V datech je SLA členěné (Souhlas+NDA 48h + rezervační smlouva 48h), ale **v UX to sjednocujeme** do 1 odpočtu.
2) **Gating pilotu (signup):** **self‑signup + admin approval**.
3) **eSign balík:** posílat **3 dokumenty jako 1 eSign envelope** (1 session pro investora).
4) **Pool program:** v MVP **aktivní v aplikaci**.
5) **Více uživatelů k jednomu developerovi:** **must‑have v MVP**.

---

## 1) Rozhodnutí a parametry (freeze pro MVP)
### 1.1 Jazyk a měna
- **Jazyk:** CZ
- **Měna v aplikaci:** CZK / Kč
- **Způsob komunikace provizí:** v Kč, **bez DPH** (DPH řeší fakturace mimo aplikaci; fakturace řeší účetnictví).
  - Data zdůrazňují, že provize se komunikuje jako částka v Kč a DPH se řeší zvlášť.

### 1.2 Produktové entity (pro EPIC 2)
- **Projekt** = kontejner pro dokumentaci a více tiketů.
- **Tiket** = konkrétní nabídka financování (částka, výnos, splatnost, forma financování, zajištění, atd.).
- **Rezervace** = proces, kterým broker „introdukuje“ investora k tiketu přes auditovatelný workflow.

### 1.3 Maskování a odemykání
- Projekt/tiket existuje ve dvou režimech: **maskovaný teaser** a **odemknutý detail**.
- Obchodník vidí v teaseru maskované identity (projekt, developer, obrázky placeholder, omezené dokumenty).
- **Právní odemknutí** nastává po podpisu **Souhlasu se sdílením údajů + NDA** investorem:
  - odmaskování projektu a developera brokerovi,
  - zobrazení rezervace developerovi **včetně jména investora a obchodníka**,
  - auditní stopa introdukce.
- Investor **nemá účet v aplikaci**; projekt vidí pouze v rámci eSign procesu.

### 1.4 Konkurence brokerů, kapacita a fronta
- Tiket se **nezamyká** pro jednoho brokera; rozhoduje **čas podpisu investora**.
- Do kapacity (N) se počítají až rezervace od podpisu rezervační smlouvy investorem (čeká na podpis developera / aktivní / jednání).
- Po financování jedné rezervace ostatní automaticky zanikají.

### 1.5 Sloty brokera (limit „otevřených“ rezervací)
- Úrovně a výchozí limity: **Partner 10**, **Premium 25**, **Elite 50** (admin může měnit).

### 1.6 Provize (aktualizace dle rozhodnutí)
- **Celková provize:** 5 % z profinancované částky (success‑fee).
- **Split:** platforma 50 %, broker 1 25 %, broker 2 25 %.
- V aplikaci komunikujeme jako částky v Kč (bez DPH).
- Provize vzniká až po **profinancování** (success‑fee), což odpovídá personě.

> Pozn.: datový dokument uvádí obecný model provizí a vypořádání (včetně toho, že platí developer).
> Konkrétní procenta pro MVP bereme z vašeho rozhodnutí (5 % a split 50/25/25).

### 1.7 Povinné dokumenty v eSign balíku (1 envelope)
- **NDA** – smluvní strany: Platforma ↔ Investor
- **Souhlas se zpracováním a postoupení osobních údajů (GDPR / sdílení na developera)** – Platforma ↔ Investor
- **Rezervační smlouva** – Developer ↔ Investor
- UX princip: jasně oddělit „rezervaci“ od „investice“ a držet konzervativní jazyk (žádný hype, žádné sliby výnosů).

---

## 2) Rozhodnutí (vyřešeno)

- Pokud projekt nemá Broker 2, jeho podíl se vrací platformě (není připsán Broker 1).

## 3) Předpoklady (doplňuji logicky)
1) **Broker 1 = broker, který vytvořil rezervaci** (introdukce investora).
2) **Broker 2 = broker, který přinesl projekt (lead)** a projekt je na něj označen (hybrid model).
3) Když broker 2 neexistuje, **broker 1 získá celý brokerský share** (tj. 50 % z celkové provize).
4) „Otevřená rezervace“ pro účely slotů brokera počítáme od stavu **Odesláno investorovi** až do uzavření (zánik/expirace/financování).
5) Marketplace listujeme **tikety** (kvůli filtrům), ale vždy „v kontextu projektu“ (thumbnail/odkaz na projekt).

---

## 4) Checklist úkolů — co musí existovat, aby šlo uzavřít finální UX zadání
Níže je „komplexní seznam“ práce (nejen EPIC 2). Berte to jako backlog na zadávací dokumentaci.

### 4.1 Produktová logika (must‑have pro zadání)
- [ ] Finalizovat **role & oprávnění** (Broker, Developer, Admin; multi‑user developer).
- [ ] Finalizovat **stavové automaty**: projekt, tiket, rezervace, dokumenty, provize, pool. (včetně přechodů, kdo je spouští)
- [ ] Definovat **SLA** a jak se promítne do UX (počítání času, reminder, expirace, re‑send).
- [ ] Definovat **kapacitu tiketu** a chování fronty (co vidí kdo, bez úniku identit).
- [ ] Definovat **slot policy** pro brokery (kdy se slot obsazuje/vrací).
- [ ] Definovat pravidla **broker hybrid**: projekt lead vytvořený brokerem → přiřazení developerovi → dopad na provize.
- [ ] Definovat „**ticket readiness**“ minimální standard (parametry + dokumenty) a admin checklist pro publikaci.

### 4.2 UX architektura (IA) a flows
- [ ] Sitemap/navigace pro každou roli (Broker/Developer/Admin).
- [ ] End‑to‑end journey: Broker i Developer (od signup → první publikovaný tiket → první profinancování).
- [ ] Klíčové happy‑path + edge‑case flows:
  - [ ] Ticket discovery → rezervace → podpisy → aktivace → jednání → financování → provize
  - [ ] Ticket expirace, rezervace expirace, odmítnutí developerem, zrušení adminem
  - [ ] 2 brokere na 1 projektu (split)
  - [ ] Kapacita plná a čekání ve frontě (přesuny z fronty do kapacity)
- [ ] Definovat UX pro investora „mimo app“: email + eSign page (co vidí, jaké copy, jaké kroky).

### 4.4 Copywriting (součást UX)
- [ ] Tone of voice pravidla (vykání; věcné; žádné sliby výnosů; oddělit rezervaci vs investici).
- [ ] Mikrocopy pro SLA/timeline (co se děje, kdo je na tahu).
- [ ] E‑mail šablony: pozvánka k podpisu, reminder, „signature complete“, expirace.
- [ ] FAQ bloky v app: „Jak funguje maskování“, „Jak funguje kapacita“, „Kdy vzniká nárok na provizi“.

### 4.5 Měření (analytics) + KPI tree
- [ ] Definovat activation KPI pro brokera: do 7 dní nastavit filtry + vytvořit investora + odeslat 1 rezervaci.
- [ ] Funnel KPI v milnících rezervace (odesláno → Souhlas+NDA → podpis investora → aktivní → profinancováno).
- [ ] Event taxonomy + parametry; dashboard metriky.

### 4.6 Handoff pro vývoj (bez kódování, ale precizní specifikace)
- [ ] Data requirements per screen (API kontrakty; validace; error map).
- [ ] Notifikace (in‑app + email) a jejich spouštěče (SLA reminder, změna stavu).
- [ ] Audit log — které akce se logují a kde se v aplikaci zobrazují.

---

# EPIC 2 — Marketplace tiketů + Rezervace (Broker)

## EPIC 2 — Cíl
Broker má **rychle**:
1) vyfiltrovat vhodné tikety (20M+),
2) vybrat/vytvořit investora,
3) odeslat eSign balík,
4) sledovat stav a deadline, bez chaosu a bez rizika „obejití“.

**Poznámka UX:** „Zahájit rezervaci“ probíhá jako **dvoukrokový modal**: (1) výběr/založení investora, (2) odeslání eSign balíku.

Persona požaduje: tvrdé filtry (20M+, zástava 1. pořadí, zápůjčka/úvěr), rychlý proces a jistotu introdukce.

---

## EPIC 2 — Navigace (Broker)
- **Tikety** (Marketplace)
- **Rezervace**
- **Investoři**
- **Pool** (MVP active)
- **Profil**

---

## [BRK-110] Projekt — Detail (teaser / maskovaný)

**Účel:** rychlý „teaser“ projektu v marketplace. Umožní brokerovi vyhodnotit, zda projekt stojí za řešení (i v maskovaném režimu), a přejít na tikety projektu.

### Varianty stavu
- **Maskovaný projekt:** citlivé části textu jsou zkrácené/teasované; **obrázky jsou pouze rozmazané** (nikdy úplně skryté).  
- **Odemknutý projekt:** po splnění podmínky (Souhlas+NDA na straně investora v rámci rezervace / nebo admin unlock dle pravidel) se odkryjí detaily dle rolí.

### Co stránka obsahuje
1. **Header projektu**
   - Název projektu, lokalita, typ projektu, tagy, základní metriky (cílová částka / min. investice / # tiketů).
   - Stav projektu: Draft / Publikovaný / Pozastavený / Ukončený.
2. **Media (bez modálu)**
   - Hero obrázek + thumbnail galerie; klik na thumbnail mění hero; šipky pro další/předchozí.
   - Maskovaný stav = blur (stejný layout, pouze rozmazané).
3. **Souhrny a finanční metriky**
   - **Součet provizí všech tiketů v projektu (bez DPH)** + rozpad „tiket → provize“ (v tooltipu / v rozbalení).
   - Rychlé „highlighty“ (např. ROI/IRR, zajištění, časový horizont) – dle kanonických dat.
4. **Popis projektu**
   - Krátký perex + „Detailní popis“ (dlouhý text / sekce; viz i vstupní pole v Admin/Developer zadání).
5. **Tikety v projektu (preview)**
   - Výpis top 3 tiketů (karta) + CTA „Zobrazit všechny tikety projektu“ → [BRK-200] s filtrem na projekt.

### Klíčové interakce
- „Zobrazit všechny tikety“ (primární)  
- „Sledovat projekt“ (volitelné; součást Hlídacího psa)

### Analytika (minimální)
- `project_teaser_viewed`, `project_followed_toggled`, `project_tickets_opened`


## [BRK-211] Projekt — Detail (odemknutý)
Cíl uživatele: Vidět plné informace (včetně identity developera) a posunout jednání.
Cíl byznysu: Zrychlit přechod do jednání a profinancování, snížit spory o introdukci.
Primární CTA / sekundární CTA:
- Primární: **Otevřít rezervaci** (pokud existuje) / **Kontaktovat developera**
- Sekundární: Stáhnout dokumenty, Zobrazit audit stopu

KPI:
- time_to_next_step (po odemknutí)
- % odemknutých projektů, které přejdou do aktivní rezervace

Obsah (texty 1:1):
- H1: **(Plný název projektu)**
- Badge: **Odemknuto po Souhlasu + NDA**
- Sekce „Developer“:
  - Název developera, IČO, sídlo, kontakty (dle nastavení)
- Sekce „Popis projektu“ (plná verze)
- Sekce „Lokalita“: kraj + město + (volitelně) přesná adresa/parcelní identifikace
- Sekce „Dokumenty“:
  - Předrezervační
  - Odemknuté po Souhlasu+NDA (DD pack)
- Sekce „Galerie“: hlavní obrázek + galerie
- Panel „Audit introdukce“:
  - Souhlas+NDA podepsáno: datum/čas
  - Rezervace: ID, broker, investor (už viditelné)

Stavy:
- loading / error standard
- edge case: odemknuto, ale rezervace zanikla (expirace) → zobrazit důvod + CTA „Vytvořit novou rezervaci“

Validace a pravidla:
- Povinné bloky odemknutého detailu (identita projektu, identita developera, plné texty, dokumenty, obrázky, lokality).

Analytické eventy:
- `project_unlocked_viewed` (project_id, unlock_source="consent_nda")
- `developer_contact_clicked` (project_id, channel="email|phone")
- `audit_panel_opened` (project_id)

---

## [BRK-220] Rezervace — Modal (step 1/2) „Zahájit rezervaci“

**Spouštěč:** tlačítko „Rezervovat“ přímo na kartě tiketu v [BRK-200] (bez nutnosti jít do detailu).

### Cíl kroku 1
Vybrat investora (nebo ho **rychle založit**), zkontrolovat základní parametry a uložit rozpracovanou rezervaci jako koncept.

### Obsah (UI)
1. **Souhrn tiketu** (read‑only)
2. **Investor (výběr / založení)**: vyhledávání + CTA **„+ Nový investor“** (inline form v modálu; po uložení auto‑select).
3. **Poznámka k rezervaci** (volitelná) – interní.
4. **Uložení konceptu**: autosave + CTA „Uložit jako koncept“; při zavření modálu koncept uložit.

### Navigace / CTA
- Primární: „Pokračovat“ → [BRK-230]  
- Sekundární: „Uložit jako koncept“

### Rozpracované rezervace (koncepty)
- V [BRK-300] (Rezervace) záložka „Rozpracované“ + rychlé „Pokračovat“.

### Validace
- E‑mail investora povinný (eSign).


## [BRK-221] Investor — Detail (Broker)

**Účel:** správa investorů v databázi brokera (detail, editace, historie rezervací).  
Při rezervaci se investor dá vytvořit i „rychle“ inline v [BRK-220].

### Co stránka obsahuje
- Firma, kontaktní osoba, e‑mail (pov.), telefon (vol.), poznámky.
- Historie rezervací a podpisů.
- Audit souhlasů (read‑only).

### Akce
- Upravit / Archivovat / Export kontaktu


## [BRK-230] Rezervace — Modal (step 2/2) „Potvrzení rezervace“

### Co investor podepíše (1 eSign envelope, 2 kroky v jednom okně)
1. **Krok A:** Souhlas se zpracováním + NDA  
2. **Krok B:** Rezervační smlouva  
Po dokončení A se automaticky zobrazí B.

### SLA
- 48 hodin běží **od odeslání** (`sent_to_investor_at`), ne od otevření.

### Obsah (UI)
- Souhrn tiketu + investora
- Checkbox „Potvrzuji správnost údajů“
- Volitelná zpráva pro investora
- CTA: „Odeslat k podpisu“ / „Uložit jako koncept“


## [BRK-240] Rezervace — Přehled (list)
Cíl uživatele: Vidět, co je „na tahu“ a hlídat deadline.
Cíl byznysu: Zrychlit průchod funnelu, snížit expirace.
Primární CTA / sekundární CTA:
- Primární: Otevřít detail rezervace
- Sekundární: Resend (pokud čeká investor)

KPI:
- drop‑off mezi kroky podpisu
- time_to_sign

Obsah (texty 1:1):
- H1: **Rezervace**
- Tabs: Vše · Čeká na investora · Čeká na developera · Aktivní · Uzavřené
- Sloupce:
  - Projekt (mask/unlock badge)
  - Tiket (částka)
  - Investor (jen pro mě; vždy vidím)
  - Stav
  - Deadline (odpočet)
  - Akce

Stavy:
- empty
- error
- edge: rezervace v pořadí mimo kapacitu → status „Ve frontě“ (bez jmen ostatních)

Validace a pravidla:
- O pořadí rozhoduje čas podpisu investora; do kapacity jdou první N.

Analytické eventy:
- `reservations_list_viewed` (tab)
- `reservation_row_clicked` (reservation_id)
- `reservation_resend_clicked` (reservation_id)

---

## [BRK-241] Rezervace — Detail (timeline + audit)
Cíl uživatele: Vědět přesně, co se děje, kdo je na tahu, a co mám udělat.
Cíl byznysu: Udržet SLA, snížit ztráty a spory.
Primární CTA / sekundární CTA:
- Primární: **Připomenout investorovi** (dokud nehotovo) / **Kontaktovat developera** (po odemknutí)
- Sekundární: Zobrazit audit log, Požádat o zrušení (admin)

KPI:
- time_to_next_step
- % rezervací expirovaných

Obsah (texty 1:1):
- H1: **Rezervace #R‑000123**
- Status pill: „Čeká na podpis investora“
- Deadline banner: **Zbývá 17:32:10**
- Timeline (milníky):
  1) Odesláno investorovi (timestamp)
  2) Souhlas + NDA podepsáno (pending / done)
  3) Rezervační smlouva podepsaná investorem (pending / done)
  4) Podpis developera (48h) (pending / done)
  5) Aktivní rezervace → Jednání (30 dní) *(EPIC později detailně)*
- Sekce „Dokumenty“:
  - Souhlas (stav, audit id)
  - NDA (stav, audit id)
  - Rezervační smlouva (stav, audit id)
- Sekce „Kapacita/Fronta“:
  - Kapacita tiketu: 3
  - V kapacitě: ano/ne
  - Pořadí dle podpisu investora (zobrazit jen číslo, ne ostatní)
- Sekce „Zprávy“:
  - poslední odeslaný e‑mail + resend
- Audit log:
  - „Investor a obchodník byli developerovi představení platformou“ (po Souhlasu+NDA)

Stavy:
- loading / error
- edge cases:
  - Expired: „Vypršelo SLA“ + CTA „Vytvořit novou rezervaci“
  - Developer odmítl podpis: „Odmítnuto developerem“ + důvod
  - Zrušeno adminem: zobrazit důvod zrušení

Validace a pravidla:
- Odemknutí a auditní stopa po Souhlasu+NDA.
- Kapacita se počítá až po podpisu rezervační smlouvy investorem.

Analytické eventy:
- `reservation_detail_viewed` (reservation_id, status)
- `reservation_reminder_clicked` (reservation_id, channel="email")
- `reservation_audit_opened` (reservation_id)
- `reservation_expired_viewed` (reservation_id)

---

## [BRK-250] Pool — Přehled (MVP)

- Ukázat výkon brokera a **pořadí v žebříčku anonymně** (bez údajů ostatních brokerů).
- Zobrazit: „Vaše pořadí: X z Y“ + percentile.
- Pool bonusy včetně případné fakturace (předmět fakturace doplňuje Admin).


# EPIC 4 — BRK: Tikety / Marketplace (SLA platnosti tiketu + Matching investorů + LTV)

## Proč tento EPIC
Broker (obchodník) potřebuje v marketplace rychle:
- poznat, **kolik času zbývá do konce platnosti tiketu** (publikační okno / „Zveřejněno do“),
- vidět **LTV a zajištění** (bez složitostí),
- vidět **párování shod s investory** (match) a jedním krokem poslat investora do podpisů.

Tento EPIC doplňuje přesně tyto 3 oblasti do broker části marketplace.

## Scope (MVP)
- BRK marketplace list (karty/tabelární list) rozšířený o: **Platnost do / zbývá**, **LTV**, **Match summary**
- Ticket detail (broker) rozšířený o: **SLA panel**, **LTV panel**, **Match panel**
- Matching drawer/modal: **seznam investorů s hodnocením + důvody + filtry**
- Entry point do rezervace: **„Vybrat investora → Odeslat k podpisu“** (navazuje na EPIC 3)

## Non-goals (teď neděláme)
- redesign investora evidence (pouze quick add email, pokud chybí)
- změna pravidel kapacity/fronty (pouze transparentní zobrazení)
- scoring „quality ticket score“ (může přijít později)

---

## Rozhodnutí & pravidla (z dat + logika)
1) **Platnost tiketu**
- Tiket má publikační okno a může mít explicitní datum „Zveřejněno do“. Po uplynutí publikačního okna je tiket „Expirovaný“. Nové rezervace už nelze vytvořit; existující rezervace mohou doběhnout (informativně).  
2) **LTV**
- LTV je v první verzi **doporučené**, ne povinné. Pokud chybí posudek / odhad, neblokujeme publikaci. LTV a hodnota zástavy slouží jako evidence a pro matching; platforma podklady neověřuje.  
3) **Matching investorů**
- Matching kombinuje tvrdé filtry (měna, částka, doba, region) a měkké preference (výnos, typ projektu, typ zajištění, LTV). Výstupem je seznam investorů s hodnocením a důvody. Noví/neaktivní investoři jsou defaultně skrytí.

---

# Obrazovky (EPIC 4)

## [BRK-200] Tikety — Přehled (Broker)

### Globální layout
- **Top navigation** (menu nahoře). Nepoužívat levý sidebar.

### Seznam tiketů (karty)
- **List / Grid (3 vedle sebe)** přepínač.
- Karta:
  - vlevo obrázek projektu (maskovaný = blur; hover overlay „Otevřít detail“),
  - uprostřed metadata,
  - vpravo CTA: **Rezervovat**, Sledovat, Matching (počet) + náhled posudku/komentáře admina.

### Hlídací pes
- Sledování per tiket/projekt + nastavení intervalu e‑mailů.


## [BRK-210] Tiket — Detail (Broker)

### Media (bez modálu)
- Hero obrázek + thumbnails (klik mění hero) + šipky.
- Maskovaný stav = blur.

### Matching
- Náhled + CTA do [BRK-225] (drawer/panel) – škálovatelný pro desítky investorů.

### Kapacita
- Preferovat **sloty/tikety** (Kapacita: N • Rezervováno: X • Volné: Y) a segmentový indikátor místo čistého %.


## [BRK-225] Matching — Panel / Drawer (Broker)

- Seznam shod (desítky investorů) se stránkováním a filtrem.
- Náhled admin komentáře + odkaz na zdroj znaleckého posudku.
- Zkratka „Přiřadit k rezervaci“ (otevře [BRK-220] s předvybraným investorem).


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
Stavy:
- error: „Faktura není dostupná. Kontaktujte administrátora.“
- edge: PDF missing → ukázat „Čeká na vystavení faktury adminem.“
Validace a pravidla:
- VS musí být přítomné pro fakturované případy (jinak fallback: číslo faktury).
Analytické eventy:
- `dev_invoice_detail_viewed` {invoice_id}
- `dev_invoice_vs_copied` {invoice_id}
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
Stavy:
- loading / empty / error
- edge: „K fakturaci“, ale chybí částky → „Chybí výpočet provize, kontaktujte admin.“
Validace a pravidla:
- Částky zobrazovat primárně bez DPH (DPH řeší broker na své faktuře dle svého režimu).
Analytické eventy:
- `brk_commission_list_viewed` {broker_user_id}
- `brk_commission_row_opened` {provizni_pripad_id, status}
---
## [BRK-510] Podklady k fakturaci (Broker) — Detail + nahrání faktury

- Broker nahraje fakturu (PDF) k provizi/bonusu.
- Admin doplní **předmět fakturace** + proof úhrady.
- Pokud existuje pool bonus, řeší se stejně (dle pravidel poolu).


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
Stavy:
- pool disabled: „Pool program není v této fázi aktivní.“
- not qualified: leaderboard skrytý, jen vlastní progres
Validace a pravidla:
- Nikdy nezobrazit identity jiných brokerů (kromě admina).
Analytické eventy:
- `brk_pool_viewed` {broker_user_id, pool_period_id}
- `brk_pool_rules_opened` {pool_period_id}
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
Stavy:
- loading / empty / error
Validace a pravidla:
- Stavové labely musí odpovídat datům (invoice uploaded? payment confirmed? broker invoice received?).
Analytické eventy:
- `adm_finance_dashboard_viewed` {admin_user_id}
- `adm_finance_filter_used` {filters}
- `adm_provize_opened` {provizni_pripad_id}
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
Stavy:
- empty (je-li první období)
Validace a pravidla:
- U exportů existuje i anonymní varianta (A/B/C).
Analytické eventy:
- `adm_pool_list_viewed` {admin_user_id}
- `adm_pool_export_generated` {pool_period_id, anonymized: bool}
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
Stavy:
- none qualified: zobrazit pravidlo rollover 50/50 (platforma/rollover) + akce „Potvrdit rollover“.
Validace a pravidla:
- Uzávěrka uzamkne pořadí a výsledky (audit).
- Po vyplacení nelze měnit bez „admin override“ důvodu.
Analytické eventy:
- `adm_pool_period_viewed` {pool_period_id}
- `adm_pool_period_closed` {pool_period_id}
- `adm_pool_payout_confirmed` {pool_period_id, broker_id, amount}
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
- „Každý export obsahuje metadata (čas generování, kdo generoval, filtry, počet řádků).“
Stavy:
- generating: spinner + disable button
- error: „Export se nepodařilo vygenerovat.“
Validace a pravidla:
- Exporty musí respektovat oprávnění (admin plná data; developer jen své; broker jen své).
Analytické eventy:
- `adm_export_started` {export_type, filters}
- `adm_export_completed` {export_type, row_count}
- `adm_export_failed` {export_type, error}
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
Stavy:
- empty: „Pro zvolené filtry nejsou žádné události.“
- error: „Audit log nelze načíst.“
Validace a pravidla:
- Audit log je read-only (nelze mazat ani editovat z aplikace).
Analytické eventy:
- `adm_audit_viewed` {admin_user_id}
- `adm_audit_filter_used` {filters}
- `adm_audit_row_opened` {audit_event_id}
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
## Rozhodnutí (DPH a fakturace) — vyřešeno
- Default pro MVP: platforma je plátce DPH; částky uvádět bez DPH + štítek „+ DPH dle režimu“.


## Předpoklady (doplňuji logicky)
1) Pokud není Broker 2, Broker 1 dostává i jeho podíl (tj. broker share = 50 % z celkové provize).
2) Deadline pro vystavení faktury brokerem je admin-konfigurovatelný; default nastavíme na **14 dní od zpřístupnění podkladů**.
3) Čísla účtů / platební údaje platformy i developerů jsou primárně součástí faktury (abychom neměli citlivé údaje v aplikaci); v aplikaci zobrazujeme jen VS a „stáhnout PDF“.
---

# EPIC 6: Supply — Projekty & Tikety (Developer + Admin + Hybrid broker lead)

## 6.1 Cíl EPICu (proč existuje)
**Bez „supply“ (projekty + tikety) nemá marketplace co zobrazovat.** Tento EPIC definuje:
- tvorbu a správu **projektů** (kontejner pro dokumenty/obrázky),
- tvorbu a správu **tiketů** (konkrétní financování v rámci projektu),
- workflow **schvalování/publikace** adminem,
- workflow **žádostí o úpravu** (změny po publikaci),
- podporu pro **hybrid brokera**, který může založit „lead projekt“ před přiřazením developera.

> Pozn.: Dokumenty jsou navázané na projekt (ne na tiket). Tiket odkazuje na projekt a bere z něj obrázky/dokumenty (s řízenou viditelností).

## 6.2 Rozsah MVP
### In-scope (MVP)
- Developer:
  - vytvoří projekt, doplní základní info, lokalitu, obrázky a dokumenty,
  - vytvoří tiket v projektu,
  - odešle tiket (a tím i projektový obsah) ke schválení,
  - u zveřejněného tiketu může (namísto přímé editace) založit **žádost o úpravu**.
- Admin:
  - schválí / zamítne projekt+tiket,
  - nastaví publikační okno, kapacitu_N, publikační parametry a viditelnost dokumentů,
  - řeší žádosti o úpravu a udržuje audit.
- Broker (hybrid):
  - založí „lead projekt“ (minimální záznam), který admin později přiřadí developerovi.

### Out-of-scope (post‑MVP)
- Automatické importy dat/dealů (CRM import).
- Automatizované generování projektových podkladů (PDF pack).
- Pokročilé role/permissions pro admin (více adminů, granularita).

## 6.3 Klíčové entity & stavy (datově)
### Projekt (Project)
- **Draft** → **Ke schválení** → **Schváleno** / **Vráceno k doplnění** / **Zamítnuto** → (volitelně) **Archiv**  
- Projekt obsahuje: název, popisy (teaser + detail), lokalitu, obrázky, dokumenty, vazby na tikety.

### Tiket (Ticket)
- **Draft** → **Ke schválení** → **Zveřejněno** → (automaticky) **Expirace** / (ručně) **Skryto** → **Archiv**  
- Tiket nese parametry financování (částka, výnos, splatnost, forma, zajištění, LTV, apod.) a publikační nastavení (okno, kapacita, SLA).

### Žádost o úpravu (TicketChangeRequest)
- **Nová** → **Posouzení** → **Schváleno** / **Zamítnuto** → **Implementováno**  
- Použije se, pokud je tiket již zveřejněný a změny musí projít adminem (kvůli kvalitě a konzistenci).

---

## 6.4 Klíčové user flows
### Flow A — Developer: projekt → tiket → schválení → publikace
1) Developer vytvoří projekt (draft) a doplní základní info + lokalitu + dokumenty/obrázky  
2) V projektu vytvoří tiket (draft) a doplní parametry  
3) Klikne **Odeslat ke schválení**  
4) Admin zkontroluje „readiness“ (povinná pole + povinné podklady) → **Schválit a zveřejnit** / vrátit k doplnění  
5) Po zveřejnění je tiket dostupný v broker marketplace

### Flow B — Developer: změna zveřejněného tiketu
1) Developer na detailu tiketu klikne **Požádat o úpravu**  
2) Vybere, co chce změnit + doplní důvod  
3) Admin schválí / zamítne (případně „force“ s odůvodněním)  
4) Schválené změny se projeví v marketplace; tiket se označí „Upraveno“

### Flow C — Broker (hybrid): lead projekt → přiřazení developerovi
1) Broker vytvoří „lead projekt“ (minimální info)  
2) Admin schválí lead a přiřadí developera (nebo potvrdí návrh brokera)  
3) Developer doplní projekt do plného stavu a vytvoří tiket → schválení/publikace

---

# 6.5 Obrazovky (bez poznámek pro Figmu)

[DEV-PROJ-01] Projekty — Přehled (Developer)

Cíl uživatele:
Mít přehled o projektech a jejich tiketech, rychle vytvořit nový projekt a dotáhnout „readiness“ ke schválení.

Cíl byznysu:
Rychle a konzistentně naplnit supply (více kvalitních tiketů), zrychlit time‑to‑publish.

Primární CTA / sekundární CTA:
- Primární: **Nový projekt**
- Sekundární: **Nový tiket** (výběr projektu)

KPI:
- # vytvořených projektů / týden
- # tiketů odeslaných ke schválení
- Median „time to submit“ (od založení k odeslání)

Obsah (texty 1:1):
- H1: **Projekty**
- Subtext: *Projekt je kontejner pro dokumenty a obrázky. Tiket je konkrétní financování v rámci projektu.*
- Filtry:
  - „Stav“: Vše / Rozpracované / Ke schválení / Zveřejněné / Archiv
  - „Kraj“ (multi)
  - „Poslední změna“ (datum)
- Tabulka sloupců:
  - Projekt
  - Lokalita
  - Tikety (počet)
  - Stav
  - Poslední změna
  - Akce (Otevřít)

Stavy:
- loading: skeleton tabulky
- empty: „Zatím nemáte žádný projekt“ + CTA „Nový projekt“
- error: „Nepodařilo se načíst projekty. Zkuste to znovu.“
- edge: projekt „Vráceno k doplnění“ — zvýraznit červeným badge + link „Doplnit“

Validace a pravidla:
- žádná

Analytické eventy:
- dev_projects_view (role, filters_used)
- dev_project_create_click
- dev_ticket_create_click (from="projects_list")

Wireframe (ASCII):
[Header: Logo | Projekty | Tikety | Rezervace | Fakturace | Účet]
# EPIC 7: Profil, tým & nastavení — Notifikace, GDPR, podpora (Broker + Developer + Admin)

## 7.1 Proč tento EPIC (hodnota)
Tento EPIC doplňuje „provozní vrstvu“ platformy: uživatelé musí umět spravovat svůj profil (fakturační identita, kontakty), developer musí umět spravovat tým (multi‑user org), a celý proces potřebuje **notifikační centrum** (in‑app) + základní compliance (GDPR žádosti) + jednoduchou podporu (incident/dotaz).

## 7.2 Scope (MVP)
### In-scope
1) **Notifikační centrum v aplikaci** (broker/developer/admin)
- seznam notifikací + unread badge v headeru
- deep‑linky na relevantní objekty (rezervace, tiket, faktura, pool, admin queue)
- pravidla maskování (dokud není podepsán Souhlas+NDA)
- základní akce: „označit jako přečtené“, „označit vše jako přečtené“

2) **Profil & nastavení účtu** (broker/developer/admin)
- zobrazení core údajů (role, stav účtu, datum registrace/schválení, poslední login)
- editace kontaktních údajů (telefon, korespondenční adresa)
- bezpečnost: změna hesla, odhlášení ze všech zařízení
- nastavení notifikací (kanál: e‑mail/in‑app + volitelné kategorie)
- GDPR žádost (export / smazání) — iniciace z profilu
- podpora — vytvoření požadavku (incident/dotaz)

3) **Developer: tým organizace (multi‑user)**
- seznam členů + role
- pozvání člena e‑mailem (invite)
- změna role / deaktivace člena (Owner only)

4) **Admin: inbox požadavků (ops)**
- fronta: GDPR žádosti + podpora + žádosti o schválení citlivých změn profilu
- detail požadavku + rozhodnutí + audit

### Out-of-scope (post‑MVP)
- Live chat, interní „messaging“ mezi brokerem a developerem.
- 2FA povinně (volitelně později).
- Pokročilé notifikace (digest, weekly summary) a granularita (opt‑in per event).
- Plně integrovaný helpdesk (Jira/Zendesk) — v MVP ruční proces.

## 7.3 Klíčové entity & stavy (datově)
### Notification
- `notification_id`, `recipient_user_id`, `role`, `category` (Rezervace/Tiket/Finance/Účet/Pool/GDPR/Podpora)
- `title`, `body` (s proměnnými), `created_at`, `read_at`
- `channel` (in_app / email / both) + `delivery_status` (sent/delivered/failed) pro audit
- `related_entity_type` + `related_entity_id`
- **Masking flags:** `is_masked=true/false` + `masking_reason` (např. „čeká na Souhlas+NDA“)

### NotificationPreference
- `user_id`, `preferred_channel` (in_app / email / both)
- `optional_categories_opt_out[]` (např. „informativní“)
- Povinné kategorie (rezervace/eSign, finance, právní dokumenty) nelze vypnout.

### DeveloperOrganization + Membership
- Organization: `org_id`, `name`, `ico`, `dic`, `billing_email`, `status`
- Membership: `user_id`, `org_id`, `role` (Owner / Member / Finance), `status` (active/invited/deactivated)

### SupportRequest
- `request_id`, `created_by_user_id`, `type` (Incident/Dotaz/Změna profilu), `status` (Open/In progress/Waiting user/Resolved/Closed)
- `subject`, `description`, `attachments[]`, `related_entity` (volitelně)
- `created_at`, `updated_at`, `assigned_admin_user_id` (MVP = 1 admin)

### GDPRRequest
- `gdpr_request_id`, `created_by_user_id`, `request_type` (Export/Delete)
- `status` (Received/In progress/Resolved/Rejected)
- `created_at`, `resolved_at`, `resolution_note`
- Pozn.: faktické „smazání“ může být v praxi anonymizace + retenční výjimky (audit musí zůstat).

## 7.4 Klíčové UX pravidla (must‑have)
- **Maskování v notifikacích**: dokud investor nepodepíše Souhlas+NDA, notifikace nesmí prozradit jména (projekt/developer směrem k brokerovi; investor/broker směrem k developerovi). Texty používají interní ID a generické popisy.
- **Jedna věc = jedna akce**: notifikace vždy obsahuje jasné „co dál“ a deep‑link.
- **Citlivé změny profilu** (IČO/DIČ, bankovní účet, fakturační identita): v MVP jako **žádost** ke schválení adminem (audit + prevence podvodů). Nekritické změny (telefon/adresa) se propisují hned.
- **Multi‑user developer**: minimální role:
  - Owner: vše + správa týmu
  - Member: projekty/tikety (create/edit/submit), rezervace read‑only
  - Finance: fakturace (view), potvrzení přijetí financí (pokud mu to admin povolí)
- **Povinné notifikace** nelze vypnout: eSign kroky, SLA expirace, finance/fakturace, schvalování účtu.

---

# 7.5 Obrazovky (bez poznámek pro Figmu)

[SYS-INAPP-02] Notifikační centrum

Cíl uživatele:
Rychle vidět, co se změnilo (podpisy, SLA, finance, schválení), a dostat se jedním klikem na správné místo.

Cíl byznysu:
Snížit drop‑off v kritických SLA krocích (48h podpis, 48h rozhodnutí, 14 dní splatnost), zrychlit reakce a zvýšit konverzi.

Primární CTA / sekundární CTA:
- Primární: klik na notifikaci (otevřít detail / deep‑link)
- Sekundární: **Označit vše jako přečtené**, **Nastavení notifikací**

KPI:
- % notifikací otevřených do 1h
- time‑to‑action po notifikaci (např. resend eSign, rozhodnutí)
- drop‑off v SLA (podpisy, rozhodnutí)

Obsah (texty 1:1):
- H1: **Notifikace**
- Filtry:
  - „Zobrazit“: Vše / Nepřečtené
  - „Kategorie“: Vše / Rezervace / Tikety / Finance / Pool / Účet / GDPR / Podpora
  - „Období“: 7 dní / 30 dní / 90 dní (default 30)
- Akce:
  - **Označit vše jako přečtené**
  - **Nastavení notifikací**
- Seznam (řádek notifikace):
  - Title (bold)
  - Subtext (1 řádek) + timestamp
  - Status chip (např. „SLA: 12h zbývá“, „Nové“, „Vyřešeno“)
- Příklady notifikací (maskované / odemknuté):
  - Maskované (broker): **Rezervace R‑1042: čeká na podpis investora** — *Zbývá 18h (deadline 48h).*
  - Odemknuté (developer): **Investor podepsal Souhlas+NDA** — *Rezervace R‑1042 na Tiket T‑88.*
  - Finance: **Provize uhrazena** — *Vznikl nárok na výplatu pro brokery.*
  - GDPR: **Žádost o export dat přijata** — *Odpovíme do 48 hodin.*
  - Podpora: **Požadavek přijat** — *Dáme vědět nejpozději do 1 pracovního dne.*

Stavy: loading / empty / error / success / edge cases
- Loading: skeleton řádků
- Empty (žádné notifikace):  
  **Zatím tu nic není.** *Jakmile se něco pohne v rezervaci, uvidíte to tady.*
- Error: „Notifikace se nepodařilo načíst. Zkusit znovu.“
- Edge: Notifikace odkazuje na entitu bez přístupu → „Tento obsah už není dostupný.“

Validace a pravidla:
- Uživatel vidí jen svoje notifikace (role-based)
- Maskování: `is_masked=true` → renderovat pouze interní ID + generický text
- Retence: min. 90 dní notifikací (MVP doporučení)

Analytické eventy:
- notifications_center_view (user_id, role, unread_count)
- notification_open (notification_id, category, is_masked)
- notification_mark_read (notification_id)
- notification_mark_all_read (count)
- notification_settings_click

Wireframe (ASCII):
[Header: Logo | Marketplace/Tikety/... | 🔔(3) | Profil]
- —

## Předpoklady (doplněno logicky)
- Pozvaní členové týmu developera prochází **admin approval** (konzistence s gating pilotu).
- Retence in‑app notifikací min. **90 dní** (kvůli dohledání a sporům).
- Ops SLO: podpora „1 pracovní den“; GDPR „48h“ (dle tabulky notifikací).
- Změny profilu řešíme jako typ SupportRequest („Změna profilu“) kvůli jednotné ops frontě.

# EPIC 8: Přehled & dashboardy — SLA centrum, pipeline a rychlé akce (Broker + Developer + Admin)

## 8.1 Proč tento EPIC (hodnota)
Tento EPIC doplňuje platformu o **role‑based „Přehled“** jako výchozí obrazovku po loginu. Cílem je:
- minimalizovat ztráty způsobené **propadnutím lhůt** (SLA),
- zrychlit „time‑to‑action“ (broker rychle vybere deal a investora; developer rychle rozhodne),
- dodat okamžitý „heartbeat“: co je dnes důležité, co brzy expiruje, co čeká na akci.

To přímo odpovídá potřebě brokera kvalifikovat deal rychle a mít jistotu, že proces je krátký a auditovatelný. 

---

## 8.2 Scope (MVP-first)
### In-scope (MVP)
1) **Přehled** pro každou roli jako landing po loginu (Broker / Developer / Admin).
2) **SLA feed** (nejbližší deadliny + overdue) agregovaný přes:
   - podpis investora (48h – jednotný balík, dle decision log),
   - podpis/rozhodnutí developera (48h),
   - konec jednání (30 dní),
   - expirace publikačního okna tiketu (default 90 dní),
   - splatnosti faktur (platforma → developer, broker → platforma),
   - uzávěrky pool období.
3) **Rychlé akce** (deep links do existujících obrazovek) + minimální KPI metriky (počty / částky).
4) **„Doporučené tikety“** pro brokera + „Tikety brzy expirují“ pro developera (bez nové logiky – používá existující data o publish okně 90 dní). 

### Out-of-scope (post‑MVP backlog)
- plně konfigurovatelné widgety dashboardu,
- grafy a časové řady (MVP stačí čísla + listy),
- „dealflow digest“ newsletter a watchlist (pouze jako notifikace post‑MVP),
- automatický „deal fitness score“ (pokud bude, vznikne až po validaci).

---

## 8.3 Datové požadavky (bez kódu) — co musí backend dodat
### 8.3.1 Dashboard feed (společné)
**A) `dashboard_summary`**
- `role` (broker|developer|admin)
- `kpi_cards[]`:
  - `id` (např. active_reservations_count)
  - `label`
  - `value` (number|string)
  - `delta` (volitelně)
  - `link` (route)

**B) `sla_items[]` (top 10, sort ASC dle due_at, overdue nahoře)**
- `sla_type`:
  - reservation_investor_signing_due
  - reservation_developer_action_due
  - reservation_negotiation_end_due
  - ticket_publish_expiring
  - invoice_due
  - pool_closure_due
- `entity_type` (reservation|ticket|invoice|pool_period)
- `entity_id`
- `title` (copy-ready, krátké)
- `due_at` (ISO datetime)
- `severity` (info|warning|critical)
- `primary_action` {label, link}
- `secondary_action` {label, link} (volitelně)
- `masking_state` (masked|unmasked) — aby feed nikdy neprozradil identitu v teaser režimu

**C) Role‑specifické listy**
- Broker:
  - `my_reservations_preview[]` (top 5)
  - `recommended_tickets[]` (top 5)
  - `investor_data_gaps[]` (investors_missing_preferences_count + link)
- Developer:
  - `reservations_need_action[]` (top 5)
  - `tickets_expiring[]` (top 5)
  - `ticket_readiness_issues[]` (top 5 – draft/submitted tickets)
  - `invoices_due[]` (top 5)
- Admin:
  - `approvals_pending[]` (top 5)
  - `sla_breaches[]` (top 10)
  - `marketplace_health` (counts + ratios)
  - `finance_ops` (unpaid invoices, payouts)
  - `pool_status` (current period progress)
  - `ops_queue_preview[]` (top 5)

---

## 8.4 UX pravidla a principy
1) **„Co hoří“ vždy nahoře:** SLA feed je první blok a je sticky v hierarchii.
2) **Urgency (konzistentní pravidlo):**
   - Critical: ≤ 6h do deadline nebo overdue
   - Warning: ≤ 24h
   - Info: > 24h
3) **Maskování:** V teaser režimu se v přehledu nikdy nezobrazují identity projektu/developera/investora (pouze „Projekt #123“ apod.).
4) **Matching je doporučení:** pokud na přehledu ukazujeme „shody investorů“, musí být doplněno mikrocopy „Doporučení (ne poradenství)“. 
5) **LTV je volitelné:** pokud chybí hodnota zástavy/posudek, Aplikace ukáže „LTV: —“ bez penalizace a bez blokace. 

---

## 8.5 Obrazovky (bez poznámek pro Figmu)

## [BRK-010] Přehled — Broker (Partner)
Cíl uživatele:
- Rychle vidět, co vyžaduje akci (SLA), a během pár minut rozhodnout: který tiket řešit a kterému investorovi ho poslat.
- Mít kontrolu nad rozpracovanými rezervacemi a provizemi (success‑fee po profinancování). 

Cíl byznysu:
- Zvýšit aktivaci brokerů a počet rezervací; snížit propadnutí SLA; zrychlit time‑to‑reservation.
- Podpořit „kurátorovanou“ práci brokera na relevantních ticích (20M+ a 1. zástava jako typické filtry). 

Primární CTA / sekundární CTA:
- Primární: **Prohlédnout tikety**
- Sekundární: Zobrazit rezervace · Přidat investora · Zobrazit provize

KPI:
- DAU/WAU brokerů
- `dashboard → ticket_open` CTR
- `dashboard → reservation_open` CTR
- # overdue SLA (broker‑owned kroky)
- time‑to‑action po přihlášení

Obsah (texty 1:1):
- H1: **Přehled**
- Subtext: *Dnes v kostce: nejbližší deadliny, rozpracované rezervace a tikety, které dávají smysl pro vaše investory.*
- Sekce „Nejbližší deadliny“:
  - Nadpis: **Nejbližší deadliny**
  - Mikrocopy: *Řadíme podle času do deadline. Kritické položky jsou zvýrazněné.*
  - Řádek (šablona):  
    - `⏳ {title}`  
    - *Deadline: {due_at_relative}*  
    - [CTA Otevřít] [Secondary Připomenout] (kde relevantní)
  - Příklad (investor signing):  
    - `⏳ Investor má podepsat balík dokumentů – Rezervace R‑000123`  
    - *Deadline: za 6 hodin*
- Sekce „Moje rezervace“:
  - Nadpis: **Moje rezervace**
  - Tab řazení: Vše · Ve frontě · V kapacitě · Aktivní jednání · Ukončené
  - Sloupce: Rezervace · Tiket · Stav · Deadline · Akce
- Sekce „Doporučené tikety pro vás“:
  - Nadpis: **Doporučené tikety pro vás**
  - Mikrocopy: *Vychází z parametrů tiketu a vašich investorů. Je to doporučení, ne poradenství.*
  - Karta (šablona):
    - **Projekt #123 (mask)** · Praha 5
    - **20 000 000 Kč** · **12,5 % p.a.** · **24 měsíců**
    - Zajištění: **Zástavní právo k nemovitosti · 1. pořadí**
    - LTV: **—** *(volitelně)*
    - Publikace: **Expiruje za 12 dní**
    - Shoda investorů: **2 vysoká · 4 střední · 1 nízká**
    - CTA: **Otevřít** · **Vybrat investora**
- Sekce „Moji investoři — kvalita dat“:
  - Nadpis: **Moji investoři — kvalita dat**
  - Text: *Chybějící preference snižují kvalitu shod. Doplňte je pro rychlejší výběr.*
  - Stat: **2 investoři bez preferencí** [Doplnit]

Stavy:
- loading: skeleton KPI + skeleton SLA list + skeleton tables
- empty (nový broker): 
  - „Zatím tu nic nemáte. Začněte tím, že přidáte investora nebo si projdete tikety.“
  - CTA: Přidat investora / Prohlédnout tikety
- error: „Přehled se nepodařilo načíst“ + Retry
- edge cases:
  - bez slotů → banner: „Nemáte volné sloty pro nové rezervace. Dokončete rozpracované nebo kontaktujte admina.“
  - žádné shody → u tiketu: „Žádná shoda podle nastavených preferencí (zkontrolujte investory).“

Validace a pravidla:
- Publikační expirace tiketu se řídí publish oknem 90 dní; expirované tikety nejsou v doporučených (jen v historických). 
- Shody investorů používají kombinaci tvrdých filtrů a měkkých preferencí a musí respektovat, že investoři jsou viditelní jen vlastníkovi (brokerovi) a adminovi. 
- LTV se zobrazuje pouze pokud existuje hodnota zástavy / posudek (volitelně). 

Analytické eventy:
- `brk_dashboard_view` (user_id, broker_level, slot_used, slot_total)
- `brk_dashboard_sla_item_click` (sla_type, entity_type, entity_id, severity)
- `brk_dashboard_ticket_open` (ticket_id, source="dashboard_recommended")
- `brk_dashboard_investor_gap_open` (missing_pref_count)

---

## [DEV-010] Přehled — Developer
Cíl uživatele:
- Vidět rezervace, které vyžadují rychlé rozhodnutí (48h) a mít kontrolu nad aktivními jednáními (30 dní).
- Včas řešit tikety, kterým končí publikační okno, a finance (faktury, potvrzení). 

Cíl byznysu:
- Zrychlit developer action rate (podepsat / zamítnout) a udržet supply (tikety aktivní v nabídce).
- Podpořit „tiket readiness“ standard (méně nekvalitních ticketů). 

Primární CTA / sekundární CTA:
- Primární: **Otevřít rezervace k rozhodnutí**
- Sekundární: Vytvořit tiket · Zobrazit tikety · Zobrazit fakturaci

KPI:
- % rozhodnutí developera do 48h
- # expirací tiketů bez akce
- time‑to‑publish ticket
- time‑to‑financing confirmation

Obsah (texty 1:1):
- H1: **Přehled**
- Subtext: *Co dnes vyžaduje akci: rezervace, tikety a finance.*
- KPI cards:
  - **K rozhodnutí (48h):** {count}
  - **Aktivní jednání (30 dní):** {count}
  - **Tikety v nabídce:** {count}
  - **Faktury k úhradě:** {count}
- Sekce „Rezervace k rozhodnutí“:
  - Nadpis: **Rezervace k rozhodnutí**
  - Řádek: `R‑000123 · Tiket T‑321 · Deadline: za 18h` [Otevřít] [Podepsat] [Zamítnout]
- Sekce „Jednání běží“:
  - Nadpis: **Aktivní jednání**
  - Řádek: `R‑000118 · Tiket T‑300 · Zbývá: 12 dní` [Otevřít]
- Sekce „Tikety brzy expirují“:
  - Nadpis: **Tikety brzy expirují**
  - Mikrocopy: *Tiket po expiraci zmizí z nabídky a nelze zakládat nové rezervace.*
  - Řádek: `T‑210 · Projekt {mask/unmask} · Expiruje za 5 dní` [Otevřít] [Požádat o prodloužení]
- Sekce „Připravenost tiketů“:
  - Nadpis: **Připravenost tiketů**
  - Mikrocopy: *Doplňte dokumenty a parametry pro rychlejší schválení.*
  - Řádek: `T‑Draft‑03 · Chybí: dokumenty (2), LTV (volitelně)` [Doplnit]

Stavy:
- loading: skeleton
- empty:
  - pokud developer nemá žádné rezervace: „Zatím nemáte žádné rezervace. Publikujte první tiket.“
  - CTA: Vytvořit tiket
- error: „Přehled se nepodařilo načíst“ + Retry
- edge cases:
  - developer má aktivní rezervace, ale tiket expiroval → v listu „Tikety brzy expirují“ se nezobrazuje jako blokující (rezervace může doběhnout), ale tiket je označen „Expirovaný“ a bez nových rezervací. 

Validace a pravidla:
- Publikační expirace: po expiraci nelze založit nové rezervace, existující mohou doběhnout. 
- „Požádat o prodloužení“ vytvoří admin request (SupportRequest typu „Ticket re-open / extend“) — admin rozhoduje o re-open. 
- LTV a posudek jsou volitelné; absence neblokuje publikaci v první verzi. 

Analytické eventy:
- `dev_dashboard_view` (user_id, org_id)
- `dev_dashboard_reservation_open` (reservation_id, source="dashboard")
- `dev_dashboard_ticket_extend_request` (ticket_id, days_to_expiry)
- `dev_dashboard_readiness_open` (ticket_id, missing_items_count)

---

## [ADM-010] Přehled — Admin (Pilot / Ops)
Cíl uživatele:
- Mít okamžitý přehled o zdraví marketplace (supply × demand), schvalování, SLA a finance.
- Vidět, kde se proces „zasekává“ a co je potřeba ručně vyřešit (MVP ops). 

Cíl byznysu:
- Udržet pilotní cíle (např. 20 brokerů + 5 developerů) a minimalizovat reputační riziko skrze rychlé řešení SLA a audit. 

Primární CTA / sekundární CTA:
- Primární: **Otevřít schvalování**
- Sekundární: Otevřít SLA položky · Otevřít finance · Otevřít ops inbox

KPI:
- # pending approvals
- # SLA breaches (48h/30d)
- # published tickets / week
- # active reservations / week
- time‑to‑approve user/ticket

Obsah (texty 1:1):
- H1: **Přehled (admin)**
- Subtext: *Zdraví pilotu: schvalování, SLA, finance, pool, ops.*
- KPI cards:
  - **Brokeři (schválení):** {approved_brokers} / 20
  - **Developeri (schválení):** {approved_devs} / 5
  - **Publikované tikety:** {published_tickets}
  - **Aktivní rezervace:** {active_reservations}
  - **SLA po termínu:** {sla_breaches}
- Sekce „Schvalování“:
  - Nadpis: **Schvalování čeká**
  - Řádek: `Broker U‑120 · čeká 2 dny` [Otevřít]
  - Řádek: `Tiket T‑210 · čeká 6h` [Otevřít]
- Sekce „SLA — kritické“:
  - Nadpis: **SLA — kritické**
  - Mikrocopy: *Řadíme overdue a nejbližší deadliny (48h, 30 dní, expirace publikace).*
  - Řádek: `⛔ Developer neodpověděl – R‑000123` [Otevřít rezervaci]
  - Řádek: `⚠ Tiket expirovaný – T‑118` [Otevřít tiket]
- Sekce „Finance — operace“:
  - Nadpis: **Finance — operace**
  - Řádek: `Faktura 2026‑001 · čeká na úhradu` [Otevřít]
  - Řádek: `Broker faktura čeká na kontrolu` [Otevřít]
- Sekce „Pool program“:
  - Nadpis: **Pool program**
  - Text: *Aktuální období: {od} – {do}. Uzávěrka: {cutoff_date}.*
  - CTA: **Otevřít období**
- Sekce „Ops inbox“:
  - Nadpis: **Ops inbox**
  - Řádek: `RQ‑1209 · GDPR export` [Otevřít]
  - Řádek: `RQ‑1210 · Podpora` [Otevřít]

Stavy:
- loading: skeleton dashboard
- empty: (typicky nikdy, admin vždy něco vidí) – fallback text „Aktuálně žádné urgentní položky.“
- error: „Přehled se nepodařilo načíst“ + Retry

Validace a pravidla:
- Pilot target čísla (20/5) jsou pouze interní indikátor; hodnoty se dají vypnout konfigurací. 
- Tiket expirace: admin může tiket znovu otevřít (re-open) a nastavit nové publikační okno; systém má poslat notifikaci obchodníkům s rozpracovanými rezervacemi. 
- Pool přehled respektuje anonymitu (broker A/B/C) mimo admin pohled. 

Analytické eventy:
- `adm_dashboard_view` (user_id)
- `adm_dashboard_open_approvals` (pending_count)
- `adm_dashboard_open_sla_item` (sla_type, entity_id, severity)
- `adm_dashboard_open_finance` (unpaid_invoices_count)

---

- —

## Předpoklady (doplněno logicky)
- Po loginu se uživatel vždy přesměruje na `/prehlad` (role‑based obsah).
- Dashboard zobrazuje pouze agregace, které jsou možné sestavit z existujících entit (Rezervace, Tikety, Faktury, Pool období, Schvalování, Ops requesty) — bez nové „BI vrstvy“.
- SLA severity prahy (6h/24h) jsou konfigurovatelné adminem (default dle výše).
---

## EPIC 9 — Administrace & nastavení systému (Admin)

### Cíl EPICu
- Dát administrátorovi **jedno místo**, kde spravuje „všechna čísla“ a pravidla platformy (SLA, kapacity, publikační okna, splatnosti, DPH, pool, sloty).
- Umožnit administrátorovi spravovat **uživatele a organizace** po onboardingu (aktivace/deaktivace, role, přiřazení do org, sloty, programové úrovně).
- Zajistit, že každá změna je **auditovatelná**: kdo/kdy/co/proč + původní vs nová hodnota.
- Minimalizovat riziko „rozbití“ běžících procesů (rezervace, fakturace) pomocí guardrailů a upozornění.

### Zásady (UX pravidla)
1) **Read-only default pro citlivé věci**: vše je vidět, ale editace je vždy „záměrný krok“ přes modal s důvodem.
2) **Žádné tiché retroaktivní změny**: parametry, které už ovlivnily dokumenty/faktury, se neopravují přepsáním, ale „korekcí“ (nová auditovaná položka).
3) **Dopad změny musí být vidět před uložením**: Aplikace ukáže, zda se změna týká jen nových objektů, nebo i běžících (rezervace/tikety).
4) **Důvod je povinný vždy** (výběr + volitelná poznámka), protože audit je součást value proposition (důkaz profesionality).

### Co je v MVP (scope)
- Základní „registry“ parametrů podle kanonických dat (kap. 17).
- Sloty a programové úrovně obchodníků (Partner/Premium/Elite) + per‑broker override.
- Základní nastavení poolu (aktivní, % do poolu, mety, limit kvalifikovaných, uzávěrka).
- Finance defaulty (DPH, splatnosti, payout SLA, upomínky).
- eSign policy (balík dokumentů jako 1 envelope, resend limit, notifikační parametry).
- Uživatelé & organizace: seznam, detail, deaktivace, role, multi‑user u developera.

### Co je post‑MVP (vyhrazené místo)
- Složité verzování šablon dokumentů (NDA/Souhlas/Rezervace) a jejich full editor.
- Více admin rolí a granularita oprávnění (Admin Finance vs Admin Ops).
- Automatické integrace (bank feed, DMS, advanced eSign).

---

# EPIC 9 — Obrazovky

## [ADM-600] Nastavení — Přehled (Admin)

Cíl uživatele:
Rychle najít a upravit potřebná pravidla (SLA, kapacity, finance, pool, sloty) a spravovat uživatele.

Cíl byznysu:
Udržet kontrolu nad provozem a minimalizovat chyby v parametrech, které ovlivňují GMV a důvěru.

Primární CTA / sekundární CTA:
- Primární: **Otevřít sekci**
- Sekundární: **Zobrazit historii změn** (vede do Audit log s filtrem)

KPI:
- # změn parametrů / týden (a jejich důvodů)
- # incidentů způsobených špatnou konfigurací (cílově 0)
- median time-to-change (od potřeby po změnu)

Obsah (texty 1:1):
- H1: **Nastavení**
- Subtext: *Správa pravidel a parametrů platformy. Každá změna se zapisuje do auditu.*
- Karty:
  1) **Parametry & SLA**
     - Popis: *Lhůty, kapacity, publikační okna, splatnosti.*
     - CTA: **Otevřít**
  2) **Sloty & programy brokerů**
     - Popis: *Úrovně Partner/Premium/Elite, limity slotů, per‑broker výjimky.*
     - CTA: **Otevřít**
  3) **Finance & DPH**
     - Popis: *DPH, splatnosti, payout SLA, upomínky a čísla faktur.*
     - CTA: **Otevřít**
  4) **Pool program**
     - Popis: *Aktivace poolu, mety, uzávěrka období a limity.*
     - CTA: **Otevřít**
  5) **eSign & notifikace**
     - Popis: *Politiky eSign, remindery, katalog notifikací.*
     - CTA: **Otevřít**
  6) **Uživatelé & organizace**
     - Popis: *Správa účtů a developer týmů (multi‑user).*
     - CTA: **Otevřít**

Stavy:
- loading: skeleton cards
- error: „Nastavení nelze načíst“ + Retry

Validace a pravidla:
- sekce se řídí role-based access: vidí jen Admin.

Analytické eventy:
- `adm_settings_home_view` (user_id)
- `adm_settings_open_section` (section_key)
- `adm_settings_open_audit_history` (context="settings")

---

## [ADM-610] Nastavení — Parametry & SLA (Admin)

Cíl uživatele:
Upravit globální defaulty a klíčové procesní parametry (SLA, kapacity, publikační okna, splatnosti).

Cíl byznysu:
Řídit proces a předcházet SLA incidentům (48 h podpisy, 30 dní jednání, expirace tiketu).

Primární CTA / sekundární CTA:
- Primární: **Upravit**
- Sekundární: **Filtrovat**, **Export seznamu** (read-only export parametrů)

KPI:
- SLA breaches (po změně parametru)
- time-to-first-reservation (nepřímo přes kapacitu/SLA)
- % tiketů expirovaných bez rezervace (publikační okno)

Obsah (texty 1:1):
- H1: **Parametry & SLA**
- Informační banner (info):
  - Nadpis: **Důležité**
  - Text: *Změny lhůt mohou ovlivnit běžící rezervace. U citlivých parametrů uvidíte dopad před uložením.*
- Filtry:
  - „Kategorie“: Vše | SLA & proces | Marketplace | Finance | Pool | Sloty
  - „Scope“: Vše | Globální | Per tiket | Per rezervaci | Per fakturu | Per uživatel
  - Search: „Hledat parametr…“
- Tabulka (min. sloupce):
  - Parametr
  - Scope
  - Hodnota
  - Jednotka
  - Výchozí / platí od
  - Poslední změna (kdo, kdy)
  - Akce

Povinné parametry v MVP (minimální sada):
- Publikační okno tiketu (default) = **90 dní**
- Kapacita rezervací na tiketu (default) = **3**
- SLA investora (balík dokumentů) = **48 h**
- SLA developera na rozhodnutí = **48 h**
- Jednání po aktivaci = **30 dní**
- Splatnost provize developer → platforma = **14 dní**
- Výplata obchodníků po přijetí provize = **3 dny**
- DPH sazba (default) = **21 %**
- Pool: podíl do poolu, meta 1, meta 2, limit kvalifikovaných, uzávěrka

Stavy:
- loading: skeleton table
- empty: „Pro zadané filtry jsme nenašli žádný parametr.“
- error: „Parametry nelze načíst.“ + Retry

Validace a pravidla:
- Editace se provádí výhradně přes modal [ADM-611].
- Některé parametry jsou „výchozí“ (globální) a změna se projeví pouze na nových objektech (např. publikační okno). Aplikace to musí explicitně uvést v modal preview.
- Parametry s dopadem na finance/dokumenty nesmí zpětně změnit již vystavené faktury/podepsané PDF; v modal preview se zobrazí „Pouze pro nové“.

Analytické eventy:
- `adm_settings_params_view` (filters_category, filters_scope, search_used:boolean)
- `adm_settings_param_edit_click` (param_key, scope)
- `adm_settings_params_export` (filters_category, filters_scope)

---

## [ADM-611] Upravit parametr (modal / drawer)

Cíl uživatele:
Bezpečně změnit parametr, doplnit důvod a vidět dopad změny.

Cíl byznysu:
Auditní stopa + prevence náhodných/nesmyslných změn.

Primární CTA / sekundární CTA:
- Primární: **Uložit změnu**
- Sekundární: **Zrušit**

KPI:
- % změn s vyplněným důvodem (cílově 100 %)
- # revertů (změna vrácená do 24h)

Obsah (texty 1:1):
- Nadpis: **Upravit parametr**
- Pole:
  - „Parametr“ (read-only)
  - „Scope“ (read-only)
  - „Aktuální hodnota“ (read-only)
  - „Nová hodnota“ (input)
  - „Jednotka“ (read-only)
  - „Důvod změny“ (select, povinné):
    - Podpora pilotu
    - Individuální dohoda
    - Korekce chyby
    - Incident / spor
    - Finance / účetnictví
    - Legal / compliance
    - Jiné
  - „Poznámka“ (textarea, volitelné) – placeholder: *Popište kontext (volitelné).*
  - „Přílohy“ (upload, volitelné) – hint: *Např. e-mail, PDF, dohoda.*
- Sekce „Dopad změny“ (auto):
  - *Tato změna se projeví:*
    - **Pouze na nových objektech** / **I na běžících objektech**
  - Pokud „běžící“: ukázat počty (pokud dostupné): *Ovlivní: 2 aktivní rezervace, 1 tiket.*
- Warning (pokud mimo doporučené rozmezí):
  - Nadpis: **Pozor**
  - Text: *Hodnota je mimo doporučené rozmezí. Zkontrolujte dopad na proces.*

Stavy:
- success: toast „Změna uložena a zapsána do auditu.“
- error:
  - „Změnu se nepodařilo uložit.“ (např. validační chyba)
  - „Mezitím došlo ke změně parametru jiným uživatelem. Načtěte znovu.“ (konflikt)

Validace a pravidla:
- Nová hodnota: povinná, typ dle parametru (int/decimal).
- Záporné a nulové hodnoty: blokovat u parametrů, kde nedávají smysl (SLA, kapacita, dny).
- Pokud parametr vyžaduje vztah (např. meta 2 ≥ meta 1), validovat.
- Důvod změny: povinné.
- U finančních parametrů:
  - Aplikace musí explicitně zobrazit „neovlivní již vystavené faktury“.
  - pokud je potřeba oprava historických dat → směrovat na „Korekce“ (admin akce) (post‑MVP) nebo do poznámky uvést manuální postup.

Analytické eventy:
- `adm_settings_param_edit_view` (param_key)
- `adm_settings_param_edit_submit` (param_key, old_value, new_value, reason, affects_running:boolean)
- `adm_settings_param_edit_cancel` (param_key)

---

## [ADM-620] Nastavení — Sloty & programy brokerů (Admin)

Cíl uživatele:
Spravovat programové úrovně a sloty brokerů (defaulty i výjimky) tak, aby odpovídaly pilotu a partnerství.

Cíl byznysu:
Řídit kapacitu brokerů (aktivace, retence) a férovost v marketplace (sloty jako limit i motivace).

Primární CTA / sekundární CTA:
- Primární: **Upravit**
- Sekundární: **Vyhledat brokera**, **Zobrazit historii změn**

KPI:
- % brokerů, kteří vyčerpají sloty (aktivita)
- time-to-first-reservation (aktivace)
- retention brokerů (MAU)

Obsah (texty 1:1):
- H1: **Sloty & programy brokerů**
- Sekce A: „Výchozí limity podle úrovně“
  - Tabulka:
    - Úroveň | Výchozí sloty | Popis | Akce
    - Partner | 10 | Základní úroveň spolupráce | Upravit
    - Premium | 25 | Vyšší kapacita | Upravit
    - Elite | 50 | Nejvyšší kapacita | Upravit
- Sekce B: „Výjimky (per broker)“
  - Search: „Hledat brokera…“
  - Tabulka:
    - Broker | Firma | Úroveň | Sloty (override) | Platnost do | Poznámka | Akce
- Sekce C: „Pool program (globálně)“
  - Toggle: **Pool program aktivní**
  - Hint: *Pool je bonusový program z podílu platformy. Nastavení meta a období je v sekci Pool program.*

Stavy:
- loading: skeleton tables
- empty výjimky: „Zatím žádné výjimky.“
- error: „Nelze načíst programy a sloty.“ + Retry

Validace a pravidla:
- Sloty: celé číslo >= 1 (doporučeně 1–200).
- Override může být:
  - dočasný (platnost do) nebo trvalý (bez data).
- Každá změna slotů/úrovně musí jít přes auditní modal (stejný princip jako [ADM-611]).

Analytické eventy:
- `adm_broker_programs_view`
- `adm_broker_level_edit_click` (level)
- `adm_broker_override_search` (query_length)
- `adm_broker_override_open` (broker_id)

---

## [ADM-630] Nastavení — Finance & DPH (Admin)

Cíl uživatele:
Spravovat finanční defaulty (DPH, splatnosti, payout SLA, upomínky), které ovlivňují fakturaci a cashflow.

Cíl byznysu:
Zrychlit vypořádání provizí a snížit manuální chyby v účetnictví.

Primární CTA / sekundární CTA:
- Primární: **Upravit**
- Sekundární: **Zobrazit audit**

KPI:
- průměrná doba od financování → úhrada provize
- # faktur po splatnosti
- # manuálních korekcí

Obsah (texty 1:1):
- H1: **Finance & DPH**
- Sekce „Splatnosti a SLA“
  - Splatnost provize developer → platforma: **14 dní** (default)
  - Výplata obchodníků po přijetí provize: **3 dny** (default)
  - Upomínka před splatností provize: **X dní** (default: 3) *(konfigurovatelné)*
- Sekce „DPH“
  - Sazba DPH (default): **21 %**
  - Režim DPH na faktuře platforma → developer (default): **S DPH**
- Sekce „Provize (defaulty)“
  - Provize celkem (default): **5 %**
  - Split (default): Platforma **50 %**, Broker 1 **25 %**, Broker 2 **25 %**
- *Per tiket lze nastavit individuálně při schválení tiketu.*
- Sekce „Fakturační identifikátory“
  - Pole (read-only v MVP): Číselná řada, prefixy, účet platformy (pokud se používá ve faktuře)
  - Text: *Změny číselných řad řešte mimo aplikaci (MVP).*

Stavy:
- loading/error

Validace a pravidla:
- DPH: 0–30 % (guardrail)
- Upomínka X dní: 0–30
- Split provize: součet 100 % (editace defaultu)
- Změna finančních parametrů se nevztahuje na již vystavené faktury.

Analytické eventy:
- `adm_finance_settings_view`
- `adm_finance_setting_edit_click` (setting_key)
- `adm_finance_setting_edit_submit` (setting_key, old_value, new_value)

---

## [ADM-640] Nastavení — eSign & notifikace (Admin)

Cíl uživatele:
Nastavit a kontrolovat podpisovou politiku (eSign balík) a notifikační pravidla tak, aby SLA fungovalo.

Cíl byznysu:
Snížit drop-off investora na podpisu, zrychlit aktivaci rezervací a snížit support.

Primární CTA / sekundární CTA:
- Primární: **Upravit**
- Sekundární: **Otevřít katalog notifikací** (read-only)

KPI:
- % investorů, kteří podepíšou v SLA 48h
- # resendů / rezervaci
- # SLA breach u investora

Obsah (texty 1:1):
- H1: **eSign & notifikace**
- Sekce „eSign balík“
  - Režim: **1 envelope / 3 dokumenty** (Souhlas + NDA + Rezervační smlouva) (read-only)
  - Text: *Investor má 1 deadline 48 h na celý balík.*
- Sekce „Remindery a resend“
  - Automatické připomenutí: **24 h po odeslání**
  - Automatické připomenutí: **6 h před expirací**
  - Ruční resend limit: **1× za 6 h**
  - „BCC interně“ (volitelné): support@… (konfigurovatelné)
- Sekce „Katalog notifikací“ (read-only)
  - CTA: **Otevřít katalog**
  - Hint: *Katalog definuje, co se kdy posílá a jaké proměnné šablona vyžaduje.*

Stavy:
loading/error

Validace a pravidla:
- Remindery nesmí překročit deadline (např. 6h před expirací musí být >0).
- Resend limit: 0–24h.
- Každá změna se audituje.

Analytické eventy:
- `adm_esign_settings_view`
- `adm_esign_setting_edit_click` (setting_key)
- `adm_esign_setting_edit_submit` (setting_key, old_value, new_value)
- `adm_notifications_catalog_open` (from="settings")

---

## [ADM-650] Nastavení — Uživatelé & organizace (Admin)

Cíl uživatele:
Najít a spravovat brokery, developery a jejich organizace (stav účtu, role, přiřazení, deaktivace, multi‑user).

Cíl byznysu:
Bezpečný provoz (deaktivace při incidentu), rychlý support a možnost škálovat developer týmy.

Primární CTA / sekundární CTA:
- Primární: **Otevřít detail**
- Sekundární: **Deaktivovat účet**, **Zobrazit audit**

KPI:
- time-to-resolve support request
- # deaktivací / měsíc (signal incidentů)
- adoption multi-user u developera (# členů / org)

Obsah (texty 1:1):
- H1: **Uživatelé & organizace**
- Tabs: **Uživatelé** | **Organizace**
- Filtry:
  - Role: Vše | Broker | Developer | Admin
  - Stav: Vše | Čeká na schválení | Aktivní | Pozastavený | Deaktivovaný
  - Search: „Hledat jméno, firmu, e-mail…“
- Tab „Uživatelé“ — tabulka:
  - Jméno
  - Firma/Org
  - Role
  - Stav
  - Poslední aktivita
  - Akce: Otevřít
- Tab „Organizace“ — tabulka (developer):
  - Název organizace
  - IČO
  - # uživatelů
  - Stav
  - Akce: Otevřít

Stavy:
- loading
- empty: „Nic jsme nenašli.“
- error

Validace a pravidla:
- Deaktivace účtu vyžaduje důvod (modal se stejným principem jako [ADM-611]) a vytvoří audit.
- Deaktivovaný uživatel se nemůže přihlásit; jeho historická data zůstávají (audit).
- U developer organizace musí být vždy alespoň 1 Owner (nelze odebrat posledního Ownera).

Analytické eventy:
- `adm_users_orgs_view` (tab, filters_role, filters_status, search_used)
- `adm_user_open` (user_id)
- `adm_org_open` (org_id)

---

## [ADM-651] Uživatel — Detail (Admin)

Cíl uživatele:
Vidět kompletní profil uživatele a udělat bezpečné změny (stav, role, sloty, úroveň, přiřazení).

Cíl byznysu:
Rychlé řešení supportu a kontrola nad oprávněními.

Primární CTA / sekundární CTA:
- Primární: **Uložit změny**
- Sekundární: **Deaktivovat účet**, **Resetovat heslo (post‑MVP)**, **Zobrazit audit**

KPI:
- # změn role/úrovně
- # incidentů (deaktivací)

Obsah (texty 1:1):
- H1: **Uživatel**
- Subheader: jméno + e-mail + role badge + stav badge
- Sekce:
  1) **Základní údaje** (read-only)
  2) **Stav účtu**
     - Aktivní / Pozastavený / Deaktivovaný (select)
     - „Důvod“ (povinné při změně)
  3) **Oprávnění a role**
     - Role (read-only v MVP; mění pouze admin)  
  4) **Broker nastavení** *(viditelné pouze pokud role=Broker)*
     - Úroveň: Partner/Premium/Elite
     - Sloty: 3 / 10 (aktuální využití / limit)
     - Override slotů (volitelné)
  5) **Developer organizace** *(viditelné pouze pokud role=Developer)*
     - Organizace (link)
     - Role v organizaci: Owner / Member / Finance
  6) **Auditní log (preview)**: posledních 10 událostí + „Zobrazit vše“

Stavy:
loading/error/success toast

Validace a pravidla:
- Změna stavu/slotů/úrovně vyžaduje auditní důvod.
- Pokud broker má aktivní rezervace, změna slotů nemá retroaktivně rušit existující rezervace; sloty jsou limit na *nové* vytvoření rezervace.
- Pokud developer user má roli Owner a je poslední Owner v org, nelze snížit roli.

Analytické eventy:
- `adm_user_detail_view` (user_id, role)
- `adm_user_status_change_submit` (user_id, old_status, new_status, reason)
- `adm_broker_level_change_submit` (user_id, old_level, new_level, reason)
- `adm_broker_slots_override_submit` (user_id, old_limit, new_limit, reason)

---

- —

## Předpoklady (doplněno logicky)
- Změna globálních defaultů se standardně vztahuje **na nové objekty**; zásah do běžících rezervací/tiketů se dělá na jejich detailu (kde je kontext).
- Upomínka před splatností provize (X dní) má MVP default **3 dny** (lze změnit).
- BCC interně u eSign/notifikací je v MVP defaultně vypnuté (empty) – zapíná se pouze pokud si to vyžádá provoz.
- „Parametry & SLA“ obrazovka zobrazuje i parametry, které se fakticky nastavují per tiket/per rezervaci, jako **registry** (s vysvětlením „kde se mění“).
- Editace textů notifikačních šablon je v MVP **read-only** (spravuje se mimo aplikaci); v aplikaci držíme katalog událostí a datových proměnných.

---

## EPIC 10 — Pre‑login web (akvizice) — DE‑SCOPE pro MVP

V MVP neřešíme návrh veřejného webu. Minimální požadavky:
- Link „Veřejný web“ v user menu (nový tab).
- Pokud je uživatel přihlášený a je na veřejné části, zobrazit CTA „Přejít do aplikace“ (deep‑link).
- FAQ bude uvnitř aplikace po přihlášení.

---

## [APP-030] Jak to funguje / FAQ — po přihlášení (všechny role)

**Umístění:** user menu → „Nápověda“.  
Obsah: proces, lhůty/SLA (48 h od odeslání), slovníček, FAQ, kontakty.
# EPIC 12 — Handoff pack: Data model + API potřeby + Analytics dictionary

## Cíl EPICu
- Dodat vývojářům **jednoznačný kontrakt**: jaké entity existují, jaké mají stavy, jaké vztahy a jaké „view modely“ potřebuje frontend.
- Minimalizovat riziko chyb v implementaci citlivých částí (maskování/odmaskování, SLA, kapacita/fronta, auditní stopa).
- Sjednotit **error model** a **analytics event dictionary** (měření funnelu a provozních KPI).

## In‑scope (MVP)
- Kanonický seznam entit + klíčová pole (ne DB schema, ale „co musí být dostupné“).
- Stavové diagramy pro klíčové entity (Ticket, Reservation).
- Návrh API endpointů (REST/JSON) + outline payloadů (co frontend očekává).
- eSign integrace: 1 envelope (3 dokumenty) + webhooky pro stav podpisu.
- Standardizace chyb: validační chyby, oprávnění, konflikty stavů.
- Konsolidovaný **analytics event dictionary** + mapování na KPI (activation, GMV_pipeline, time‑to‑first‑reservation).

## Out‑of‑scope (post‑MVP / technické detaily)
- Volba konkrétního eSign providera a jeho low‑level implementační detaily (OAuth, template IDs, field mapping).
- Bankovní napojení (bank feed) a automatické párování plateb.
- Fulltext audit diff engine (v MVP stačí strukturovaný log změn).

---

## [DATA-100] Kanonický datový model (MVP)

Cíl uživatele:
- Aby produkt/design a vývoj sdíleli stejný mentální model (co je „projekt“, „tiket“, „rezervace“, „investor“, „provizní případ“).

Cíl byznysu:
- Zrychlit vývoj a snížit počet chyb a sporů (zejména u introdukcí, SLA a provizí).

Primární CTA / sekundární CTA:
- N/A (specifikace)

KPI:
- # bugů typu „špatný stav / špatné oprávnění“
- time‑to‑implement (EPIC throughput)

Obsah (texty 1:1):

### 1) Základní entity (MVP)
**Organization**
- id
- type: `BROKER` | `DEVELOPER` | `PLATFORM`
- legal_name, ico (pokud relevantní)
- billing_profile (DPH režim, fakturační adresa – dle nastavení v EPIC 5)
- created_at, updated_at

**User**
- id
- email, phone
- full_name
- status: `PENDING_APPROVAL` | `ACTIVE` | `REJECTED` | `SUSPENDED`
- last_login_at
- created_at, updated_at

**Membership**
- user_id
- organization_id
- role:  
  - Broker: `OWNER` | `MEMBER`  
  - Developer: `OWNER` | `MEMBER` | `FINANCE`  
  - Admin (platform): `ADMIN`
- invited_by_user_id (pro multi‑user flows)

**BrokerProfile** (navázáno na Organization typu BROKER)
- broker_level (Partner/Elite…)
- capacity_open_reservations (sloty)
- preferences (regiony, typy tiketů, 20M+ fokus – dle onboarding checklistu)
- payout_profile (bank účet / fakturační preference)

**DeveloperProfile** (navázáno na Organization typu DEVELOPER)
- contact (owner / finance)
- onboarding_status (profil + dokumenty)
- default_ticket_params (pokud existují; jinak prázdné)
- bank_account (interní; nezobrazovat brokerům)

**Project**
- id
- owner_developer_org_id (nullable, pokud lead projekt od brokera; přiřazuje admin)
- lead_broker_org_id (nullable; pro hybrid, provizní reporting)
- title (maskovaný/odmaskovaný)
- teaser (maskovaný/odmaskovaný)
- description_full (po odmaskování / po legal kroku)
- location_region (kraj), optional city
- assets: images[], documents[]
- status: `DRAFT` | `SUBMITTED` | `APPROVED` | `RETURNED` | `REJECTED` | `ARCHIVED`
- created_at, updated_at

**Ticket**
- id
- project_id
- ticket_type: `DLUHOVÝ` | `KAPITÁLOVÝ`
- target_amount_czk
- min_investment_czk (nullable)
- expected_yield_pa_pct
- duration_months
- security: secured_bool + security_types[] + optional ltv_pct + optional collateral_value_czk
- use_of_funds_split[] (součet 100 %) + free_text_note
- publish_from, publish_to (nullable; po expiraci nelze nové rezervace)
- capacity_total_N (admin)
- sla_investor_sign_hours = 48 (sjednocené)
- sla_developer_decision_hours = 48
- negotiation_days = 30
- status: `DRAFT` | `PENDING_APPROVAL` | `PUBLISHED` | `HIDDEN` | `EXPIRED` | `CLOSED_FUNDED` | `DEACTIVATED`
- created_at, updated_at

**InvestorRecord** (interní evidence brokera)
- id
- broker_org_id (owner)
- entity_type: `FIRMA` | `OSOBA` (nebo `FIRMA+OSOBA` podle UX; v datech evidujeme firmu a konkrétní osobu)
- company_name (nullable), person_name (nullable)
- email (minimálně pro eSign), phone (optional)
- investment_min_czk, investment_max_czk
- preferred_currency = CZK
- min_expected_yield_pa_pct (optional)
- max_duration_months (optional)
- preferred_project_types[], preferred_regions[], preferred_security_types[]
- max_ltv_pct (optional)
- status: `ACTIVE` | `INACTIVE` | `NEW`
- legal_basis_confirmed_bool (broker potvrzuje právní důvod evidence)
- internal_note (jen broker)
- created_at, updated_at

**Reservation**
- id
- ticket_id
- broker1_org_id (přivedl investora)
- broker2_org_id (přivedl projekt; nullable)
- investor_record_id
- stage (pro process header):  
  `DRAFT` → `ESIGN_SENT` → `ESIGN_COMPLETED` → `QUEUE` → `IN_CAPACITY` → `DEV_SIGNED` → `ACTIVE_NEGOTIATION` → `FUNDED_CONFIRMED` → `CLOSED_SUCCESS` / `CLOSED_FAIL` / `DISPUTE`
- queue_position (nullable)
- capacity_entered_at (nullable)
- deadlines:
  - investor_sign_deadline_at (T+48h od odeslání)
  - developer_decision_deadline_at (T+48h od vstupu do kapacity)
  - negotiation_deadline_at (T+30 dní od aktivace)
- failure_reason (enum/string)
- created_at, updated_at

**ESignEnvelope**
- id
- reservation_id
- provider (string)
- provider_envelope_id (string)
- status: `SENT` | `VIEWED` | `SIGNED_COMPLETE` | `DECLINED` | `EXPIRED` | `ERROR`
- documents:
  - NDA (Platforma ↔ Investor)
  - Souhlas GDPR (Platforma ↔ Investor)
  - Rezervační smlouva (Developer ↔ Investor)
- links: signing_url (TTL), audit_trail_url (provider)
- created_at, updated_at

**CommissionCase**
- id
- reservation_id (nebo ticket_id + funded_amount)
- funded_amount_czk (final)
- total_fee_pct = 5%
- split:
  - platform_pct = 50%
  - broker1_pct = 25% (nebo 50% pokud broker2 chybí)
  - broker2_pct = 25% (pokud existuje)
- status: `WAITING_PLATFORM_INVOICE` → `WAITING_PAYMENT` → `PAYMENT_CONFIRMED` → `WAITING_BROKER_INVOICE` → `PAYOUT_READY` → `PAYOUT_DONE`
- timestamps: invoice_issued_at, payment_confirmed_at, payout_done_at
- created_at, updated_at

**Invoice** (PlatformInvoice + BrokerInvoice)
- id
- commission_case_id
- issuer: `PLATFORM` | `BROKER`
- receiver_org_id
- amount_net_czk, vat_pct (optional), amount_gross_czk
- due_date
- pdf_url / attachment_id
- status: `UPLOADED` | `APPROVED` | `REJECTED` | `PAID`
- created_at, updated_at

**PoolPeriod**
- id
- period_start, period_end
- rules_snapshot (meta)
- status: `OPEN` | `CLOSED` | `PAID_OUT`
- winners (anonymized labels A/B/C)
- audit_note
- created_at, updated_at

**Notification**
- id
- user_id
- type (enum)
- entity_type, entity_id
- title, body
- seen_at (nullable)
- created_at

**AuditEvent**
- id
- occurred_at
- actor_role, actor_user_id
- entity_type, entity_id
- event_name
- change_summary (structured diff / text)
- reason (povinné pro ruční zásah)
- attachments (optional)
- ip_address (optional)
- correlation_id (pro troubleshooting)

**ExportJob**
- id
- requested_by_user_id
- scope (finance/pool/audit/tickets/reservations)
- filters_snapshot
- file_url
- status: `QUEUED` | `DONE` | `ERROR`
- created_at

### 2) Vztahy (rychlá mapa)
- Organization 1—N Membership —1 User
- DeveloperProfile 1—1 Organization(type=DEVELOPER)
- BrokerProfile 1—1 Organization(type=BROKER)
- Project N—1 DeveloperOrg (nullable) + N—1 LeadBrokerOrg (nullable)
- Ticket N—1 Project
- InvestorRecord N—1 BrokerOrg
- Reservation N—1 Ticket + N—1 InvestorRecord + N—1 Broker1Org (+ optional Broker2Org)
- ESignEnvelope 1—1 Reservation
- CommissionCase 1—1 Reservation
- Invoice N—1 CommissionCase
- AuditEvent N—(Ticket/Reservation/Project/Invoice/PoolPeriod/User/Org/ExportJob)

### 3) Masking / odmaskování (kontrakt pro frontend)
**Ticket/Project view musí umět vracet:**
- `masking_level`: `TEASER` | `UNLOCKED`
- `masked_fields`: seznam polí, která jsou maskovaná (pro konzistentní zobrazení)
- `unlock_reason`: text pro zobrazení („Odemkne se po podpisu Souhlasu+NDA investorem.“)

Zásada: Aplikace nikdy nesmí zobrazit „odmaskované“ část informací nekonzistentně (např. obrázek odmaskovaný, ale název stále maskovaný).

Stavy:
- N/A

Validace a pravidla:
- InvestorRecord je viditelný jen owner broker + admin (nikdy jiný broker).
- V analytics a exportech se investor nikdy neexportuje jako PII v MVP (jen interní ID).

Analytické eventy:
- N/A

---

## [DATA-110] Stavové diagramy (Ticket & Reservation)

Cíl uživatele:
- Rychle pochopit, jaké přechody jsou možné a co je blokátor.

Cíl byznysu:
- Snížit spory a „stuck“ rezervace; zrychlit implementaci.

Primární CTA / sekundární CTA:
- N/A

KPI:
- # incidentů „stuck state“
- average time v jednotlivých stavech (SLA)

Obsah (texty 1:1):

### Ticket (high‑level)
- `DRAFT` → `PENDING_APPROVAL` → `PUBLISHED`
- `PUBLISHED` → `HIDDEN` (admin/developer) → zpět `PUBLISHED`
- `PUBLISHED` → `EXPIRED` (automaticky po publish_to)
- `PUBLISHED` → `CLOSED_FUNDED` (po profinancování a uzavření)
- `*` → `DEACTIVATED` (admin stop pro nové rezervace)

### Reservation (high‑level)
- `DRAFT` (broker vybral investora)  
→ `ESIGN_SENT` (odesláno)  
→ `ESIGN_COMPLETED` (investor podepsal vše v envelope do 48h)  
→ `QUEUE` (fronta, čeká na kapacitu)  
→ `IN_CAPACITY` (top N)  
→ `DEV_SIGNED` (developer podepsal / potvrdil)  
→ `ACTIVE_NEGOTIATION` (30 dní)  
→ `FUNDED_CONFIRMED` (developer/admin zadal proof)  
→ `CLOSED_SUCCESS` (vznik provizního případu)

Fail cesty:
- `ESIGN_SENT` → `CLOSED_FAIL` (deadline 48h vypršel)
- `IN_CAPACITY` → `CLOSED_FAIL` (developer zamítl / deadline 48h vypršel)
- `ACTIVE_NEGOTIATION` → `CLOSED_FAIL` (30 dní vypršel bez financování)
- `*` → `DISPUTE` (admin založí spor; blokuje payout do vyřešení)

Stavy:
- N/A

Validace a pravidla:
- Přechod do dalšího stavu musí vždy vytvořit AuditEvent.
- SLA deadliny se počítají v CZ timezone (Europe/Prague) a ukládají se jako timestamp.

Analytické eventy:
- `state_transition` {entity_type, entity_id, from_state, to_state, reason}

---

## [API-100] API endpoints (MVP) — seznam + účel

Cíl uživatele:
- Vývoj má jasně definované „co frontend potřebuje načíst / změnit“ a jaké akce existují.

Cíl byznysu:
- Rychlejší build bez přepisů frontendu/backendu; méně nejasností.

Primární CTA / sekundární CTA:
- N/A

KPI:
- # změn API kontraktu po implementaci frontendu
- lead time na 1 endpoint

Obsah (texty 1:1):

> Pozn.: Názvy jsou návrh. Důležitý je **rozsah** a **payload**, ne přesná URL.

### Auth & session
- `POST /auth/signup` (self signup)
- `POST /auth/login`
- `POST /auth/logout`
- `GET /me` (user + memberships + role)

### Admin approval (gating pilotu)
- `GET /admin/users?status=pending`
- `POST /admin/users/{user_id}/approve`
- `POST /admin/users/{user_id}/reject` {reason}

### Marketplace (Broker)
- `GET /tickets` (filtry + paginace; vrací list cards + masking_level + SLA)
- `GET /tickets/{ticket_id}` (detail tiketu + project teaser + capacity/sla info)
- `GET /tickets/{ticket_id}/matching` (vypočítá list investorů s hodnocením shody)
- `GET /projects/{project_id}` (detail projektu; respektuje masking)

### Investor evidence (Broker)
- `GET /investors`
- `POST /investors`
- `GET /investors/{investor_id}`
- `PATCH /investors/{investor_id}`
- `POST /investors/{investor_id}/set-status` {status}
- (optional) `GET /investors/{investor_id}/activity` (rezervace, historie)

### Reservations
- `POST /reservations` {ticket_id, investor_id}
- `GET /reservations?ticket_id=&status=`
- `GET /reservations/{reservation_id}`
- `POST /reservations/{reservation_id}/send-esign`
- `POST /reservations/{reservation_id}/remind-esign` (rate limit)
- `POST /reservations/{reservation_id}/developer/approve` (developer sign)
- `POST /reservations/{reservation_id}/developer/reject` {reason}
- `POST /reservations/{reservation_id}/confirm-funded` {amount_czk, date, proof_attachment_id}
- `POST /reservations/{reservation_id}/open-dispute` {reason, note}

### Supply (Developer + Admin)
- `POST /projects`
- `PATCH /projects/{project_id}`
- `POST /projects/{project_id}/submit`
- `POST /tickets` (v projektu)
- `PATCH /tickets/{ticket_id}`
- `POST /tickets/{ticket_id}/submit`
- `POST /tickets/{ticket_id}/request-change` (developer → admin)
- Admin:
  - `GET /admin/projects?status=submitted`
  - `POST /admin/projects/{project_id}/approve` / `reject` / `return`
  - `GET /admin/tickets?status=pending_approval`
  - `POST /admin/tickets/{ticket_id}/publish` {publish_from, publish_to, capacity_N, ...}
  - `POST /admin/tickets/{ticket_id}/hide` / `unhide`

### Finance (Developer + Broker + Admin)
- `GET /commissions` (role-based)
- `GET /commissions/{commission_id}`
- Admin actions:
  - `POST /admin/commissions/{id}/upload-platform-invoice`
  - `POST /admin/commissions/{id}/confirm-payment` {date, note}
  - `POST /admin/commissions/{id}/approve-broker-invoice` / `reject`
  - `POST /admin/commissions/{id}/confirm-payout` {date}
- Broker actions:
  - `POST /commissions/{id}/upload-broker-invoice`
- Developer actions:
  - `GET /developer/invoices` (platform invoices)
  - `POST /developer/invoices/{id}/mark-paid` (MVP optional; prefer admin confirm)

### Pool program
- `GET /pool/periods` (broker view)
- `GET /pool/periods/{id}` (progress)
- Admin:
  - `POST /admin/pool/periods`
  - `POST /admin/pool/periods/{id}/close`
  - `POST /admin/pool/periods/{id}/publish-results`

### Notifications & audit
- `GET /notifications`
- `POST /notifications/{id}/mark-seen`
- `GET /admin/audit-events` (filtry + export)
- `POST /admin/exports` (async job)
- `GET /admin/exports/{id}`

Stavy:
- N/A

Validace a pravidla:
- Každý write endpoint musí ověřit role + ownership (broker pouze své investory).
- Každý write endpoint musí psát AuditEvent (včetně reason u admin zásahů).

Analytické eventy:
- N/A

---

## [API-120] eSign envelope + webhooky (MVP)

Cíl uživatele:
- Broker i admin vidí „co se podepsalo“, do kdy a co je další krok.

Cíl byznysu:
- Minimalizovat drop‑off a zdržení; mít důkazovou stopu.

Primární CTA / sekundární CTA:
- N/A

KPI:
- eSign completion rate
- avg time to sign (T0→Tsign)
- # remindů na 1 envelope

Obsah (texty 1:1):

### Envelope pravidla
- 1 envelope obsahuje 3 dokumenty (Souhlas GDPR + NDA + Rezervační smlouva).
- SLA = 48 h od odeslání.
- Po `SIGNED_COMPLETE` se:
  - odmaskuje identita (Souhlas+NDA),
  - založí se fronta (rezervační smlouva),
  - vytvoří se audit události.

### Webhook události (provider → Tipconnecta)
- `envelope.sent`
- `envelope.viewed` (optional)
- `envelope.completed` (SIGNED_COMPLETE)
- `envelope.declined`
- `envelope.expired`
- `envelope.error`

### Tipconnecta interní události (pro audit + notifikace)
- `reservation_esign_sent`
- `reservation_esign_completed`
- `reservation_esign_expired`

Stavy:
- pokud provider error → Reservation přejde do `ESIGN_SENT` s flag `ERROR`, Aplikace ukáže „Kontaktujte podporu“.

Validace a pravidla:
- Webhooky musí být idempotentní (opakované doručení).
- V logu zobrazit provider envelope ID + timestamp.

Analytické eventy:
- `esign_webhook_received` {event_type, reservation_id, provider_envelope_id}

---

## [ERR-100] Standard chybových odpovědí (kontrakt frontendu)

Cíl uživatele:
- Dostávat srozumitelné hlášky a vědět, co opravit (a kdy je to „konflikt stavů“, ne chyba).

Cíl byznysu:
- Snížit frustraci a support load; zrychlit úspěšné dokončení flow.

Primární CTA / sekundární CTA:
- N/A

KPI:
- error_rate (API)
- retry_success_rate

Obsah (texty 1:1):

### JSON shape (návrh)
- `code` (string, např. `VALIDATION_ERROR`)
- `message` (CZ text pro zobrazení)
- `field_errors` (optional) [{field, code, message}]
- `correlation_id` (string)
- `retryable` (bool)

### Kanonické chyby (MVP)
- `AUTH_REQUIRED`
- `PERMISSION_DENIED`
- `NOT_FOUND`
- `VALIDATION_ERROR`
- `CONFLICT_STATE` (např. tiket expiroval / už nelze rezervovat)
- `SLA_EXPIRED` (deadline uplynul)
- `CAPACITY_LIMIT_REACHED` (broker sloty)
- `ESIGN_PROVIDER_ERROR`
- `UPLOAD_FAILED`

Stavy:
- N/A

Validace a pravidla:
- Aplikace pro `CONFLICT_STATE` vždy nabízí „Obnovit / zpět na seznam“ a nezobrazuje technické detaily.
- `correlation_id` zobrazit v admin debug view (ne pro brokera/developera).

Analytické eventy:
- `api_error_shown` {code, screen_id, correlation_id}

---

## [AN-100] Analytics event dictionary (MVP) — konsolidace

Cíl uživatele:
- Produkt a growth umí měřit aktivaci, konverze a SLA drop‑off a dělat rozhodnutí.

Cíl byznysu:
- Řídit GMV_pipeline a zvyšovat win‑rate rezervace→financování; minimalizovat drop‑off v eSign (kritický moment).

Primární CTA / sekundární CTA:
- N/A

KPI:
- time_to_first_reservation
- signup_to_approval_rate
- reservation_to_esign_complete_rate
- esign_complete_to_capacity_rate
- capacity_to_active_rate
- active_to_funded_rate
- GMV_pipeline, GMV_funded

Obsah (texty 1:1):

### A) Pre‑login web (akvizice)
- `web_page_viewed` {page, utm_source, utm_campaign}
- `web_apply_clicked` {role_intent}
- `web_book_call_clicked` {role_intent}
- `web_form_submitted` {role_intent}

### B) Auth & onboarding (app)
- `auth_signup_submitted` {role_intent}
- `auth_signup_approved` {role, admin_user_id}
- `auth_login_success` {role}
- `onboarding_step_completed` {step_id}
- `onboarding_completed` {role}

### C) Marketplace & matching (broker)
- `brk_marketplace_viewed` {filters, sort}
- `brk_ticket_opened` {ticket_id}
- `brk_matching_viewed` {ticket_id}
- `brk_investor_selected` {ticket_id, investor_id}
- `brk_reservation_created` {ticket_id, reservation_id}

### D) eSign & SLA
- `res_esign_sent` {reservation_id, ticket_id}
- `res_esign_reminder_sent` {reservation_id}
- `res_esign_completed` {reservation_id}
- `res_esign_expired` {reservation_id}

### E) Kapacita & jednání (developer)
- `res_entered_capacity` {reservation_id, position, capacity_N}
- `dev_decision_approved` {reservation_id}
- `dev_decision_rejected` {reservation_id, reason_code}
- `res_activated` {reservation_id}
- `res_negotiation_expired` {reservation_id}

### F) Financování & provize
- `res_funded_confirmed` {reservation_id, amount_czk}
- `commission_case_created` {commission_id}
- `platform_invoice_uploaded` {commission_id}
- `payment_confirmed` {commission_id}
- `broker_invoice_uploaded` {commission_id}
- `payout_confirmed` {commission_id}

### G) Admin ops
- `adm_ticket_approved` {ticket_id}
- `adm_ticket_published` {ticket_id, publish_to}
- `adm_parameters_updated` {param_group}
- `adm_export_requested` {scope}
- `adm_audit_viewed` {admin_user_id}

### PII pravidla pro analytics (MVP)
- Do eventů nikdy neposílat: jméno investora, e‑mail, název projektu (pokud může být maskovaný), bankovní údaje.
- Používat pouze interní ID + roli + org_id.

Stavy:
- N/A

Validace a pravidla:
- Event names jsou stabilní a nemění se bez verze (`v1`, `v2`…), aby nebyly rozbité dashboardy.

Analytické eventy:
- N/A (toto je jejich definice)

---