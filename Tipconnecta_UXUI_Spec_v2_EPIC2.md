# Tipconnecta — UX/UI zadávací dokumentace (EPIC 2)
**Verze:** v2.0 (EPIC 2)  
**Datum:** 2026-01-22  
**Scope:** interní aplikace za loginem (responzivní desktop), role: Broker/Obchodník, Developer, Admin.  
**Zdroje (pouze tyto 3 soubory):**
- `Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md`
- `Tipconnecta_Strategicky_Marketingovy_Deck_v1.md`
- `Tipari_persona_obchodnik_partner_20m.md`

---

## 0) Shrnutí změn (oproti původní logice v datech)
1) **SLA investora sjednocené:** 1 deadline **48h** na podpis celého balíku (Souhlas + NDA + Rezervační smlouva).  
   - V datech je SLA členěné (Souhlas+NDA 48h + rezervační smlouva 48h), ale **v UX/UI to sjednocujeme** do 1 odpočtu.  
2) **Gating pilotu (signup):** **self‑signup + admin approval**.  
3) **eSign balík:** posílat **3 dokumenty jako 1 eSign envelope** (1 session pro investora).  
4) **Pool program:** v MVP **aktivní v UI**.  
5) **Více uživatelů k jednomu developerovi:** **must‑have v MVP**.

---

## 1) Rozhodnutí a parametry (freeze pro MVP)
### 1.1 Jazyk a měna
- **Jazyk:** CZ  
- **Měna v UI:** CZK / Kč  
- **Způsob zobrazování provizí:** v Kč, **bez DPH** (DPH je mimo UI; fakturace řeší účetnictví).  
  - Data zdůrazňují, že provize se komunikuje jako částka v Kč a DPH se řeší zvlášť.【159:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L32-L36】

### 1.2 Produktové entity (pro EPIC 2)
- **Projekt** = kontejner pro dokumentaci a více tiketů.【179:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L15-L20】  
- **Tiket** = konkrétní nabídka financování (částka, výnos, splatnost, forma financování, zajištění, atd.).【179:9†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L15-L25】  
- **Rezervace** = proces, kterým broker „introdukuje“ investora k tiketu přes auditovatelný workflow.

### 1.3 Maskování a odemykání
- Projekt/tiket existuje ve dvou režimech: **maskovaný teaser** a **odemknutý detail**.【179:1†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L1-L8】  
- Obchodník vidí v teaseru maskované identity (projekt, developer, obrázky placeholder, omezené dokumenty).【179:1†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L6-L16】  
- **Právní odemknutí** nastává po podpisu **Souhlasu se sdílením údajů + NDA** investorem:  
  - odmaskování projektu a developera brokerovi,  
  - zobrazení rezervace developerovi **včetně jména investora a obchodníka**,  
  - auditní stopa introdukce.【179:12†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L15-L23】  
- Investor **nemá účet v aplikaci**; projekt vidí pouze v rámci eSign procesu.【179:3†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L1-L4】

### 1.4 Konkurence brokerů, kapacita a fronta
- Tiket se **nezamyká** pro jednoho brokera; rozhoduje **čas podpisu investora**.【179:15†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L1-L7】  
- Do kapacity (N) se počítají až rezervace od podpisu rezervační smlouvy investorem (čeká na podpis developera / aktivní / jednání).【179:16†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L15-L18】  
- Po financování jedné rezervace ostatní automaticky zanikají.【179:15†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L7-L7】

### 1.5 Sloty brokera (limit „otevřených“ rezervací)
- Úrovně a výchozí limity: **Partner 10**, **Premium 25**, **Elite 50** (admin může měnit).【167:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L12-L15】  

### 1.6 Provize (aktualizace dle rozhodnutí)
- **Celková provize:** 5 % z profinancované částky (success‑fee).  
- **Split:** platforma 50 %, broker 1 25 %, broker 2 25 %.  
- V UI komunikujeme jako částky v Kč (bez DPH).  
- Provize vzniká až po **profinancování** (success‑fee), což odpovídá personě.【175:7†Tipari_persona_obchodnik_partner_20m.md†L15-L16】

> Pozn.: datový dokument uvádí obecný model provizí a vypořádání (včetně toho, že platí developer).【159:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L1-L5】  
> Konkrétní procenta pro MVP bereme z vašeho rozhodnutí (5 % a split 50/25/25).

### 1.7 Povinné dokumenty v eSign balíku (1 envelope)
- **NDA** – smluvní strany: Platforma ↔ Investor  
- **Souhlas se zpracováním a postoupení osobních údajů (GDPR / sdílení na developera)** – Platforma ↔ Investor  
- **Rezervační smlouva** – Developer ↔ Investor  
- UX princip: jasně oddělit „rezervaci“ od „investice“ a držet konzervativní jazyk (žádný hype, žádné sliby výnosů).【175:1†Tipconnecta_Strategicky_Marketingovy_Deck_v1.md†L8-L18】

---

## 2) Nejasnosti (otázky na ownera)
> Nejsou blokující pro návrh EPIC 2; dávám je jen jako „to‑confirm“, kdybyste chtěl doladit právní/ops detaily.

1) **Co se stane se share „broker 2“**, když u projektu není žádný broker‑přinášeč (broker 2 neexistuje)? (Navrhuji: broker 1 bere 50 % místo 25 %.)  
2) Má Platforma **kontrasignovat** NDA/Souhlas, nebo je to „jednostranný“ podpis investora (pro audit stačí)?  
3) Potřebujeme u investora pro eSign **SMS/OTP ověření**, nebo stačí e‑mail link (MVP)?  
4) Má eSign posílat **automatické reminder e‑maily** (např. T+24h, T+40h), nebo je to ručně broker/admin?  
5) Chceme v MVP umožnit brokerovi **zrušit** rezervaci, nebo pouze „požádat admina“ (v datech je explicitně důvod „zrušeno administrátorem“).【163:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L4-L12】

---

## 3) Předpoklady (doplňuji logicky)
1) **Broker 1 = broker, který vytvořil rezervaci** (introdukce investora).  
2) **Broker 2 = broker, který přinesl projekt (lead)** a projekt je na něj označen (hybrid model).  
3) Když broker 2 neexistuje, **broker 1 získá celý brokerský share** (tj. 50 % z celkové provize).  
4) „Otevřená rezervace“ pro účely slotů brokera počítáme od stavu **Odesláno investorovi** až do uzavření (zánik/expirace/financování).  
5) Marketplace listujeme **tikety** (kvůli filtrům), ale vždy „v kontextu projektu“ (thumbnail/odkaz na projekt).【179:1†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L14-L16】

---

## 4) Checklist úkolů — co musí existovat, aby šlo uzavřít finální UX/UI zadání
Níže je „komplexní seznam“ práce (nejen EPIC 2). Berte to jako backlog na zadávací dokumentaci.

### 4.1 Produktová logika (must‑have pro zadání)
- [ ] Finalizovat **role & oprávnění** (Broker, Developer, Admin; multi‑user developer).  
- [ ] Finalizovat **stavové automaty**: projekt, tiket, rezervace, dokumenty, provize, pool. (včetně přechodů, kdo je spouští)  
- [ ] Definovat **SLA** a jak se promítne do UX (počítání času, reminder, expirace, re‑send).  
- [ ] Definovat **kapacitu tiketu** a UI pro frontu (co vidí kdo, bez úniku identit).【179:15†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L1-L7】  
- [ ] Definovat **slot policy** pro brokery (kdy se slot obsazuje/vrací).【167:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L12-L15】  
- [ ] Definovat pravidla **broker hybrid**: projekt lead vytvořený brokerem → přiřazení developerovi → dopad na provize.  
- [ ] Definovat „**ticket readiness**“ minimální standard (parametry + dokumenty) a admin checklist pro publikaci.【147:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L1-L6】  

### 4.2 UX architektura (IA) a flows
- [ ] Sitemap/navigace pro každou roli (Broker/Developer/Admin).  
- [ ] End‑to‑end journey: Broker i Developer (od signup → první publikovaný tiket → první profinancování).  
- [ ] Klíčové happy‑path + edge‑case flows:
  - [ ] Ticket discovery → rezervace → podpisy → aktivace → jednání → financování → provize  
  - [ ] Ticket expirace, rezervace expirace, odmítnutí developerem, zrušení adminem  
  - [ ] 2 brokere na 1 projektu (split)  
  - [ ] Kapacita plná a čekání ve frontě (přesuny z fronty do kapacity)  
- [ ] Definovat UX pro investora „mimo app“: email + eSign page (co vidí, jaké copy, jaké kroky).

### 4.3 UI / Design System (pro finální UI zadání)
- [ ] UI principy „private banking calm“ (whitespace, klid, bez hype).【175:1†Tipconnecta_Strategicky_Marketingovy_Deck_v1.md†L8-L17】  
- [ ] Tokeny (barvy, typografie, spacing), komponenty a jejich stavy.  
- [ ] Tabulky/karty pro marketplace, timeline komponenta pro rezervace.  
- [ ] Stavové UI: loading/empty/error, skeletony, disabled, access denied.  
- [ ] Responsivní pravidla desktop (min width, layout breakpoints).

### 4.4 Copywriting (součást UX/UI)
- [ ] Tone of voice pravidla (vykání; věcné; žádné sliby výnosů; oddělit rezervaci vs investici).【175:1†Tipconnecta_Strategicky_Marketingovy_Deck_v1.md†L8-L18】  
- [ ] Mikrocopy pro SLA/timeline (co se děje, kdo je na tahu).  
- [ ] E‑mail šablony: pozvánka k podpisu, reminder, „signature complete“, expirace.  
- [ ] FAQ bloky v app: „Jak funguje maskování“, „Jak funguje kapacita“, „Kdy vzniká nárok na provizi“.

### 4.5 Měření (analytics) + KPI tree
- [ ] Definovat activation KPI pro brokera: do 7 dní nastavit filtry + vytvořit investora + odeslat 1 rezervaci.【175:0†Tipari_persona_obchodnik_partner_20m.md†L1-L4】  
- [ ] Funnel KPI v milnících rezervace (odesláno → Souhlas+NDA → podpis investora → aktivní → profinancováno).【175:0†Tipari_persona_obchodnik_partner_20m.md†L5-L7】  
- [ ] Event taxonomy + parametry; dashboard metriky.

### 4.6 Handoff pro vývoj (bez kódování, ale precizní specifikace)
- [ ] Data requirements per screen (API kontrakty; validace; error map).  
- [ ] Notifikace (in‑app + email) a jejich spouštěče (SLA reminder, změna stavu).  
- [ ] Audit log — které akce se logují a kde se v UI zobrazují.

---

# EPIC 2 — Marketplace tiketů + Rezervace (Broker)

## EPIC 2 — Cíl
Broker má **rychle**:
1) vyfiltrovat vhodné tikety (20M+),  
2) vybrat/vytvořit investora,  
3) odeslat eSign balík,  
4) sledovat stav a deadline, bez chaosu a bez rizika „obejití“.

Persona požaduje: tvrdé filtry (20M+, zástava 1. pořadí, zápůjčka/úvěr), rychlý proces a jistotu introdukce.【135:0†Tipari_persona_obchodnik_partner_20m.md†L35-L39】

---

## EPIC 2 — Navigace (Broker)
- **Tikety** (Marketplace)
- **Rezervace**
- **Investoři**
- **Pool** (MVP active)
- **Profil**

---

## [BRK-200] Tikety — Marketplace
Cíl uživatele: Najít „ready“ tiket podle filtrů a rychle vidět odměnu a podmínky.  
Cíl byznysu: Zvýšit aktivaci (první rezervace) a zrychlit TTR (time‑to‑reserve).  
Primární CTA / sekundární CTA:  
- Primární: **Otevřít projekt** / **Rezervovat** (na kartě)  
- Sekundární: Uložit filtr, Uložit tiket, Export shortlistu (MVP volitelně)

KPI:
- % brokerů, kteří do 7 dní nastaví filtry + odešlou rezervaci【175:0†Tipari_persona_obchodnik_partner_20m.md†L1-L4】  
- time_to_first_reservation (TTR)

Obsah (texty 1:1):
- H1: **Tikety**
- Subtext: *Vyfiltrujte tikety a zahajte rezervaci. Identita projektu je odmaskována po podpisu Souhlasu + NDA investorem.*
- Badge (topbar): **Moje sloty: 3 / 10** *(Partner klub)*
- Filtry (sekce):  
  - „Částka (Kč)“ (min/max)  
  - „Výnos p.a. (%)“ (min/max)  
  - „Splatnost (měsíce)“ (min/max)  
  - „Forma financování“ (multi‑select)  
  - „Zajištění“ (multi‑select)  
  - „Lokalita“ (kraj + město)  
  - „Zástava v pořadí“ (1. / 2. / jiné)  
- Sort: **Doporučené** | Nejvyšší odměna | Nejkratší splatnost | Nejbližší expirace publikace

Karta tiketu (v listu):
- Projekt: **Projekt #123** (mask) + město/kraj
- Tiket: **20 000 000 Kč** · **12,5 % p.a.** · **24 měsíců**
- Zajištění: **Zástavní právo k nemovitosti · 1. pořadí**  
- Fronta: **Kapacita 3 · V kapacitě 2 · Fronta 1**  
- Odměna: **Odměna brokera: 250 000 Kč** *(bez DPH; při profinancování)*
- CTA: **Otevřít projekt** (primary) · **Rezervovat** (secondary)

Komponenty:
- Header + sidebar nav
- Filter panel (accordion)
- Ticket card (skeleton)
- Badges (sloty, kapacita, mask)
- Pagination / infinite scroll
- Empty state component

Layout (popis zón):
- Header: Logo + vyhledávání + uživatel
- Left: Filtry (sticky)
- Body: List tiketů (cards)
- Right (volitelně): „Tip: jak funguje maskování“

Stavy:
- loading: skeleton list + skeleton filter
- empty: „Žádné tikety pro zvolené filtry“
- error: „Tikety se nepodařilo načíst“ + Retry
- edge cases:
  - broker bez slotů → CTA „Rezervovat“ disabled + vysvětlení
  - tiket mimo publikační okno → karta hidden / disabled

Validace a pravidla:
- Tiket se zobrazuje vždy v kontextu projektu (thumbnail + link).【179:1†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L14-L16】  
- Identita projektu/developera je maskovaná do podpisu Souhlasu+NDA.【179:12†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L15-L21】  
- Slot limit dle úrovně brokera.【167:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L12-L15】

Analytické eventy:
- `tickets_viewed` (user_id, broker_level, filters_applied_count)
- `ticket_filter_changed` (filter_name, value)
- `ticket_card_clicked` (ticket_id, project_id, masked=true/false)
- `reservation_cta_clicked` (ticket_id, source="marketplace")

ASCII wireframe:
[Header: Logo | Search | Sloty 3/10 | Profil]
---------------------------------------------------------
[Sidebar: Tikety | Rezervace | Investoři | Pool | Profil]
---------------------------------------------------------
[Filters]                 [H1 Tikety]
- Částka                 [Card: Projekt #123 | 20M Kč | 12.5% | 24m]
- Výnos                  [Tags: Zástava 1. pořadí | Praha]
- Splatnost              [Fronta: 2/3 | Odměna: 250k Kč]
- Zajištění              [CTA: Otevřít projekt | Rezervovat]
---------------------------------------------------------

---

## [BRK-210] Projekt — Detail (teaser / maskovaný)
Cíl uživatele: Rychle posoudit, zda má smysl zahájit rezervaci (bez odhalení identit).  
Cíl byznysu: Zrychlit zahájení rezervace při zachování ochrany projektu.  
Primární CTA / sekundární CTA:
- Primární: **Zahájit rezervaci**
- Sekundární: Uložit projekt, Stáhnout předrezervační dokumenty

KPI:
- conversion to reservation start
- time on project teaser

Obsah (texty 1:1):
- Breadcrumb: Tikety / Projekt #123
- H1: **Projekt #123 (maskovaný)**
- Subtext: *Identita projektu a developera se odemkne po podpisu Souhlasu + NDA investorem.*
- Sekce „Základní informace“:
  - Lokalita: **Praha · Praha 5**
  - Typ projektu: **Rezidenční**
  - Teaser popis: *(text od developera, anonymizovaný)*
- Sekce „Tikety v projektu“ (tabulka/list):
  - Tiket 1: 20M Kč · 12,5 % p.a. · 24 měsíců · Zápůjčka · Zástava 1. pořadí
  - CTA u řádku: **Rezervovat investora**
- Sekce „Dokumenty (předrezervační)“:
  - „Teaser info.pdf“
  - „Anonymizovaný term sheet.pdf“
- Box „Jak probíhá odemknutí“:
  1) Odešlete balík k podpisu (48h)  
  2) Po podpisu Souhlasu+NDA se odemkne identita  
  3) Po podpisu rezervační smlouvy investorem čeká developer (48h)

Komponenty:
- Breadcrumb
- Hero header (mask badge)
- Info list (key-value)
- Tickets table/list with inline CTA
- Documents list (download)
- Timeline / stepper component

Layout (popis zón):
- Header: breadcrumb + H1 + badge
- Body: 2-column (left content, right timeline box)
- Sticky CTA: „Zahájit rezervaci“ (vpravo nahoře nebo sticky)

Stavy:
- loading: skeleton header + skeleton table
- empty: „Projekt nemá aktuálně žádné publikované tikety“
- error: „Projekt se nepodařilo načíst“
- edge cases:  
  - tiket už expiroval publikačně → CTA disabled, text „Tiket už není aktivní“

Validace a pravidla:
- Teaser musí obsahovat povinné bloky (maskované identity, kraj+mesto, typ projektu, teaser popis, seznam tiketů, předrezervační dokumenty, placeholder obrázky).【179:1†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L9-L16】  
- Před podpisem Souhlasu+NDA broker vidí pouze dokumenty označené adminem jako předrezervační.【179:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L3-L4】

Analytické eventy:
- `project_teaser_viewed` (project_id, from="marketplace")
- `pre_docs_downloaded` (project_id, doc_id)
- `reservation_start_clicked` (project_id, ticket_id)

ASCII wireframe:
[Header: Tikety / Projekt #123 (mask)              [CTA Zahájit rezervaci]]
---------------------------------------------------------------------------
[Left]
[H1 Projekt #123]
[Subtext o odemknutí]
[Key facts: Lokalita | Typ projektu]
[Teaser popis...]
[Tikety v projektu: table + CTA u řádku]
[Dokumenty (předrezervační)]
[Right]
[Box: Jak probíhá odemknutí (stepper)]
---------------------------------------------------------------------------

---

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

Komponenty:
- Hero header
- Developer card
- Rich text blocks
- Tabs: Dokumenty / Tikety / Audit
- Gallery component
- Reservation link card

Layout (popis zón):
- Header: H1 + badge
- Body: tabs
- Right sidebar: kontakty + audit summary

Stavy:
- loading / error standard
- edge case: odemknuto, ale rezervace zanikla (expirace) → zobrazit důvod + CTA „Vytvořit novou rezervaci“

Validace a pravidla:
- Povinné bloky odemknutého detailu (identita projektu, identita developera, plné texty, dokumenty, obrázky, lokality).【179:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L12-L19】

Analytické eventy:
- `project_unlocked_viewed` (project_id, unlock_source="consent_nda")
- `developer_contact_clicked` (project_id, channel="email|phone")
- `audit_panel_opened` (project_id)

ASCII wireframe:
[Header: Projekt ABC | Badge Odemknuto]
------------------------------------------------------------
[Tabs: Přehled | Tikety | Dokumenty | Audit]
[Left content: popis, lokalita, galerie]
[Right: Developer card + kontakty + Audit summary]
------------------------------------------------------------

---

## [BRK-220] Rezervace — Vybrat investora (krok 1/2)
Cíl uživatele: Vybrat existujícího investora nebo ho rychle založit.  
Cíl byznysu: Minimalizovat friction a zvýšit dokončení rezervace.  
Primární CTA / sekundární CTA:
- Primární: **Pokračovat**
- Sekundární: **Přidat investora**

KPI:
- % rozpracovaných rezervací dokončených odesláním
- time_to_select_investor

Obsah (texty 1:1):
- H1: **Zahájit rezervaci**
- Stepper: 1) Investor  2) Odeslání
- Vyhledávání: „Hledat podle jména / firmy / e‑mailu“
- List investorů (karty):
  - Firma + osoba
  - E‑mail (ověřený/neověřený)
  - Preferovaný ticket: min 20M
  - Poznámka (interní)
- Helptext: *Investor nemá účet v aplikaci. Pozvánku k podpisu mu pošleme e‑mailem.*

Komponenty:
- Stepper
- Search input
- Investor card list
- Empty state „Nemáte investory“ + CTA „Přidat investora“

Layout:
- Modal nebo page (doporučuji page)
- Left: list
- Right: summary vybraného tiketu/projektu

Stavy:
- empty list
- error on load
- edge: duplicita e‑mailu → upozornění při výběru

Validace a pravidla:
- Investor záznam je interní evidence brokera; platforma investora neověřuje (MVP).【151:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L1-L6】  
- Pro odeslání rezervace musí mít investor vyplněný e‑mail a broker musí potvrdit právní důvod evidence.【151:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L6-L12】

Analytické eventy:
- `reservation_investor_step_viewed` (ticket_id)
- `investor_selected` (investor_id)
- `investor_create_clicked` (source="reservation")

ASCII wireframe:
[Header: Zahájit rezervaci | Stepper 1/2]
------------------------------------------------
[Search investor...]
[Investor card] [Select]
[Investor card] [Select]
[CTA: Přidat investora]   [CTA: Pokračovat]
------------------------------------------------

---

## [BRK-221] Investor — Vytvořit / upravit (form)
Cíl uživatele: Založit investora rychle a správně.  
Cíl byznysu: Kvalitní data pro matching + hladký eSign flow.  
Primární CTA / sekundární CTA:
- Primární: **Uložit investora**
- Sekundární: Zrušit

KPI:
- completion rate formu
- % investorů s vyplněným e‑mailem

Obsah (texty 1:1):
- H1: **Nový investor**
- Sekce „Identita“:
  - Firma (název)*
  - Kontaktní osoba (jméno a příjmení)*
  - E‑mail*  
  - Telefon (volitelně)
- Sekce „Preference“ (pro matching):
  - Min. ticket (Kč)
  - Preferované lokality (kraje)
  - Preferovaný výnos p.a. (%)
  - Poznámka (interní)
- Checkbox (povinný před první rezervací):  
  - **Prohlašuji, že mám právní důvod evidovat a sdílet kontaktní údaje investora pro účely této rezervace.**  
  - Helptext: *Platforma investora neověřuje; odpovědnost za oprávnění a správnost údajů nese broker.*

Komponenty:
- Form inputs
- Section headers
- Checkbox + tooltip
- Save bar

Layout:
- Centered form (max width)
- Sticky footer actions

Stavy:
- validation errors inline
- duplicate email warning (soft)
- save success toast

Validace a pravidla:
- Povinné: firma, osoba, e‑mail (dle datového modelu).【151:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L1-L6】  
- Bez potvrzení prohlášení nelze odeslat rezervaci.【151:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L6-L12】

Analytické eventy:
- `investor_form_viewed` (mode="create|edit")
- `investor_saved` (investor_id, has_email, preferences_filled_count)
- `investor_declaration_checked` (checked=true)

ASCII wireframe:
[H1 Nový investor]
-------------------------
[Firma*]
[Kontaktní osoba*]
[E-mail*]
[Telefon]
-------------------------
[Preference...]
[ ] Prohlašuji... (povinné)
-------------------------
[CTA Uložit investora]  [Zrušit]

---

## [BRK-230] Rezervace — Odeslat eSign balík (krok 2/2)
Cíl uživatele: Zkontrolovat a odeslat balík k podpisu; vědět co se stane dál.  
Cíl byznysu: Aktivace rezervace a auditní stopa introdukce.  
Primární CTA / sekundární CTA:
- Primární: **Odeslat k podpisu**
- Sekundární: Uložit jako koncept, Zpět

KPI:
- % rezervací odeslaných investorovi
- time_to_send

Obsah (texty 1:1):
- H1: **Odeslat k podpisu**
- Shrnutí:
  - Projekt: Projekt #123 (mask / odemkne se po Souhlasu+NDA)
  - Tiket: 20 000 000 Kč · 12,5 % p.a. · 24 měsíců
  - Investor: ABC Family Office s.r.o. / Jan Novák
  - E‑mail: jan.novak@...
- Dokumenty v balíku:
  1) Souhlas se sdílením osobních údajů (Platforma ↔ Investor)
  2) NDA (Platforma ↔ Investor)
  3) Rezervační smlouva (Developer ↔ Investor)
- SLA box:
  - **Investor má 48 hodin** na podpis celého balíku.  
  - *Po podpisu Souhlasu+NDA se odemkne identita projektu a developer uvidí, že jste investora představili.*
- E‑mail zpráva (editable):
  - Předmět: **Dokumenty k rezervaci tiketu (48h)**
  - Text:
    „Dobrý den,  
    v příloze/na odkazu najdete dokumenty k rezervaci financování. Prosím o podpis do 48 hodin.  
    Děkuji,  
    {Jméno brokera}“
- Checkbox: „Odeslat kopii mně“ (volitelné)

Komponenty:
- Summary cards
- Doc list with info icons
- SLA banner
- Email composer (subject + body)
- CTA buttons

Layout:
- Left: summary + docs
- Right: SLA + email message
- Sticky CTA bottom: Odeslat

Stavy:
- loading on send
- error: eSign provider error
- success: redirect to BRK-241 (detail)

Validace a pravidla:
- Odeslání blokuje:  
  - broker nemá volné sloty,  
  - tiket není publikovaný/expirace,  
  - investor nemá e‑mail,  
  - broker nepotvrdil prohlášení o právním důvodu evidence.  
  (blokátory jsou v datech explicitně popsány).【151:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L6-L12】

Analytické eventy:
- `reservation_send_viewed` (ticket_id, investor_id)
- `reservation_send_clicked` (ticket_id, investor_id)
- `reservation_send_failed` (reason)
- `reservation_sent` (reservation_id, sla_hours=48)

ASCII wireframe:
[Header: Odeslat k podpisu | Stepper 2/2]
--------------------------------------------------------
[Left]
[Summary: Projekt/Tiket/Investor]
[Docs list]
[Right]
[SLA box: 48h]
[Email subject]
[Email body]
--------------------------------------------------------
[Sticky CTA: Odeslat k podpisu]

---

## [BRK-240] Rezervace — Přehled (list)
Cíl uživatele: Vidět, co je „na tahu“ a hlídat deadline.  
Cíl byznysu: Zrychlit průchod funnelu, snížit expirace.  
Primární CTA / sekundární CTA:
- Primární: Otevřít detail rezervace
- Sekundární: Resend (pokud čeká investor)

KPI:
- drop‑off mezi kroky podpisu【175:0†Tipari_persona_obchodnik_partner_20m.md†L5-L7】  
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

Komponenty:
- Data table + tabs
- Status pills
- Countdown badge
- Empty state

Layout:
- Full width table
- Right top: filters

Stavy:
- empty
- error
- edge: rezervace v pořadí mimo kapacitu → status „Ve frontě“ (bez jmen ostatních)

Validace a pravidla:
- O pořadí rozhoduje čas podpisu investora; do kapacity jdou první N.【179:15†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L3-L6】

Analytické eventy:
- `reservations_list_viewed` (tab)
- `reservation_row_clicked` (reservation_id)
- `reservation_resend_clicked` (reservation_id)

ASCII wireframe:
[Header: Rezervace]
--------------------------------------------------------
[Tabs]
[Table: Projekt | Tiket | Investor | Stav | Deadline | Akce]
--------------------------------------------------------

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
  - „Investor a obchodník byli developerovi představení platformou“ (po Souhlasu+NDA)【179:12†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L21-L23】

Komponenty:
- Status header + countdown
- Timeline/stepper with timestamps
- Doc status list
- Audit log list
- Actions menu (kebab)

Layout:
- Header: H1 + status + CTA
- Body: left timeline, right details (docs, queue)
- Footer: audit log

Stavy:
- loading / error
- edge cases:
  - Expired: „Vypršelo SLA“ + CTA „Vytvořit novou rezervaci“
  - Developer odmítl podpis: „Odmítnuto developerem“ + důvod
  - Zrušeno adminem: zobrazit důvod zrušení【163:0†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L4-L12】

Validace a pravidla:
- Odemknutí a auditní stopa po Souhlasu+NDA.【179:12†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L15-L23】  
- Kapacita se počítá až po podpisu rezervační smlouvy investorem.【179:16†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L15-L18】  

Analytické eventy:
- `reservation_detail_viewed` (reservation_id, status)
- `reservation_reminder_clicked` (reservation_id, channel="email")
- `reservation_audit_opened` (reservation_id)
- `reservation_expired_viewed` (reservation_id)

ASCII wireframe:
[Header: Rezervace #R-000123 | Status | Countdown | CTA Připomenout]
--------------------------------------------------------------------
[Left: Timeline (milníky + timestamps)]
[Right: Docs status | Kapacita/Fronta | Messages]
--------------------------------------------------------------------
[Audit log]

---

## [BRK-250] Pool — Přehled (MVP)
Cíl uživatele: Vidět, jak si stojím v bonusovém poolu a co zlepšit.  
Cíl byznysu: Zvýšit retenci a motivovat aktivitu.  
Primární CTA / sekundární CTA:
- Primární: **Zobrazit pravidla poolu**
- Sekundární: Zobrazit historii

KPI:
- WAU/MAU brokerů【175:0†Tipari_persona_obchodnik_partner_20m.md†L9-L12】  
- # rezervací / broker / měsíc【175:0†Tipari_persona_obchodnik_partner_20m.md†L10-L12】

Obsah (texty 1:1):
- H1: **Pool**
- Subtext: *Bonusový pool je financovaný z části podílu platformy a nemění váš standardní brokerský podíl.*【159:2†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L26-L33】
- Karta „Tento měsíc“:
  - Moje profinancování: X Kč
  - Moje pořadí: #12
  - Odhad bonusu: Y Kč *(informativní)*
- Pravidla: „Jak se počítá pool“ (accordion)

Komponenty:
- KPI cards
- Progress bar / rank
- Accordion rules
- Empty state (pokud zatím nic)

Layout:
- KPI cards top
- Rules bottom

Stavy:
- empty: „Zatím nemáte profinancování v tomto období.“
- error: „Pool se nepodařilo načíst“

Validace a pravidla:
- Pool je optional program financovaný z podílu platformy; nemá ubírat brokerům jejich share.【159:2†Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md†L26-L33】

Analytické eventy:
- `pool_viewed` (period)
- `pool_rules_opened` (period)
- `pool_history_clicked`

ASCII wireframe:
[Header: Pool]
-----------------------------------------
[KPI cards: profinancování | pořadí | odhad]
[Rules accordion]
-----------------------------------------

---

## EPIC 2 — Co je hotovo výstupem
- Kompletní IA pro brokera (nav)
- Klíčové obrazovky marketplace → rezervace → tracking
- Copy + stavy + validace + eventy (bez poznámek pro Figmu)

