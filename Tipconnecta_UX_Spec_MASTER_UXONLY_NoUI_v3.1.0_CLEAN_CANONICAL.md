# Tipconnecta — UX Spec (MASTER, UX‑only, bez UI)

**Doc ID:** TIPCONNECTA-UX-MASTER-UXONLY-3.1.0
**Verze:** v3.1.0 (UX ONLY)
**Datum poslední aktualizace:** 2026-01-26
**Vlastník dokumentu:** Produkt / Founders (kanonický zdroj)  

## 0) Kontext a zdroje pravdy
Tento dokument je **kanonický UX zdroj pravdy** pro návrh a implementaci platformy Tipconnecta (styl inspirovaný Investown, ale bez UI pravidel).

**Zdrojové dokumenty (kanonické):**
- Tipconnecta_Souhrn_Dat_DATA_FINAL_CLEAN_v1.4.0_CANONICAL.md (data model + pravidla)
- Tipconnecta_Sitemap_Broker_v1.3.0_CLEAN_CANONICAL.md
- Tipconnecta_Sitemap_Developer_v1.3.0_CLEAN_CANONICAL.md
- Tipconnecta_Sitemap_Admin_v1.3.0_CLEAN_CANONICAL.md
- Tipconnecta_Brand_Manual_v2.3_InvestownStyle_MASTER_CLEAN_CANONICAL.md (jen pro tón/brand – UI řeší design systém)

**Zásady:**
- V případě konfliktu platí pořadí: **Data model → UX Spec → Sitemapy → Marketing deck → Persona**.
- V dokumentu **nejsou** pracovní poznámky, TODO, otázky na ownera. Rozhodnutí jsou buď:
  - **final**, nebo
  - explicitně označené jako **assumption (MVP)** / **backlog (post‑MVP)**.

---

## 1) Glossary / terminologie
- **Broker (obchodník):** partner, který přivádí investora (Broker 1) a/nebo projekt (Broker 2).
- **Developer:** subjekt, který nahrává projekty a vytváří tikety (nabídky dealů).
- **Investor:** kontakt brokera; v MVP nemá účet (podepisuje eSign).
- **Projekt:** nemovitostní záměr developera (metadata, média, dokumenty).
- **Tiket:** konkrétní investiční příležitost nad projektem (částka 20–100M CZK, parametry, platnost).
- **Rezervace:** proces přiřazení investora k tiketu včetně eSign balíku a SLA.
- **Maskování:** omezení citlivých dat do právního kroku (Souhlas + NDA investorem).

---

## 2) Role, účty a oprávnění (MVP)
### 2.1 Admin
- Schvaluje broker/developer účty (pilot gating).
- Nastavuje globální parametry (Capacity_N, SLA, provize), řeší incidenty/spory.
- Má přístup k audit logům a override akcím.

### 2.2 Broker (obchodník)
- Prohlíží tikety (Marketplace), pracuje s matchingem a posílá eSign investorovi.
- Vidí projekt v režimu maskování (teaser) do podpisu Souhlasu + NDA.
- Spravuje své investory (kontakty) a může je použít v rezervaci.

### 2.3 Developer organizace (multi‑user — must‑have)
**Role:** Owner / Member / Finance
- Owner: vše + správa uživatelů a payoutů/exportů.
- Member: projekty, tikety, rezervace (operativa).
- Finance: payout/export, faktury, read‑only do tiketů/rezervací.

---

## 3) Klíčové entity a state machine (souhrn)
> Detailní datový model je v DATA dokumentu; zde uvádíme UX‑relevantní část.

### 3.1 Tiket — stavy (MVP)
- `draft` → `published` → `active` → (`reserved` | `expired` | `closed`)
- Tiket má: částku (20–100M), typ, LTV, platnost (default 90 dní), kapacitu N, provizi 5 %.

### 3.2 Rezervace — stavy (MVP)
- `draft` (rozpracovaná rezervace — uložená, aby se k ní broker mohl vrátit; může být lokální i uložená na serveru)
- `sent_to_investor` (odesláno eSign)  
- `investor_consent_nda_signed` (odemknutí identit + audit)  
- `investor_reservation_signed` (čeká na developera)  
- `developer_signed` (rezervace aktivní)  
- Koncové stavy: `declined_by_developer`, `expired_sla`, `cancelled_admin`

### 3.3 SLA (final)
- **1 sjednocená lhůta investora**: výchozí **48 hodin** na dokončení podpisu **celého eSign balíku** (Souhlas + NDA + Rezervační smlouva).
- Developer podpis: výchozí **48 hodin** (konfigurovatelné).

### 3.4 Maskování (final)
- Před `investor_consent_nda_signed`:
  - identita developera/investora skrytá,
  - citlivá data projektu skrytá,
  - **média projektu (cover + galerie)** jsou zobrazená teaserově (např. blur/overlay), aby karta i detail měly vizuální obsah bez odkrytí identity.
- Po `investor_consent_nda_signed`:
  - broker vidí plný detail projektu,
  - developer vidí identitu investora + audit introdukce.

---

## 4) Globální UX patterny
### 4.1 Navigace (UX pravidlo)
- Oddělené oblasti pro role: `/broker/*`, `/developer/*`, `/admin/*`.
- Vždy musí být jasné: **kde jsem**, jak se vrátím na seznam, a jak se dostanu k detailu.

### 4.2 Seznamy: tabulka vs. karty
- Marketplace „Tikety“: **karty** (primární), protože obsahuje média + rychlé CTA.
- Administrace a rezervace: převážně **tabulky** (filtry, export, rychlé skeny).

### 4.3 Vyhledávání a filtry (MVP)
- Globální search na stránce (např. název/ID, region, stav).
- Filtry musí být „sticky“ (zachovat při návratu z detailu).

### 4.4 Notifikace
- In‑app centrum notifikací pro broker/developer/admin.
- E‑mail notifikace pro broker/developer pro SLA a stavy.
- Investor: pouze eSign e‑maily (link, reminder, potvrzení).

### 4.5 Audit a compliance
- Každá rezervace má auditní stopu: kdo kdy poslal eSign, kdy byl podepsán Souhlas+NDA, kdy se odemkly identity, kdo podepsal.
- Admin má možnost exportovat audit (PDF/CSV) (MVP: CSV).

---

## 5) Broker — obrazovky a chování (MVP)
> Struktura a URL jsou v sitemapě brokera; zde specifikujeme obsah a akce.

### 5.1 Broker Dashboard
**Účel:** rychlý přehled: aktivní rezervace, SLA rizika, nové tikety.  
**Obsah (min):**
- „Moje aktivní rezervace“ (stav, deadline, akce „otevřít“)
- „Nové tikety“ (poslední 5)  
- „Upozornění“ (SLA < 12h, developer decline, expirace tiketu)

### 5.2 Tikety (Marketplace — seznam)
**Účel:** procházet nabídku a rychle rezervovat investorem.  
**Karta tiketu (kritické):**
- vlevo: **cover** (teaser blur/overlay v masku; hover ztmavení + text „Zobrazit detail“)
- střed: název (mask/unmask), **typ projektu**, **tagy** (pokud existují), částka, region/lokalita, LTV, platnost do, badge stav
- vpravo: CTA **Rezervovat** (otevře modal Rezervace 1/2), sekundárně „Matching“
**Interakce:**
- Klik na kartu → **Tiket detail**
- Klik na „Rezervovat“ → **Rezervace (2 kroky)** bez vstupu do detailu
- Volitelně: akce **„Sledovat“ (hlídací pes)** — broker si označí tiket/projekt a dostává e‑maily při změně (nový tiket, změna stavu, blížící se expirace, změna kapacity, developer decline apod.).
- UI: ikonka „sledování“ na kartě + stránka „Sledované“ (watchlist) v navigaci brokera.

**Empty states:**
- bez tiketů: vysvětlit, že nabídka se plní, CTA na podporu.

### 5.3 Tiket detail
**Účel:** plný kontext tiketu/projektu + galerie + dokumenty + akce.  
**Obsah:**
- Hero: **cover + galerie náhledů** (klik na náhled mění hlavní obrázek; šipky pro posun; bez samostatného modálu/lightboxu)
- KPI: částka, LTV, region/adresa (dle masku), platnost, kapacita N, provize (informativně)
- Sekce: O projektu / O tiketu / Dokumenty / **Matching investoři (včetně komentáře admina + odkazu na zpracovatele posudku, pokud existuje)** / Audit
- V sekci „O projektu“ zobrazit (pokud existuje): **tagy**, **typ projektu**, **součet provizí napříč všemi tikety projektu** a **% breakdown využití prostředků**.
**Akce:**
- Primární: Rezervovat
- Sekundární: Otevřít matching, Nahlásit problém

### 5.4 Rezervace — modal (2 kroky, final)
**Krok 1/2: Vybrat investora**
- Seznam investorů brokera (search + rychlé filtry: „nejčastěji používaní“, „poslední“, „nový investor“)
- Musí existovat volba **„Vytvořit nového investora“** přímo v modálu (inline formulář: jméno/název, typ FO/Firma, e‑mail, telefon vol., poznámka). Po uložení se investor automaticky vybere pro rezervaci.
- Mini‑summary tiketu vpravo (cover mini, částka, region, LTV)
- CTA: Další (disabled bez investora)

**Krok 2/2: Zkontrolovat a odeslat eSign**
- Shrnutí investora + tiketu
- Informace o SLA: „Investor má 48 hodin na dokončení podpisu.“
- CTA: **Uložit jako draft** (vrátit se později) a **Odeslat eSign**
- Uložený draft se objeví v seznamu „Moje rezervace“ se stavem `draft` a broker se k němu může kdykoli vrátit a eSign odeslat.
- Výsledek: vytvořit rezervaci, poslat investorovi 1 e‑mail s 1 signing session (3 dokumenty; **v eSign ve 2 krocích: Souhlas+NDA → Rezervační smlouva**), zobrazit toast + link na detail rezervace

### 5.5 Rezervace (seznam + detail)
- Seznam: stav, investor (mask/unmask dle fáze), tiket, deadline, poslední aktivita.
- Detail: timeline podpisů, audit, akce (znovu poslat eSign – admin/broker; zrušit – pouze admin).

---



### 5.6 Investoři (CRM brokera)
**Účel:** udržovat seznam investorů (kontaktů), které broker používá při rezervacích.  
**Obsah (MVP):**
- Tabulka: jméno/název, typ (FO/firma), e‑mail, telefon (vol.), poznámka, poslední aktivita, štítky.
- Akce: vytvořit investora, upravit, archivovat, import CSV (backlog), detekce duplicit (e‑mail).

### 5.7 Lead projects (projekty od developerů)
**Účel:** prohlížet projekty (v roli brokera), navrhovat deal, sledovat stav leadu.  
**Obsah:** seznam projektů, filtr (stav: nový / v jednání / odmítnutý / převedený na tiket), detail projektu (teaser + dokumenty dle pravidel).

### 5.8 Provize / Payout (broker)
**Účel:** přehled provizí podle rezervací/tiketů + export.  
**Obsah:** tabulka payoutů, stav vyplacení, částka, období, export CSV/PDF (MVP: CSV).

### 5.9 Pool (broker)
**Účel:** přehled interního poolu (pilot).  
**MVP:** pool je dostupný jako stránka s read‑only daty a jasným disclaimerem (interní). Konkrétní pravidla jsou v admin settings.

### 5.10 Nastavení a podpora
- Profil brokera (kontaktní údaje, firma, bankovní údaje pro payout).
- Notifikace (pref: e‑mail/in‑app).
- Podpora (kontakt + FAQ).

## 6) Developer — obrazovky a chování (MVP)
### 6.1 Developer Dashboard
- Přehled projektů/tiketů, rezervace čekající na podpis, SLA rizika.

### 6.2 Projekty (seznam + detail)
- Seznam: název, lokalita, status, počet tiketů.
- Detail projektu: metadata + média + dokumenty + seznam tiketů + **součet provizí napříč všemi tikety projektu** + (pokud existuje) **tagy** a **% breakdown využití prostředků**

### 6.3 Tikety (developer)
- Seznam: tikety nad projekty + stav + kapacita + rezervace.
- Detail tiketu: parametry, aktivní rezervace, historie, akce publish/unpublish (admin rules), export.

### 6.4 Rezervace (developer)
- Seznam: top N v kapacitě, stavy podpisů.
- Detail: investor (viditelný po Souhlas+NDA), dokumenty, akce:
  - Approve → podepsat (eSign) do 48h
  - Decline (důvod povinný) → notifikace brokerovi + audit

### 6.5 Organizace a uživatelé
- Správa členů (Owner), pozvánky e‑mailem, role assignment.

---



### 6.6 Payout / reporting (developer)
- Přehled rezervací podle období, stavů a brokerů.
- Export pro finance (CSV), základní fakturační podklady (backlog: plná fakturace).

### 6.7 Nastavení organizace
- Profil firmy, bankovní údaje, notifikace, přístupové role a bezpečnost (reset, 2FA backlog).

## 7) Admin — obrazovky a chování (MVP)
### 7.1 Schvalování uživatelů (broker/developer)
- Fronta žádostí: pending/needs_more_info/approved/rejected.
- Checklist, ověření firmy, poznámky, rozhodnutí.

### 7.2 Přehled tiketů/projektů
- Moderace: rychlá kontrola obsahu, duplicity, status.
- Možnost „freeze“ tiketu / projektu (incident).

### 7.3 Přehled rezervací
- Filtry, SLA rizika, export.
- Override: zrušit rezervaci, prodloužit SLA (audit povinný).

### 7.4 Nastavení (globální)
- Capacity_N (kolik rezervací najednou v kapacitě)
- SLA investor (48h default), SLA developer (48h default)
- Provize: total 5 % + split platform/broker1/broker2
- Feature flags (Founding partners, pilot kohorty)

---

## 8) Backlog (explicitně post‑MVP)
- Investor self‑account a přihlášení (portál investora)
- Vestavěný helpdesk (ticketing), chat, eskalace sporů
- Pokročilý matching (scoring, ML), doporučení investora
- Automatické KYC/AML integrace
- Multijazyk (EN)

---