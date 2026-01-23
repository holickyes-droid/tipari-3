# Tipconnecta (Tipari) — Sitemap & náčrty rozložení hlavních typů stránek (Desktop responsive)
*Verze:* v1 (2026-01-23)  
*Zdrojová data (pouze):* `Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md`, `Tipconnecta_Strategicky_Marketingovy_Deck_v1.md`, `Tipari_persona_obchodnik_partner_20m.md`

---

## 1) Kontext, role a hranice produktu (pro sitemapu)

### Role v aplikaci (za loginem)
- **Obchodník / broker (tipař)** — správa profilu, interní evidence investorů, rezervace tiketů, sledování průběhu, fakturace podílu provize. (Platforma investory neověřuje.)  
- **Developer** — zakládá projekty a tikety, doplňuje podklady, řeší rezervace (podpis, jednání), potvrzuje profinancování, hradí provizi platformě.  
- **Administrátor (interní)** — schvaluje účty a publikace, nastavuje parametry (kapacity, SLA, provize), ručně eviduje finance, řeší spory/incidenty, audit.  

### Investor
- **Investor není uživatel platformy** (nemá login). Interaguje přes **eSign** (podpis balíku dokumentů).

### Klíčové principy, které ovlivňují IA a layouty
- **Maskování/odemknutí identity**: před odesláním rezervace obchodník vidí jen maskované údaje (název projektu/developera, obrázky jako placeholder, většina dokumentů). Po podpisu **Souhlas + NDA** se odemkne detail obchodníkovi a současně se developerovi odkryje investor i obchodník + vznikne auditní stopa introdukce.  
- **Fronta a kapacita**: pořadí určuje čas podpisu investora; do kapacity jde vždy prvních N; po financování jedné rezervace ostatní rezervace zanikají.  
- **Publikační okno tiketu**: po expiraci se tiket skryje a nové rezervace nejsou možné (aktivní doběhnou).  
- **Matching investorů**: interní doporučovací nástroj pro obchodníka (není poradenství).  
- **Bez bankovní integrace**: financování potvrzuje developer ručně, platby provizí a výplaty eviduje admin ručně s auditní stopou.  
- **Pool program**: volitelný bonus pro obchodníky; v MVP je aktivní v UI (dle rozhodnutí).  

---

## 2) Sitemap — Public web (pre‑login)

> Cíl public webu: akvizice brokerů a developerů do pilotu + důvěra + vysvětlení procesu (bez zobrazení citlivých dat).  
> Struktura je odvozená z marketing decku a broker persony (landing struktura + FAQ + kvalifikace).

### 2.1 Globální strom (Public)
- `/` **Home** (krátké vysvětlení + rozcestník pro brokery/developery)
- `/pro-brokery` **Landing: Broker / Partner klub**  
  - sekce: Hero → Pro koho → Jak to funguje (kroky) → Co v nabídce → Proč to funguje → Benefity → FAQ → Form (kvalifikace)
- `/pro-developery` **Landing: Developer** (value prop + jak funguje poptávka → proces → dokumenty)
- `/jak-to-funguje` **Proces a timeline** (rezervace → podpisy → aktivace → jednání → financování → provize)
- `/bezpecnost-a-pravidla` **Maskování, důkaz introdukce, lhůty, etika**
- `/faq` **FAQ**
- `/kontakt` **Kontakt / žádost o call**
- `/prihlaseni` **Login**
- `/registrace` **Signup (self signup)**
- `/podminky` **Právní** (VOP, GDPR info, cookies) – minimální

### 2.2 Typy public stránek (templates)
- Landing page (konverzní)
- Content články / edukace (z marketing decku)
- Form / lead capture (kvalifikační otázky, CRM)
- Login/Signup (brána do app)

---

## 3) Sitemap — App (za loginem)

> Pozn.: aplikace je **role‑based**. Po přihlášení se zobrazí shell + navigace relevantní pro roli (obchodník / developer / admin).

### 3.1 Společné (Auth + účet)
- `/auth/login`
- `/auth/signup` (výběr role: Obchodník / Developer)
- `/auth/forgot-password`
- `/auth/pending-approval` (po registraci: čeká na admin approval)
- `/auth/account-disabled` (pokud admin zablokuje)
- `/help` (kontakt, FAQ, incident)

### 3.2 Obchodník (Broker)
- `/app/broker/dashboard` **Dashboard**
- `/app/broker/marketplace` **Marketplace (Tikety)**  
  - `/ticket/:id` Ticket detail (teaser/unlocked)
  - `/project/:id` Projekt detail (teaser/unlocked)
- `/app/broker/reservations` **Rezervace (pipeline)**  
  - `/reservation/:id` Detail rezervace (timeline, SLA, dokumenty)
  - `/reservation/:id/send-esign` Odeslání eSign balíku (modal/step)
- `/app/broker/investors` **Moji investoři (interní databáze)**  
  - `/investor/:id` Detail investora + preferenční profil + historie
- `/app/broker/commissions` **Provize & faktury**  
  - `/payouts` (výplaty, důvody pozastavení, SLA)
  - `/invoices` (faktury obchodníka → platforma)
- `/app/broker/pool` **Pool program** (pokud aktivní)  
  - leaderboard / metriky / pravidla / anonymizace
- `/app/broker/settings` **Profil & nastavení**  
  - osobní a firemní údaje, souhlasy, smlouvy, notifikace, bezpečnost

### 3.3 Developer
- `/app/dev/dashboard` **Dashboard**
- `/app/dev/projects` **Projekty**  
  - `/project/:id` Detail + dokumenty + tikety (taby)
- `/app/dev/tickets` **Tikety**  
  - `/ticket/:id` Detail tiketu + kapacita + fronta rezervací
  - `/ticket/:id/edit-request` Žádost o úpravu (pokud zveřejněn)
- `/app/dev/reservations` **Rezervace (inbox)**  
  - `/reservation/:id` Detail rezervace + rozhodnutí (podepsat / zamítnout)
  - `/reservation/:id/financing` Potvrzení profinancování (částka, datum, proof)
- `/app/dev/billing` **Provize platformě / faktury od platformy**  
- `/app/dev/team` **Tým a přístupy** (MVP: více uživatelů k jednomu developerovi)  
- `/app/dev/settings` **Profil & nastavení** (identita, fakturace, bankovní účty, podpora)

### 3.4 Admin (interní)
- `/admin/dashboard` **Dashboard (operace)**
- `/admin/approvals` **Schvalování**  
  - účty (obchodník/developer), projekty/tikety, publikace, dokumenty
- `/admin/users` **Uživatelé & role**
- `/admin/projects` **Projekty**
- `/admin/tickets` **Tikety** (parametry, publikační okna, kapacita, SLA, provize)
- `/admin/reservations` **Rezervace** (override, prodlužování lhůt, důvody, audit)
- `/admin/finance` **Finance**  
  - provize platformy (platforma → developer)  
  - výplaty obchodníkům (obchodník → platforma faktura, statusy)  
  - ruční potvrzení plateb
- `/admin/pool` **Pool program** (nastavení, období, výplaty, anonymizace)
- `/admin/audit` **Audit log**
- `/admin/incidents` **Spory / incidenty**
- `/admin/exports` **Exporty do Excelu**
- `/admin/settings` **Globální nastavení** (čísleníky, default SLA, šablony e-mailů, eSign integrace parametry)

---

## 4) Navigační model (bez UI design tokenů)

### 4.1 App shell (doporučení pro desktop)
- **Left navigation (primary):** role‑specifická IA (Broker / Developer / Admin)
- **Top bar:** globální vyhledávání (tickets/projects/reservations), notifikace, profil, rychlá nápověda
- **Main content:** stránky
- **Right rail (volitelně):** kontextové info (SLA, rychlé akce, „Matches“, „Kapacita“)

### 4.2 Klíčové cross‑linky (aby uživatel neztratil kontext)
- Tiket vždy zobrazen **v kontextu projektu** (thumbnail + link na projekt).  
- Z Marketplace → Ticket detail → (Project detail) → Rezervace (Create / Detail).  
- Rezervace detail → dokumenty, SLA, timeline, komunikace.  
- Matching se otevírá jako **panel/drawer** z Ticket detailu i z Investor listu.

---

## 5) Náčrty rozložení — hlavní typy stránek (templates)

> ASCII náčrty jsou „wire‑layout“ pro desktop. Neřeší barvy ani finální komponenty — cílem je ukotvit zóny a obsah.

---

### T0) Public Landing (Broker / Developer) — konverzní stránka
**Použití:** `/pro-brokery`, `/pro-developery`

```
[Top bar: Logo | (Brokers) | (Developers) | How it works | FAQ | Login]
---------------------------------------------------------------------
[Hero: H1 + subtext + 3 bullets]                    [CTA card + form]
[Trust strip: "Proces / lhůty / důkaz introdukce"]  [Kvalifikační Qs]
---------------------------------------------------------------------
[Section: Pro koho (checklist)]
[Section: Jak to funguje (5 kroků timeline)]
[Section: Co v nabídce (typy dealů / lokality / instrumenty)]
[Section: Proč to funguje (maskování → Souhlas+NDA → audit → payout)]
[Section: Benefity programu + support]
[FAQ]
---------------------------------------------------------------------
[Footer: právní | GDPR | kontakt]
```

---

### T1) Auth: Login / Signup
**Použití:** `/auth/login`, `/auth/signup`

```
[Logo]
--------------------------------------------------
[Card]
  [H1: Přihlášení / Registrace]
  [Email] 
  [Heslo]  (login) / [Role: Obchodník | Developer] (signup)
  [CTA: Pokračovat]
  [Link: Zapomenuté heslo]
[/Card]
--------------------------------------------------
[Footer: Podmínky | GDPR]
```

---

### T2) Status page: Čeká na schválení (Admin approval)
**Použití:** `/auth/pending-approval`

```
[Logo]
--------------------------------------------------
[H1: Děkujeme — účet čeká na schválení]
[Text: Ověřujeme údaje (interní administrativní schválení).]
[Info box: Co můžete dělat mezitím (připravit podklady / profil)]
[CTA: Upravit registraci]  [Secondary: Kontaktovat podporu]
--------------------------------------------------
```

---

### T3) App Shell (základní rámec stránky)
**Použití:** všechny `/app/*` a `/admin/*`

```
[Top bar: Search | Notifications | Help | Profile]
--------------------------------------------------------
[Left nav] | [Page header: H1 + breadcrumbs + actions]
           | -------------------------------------------------
           | [Main content area: grids/tables/cards/forms]
           |
           | [Optional Right rail: SLA / quick actions]
--------------------------------------------------------
```

---

### T4) Dashboard (Broker / Developer) — „co je teď nejdůležitější“
**Použití:** `/app/broker/dashboard`, `/app/dev/dashboard`

**Broker dashboard (obsahové bloky):**
- „Moje rezervace“ podle stavu + SLA countdown
- „Nové/končící tikety“ (publikační okno)
- „Sloty“ (využití limitu rezervací)
- „Top matches“ (rychlé doporučení investorů na nové tikety)
- „Výplaty / faktury“ (co visí, co chybí)

```
[H1 Dashboard]                        [KPI strip: Sloty X/Y | Aktivní rezervace | Čeká na podpis]
-------------------------------------------------------------------------------------------------
[Card: Rezervace vyžadující akci]     [Card: Tikety s končící platností]
[List w/ SLA timers + CTA]            [List w/ expiry + CTA]
-------------------------------------------------------------------------------------------------
[Card: Marketplace highlight]         [Card: Provize & výplaty]
[New tickets + matches]               [Status + CTA "Nahrát fakturu" / "Zkontrolovat"]
```

**Developer dashboard (obsahové bloky):**
- „Rezervace k podpisu / rozhodnutí“ + SLA
- „Rezervace aktivní“ + okno jednání / financování
- „Tikety“ (stav publikace, kapacita, fronta)
- „Faktury od platformy“ (splatnost)

---

### T5) Marketplace (Tikety) — list + filtry + „signály“ (SLA, kapacita, matches, LTV)
**Použití:** `/app/broker/marketplace`

> Tiket je vždy navázaný na projekt a ve frontě se má zobrazovat v kontextu projektu (thumbnail + link).  
> Investor matching je interní doporučení pro obchodníka.

```
[H1 Marketplace — Tikety]                           [Button: Nová rezervace]
---------------------------------------------------------------------------------------------------
[Filters row: Region | Typ projektu | Částka | Výnos | Doba | Zajištění | LTV | Stav | Platnost]
[Search: Projekt / Developer (maskované)]   [Toggle: Jen dostupné v platnosti]
---------------------------------------------------------------------------------------------------
[Table/List]
| Projekt (thumb + maskovaný název) | Lokalita | Částka | Výnos | Doba | Zajištění | LTV | Kapacita | Fronta | Matches | Platnost |
| Projekt #123                       Praha      50M      12%     18m    Zástava    55%    3         5       8        23 dní   |
---------------------------------------------------------------------------------------------------
[Empty/Info row: vysvětlení fronty podle podpisu investora + co znamená kapacita]
```

**Pozn.:** „Platnost“ = vizuální countdown do konce publikačního okna; po vypršení se tiket skryje a nelze zahájit nové rezervace.

---

### T6) Ticket detail (teaser/unlocked) — detail + panel matchingu + rezervace
**Použití:** `/app/broker/marketplace/ticket/:id`, `/app/dev/tickets/:id`, `/admin/tickets/:id`

**Teaser režim (broker před odesláním rezervace):**
- maskovaná identita projektu a developera
- viditelné klíčové parametry (částka, výnos, splatnost, forma, publikační okno)
- placeholder obrázky + jen „předrezervační“ dokumenty
- CTA: „Vybrat investora & zahájit rezervaci“

**Unlocked režim:**
- plná identita + kompletní dokumenty a obrázky
- zobrazení rezervací a fronty (podle role)

```
[H1 Tiket: (maskovaný / plný název)]      [Badge: Stav] [Badge: Platnost do DD.MM.YYYY]
---------------------------------------------------------------------------------------------------
[Left: Projekt card (thumb + link)]        [Right rail: SLA / Kapacita / Fronta]
[Key metrics row: Částka | Výnos | Doba | Zajištění | LTV | Min investice]
---------------------------------------------------------------------------------------------------
[Tabs: Přehled | Dokumenty | Rezervace & fronta | Matching | Audit]
---------------------------------------------------------------------------------------------------
[Tab Přehled]
  [Text teaser/plný popis]
  [Block: Využití prostředků (graf/tabulka)]
  [Block: Zajištění + LTV]
  [CTA: Zahájit rezervaci] (broker) / [CTA: Publikovat / Upravit parametry] (admin)
---------------------------------------------------------------------------------------------------
[Right rail]
  [Kapacita: N | V kapacitě: n | Ve frontě: m]
  [SLA signály: investor/developer/jednání]
  [Quick: Otevřít matching]
```

---

### T7) Project detail (teaser/unlocked) — povinné bloky
**Použití:** `/app/*/project/:id`

> Projekt detail existuje ve 2 režimech; v teaseru jsou povinné bloky: maskovaná identita, lokalita, typ projektu, teaser popis, list tiketů s parametry, předrezervační dokumenty, placeholder obrázky. V plném režimu se ukáže plná identita developera a kompletní podklady.

```
[H1 Projekt: (maskovaný / plný)]          [Badge: režim teaser/unlocked]
---------------------------------------------------------------------------------------------------
[Hero media: placeholder / galerie]        [Right rail: Kontakty (jen unlocked)]
---------------------------------------------------------------------------------------------------
[Key facts: Lokalita | Typ projektu | Tikety count | Stav]
[Teaser/plný popis]
---------------------------------------------------------------------------------------------------
[Tikety v projektu (cards nebo list)]
[Dokumenty (předrezervační vs odemčené)]
```

---

### T8) Rezervace — „Create reservation“ wizard (Broker)
**Použití:** zahájení rezervace z ticket detailu

```
[H1 Nová rezervace]                      [Progress: 1 Vybrat investora → 2 Zkontrolovat → 3 Odeslat]
---------------------------------------------------------------------------------------------------
[Step 1: Vybrat investora]
  [Search investor]  [Filter: profil/region/částka]
  [List: investor name (interní) + match score + fit summary]
  [CTA: Pokračovat]
---------------------------------------------------------------------------------------------------
[Step 2: Zkontrolovat]
  [Summary: tiket parametry + co investor uvidí v eSign]
  [Warning box: "Po odeslání běží SLA, vzniká auditní stopa, developer uvidí identitu po Souhlas+NDA"]
  [CTA: Odeslat eSign balík]
---------------------------------------------------------------------------------------------------
[Step 3: Odesláno]
  [Status: čeká na podpis investora] + [Countdown 48h]
  [CTA: Zkopírovat link / Poslat připomínku] (pokud povoleno)
```

---

### T9) Rezervace — Detail (timeline + SLA + dokumenty + audit)
**Použití:** `/app/*/reservations/:id`

```
[H1 Rezervace #R-123]      [Badge: Stav]          [Countdown: aktuální SLA]
---------------------------------------------------------------------------------------------------
[Left: Timeline / kroky]                           [Right: Kontext tiketu + akce]
---------------------------------------------------------------------------------------------------
[Timeline]
  (1) Odesláno investorovi (čeká na podpis balíku)
  (2) Odemknutí (Souhlas+NDA) — audit stopa introdukce
  (3) Investor podepsal rezervaci — pořadí ve frontě / kapacita
  (4) Developer rozhodnutí (podepsat / zamítnout)
  (5) Aktivní — běží jednání (30 dní)
  (6) Financování potvrzeno (datum, částka, proof)
---------------------------------------------------------------------------------------------------
[Tabs: Přehled | Dokumenty | Komunikace/poznámky | Audit]
[Right rail: Ticket snapshot | Pozice ve frontě | Kapacita | CTA podle role]
```

---

### T10) Investoři (interní databáze obchodníka) — List + Detail
**Použití:** `/app/broker/investors`

```
[H1 Moji investoři]                      [Button: Nový investor]
---------------------------------------------------------------------------------------------------
[Filters: typ (firma/osoba) | částka min/max | regiony | instrumenty | zajištění | LTV max]
[Table]
| Investor | Typ | Min–Max investice | Regiony | Zajištění | LTV max | Poslední aktivita |
---------------------------------------------------------------------------------------------------
[Drawer/Detail]
  [Profil] [Preferenční profil] [Historie rezervací] [Poznámky]
```

---

### T11) Developer — Projekty / Tikety (list view)
**Použití:** `/app/dev/projects`, `/app/dev/tickets`

```
[H1 Projekty]                               [Button: Nový projekt]
---------------------------------------------------------------------------------------------------
[Table]
| Projekt | Lokalita | #tiketů | Stav (draft/sent/approved/published) | Akce |
---------------------------------------------------------------------------------------------------

[H1 Tikety]                                  [Button: Nový tiket]
---------------------------------------------------------------------------------------------------
[Table]
| Tiket | Projekt | Částka | Výnos | Doba | Kapacita | Fronta | Platnost | Stav | Akce |
```

---

### T12) Developer — Editor projektu/tiketu (form/wizard)
**Použití:** vytváření a doplňování dat, dokumenty, zajištění + LTV (volitelně)

```
[H1 Nový projekt / Upravit projekt]      [Status: draft] [CTA: Odeslat ke schválení]
---------------------------------------------------------------------------------------------------
[Tabs: Základ | Lokalita | Popis | Tikety | Dokumenty | Náhled teaser/unlocked]
---------------------------------------------------------------------------------------------------
[Form sections]
  - Povinná pole (validace inline)
  - Dokumenty: upload + označení viditelnosti (předrezervační / po odemknutí)
  - Zajištění: typy + (volitelně) hodnota zástavy + LTV
```

---

### T13) Developer — Rezervace inbox (decisioning)
**Použití:** `/app/dev/reservations`

```
[H1 Rezervace]                 [Filters: čeká na podpis | aktivní | financované | ukončené]
---------------------------------------------------------------------------------------------------
[List]
[Card/Row: Investor (unlocked) | Tiket | Stav | SLA | Akce]
  - [CTA: Podepsat] [CTA: Zamítnout (důvod)] [CTA: Otevřít detail]
```

---

### T14) Potvrzení financování (developer) + proof
**Použití:** `/app/dev/reservations/:id/financing`

```
[H1 Potvrdit profinancování]
---------------------------------------------------------------
[Field: Datum přijetí financí na účet]
[Field: Částka (může se lišit)]
[Upload: Proof / podklady (volitelně/ano-ne + důvod)]
[CTA: Potvrdit]
[Note: Admin může upravit (audit)]
```

---

### T15) Finance / Provize / Faktury (role‑based)
**Použití:** `/app/broker/commissions`, `/app/dev/billing`, `/admin/finance`

```
[H1 Provize & faktury]
---------------------------------------------------------------------------------------------------
[Tabs: Provize platformy | Faktury | Výplaty obchodníkům | Platební události]
---------------------------------------------------------------------------------------------------
[Table: 1 řádek = 1 finanční případ (tiket po financování)]
| Tiket | Developer | Obchodník 1 | Obchodník 2 | Datum financování | Částka | Stav provize | Stav výplaty |
---------------------------------------------------------------------------------------------------
[Side panel / detail]
  - Částky (bez DPH v UI komunikaci)
  - Splatnosti
  - Nahrané faktury a přílohy
  - Důvody pozastavení výplaty
```

---

### T16) Pool program (Broker + Admin)
**Použití:** `/app/broker/pool`, `/admin/pool`

```
[H1 Pool program]
---------------------------------------------------------------------------------------------------
[Card: Stav období (otevřené/uzavřené/vyplacené) + datum do uzávěrky]
[Progress: Meta 1 / Meta 2]
[Leader list: anonymizovaní "Obchodník A/B/C" + obrat + pořadí]
[Rules: krátké vysvětlení + co se počítá do obratu]
```

---

### T17) Admin — Approval queue (účty, projekty, tikety)
**Použití:** `/admin/approvals`

```
[H1 Schvalování]
---------------------------------------------------------------------------------------------------
[Tabs: Účty | Projekty | Tikety | Dokumenty]
---------------------------------------------------------------------------------------------------
[Queue table]
| Typ | Název | Vytvořil | Datum | Stav | Akce: Schválit / Zamítnout / Požádat o doplnění |
---------------------------------------------------------------------------------------------------
[Detail panel]
  - Kontrolní checklist
  - Nastavení publikačního okna, kapacity, SLA, provize
  - Poznámka (povinná při zamítnutí)
```

---

### T18) Admin — Ticket settings (SLA, kapacita, publikační okno, provize)
**Použití:** `/admin/tickets/:id`

```
[H1 Tiket — Admin nastavení]
---------------------------------------------------------------------------------------------------
[Section: Publikace]   Zveřejněno od / do, stav, viditelnost
[Section: Kapacita]    N, pravidlo fronty
[Section: SLA]         investor (balík), developer podpis, jednání, splatnosti
[Section: Provize]     Kč + % info, rozdělení 50/25/25, DPH režim
[CTA: Uložit změny]  (povinný důvod + audit)
```

---

### T19) Audit log & incident management (Admin)
**Použití:** `/admin/audit`, `/admin/incidents`

```
[H1 Audit log]
---------------------------------------------------------------------------------------------------
[Filters: entita (tiket/rezervace/provize) | uživatel | období | typ změny]
[Table: kdo / kdy / co změnil / důvod / přílohy]
---------------------------------------------------------------------------------------------------

[H1 Incidenty / spory]
---------------------------------------------------------------------------------------------------
[Table: typ | závažnost | dotčené záznamy | stav | přiděleno]
[Detail: popis + timeline + výsledek]
```

---

### T20) Settings / Profil (Broker & Developer) — template
**Použití:** `/app/*/settings`

```
[H1 Profil & nastavení]
---------------------------------------------------------------------------------------------------
[Tabs: Identita | Kontakty | Bankovní účty | Smlouvy & souhlasy | Notifikace | Bezpečnost | Podpora]
---------------------------------------------------------------------------------------------------
[Form sections + upload dokumentů]
[Warning: citlivé změny auditované, doporučeno admin schválení]
```

---

## 6) Checklist konzistence (rychlá kontrola před UI návrhem)

- [ ] Každá stránka, která ukazuje projekt/tiket, respektuje režimy: teaser vs unlocked.  
- [ ] Vždy je zřejmé: **kapacita**, **fronta**, **SLA**, **platnost tiketu**.  
- [ ] Matching je vždy označen jako doporučení, interní nástroj.  
- [ ] Finance obrazovky počítají s ruční evidencí a auditní stopou (bez bankovní integrace).  
- [ ] Admin zásahy vyžadují důvod + audit.  
- [ ] „Team management“ pro developera je samostatná oblast v IA (MVP).  
- [ ] Pool je viditelný v UI (MVP) a anonymizuje výherce.  

---

## 7) Co bude následovat (až budeš chtít)
1) „Sitemap → Page templates“ máme. Další krok je **UI design system** (komponenty, stavy, typografie, tabulky, formuláře, badge, timeline, countdown).  
2) Poté: **Full copy naplnění** každého template (1:1 texty), včetně edge cases a systémových hlášek.
