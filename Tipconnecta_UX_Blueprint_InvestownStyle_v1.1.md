# Tipconnecta — UX Blueprint (Investown‑style) v1.1

> Tento dokument je praktický „UX blueprint“ pro návrh a implementaci aplikace Tipconnecta (interní web app) v čistém, minimalistickém a důvěryhodném vizuálním stylu inspirovaném investown (hodně whitespace, jasná hierarchie, primární modrá, karty, jednoduché filtry, minimální vizuální šum).

---

## 0) Kontext a cíle

**Co řešíme:** interní platformu Tipconnecta pro 3 role:
- **Broker / Obchodník** – přivádí investory a rezervuje „tikety“ (deal příležitosti) pro konkrétní investory.
- **Developer** – vytváří projekty/tikety, schvaluje rezervace a potvrzuje financování.
- **Admin** – schvaluje účty a projekty, spravuje platby/komise, řeší výjimky, audit.

**Zásadní UX téma:** „**maskování → odmaskování**“ (teaser informace vs. plný detail) + „**SLA časovače**“ (48h/30 dní/14 dní…) + auditovatelné ruční zásahy.

---

## 1) UX principy (Investown‑style přeneseno do Tipconnecta)

1. **Důvěra přes klid a jasnost**
   - jednoduchá terminologie, čitelné stavy, žádné skryté kroky
2. **Rychlost & přehled**
   - listy s filtry, vyhledávání, rychlé akce z řádku
3. **Kontrola**
   - jasně viditelné deadline (SLA), kdo je „na tahu“, co bude následovat
4. **Bezpečnost a audit**
   - u klíčových akcí: potvrzení, důvod, audit log, export
5. **Minimalismus**
   - jeden primární CTA per obrazovka/sekce, ostatní sekundární

---

## 2) Informační architektura (IA) – role based

### 2.1 Broker (Obchodník)
**Top nav (3–5 položek max):**
- Přehled
- Tikety (Marketplace)
- Rezervace
- Investoři
- Finance (provize, faktury)

**Nastavení (levý side‑menu – investown pattern):**
- Osobní údaje
- Dokumenty
- Notifikace
- Jazyk
- Změna hesla
- Dvoufaktorové ověření
- Podpora
- Odhlásit se

### 2.2 Developer
- Přehled
- Projekty
- Tikety
- Rezervace
- Finance

+ stejné Nastavení jako broker

### 2.3 Admin
- Přehled
- Schvalování (účty, projekty, tikety)
- Uživatelé
- Rezervace (disputy, výjimky)
- Finance (komise, platby, payout)
- Audit & Exporty
- Katalogy (důvody, šablony, SLA hodnoty, parametry)

---

## 3) Základní layout patterny (Investown)

### 3.1 Page template
- **Šířka kontejneru:** desktop max ~1200 px, zarovnání na střed
- **Layout:** 2 sloupce (Main 8/12 + Side 4/12) tam, kde to dává smysl
- **Header:** název stránky + krátký popis (volitelné), napravo „primární akce“ (CTA)

### 3.2 Listy a filtry
- „Pill“ filtry (segmented control) + počty
- Vyhledávací pole přes šířku listu
- Řádky jako karty (image/thumbnail vlevo, hlavní meta uprostřed, CTA vpravo)

### 3.3 Detail (Ticket / Rezervace / Investor)
- nahoře „stavový badge“ + SLA indikátor
- vpravo sticky side panel (shrnutí + primární akce)
- sekce: Základ → Dokumenty → Historie/Audit → Komunikace/poznámky

### 3.4 Modaly
- investown styl: čistý modal, velký nadpis, 1 primární CTA, sekundární texty pod tím
- u kritických akcí vždy „Důvod“ a potvrzení

---

## 4) Stavové systémy (nejdůležitější UX část)

### 4.1 Tiket – uživatelské stavy (Broker view)
- **Aktivní** (volné kapacity)
- **Omezený** (zbývá málo slotů – varovný badge)
- **Plný** (nelze rezervovat)
- **Pozastavený** (admin/developer)
- **Ukončený**

**V listu**: vždy vidět
- rating / typ / lokalita (dle dat)
- počet volných míst / kapacita
- „Rezervovat“ (disabled u plného)

### 4.2 Rezervace – „kdo je na tahu“ (Broker & Developer view)
Zjednodušené uživatelské stavy:
1. **Čeká na podpis Souhlasu + NDA (Investor)** – SLA 48h
2. **Čeká na podpis Rezervační smlouvy (Investor)** – SLA 48h
3. **Čeká na podpis (Developer)** – SLA 48h
4. **Aktivní rezervace (vyjednávání)** – SLA 30 dní
5. **Dokončeno** (financováno / provize řešeny)
6. **Zamítnuto / Expirace / Zrušeno** (s důvodem)

**UX pravidlo:** v každém stavu:
- kdo je na tahu (Investor / Developer / Admin / Broker)
- co se stane, když deadline vyprší
- jaký je další krok (CTA)

### 4.3 Maskování / odmaskování (teaser → full detail)
- před splněním podpisů investorů ukazovat **teaser data** (bez citlivých údajů)
- po podpisu (Souhlas + NDA) odmaskovat údaje dle pravidel a zobrazit „odmaskováno“ badge
- v detailu vždy zobrazovat „Co je skryté a proč“ (krátká věta)

---

## 5) Klíčové flow (MVP)

## Flow A: Broker — Rezervace tiketu pro investora
**A1: Výběr tiketu**
- Marketplace list: filtry + search
- Ticket detail: teaser data + CTA „Rezervovat pro investora“

**A2: Rezervační wizard (modal, max. 2 kroky)**
> Cíl: žádné přepínání stránek – vše v jednom modalu (investown „Investovat“ pattern).  
> Formulář vlevo, shrnutí tiketu vpravo, primární CTA dole (disabled dokud nejsou splněny podmínky).

Krok 1/2 — Investor
- vybrat existujícího investora (search + list)
- nebo rychle založit investora (inline / nested modal; nevede mimo flow)
- validace: minimálně jméno, e‑mail, telefon; pokud chybí povinné údaje pro podpis, zobrazit jasnou hlášku a CTA „Doplnit údaje“

Krok 2/2 — Parametry & potvrzení
- částka rezervace (validace min/max dle tiketu)
- expirace podpisu (default 48 h)
- poznámka pro developera / investora (volitelné)
- shrnutí v rámci stejného kroku: investor + tiket + částka + termíny + dokumenty k podpisu (Souhlas + NDA + rezervační smlouva)
- souhlasné checkboxy (pokud jsou potřeba)

Akce
- Primární CTA: **Odeslat k podpisu** → stav „Čeká na podpis…“
- Sekundární CTA (volitelně): **Uložit koncept** → stav „Rozpracováno“ (bez odeslání)

Po úspěchu
- modal se zavře + toast „Rezervace odeslána k podpisu“; v detailu rezervace se zobrazí countdown do expirace


**A3: Po odeslání**
- stav „Čeká na podpis…“ + countdown
- CTA: „Připomenout investorovi“ (email) + „Zrušit rezervaci“ (pokud pravidla dovolí)

**Edge cases**
- investor nepodepíše → expirace → slot se vrací
- investor podepíše, developer odmítne → „Zamítnuto“ + důvod

---

## Flow B: Developer — Schválení / podpis rezervace
**B1: Rezervace list**
- filtry: Nové / Čeká na podpis / Aktivní / Dokončené / Zamítnuté
- v řádku: investor, broker, částka, deadline, CTA „Otevřít“

**B2: Rezervace detail**
- dokumenty k nahlédnutí
- CTA: „Podepsat“ / „Zamítnout“ (vyžaduje důvod z katalogu)
- po podpisu přechod na „Aktivní rezervace (vyjednávání)“

---

## Flow C: Developer — Potvrzení financování
- v detailu rezervace sekce „Financování“
- formulář: datum připsání, finální částka, poznámka, upload důkazu
- po uložení se vytvoří událost „Potvrzeno financování“ a spouští se finanční kroky (komise/invoice)

**Admin korekce**
- pokud admin upraví datum/částku → povinný důvod + audit log + notifikace účastníkům

---

## Flow D: Admin — Platby & provize (high‑level)
- Evidence faktur od developerů (komise)
- ruční potvrzení přijetí platby
- generování payout pro brokery (a evidence broker faktur)
- audit a export (CSV/PDF)

---

## 6) Obrazovky (MVP backlog pro Figma)

### 6.1 Společné
- Login + reset hesla
- Přehled (dashboard)
- Nastavení (profil, docs, notifikace, jazyk, heslo, 2FA, podpora)

### 6.2 Broker
- Tikety list (marketplace)
- Tiket detail
- **Rezervační modal (2 kroky)**
- Rezervace list
- Rezervace detail (stavová timeline + dokumenty + audit)
- Investoři list
- Investor detail
- Finance: Přehled provizí + Faktury + Výplaty

### 6.3 Developer
- Projekty list + detail
- Tikety list + detail + vytvoření tiketu
- Rezervace list + detail + schválení
- Finance: Komise + faktury + platby

### 6.4 Admin
- Schvalování (uživatelé/projekty/tikety)
- Finance centrum
- Audit log
- Katalogy & nastavení SLA / šablony

---

## 7) Mikrocopy (CZE) – vzory

### Statusy
- „Čeká na podpis investora (Souhlas + NDA). Zbývá: 36 h.“
- „Čeká na podpis developera. Zbývá: 12 h.“
- „Rezervace aktivní. Vyjednávání běží do: 12. 2. 2026.“

### CTA
- Primární: „Rezervovat“, „Podepsat“, „Potvrdit financování“
- Sekundární: „Zamítnout“, „Zrušit“, „Zaslat připomínku“

### Error / warning
- „Tiket je plný. Zkuste jiný tiket nebo si nastavte upozornění.“
- „Vypršela lhůta pro podpis. Rezervace byla automaticky zrušena.“

---

## 8) Přenos do Figmy (doporučená struktura)
- **00 Foundations** (tokens, barvy, typografie, grid)
- **01 Components** (atoms → molecules → organisms)
- **02 Patterns** (List page, Detail page, Wizard, Settings)
- **03 Wireframes** (MVP flows A–D)
- **04 Screens** (hi‑fi návrhy)
- **05 Prototypes** (klíčové scénáře)

---

## 9) Co je „hotovo“ pro UX fázi
Až budou v Figmě hotové wireframy a navazující hi‑fi pro Flow A–C (Broker rezervace + Developer schválení + Financování), budeme mít UX páteř produktu.

## 10) Changelog
- v1.1 (2026-01-23): Rezervační wizard převeden do 2‑krokového modalu; shrnutí je součástí kroku 2/2.
