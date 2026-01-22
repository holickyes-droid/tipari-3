# Tipconnecta — UX/UI Zadávací dokumentace (MVP) v1.0
*(specifikace pro návrh ve Figmě a následný vývoj; bez kódování)*

**Datum:** 2026-01-22  
**Aplikace:** za loginem, responzivní desktop  
**Zdrojová data:**  
- Tipari_Souhrn_Dat_DATA_FINAL_CLEAN_v1.0.md  
- Tipconnecta_Strategicky_Marketingovy_Deck_v1.md  
- Tipari_persona_obchodnik_partner_20m.md  

---

## 0) Shrnutí zadání (max 8 vět)
Tipconnecta je B2B platforma, která propojuje brokery a developery přes projekty, tikety a řízený rezervační proces. Investor nemá účet v aplikaci; podpisy probíhají e‑mailem/eSign. Základní důvěryhodnost stojí na maskování/odemykání identit, auditní stopě a SLA lhůtách. Obchodník iniciuje rezervaci a zadává investora; po podpisu dokumentů a aktivaci se odemkne identita a běží jednání. Po profinancování developer potvrdí datum a částku; systém následně řeší výpočet provizí a fakturační podklady. Admin schvaluje účty, publikuje tikety, nastavuje kapacity a provádí override s auditní stopou. MVP musí být „process-first“: vždy jasné, kdo je na tahu, do kdy, a co se stane při expiračních stavech.

---

## 1) Klíčové principy produktu (UX)
1. **Procesní jistota**: stav + deadline + další krok je všude „nad foldem“.
2. **Ochrana vztahů**: identita investora a obchodníka se odemyká až po splnění podmínek.
3. **Audit & dohledatelnost**: všechny citlivé změny a klíčové události logovat.
4. **Bez investičního poradenství**: komunikujeme proces, ne „výnosy“ či doporučení.
5. **MVP-first, ale rozšiřitelné**: všechny entity mají stavy a historii.

---

## 2) Terminologie (glosář)
- **Projekt**: developerský záměr (obvykle vlastní developer; může vzniknout jako lead od obchodníka před zasmluvněním developera).
- **Tiket**: konkrétní nabídka financování/profinancování (částka, parametry, odměna brokera).
- **Rezervace**: řízený proces introdukce investora k tiketu (podpisy, aktivace, jednání).
- **Investor**: osoba/firma vedená v záznamu, bez přístupu do aplikace.
- **SLA**: lhůty pro podpisy a jednání.
- **Sloty**: limit aktivních rezervací na obchodníka dle úrovně.
- **Kapacita tiketu**: limit aktivních rezervací na konkrétním tiketu (N).
- **Provize**: odměna za profinancování; počítá se ze skutečně profinancované částky (základ v Kč bez DPH).

---

## 3) Role a oprávnění (MVP)
### Role
- **Obchodník (Broker)**: prohlíží tikety, zakládá rezervace, zadává investora, sleduje stav, řeší fakturaci své části provize.
- **Developer**: vytváří projekty/tikety (nebo přebírá lead), rozhoduje o rezervacích, podepisuje, potvrzuje profinancování, přijímá faktury platformy.
- **Admin** (1 osoba): schvaluje účty, publikuje tikety, nastavuje kapacity/SLA/úrovně slotů, potvrzuje platby, řeší override + audit.

### Oprávnění (high-level)
- Investor nikdy nevidí aplikaci; komunikuje přes e‑mail/eSign.
- Obchodník v teaser režimu nevidí citlivé dokumenty ani identitu developera/investora, pokud není splněna podmínka unlocku (viz pravidla).
- Developer nevidí identitu investora/brokera do doby, než investor podepíše Souhlas+NDA (unlock).

---

## 4) Datový model — minimální seznam entit (MVP)
- Uživatel, Firma (broker/developer), Projekt, Tiket, Rezervace, Investor, Dokument, Audit log, Notifikace.
- Finance: Provizní případ, Faktura (platforma→developer, obchodník→platforma), Platební událost, Pool období/příspěvek.

---

## 5) EPIC roadmap (pro UX/UI zadání)
> Tento dokument budeme plnit postupně. Níže je návrh EPIC struktury pro kompletní zadání.

1. **EPIC 1 — Základy: přístup, onboarding, profily, oprávnění**
2. **EPIC 2 — Tikety: tvorba, validace, schválení a publikace (supply)**
3. **EPIC 3 — Marketplace: listování tiketů, detail, teaser/unlock (demand)**
4. **EPIC 4 — Rezervace & eSign orchestrace: kroky, SLA, notifikace**
5. **EPIC 5 — Jednání: aktivní rezervace, expirace, „rezervováno“, dokumenty**
6. **EPIC 6 — Financování & provize: potvrzení financování, výpočty, fakturace, payout**
7. **EPIC 7 — Admin console: schvalování, kapacity, override, audit, dispute**
8. **EPIC 8 — Reporting & analytics: KPI, eventy, dashboard**
9. **EPIC 9 — Design system & UI kit (desktop): komponenty, stavy, copy systém**

---


## 6) Backlog úkolů pro kompletní UX/UI zadávací dokumentaci
*(co musíme mít vypracované, aby šlo UX/UI zadání předat designérovi a vývoji)*

### 6.1 Průřezové úkoly (platí pro celý produkt)
1. **Zafixovat terminologii a pravidla komunikace** (rezervace vs investice; zákaz „výnosových slibů“; jednotné názvy stavů).
2. **Role & permissions matrix** (Broker/Developer/Admin) – akce × obrazovky × viditelnost dat (včetně teaser/unlock).
3. **Sitemap + navigační koncept (desktop)** + pravidla orientace (breadcrumbs, „Aktuální krok“, filtry).
4. **Design & copy standardy** (navázat na brand manuál: tonalita, CTA slovník, systémové hlášky, formát částek/DPH).
5. **Datové požadavky na backend** (pro každou obrazovku: potřebná pole, stavy, oprávnění, audit, výpočty).
6. **Katalog notifikací** (in‑app/e‑mail) + preference + šablony (včetně SLA reminderů).
7. **Tracking plan**: funnel KPI + eventy pro stavy a přechody (rezervace/podpisy/financování/provize).
8. **Edge‑case knihovna**: expirace SLA, zamítnutí, zrušení, spor, override adminem, „vyhrál jiný investor“.

### 6.2 EPIC‑based úkoly (co musí být popsáno a navrženo)
#### EPIC 1 — Základy: přístup, onboarding, profily, oprávnění
- Obrazovky: Signup, Login, Reset hesla, Awaiting approval, Dashboard (empty state), Profil Broker/Developer, Nastavení, Podpora.
- Validace: povinná pole (IČO, DIČ, bankovní účet…), pravidla změn + audit.
- Admin proces: schválení/odmítnutí účtu (důvod, komunikace).

#### EPIC 2 — Tikety: tvorba, validace, schválení a publikace
- Formuláře: Projekt + Tiket (včetně dokumentů a teaser).
- „Ticket readiness“ pravidla: co je nutné pro publikaci, co blokuje, co je doporučené.
- Admin review queue: schválit/publikovat/vrátit k doplnění; verze dokumentů.

#### EPIC 3 — Marketplace: listování, detail, teaser/unlock
- List tiketů: filtrování, řazení, „watched/uložené“ (pokud v MVP).
- Detail tiketu (teaser vs full): co je vidět před unlockem / po unlocku.
- CTA: „Zahájit rezervaci“ + komunikace slotů/kapacity.

#### EPIC 4 — Rezervace & eSign orchestrace (SLA)
- Wizard/flow založení rezervace + vytvoření investora (bez účtu).
- Stavy rezervace + timeline (čeká na podpis investora → čeká na podpis developera → aktivní…).
- SLA: expirace, reminder, ruční override adminem.
- „Odmaskování“ identit po splnění podmínek.

#### EPIC 5 — Jednání: aktivní rezervace, expirace, „rezervováno“
- Timeline jednání (30 dní) + průběžné logy (minimálně události, ne chat).
- Možnost „rezervováno“ (pokud používáme jako mezistav) a její pravidla.
- Expirace rezervace, uvolnění kapacity, zobrazení dopadů brokerovi i developerovi.

#### EPIC 6 — Financování & provize
- „Potvrdit profinancování“: datum přijetí, částka, proof/poznámka.
- Výpočet provize (základ bez DPH) + přehled podílů.
- Vystavení/uložení faktury platformy developerovi (PDF), splatnost, upomínky.
- Podklady pro fakturaci brokerů + workflow „faktura přijata / vyplaceno“.

#### EPIC 7 — Admin console: operace, override, audit, spory
- Queue: účty ke schválení, tikety ke schválení, rezervace v SLA riziku.
- Nastavení: slot level (Partner/Premium/Elite), ticket capacity, SLA, splatnosti, payout lhůty.
- Audit log (čitelné, filtrovatelné) + poznámky k override.

#### EPIC 8 — Reporting & analytics
- KPI dashboard pro admina: aktivní rezervace, expirace, konverze podpisů, financování, provize, doba do podpisu.
- KPI pro brokera: pipeline (vytvořené rezervace, aktivní, vyhrané/zkrachované), provize.
- Exporty: CSV pro účetnictví / reporting (MVP manuální export).

#### EPIC 9 — Design system & UI kit (desktop)
- Tokeny: barvy, typografie, spacing, elevation.
- Komponenty: button, input, select, table, card, badge, timeline, modal, toast, empty/error states.
- Stavy: loading/empty/error/success/disabled; systémové hlášky.

---

# EPIC 1 — Základy: přístup, onboarding, profily, oprávnění
- UX flow self‑signup + admin approval (happy path + zamítnutí + pozastavení).
- Specifikace profilů (Broker/Developer) včetně validací, citlivých změn a audit trail.
- Návrh správy uživatelů v rámci developera (Owner/Member) + pozvánky.

#### EPIC 2 — Tikety: tvorba, validace, schválení a publikace
- Formulář projektu + tiketu (povinné vs volitelné), „readiness“ checklist.
- Admin review queue: schválit / vrátit k doplnění / zamítnout / publikovat / depublikovat.
- Pravidla publikace: 90denní okno, interní režim, expirace.

#### EPIC 3 — Marketplace: list, detail, teaser/unlock
- Ticket list (karty) + filtry + řazení + prázdné stavy.
- Detail tiketu ve 2 režimech: **teaser** vs **odemčeno**.
- Pravidla maskování: co je vidět kdy a komu.

#### EPIC 4 — Rezervace & eSign orchestrace
- Flow založení rezervace (broker) + zadání investora.
- SLA a stavy podpisů (investor + developer) + expirace + automatické akce.
- Template management dokumentů (NDA, Souhlas, Rezervační smlouva) + verzování + audit.

#### EPIC 5 — Jednání a životní cyklus rezervace
- Timeline „na tahu“ (kdo/co/do kdy) pro aktivní rezervaci.
- Stav „rezervováno“ a expirace po 30 dnech (a možnosti prodloužení/override).
- Pravidla pro práci s dokumenty před/po aktivaci.

#### EPIC 6 — Financování & provize
- UX pro potvrzení financování (developer/admin) včetně „proof“ a validací.
- Výpočty provizí + prezentace částek v Kč bez DPH.
- Fakturační workflow: platforma→developer, obchodník→platforma, payout.
- Pool program: zobrazení kvalifikace a historie.

#### EPIC 7 — Admin console & audit
- Správa uživatelů, schvalování, úrovně slotů.
- Správa tiketů: kapacity, SLA, override.
- Správa plateb: potvrzení úhrady, párování, spory.
- Audit log viewer (filtrování, export).

#### EPIC 8 — Reporting & analytics
- KPI tree (North star → leading).
- Dashboard pro admina (stav funnelu, bottlenecky, SLA breaches).
- Exporty (CSV) pro finance a reporting.

#### EPIC 9 — Design system & UI kit (desktop)
- Tokeny (barvy, typografie, spacing), komponenty, stavy.
- Patterny: timeline, badge stavy, modaly, tabulky, formuláře.

---

# EPIC 1 — Základy: přístup, onboarding, profily, oprávnění

## 1.1 Cíl EPICu
- Umožnit self‑signup pro brokera a developera.
- Zajistit admin approval (účty jsou aktivní až po schválení).
- Zavést profily jako „smluvní a účetní identitu“ pro fakturaci a payout.
- Nastavit základní oprávnění a auditní stopu.

## 1.2 MVP rozhodnutí (závazné)
- Aplikace je pouze v **CZ**.
- Investor nemá účet; podpisy a komunikace probíhá e‑mailem/eSign.
- Jeden admin (interní).
- Pro brokera existují úrovně (Partner/Premium/Elite) a sloty (mění admin).

## 1.3 Onboarding — kroky a stavy
### Stav účtu
- **Rozpracováno** → **Čeká na schválení** → **Schváleno** / **Zamítnuto** / **Pozastaveno**

### Self‑signup flow (společné principy)
1) registrace e‑mail + heslo  
2) výběr role: Broker / Developer  
3) vyplnění firemní identity + kontaktní osoby  
4) odeslání žádosti o přístup  
5) admin schválí / zamítne (s důvodem)

## 1.4 Profil Brokera (sekce)
- Identifikace subjektu (OSVČ / právnická osoba), IČO/DIČ, sídlo, kontaktní osoba.
- Fakturační údaje: fakturační adresa, e‑mail pro fakturaci, plátce DPH ano/ne, bankovní účet (CZK).
- Úroveň a kapacity: Partner/Premium/Elite, počet slotů (read‑only), využití.
- Provize: historie nároků, stav fakturace (čeká na fakturu / přijata / vyplaceno).
- Pool: aktuální období, kvalifikace, historie.

## 1.5 Profil Developera (sekce)
- Identifikace firmy: název, IČO/DIČ, sídlo, kontaktní osoby.
- Fakturace: fakturační adresa, e‑mail, nastavení DPH režimu pro faktury platformy, historie faktur (PDF).
- Nastavení: notifikace, uživatelé v organizaci (viz 1.6).

## 1.6 Více uživatelů u developera (doporučené MVP řešení)
- 1× **Owner** (vzniká při registraci) + možnost pozvat další uživatele do organizace (role **Member**).
- Owner spravuje: pozvánky, deaktivace uživatele.
- Admin má možnost převzít správu (support) a provést override.

*(Pozn.: pokud bude potřeba MVP zjednodušit, lze první verzi spustit s 1 uživatelem na organizaci a pozvánky přidat v EPIC 7.)*

## 1.7 Audit a bezpečnost (EPIC 1 baseline)
- Každá změna profilu (IČO/DIČ, bankovní účet, fakturační identita) je auditovaná.
- Doporučení: citlivé změny vyžadují schválení adminem.

---

## 1.8 Výstupy EPIC 1 (co musí vzniknout v UX/UI zadání)
- Sitemap (minimálně: Login, Signup, Awaiting approval, Dashboard, Profil, Nastavení, Podpora).
- Detailní flow a edge cases: schválení, zamítnutí, reset hesla, pozastavení.
- Seznam obrazovek EPIC 1 + obsah (copy) + validace.
- Definice prázdných stavů (nový účet bez tiketů/rezer.) a chybových stavů.

