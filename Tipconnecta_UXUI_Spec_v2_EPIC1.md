# Tipconnecta – UX/UI zadávací dokumentace (v2, draft)
> **Použité zdroje (pouze):**  
> - Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md  
> - Tipconnecta_Strategicky_Marketingovy_Deck_v1.md  
> - Tipari_persona_obchodnik_partner_20m.md  

> Dokument je psaný **MVP-first** a je připravený pro převod do Figmy a handoff na vývoj (bez kódování).

---

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

## 3) Nejasnosti (otázky na ownera) – všechny dotazy, které ještě blokují finální UX/UI
> Níže jsou **jen** rozhodnutí, která nejsou explicitně v datech, nebo jsou „produktová volba“.  
> Pokud u bodu uvádíme „navrhujeme“, znamená to, že umíme dodat doporučení jako default.

### 3.1 Smysl & scope (MVP)
1. **Pool program:** je v MVP aktivní (zapínáme v UI), nebo je „připravený v datech“ a v UI skrytý? (navrhujeme: *off by default*, jen admin toggle)
2. **Founding Partners**: chceme v MVP v UI viditelné výhody (badge, priorita, vyšší sloty), nebo jen interně admin nastavení bez komunikace?

### 3.2 Ověření a schválení (admin approval) – kritéria
3. Co přesně znamená „admin schvaluje“: kontrola IČO v OR, reference, podepsaná rámcová smlouva…? (navrhujeme checklist níže)
4. Máme zavést „Request more info“ krok (admin si vyžádá doplnění), nebo pouze Approve/Reject?

### 3.3 Multi‑uživatelé na firmu
5. Požadavek: „ideálně více uživatelů k jednomu developerovi“. Je to **MVP must-have**, nebo post‑MVP? Pokud MVP: minimální role (Owner / Member / Finance?) a práva zvát další uživatele.

### 3.4 Dokumenty & podpisy (investor / eSign)
6. Balík 3 dokumentů posíláme jako **1 eSign envelope** (doporučeno) vs. 2 kroky (Souhlas+NDA → Rezervace) s jedním SLA 48h.  
7. Jaké jsou minimální údaje investora, které budeme **vyžadovat** pro odeslání eSign? (data říkají e-mail „doporučeno“, ale pro eSign je prakticky nutný)

### 3.5 Komunikace a notifikace
8. Povinný kanál: e‑mail (ano). Chceme v MVP i in‑app notifikace? (navrhujeme: ano, základní)  
9. Support: kam směrujeme uživatele (helpdesk e‑mail, telefon)? (navrhujeme: 1 support e‑mail + SLA „do 1 pracovního dne“)

### 3.6 Spory / incidenty
10. Chceme v MVP obrazovky pro „Spor“ (lite), nebo to řešíme mimo systém? (navrhujeme: MVP-lite – založení sporu adminem + audit)

---

## 4) Předpoklady (co doplňujeme my – lze změnit)
- Telefon při registraci je **povinný** (pilot/KYC, rychlý kontakt).  
- Bez dokončení „legal onboarding“ pro danou roli (potvrzení smluvních dokumentů) uživatel neuvidí marketplace.  
- Admin schvalování: 1 admin (single admin účet), rozšiřitelné později.

---

## 5) Úkoly / deliverables pro komplexní UX + UI zadávací dokumentaci (checklist)
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

### 5.3 UI / Design system (až po UX)
- [ ] Brand principles (tone, trust, „private banking“ feel).
- [ ] Design tokens (barvy, typografie, spacing).
- [ ] Komponenty + varianty + stavy (buttons, inputs, cards, tables, banners, modals).
- [ ] Responsivita (desktop breakpoints) + accessibility (WCAG: kontrasty, focus, klávesnice).

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

Komponenty:
- Input (email), input (password)
- Button primary, link button
- Alert banner (error), loader v CTA
- Footer

Layout:
- Centered auth card (max-width ~520)
- Header: Logo
- Body: Form
- Footer: Legal

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

ASCII wireframe:
[Logo]
------------------------------
[H1 Přihlášení]
[Tipconnecta je uzavřený pilotní klub...]
[ Email ____________________ ]
[ Heslo ____________________ ]
[ (CTA) Přihlásit se ]
[ link: Zapomenuté heslo ]
------------------------------
[Nemáte účet?  (CTA) Požádat o přístup]
[Footer legal]

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

Komponenty:
- Radio cards (role)
- Inputs: email, phone, password (+ show/hide)
- Primary button, secondary link
- Inline validation

Layout:
- Centered form card, Stepper „1/2“
- Minimal info sidebar (trust): „Proces chrání introdukci a data.“

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

ASCII wireframe:
[Logo]                           [Zpět na přihlášení]
----------------------------------------------------
[H1 Požádat o přístup]
[Pilotní přístup schvaluje administrátor...]
[Stepper: 1/2]

[Jsem:]
( ) Broker / obchodník
( ) Developer

[Pracovní e-mail ____________]
[Telefon ____________________]
[Heslo ______________________]
[(CTA) Pokračovat]

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

Komponenty:
- Select, conditional inputs
- Multi-select chips
- Checkbox (prohlášení)
- Primary/secondary buttons
- Info banner

Layout:
- Form + right column „Co bude dál“ (3 kroky)
- Stepper „2/2“

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

ASCII wireframe:
[H1 Broker profil (pro schválení)]     [Co bude dál]
[Perex...]                              1) Admin ověří účet
[Stepper 2/2]                           2) Dokončíte smlouvy
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

Komponenty:
- Select, inputs, section divider
- Multi-selects
- Primary/secondary buttons

Layout:
- Form se sekcemi (Firma / Oprávněná osoba / Volitelné)

Stavy:
- error inline
- success → „Žádost odeslána“

Validace a pravidla:
- company name, IČO, adresa, country, authorized person required
- IČO 8 číslic

Analytické eventy:
- auth_signup_step2_dev_viewed
- auth_signup_step2_dev_submitted {subject_type, has_error, error_type}

ASCII wireframe:
[H1 Developer profil (pro schválení)]
[Stepper 2/2]
----------------------------------
[Firma]
[Typ subjektu v]
[Název společnosti ________]
[IČO ________] [DIČ ________]
[Sídlo ____________________]
[Země registrace v]

[Kontakty]
[E-mail ________] [Telefon ________]

[Oprávněná osoba]
[Jméno ________] [Funkce ________]
[E-mail ________] [Telefon ________]

[Volitelné: Zaměření (multi)]
[Volitelné: Regiony (multi)]
[(CTA) Odeslat žádost] [Zpět]

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

Komponenty:
- Success illustration/icon
- Buttons

Layout:
- Centered confirmation card

Stavy:
- N/A

Validace a pravidla:
- N/A

Analytické eventy:
- auth_signup_submitted_success
- support_contact_clicked {context:"pending"}

ASCII wireframe:
[✓]
[H1 Žádost jsme přijali]
[Váš účet teď ověřuje administrátor...]
- Běžně do 1 pracovního dne
- Když bude potřeba...
[(CTA) Zpět na přihlášení]  [Kontaktovat podporu]

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

Komponenty:
- Status banner (info/warn/error)
- CTA, link

Layout:
- Centered card

Stavy:
- N/A

Validace a pravidla:
- N/A

Analytické eventy:
- account_status_viewed {status}
- support_contact_clicked {context:"account_status", status}

ASCII wireframe:
[Status icon]
[H1 Účet čeká na schválení]
[Text...]
[(CTA) Kontaktovat podporu]  [Odhlásit se]

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

Komponenty:
- Input email, button, banner

Layout:
- Centered card

Stavy:
- success: „Odkaz jsme poslali, zkontrolujte e‑mail.“
- error: „Tento e‑mail v systému neznáme.“

Validace a pravidla:
- email validace

Analytické eventy:
- auth_reset_viewed
- auth_reset_submitted {has_error, error_type}

ASCII wireframe:
[H1 Obnovit heslo]
[Text...]
[E-mail ________]
[(CTA) Odeslat odkaz]
[Zpět na přihlášení]

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

Komponenty:
- Table + row actions
- Filters (role, datum)
- Status pill
- Empty state

Layout:
- Standard admin layout (nav left, content right)

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

ASCII wireframe:
[Admin Nav] | [H1 Žádosti o přístup]
           | [Tabs: Čeká | Schválené | Zamítnuté]
           | [Filters...]
           | [Table... rows...  (Akce) Detail / Approve / Reject]

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

Komponenty:
- Detail panel
- Select (level), number input (slots)
- Textarea (admin note)
- Buttons, modals

Layout:
- Two-column: left data, right actions

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

ASCII wireframe:
[H1 Detail žádosti]              [Akce]
-------------------------------- -------------------------
[Účet: email, telefon, role]     [(CTA) Schválit]
[Profil: pole...]                [Zamítnout]
[Broker nastavení: level, slots] [Poznámka admina]