# Tipari.cz – Kanonický souhrn dat a pravidel (verze 1.0 – uzamčeno)

**Stav dokumentu:** **DATA UZAMČENA (verze 1.0)**. Tento soubor je kanonický zdroj pravdy pro implementaci dat a business logiky.

> Poznámka: Sekce UX/UI jsou v dokumentu ponechané jako kostra pro další fázi, ale **nejsou součástí uzamčeného milníku 1.0 – data**.

**Verze:** 1.0 (data – uzamčeno)

**Datum uzamčení:** 2026-01-19

**Navazuje na:** interní pracovní revizi 6.0 (živý dokument)

## Osnova

### Souhrn dat
- 0. Jak s dokumentem pracovat
- 1. Shrnutí pro vedení
- 2. Projektový rozsah
- 3. Role a zainteresované strany
- 4. Klíčové toky
- 5. Externí závislosti
- 6. Omezení a předpoklady
- 7. Datové entity
- 8. Kanonické seznamy povolených hodnot
- 10. Business logika (kanonické rozhodnutí)
- 11. Zjištěné duplicity a nesoulady (a návrh řešení)
- 12. Datový slovník (MVP, bez technických kódů)
- 15. Pravidla publikace a blokátory dat
- 16. Audit a incident management (Milník 5 – uzavřen)
- 17. Administrace a nastavení
- 18. Matching investorů (specifikace bez kódu)
- 19. Dokumenty, smlouvy a elektronické podpisy
- 20. Otevřené otázky a rozhodnutí k potvrzení
- 21. Stavové automaty a automatizace
- 22. Exporty dat (Milník 6 – uzavřen)
- Příloha A: Doporučení pro udržování dokumentace (inspirace z veřejných zdrojů)
- Příloha D: Právní rámec a minimalizace rizik
- Příloha E: Nesrovnalosti v podkladech a naše kanonické rozhodnutí
- Příloha F: Témata pro další doplnění (aby byl systém plně předatelný)
- Příloha H: Doporučené pokračování práce (priorita pro předání týmu)

### UX část
- 14. Notifikace (MVP)
- Příloha G: UX a uživatelské rozhraní – detailní specifikace (MVP)
- G.1 Zásady uživatelské zkušenosti
- G.2 Informační architektura (navigace)
- G.7 Maskování a odkrytí identit v uživatelském rozhraní
- G.8 Zobrazení kapacity a pořadí rezervací
- G.9 Minimální standard přístupnosti a použitelnosti
- G.10 Otevřená UX rozhodnutí (návrhy)

### UI část
- 9. Formuláře a vstupní data (bez technických kódů)
- 13. Matice viditelnosti a oprávnění (MVP)
- Příloha B: Uživatelské rozhraní – hierarchie informací a rozhodovací údaje
- Příloha C: Administrátorské rozhraní – navigace, seznamy, sloupce, filtry, akce
- G.3 Základní komponenty a datové bloky
- G.4 Obrazovky – obchodník (broker)
- G.5 Obrazovky – developer
- G.6 Obrazovky – administrátor
- Příloha I: Registry formulářů (MVP – pro implementaci databáze i uživatelského rozhraní)

## Souhrn dat

### 0. Jak s dokumentem pracovat

Tento soubor je **jediný kanonický „souhrn dat“** pro:
- programátora (co má vzniknout v systému: data, vazby, pravidla)
- návrháře uživatelského rozhraní (jaká data se sbírají a kde se zobrazují)

Cíl:
- odstranit duplicity a rozpory mezi podklady
- převést „chaotické“ výčty do jedné logické struktury
- připravit přehledné seznamy povolených hodnot (seznamy povolených hodnot)
- popsat business logiku tak, aby byla proveditelná v systému

#### 0.1 Co v dokumentu záměrně zatím není
- technické názvy polí a strojové klíče
- návrh databázového schématu
- návrh konkrétních koncových bodů aplikačního programového rozhraní

Tyto části doplníme až ve chvíli, kdy budou data stabilní.

#### 0.2 Hlavní zdroje, ze kterých byla data sjednocena

- **Primární zdroj pravdy:** tento soubor (Kanonický souhrn dat, UX a UI). Všechny další podklady níže jsou pouze referenční/archivní a nesmí přepisovat „kanonická rozhodnutí“ uvedená v kapitolách 8–21.
- **Zadání projektu do systému.docx** (pole projektu a tiketu + role ve schvalování)
- **Registrace obchodník developer.docx** (registrace + členění polí + co je mimo scope UX)
- **Vstupní data o investorovi.docx** (evidence investora + preference pro matching + kdo je zdroj pravdy)
- **Formy financování vs zajištění.docx** (obchodní klasifikace financování + rozdíl ručení vs zajištění)
- **Formy investice.docx** (doporučení pro UX klasifikaci + compliance „co sem nepatří“)
- **Formy zajištění.docx** (katalog zajištění + doporučení pro UI zobrazení)
- **Znalecký posudek.docx** (pravidla ocenění, zdroje hodnoty, LTV a právní texty)
- **Využití prostředků.docx** (kanonický procentuální rozpad + validace součtu)
- **Rozdělení provize.docx** (provizní pravidla + admin-only workflow + verzování)
- **Brand a produktová identita.docx** (brandové ukotvení: levely, sloty, pravidla zobrazení, „provize v Kč“)
- **Nastavení admin.docx** (admin pohled: finance, spory, audit a „override = audit“)
- **Tabulka práva a viditelnosti.docx** (referenční pro maskování identity; obsahuje roli investora jako UI uživatele – to je nyní neplatné)
- **Kanonický domain dictionary.docx** (referenční slovník; obsahuje rozpory s novějšími podklady – viz kapitola 11)


#### 0.3 Terminologie a zkratky

V dokumentu se vyskytují některé zkratky – aby nevznikaly nejasnosti, používáme je takto:

- **Uživatelské rozhraní (UI)**: obrazovky a ovládací prvky, které uživatelé vidí a používají.
- **Uživatelský zážitek (UX)**: jak snadno a pochopitelně uživatelé systémem projdou (toky, přehlednost, chybové stavy).
- **Časové lhůty (SLA)**: doby, do kdy se musí stát určitý krok (např. podpis smlouvy). Vždy nastavitelné administrátorem.
- **Ochrana osobních údajů (GDPR)**: povinnosti a souhlasy se zpracováním osobních údajů.
- **Mezinárodní číslo účtu (IBAN)**: formát pro bankovní účet (použijeme, pokud bude výplata probíhat převodem).
- **Poměr dluhu k hodnotě zajištění (LTV)**: ukazatel rizika u zajištěného financování.
- **Minimální první verze (MVP)**: funkční základ, který umožní provoz (zbytek rozšiřujeme postupně).
- **AML/KYC**: procesy proti praní špinavých peněz a ověření klienta. V této verzi platformy se **neimplementuje zákonný proces AML/KYC vůči investorům** (investor je mimo platformu). U obchodníků a developerů probíhá **interní administrativní schválení účtu** (kontrola údajů / smluvní dokumentace), nikoliv plnohodnotné AML/KYC.


---


#### 0.4 Změnový log (revize 6.0 → 1.0 – data)

- Dokument je **uzamčený jako verze 1.0 – data** (tj. kanonická data a pravidla jsou připravená pro implementaci).
- Provedena **konsistenční kontrola**: jednotné názvy stavů, jednotné číselníky, vazby entit odpovídají popsaným tokům.
- Přidán **1‑stránkový přehled implementace (iterace 1)** – aby bylo jasné, co postavit jako první.

#### 0.5 Přehled implementace – iterace 1 (databáze + stavy + základní formuláře)

Cíl první iterace je zprovoznit „end‑to‑end“ proces od publikace tiketu až po uzavření profinancováním a následné finanční vypořádání – **bez bankovní integrace** (ruční potvrzení v systému).

**A) Datové entity (minimální sada)**
- Uživatelský účet + role (administrátor, obchodník, developer)
- Profil obchodníka (včetně levelu Partner / Premium / Elite a slotů)
- Profil developera
- Investor (interní evidence obchodníka; investor není přihlášený uživatel)
- Projekt (hlavička) + Tiket (konkrétní investiční příležitost / „tranše“)
- Dokument projektu (přílohy a verzování)
- Rezervace (včetně pořadí ve frontě, příznaku „v kapacitě“ a stavového automatu)
- Rezervační smlouva (elektronický podpis / fyzický podpis + nahraný scan)
- Potvrzení profinancování (zadává developer: datum přijetí + částka + podklady)
- Provize platformy (vzniká po profinancování) + faktura platforma → developer
- Příjem provize na účet platformy (ručně potvrzuje administrátor)
- Rozdělení provize (platforma / obchodník 1 / obchodník 2) + faktura obchodník → platforma
- Pool (období, příspěvek, obraty, výpočet výherců, výplata)
- Auditní záznam (stavové změny, manuální zásahy, změny částek, změny parametrů)

**B) Stavové automaty, které musí fungovat od začátku**
- Tiket: koncept → čeká na schválení → zveřejněný → (skrytý / expirovaný) → uzavřený (profinancovaný)
  + ruční znovuotevření administrátorem
- Rezervace: koncept → čeká na podpis investora → podepsáno investorem (v pořadí) → (v kapacitě / mimo kapacitu) → čeká na podpis developera → aktivní → jednání → profinancováno → uzavřeno
  + automatické zániky (vypršení lhůt, odmítnutí podpisu, uzavření tiketu jiným investorem)

**C) Minimální administrace (nutné pro provoz)**
- Schválení a publikace projektu/tiketu (včetně nastavení: publikační okno, kapacita rezervací, časové lhůty podpisů a jednání)
- Ruční změny stavů + auditní důvod
- Ruční potvrzení příjmu provize platformou (spouští výplaty a obrat do poolu)
- Přehled faktur (platforma ↔ developer; obchodník ↔ platforma), stavy uhrazení, přílohy
- Exports (CSV/XLSX) pro účetnictví a reporting

**D) Základní formuláře (datové registry)**
- Registrace obchodníka a registrace developera (dle kap. 9 + příloha I)
- Zadání projektu a tiketu (dle kap. 9 + datový slovník)
- Evidence investora (interní databáze obchodníka)
- Vytvoření rezervace a workflow podpisů (elektronicky i fyzicky se scanem)
- Potvrzení profinancování developerem (datum/částka/podklady) + možnost administrátorské opravy s auditní stopou

Poznámka: Texty notifikací a detailní UX/UI řešíme až v následném milníku, ale události (kdy a komu se posílá informace) musí být v iteraci 1 technicky připravené.


### 1. Shrnutí pro vedení

#### 1.1 Účel a mise
Tipari.cz je platforma pro **zprostředkování investičních příležitostí mezi firmami** (obchodníci přivádějí investory, developeři přidávají projekty). Klíčovým prvkem je řízený tok rezervace a následného jednání – tak, aby:
- obchodník věděl, co má dělat a kdy
- developer viděl jen relevantní informace ve správný čas
- platforma měla kontrolu nad pravidly, časovými limity a provizemi

#### 1.2 Hodnota pro uživatele (hlavní přínosy)

- **Obchodník (tipař/broker):** vidí atraktivní B2B projekty bez toho, aby platforma odhalila identitu projektu a developera před aktivací rezervace. Může rychle rezervovat slot pro svého investora a mít jasné lhůty, auditní stopu a spravedlivé vypořádání.
- **Developer:** získá přístup k distribuční síti obchodníků, ale identita investora se mu odemkne až po podpisu rezervační smlouvy oběma stranami. Tím je doloženo, že investor byl představen přes platformu.
- **Platforma (administrátor):** správa pravidel a parametrů (časové limity, kapacity rezervací, splatnosti), finanční vypořádání (provize, faktury), audit a řešení sporů. Platforma **neověřuje investory** ani **neschvaluje jednotlivé rezervace** – nastavuje rámec, eviduje průběh a může kdykoliv zasáhnout (override) s auditní stopou.

#### 1.3 Přehled platformy

Základní tok je:
1) developer (nebo obchodník jako „lead“) zadá projekt a tiket k publikaci
2) administrátor projekt/tiket schválí a zveřejní (včetně nastavení kapacit a časů)
3) obchodník vybere investora ze své evidence a vytvoří rezervaci na tiket
4) investor podepíše rezervační smlouvu (elektronicky, nebo fyzicky + scan) ve lhůtě
5) developer podepíše rezervační smlouvu ve lhůtě
6) po podpisu obou stran se rezervace aktivuje a systém v uživatelském rozhraní odemkne identity (důkaz introdukce)
7) od aktivace běží jednání a lhůta na profinancování
8) po reálném profinancování na účet developera vzniká platformě nárok na provizi; po úhradě provize platformě vzniká nárok obchodníků vyfakturovat svůj podíl (platforma vyplácí dle SLA)

---

### 2. Projektový rozsah

#### 2.1 Co je v rozsahu

- Registrace a ověřování obchodníků a developerů (KYC/administrativní schválení účtu).
- Evidence investorů obchodníkem (interní databáze kontaktů). Platforma investory **neschvaluje** ani **neověřuje**.
- Zadání projektu a tiketů developerem.
- Zadání projektu obchodníkem jako „lead“ (návrh projektu do systému), včetně interního stavu „čeká na zasmluvnění developera“.
- Schválení a zveřejnění projektu/tiketů administrátorem (publikační pravidla, kapacity rezervací, časové limity).
- Vyhledávání a párování investorů (matching) na základě preferencí.
- Rezervace tiketu obchodníkem pro konkrétního investora.
- Rezervační smlouvy:
  - elektronický podpis (výchozí),
  - fyzický podpis investora (PDF) + nahrání scanu.
  - fyzický podpis developera (PDF) + nahrání scanu.
- Aktivace rezervace až po podpisu obou stran + odemknutí identit v UI jako právní důkaz introdukce (developer vidí i jméno obchodníka).
- Jednání po aktivaci rezervace (výchozí 30 dní; vše upravitelné/prodlužitelné administrátorem).
- Financování a platby **bez bankovní integrace**:
  - financování potvrzuje **developer** ručním zadáním (datum přijetí na účet),
  - úhradu provize (developer → platforma) a výplaty (platforma → obchodník) eviduje **administrátor** ručně (s auditní stopou a případně přílohami).
- Provizní logika a vypořádání:
  - nárok platformy na provizi vzniká až po reálném profinancování,
  - nárok obchodníka na výplatu vzniká až po úhradě provize platformě,
  - obchodník vystavuje fakturu platformě na základě dat poskytnutých platformou.
- Auditní záznamy, spory/incident management, exporty.
- Bonusový program „Pool“ (pokud aktivní): tvorba poolu z podílu platformy, vyhodnocení za období a výplata.
- Doba zveřejnění projektu/tiketů: po zveřejnění běží publikační okno; po expiraci se tiket skryje a nové rezervace nejsou možné (aktivní rezervace doběhnou).

#### 2.2 Co je mimo rozsah
- investor jako aktivní uživatel platformy (investor nemá přístup do uživatelského rozhraní)
- hypotéky a retailové financování pro fyzické osoby
- přímé půjčky mezi investorem a developerem jako „produkt platformy“


---

### 3. Role a zainteresované strany

#### 3.1 Role uživatelů

- **Administrátor platformy** (interní role): má právo změnit cokoli v systému (globální nastavení, tiket, rezervace, provize, doklady). Provádí manuální kroky (například potvrzení financování a úhrad), řeší spory/incidenty. Každý zásah musí mít důvod a auditní stopu.
- **Obchodník (tipař/broker):** spravuje vlastní profil, eviduje své investory, vytváří rezervace a sleduje jejich průběh. Může stáhnout PDF rezervační smlouvy pro fyzický podpis investora a nahrát podepsaný scan. Vystavuje faktury platformě na svůj podíl provize. Může také zadat projekt do systému ke schválení jako „lead“ (pokud developer ještě není zasmluvněn na platformě).
- **Developer:** spravuje vlastní profil, zakládá projekty a tikety, doplňuje data a dokumenty projektu, podepisuje rezervační smlouvy, komunikuje financování a hradí provizi platformě dle smlouvy.

#### 3.2 Investor

Investor:
- není uživatelský účet,
- nemá přístup do platformy a nevidí „co se na platformě děje“,
- je evidován obchodníkem jako kontakt (osoba / firma) primárně kvůli komunikaci a podpisu rezervační smlouvy.

GDPR a právní minimum (požadavek na data a proces):
- investor musí obdržet informace dle GDPR (informační povinnost) a musí existovat dohledatelný záznam, že mu byly předány a že je potvrdil (typicky součástí rezervační smlouvy a/nebo samostatným dokumentem přiloženým k podpisu),
- platforma uchovává auditní stopu doručení a podpisu (elektronicky i u fyzického podpisu přes nahraný scan).

Poznámka:
- datum narození investora se nesbírá (MVP).

### 4. Klíčové toky

#### 4.1 Registrace a schválení uživatelů

1) Obchodník a developer vyplní registrační formulář.
2) Administrátor provede ověření (administrativní, KYC dle interních pravidel).
3) Po schválení má uživatel přístup do platformy.

Poznámka:
- Ověřování se týká **uživatelů platformy** (obchodník, developer), nikoli investorů evidovaných obchodníkem.

#### 4.2 Evidence investorů obchodníkem (interní databáze)

1) Obchodník vytvoří investora ve své databázi.
2) Vyplní údaje a investiční profil (preferované parametry, velikosti, zajištění, regiony atd.).
3) Platforma investora **neověřuje** a **neschvaluje** – investor je okamžitě použitelný pro rezervace. Administrátor může záznam kdykoliv zablokovat (např. zneužití, GDPR incident) a zablokování má auditní stopu.

#### 4.3 Projekt a tikety (nabídky)

Kanonické pravidlo: projekt (a následně tikety) může do systému vložit **developer** i **obchodník**.

A) Developer zadává projekt a tikety
1) Developer založí projekt, doplní data, dokumenty a založí jeden nebo více tiketů.
2) Odešle projekt/tikety ke schválení.
3) Administrátor schválí a zveřejní (nastaví publikační okno, kapacity rezervací, časové limity, provize).

B) Obchodník zadává projekt jako „lead“
1) Obchodník zadá návrh projektu do systému (základní informace + kontakty na developera).
2) Projekt je ve stavu „čeká na zasmluvnění developera“.
3) Administrátor řeší zasmluvnění mimo platformu. Po zasmluvnění:
   - developer je vyzván k registraci, nebo
   - administrátor projekt přiřadí existujícímu developer účtu.
4) Poté pokračuje standardní schvalovací/publikační tok.

Požadavek na viditelnost:
- obchodník vidí stav svého leadu a průběh schvalování, ale nikdy neuvidí investory jiných obchodníků.

#### 4.4 Investor matching

- Obchodník nastaví investiční profil investora.
- Platforma (matching modul) navrhne vhodné tikety.
- Obchodník rozhodne, zda investora na tiket rezervuje.

#### 4.5 Rezervace a smlouvy

Kanonický tok rezervace (bez schvalování platformou):

1) Obchodník vybere tiket a investora a vytvoří rezervaci.
2) Systém ověří základní podmínky:
   - obchodník má volný slot (limit aktivních rezervací obchodníka),
   - tiket je ve stavu, který dovoluje nové rezervace (typicky **Zveřejněný**),
   - investor je zapsán v interní evidenci obchodníka (platforma investora neověřuje).
   
   Poznámka: **kapacita tiketu se v tomto kroku neblokuje**. O „přednost“ na tiketu rozhoduje až **podpis investora** (viz krok 5).
3) Obchodník zvolí způsob podpisu investora:
   - **Elektronický podpis (výchozí):** systém odešle investorovi výzvu k podpisu.
   - **Fyzický podpis investora:** systém umožní stáhnout PDF rezervační smlouvy; obchodník zajistí podpis investora a nahraje scan do rozpracované rezervace.
4) Investor podepíše (elektronicky) nebo obchodník nahraje scan (fyzický podpis) ve lhůtě **48 hodin** (výchozí; administrátor může měnit i prodlužovat).
5) Okamžikem podpisu investora vzniká **pořadí rezervace na tiketu**:
   - rozhoduje **datum a čas podpisu investora** (u fyzického podpisu datum a čas **nahrání scanu**),
   - systém seřadí všechny „investorem podepsané“ rezervace na tiketu a určí, které jsou **v kapacitě** (výchozí kapacita 3).
   - rezervace **mimo kapacitu** jsou ve stavu „čeká ve frontě“ a systém je automaticky posune, jakmile se uvolní místo.
6) Developer podepisuje (nebo odmítá) pouze rezervace, které jsou **v kapacitě**:
   - **Elektronický podpis (výchozí):** systém odešle výzvu k podpisu oprávněné osobě developera.
   - **Fyzický podpis developera:** developer si stáhne PDF, podepíše mimo platformu a nahraje scan.
   - Lhůta pro podpis developera je **48 hodin** od chvíle, kdy je rezervace „v kapacitě“ (výchozí; administrátor může měnit i prodlužovat).
   - Čas podpisu developera **nemění pořadí** rezervací (pořadí určuje vždy investorův podpis).
7) Pokud developer rezervaci **odmítne** (nebo neproběhne podpis v termínu):
   - rezervace se ukončí jako neúspěšná,
   - systém automaticky posune další rezervaci z fronty do kapacity a vyzve developera k podpisu.
8) Po podpisu obou stran se rezervace **aktivuje**:
   - v uživatelském rozhraní se odemkne identita projektu a developera obchodníkovi,
   - v uživatelském rozhraní se odemkne identita investora developerovi,
   - developerovi se zároveň odemkne i jméno obchodníka (důkaz introdukce přes platformu),
   - vše se auditně loguje.
9) Od aktivace běží lhůta jednání **30 dní** (výchozí; administrátor může měnit i prodlužovat).
10) Ve chvíli, kdy kterákoliv rezervace dosáhne stavu **Financování potvrzeno**:
   - tiket se uzavře (profinancovaný),
   - všechny ostatní rezervace na tiketu automaticky zanikají (včetně těch, kde investor už podepsal),
   - obchodníci i investoři dostanou informaci, že financování bylo realizováno jiným investorem.

#### 4.6 Financování a provize

1) Dojde k reálnému financování (převod prostředků na účet developera). **Částečné financování nepřipouštíme**, ale může dojít k dohodě na jiné (finální) částce než byla původně uvedená na tiketu.
2) Financování do systému potvrzuje **developer** (ruční zadání v jeho účtu), včetně:
   - **data přijetí** prostředků na bankovní účet developera (od tohoto data běží navazující lhůty),
   - **profinancované částky** (skutečně přijaté částky; může se lišit od cílové),
   - volitelných podkladů (např. potvrzení / výpis).
   Administrátor může záznam upravit (override) s auditní stopou.
3) V okamžiku financování vzniká platformě nárok na provizi.
4) Současně platí: **po potvrzení financování jedné rezervace zanikají všechny ostatní rezervace na stejném tiketu** (včetně těch, kde investor už podepsal).
5) Developer uhradí provizi platformě do **14 dnů** (výchozí; administrátor může měnit).
6) Po přijetí platby platformou se provize na tiketu stává „způsobilá k vyfakturování“ pro obchodníky.
7) Obchodník vystaví fakturu platformě na svůj podíl (primárně v Kč; sekundárně se může zobrazit procento).
8) Platforma uhradí fakturu obchodníka do **3 dnů** (výchozí; administrátor může měnit).

### 5. Externí závislosti

- Poskytovatel elektronického podpisu (eSign) pro rezervační smlouvy a GDPR dokumenty.
- E-mail/SMS doručování výzev k podpisu a notifikací.
- Úložiště dokumentů (smlouvy, scany, podklady projektu).
- Bankovní převody probíhají mimo platformu; platforma **není napojená na banku**:
  - **financování potvrzuje developer** ručním zadáním (datum přijetí na účet),
  - **úhrady** (provize developer → platforma, výplaty platforma → obchodníci) **eviduje administrátor** ručně (s auditní stopou).

### 6. Omezení a předpoklady

- Platforma je B2B (investor nemá přístup do aplikace).
- Platforma v MVP není napojená na banky; **financování potvrzuje developer ručně** a **úhrady (provize, výplaty) eviduje administrátor ručně**.
- Časy (podpisy, jednání, splatnosti) musí být nastavitelné administrátorem globálně i pro každý tiket/rezervaci zvlášť.
- Platforma neověřuje investory evidované obchodníkem a neschvaluje jednotlivé rezervace.
- Maskování identity projektu/developera a investora je klíčový právně-obchodní mechanismus; odemknutí identit po podpisu obou stran slouží jako důkaz introdukce.

### 7. Datové entity

Toto je kanonický seznam hlavních entit. Vztahy jsou uvedeny logicky, detailní DB návrh se doplní později.

#### 7.1 Uživatelský účet
- role: administrátor / obchodník / developer

#### 7.2 Profil obchodníka
- navázán na uživatelský účet obchodníka
- obsahuje obchodní úroveň (Partner/Premium/Elite), počet slotů, fakturační údaje

#### 7.3 Profil developera
- navázán na uživatelský účet developera
- obsahuje firemní údaje, bankovní účet pro financování, kontakty

#### 7.4 Investor (záznam obchodníka)
- patří obchodníkovi (není globální)
- obsahuje identifikační a kontaktní údaje + investiční profil

#### 7.5 Projekt
- standardně je vlastníkem developer
- může vzniknout i jako „lead“ vytvořený obchodníkem (před zasmluvněním developera) a po zasmluvnění se přiřadí developerovi

#### 7.6 Tiket (nabídka)
- patří projektu
- obsahuje investiční parametry, kapacity rezervací, časové limity, publikační okno a provizní nastavení

#### 7.7 Rezervace
- patří tiketu a investorovi (záznam obchodníka)
- vzniká vytvořením rezervace obchodníkem
- aktivuje se až po podpisu rezervační smlouvy oběma stranami
- obsahuje metodu podpisu (elektronicky / fyzicky + scan), termíny, auditní stopu a vazbu na provizi

#### 7.8 Provize
- provize platformy vůči developerovi (vzniká až po profinancování)
- rozdělení provize mezi platformu a obchodníky (role 1 / role 2)

#### 7.9 Platby / úhrady
- evidence financování (převod na účet developera) – ruční zadání developerem (administrátor může override)
- evidence úhrady provize developer → platforma – ruční zadání
- evidence výplaty obchodníkům platforma → obchodník – ruční zadání

#### 7.10 Auditní záznam
- loguje klíčové události (stavové změny, podpisy, prodloužení termínů, ruční zásahy, exporty)

#### 7.11 Pool bonus program (volitelné – pokud aktivní)
- akumulace části podílu platformy do poolu (výchozí 10 %)
- periodické vyhodnocení (půlrok) a výplata brokerům dle pravidel
- evidence příspěvků a výplat (audit, reporty)

### 8. Kanonické seznamy povolených hodnot

#### 8.0 Zásady správy číselníků a stavů (Milník 2 – uzavřen)

Aby byla data dlouhodobě **auditovatelná**, srovnatelná v čase a bezpečně exportovatelná (reporting, účetnictví, právní audit), platí pro všechny číselníky (včetně stavů) tato pravidla:

1) **Význam položky je neměnný.** Jakmile je položka jednou použita v datech, její význam se už nesmí „přepsat“.
2) **Přidávání je povoleno, mazání ne.** Když vznikne potřeba nové hodnoty, přidá se nová položka. Historické položky se nesmí mazat.
3) **Zneaktivnění místo odstranění.** Pokud se položka přestane používat, pouze se označí jako „neaktivní“ (nejde vybrat pro nová data), ale zůstává dohledatelná v historii.
4) **Změna názvu je pouze změna popisku.** Pokud se upraví text pro uživatelské rozhraní, nesmí se tím změnit význam. Pro audit/reporting se pracuje s neměnným interním identifikátorem položky.
5) **Nahrazení hodnoty se řeší novou položkou.** Pokud se hodnota ukáže jako nevhodná, vytvoří se nová a stará se zneaktivní; v datech se nic hromadně nepřepisuje zpětně.
6) **Každá ruční změna stavů musí mít důvod.** Důvody jsou číselník (viz 8.14) a jsou povinné pro administrátorské zásahy.

Poznámka:
- Tyto zásady platí i pro číselníky jako „Typ projektu“, „Forma financování“, „Typ zajištění“ apod.


#### 8.1 Úrovně obchodníka a sloty
Úrovně jsou brandově ukotvené: **Partner, Premium, Elite**.

**Výchozí nastavení (pro obchodní provoz):**
- **Partner:** 10 aktivních rezervací (slotů)
- **Premium:** 25 aktivních rezervací (slotů)
- **Elite:** 50 aktivních rezervací (slotů)

Poznámky:
- slot = kapacita na **současně otevřené (běžící)** rezervace (tj. rezervace v procesu včetně čekání na podpis i aktivních; ne historické)
- počty slotů musí být upravitelné administrátorem
- úrovně nejsou „provizní pool“; jsou to úrovně přístupu a kapacity

#### 8.2 Typy projektů (kanonický seznam)

**Kanonický (business) seznam pro Tipari.cz (B2B)** – používá se ve formulářích, filtrech a statistikách:
- Rezidenční
- Logistika
- Komerční
- Smíšený
- Retail
- Ubytovací zařízení
- Pozemky
- Energetika
- Ostatní

Poznámky k jednotnosti:
- V některých podkladech existuje přísnější „domain dictionary“ se **starším** členěním (např. „Rezidenční development“, „Průmyslový projekt“, „Rekonstrukce“ apod.). Pro snížení chaosu držíme výše uvedený seznam jako **hlavní**.
- Pokud budeme chtít zachovat zpětnou kompatibilitu, doporučuje se přidat **mapování** (interně):
  - „Rezidenční“ → rezidenční development / rekonstrukce (dle tagů)
  - „Komerční“ → komerční development
  - „Smíšený“ → mixed use
  - „Ubytovací zařízení“ → hospitality
  - „Pozemky“ → land development
  - „Ostatní“ → industrial / cokoliv mimo (případně rozdělit později)

> Důležité: typ projektu je „hlavní šuplík“ (asset class). To **co se financuje** (např. výstavba, refinancování, bridge…) řešíme odděleně přes tagy a využití prostředků.


#### 8.3 Doplňková kategorizace projektu (tagy)

Toto je **volitelné tagování** (není to primární typ projektu). Používá se pro filtrování, vysvětlení účelu financování a pro lepší matching.

**Doporučený kanonický seznam tagů (sjednoceno napříč podklady):**
- Nákup nemovitosti (buy & hold)
- Výstavba
- Rekonstrukce
- Refinancování
- Překlenovací financování (bridge)
- Land development (příprava pozemků)
- Brownfield redevelopment
- Projektové financování (SPV)
- Provozní financování
- Prodej projektu (transakce, ne financování) – volitelné

Pravidla:
- Tagy nesmí rozbíjet typ projektu. Jsou doplňkové.
- Tagy mohou být vícenásobné, ale doporučuje se max. 3 na jeden projekt/tiket.
- „Prodej projektu“ je **transakční typ** – pokud ho nechceme v první verzi, vypnout (nezobrazovat v UI).


#### 8.4 Forma financování (kanonické pole na tiketu)

V podkladech se míchají pojmy „forma financování“ a „forma investice“ (instrument). Pro Tipari.cz (MVP) používáme **jedno pole**: **Forma financování**.

- Toto pole se zadává u tiketu.
- Toto pole se zobrazuje **i na kartě tiketu** (v seznamu tiketů) a v detailu tiketu.

**Kanonický seznam (finální):**
- Zápůjčka / úvěr
- Mezaninové financování
- Kapitálový vstup
- Joint Venture (společný podnik)
- Konvertibilní zápůjčka
- Zpětný leasing (sale & leaseback)
- Nabídka projektu (prodej projektu) – volitelné

Poznámky:
- Termín „přímá půjčka“ se v uživatelském rozhraní nepoužívá (brand). Pro běžné dealy používáme „Zápůjčka / úvěr“.
- Pokud budeme později potřebovat detailní rozlišení instrumentu (seniorita, konverze, kapitálový vstup…), doplníme samostatným polem v další verzi nebo to budeme držet jen v právních dokumentech/podmínkách tiketu.

#### 8.5 Ručení a zajištění (sjednocený katalog pro tiket)

Abychom nemíchali pojmy, rozlišujeme:
- **Ručení** = osobní/korporátní závazek třetí osoby (zvyšuje vymahatelnost).
- **Zajištění** = majetkové krytí závazku (zástava, účty, práva).
- **Procesní posílení** = notářská vykonatelnost, escrow apod.

##### 8.5.1 Kanonické typy zajištění (pro výběr v tiketu)
**Majetkové zajištění:**
- Zástavní právo k nemovitosti (1. pořadí) – primární
- Zástavní právo k nemovitosti (2. pořadí)
- Křížová zástava více nemovitostí
- Zástava podílu (SPV / obchodní podíl)
- Postoupení pohledávek
- Escrow / vázaný účet (kontrola cash-flow)
- Hotovostní kolaterál
- Pojištění (doplňkové)
- Jiné zajištění (volný popis)

**Ručení (garance):**
- Bankovní záruka
- Ručení mateřské společnosti (korporátní ručení)
- Osobní ručení

**Procesní posílení vymahatelnosti:**
- Notářský zápis (ideálně s přímou vykonatelností – pokud to právně chceme rozlišovat)

**Doplňkové zajištění (časté v praxi):**
- Směnka / blankosměnka (doporučeno jako doplněk, ne jako jediné zajištění)

##### 8.5.2 Pravidla zadání a kombinací
- Pokud je vybrána „Zástavní právo k nemovitosti“, musí být vždy uvedeno **pořadí** (1./2./jiné).
- „Bez zajištění“ (pokud se vůbec povolí) se **nesmí kombinovat** s jinými typy.
- U zástav se doporučuje uvádět LTV (volitelně/později povinně podle pravidel publikace).

> Poznámka k právní jistotě: v části 11 (nesoulady) držíme „Směnku“ jako bod k potvrzení právní architekturou (zda má být samostatná volba, nebo pouze popis v „Jiné zajištění“).


#### 8.6 Využití prostředků – kanonický procentuální rozpad

Použijeme **procentuální rozpad (součet = 100 %)**. Kategorie (sjednoceno napříč podklady):
- Nákup nemovitosti
- Výstavba
- Rekonstrukce
- Refinancování závazků
- Překlenovací financování
- Projektová rezerva (CAPEX)
- Provozní náklady projektu
- Technická příprava projektu (projekce, studie, povolení)
- Marketing a prodej
- Daňové a transakční náklady
- Splacení společníka / investora
- Kombinované využití

Pravidla:
- Součet musí být 100 % (validace ve formuláři).
- „Kombinované využití“ je povoleno, ale i tak musí být rozpad vysvětlen (alespoň v textu).
- Doporučení: v UI zobrazovat tabulku nebo jednoduchý graf (pro rychlé pochopení).

Povinná právní formulace (copy-ready):
> „Uvedené využití prostředků je plánované a může se v průběhu realizace projektu měnit v závislosti na vývoji projektu.“



#### 8.6.1 Znalecký posudek, ocenění a poměr financování k hodnotě zástavy

- Znalecký posudek / odhad hodnoty zástavy je **volitelný** podklad (příloha u projektu).
- V první verzi systém **neblokuje** zveřejnění tiketu jen proto, že posudek chybí.
- Pokud je u tiketu vybráno zajištění typu „Zástavní právo k nemovitosti“, je doporučeno (ne povinné) evidovat:
  - hodnotu zástavy (dle posudku/odhadu),
  - poměr financování k hodnotě zástavy (informativně pro obchodníka a interně pro matching).

Poznámka:
- Platforma podklady **neověřuje**; slouží jako evidence pro audit a komunikaci.

#### 8.7 Měna
- Koruna česká (CZK) – **jediná podporovaná měna** v první verzi platformy.
- Jiné měny nejsou v rozsahu (včetně přepočtů).

#### 8.7.1 Lokalita – kraje (kanonický seznam pro filtry)

- Hlavní město Praha
- Středočeský
- Jihočeský
- Plzeňský
- Karlovarský
- Ústecký
- Liberecký
- Královéhradecký
- Pardubický
- Vysočina
- Jihomoravský
- Olomoucký
- Zlínský
- Moravskoslezský

Doplnění:
- Kromě kraje evidujeme u projektu také **obec / město** (minimálně jako textové pole nebo číselník pro výběr), aby šlo lépe filtrovat a orientovat se.

#### 8.8 Stav účtu
- Čeká na ověření
- Aktivní (ověřen)
- Pozastaven
- Zamítnut
- Zablokován


#### 8.9 Stav investora v evidenci obchodníka
- Nový
- Aktivní
- Neaktivní
- Zablokovaný

#### 8.10 Stav projektu

Kanonický číselník stavu projektu (významy a přechody viz kapitola **21.0**):

- Návrh obchodníka (čeká na zasmluvnění developera)
- Rozpracovaný
- Ke schválení
- Schválený
- Zveřejněný
- Skrytý
- Uzavřený
- Zamítnutý


#### 8.11 Stav tiketu

Kanonický číselník stavu tiketu (významy a přechody viz kapitola **21.1**):

- Rozpracovaný
- Ke schválení
- Schválený
- Zveřejněný
- Skrytý (ručně skryto administrátorem)
- Expirovaný (uplynulo publikační okno)
- Uzavřený (profinancovaný; referenční / read-only)
- Zamítnutý


#### 8.12 Stav rezervace

Kanonický číselník stavu rezervace (významy a přechody viz kapitola **21.2**):

- Rozpracovaná
- Čeká na podpis investora
- Podepsáno investorem – ve frontě (mimo kapacitu)
- Podepsáno investorem – v kapacitě (čeká na podpis developera)
- Aktivní (podepsáno oběma stranami; odemčené identity)
- Financováno (developer potvrdil přijetí na účet; tiket uzavřen)
- Ukončeno neúspěšně
- Spor

Poznámka:
- „Jednání“ je fáze v rámci stavu **Aktivní** (řídí se daty a lhůtami, ne dalším stavem).
- „Financováno“ je jediné úspěšné ukončení rezervace; ostatní končí jako **Ukončeno neúspěšně** s důvodem (8.14).


#### 8.13 Stav provize a vypořádání (sledování a platby)

Kanonický číselník, který sjednocuje: vznik nároku platformy, fakturaci developerovi, úhradu platformě a následné vyfakturování a výplatu obchodníků.

Zásadní pravidlo proti „falešné jistotě“:
- nárok obchodníka nikdy nevzniká v okamžiku **aktivní rezervace**, ale až po **reálném profinancování** a následně po **úhradě provize platformě**.

Kanonické stavy (významy a přechody viz kapitola **21.3**):

- Připraveno (čeká na financování)
- Nárok platformy vznikl (financováno)
- Fakturováno developerovi
- Čeká na úhradu developerem platformě
- Po splatnosti (developer → platforma)
- Uhrazena platformě
- Podklady pro fakturaci obchodníků poskytnuty
- Čeká na faktury obchodníků
- Faktury obchodníků přijaty / schváleny
- Čeká na výplatu obchodníkům
- Po splatnosti (platforma → obchodníci)
- Vyplaceno obchodníkům
- Spor / reklamace

Poznámka:
- Primární prezentace v uživatelském rozhraní je vždy v Kč; procento je pouze doplňkový kontrolní údaj.


#### 8.14 Číselník důvodů (pro audit a ruční zásahy)

Tyto důvody slouží k:
- jednotnému označování ručních zásahů administrátora,
- vysvětlení ukončení rezervace/tiketu,
- exportům a interním statistikám.

**A) Rezervace – důvod ukončení**
- Profinancováno jiným investorem (automaticky)
- Investor odstoupil / nepokračuje
- Developer odmítl investora
- Vypršela lhůta pro podpis investora
- Vypršela lhůta pro podpis developera
- Vypršela lhůta jednání (bez financování)
- Tiket expiroval (konec publikačního okna)
- Rezervace zrušena administrátorem
- Jiné (povinná poznámka)

**B) Tiket – důvod skrytí / znovuotevření / uzavření**
- Uzavřeno: financování potvrzeno (automaticky)
- Skryto: žádost developera
- Skryto: právní/compliance důvod
- Skryto: chyba v datech (oprava)
- Skryto: strategické pozastavení
- Znovuotevřeno: chybné uzavření (oprava)
- Znovuotevřeno: nová tranše / nové kolo (správa mimo platformu, jen evidenčně)
- Jiné (povinná poznámka)

**C) Finance – důvod ruční korekce (administrátor)**
- Oprava překlepu / chyby zadání
- Změna finální částky dle dohody investor–developer
- Pozdní potvrzení financování developerem (dopočtení)
- Účetní korekce (po dohodě s účetnictvím)
- Jiné (povinná poznámka)

**D) Výplata obchodníkům – důvod pozastavení**
- Čeká se na úhradu provize platformě
- Chybí faktura od obchodníka
- Nesoulad faktury s podklady (kontrola)
- Vyžádány doplňující údaje (plátce/neplátce daně z přidané hodnoty)
- Spor / reklamace
- Jiné (povinná poznámka)

---

### 10. Business logika (kanonické rozhodnutí)

#### 10.1 Sloty obchodníka, kapacita tiketu a pravidla konkurence

##### Sloty obchodníka (limit obchodníka)

- Sloty definují, kolik **současně rozpracovaných / běžících rezervací** může mít obchodník (napříč všemi tikety).
- Levely obchodníka (dle brandu):
  - **Partner** – 10 slotů
  - **Premium** – 25 slotů (default)
  - **Elite** – 50 slotů (default)

Poznámka: default je 10/25/50 (Partner/Premium/Elite). Administrátor může hodnoty upravovat (globálně i per obchodník).

##### Kapacita tiketu (limit tiketu)

- Kapacita tiketu říká, kolik rezervací může být současně „v kapacitě“.
- **Do kapacity se započítávají rezervace až od podpisu investora** (až do jejich ukončení), typicky:
  - „podepsáno investorem – v kapacitě (čeká na podpis developera)“,
  - „rezervace aktivní“,
  - „jednání probíhá“.
- Rezervace před podpisem investora kapacitu tiketu neblokují.

##### Pravidla konkurence (fronta podle podpisu investora)

- Tiket se **nezamyká** pro jednoho obchodníka. O stejný tiket se mohou ucházet různí obchodníci současně.
- O pořadí rozhoduje **čas podpisu investora** (u fyzického podpisu čas nahrání scanu).
- Systém udržuje pořadí všech investorem podepsaných rezervací a do kapacity pustí vždy **prvních N** (N = kapacita tiketu).
- Pokud některá rezervace v kapacitě odpadne (např. developer odmítne podpis, vyprší lhůty, rezervace je zrušena), systém automaticky posune další rezervaci z pořadí do kapacity.
- **Jakmile dojde k financování jedné rezervace, ostatní rezervace na tiketu automaticky zanikají** (včetně těch ve frontě).

#### 10.2 Aktivace rezervace a odemknutí identity

- Identita projektu a developera je obchodníkovi skryta až do aktivace rezervace.
- Identita investora je developerovi skryta až do aktivace rezervace.
- Aktivace nastává až po podpisu rezervační smlouvy oběma stranami.
- Po aktivaci se v UI odemkne:
  - obchodníkovi: název projektu + jméno developera,
  - developerovi: identita investora,
  - developerovi: jméno obchodníka (důkaz introdukce přes platformu).

#### 10.3 Časové limity a SLA (globálně + per tiket/rezervaci)

Výchozí hodnoty:
- Podpis investora: 48 hodin
- Podpis developera: 48 hodin
- Jednání po aktivaci: 30 dní
- Splatnost provize developer → platforma: 14 dnů
- Výplata obchodníkovi po úhradě platformě: 3 dny

Pravidlo:
- Administrátor může všechny časy měnit a prodlužovat, a to **globálně** i **pro konkrétní tiket/rezervaci**.

#### 10.4 Kdy vzniká nárok na provizi

- Obchodníkovi **nevzniká** nárok na provizi v okamžiku aktivní rezervace.
- Nárok platformy na provizi vzniká až po **reálném profinancování** (převod prostředků na účet developera).
- Nárok obchodníka na výplatu vzniká až po **úhradě provize platformě**.

#### 10.5 Provize v Kč vs v %

Brandové pravidlo:
- Primární vyjádření provize je vždy **v Kč**.
- Pro interní výpočty a audit se může držet i **%**, ale v rozhraní je sekundární.

#### 10.6 Fakturace a výplaty (Milník 3 – uzavřen)

Kanonický princip:
- **Provize obchodníka** se vždy počítá z **reálně profinancované částky** (částka, která přišla na bankovní účet developera) – zdrojem pravdy je potvrzení developera.
- Provize obchodníka (odměna) je vždy počítaná jako podíl z profinancované částky, **bez ohledu na to, zda je obchodník plátcem daně z přidané hodnoty**.
- **Daň z přidané hodnoty** (pokud je obchodník plátcem) je položka navíc na faktuře obchodníka. Platforma tedy hradí fakturu **včetně daně**, ale „provize“ jako odměna se nemění.
- **Dobropisy a storna se v platformě nepředpokládají.** Pokud nastanou (například účetní oprava), řeší se mimo platformu a v systému se pouze eviduje finální výsledek (s auditní stopou).

Kanonický tok vypořádání:
1) Developer potvrdí profinancování:
   - zadá **datum přijetí** financí na účet developera (může potvrdit i zpětně, ale k reálnému datu přijetí),
   - systém uloží také **čas potvrzení** (audit),
   - zadá **finální profinancovanou částku** (může se lišit od původního plánu),
   - volitelně nahraje podklady (soubor) a/nebo uvede poznámku.
     - Pokud **nepřiloží podklady**, poznámka (důvod) je **povinná**.
   - administrátor může provést ruční opravu (částka/datum) – vždy s důvodem a auditní stopou.
2) Systém z profinancované částky spočítá:
   - částku provize platformy (dle smluvního procenta),
   - podíly pro obchodníka 1 a obchodníka 2 (dle aktuálního rozdělení),
   - splatnost provize developer → platforma (výchozí 14 dnů; upravitelné administrátorem).
     - **Splatnost se počítá od data přijetí financí na účet developera** (ne od data, kdy developer klikne na potvrzení).
2a) Platforma vystaví fakturu developerovi (mimo platformu v účetnictví; výchozí nástroj Pohoda) a do platformy uloží její kopii:
   - provize platformy **+ daň z přidané hodnoty** (pokud je na dané faktuře uplatněna),
   - PDF faktura je:
     - odeslána e-mailem developerovi,
     - zároveň dostupná developerovi v platformě ke stažení,
   - režim daně z přidané hodnoty musí být nastavitelný **pro každou transakci zvlášť** (administrátor),
   - po vystavení se faktura považuje za uzamčenou (nelze měnit hodnoty zpětně; případné opravy řeší účetnictví mimo platformu).
3) Po přijetí úhrady provize platformě (ručně potvrzeno administrátorem) systém:
   - založí záznam „úhrada provize platformě“ s datem a částkou,
   - zpřístupní obchodníkům podklady k fakturaci (základ v korunách českých, identifikace tiketu/projektu, reference platby),
   - aktivuje nárok obchodníků na výplatu a započítání obratu do bonusového programu „Pool“ (viz 10.7).
4) Obchodník vystaví fakturu platformě:
   - pokud je plátcem daně z přidané hodnoty, připočte ji podle legislativy (platforma obchodníkovi poskytne i vypočtený přehled daně),
   - pokud není plátcem, fakturuje pouze základ.
5) Platforma uhradí fakturu obchodníka (výchozí lhůta 3 dny po přijetí faktury; upravitelné administrátorem). Stav úhrady se do systému zadává ručně administrátorem.

Poznámka k dani z přidané hodnoty:
- Platforma obchodníkovi vždy předává **základ provize v korunách českých**.
- Pokud obchodník uvede, že je plátcem daně z přidané hodnoty, platforma k základu vypočítá a zobrazí také **daň** a **celkovou částku včetně daně** (podle nastavené sazby). Obchodník z těchto údajů vystaví fakturu platformě.
- Právní a daňová odpovědnost za správnost faktury je na straně vystavitele (obchodníka). Platforma pouze drží data a kontrolní součty pro párování plateb.

##### 10.6.2 Povinné údaje na faktuře a platební identifikátory (Česká republika)

Tato část je primárně pro **datový model** a pro to, aby výstupy platformy (podklady, faktury, exporty) měly konzistentní a obhajitelnou strukturu.

Klíčové pravidlo: platforma bude umět vystavit doklad **s daní z přidané hodnoty i bez daně** (nastavuje administrátor u každé transakce zvlášť). Zpětné změny nejsou povolené – opravy pouze novou auditovanou operací (viz kapitola 16).

---

###### A) Platforma → developer

Platforma vystavuje developerovi doklad za **provizi platformy** (provize vzniká až po reálném financování a potvrzení přijetí financí developerem).

**A.1 Pokud se uplatňuje daň z přidané hodnoty (daňový doklad)**

Minimální náležitosti daňového dokladu, které má platforma pro každou fakturu držet a umět exportovat (zejména dle § 29 zákona č. 235/2004 Sb., o dani z přidané hodnoty):
- Evidenční číslo daňového dokladu (číslo faktury).
- Identifikace osoby, která uskutečňuje plnění (platforma): obchodní firma / název, sídlo nebo místo podnikání.
- Daňové identifikační číslo (DIČ) platformy.
- Identifikace osoby, pro kterou se plnění uskutečňuje (developer): obchodní firma / název, sídlo nebo místo podnikání.
- Daňové identifikační číslo (DIČ) developera, je-li mu přiděleno.
- Rozsah a předmět plnění (popis služby).
- Datum vystavení dokladu.
- Datum uskutečnění plnění nebo datum přijetí úplaty (pokud předchází).
- Jednotková cena bez daně a případná sleva (pokud je relevantní).
- Základ daně.
- Sazba daně.
- Výše daně **v korunách českých** (zaokrouhlená na haléře dle pravidel v 10.6.3).
- Celková částka k úhradě (základ + daň) – doporučené (užitečné pro párování plateb a jednoznačné zobrazení celku).

Pokud se uplatňuje **režim, kdy daň přiznává a platí zákazník** (typicky přenesená daňová povinnost), musí být na dokladu uvedena informace, že daň odvede zákazník.

**A.2 Pokud se daň z přidané hodnoty neuplatňuje (doklad bez daně / obchodní listina)**

V situacích, kdy platforma nevystavuje daňový doklad (např. faktura bez daně z přidané hodnoty dle nastavení administrátora), je nutné stále splnit minimální identifikaci podnikatele na obchodních listinách:
- obchodní firma nebo název,
- sídlo,
- identifikační číslo,
- údaj o zápisu v obchodním rejstříku (pokud je podnikatel zapsán).

Doporučená (praktická) data pro účetnictví a párování plateb, i pokud nejsou vždy zákonně povinná:
- identifikace odběratele (developer) v obdobném rozsahu,
- datum vystavení,
- splatnost (datum),
- bankovní spojení pro úhradu,
- vazba na projekt a tiket (identifikátory + název projektu po odkrytí).

---

###### B) Obchodník → platforma

Obchodník fakturuje platformě **podíl z provize platformy**, a to až poté, co platforma obdrží provizi od developera.

Platforma musí pro fakturu obchodníka evidovat minimálně:
- identifikaci obchodníka (obchodní firma / název, sídlo, identifikační číslo, daňové identifikační číslo – pokud existuje),
- status „plátce / neplátce daně z přidané hodnoty“,
- evidenční číslo dokladu a datum vystavení,
- popis plnění a vazbu na tiket/projekt,
- základ v korunách českých,
- daň z přidané hodnoty (pokud je obchodník plátcem) a celkovou částku,
- splatnost (datum).

---

###### C) Platební identifikátory pro bankovní párování

Poznámka: české platební příkazy typicky umožňují uvádět „variabilní symbol“, „specifický symbol“ a „konstantní symbol“ jako **volitelné** údaje platby. Pro Tipari je ale důležité mít konzistentní pravidla pro párování, protože bankovní propojení není automatizované.

**C.1 Doporučené identifikátory, které platforma vygeneruje a uvede na dokladu**
- **Číslo faktury** (unikátní evidenční číslo dokladu).
- **Variabilní symbol** (čistě číselný řetězec, maximálně 10 číslic) – doporučené použít jako hlavní bankovní identifikátor.
- **Zpráva pro příjemce** (text) – např. „Tipari – provize – tiket …“.

**C.2 Volitelné doplňky (pokud je bude potřeba používat)**
- specifický symbol (čistě číselný),
- konstantní symbol (čistě číselný).

**C.3 Bankovní údaje**
- číslo bankovního účtu příjemce (platforma / obchodník),
- mezinárodní formát účtu (pokud relevantní),
- identifikace banky (pokud relevantní).

---

###### D) Dopady do datového modelu

Závěr pro návrh dat:
- Každá faktura musí mít jednoznačné evidenční číslo (a ideálně i oddělený variabilní symbol, pokud evidenční číslo obsahuje nečíselné znaky).
- U každé transakce se ukládá „daňový režim dokladu“ (s daní / bez daně / přenesená daňová povinnost / jiné) včetně důvodu.
- U dokladů se ukládá vazba na tiket, projekt a hlavní finanční milník („datum uskutečnění plnění“ nebo „datum přijetí úplaty“) – tak, aby bylo možné obhájit splatnosti a audit.


##### 10.6.3 Zaokrouhlování a kontrolní součty

Kanonické pravidlo:
- Všechny výpočty se vedou v korunách českých s přesností minimálně 4–6 desetinných míst interně.
- **Na výstupech** (fakturační podklady, zobrazení v platformě, exporty) se částky zobrazují **na 2 desetinná místa** (haléře).
- Zaokrouhlení je **vždy směrem nahoru** (ceiling) na 2 desetinná místa.

Aby se součty „nerozjely“:
- Nejprve se spočítá **základní provize platformy** (bez daně z přidané hodnoty).
- Poté se aplikuje rozdělení podílů mezi platformu a obchodníky.
- Částky obchodníků se zaokrouhlí dle pravidla výše.
- Případný rozdíl vzniklý zaokrouhlením se promítne do **zbytkové části platformy** (platforma si „krátí“ svůj podíl), aby platilo:
  - součet (obchodník 1 + obchodník 2 + zbytek platformy) = základní provize platformy.

Poznámka: u daně z přidané hodnoty se postupuje stejně – daň se počítá ze základu a zaokrouhluje se na 2 desetinná místa směrem nahoru.

#### 10.7 Bonusový program „Pool“ (Milník 4 – uzavřen)

Pool je **volitelný bonusový program pro obchodníky**.

Zásada:
- Pool je financovaný z **podílu platformy na provizi** (platforma si krátí svůj podíl).
- Podíly obchodníků na provizi se Pool programem **nesnižují**.

---

##### 10.7.1 Období vyhodnocení a mety

**Období vyhodnocení (výchozí):**
- 1. leden – 30. červen
- 1. červenec – 31. prosinec

**Spuštění uprostřed pololetí (férovost):**
- Pokud platforma začne fungovat uprostřed pololetí, **první období** se počítá od data spuštění (datum „go‑live“) do konce pololetí.

**Přepočet met pro zkrácené první období:**
- Aby byl program férový i při zkráceném prvním období, **meta 1 i meta 2 se přepočítá poměrně** podle délky období v kalendářních dnech:
  - meta pro období = meta základ × (počet dnů období / počet dnů daného pololetí)
- Zaokrouhlení: na celé koruny české, **vždy nahoru**.

**Mety (výchozí hodnoty; nastavitelné administrátorem):**
- **Meta 1 (kvalifikace):** 100 000 000 Kč obratu v období.
- **Meta 2 (výhra celý Pool):** 200 000 000 Kč obratu v období.

---

##### 10.7.2 Obrat obchodníka pro Pool

**Definice obratu:**
- „Obrat“ = součet **reálně profinancovaných částek** tiketů v daném období.
- Počítá se **v korunách českých**.
- Používá se vždy **finální profinancovaná částka**, kterou developer potvrdí (může se lišit od původního cíle tiketu).

**Kdy se obrat započítá (cash‑basis pravidlo):**
- Obrat se do Poolu započítá až ve chvíli, kdy administrátor **ručně potvrdí**, že provize developer → platforma byla **uhrazena a připsána na účet platformy**.
- Důvod: Pool je bonusový program navázaný na skutečně přijaté peníze platformou.

**Datum obratu (zařazení do období):**
- Pro zařazení do období se používá **datum profinancování** = datum, které developer potvrdí jako datum přijetí financí od investora na svůj účet.
- Pokud je úhrada provize platformě potvrzena až po konci období, ale datum profinancování je uvnitř období, může se ještě započítat, pokud je to **před uzávěrkou období** (výchozí datum‑do + 14 dnů).

**Komu se obrat započítá:**
- Obrat se započítává obchodníkovi, pokud je u profinancovaného tiketu evidovaný jako:
  - **obchodník 1** (přivedl investora), a/nebo
  - **obchodník 2** (přivedl projekt), pokud obchodník 2 je skutečně obchodník (nikoliv developer).
- Pokud je broker stejná osoba v obou rolích, obrat se mu započítá **jen jednou**.

---

##### 10.7.3 Kvalifikace, pořadí a rozdělení Poolu

**Kvalifikovaní obchodníci (maximálně 3):**
- Kvalifikovaní jsou maximálně **3 obchodníci**, kteří jako první v období dosáhnou **mety 1**.
- Ostatní obchodníci, kteří metu 1 dosáhnou později než první tři, **nemají nárok** na podíl z Poolu.

**Tie‑break (pořadí):**
- Při shodě obratu rozhoduje dřívější čas dosažení dané mety.
- Čas dosažení mety je **čas, kdy systém zapíše obrat** do Pool statistiky (tj. po ručním potvrzení úhrady provize platformě), ve kterém se obchodník **poprvé dostane na hodnotu ≥ meta**.

**Varianta A – někdo dosáhne mety 2 (vítěz bere vše):**
- Pokud kdokoliv v období dosáhne **mety 2**, vítězem je obchodník, který ji dosáhl **jako první** (dle času dosažení mety 2).
- Vítěz získá **100 % zůstatku Poolu** za dané období.
- Ostatní obchodníci v daném období nedostanou nic.

**Varianta B – nikdo nedosáhne mety 2:**
- Pokud v období metu 2 nedosáhne nikdo:
  - když je kvalifikovaný **1 obchodník** (dosáhl mety 1), získá **100 % Poolu**;
  - když jsou kvalifikovaní **2–3 obchodníci**, Pool se rozdělí **poměrově podle jejich obratu** k poslednímu dni období:
    - podíl = obrat obchodníka / součet obratů kvalifikovaných
    - výplata = zůstatek Poolu × podíl

**Varianta C – nikdo nedosáhne mety 1 (rollover):**
- Pokud se v období nekvalifikuje nikdo (meta 1 nedosažena):
  - výchozí pravidlo (nastavitelné administrátorem): **50 % Poolu zůstává platformě** a **50 % se převádí** do dalšího období.

**Anonymita:**
- Při vyhlašování výsledků se obchodníci zobrazují **anonymně** (např. „Obchodník A / B / C“).
- Administrátor vidí reálné identity.

---

##### 10.7.4 Příspěvky do Poolu a výplata

**Příspěvek do Poolu (vznik):**
- Příspěvek do Poolu vzniká při ručním potvrzení úhrady provize platformě (developer → platforma).
- Výpočet:
  - příspěvek = (**podíl platformy na provizi bez daně z přidané hodnoty**) × (**procento do Poolu**)

**Výplata Poolu:**
- Výplata probíhá po uzávěrce období:
  - systém připraví výpočet a podklady,
  - administrátor ručně potvrdí výplatu (platforma nemá bankovní integraci).
- Každá výplata musí mít auditní stopu (komu, kolik, podle jakého pravidla, kdo potvrdil, kdy).

---

##### 10.7.5 Report a export pro administrátora

Administrátor musí mít pro každé období export do tabulky (Excel/CSV). Minimální pole exportu:
- období (datum od, datum do, uzávěrka),
- stav období (otevřené / uzavřené / vyplacené),
- meta 1 a meta 2 (základní i přepočtené pro období),
- procento do Poolu,
- počáteční zůstatek, příspěvky, převody, konečný zůstatek,
- seznam příspěvků do Poolu: datum přijetí provize platformou, tiket, projekt, profinancovaná částka, podíl platformy, příspěvek do Poolu,
- kvalifikovaní obchodníci (interně identita, externě anonymní označení), jejich obrat, čas dosažení mety 1, případně mety 2,
- výsledné rozdělení Poolu (podíl a částka) + datum výplaty.

#### 10.8 Doba zveřejnění projektu a tiketů

- Každý tiket má **publikační okno 90 dnů** (výchozí).
- Po uplynutí publikačního okna přejde tiket do stavu **Expirovaný**:
  - tiket se skryje z nabídky,
  - nelze zakládat nové rezervace,
  - existující běžící rezervace mohou doběhnout (pokud je administrátor ručně neukončí).
- Stav **Skrytý** nastavuje administrátor ručně (například dočasné stažení z nabídky):
  - tiket není viditelný v nabídce,
  - nelze zakládat nové rezervace,
  - existující rezervace mohou pokračovat (pokud administrátor nerozhodne jinak).
- Stav **Uzavřený (profinancovaný)** vzniká potvrzením financování developerem:
  - tiket zůstává viditelný jako reference,
  - tiket je **deaktivovaný pro další akce**,
  - všechny ostatní rezervace na tiketu zanikají.
- Administrátor může tiket znovu zveřejnit (re-open) ze stavu Skrytý nebo Expirovaný:
  - prodlouží / nastaví nové publikační okno,
  - systém odešle obchodníkům notifikaci, že se tiket znovu otevřel (pokud mají rozpracované rezervace, mohou je dokončit).

#### 10.9 Změny tiketu po zveřejnění (žádost developera)

- Developer nemůže „na přímo“ upravovat tiket, který je již zveřejněný.
- Developer může podat **žádost o úpravu tiketu** (popis změn), kterou posuzuje administrátor.
- Administrátor může:
  - změnu schválit,
  - změnu zamítnout,
  - změnu schválit s úpravou (admin upraví navržené hodnoty).
- Po schválení se změna promítne do tiketu a v uživatelském rozhraní se zobrazí informace, že tiket byl upraven (např. tag „upraveno“ + datum).
- Omezení pro developera: žádost o úpravu nelze podat (nebo nelze změnu aplikovat) v případě, že:
  - na tiketu existují **aktivní rezervace**, nebo
  - na tiketu existují **vygenerované žádosti k podpisu investora** (rezervace už byla odeslána investorovi k podpisu).
- Administrátor má právo na vše (může udělat výjimku), ale každá výjimka musí mít auditní stopu.

### 11. Zjištěné duplicity a nesoulady (a návrh řešení)

#### 11.1 Typy projektů
**Rozpor:**
- „Kanonický domain dictionary“ uvádí 8 typů (včetně „průmyslový“ a „hospitality“)
- „Zadání projektu do systému“ uvádí 9 typů (včetně retail a energetika)
- „Vstupní data o investorovi“ uvádí zkrácený seznam (6 typů)

**Návrh sjednocení (v tomto dokumentu už použito):**
- kanonický seznam = 9 typů podle „Zadání projektu do systému“
- zkrácený seznam u investora je pouze podmnožina
- „Kanonický domain dictionary“ aktualizovat (nebo udržovat mapování)

#### 11.2 Formy financování
**Rozpor:**
- existují minimálně tři různé seznamy forem

**Návrh sjednocení (v tomto dokumentu už použito):**
- kanonický seznam pro zadání tiketu = seznam v kapitole 8.4 (Forma financování)
- detailní parametry instrumentu (seniorita, konverzní poměr, struktura kapitálového vstupu) se řeší v podmínkách tiketu a ve smluvní dokumentaci

#### 11.3 Směnka jako zajištění
**Rozpor:**
- některé podklady obsahují směnku jako explicitní typ zajištění
- kanonický slovník ji neobsahuje

**Návrh:**
- přidat „Směnka“ jako volitelný typ zajištění po právním potvrzení
- do té doby používat „Jiné zajištění“ + volný popis

#### 11.4 Investor jako uživatel
**Rozpor:**
- tabulka práv a viditelnosti počítá s investorem jako přihlášeným uživatelem
- kanonické rozhodnutí: investor přístup nemá

**Návrh:**
- vyřadit investora z matice oprávnění v uživatelském rozhraní
- ponechat investora pouze jako evidovanou entitu a příjemce dokumentů k podpisu

#### 11.5 Datum narození investora
**Rozpor:**
- v podkladech se objevuje datum narození investora
- kanonické rozhodnutí: datum narození se nesbírá

**Návrh:**
- datum narození neimplementovat v první verzi
- pokud bude později vyžadováno, doplnit jako administrátorské pole (s odůvodněním sběru a omezením přístupu)

#### 11.6 Fakturace provizí (kdo fakturuje komu)
**Rozpor:**
- pilotní materiály obsahují variantu, kdy „obchodník vystaví fakturu“ a developer ji přímo hradí (obchodník fakturuje developerovi)
- kanonické obchodní nastavení platformy je ale postavené na tom, že provizi vůči developerovi uplatňuje platforma a následně ji rozděluje obchodníkům

**Kanonické rozhodnutí (aktuální):**
- developer hradí provizi platformě (podle smlouvy platforma ↔ developer)
- obchodník vystavuje fakturu **platformě** na svoji část provize (podle podkladů od platformy)

**Dopad do implementace:**
- v uživatelském rozhraní obchodníka musí existovat krok „vyfakturovat provizi“ + nahrání dokladu
- v administraci musí existovat evidence faktur (číslo, vystavil, komu, částka, splatnost, stav, soubor) + možnost označit jako zaplacené




#### 11.7 Konkurence a rezervace na tiketu

**Nesoulad v podkladech:**
- některé starší verze popisovaly, že se tiket po první aktivaci „zamkne“ pro ostatní obchodníky.

**Kanonické pravidlo (finální):**
- tiket se **nezamyká** na jednoho obchodníka,
- každý tiket má kapacitu (např. 1 / 2 / 3), kolik rezervací může být současně „v kapacitě“,
- **přednost získává ten, kdo dřív zajistí podpis investora** (pořadí se určuje podle data a času podpisu investora; u fyzického podpisu podle času nahrání scanu),
- podpis developera pořadí **neovlivňuje**,
- pokud rezervace v kapacitě odpadne (developer odmítne, vyprší lhůta, zrušení), systém automaticky posune další rezervaci z fronty,
- jakmile jedna rezervace dosáhne financování, ostatní rezervace na tiketu automaticky zanikají.

### 12. Datový slovník (MVP, bez technických kódů)

Tato kapitola převádí „formuláře“ a „entity“ do jednotného **datového slovníku**, aby:
- programátor přesně věděl, jaká data musí existovat a jak se validují,
- návrhář uživatelského rozhraní věděl, co je povinné, co je citlivé a kdo to vidí.

Poznámky:
- Používáme **lidské názvy polí** (bez strojových klíčů).
- „Kdo vidí“ je myšleno pro **uživatelské rozhraní platformy**; dokumenty pro podpis mohou obsahovat více údajů.

#### 12.0 Společné konvence napříč systémem

**Společná pole (doporučení pro všechny entity):**
- Interní identifikátor záznamu (unikátní, generuje systém).
- Datum a čas vytvoření.
- Datum a čas poslední změny.
- Kdo záznam vytvořil / změnil (uživatel nebo administrátor).
- Stav záznamu (pokud entita má stavový tok).
- Auditní stopa (záznam změn stavů, limitů a finančních údajů).

**Práce s částkami a procenty:**
- Částky ukládáme pouze v korunách českých s přesností na haléře.
- Procenta ukládáme v rozsahu 0–100; pokud jde o rozdělení, součet musí být 100.

**Maskování identity:**
- Identita investora a identita projektu (název projektu a developer) se v uživatelském rozhraní odemykají až po aktivaci rezervace.
- Administrátor vidí vždy vše.

---

#### 12.1 Uživatelský účet

| Pole | Typ / formát | Povinnost | Vyplňuje | Kdo vidí | Validace / poznámka |
|---|---|---|---|---|---|
| Interní identifikátor účtu | text (unikátní identifikátor) | ano | systém | administrátor | nemění se |
| Role účtu | výběr: administrátor / obchodník / developer | ano | systém / administrátor | administrátor | zásadní pro oprávnění |
| Přihlašovací e-mail | e-mail | ano | uživatel | administrátor | musí být unikátní |
| Telefon | telefon | doporučeno | uživatel | administrátor | formát včetně předvolby |
| Stav účtu | výběr (viz kapitola 8.8) | ano | administrátor | administrátor | změna stavu = audit |
| Datum registrace | datum a čas | ano | systém | administrátor | |
| Ověřil administrátor | odkaz na administrátora | volitelné | administrátor | administrátor | vyplní se při ověření |
| Datum ověření | datum a čas | volitelné | administrátor | administrátor | |
| Poznámka k ověření | text | volitelné | administrátor | administrátor | interní |

---

#### 12.2 Profil obchodníka

| Pole | Typ / formát | Povinnost | Vyplňuje | Kdo vidí | Validace / poznámka |
|---|---|---|---|---|---|
| Typ subjektu | výběr: fyzická osoba / právnická osoba | ano | obchodník | administrátor, obchodník | určuje povinná pole |
| Jméno a příjmení | text | podmíněně | obchodník | administrátor, obchodník | povinné pro fyzickou osobu |
| Název společnosti | text | podmíněně | obchodník | administrátor, obchodník | povinné pro právnickou osobu |
| Identifikační číslo osoby | text | podmíněně | obchodník | administrátor, obchodník | povinné pro právnickou osobu |
| Adresa bydliště / sídla | text | ano | obchodník | administrátor, obchodník | |
| Kontaktní e-mail | e-mail | ano | obchodník | administrátor, obchodník | může být stejný jako přihlašovací |
| Kontaktní telefon | telefon | ano | obchodník | administrátor, obchodník | |
| Region působnosti | vícenásobný výběr (kraje) | ano | obchodník | administrátor, obchodník | používá se pro filtrování a onboarding |
| Specializace | vícenásobný výběr | volitelné | obchodník | administrátor, obchodník | doporučeno pro matching |
| Preferovaný způsob komunikace | výběr | volitelné | obchodník | administrátor, obchodník | |
| Úroveň obchodníka | výběr: Partner / Premium / Elite | ano | administrátor | administrátor, obchodník | navazuje na limit slotů |
| Limit aktivních rezervací (slotů) | číslo (celé) | ano | administrátor | administrátor, obchodník | výchozí dle úrovně |
| Rámcová smlouva s platformou | potvrzení + datum | ano | obchodník | administrátor | může být elektronický podpis |
| Dohoda o mlčenlivosti | potvrzení + datum | ano | obchodník | administrátor | |
| Provizní podmínky | potvrzení + datum | ano | obchodník | administrátor | |
| Etický kodex | potvrzení + datum | ano | obchodník | administrátor | |
| Souhlas se zpracováním osobních údajů | potvrzení + datum | ano | obchodník | administrátor | |

**Doporučená doplnění pro finance (prakticky nutná kvůli výplatám a fakturaci):**
- bankovní účet pro výplatu provizí obchodníkovi (číslo účtu nebo mezinárodní číslo účtu, měna)
- fakturační adresa (pokud se liší od adresy sídla/bydliště)
- daňové identifikační číslo (pokud existuje)
- status plátce daně z přidané hodnoty (ano/ne) – pro správné vystavení dokladu


---

#### 12.3 Profil developera

| Pole | Typ / formát | Povinnost | Vyplňuje | Kdo vidí | Validace / poznámka |
|---|---|---|---|---|---|
| Typ subjektu | výběr: právnická osoba / fyzická osoba podnikatel | ano | developer | administrátor, developer | |
| Název společnosti | text | ano | developer | administrátor, developer | |
| Identifikační číslo osoby | text | ano | developer | administrátor, developer | |
| Daňové identifikační číslo | text | volitelné | developer | administrátor, developer | |
| Sídlo společnosti | text | ano | developer | administrátor, developer | |
| Země registrace | text | ano | developer | administrátor, developer | |
| Kontaktní e-mail | e-mail | ano | developer | administrátor, developer | |
| Kontaktní telefon | telefon | ano | developer | administrátor, developer | |
| Oprávněná osoba – jméno | text | ano | developer | administrátor, developer | |
| Oprávněná osoba – funkce | text | ano | developer | administrátor, developer | |
| Oprávněná osoba – e-mail a telefon | e-mail + telefon | ano | developer | administrátor, developer | |
| Zaměření | vícenásobný výběr (typy projektů) | volitelné | developer | administrátor, developer | podporuje párování |
| Regiony působnosti | vícenásobný výběr (kraje) | volitelné | developer | administrátor, developer | |
| Typické financování | výběr | volitelné | developer | administrátor, developer | informativní |
| Stav účtu | výběr (viz kapitola 8.8) | ano | administrátor | administrátor | |
| Rámcová smlouva s platformou | potvrzení + datum | doporučeno | administrátor | administrátor | v některých podkladech admin-only |
| Anti-obcházející ujednání | potvrzení + datum | doporučeno | administrátor | administrátor | v některých podkladech admin-only |

**Doporučená doplnění pro finance (prakticky nutná):**
- výchozí bankovní účet developera pro financování (pokud se nemění tiket od tiketu)

---

#### 12.4 Investor (záznam v evidenci obchodníka)

| Pole | Typ / formát | Povinnost | Vyplňuje | Kdo vidí | Validace / poznámka |
|---|---|---|---|---|---|
| Interní identifikátor investora | text (unikátní identifikátor) | ano | systém | administrátor, obchodník | |
| Vlastník záznamu | odkaz na obchodníka | ano | systém | administrátor, obchodník | investor je vždy „pod obchodníkem“ |
| Typ investora | výběr: fyzická osoba / právnická osoba | ano | obchodník | administrátor, obchodník | |
| Jméno a příjmení / název firmy | text | ano | obchodník | administrátor, obchodník | |
| Identifikační číslo osoby | text | podmíněně | obchodník | administrátor, obchodník | pouze pro právnickou osobu |
| Daňová rezidence | text | ano | obchodník | administrátor, obchodník | |
| E-mail | e-mail | doporučeno | obchodník | administrátor, obchodník | pro podpisy a komunikaci |
| Telefon | telefon | doporučeno | obchodník | administrátor, obchodník | |
| Adresa | text | volitelné | obchodník | administrátor, obchodník | |
| Stav záznamu | výběr (viz kapitola 8.9) | ano | obchodník / administrátor | administrátor, obchodník | blokace = audit |
| Minimální investice | číslo | volitelné | obchodník | administrátor, obchodník | pokud je vyplněno, musí být ≤ maximum |
| Maximální investice | číslo | volitelné | obchodník | administrátor, obchodník | |
| Minimální očekávaný výnos ročně | číslo (v procentech) | volitelné | obchodník | administrátor, obchodník | pouze preference investora |
| Maximální délka investice | číslo + jednotka | volitelné | obchodník | administrátor, obchodník | |
| Preferovaný typ výnosu | výběr: fixní / variabilní / individuálně | volitelné | obchodník | administrátor, obchodník | preference investora |
| Preferovaná výplata výnosu | výběr: měsíčně / čtvrtletně / pololetně / ročně / na konci | volitelné | obchodník | administrátor, obchodník | preference investora |
| Preferované typy projektů | vícenásobný výběr (viz kapitola 8.2) | volitelné | obchodník | administrátor, obchodník | |
| Preferované regiony | vícenásobný výběr (kraje) | volitelné | obchodník | administrátor, obchodník | |
| Preferované formy financování | vícenásobný výběr (viz kapitola 8.4) | volitelné | obchodník | administrátor, obchodník | |
| Požadavek na zajištění | výběr: ano / ne / preferováno | volitelné | obchodník | administrátor, obchodník | |
| Preferované typy zajištění | vícenásobný výběr (viz kapitola 8.5.1) | volitelné | obchodník | administrátor, obchodník | |
| Maximální poměr financování k hodnotě zástavy | číslo (v procentech) | volitelné | obchodník | administrátor, obchodník | poměr investice k hodnotě zástavy |
| Interní poznámka obchodníka | text | volitelné | obchodník | pouze obchodník | nikdy nezobrazovat developerovi |
| Prohlášení obchodníka k právnímu důvodu evidence | potvrzení | doporučeno | obchodník | administrátor | obchodník potvrzuje oprávnění evidovat údaje |

Kanonické rozhodnutí pro ochranu osobních údajů:
- Datum narození investora se v první verzi nesbírá.

---

#### 12.5 Projekt

| Pole | Typ / formát | Povinnost | Vyplňuje | Kdo vidí | Validace / poznámka |
|---|---|---|---|---|---|
| Název projektu | text | ano | developer | administrátor, developer; obchodník až po aktivaci rezervace | před aktivací maskováno |
| Typ projektu | výběr (viz kapitola 8.2) | ano | developer | administrátor, developer; obchodník (anonymně) | používá se pro filtry |
| Stručný popis | text | ano | developer | administrátor, developer; obchodník (zkráceně) | doporučeno 3–5 vět |
| Lokalita – město | text | ano | developer | administrátor, developer; obchodník (bez adresy) | |
| Lokalita – kraj | výběr (kraje) | ano | developer | administrátor, developer; obchodník | |
| Přesná adresa | text | volitelné | developer | administrátor, developer; obchodník až po aktivaci | citlivé |
| Celkový rozpočet projektu | číslo | volitelné | developer | administrátor, developer | |
| Vlastní kapitál | číslo | volitelné | developer | administrátor, developer | |
| Cizí zdroje – typ | výběr | volitelné | developer | administrátor, developer | |
| Cizí zdroje – výše | číslo | volitelné | developer | administrátor, developer | |
| Stavební stav / povolení | výběr: ano / ne / ve vývoji | volitelné | developer | administrátor, developer | |
| Vlastnický stav | výběr: vlastník / speciální účelová společnost | volitelné | developer | administrátor, developer | |
| Dokumenty projektu | soubory | volitelné | developer | administrátor, developer; obchodník až po aktivaci (dle nastavení) | přístup řízený |
| Stav projektu | výběr (viz kapitola 8.10) | ano | developer / administrátor | administrátor, developer | publikace až po schválení |

---

#### 12.6 Tiket / nabídka

| Pole | Typ / formát | Povinnost | Vyplňuje | Kdo vidí | Validace / poznámka |
|---|---|---:|---|---|---|
| Projekt | reference | ano | systém | všichni (dle maskování) | Parent projekt |
| Dlužník | text | ano | developer | administrátor, developer | |
| Typ tiketu | výběr | ano | developer | všichni (anonymiz.) | Dluhový / Kapitálový |
| Cílová částka financování | number (CZK) | ano | developer | všichni (anonymiz.) | |
| Minimální investice | number (CZK) | ne | developer | všichni (anonymiz.) | |
| Předpokládaný výnos | number (%) | ano | developer | všichni (anonymiz.) | |
| Doba splatnosti | integer (měsíce) | ano | developer | všichni (anonymiz.) | |
| Bankovní účet developera | text | ano | developer | administrátor, developer | Bez bankovní integrace; slouží pro instrukce k převodu |
| Zveřejněno od | datum a čas | ano (při publikaci) | systém / administrátor | všichni | Start zveřejnění |
| Zveřejněno do | datum a čas | volitelné | administrátor | všichni | Konec zveřejnění; po vypršení se nabídka skryje a nelze vytvářet nové rezervace |
| Kapacita rezervací na tiketu (celkem) | integer | ano | administrátor | administrátor, developer | Výchozí 3; **do kapacity se počítají rezervace od podpisu investora** (čeká na podpis developera / aktivní / jednání). Rezervace před podpisem investora kapacitu neblokují. |
| Pravidlo konkurence na tiketu | enum | ano | administrátor | administrátor, developer | Výchozí: „sdílené sloty podle podpisu investora“ – pořadí určuje čas podpisu investora; v kapacitě jsou vždy první N rezervací |
| Čas na podpis investora | duration | ano | administrátor | administrátor | Výchozí 48h |
| Čas na podpis developera | duration | ano | administrátor | administrátor | Výchozí 48h |
| Čas na jednání / financování od aktivace rezervace | duration | ano | administrátor | administrátor | Výchozí 30 dní |
| Splatnost developera pro úhradu provize platformě | duration | ano | administrátor | administrátor | Výchozí 14 dní |
| Splatnost platformy pro výplatu obchodníkovi po přijetí platby | duration | ano | administrátor | administrátor | Výchozí 3 dny |
| Provize platformy (primárně Kč) | number (CZK) | ano | administrátor | administrátor | Dle smlouvy s developerem |
| Provize platformy (sekundárně %) | number (%) | ne | administrátor | administrátor | Informativně |
| Rozdělení provize (platforma / broker1 / broker2) | procenta (sum=100) | ano | administrátor | administrátor | Ručně zadávané podíly; výchozí příklad 50/25/25 |
| Stav tiketu | výběr | ano | systém / administrátor | administrátor, developer | |

#### 12.7 Rezervace

| Pole | Typ | Povinné | Kdo zadává | Kdo vidí | Poznámka |
|---|---|---|---|---|---|
| ID rezervace | string/uuid | ano | systém | všichni (dle práv) | Interní identifikátor. |
| Tiket | FK | ano | obchodník | admin, developer, obchodník | Tiket, na který je rezervace navázána. |
| Investor | FK | ano | obchodník | admin, obchodník | Developer vidí investora až po aktivaci. |
| Obchodník (iniciátor) | FK | ano | systém | admin, obchodník | Developer vidí jméno obchodníka až po aktivaci. |
| Stav rezervace | enum | ano | systém/admin | všichni (dle práv) | Viz 8.12. |
| Metoda podpisu investora | enum | ano | obchodník | admin, obchodník | Elektronicky / fyzicky + scan. |
| Metoda podpisu developera | enum | ano | developer | admin, developer | Elektronicky / fyzicky + scan. |
| Scan podepsané smlouvy (developer) | file/id | volitelně | developer | admin, developer | Povinné pokud metoda = fyzicky + scan. |
| Dokument k podpisu – rezervační smlouva | file/id | ano | systém | admin, obchodník, developer | Generuje se při odeslání k podpisu; obchodník i developer mohou stáhnout PDF pro fyzický podpis. |
| Scan podepsané smlouvy (investor) | file/id | volitelně | obchodník | admin, obchodník | Povinné pokud metoda = fyzicky + scan. |
| Datum a čas podpisu investora | datetime | ano (při podpisu) | systém/obchodník | admin, obchodník; developer po aktivaci | U fyzického podpisu se vyplní při nahrání scanu (neověřuje se obsah; slouží jako evidence). |
| Pořadí rezervace na tiketu (odvozené) | integer | ne | systém | admin, obchodník (jen vlastní rezervace); developer | Pořadí se počítá dle času podpisu investora; **přepočítává se**, pokud některá rezervace zanikne. Používá se pro rozhodnutí, kdo je v kapacitě. |
| V kapacitě tiketu | boolean | ne | systém | admin, developer, obchodník (jen vlastní rezervace) | Ano = rezervace je v top N dle pořadí (N = kapacita tiketu); pouze tyto rezervace čekají na podpis developera. |
| Datum a čas podpisu developera | datetime | ano (při podpisu) | systém | admin, developer; obchodník | |
| Termín podpisu investora (deadline) | datetime | ano | systém/admin | admin, obchodník | Výchozí 48 h; upravitelné a prodlužitelné. |
| Termín podpisu developera (deadline) | datetime | ano | systém/admin | admin, developer | Výchozí 48 h; počítá se od chvíle, kdy je rezervace v kapacitě; upravitelné a prodlužitelné. |
| Termín konce jednání | datetime | ano | systém/admin | admin, developer, obchodník | Výchozí 30 dní od aktivace; prodlužitelné. |
| Datum aktivace | datetime | ano (při aktivaci) | systém | admin, developer, obchodník | V tento okamžik se odemknou identity a běží jednání. |
| Datum financování (přijetí na účet developera) | datetime | volitelně | developer (administrátor může override) | administrátor, developer, obchodník (jen vlastní rezervace) | Ručně potvrzeno developerem; **od tohoto data běží lhůty**. |
| Profinancovaná částka | money | volitelně | developer (administrátor může override) | administrátor, developer, obchodník (jen vlastní rezervace) | Potvrzená částka přijatá na účet developera; slouží jako základ provize. |
| Podklady k financování | file/id | volitelně | developer (administrátor může nahrát) | administrátor | Např. potvrzení / výpis; platforma obsah neověřuje, slouží pro audit. |
| Poznámka / důvod | text | volitelně | admin/obchodník/developer | admin | Např. důvod zrušení, incident. |
| GDPR potvrzení investora | datetime/text | volitelně | systém/obchodník | admin | Evidence, že investor obdržel GDPR informace a potvrdil je (typicky podpisem smlouvy / přílohy). |

#### 12.8 Provize a vypořádání

Provize se skládá ze dvou rovin:
1) **nárok platformy vůči developerovi** (vzniká až po financování),
2) **výplata obchodníkům** (vzniká až po úhradě provize platformě).

| Pole | Typ / formát | Povinnost | Vyplňuje | Kdo vidí | Validace / poznámka |
|---|---|---|---|---|---|
| Základ provize (profinancovaná částka) | číslo | ano (pro úspěch) | systém (z rezervace) / administrátor (override) | administrátor | vychází z potvrzení financování developerem |
| Procento provize platformy | číslo (v procentech) | volitelné | administrátor | administrátor | doplňkové |
| Částka provize platformy | číslo (koruna česká) | ano | administrátor | administrátor; developer informativně | primární údaj |
| Datum vzniku nároku | datum a čas | volitelné | systém | administrátor | nastává při „financováno“ |
| Splatnost provize developerem | datum a čas | ano | systém | administrátor | výchozí 14 dnů |
| Datum úhrady provize platformě | datum a čas | volitelné | administrátor | administrátor | po připsání platby |
| Stav provize | výběr (viz kapitola 8.13) | ano | systém | administrátor, obchodník (omezeně) | obchodník nesmí vidět „jistotu“ dříve |
| Rozdělení provize – verze | číslo | ano | systém | administrátor | změna rozdělení = nová verze |
| Typ rozdělení | výběr: výchozí / individuální | volitelné | administrátor | pouze administrátor | pro audit a reporting |
| Důvod rozdělení | text | volitelné | administrátor | pouze administrátor | interní poznámka, nikdy nezobrazovat uživatelům |
| Podíl platformy | procenta | ano | administrátor | administrátor | součet 100 |
| Podíl obchodníka 1 | procenta | ano | administrátor | administrátor | |
| Podíl obchodníka 2 | procenta | ano | administrátor | administrátor | může být 0 |
| Částka pro obchodníka 1 | číslo (koruna česká) | odvozené | systém | administrátor | zaokrouhlení definovat |
| Částka pro obchodníka 2 | číslo (koruna česká) | odvozené | systém | administrátor | |
| Termín výplaty obchodníkům | datum a čas | ano | systém | administrátor | výchozí 3 dny |
| Datum výplaty obchodníkům | datum a čas | volitelné | administrátor | administrátor | |
| Datum poskytnutí podkladů k fakturaci obchodníkům | datum a čas | volitelné | systém | administrátor | po úhradě provize platformě |
| Související faktury | seznam odkazů | volitelné | systém | administrátor | 0 až 1 faktura platformy developerovi + 0 až 2 faktury obchodníků platformě |

**Poznámka k prezentaci:**
- V uživatelském rozhraní zobrazujeme primárně částky v korunách českých.


**Poznámka k dani z přidané hodnoty:**
- Vypočtené částky provize pro obchodníky jsou **základ bez daně z přidané hodnoty**.
- Daň z přidané hodnoty (pokud ji obchodník uplatňuje) je řešena až na faktuře obchodníka platformě a **nezvyšuje** samotný výpočet provize (je to daňový režim vystavitele).

---

#### 12.9 Doklady a platby (praktická vrstva)

Kanonické nastavení pro provize:
- developer hradí provizi platformě (platforma je příjemce)
- obchodník (tipař/broker) fakturuje platformě svoji část provize (platforma je odběratel)

Doporučení:
- systém eviduje **platební události** (kdo, komu, kdy a kolik zaplatil) i **doklady** (faktury) jako soubory. Je to důležité pro audit, účetnictví a řešení sporů.

Kanonické omezení:
- Platforma standardně **neřeší dobropisy ani storna** jako samostatné dokumentové toky. Pokud nastanou výjimečně, evidujeme je pouze jako poznámku / stav „zrušena“ a řešení proběhne mimo platformu.

##### 12.9.1 Typy faktur v systému
1) Faktura platformy developerovi (pohledávka platformy za provizi)
2) Faktura obchodníka platformě (závazek platformy za vyplacení podílu)

> Poznámka: v pilotních materiálech se objevuje varianta, kde obchodník fakturuje developerovi. Tato varianta se v kanonickém procesu nepoužívá.

##### 12.9.2 Minimální datová pole faktury (společná vrstva)

| Pole | Typ / formát | Povinnost | Vyplňuje | Kdo vidí | Validace / poznámka |
|---|---|---|---|---|---|
| Typ faktury | výběr: platforma → developer / obchodník → platforma | ano | systém | administrátor | určuje viditelnost a workflow |
| Vazba na provizi | odkaz | ano | systém | administrátor | faktura je vždy navázaná na provizní záznam |
| Vazba na tiket | odkaz | ano | systém | administrátor | pro dohledatelnost |
| Číslo dokladu | text | ano | vystavitel | administrátor + vystavitel + příjemce | musí být unikátní v rámci vystavitele |
| Vystavil | odkaz na subjekt | ano | systém / vystavitel | administrátor + vystavitel + příjemce | platforma nebo obchodník |
| Komu | odkaz na subjekt | ano | systém / vystavitel | administrátor + vystavitel + příjemce | developer nebo platforma |
| Datum vystavení | datum | ano | vystavitel | administrátor + vystavitel + příjemce | |
| Datum splatnosti | datum | ano | vystavitel (výchozí z podkladů) | administrátor + vystavitel + příjemce | výchozí termíny nastavitelné administrátorem |
| Částka celkem | číslo (koruna česká) | ano | vystavitel | administrátor + vystavitel + příjemce | vždy v korunách českých |
| Rozpad daně z přidané hodnoty | struktura | volitelné | vystavitel | administrátor + vystavitel + příjemce | podle toho, zda je vystavitel plátcem |
| Identifikace platby | text | doporučeno | systém | administrátor + vystavitel + příjemce | například variabilní symbol (pouze čísla, maximálně 10 číslic) / zpráva pro příjemce / případně specifický a konstantní symbol; bez napojení na banku je to podpůrné pole pro ruční párování |
| Stav faktury | výběr | ano | systém / administrátor | administrátor + vystavitel + příjemce | návrh: rozpracovaná / odeslaná / přijata / schválena / uhrazena / po splatnosti / zrušena (výjimečně) / sporná |
| Soubor dokladu | soubor | doporučeno | vystavitel | administrátor + vystavitel + příjemce | v první verzi jako nahrání souboru (například PDF) |
| Poznámka administrátora | text | volitelné | administrátor | pouze administrátor | interní |

##### 12.9.3 Vazba na proces (stručně)
- Faktura platformy developerovi: vzniká po financování a slouží jako podklad pro úhradu provize platformě (pokud fakturaci vůči developerovi používáme).
- Faktura obchodníka platformě: vzniká po úhradě provize developerem platformě; platforma poskytne podklady k fakturaci, obchodník vystaví doklad a platforma ho uhradí.


##### 12.9.4 Daň z přidané hodnoty (praktické pravidlo)

- Systém počítá provize a podíly **v korunách českých jako základ** (bez daně).
- Pokud obchodník vystavuje fakturu jako plátce daně z přidané hodnoty, uvede na faktuře daň (a platforma hradí fakturu včetně daně).
- Platforma pro účely fakturace poskytuje obchodníkovi i **výpočet daně z přidané hodnoty** (sazba, částka, celkem) podle toho, zda je obchodník plátce. Je to podklad pro fakturu, nikoliv právní garance.
- U faktury platformy vůči developerovi musí být pro každou transakci explicitně zvoleno, zda je doklad **s daní z přidané hodnoty / bez daně z přidané hodnoty** (dle účetnictví). Jakmile je doklad vystaven, hodnoty se zpětně nemění; případná oprava jde mimo platformu (příloha: opravný doklad) a v platformě se eviduje důvod.
- Dobropisy a storna se v platformě neočekávají; pokud nastanou, řeší se mimo platformu a v systému se vede pouze záznam o výsledku a důvodu.

---

#### 12.10 Auditní záznam

| Pole | Typ / formát | Povinnost | Vyplňuje | Kdo vidí | Validace / poznámka |
|---|---|---|---|---|---|
| Typ události | výběr | ano | systém | administrátor | např. změna stavu rezervace |
| Dotčená entita | text | ano | systém | administrátor | projekt/tiket/rezervace/… |
| Identifikátor dotčeného záznamu | text | ano | systém | administrátor | |
| Kdo akci provedl | odkaz na uživatele | ano | systém | administrátor | |
| Datum a čas | datum a čas | ano | systém | administrátor | |
| Popis změny | text | volitelné | systém | administrátor | může být automatické |
| Před / po | text (shrnutí) | volitelné | systém | administrátor | bez citlivých osobních údajů |

---

#### 12.11 Spor / incident

| Pole | Typ / formát | Povinnost | Vyplňuje | Kdo vidí | Validace / poznámka |
|---|---|---|---|---|---|
| Typ incidentu | výběr | ano | administrátor | administrátor | procesní / finanční / právní / bezpečnostní |
| Závažnost | výběr | ano | administrátor | administrátor | nízká / střední / vysoká / kritická |
| Dotčené záznamy | odkazy | ano | administrátor | administrátor | rezervace, tiket, provize… |
| Popis | text | ano | administrátor | administrátor | |
| Stav řešení | výběr | ano | administrátor | administrátor | otevřeno / v řešení / vyřešeno / uzavřeno |
| Přiděleno | odkaz na administrátora | volitelné | administrátor | administrátor | |
| Výsledek | text | volitelné | administrátor | administrátor | |


#### 12.12 Pool bonus program (datový model)

| Pole | Typ / formát | Povinnost | Vyplňuje | Kdo vidí | Poznámka |
|---|---|---:|---|---|---|
| Aktivní | boolean | ano | administrátor | administrátor | Zapnutí/vypnutí programu |
| Procento do Poolu | number (%) | ano | administrátor | administrátor | Výchozí 10 % z podílu platformy (bez daně z přidané hodnoty) |
| Meta 1 – základ | Kč | ano | administrátor | administrátor | Výchozí 100 000 000 Kč |
| Meta 2 – základ | Kč | ano | administrátor | administrátor | Výchozí 200 000 000 Kč |
| Meta 1 – pro období | Kč | odvozené | systém | administrátor | U zkráceného prvního období přepočet dle 10.7.1 |
| Meta 2 – pro období | Kč | odvozené | systém | administrátor | U zkráceného prvního období přepočet dle 10.7.1 |
| Limit kvalifikovaných | number | ano | administrátor | administrátor | Výchozí 3 (první tři, kteří dosáhnou mety 1) |
| Období | datum od / datum do | ano | systém | administrátor | Standardně pololetí (viz 10.7.1) |
| Uzávěrka období | datum a čas | ano | systém | administrátor | Výchozí datum‑do + 14 dní; do uzávěrky lze započítat pozdní potvrzení úhrad |
| Stav období | enum | ano | systém | administrátor | Otevřené / uzavřené / vyplacené |
| Počáteční zůstatek | Kč | ano | systém | administrátor | Včetně převodu z minulého období |
| Příspěvky (seznam) | list(reference) | ano | systém | administrátor | Každý příspěvek má vazbu na provizi/tiket |
| Zůstatek Poolu | Kč | ano | systém | administrátor | Počáteční + příspěvky – výplaty – část ponechaná platformě |
| Rollover pravidlo (0 kvalifikovaných) | enum + % | ano | administrátor | administrátor | Výchozí: 50 % platforma / 50 % převod |
| Ponecháno platformě | Kč | volitelné | systém | administrátor | Jen pokud 0 kvalifikovaných (nebo dle nastavení) |
| Převod do dalšího období | Kč | volitelné | systém | administrátor | Dle rollover pravidla |
| Obrat obchodníka v období | Kč | odvozené | systém | administrátor | Součet profinancovaných částek na tiketech, kde je obchodník obchodník 1 a/nebo obchodník 2; pokud v obou rolích, počítá se jen jednou (viz 10.7.2) |
| Čas dosažení mety 1 | datum a čas | odvozené | systém | administrátor | Pro pořadí kvalifikovaných (tie‑break) |
| Čas dosažení mety 2 | datum a čas | odvozené | systém | administrátor | Pro určení vítěze „vítěz bere vše“ |
| Kvalifikovaní | list(struktura) | odvozené | systém | administrátor | Max 3 položky: obchodník, obrat, čas dosažení mety 1, anonymní označení |
| Výherce mety 2 | reference (obchodník) | volitelné | systém | administrátor | Vyplněno jen pokud někdo dosáhne mety 2 |
| Rozdělení Poolu | list(struktura) | odvozené | systém | administrátor | Buď 100 % pro výherce mety 2, nebo poměrné rozdělení dle obratu mezi kvalifikovanými |
| Vyplaceno dne | datum | volitelné | administrátor | administrátor | |
| Auditní poznámka / rozhodnutí | text | volitelné | administrátor | administrátor | Povinné při ručním zásahu |



---

#### 12.13 Žádost o úpravu tiketu (developer → administrátor)

| Pole | Typ / formát | Povinnost | Vyplňuje | Kdo vidí | Poznámka |
|---|---|---:|---|---|---|
| Tiket | reference | ano | developer | administrátor, developer | na který tiket se změna vztahuje |
| Podal | reference (uživatel) | ano | systém | administrátor | developer účet |
| Datum podání | datum a čas | ano | systém | administrátor, developer | |
| Popis změny | text | ano | developer | administrátor, developer | co chce developer změnit a proč |
| Navržené změny | struktura / text | doporučeno | developer | administrátor | admin může převést do konkrétních polí |
| Stav žádosti | výběr | ano | systém / administrátor | administrátor, developer | návrh: rozpracovaná / odeslaná / schválená / zamítnutá / realizovaná |
| Rozhodl administrátor | reference | volitelné | administrátor | administrátor | |
| Datum rozhodnutí | datum a čas | volitelné | administrátor | administrátor, developer | |
| Poznámka administrátora | text | volitelné | administrátor | administrátor, developer | vysvětlení rozhodnutí |
| Tag „upraveno“ na tiketu | boolean | odvozené | systém | všichni | po realizaci změny se na tiketu zobrazí informace „upraveno“ |

Poznámky:
- Žádost může být blokovaná, pokud na tiketu existují aktivní rezervace nebo vygenerované žádosti k podpisu investora (viz 10.9).
- Administrátor může udělat výjimku (audit).

---

### 15. Pravidla publikace a blokátory dat

#### 15.1 Co blokuje zveřejnění tiketu

Aby šel tiket zveřejnit (a dával smysl pro obchodníka), doporučené minimum:
- investiční částka
- měna
- očekávaný výnos ročně
- doba trvání
- typ projektu a kraj
- forma financování
- informace, zda je investice zajištěná
- pokud je zajištěná: minimálně jeden typ zajištění
- nastavená provize platformy (částka v korunách českých)

Doporučené (neblokuje v první verzi, ale zvyšuje kvalitu):
- poměr financování k hodnotě zástavy
- znalecký posudek nebo zdroj ocenění
- dokumenty projektu

#### 15.2 Co blokuje odeslání rezervace k podpisu investorovi

- Neexistuje volný slot obchodníka (obchodník je na svém limitu otevřených rezervací).
- Tiket není ve stavu **Zveřejněný** (je rozpracovaný, čeká na schválení, je skrytý nebo expirovaný).
- Tiket je **uzavřený (profinancovaný)** nebo administrátorem deaktivovaný pro nové rezervace.
- Investor nemá vyplněný minimální kontakt (e-mail) pro podpis.
- Chybí potvrzení obchodníka, že má právní důvod investora evidovat a kontaktovat.

Poznámka:
- Pokud je na tiketu aktuálně obsazená kapacita rezervací, rezervaci je stále možné odeslat k podpisu. Po podpisu investora se rezervace zařadí do pořadí (fronty) a do kapacity se dostane až uvolněním místa.

#### 15.3 Validace procent „Využití prostředků“

Pokud developer vyplňuje procentuální rozpad využití prostředků:
- součet musí být přesně 100 %,
- každá položka musí být v rozsahu 0–100 %,
- systém má nabízet kontrolu a nápovědu (například upozornění, že součet je 98 %).


---

### 16. Audit a incident management (Milník 5 – uzavřen)

Cíl:
- mít **dohledatelný důkazový řetězec** (kdo–kdy–co–proč) pro každý klíčový krok,
- umožnit administrátorovi rychle rekonstruovat historii a obhájit zásahy,
- mít jasně definovanou **retenci** (uchování) a **výmaz/anonymizaci** osobních údajů.

Kanonická zásada:
- auditní stopa je **neměnná** (pouze přidávání záznamů),
- žádná ruční oprava nesmí „přepsat minulost“ – vždy vzniká nová auditní událost a (kde je to potřeba) korekční záznam,
- administrátor může změnit vše, ale vždy s **důvodem** a auditní stopou.

---

#### 16.1 Principy auditní stopy

1) **Neměnnost a dohledatelnost**
- Auditní události se po uložení nesmí měnit ani mazat.
- Každá událost má jednoznačné časové razítko a vazbu na entitu (projekt, tiket, rezervace, provize, faktura, výplata, žádost o výmaz).

2) **Rekonstrukce stavu a „pravdy“ v čase**
- Audit musí umožnit odpovědět na otázky:
  - kdo změnu provedl,
  - kdy,
  - co přesně změnil (hodnota před → hodnota po),
  - proč (důvod),
  - jaký byl dopad na finance / lhůty / stav.

3) **Ruční opravy = vždy se značením**
- Pokud administrátor opraví datum/částku/parametr, systém:
  - uloží původní hodnotu,
  - uloží novou hodnotu,
  - označí, že jde o ruční zásah,
  - uloží povinný důvod a volitelnou poznámku,
  - umožní přiložit podklady.

4) **Princip minimálních práv**
- Auditní stopa je primárně pro administrátora.
- Obchodník/developer vidí pouze auditní události vztahující se k jejich vlastním entitám a finančním tokům (například jejich vlastní rezervace, jejich faktury, jejich výplaty).

---

#### 16.2 Co musí být auditováno (minimální rozsah)

Auditní záznam se musí vytvořit minimálně pro:

A) Účty a oprávnění
- vytvoření účtu obchodníka / developera,
- změna stavu účtu (schválení, pozastavení, zablokování),
- změna levelu obchodníka (Partner/Premium/Elite) a slotů.

B) Projekty a tikety
- založení projektu/tiketu,
- schválení a zveřejnění administrátorem,
- změna publikační doby (90 dní a její prodloužení),
- změna kapacity rezervací na tiketu,
- žádost developera o úpravu tiketu + rozhodnutí administrátora,
- ruční skrytí tiketu administrátorem,
- uzavření tiketu (profinancováno) a případné znovuotevření.

C) Rezervace a smlouvy
- založení rezervace,
- odeslání k podpisu,
- podpis investora (včetně času podpisu – rozhoduje pořadí),
- podpis developera,
- aktivace rezervace (odkrytí identit v uživatelském rozhraní),
- expirace podpisových lhůt,
- zánik rezervace (včetně důvodu: financováno jiným investorem, expirace, ruční zásah, atd.),
- nahrání podepsaného skenu (offline podpis) a jeho případná náhrada/odstranění.

D) Finance a provize
- potvrzení financování developerem (datum přijetí na účet + finální profinancovaná částka + volitelný podklad/povinný důvod, pokud podklad chybí),
- ruční oprava financování administrátorem,
- vystavení faktury platforma → developer,
- potvrzení přijetí provize na účet platformy,
- nahrání faktury obchodníka platformě,
- potvrzení výplaty obchodníkovi,
- upozornění na úhradu po splatnosti (developer a administrátor) – minimálně auditní událost.

E) Pool
- připsání obratu do Pool programu (a komu),
- uzávěrka období,
- vyhodnocení výherců,
- potvrzení výplat.

F) Ochrana osobních údajů
- přijetí žádosti o výmaz,
- provedení výmazu/anonymizace,
- případné odmítnutí/omezení žádosti (pokud by existoval zákonný důvod data ponechat).

---

#### 16.3 Struktura auditního záznamu (datový standard)

Každý auditní záznam musí být „strojově čitelný“ a dohledatelný.

**Povinná metadata (minimum):**
- **Kdy**: čas události (časové razítko).
- **Kdo**: identita aktéra (role + identifikátor účtu). Pokud jde o automatizaci, aktér = „Systém“.
- **Co**: název události (česky) + oblast (například „Finance / potvrzení financování developerem“).
- **Nad čím**: typ entity + identifikátor (projekt/tiket/rezervace/faktura/výplata/žádost o výmaz).
- **Změna**: hodnoty „před“ a „po“ (alespoň pro datum financování, částku, stav, rozdělení provize a lhůty).
- **Důvod**: povinné u všech ručních zásahů administrátora (výběr z číselníku + volitelný text).

**Volitelná metadata (doporučené):**
- **Poznámka**: volný text (například „dohoda investora a developera na jiné částce“).
- **Podklady**: odkaz na přiložený soubor + kontrolní otisk (hash) souboru.
- **Korelace**: identifikátor pro propojení více auditních událostí do jedné operace (například aktivace rezervace).

Kanonické pravidlo:
- Ruční opravy administrátora musí být vždy auditované jako samostatná událost a nesmí přepisovat historii beze stopy.

---

#### 16.4 Číselník důvodů zásahu administrátora (výchozí)

Tento číselník slouží pro jednotné důvody u ručních zásahů. Administrátor může přidat nové položky, ale **význam existujících se nemění**.

Výchozí položky:
1) Oprava chybně zadané hodnoty (lidská chyba)
2) Oprava na základě doložených podkladů (doklad / e-mail / prohlášení)
3) Změna finální profinancované částky po dohodě stran (investor–developer)
4) Prodloužení lhůt na žádost stran
5) Zásah kvůli porušení pravidel / obcházení platformy
6) Bezpečnostní incident (zneužití účtu / podezření na podvod)
7) Plnění zákonné povinnosti (například žádost o výmaz osobních údajů)
8) Oprava po interním auditu/incidentu
9) Jiný důvod (povinný popis)

---

#### 16.5 Ruční opravy a korekce dat (kdo, kdy, jak)

**Kdo může provádět ruční opravy:**
- pouze **administrátor**.

**Kanonické pravidlo „korekce místo přepisu“:**
- pokud je potřeba změnit klíčový údaj (datum financování, finální částka, splatnost, režim daně, rozdělení provize), systém:
  - vytvoří korekční záznam (nová verze hodnot),
  - zachová původní hodnoty,
  - označí „platnou“ verzi,
  - vytvoří auditní událost s důvodem a podklady.

**Specificky pro financování (nejcitlivější bod):**
- Financování potvrzuje developer v dashboardu:
  - **datum přijetí peněz na účet developera** (finální datum),
  - **finální profinancovaná částka** (může se lišit od původní),
  - **volitelný podklad (soubor)**,
  - a pokud podklad chybí, **volitelná poznámka / důvod**.
- Jakmile developer financování potvrdí, údaj je pro developera „zamčený“ a případnou opravu řeší administrátor (korekce + audit).

**Dopady korekce financování:**
- Pokud se koriguje datum/částka financování, systém musí:
  - přepočítat provizi a podíly z finální částky,
  - přepočítat splatnost provize developer → platforma (14 dní od data přijetí na účet developera),
  - zachovat auditní stopu, aby bylo zřejmé, proč došlo ke změně.

---

#### 16.6 Retence a mazání osobních údajů (minimum pro první verzi)

V této kapitole definujeme minimum tak, aby:
- byla splněna ochrana osobních údajů,
- a zároveň zůstala zachována auditní dohledatelnost procesů.

**Retence (uchování):**
- Kontaktní údaje investora a další osobní údaje, které obchodník zadal do interní databáze investorů, platforma drží **do doby, než je administrátor smaže**.
- Auditní stopa (auditní události) se drží **5 let**.

**Žádost o výmaz osobních údajů – proces:**
- Žádost může podat:
  - obchodník,
  - investor,
  - developer.
- Žádost se podává přes formulář v platformě a vždy musí vzniknout auditní událost „přijetí žádosti o výmaz“.
- Systém po odeslání žádosti:
  - okamžitě vygeneruje potvrzení přijetí,
  - přiřadí žádost administrátorovi,
  - nastaví termín pro provedení výmazu na **48 hodin** od přijetí.

**Jak se provádí výmaz (pravidlo pro data):**
- Výmaz se provádí jako **anonymizace** investora v provozních datech:
  - odstraní se jméno, e-mail, telefon, adresa a poznámky,
  - investor zůstane jako „anonymizovaný záznam“ kvůli vazbám na rezervace a finance.
- Dokumenty obsahující osobní údaje investora (například skeny) se:
  - odstraní z běžně dostupného úložiště,
  - v systému se ponechá pouze auditní metadata (čas, kdo nahrál, kontrolní otisk souboru),
  - a auditní událost „provedení výmazu“.

**Auditní značení výmazu:**
- Výmaz/anonymizace je auditní událost:
  - kdo,
  - kdy,
  - rozsah (jaké typy údajů byly odstraněny),
  - důvod (typ žádosti),
  - vazba na žádost.

---

#### 16.7 Incident management (minimální datová specifikace)

Typy incidentů:
- procesní (například spor o to, kdo přivedl projekt),
- finanční (například pozdní úhrada provize, reklamace výplaty),
- právní (například obcházení platformy),
- bezpečnostní (například neoprávněný přístup).

Každý incident musí mít minimálně:
- typ,
- závažnost,
- popis,
- stav řešení,
- zodpovědnou osobu,
- výsledek,
- vazby na dotčené entity (tiket/rezervace/provize/doklady).

---

#### 16.8 Kanonické typy auditních událostí (pro filtrování a export)

Cíl: sjednotit názvosloví auditních událostí tak, aby bylo možné je filtrovat a exportovat (bez závislosti na uživatelském rozhraní).

| Oblast | Název auditní události | Kdy vzniká | Povinné doplňující údaje |
|---|---|---|---|
| Financování | Potvrzení financování developerem | Developer potvrdí, že finance od investora dorazily na jeho účet | datum přijetí na účet developera, finální profinancovaná částka, měna (koruna česká), podklady (soubor) nebo poznámka proč chybí |
| Financování | Oprava potvrzení financování administrátorem | Administrátor opraví datum nebo částku potvrzeného financování | původní hodnoty a nové hodnoty, důvod opravy, poznámka, podklady (soubor) |
| Provize | Vystavení faktury platforma → developer | Administrátor vystaví fakturu na provizi platformy (v účetním systému) | číslo faktury, částka bez daně, částka daně, částka celkem, splatnost, režim daně, odkaz na soubor faktury |
| Provize | Potvrzení přijetí provize na účet platformy | Administrátor ručně potvrdí, že provize od developera dorazila na účet platformy | datum přijetí, částka, identifikace platby (například variabilní symbol, zpráva pro příjemce), podklady nebo poznámka |
| Provize | Změna splatnosti provize pro developera | Administrátor změní lhůtu splatnosti pro daný tiket/projekt | původní lhůta a nová lhůta, důvod změny |
| Obchodník | Nahrání faktury obchodníka platformě | Obchodník nahraje fakturu za svůj podíl provize | číslo faktury obchodníka, částka bez daně, částka daně (pokud je obchodník plátce), částka celkem, odkaz na soubor |
| Obchodník | Potvrzení výplaty obchodníkovi | Administrátor potvrdí, že platforma uhradila fakturu obchodníka | datum úhrady, částka, identifikace platby, poznámka |
| Pool | Připsání obratu do Pool programu | Dojde k potvrzení přijetí provize na účet platformy a tím se přičte obrat obchodníkům | vazba na tiket, částka obratu, datum připsání, komu se obrat započetl |
| Pool | Uzávěrka období Pool programu | Administrátor uzavře období (například konec pololetí + nastavená rezerva) | datum uzávěrky, seznam započtených transakcí, stav Poolu (převod/zůstatek) |
| Pool | Vyhodnocení výherců Pool programu | Systém nebo administrátor vyhodnotí první tři kvalifikované obchodníky | dosažené obraty, pořadí, poměry rozdělení, anonymizované označení výherců |
| Pool | Potvrzení výplaty Pool programu | Administrátor potvrdí výplatu Poolu výhercům | datum výplaty, částky, identifikace plateb, podklady |
| Tikety | Změna kapacity rezervací tiketu | Administrátor změní maximální počet aktivních rezervací na tiketu | původní kapacita a nová kapacita, důvod změny |
| Tikety | Změna publikační doby tiketu | Administrátor změní publikační okno tiketu | původní doba a nová doba, důvod změny |
| Výstupy | Vygenerování exportu | Uživatel s oprávněním vygeneruje export do tabulky | typ exportu, použité filtry, počet řádků, rozsah (zda obsahuje osobní údaje), kontrolní otisk souboru (pokud se ukládá) |
| Ochrana osobních údajů | Přijetí žádosti o výmaz | Přijde žádost obchodník/investor/developer o výmaz osobních údajů | kdo žádá, jaké údaje, datum přijetí, termín pro výmaz |
| Ochrana osobních údajů | Provedení výmazu | Administrátor provede výmaz/anonymizaci osobních údajů investora | rozsah výmazu, datum a čas, kdo provedl |

### 17. Administrace a nastavení

Cíl této kapitoly:
- uzamknout **všechny nastavitelné parametry** ("seznam všech čísel") tak, aby implementace nevyžadovala další rozhodnutí,
- jednoznačně určit, **kde** se dá parametr měnit (globálně / per tiket / per rezervaci / per fakturu / per uživatele),
- popsat, **jak se změny auditují** a jaký mají dopad.

Zásada: **administrátor může změnit vše**, ale každá změna musí být dohledatelná (audit) a nesmí zpětně měnit již vydané dokumenty.

#### 17.1 Přehled nastavitelých parametrů (kanonický registr)

> Poznámka: uvádíme doporučené rozmezí. Administrátor může v praxi nastavit i mimo něj, ale systém má minimálně chránit před nesmysly (záporné hodnoty, nulové lhůty, součet podílů ≠ 100 %, atd.).

| Parametr | Kde se nastavuje | Typ / jednotka | Výchozí hodnota | Doporučené rozmezí | Dopad změny | Kdo může měnit |
|---|---|---:|---:|---:|---|---|
| Sloty obchodníka – Partner | Globálně (level) + per obchodník | počet | 10 | 1–200 | nově i okamžitě (podle pravidel) | administrátor |
| Sloty obchodníka – Premium | Globálně (level) + per obchodník | počet | 25 | 1–200 | nově i okamžitě (podle pravidel) | administrátor |
| Sloty obchodníka – Elite | Globálně (level) + per obchodník | počet | 50 | 1–200 | nově i okamžitě (podle pravidel) | administrátor |
| Kapacita rezervací na tiketu | Per tiket | počet | 3 | 1–10 (doporučeno 1–3) | může ovlivnit pořadí „v kapacitě“ i u běžících rezervací | administrátor |
| Publikační okno tiketu | Per tiket (default globálně) | dny | 90 | 7–365 | ovlivní expiraci tiketu (běžící i budoucí) | administrátor |
| Lhůta podpisu investora | Per tiket + per rezervaci | hodiny | 48 | 1–720 | ovlivní deadline podpisu investora (běžící i budoucí) | administrátor |
| Lhůta podpisu developera | Per tiket + per rezervaci | hodiny | 48 | 1–720 | ovlivní deadline podpisu developera (běžící i budoucí) | administrátor |
| Lhůta jednání / financování po aktivaci rezervace | Per tiket + per rezervaci | dny | 30 | 1–365 | ovlivní konec „jednání“ (běžící i budoucí) | administrátor |
| Splatnost provize developer → platforma | Per tiket + per rezervaci | dny | 14 | 1–365 | ovlivní datum splatnosti (běžící i budoucí) | administrátor |
| Lhůta pro výplatu obchodníků po přijetí provize platformou | Globálně (default) | dny | 3 | 0–30 | ovlivní očekávaný termín výplaty | administrátor |
| Sazba provize platformy z profinancované částky | Per projekt (smlouva) / per tiket | procenta | (dle smlouvy) | 0–100 | ovlivní výpočet provize (výpočetní údaj) | administrátor |
| Rozdělení provize (platforma / obchodník 1 / obchodník 2) | Per tiket (ručně) | procenta (součet 100) | 50 / 25 / 25 (příklad) | součet = 100 | ovlivní výplaty obchodníkům | administrátor |
| Povolit obchodníka 2 na tiketu | Per tiket | ano/ne | ano | – | určuje, zda se může evidovat obchodník 2 | administrátor |
| Režim daně z přidané hodnoty na faktuře platforma → developer | Per fakturu | volba | s daní z přidané hodnoty | s/bez daně z přidané hodnoty | určuje, zda se připočítá daň z přidané hodnoty | administrátor |
| Sazba daně z přidané hodnoty (pokud se uplatní) | Globálně (default) | procenta | 21 | 0–30 | ovlivní výpočet daně z přidané hodnoty na faktuře | administrátor |
| Podíl platformy do poolu | Globálně | procenta | 10 | 0–50 (technicky 0–100) | ovlivní výši poolu | administrátor |
| Pool – meta 1 (kvalifikace) | Globálně | Kč | 100 000 000 | 0–(libovolně) | ovlivní kvalifikaci obchodníků | administrátor |
| Pool – meta 2 (vítěz bere vše) | Globálně | Kč | 200 000 000 | ≥ meta 1 | ovlivní režim „vítěz bere vše“ | administrátor |
| Pool – limit kvalifikovaných obchodníků | Globálně | počet | 3 | 1–10 | ovlivní, kolik obchodníků má nárok na podíl | administrátor |
| Pool – uzávěrka období | Globálně | dny po konci období | 14 | 0–60 | určuje, do kdy lze ještě započítat události do období | administrátor |
| Pool – pravidlo při 0 kvalifikovaných | Globálně | procenta (součet 100) | 50 / 50 | součet = 100 | rozdělení: platforma vs převod do dalšího období | administrátor |

#### 17.2 Pravidla změn parametrů a audit

- **Každá změna** parametrů (globální/per tiket/per rezervaci/per fakturu) musí vytvořit auditní událost:
  - kdo změnu provedl,
  - kdy,
  - co změnil,
  - původní hodnota → nová hodnota,
  - **důvod** (povinný výběr z číselníku + volitelná poznámka),
  - případné přílohy.
- Parametry, které ovlivňují finance a dokumenty (provize, daně z přidané hodnoty, splatnosti), nesmí **zpětně měnit**:
  - již vystavené faktury,
  - již uzavřené transakce.
  Pokud je potřeba oprava, řeší se jako **ruční korekce** administrátorem + audit.

#### 17.3 Práva administrátora

- Administrátor má právo změnit jakékoli údaje na platformě.
- Administrátor může:
  - prodlužovat všechny lhůty,
  - měnit kapacitu tiketu,
  - ručně opravovat finanční částky a data (s auditní stopou),
  - měnit režim daně z přidané hodnoty na konkrétní faktuře (pouze před vystavením).

#### 17.4 Nastavení pool programu (souhrn)

Pool program je volitelný bonusový mechanismus (viz kapitola **10.7**). Administrátor nastavuje:
- zda je pool aktivní,
- procento z podílu platformy, které se odvádí do poolu,
- meta 1 a meta 2,
- limit kvalifikovaných obchodníků (výchozí 3),
- uzávěrku období (výchozí 14 dní po konci pololetí),
- pravidlo při 0 kvalifikovaných (výchozí 50 % platforma / 50 % převod).

> Důležité: v této kanonické verzi se **pool nerozděluje podle pevných procent** (např. 50/30/20), ale **poměrově podle dosaženého obratu** mezi kvalifikovanými obchodníky (pokud nikdo nedosáhne mety 2).

### 18. Matching investorů (specifikace bez kódu)

Matching investorů je funkce pro obchodníka: pomáhá mu rychle vybrat, kteří jeho investoři se nejlépe hodí k danému tiketu.

Důležité zásady:
- Matching je **doporučení**, nikoli investiční poradenství.
- Investor nemá účet na platformě, matching je čistě interní nástroj obchodníka (a administrátora).
- Matching musí respektovat maskování identity projektu před aktivací rezervace (obchodník pracuje primárně s parametry pro rozhodnutí).

#### 18.1 Vstupy do matchingu

**Vstupy z tiketu (a projektu):**
- investiční částka a měna
- očekávaný výnos ročně
- doba trvání
- typ projektu a kraj (případně město)
- informace o zajištění (ano/ne) + typy zajištění
- poměr financování k hodnotě zástavy (pokud je vyplněn)
- volitelné tagy (nákup / výstavba / rekonstrukce / refinancování / …)

**Vstupy z investora (záznam v evidenci obchodníka):**
- minimální a maximální investice + preferovaná měna
- minimální očekávaný výnos ročně
- maximální délka investice
- preferované typy projektů
- preferované regiony
- požadavek na zajištění + preferované typy zajištění
- maximální poměr financování k hodnotě zástavy (pokud je vyplněn)

#### 18.2 Pravidla matchingu (MVP)

V první verzi doporučujeme kombinaci:
- **tvrdých filtrů** (pokud nesplní, spadá do „mimo kritéria“),
- **měkkých preferencí** (ovlivňují pořadí a slovní hodnocení).

**Tvrdé filtry (doporučené):**
1) Měna: pokud investor vyžaduje konkrétní měnu, tiket musí být ve stejné měně.
2) Částka: pokud investor má vyplněné minimum/maximum, tiket musí být v rozmezí.
3) Doba: pokud investor má vyplněnou maximální délku investice, tiket nesmí být delší.
4) Region: pokud investor má vyplněné preferované regiony, tiket musí být v jednom z nich.

**Měkké preference (doporučené):**
- očekávaný výnos ročně ≥ minimální očekávaný výnos investora
- shoda typů projektu
- shoda typů zajištění (pokud tiket je zajištěný)
- poměr financování k hodnotě zástavy ≤ limit investora

#### 18.3 Výstupy matchingu

V rozhraní obchodníka doporučujeme tyto výstupy:
- **Seznam investorů** se slovním hodnocením: „Vysoká shoda / Střední shoda / Nízká shoda / Mimo kritéria“.
- U každého investora **důvod shody** (například: „částka v rozsahu, kraj odpovídá, investice zajištěná“).
- Možnost filtrovat investory (například podle minima, regionu, typu projektu).

Poznámka:
- Pokud je investor „Nový“ nebo „Neaktivní“, systém ho v matchingu buď nezobrazuje, nebo zobrazí až po zapnutí filtru.

#### 18.4 Ochrana dat a přístupová práva

- Investor v evidenci je viditelný pouze:
  - vlastníkovi (obchodníkovi),
  - administrátorovi.
- Ostatní obchodníci investory nevidí.

---

### 19. Dokumenty, smlouvy a elektronické podpisy

#### 19.1 Typy dokumentů

- Smlouva developer ↔ platforma (provizní podmínky, splatnosti).
- Smlouva obchodník ↔ platforma (fakturace, výplata provizí, podmínky práce s investorem).
- Rezervační smlouva investor ↔ developer (generovaná systémem).
- GDPR informace a souhlasy pro investora (součást smlouvy nebo samostatný dokument k podpisu).

#### 19.2 Elektronický podpis

- Výchozí varianta pro rezervační smlouvy.
- Odkaz k podpisu se posílá:
  - investorovi e-mailem,
  - developerovi (oprávněné osobě) e-mailem a současně je dostupný i v jeho uživatelském účtu.
- Audit log musí obsahovat: kdo, kdy, jak podepsal.

#### 19.3 Fyzický podpis investora (PDF + scan)

- Obchodník si nechá systémem vygenerovat PDF rezervační smlouvy.
- Investor podepíše fyzicky mimo platformu.
- Obchodník nahraje scan do rozpracované rezervace.
- Nahrání scanu posune rezervaci do fáze „čeká na podpis developera“.
- Platforma obsah scanu neověřuje; scan slouží jako evidence a pro audit.

#### 19.4 Fyzický podpis developera (PDF + scan)

- Developer si stáhne (nebo nechá vygenerovat) PDF rezervační smlouvy.
- Developer podepíše fyzicky mimo platformu.
- Developer nahraje scan do rezervace (alternativně může scan nahrát administrátor).
- Nahrání scanu posune rezervaci do stavu „podepsáno developerem“ (a pokud je podepsáno i investorem, rezervace se aktivuje).
- Platforma obsah scanu neověřuje; scan slouží jako evidence a pro audit.

### 20. Otevřené otázky a rozhodnutí k potvrzení

#### 20.1 Rozhodnutí uzavřená v této verzi

- Měna: platforma pracuje pouze v korunách českých.
- Pool program: dvě mety (meta 1 = kvalifikace pro podílové rozdělení; meta 2 = vítěz bere vše), příspěvek do poolu je z podílu platformy (podíly obchodníků se nekrátí) a v případě absence kvalifikace se část převádí do dalšího období.
- Doba zveřejnění tiketů: výchozí publikační okno je 90 dní; administrátor může upravovat a prodlužovat.
- Potvrzení financování: financování potvrzuje developer (datum přijetí na účet + finální částka + podklady/poznámka). Administrátor může provést opravu s auditní stopou.
- Fakturace a daň z přidané hodnoty: platforma fakturuje developerovi provizi (a dle režimu i daň z přidané hodnoty) a obchodník fakturuje platformě svůj podíl (u plátce včetně daně z přidané hodnoty). Hodnoty na vydaných fakturách se zpětně nemění.
- Podpisní toky: umožněn fyzický podpis (PDF + nahrání scanu) jak pro investora, tak i pro developera.

#### 20.2 Stav k této verzi (data uzamčena)

V této verzi považujeme datová rozhodnutí za **uzamčená**:
- číselník důvodů (kapitola 8.14) je finální pro první verzi,
- uzávěrka poolu je nastavena jako parametr (výchozí 14 dní po konci pololetí) a je upravitelná administrátorem,
- režim daně z přidané hodnoty na faktuře platforma → developer je volba na úrovni každé faktury (před vystavením) a změna se vždy auditně značí.

Pokud bude potřeba doplnit další varianty (např. specifické režimy daně z přidané hodnoty pro zahraniční protistrany), doplní se jako nová kanonická verze po konzultaci s účetnictvím.



### 21. Stavové automaty a automatizace

Tato kapitola je praktická pro programátora (implementace stavů, přechodů a časovačů) a zároveň pomáhá návrháři uživatelského rozhraní (kdy se co zobrazuje a kdy je co povoleno).

Důležité principy:
- **Časové parametry** (lhůty podpisů, jednání, splatnosti, doba zveřejnění) jsou nastavitelné administrátorem a mohou být **prodlužovány**.
- Platforma v první verzi **neověřuje** obsah dokumentů ani platby; slouží jako evidence a audit.
- Po **profinancování** tiketu je tiket uzavřen a ostatní rezervace se automaticky ukončí.


#### 21.0 Stavový automat projektu

Projekt je „kontejner“ pro jeden nebo více tiketů. Stav projektu slouží pro řízení životního cyklu projektu jako celku (schvalování, publikace, uzavření).

| Stav projektu | Co to znamená | Kdo stav nastavuje | Klíčová pravidla |
|---|---|---|---|
| Návrh obchodníka (čeká na zasmluvnění developera) | Obchodník zadal projekt jako lead; platforma musí mimo systém zajistit zasmluvnění developera | obchodník (vytvoří) / administrátor (správa) | Projekt není veřejně publikovaný; slouží jako interní evidence a pipeline pro onboarding developera. |
| Rozpracovaný | Projekt je v přípravě (data a dokumenty se doplňují) | developer / obchodník (zadavatel) / administrátor | Nezobrazuje se jako zveřejněná nabídka; lze doplňovat data a vytvářet tikety. |
| Ke schválení | Projekt byl odeslán administrátorovi ke schválení | systém (po odeslání) | Administrátor může schválit, zamítnout nebo vrátit k doplnění (zpět do Rozpracovaný). |
| Schválený | Projekt schválen, ale ještě nemusí mít zveřejněné tikety | administrátor | Publikace probíhá přes tikety. Projekt může být schválen i před tím, než jsou tikety zveřejněny. |
| Zveřejněný | Projekt má alespoň 1 tiket ve stavu Zveřejněný | systém / administrátor | Projekt je viditelný v nabídce přes své tikety; běží publikační okna tiketů. |
| Skrytý | Projekt byl skryt administrátorem (např. právní důvod, chyba dat) | administrátor | Nové rezervace se nezahajují; konkrétní dopad na tikety je řízen jejich stavem (typicky se skryjí i tikety). |
| Uzavřený | Projekt je ukončen jako celek (např. všechny tikety uzavřeny / projekt stažen) | systém (odvozeně) / administrátor | Uzavření projektu neznamená mazání dat; projekt zůstává jako reference. |
| Zamítnutý | Projekt byl zamítnut administrátorem | administrátor | Projekt a jeho tikety se nezobrazují v nabídce. |

Poznámka:
- Administrátor může stav přepsat (override) i mimo standardní tok, vždy s povinným důvodem a auditní stopou (8.14).

#### 21.1 Stavový automat tiketu

##### 21.1.1 Stavy tiketu (kanonický seznam)

| Stav tiketu | Co to znamená | Kdo stav nastavuje | Klíčová pravidla |
|---|---|---|---|
| Rozpracovaný | Tiket vzniká, ale ještě není odeslán ke schválení | developer / obchodník (zadavatel) | Nezobrazuje se ostatním uživatelům (mimo administrátora). |
| Ke schválení | Tiket byl odeslán administrátorovi ke schválení | systém (po odeslání) | Administrátor rozhoduje: schválit / zamítnout / vrátit k doplnění. |
| Schválený | Tiket je schválen, ale ještě nebyl zveřejněn | administrátor | Administrátor nastaví publikační okno a zveřejní. |
| Zveřejněný | Tiket je aktivně v nabídce a lze zahajovat nové rezervace | systém / administrátor | Běží publikační okno (výchozí 90 dní). |
| Skrytý | Tiket je skrytý z nabídky ručně administrátorem | administrátor | Nové rezervace nelze zahajovat; existující mohou běžet dál podle pravidel níže. |
| Expirovaný | Tiket automaticky expiroval po skončení publikačního okna | systém | Nové rezervace nelze zahajovat; existující mohou běžet dál podle pravidel níže. |
| Uzavřený (profinancovaný) | Financování bylo potvrzeno developerem; tiket je uzavřen | systém (trigger z rezervace) / administrátor (override) | Všechny ostatní rezervace se ukončí jako neúspěšné z důvodu „profinancováno jiným investorem“. |
| Zamítnutý | Administrátor zamítl tiket (například nesplňuje požadavky) | administrátor | Tiket se nezobrazí v nabídce. |

##### 21.1.2 Přechody tiketu (zjednodušeně)

- Rozpracovaný → Ke schválení (odeslání ke schválení)
- Ke schválení → Schválený (schválení administrátorem)
- Ke schválení → Zamítnutý (zamítnutí administrátorem)
- Ke schválení → Rozpracovaný (vrácení k doplnění)
- Schválený → Zveřejněný (publikace)
- Zveřejněný → Skrytý (ručně administrátorem)
- Zveřejněný → Expirovaný (automaticky po uplynutí publikačního okna)
- Skrytý / Expirovaný → Zveřejněný (znovuotevření administrátorem)
- Zveřejněný / Skrytý / Expirovaný → Uzavřený (po potvrzení financování u některé rezervace)

Poznámka:
- V praxi administrátor může mít právo stav **přepsat** (override) i mimo standardní tok (vždy s auditním záznamem).

#### 21.2 Stavový automat rezervace

##### 21.2.1 Stavy rezervace (kanonický seznam)

| Stav rezervace | Co to znamená | Jak se do stavu dostane | Viditelnost / dopad |
|---|---|---|---|
| Rozpracovaná | Obchodník připravuje rezervaci pro investora | vytvoření rezervace obchodníkem | Identita investora je interní pro obchodníka; developer nevidí. |
| Čeká na podpis investora | Rezervační smlouva byla odeslána investorovi (nebo se čeká na nahrání scanu) | odeslání k podpisu / generace dokumentu | Běží lhůta podpisu investora (výchozí 48 hodin). |
| Podepsáno investorem – ve frontě (mimo kapacitu) | Investor podepsal, ale rezervace ještě není v kapacitě tiketu | podpis investora v okamžiku, kdy je kapacita obsazená dřívějšími podpisy | Rezervace je ve frontě, čeká na uvolnění kapacity; developer zatím nepodepisuje. |
| Podepsáno investorem – v kapacitě (čeká na podpis developera) | Rezervace je v top N dle času podpisu investora a čeká na podpis developera | automaticky po vstupu do kapacity (po podpisu investora nebo po posunu ve frontě) | Developer může podepsat elektronicky nebo nahrát scan. |
| Aktivní | Podepsal investor i developer; rezervace se aktivovala | podpis developera (a investor už podepsal) | Od tohoto okamžiku se v rozhraní odemkne identita stran a začne běžet jednání (výchozí 30 dní). |
| Financováno | Developer potvrdil přijetí financování na bankovní účet (včetně data) | ruční potvrzení developerem (administrátor může upravit) | Od data financování běží splatnosti a provize. Zároveň se uzavře tiket. |
| Ukončeno neúspěšně | Rezervace skončila bez financování | automaticky (lhůty) nebo ručně (zrušení) nebo uzavření tiketu jiným investorem | Důvod musí být evidován (například nepodepsal investor, nepodepsal developer, neprofinancováno včas, profinancováno jiným investorem). |
| Spor | Rezervace je dočasně pozastavena (spor / incident / právní dotaz). Systém neumožní žádné nové kroky v rezervaci, dokud administrátor spor neuzavře (vrácením do původního stavu, nebo ukončením rezervace s důvodem). | administrátor | V rezervaci se zobrazí stav „Spor“ a banner, že je pozastavena. Automatické ukončování dle lhůt se pozastaví; administrátor rozhodne o dalším postupu (prodloužení, návrat do procesu, ukončení). |

##### 21.2.2 Fronta a kapacita rezervací na tiketu

- Každý tiket má **kapacitu rezervací** (například 3). Kapacitu lze nastavit administrátorem (a měnit i během života tiketu).
- Do kapacity se počítají rezervace **od okamžiku podpisu investora**.
- Pořadí ve frontě je určeno **časem podpisu investora**.
- V kapacitě jsou vždy **první N rezervací** (N = kapacita). Pokud některá rezervace zanikne, pořadí se **přepočítá** a další rezervace se posune do kapacity.
- Developer podpisuje jen rezervace, které jsou **v kapacitě**.

Důležité: podpis developera **nemění pořadí**. O pořadí rozhoduje vždy podpis investora.

##### 21.2.3 Ukončení ostatních rezervací po profinancování

Jakmile je u jedné rezervace potvrzeno „Financováno“:
- tiket se uzavře,
- všechny ostatní rezervace (včetně těch, které měly podepsáno investorem) se automaticky nastaví na „Ukončeno neúspěšně“ s důvodem „profinancováno jiným investorem“,
- obchodníci jsou informováni, že financování proběhlo jiným investorem.

#### 21.3 Stavový automat provize a vypořádání

Tato část sjednocuje **provizi platformy** (developer → platforma) a následné **vypořádání obchodníků** (obchodníci → platforma faktura / platforma → obchodníci výplata).

Zásadní princip:
- **Nárok platformy** vzniká až po potvrzení profinancování (developer potvrdí přijetí financí na účet).
- **Nárok obchodníků** vzniká až po úhradě provize platformě (administrátor ručně potvrdí přijetí platby platformou).

| Stav provize a vypořádání | Co znamená | Vzniká kdy | Kdo mění |
|---|---|---|---|
| Připraveno (čeká na financování) | Evidence existuje, ale nárok ještě nevznikl | volitelně po aktivaci rezervace (pro tracking) | administrátor |
| Nárok platformy vznikl (financováno) | Developer potvrdil profinancování (známe finální částku a datum) | potvrzení profinancování developerem | systém / administrátor |
| Fakturováno developerovi | Platforma vystavila doklad developerovi (mimo platformu v účetnictví) a eviduje jej v systému | po vzniku nároku | administrátor |
| Čeká na úhradu developerem platformě | Běží splatnost úhrady provize (výchozí 14 dní od data profinancování) | po vystavení dokladu / evidenci | systém |
| Po splatnosti (developer → platforma) | Developer neuhradil včas | automaticky po uplynutí splatnosti | systém |
| Uhrazena platformě | Platforma obdržela úhradu provize na svůj účet | ruční potvrzení administrátorem | administrátor |
| Podklady pro fakturaci obchodníků poskytnuty | Platforma poskytla obchodníkům podklady (částka v Kč, datum, identifikátory) | po úhradě platformě | systém |
| Čeká na faktury obchodníků | Systém očekává, že obchodníci vystaví a dodají faktury platformě | po poskytnutí podkladů | systém |
| Faktury obchodníků přijaty / schváleny | Obchodníci dodali faktury a administrátor je evidoval / schválil | po dodání faktur | obchodník / administrátor |
| Čeká na výplatu obchodníkům | Platforma připravuje výplatu obchodníkům (výchozí 3 dny od přijetí faktur) | po přijetí faktur | systém |
| Po splatnosti (platforma → obchodníci) | Platforma nevyplatila včas | automaticky po uplynutí lhůty | systém |
| Vyplaceno obchodníkům | Výplaty proběhly (bez bankovní integrace – potvrzuje se ručně) | ruční potvrzení administrátorem | administrátor |
| Spor / reklamace | Proces je pozastaven kvůli sporu | ručně (nebo dle pravidla) | administrátor |

Poznámky:
- „Po splatnosti“ je stav, který se dá odvodit z data splatnosti, ale evidujeme jej explicitně pro notifikace a reporting.
- Platforma nemá bankovní integraci: skutečný stav úhrady se potvrzuje ručně administrátorem (s přílohami a auditní stopou).

#### 21.4 Automatizace a časovače

Níže je seznam automatizovaných kroků, které systém provádí bez ruční akce (neobsahuje texty notifikací, pouze události).

##### 21.4.1 Časové expirace

- **Expirace podpisu investora:** pokud investor nepodepíše do termínu, rezervace přejde do „Ukončeno neúspěšně“ (důvod: nepodepsal investor).
- **Expirace podpisu developera:** pokud developer nepodepíše do termínu (počítáno od okamžiku, kdy se rezervace dostane do kapacity), rezervace přejde do „Ukončeno neúspěšně“ (důvod: nepodepsal developer) a systém posune další rezervaci z fronty do kapacity.
- **Expirace jednání:** pokud neproběhne financování do termínu jednání, rezervace přejde do „Ukončeno neúspěšně“ (důvod: neprofinancováno včas) a systém posune další rezervaci z fronty do kapacity.
- **Expirace tiketu:** po uplynutí publikačního okna systém přepne tiket do stavu „Expirovaný“.

##### 21.4.2 Přepočet pořadí a kapacity

Systém přepočítává pořadí (frontu) a to, kdo je v kapacitě, při těchto událostech:
- podpis investora (nový vstup do fronty),
- ukončení rezervace (jakýkoliv důvod),
- změna kapacity tiketu administrátorem.

Při vstupu rezervace do kapacity systém:
- vytvoří požadavek na podpis developera,
- nastaví termín podpisu developera dle nastavení tiketu,
- odešle notifikaci developerovi (a informativně obchodníkovi).

##### 21.4.3 Přechody po financování

- po potvrzení „Financováno“ systém uzavře tiket a ukončí ostatní rezervace,
- vytvoří / aktualizuje provizní záznam (včetně splatností),
- spustí následné lhůty (splatnost developer → platforma, následně výplata obchodníkům).

##### 21.4.4 Bonusový program Pool

Automatizace pro Pool program:
- při každé úhradě provize platformě (ručně potvrzené administrátorem) systém vypočte příspěvek do Poolu jako **X % z podílu platformy bez DPH** a připíše jej do Poolu;
- systém průběžně počítá obrat obchodníků (součet profinancovaných částek) dle pravidel v kapitole **10.7.1** a ukládá čas dosažení **mety 1** a **mety 2**;
- vyhodnocení výplaty:
  - pokud kdokoliv dosáhne **mety 2**, systém označí vítěze (první dle času) a připraví výplatu **100 % Poolu**;
  - jinak po konci období systém:
    - vezme max. **3 první obchodníky**, kteří dosáhli mety 1 (dle času),
    - pokud je kvalifikovaný jen 1 obchodník, získá **100 % Poolu**,
    - pokud jsou 2–3 obchodníci, Pool se rozdělí **poměrově podle jejich obratu** k poslednímu dni období,
    - pokud se nekvalifikuje nikdo, uplatní se převod do dalšího období (výchozí 50 % převod / 50 % zůstává platformě).
- vygeneruje se podklad pro administrátora k výplatě + auditní stopa (výplata je ruční potvrzení, protože platforma nemá bankovní integraci).

Poznámka:
- Mety, procento příspěvku, max. počet kvalifikovaných obchodníků, pravidla uzávěrky a převodu zůstatku jsou **konfigurovatelné administrátorem** (minimálně jako globální parametry).


### 22. Exporty dat (Milník 6 – uzavřen)

Cíl této kapitoly:
- uzamknout **minimální sady exportů do tabulky (Excel)**, které umožní provoz a kontrolu procesů bez další analytiky,
- definovat **minimální sloupce** a **minimální filtrování** pro každý export,
- zajistit, že exporty respektují pravidla ochrany identity a ochrany osobních údajů.

Kanonické rozhodnutí:
- V první verzi jsou exporty chápány jako **„provozní výstupy“** (tabulka pro účetnictví / kontrolu), nikoliv jako analytický modul.
- Exporty jsou v **korunách českých** a neobsahují přepočty měn.
- Exporty jsou auditované (viz kapitola 16.8 – „Vygenerování exportu“).

#### 22.1 Obecná pravidla exportů

**Formát:**
- Primární: **Excel (.xlsx)**.
- (Volitelně) CSV jako doplněk – pouze pokud to bude potřeba pro účetnictví.

**Jazyk a názvosloví:**
- Sloupce jsou pojmenované česky a používají stejné termíny jako tento dokument.

**Datum a čas:**
- Pokud sloupec představuje **datum** (den), používá se formát **RRRR-MM-DD**.
- Pokud sloupec představuje **časovou stopu** (pro pořadí a audit), používá se formát **RRRR-MM-DD HH:MM:SS**.
- Výchozí časová zóna systému: **Česká republika (Evropa/Praha)**.

**Částky:**
- Všechny částky jsou v korunách českých.
- V exportu se uvádí částky na **2 desetinná místa** (haléře) dle pravidel zaokrouhlování v kapitole 10.6.3.

**Metainformace exportu (povinné):**
Každý export musí obsahovat alespoň:
- datum a čas generování,
- kdo export vygeneroval (role + identifikace uživatele),
- použité filtry,
- počet řádků.

**Oprávnění a osobní údaje:**
- Exporty mohou obsahovat osobní údaje (zejména údaje investora). Proto musí systém řídit přístup:
  - administrátor vidí plná data,
  - developer vidí pouze data svých projektů,
  - obchodník vidí pouze rezervace a investory, které eviduje on (nikdy ne investory jiných obchodníků).
- Investor není uživatel platformy a žádné exporty negeneruje.

---

#### 22.2 Export: Profinancované tikety

**Účel:**
- přehled všech tiketu, u kterých došlo k profinancování,
- kontrola finální částky a data přijetí na účet developera,
- podklad pro navazující provizní a účetní procesy.

**Granularita (1 řádek = 1 profinancování):**
- jeden řádek odpovídá tiketu ve stavu „Uzavřený (profinancovaný)“ a jeho úspěšné rezervaci.

##### 22.2.1 Minimální sloupce

**Identifikace:**
- Interní identifikátor projektu
- Název projektu (po odkrytí identit)
- Interní identifikátor tiketu
- Interní identifikátor úspěšné rezervace

**Klasifikace projektu a tiketu:**
- Typ projektu (hlavní)
- Doplňkové tagy projektu (volitelné; procentuální rozpad sum = 100 %)
- Lokalita: kraj
- Lokalita: město
- Forma financování (jedno pole na tiketu)

**Strany a role:**
- Developer: obchodní firma / název
- Developer: identifikační číslo
- Obchodník (hlavní): obchodní firma / jméno
- Obchodník (hlavní): identifikační číslo
- Obchodník 2 (volitelně): obchodní firma / jméno
- Obchodník 2 (volitelně): identifikační číslo
- Investor: identifikace (jméno / firma) – pouze pro role, které ji smí vidět

**Financování (potvrzuje developer):**
- Datum přijetí financí na účet developera (finální datum)
- Čas potvrzení financování developerem (auditní čas)
- Finální profinancovaná částka (může se lišit od původní)
- Podklady k financování (ano/ne)
- Poznámka / důvod (pokud podklady nejsou)
- Ruční oprava financování administrátorem (ano/ne)

**Stavy a kontrola:**
- Stav tiketu
- Stav provize platformy (přehledově: čeká na vystavení / vystaveno / uhrazeno / po splatnosti)

##### 22.2.2 Minimální filtry

- Rozmezí podle **data přijetí financí na účet developera** (od – do)
- Developer
- Typ projektu
- Forma financování
- Stav tiketu
- Stav provize platformy
- Obchodník (hlavní / obchodník 2)

---

#### 22.3 Export: Provize a vypořádání

**Účel:**
- kontrola vzniku nároku na provizi a splatnosti (developer → platforma),
- evidence vystavených dokladů a párování plateb (ručně potvrzované),
- podklady pro obchodníky k fakturaci (platforma → obchodník výplata).

**Granularita (1 řádek = 1 finanční případ):**
- jeden řádek odpovídá jednomu tiketu, u kterého došlo k profinancování a vznikl nárok na provizi.

##### 22.3.1 Minimální sloupce

**Identifikace a vazby:**
- Interní identifikátor projektu
- Název projektu
- Interní identifikátor tiketu
- Developer: identifikace
- Obchodník (hlavní): identifikace
- Obchodník 2 (volitelně): identifikace

**Základ financování:**
- Datum přijetí financí na účet developera (finální datum)
- Finální profinancovaná částka (koruna česká)

**Provize platformy (developer → platforma):**
- Procento provize platformy (dle smlouvy)
- Základ provize platformy bez daně z přidané hodnoty
- Režim daně na faktuře platforma → developer (s daní / bez daně / jiný)
- Daň z přidané hodnoty na faktuře (pokud se uplatňuje)
- Celkem k úhradě developerem (základ + daň)
- Datum vystavení faktury platformy
- Datum splatnosti faktury platformy (14 dnů od data přijetí na účet developera; upravitelné administrátorem)
- Stav úhrady provize platformě (čeká / uhrazeno / po splatnosti)
- Datum přijetí provize na účet platformy (zadává administrátor ručně)

**Platební identifikátory (pro párování):**
- Evidenční číslo dokladu (číslo faktury)
- Variabilní symbol
- Zpráva pro příjemce (volitelné)

**Rozdělení provize platformy (platforma / obchodníci):**
- Rozdělení podílů (platforma / obchodník 1 / obchodník 2) – procenta (součet 100)
- Podíl obchodníka 1 – základ (bez daně)
- Obchodník 1: plátce daně z přidané hodnoty (ano/ne)
- Obchodník 1: daň z přidané hodnoty (pokud je plátce)
- Obchodník 1: celkem k úhradě
- Podíl obchodníka 2 – základ (bez daně)
- Obchodník 2: plátce daně z přidané hodnoty (ano/ne)
- Obchodník 2: daň z přidané hodnoty (pokud je plátce)
- Obchodník 2: celkem k úhradě
- Zbytkový podíl platformy po zaokrouhlení (kontrolní sloupec)

**Doklady obchodníků (obchodník → platforma) a výplaty:**
- Obchodník 1: číslo faktury obchodníka (pokud nahráno)
- Obchodník 1: datum vystavení
- Obchodník 1: datum splatnosti
- Obchodník 1: datum úhrady (zadává administrátor)
- Obchodník 2: číslo faktury obchodníka (pokud nahráno)
- Obchodník 2: datum vystavení
- Obchodník 2: datum splatnosti
- Obchodník 2: datum úhrady (zadává administrátor)

**Bonusový program Pool (přehledově):**
- Příspěvek do Poolu (pokud se uplatňuje; částka)
- Období Poolu (do kterého byl příspěvek zařazen)

##### 22.3.2 Minimální filtry

- Rozmezí podle **data přijetí financí na účet developera** (od – do)
- Rozmezí podle **data splatnosti provize developer → platforma** (od – do)
- Stav úhrady provize platformě (čeká / uhrazeno / po splatnosti)
- Developer
- Obchodník (hlavní / obchodník 2)
- Období Poolu

---

#### 22.4 Export: Bonusový program „Pool“ (období a výsledky)

**Účel:**
- účetní a kontrolní podklad k tomu, jak se Pool plnil, kdo se kvalifikoval a jak byla připravena výplata.

**Poznámka:**
- Detaily sloupců pro export Poolu jsou uvedeny v kapitole **10.7.5 (Report a export pro administrátora)**.

##### 22.4.1 Minimální filtry

- Období (1. leden – 30. červen / 1. červenec – 31. prosinec)
- Stav období (otevřené / uzavřené / vyplacené)

##### 22.4.2 Anonymizovaná varianta pro „vyhlášení“

Protože obchodníci se nemají navzájem identifikovat:
- systém musí umět vygenerovat i **anonymizovaný výstup**, kde jsou obchodníci označeni pouze jako „Obchodník A“, „Obchodník B“, „Obchodník C“,
- anonymizovaný výstup obsahuje pouze: pořadí, obrat, podíl a částku z Poolu,
- mapování „A/B/C → konkrétní obchodník“ je dostupné pouze administrátorovi.

---

#### 22.5 Export: Auditní log

**Účel:**
- kontrola ručních zásahů (administrátor),
- dohledatelnost sporů a incidentů,
- auditní stopa pro ochranu osobních údajů a finance.

**Granularita (1 řádek = 1 auditní událost):**
- každý řádek je jedna auditní událost dle seznamu v kapitole 16.8.

##### 22.5.1 Minimální sloupce

- Datum a čas události
- Oblast (finance / provize / Pool / tikety / ochrana osobních údajů / výstupy)
- Název auditní události
- Role aktéra (administrátor / developer / obchodník)
- Identifikace aktéra
- Dotčená entita (projekt / tiket / rezervace / provize / doklad / investor / Pool období)
- Interní identifikátor entity
- Shrnutí změny (co se stalo)
- Původní hodnota / nové hodnoty (pokud relevantní)
- Důvod (kód důvodu + volitelný text)
- Podklady (ano/ne) + reference na uložený soubor (pokud existuje)

##### 22.5.2 Minimální filtry

- Rozmezí dat (od – do)
- Oblast
- Název auditní události
- Role aktéra
- Dotčená entita + identifikátor


---

### Příloha A: Doporučení pro udržování dokumentace (inspirace z veřejných zdrojů)

Aby dokumentace nezastarala a šla dlouhodobě udržovat, doporučujeme:
- držet „jeden kanonický soubor“ pro data a pravidla (tento dokument),
- mít datový slovník jako hlavní zdroj pravdy (entita → pole → validace → viditelnost),
- udržovat stavové toky a notifikace jako samostatné tabulky,
- každou změnu pravidel verzovat a držet audit.



---

### Příloha D: Právní rámec a minimalizace rizik

Tato příloha není právní dokument, ale shrnuje principy, které mají dopad na data a procesy.

#### D.1 Základní principy

- Platforma neposkytuje investiční doporučení.
- Platforma není stranou investiční dohody mezi investorem a developerem.
- Platforma eviduje introdukci a řídí rezervaci tak, aby byla dohledatelná a aby šlo spravedlivě vypořádat provize.

#### D.2 Doporučené smluvní vztahy (aktuální kanonické nastavení)

- Developer ↔ Platforma: smlouva o využití platformy + provizní podmínky (platforma má nárok na provizi).
- Obchodník ↔ Platforma: smlouva o využití platformy + podmínky výplaty provize (obchodník vystavuje fakturu platformě).
- Investor ↔ Developer: rezervační smlouva + následná investiční dokumentace.

Poznámka k podkladům:
- v některých materiálech se objevuje varianta, kde provizní smlouva běží přímo mezi obchodníkem a developerem. To je v rozporu s kanonickým procesem fakturace „obchodník → platforma“ a je potřeba to držet jako historickou variantu.

#### D.3 Ochrana proti obcházení

Doporučení do smluv a podmínek:
- uznání auditních záznamů platformy jako důkazu introdukce,
- zákaz obcházení po definovanou dobu,
- sankční ustanovení,
- povinnost součinnosti při sporu.

#### D.4 Ochrana osobních údajů

- Investor není uživatelský účet.
- Držíme minimalizaci osobních údajů (pouze to, co je nezbytné pro komunikaci a podpisy).
- Datum narození investora se v první verzi nesbírá.
- Investor musí obdržet informace dle obecného nařízení o ochraně osobních údajů (informační povinnost) a musí existovat auditní záznam potvrzení (typicky podpisem rezervační smlouvy a/nebo samostatného dokumentu).
- Identita investora se developerovi odemkne až po podpisu obou stran (minimalizace rizika obcházení a důkaz introdukce).

Uchování dat a výmaz:
- Pravidla retence, auditní stopy a procesu žádosti o výmaz jsou **uzamčena v kapitole 16.6** (a auditní značení v 16.8).
- Investor není uživatelský účet; pracujeme s minimalizací osobních údajů a s odkrytím identit až po podpisu obou stran.

### Příloha E: Nesrovnalosti v podkladech a naše kanonické rozhodnutí

Níže jsou klíčové rozdíly mezi různými podklady a tím, co je v tomto dokumentu považováno za aktuální.

1) Investor jako uživatel platformy
- některé podklady počítají s tím, že investor vidí projekt a podepisuje v rozhraní,
- kanonické rozhodnutí: investor nemá přístup do rozhraní; podpis probíhá mimo jeho účet.

2) Kdy je rezervace aktivní
- některé podklady uvádí aktivaci po podpisu investora,
- kanonické rozhodnutí: aktivace až po podpisu investora i developera (48 hodin + 48 hodin; vše upravitelné administrátorem).

3) Komu se vystavují faktury
- kanonické rozhodnutí: obchodník vystavuje fakturu platformě na základě dat poskytnutých platformou.

4) Typy projektů
- starší doménový slovník používá jiné kategorie (například „rekonstrukce“, „průmysl“),
- kanonické rozhodnutí: typ projektu je asset třída: Rezidenční, Logistika, Komerční, Smíšený, Retail, Ubytovací zařízení, Pozemky, Energetika, Ostatní.

Doporučené mapování (pro migraci):
- „Rezidenční development“ → typ: Rezidenční + tag: výstavba
- „Komerční development“ → typ: Komerční (nebo Retail dle obsahu) + tag: výstavba
- „Logistický / průmyslový development“ → typ: Logistika (nebo Komerční) + tag: výstavba
- „Rekonstrukce / brownfield“ → typ: dle assetu + tag: rekonstrukce

5) Využití prostředků
- některé podklady mají jiné členění,
- kanonické rozhodnutí: používáme procentuální rozpad do 12 kategorií z dokumentu „Využití prostředků“.

6) Formy financování
- existují různé seznamy,
- kanonické rozhodnutí: používáme seznam forem financování z dokumentu „Formy financování vs zajištění“.

### Příloha F: Co ještě doplnit pro finalizaci

> Cíl: uzamknout data a pravidla tak, aby šel systém implementovat bez dalších rozhodnutí. Části týkající se uživatelské zkušenosti a uživatelského rozhraní budeme řešit až na konci.

#### F.1 Finalizace dat a pravidel (bez uživatelského rozhraní)

- [x] **Měna:** pouze koruna česká (bez přepočtů).
- [x] **Potvrzení financování (developer):** datum přijetí na účet developera, finální částka, volitelné podklady + povinná poznámka, audit; včetně možnosti ruční opravy administrátorem.
- [x] **Fakturace a daně mezi developerem a platformou:** definováno včetně splatností, potvrzení úhrad a minimálních platebních identifikátorů.
- [x] **Zaokrouhlování a přesnost částek:** definováno (2 desetinná místa, zaokrouhlení nahoru; vyrovnání rozdílu na podílu platformy).
- [x] **Číselníky důvodů:** uzamčeno v kapitole 8.14 (v první verzi lze pouze doplňovat nové důvody; význam existujících se nemění).
- [x] **Retenční pravidla a mazání dat:** definováno (auditní stopa 5 let; výmaz do 48 hodin; auditní značení výmazu).
- [x] **Výstupy a reporty:** minimální rozsah = export do tabulky (Excel); detailní sloupce a filtry jsou uzamčeny v kapitole 22; další analytika mimo rozsah první verze.
- [x] **Nastavitelné parametry administrátorem:** uzamčeno v kapitole 17 (včetně doporučených rozsahů, dopadů změn a auditních pravidel).

#### F.2 Finalizace uživatelské zkušenosti a uživatelského rozhraní (na později)

- [ ] Finální texty notifikací (e-mail i v aplikaci) včetně právních upozornění.
- [ ] Texty a nápovědy ve formulářích (copywriting, právní upozornění).
- [ ] Specifikace obrazovek a komponent podle design systému.

---
### Příloha H: Doporučené pokračování práce (priorita pro předání týmu)

Tento dokument už obsahuje:
- kanonická data, entity, stavy a klíčová pravidla,
- základní matice viditelnosti a oprávnění,
- první verzi specifikace uživatelského rozhraní (příloha G).

Aby z toho programátor i návrhář uživatelského rozhraní mohli **bez dohadů** stavět, doporučuji pokračovat v tomto pořadí:

#### H.1 Finalizace registrů vstupních polí formulářů (nejvyšší priorita)

Cíl:
- uzamknout „co se kde vyplňuje“, v jakém pořadí, co je povinné/volitelné,
- sjednotit validace, názvosloví a nápovědy,
- přímo tím odvodit databázová pole + komponenty ve formulářích.

Výstup (pro každý formulář):
- tabulka polí: **název pole, typ, povinnost, validace, příklad, nápověda, kdo vidí, v jakých stavech**,
- definice defaultů a odvozených hodnot (např. pozice ve frontě, stav „v kapacitě“).

Formuláře k doplnění (minimálně):
1) Registrace obchodníka
2) Registrace developera
3) Evidence investora obchodníkem (interní databáze)
4) Zadání projektu (developer i broker jako „lead“)
5) Zadání tiketu (developer)
6) Vytvoření rezervace (včetně volby podpisu a nahrání scanu)
7) Potvrzení financování developerem (datum + částka + podklady)
8) Fakturace obchodníka platformě (nahrání faktury + metadata)
9) Administrátorské nastavení parametrů (lhůty, kapacita, provize, pool)

> Doporučení k procesu: nejdřív uzamknout registrace (obchodník + developer) a rezervace, protože na tom stojí celé workflow.

#### H.2 UX/UI „dotažení do stavů“ (vysoká priorita)

Cíl:
- aby návrhář uživatelského rozhraní nemusel domýšlet hraniční stavy a programátor nemusel „vymýšlet UX“.

Konkrétně doplnit pro klíčové obrazovky (příloha G):
- prázdné stavy (např. žádní investoři, žádné rezervace, žádné tikety),
- chybové stavy (např. expirovaný tiket, plná kapacita, propadnutí lhůty, kolize pořadí),
- potvrzovací dialogy u citlivých akcí,
- standardní texty štítků (stavů) a vysvětlivek („co to znamená“),
- přesné podmínky zobrazení tlačítek podle stavu a role.

Nejprve řešit:
1) Katalog tiketů + karta tiketu + filtry
2) Detail tiketu
3) Wizard rezervace
4) Detail rezervace (včetně fronty a odpočtů)
5) Potvrzení financování developerem
6) Admin: schvalování projektů/tiketů + zásahy do lhůt/kapacity

#### H.3 Knihovna notifikací a „mikrotextů“ (střední priorita)

Cíl:
- snížit chybovost v procesech a vyřešit právní komunikaci (hlavně investor).

Výstup:
- pro každou událost: příjemce, kanál (e-mail / aplikace), předmět, text, proměnné,
- jednotná terminologie (projekt/tiket/rezervace/aktivace/financování),
- jasné texty o lhůtách, expiraci a důsledcích.



##### H.3.1 Konvence proměnných v textech

Aby šly texty snadno napojit na data, používáme **hranaté závorky**:
- `[Název projektu]`, `[Název developera]`, `[Jméno obchodníka]`, `[Jméno investora]` (zobrazovat jen tam, kde je to dle pravidel viditelnosti dovoleno)
- `[Číslo projektu]`, `[Číslo tiketu]`, `[Číslo rezervace]`
- `[Částka financování]`, `[Měna]`, `[Provize obchodníka]`, `[Provize platformy]`, `[Splatnost]`
- `[Odkaz na podpis]`, `[Odkaz na tiket]`, `[Odkaz na rezervační smlouvu]`, `[Odkaz na podporu]`

Doporučení:
- V uživatelském rozhraní používat spíše „**Tiket [Číslo tiketu]**“ než interní identifikátory.
- V e-mailu může být uvedeno i „**Číslo rezervace**“ kvůli dohledatelnosti.

##### H.3.2 Notifikace k tiketům

**1) Nový tiket zveřejněn (obchodníci)**
- Kanál: e-mail + notifikace v aplikaci
- Příjemce: obchodník
- Předmět e-mailu: `Nový tiket k financování: [Název projektu] ([Číslo tiketu])`
- Text e-mailu:
  - `Na platformě byl zveřejněn nový tiket.`
  - `Projekt: [Název projektu] • Lokalita: [Město], [Kraj] • Forma financování: [Forma financování] • Požadovaná částka: [Částka financování] [Měna]`
  - `Detail tiketu: [Odkaz na tiket]`
- Text v aplikaci: `Nový tiket: [Název projektu] – [Částka financování] [Měna]` (tlačítko: `Zobrazit`)

**2) Tiket upraven (obchodníci s rozpracovanou / aktivní rezervací)**
- Kanál: notifikace v aplikaci (+ e-mail, pokud jde o podstatnou změnu)
- Příjemce: obchodník, který má k tiketu rozpracovanou rezervaci / aktivní rezervaci
- Text v aplikaci: `Tiket [Číslo tiketu] byl upraven. Zkontrolujte prosím detail.` (tlačítko: `Zobrazit změny`)
- Poznámka: Pokud tiket nelze upravit kvůli rezervacím, tato notifikace se nepoužije (změny se neprovedou).

**3) Tiket znovu otevřen (obchodníci s rozpracovanou rezervací)**
- Kanál: e-mail + notifikace v aplikaci
- Příjemce: obchodník (kteří mají rozpracovanou rezervaci k tomuto tiketu)
- Předmět e-mailu: `Tiket [Číslo tiketu] byl znovu otevřen – můžete dokončit rezervaci`
- Text e-mailu:
  - `Tiket byl znovu otevřen administrátorem.`
  - `Pokud máte rozpracovanou rezervaci, můžete pokračovat v procesu.`
  - `Odkaz: [Odkaz na tiket]`
- Text v aplikaci: `Tiket [Číslo tiketu] znovu otevřen. Dokončete rezervaci.` (tlačítko: `Pokračovat`)

**4) Tiket expiroval (publikační okno skončilo)**
- Kanál: notifikace v aplikaci
- Příjemce: obchodník, developer
- Text v aplikaci (obchodník): `Tiket [Číslo tiketu] expiroval. Rezervace již nelze vytvářet.`
- Text v aplikaci (developer): `Tiket [Číslo tiketu] expiroval. Pokud chcete pokračovat, požádejte o znovuotevření.`

##### H.3.3 Notifikace k rezervacím a podpisům

**5) Výzva k podpisu rezervační smlouvy (investor)**
- Kanál: e-mail
- Příjemce: investor
- Předmět e-mailu: `Prosíme o podpis rezervační smlouvy – [Název projektu] ([Číslo tiketu])`
- Text e-mailu:
  - `Dobrý den,`
  - `obdrželi jste rezervační smlouvu k projektu [Název projektu] (tiket [Číslo tiketu]).`
  - `Pro pokračování prosíme o podpis nejpozději do [Splatnost podpisu investora].`
  - `Podpis: [Odkaz na podpis]`
  - `V případě dotazů kontaktujte: [Jméno obchodníka] ([Kontakt obchodníka])`
  - `Podpora platformy: [Odkaz na podporu]`
- Poznámka: Součástí procesu je předání informací o zpracování osobních údajů (odkaz / příloha dle právních podkladů).

**6) Investor podepsal rezervační smlouvu (obchodník)**
- Kanál: notifikace v aplikaci + e-mail
- Příjemce: obchodník
- Předmět e-mailu: `Investor podepsal rezervační smlouvu – rezervace [Číslo rezervace]`
- Text e-mailu:
  - `Investor podepsal rezervační smlouvu k tiketu [Číslo tiketu].`
  - `Další krok: čekáme na podpis developera (lhůta do [Splatnost podpisu developera]).`
- Text v aplikaci: `Investor podepsal rezervaci [Číslo rezervace]. Čekáme na podpis developera.`

**7) Výzva k podpisu rezervační smlouvy (developer)**
- Kanál: e-mail + notifikace v aplikaci
- Příjemce: developer
- Předmět e-mailu: `Nová rezervace k podpisu – tiket [Číslo tiketu]`
- Text e-mailu:
  - `Máte novou rezervaci k podpisu (rezervace [Číslo rezervace]).`
  - `Prosíme o podpis do [Splatnost podpisu developera].`
  - `Podpis: [Odkaz na podpis]`
- Text v aplikaci: `Nová rezervace k podpisu – [Číslo rezervace].` (tlačítko: `Podepsat`)

**8) Rezervace aktivována (podpis obou stran dokončen)**
- Kanál: e-mail + notifikace v aplikaci
- Příjemce: obchodník, developer (+ investor e-mailem)
- Předmět e-mailu (obchodník): `Rezervace aktivní – odhalené strany, tiket [Číslo tiketu]`
- Text e-mailu (obchodník):
  - `Rezervace je aktivní (rezervace [Číslo rezervace]).`
  - `Od této chvíle je v platformě odhalena identita stran a běží lhůta na jednání do [Konec jednání].`
  - `Developer: [Název developera] • Projekt: [Název projektu]`
- Předmět e-mailu (developer): `Rezervace aktivní – tiket [Číslo tiketu]`
- Text e-mailu (developer):
  - `Rezervace je aktivní. V detailu rezervace nyní vidíte investora a obchodníka.`
  - `Konec jednání: [Konec jednání]`
- Text e-mailu (investor):
  - `Rezervace byla aktivována podpisem obou stran. Nyní probíhá jednání s developerem.`
  - `V případě dotazů kontaktujte svého obchodníka: [Jméno obchodníka] ([Kontakt obchodníka])`
- Text v aplikaci: `Rezervace [Číslo rezervace] je aktivní. Začalo jednání.`

**9) Developer odmítl rezervaci**
- Kanál: e-mail + notifikace v aplikaci
- Příjemce: obchodník (+ investor e-mailem)
- Předmět e-mailu: `Developer odmítl rezervaci – rezervace [Číslo rezervace]`
- Text e-mailu:
  - `Developer odmítl rezervaci k tiketu [Číslo tiketu].`
  - `Důvod (pokud uveden): [Důvod odmítnutí]`
  - `Pokud je k dispozici další kapacita, můžete vytvořit novou rezervaci.`
- Text v aplikaci: `Rezervace [Číslo rezervace] byla odmítnuta developerem.`

**10) Rezervace expirovala (neproběhl podpis investora včas)**
- Kanál: e-mail + notifikace v aplikaci
- Příjemce: obchodník (+ investor e-mailem)
- Text v aplikaci: `Rezervace [Číslo rezervace] expirovala – investor nepodepsal včas.`

**11) Rezervace expirovala (neproběhl podpis developera včas)**
- Kanál: e-mail + notifikace v aplikaci
- Příjemce: obchodník, developer (+ investor e-mailem)
- Text v aplikaci: `Rezervace [Číslo rezervace] expirovala – developer nepodepsal včas.`

##### H.3.4 Notifikace k financování a uzavření tiketu

**12) Financování potvrzeno developerem**
- Kanál: e-mail + notifikace v aplikaci
- Příjemce: obchodník (rezervace vítěz), administrátor
- Předmět e-mailu: `Financování potvrzeno – tiket [Číslo tiketu]`
- Text e-mailu:
  - `Developer potvrdil přijetí financování na bankovní účet.`
  - `Datum financování: [Datum financování]`
  - `Skutečná částka: [Skutečná částka financování] [Měna]`
- Text v aplikaci: `Financování potvrzeno – tiket [Číslo tiketu].`

**13) Tiket uzavřen (financování proběhlo jiným investorem)**
- Kanál: e-mail + notifikace v aplikaci
- Příjemce: obchodníci/investoři, kteří měli rozpracovanou nebo aktivní rezervaci, ale nevyhráli
- Předmět e-mailu: `Tiket [Číslo tiketu] byl financován – vaše rezervace byla ukončena`
- Text e-mailu:
  - `Tiket byl financován jiným investorem. Vaše rezervace byla ukončena.`
  - `Pokud potřebujete další informace, kontaktujte podporu: [Odkaz na podporu]`
- Text v aplikaci: `Tiket [Číslo tiketu] byl financován jiným investorem. Rezervace ukončena.`

##### H.3.5 Notifikace k provizím a fakturaci

**14) Vznikl nárok na provizi platformě (developer)**
- Kanál: e-mail + notifikace v aplikaci
- Příjemce: developer
- Předmět e-mailu: `Vznikl nárok na provizi platformě – tiket [Číslo tiketu]`
- Text e-mailu:
  - `Na základě potvrzeného financování vznikl nárok na provizi platformě.`
  - `Částka k úhradě: [Provize platformy] Kč`
  - `Splatnost: [Splatnost]`
  - `Platební údaje: [Platební údaje platformy]`
- Text v aplikaci: `Provize k úhradě: [Provize platformy] Kč (splatnost [Splatnost]).`

**15) Podklady k fakturaci pro obchodníka připraveny**
- Kanál: notifikace v aplikaci + e-mail
- Příjemce: obchodník (s nárokem na provizi)
- Předmět e-mailu: `Podklady k fakturaci – tiket [Číslo tiketu]`
- Text e-mailu:
  - `Na základě úhrady provize platformě jsou připraveny podklady k vystavení faktury.`
  - `Vaše provize: [Provize obchodníka] Kč`
  - `Vystavení faktury provedete v platformě v sekci Provize.`
- Text v aplikaci: `Můžete vystavit fakturu – tiket [Číslo tiketu] (provize [Provize obchodníka] Kč).`

**16) Obchodník nahrál fakturu (administrátor)**
- Kanál: notifikace v aplikaci
- Příjemce: administrátor
- Text v aplikaci: `Nahrána faktura obchodníka – zkontrolujte a schvalte.`

**17) Faktura obchodníka schválena / zamítnuta**
- Kanál: e-mail + notifikace v aplikaci
- Příjemce: obchodník
- Text v aplikaci (schváleno): `Faktura schválena. Proplacení nejpozději do [Splatnost].`
- Text v aplikaci (zamítnuto): `Faktura zamítnuta. Důvod: [Důvod].`

**18) Faktura proplacena (obchodník)**
- Kanál: e-mail + notifikace v aplikaci
- Příjemce: obchodník
- Text v aplikaci: `Faktura proplacena dne [Datum proplacení].`

##### H.3.6 Mikrotexty v aplikaci (krátké texty na obrazovkách)

**Tiket – karta v přehledu**
- `Forma financování: [Forma financování]` (povinně zobrazit)
- `Volná kapacita rezervací: [Volné]/[Kapacita]`
- `Publikační okno do: [Datum]` (jen pokud je relevantní pro rozhodnutí)

**Rezervace – status**
- `Čeká na podpis investora` / `Čeká na podpis developera` / `Rezervace aktivní` / `Rezervace ukončena`


#### H.4 Fakturační a daňová pravidla (střední priorita)

Cíl:
- aby se platforma dala provozovat bez chaosu ve fakturaci.

Doplnit:
- jak se evidují faktury (pole, stavy, schvalování),
- co se děje při reklamaci/sporu,
- jak pracovat se zaokrouhlováním,
- rozhodnutí k dani z přidané hodnoty (platforma ↔ developer, obchodník ↔ platforma) a co se zobrazuje v UI.

#### H.5 Bonusový program Pool (střední priorita)

V dokumentu už je logika met a výplaty. Zbývá doplnit:
- přesný výpočet obratu (a edge cases),
- pravidla u měn a kurzu,
- co když dojde k ruční úpravě profinancované částky,
- auditní report (z čeho se obrat skládá).

#### H.6 Integrace a automatizace (nižší priorita, ale nutné pro běh)

Doplnit:
- jaké integrace jsou potřeba (elektronický podpis, e-mail/SMS, úložiště dokumentů),
- cron úlohy: expirace, připomínky, posuny ve frontě, vyhodnocení Poolu.

---

#### H.7 Co navrhuji dělat jako další konkrétní krok

Navrhuji pokračovat bodem **H.1 (registry vstupních polí formulářů)** – začneme:
1) Registrace obchodníka
2) Registrace developera
3) Evidence investora obchodníkem

Důvod:
- je to největší „základní kámen“ pro databázi i uživatelské rozhraní,
- na těchto formulářích stojí celý proces rezervací a pozdější finance.


---

## UX část

### 14. Notifikace (MVP)

#### 14.1 Události pro notifikace

- Registrace dokončena → administrátorovi (čeká na schválení)
- Účet schválen / zamítnut → uživateli

- Projekt/tiket odeslán ke schválení → administrátorovi
- Projekt/tiket schválen / zamítnut → developerovi (případně obchodníkovi u leadu)
- Tiket expiroval (konec doby zveřejnění) → developerovi + administrátorovi

- Rezervace vytvořena a odeslána investorovi k podpisu → obchodníkovi (potvrzení)
- Výzva k podpisu investorovi → investorovi (e-mail)
- Investor podepsal / byl nahrán scan → developerovi (výzva k podpisu)
- Developer podepsal → obchodníkovi + administrátorovi
- Rezervace aktivní (podepsáno oběma stranami, identity odemknuty) → obchodníkovi + developerovi
- Blíží se deadline (podpis / jednání) → relevantním stranám + administrátorovi
- Rezervace expirovala / zrušena → obchodníkovi + developerovi + administrátorovi

- Financování potvrzeno developerem (datum přijetí na účet) → administrátorovi + obchodníkovi
- Přijata úhrada provize developer → platforma (ruční zadání) → obchodníkovi (může fakturovat)
- Faktura obchodníka přijata / schválena k úhradě → administrátorovi
- Faktura obchodníka uhrazena → obchodníkovi

#### 14.2 Šablony zpráv (poznámky)

- Texty musí být neutrální, bez marketingových frází.
- U podpisů musí být jasné termíny a následky expirace.
- U investora je nutné připojit GDPR informace a kontakty na správce údajů.

### Příloha G: UX a uživatelské rozhraní – detailní specifikace (MVP)

> Tato příloha překládá kanonická data, stavy a pravidla do požadavků na uživatelské rozhraní.
> Nejde o grafický návrh, ale o to, **jaké obrazovky mají existovat, jaká data mají sbírat a zobrazovat a jak se mají chovat**.

#### G.0 Cíl a rozsah

Cíl:
- dát návrháři uživatelského rozhraní a programátorovi **společnou mapu obrazovek, komponent a datových bloků**
- zajistit, aby uživatelské rozhraní bylo v souladu s procesy (projekty → tikety → rezervace → financování → provize)
- vyjasnit, kde se co **zobrazuje / nezobrazuje** (maskování identit, práva, pořadí rezervací)

Rozsah (MVP):
- obrazovky a komponenty pro role **obchodník (broker)**, **developer**, **administrátor**
- průchod klíčovými workflow (rezervace, podpisy, aktivace, jednání, financování, provize, fakturace, Pool)
- minimální standardy použitelnosti, srozumitelnosti a auditovatelnosti

Mimo rozsah (zatím):
- finální texty všech notifikací (jen místa + smysl)
- finální grafický styl, rozvržení a pixel-perfect návrhy

---

### G.1 Zásady uživatelské zkušenosti

#### G.1.1 „Data rozhodují, text vysvětluje“
- Primární je **číslo a status** (např. odměna v Kč, výnos, LTV, zbývající čas, kapacita rezervací).
- Text má sloužit jako stručné vysvětlení „co to znamená“ a „co mám udělat dál“.

#### G.1.2 Jedna terminologie napříč celou platformou
Používat konzistentně (bez synonym):
- **Projekt** (celé zadání od developera)
- **Tiket** (konkrétní nabídka k financování v rámci projektu)
- **Rezervace** (proces vedoucí k aktivnímu stavu po podpisu obou stran)
- **Rezervační smlouva** (dokument, který podepisuje investor a developer)
- **Aktivní rezervace** (stav po podpisu investorem i developerem)
- **Jednání** (časové okno po aktivaci rezervace, default 30 dní)
- **Financování** (reálné přijetí peněz investora na účet developera; potvrzuje developer)
- **Provize** (vzniká až po financování)
- **Pool** (bonusový program financovaný z podílu platformy)

#### G.1.3 Transparentní časovače a lhůty
- Všude, kde běží čas (podpisy, jednání, splatnosti), zobrazit:
  - **odpočet** + datum konce
  - kdo je „na tahu“
  - upozornění, že lhůty může prodloužit administrátor

#### G.1.4 Právní ochrana a důkaz „představení“
- Identita stran (projekt/developer ↔ investor) se **odkrývá až ve chvíli aktivace rezervace**.
- Systém musí umět doložit:
  - kdy byla rezervace aktivována
  - kdo byl zobrazen komu
  - jaká verze dokumentu byla podepsána

---

### G.2 Informační architektura (navigace)

#### G.2.1 Navigace – obchodník (broker)
Doporučené hlavní menu:
1) **Přehled** (dashboard)
2) **Projekty a tikety** (katalog)
3) **Moje rezervace**
4) **Investoři** (interní databáze brokera)
5) **Fakturace** (podklady a stav faktur)
6) **Pool** (bonusový program)
7) **Podpora / incidenty**
8) **Profil a nastavení**

#### G.2.2 Navigace – developer
Doporučené hlavní menu:
1) **Přehled**
2) **Projekty**
3) **Tikety**
4) **Rezervace**
5) **Finance** (úhrady platformě, provize jako závazek)
6) **Dokumenty** (projektové dokumenty)
7) **Podpora / incidenty**
8) **Profil a nastavení**

#### G.2.3 Navigace – administrátor
Doporučené hlavní menu:
1) **Přehled**
2) **Schvalování** (projekty, tikety)
3) **Uživatelé** (obchodníci, developeři)
4) **Rezervace a smlouvy**
5) **Finance a provize**
6) **Pool**
7) **Nastavení systému** (lhůty, kapacity, pravidla)
8) **Audit logy**
9) **Incident management**

---

### G.7 Maskování a odkrytí identit v uživatelském rozhraní

#### G.7.1 Co je maskováno
Do aktivace rezervace se maskuje:
- název projektu
- jméno developera
- identifikační údaje investora

#### G.7.2 Kdy a komu se identita odkrývá
- Po podpisu rezervační smlouvy oběma stranami (aktivace rezervace):
  - obchodník uvidí název projektu + jméno developera
  - developer uvidí jméno investora
  - developer uvidí jméno obchodníka

#### G.7.3 Auditní stopa
- systém uloží datum/čas aktivace
- uloží „komu se co odhalilo“
- uloží verzi dokumentu

---

### G.8 Zobrazení kapacity a pořadí rezervací

#### G.8.1 Kapacita na tiketu
- Každý tiket má kapacitu (default 3), kolik rezervací může být „v kapacitě“.
- Pořadí je určeno časem podpisu investora.
- Developerovo potvrzení neovlivňuje pořadí.

#### G.8.2 Práce s pořadím
- Pokud rezervace na vyšším pořadí odpadne (nepodepíše, developer odmítne, expiruje), další rezervace se posune.
- V UI musí být vždy jasné:
  - moje pozice
  - zda jsem „v kapacitě“ nebo „čekám mimo kapacitu“

#### G.8.3 Automatický zánik ostatních rezervací po financování
- Jakmile dojde k financování jednoho investora, ostatní rezervace zanikají.
- Uživatelé (obchodník + investor) obdrží informaci, že financování proběhlo jiným investorem.

---

### G.9 Minimální standard přístupnosti a použitelnosti

- Rozhraní musí být ovladatelné klávesnicí.
- Důležité informace nesmí být sděleny pouze barvou.
- Formuláře musí mít jasné chybové hlášky.
- U citlivých akcí (zrušení rezervace, potvrzení financování) vyžadovat potvrzení.

---

### G.10 Otevřená UX rozhodnutí (návrhy)

1) Viditelnost dokumentů projektu brokerům
- návrh: dokumenty zobrazit až po aktivní rezervaci (ochrana informací)

2) Zobrazení „odměny obchodníka“ na kartě tiketu
- návrh: zobrazit částku v Kč, která odpovídá odměně za přivedení investora (nikoliv podíl za přivedení projektu)

3) Vnitroaplikační notifikace vs e-mail
- návrh: klíčové kroky posílat e-mailem + zároveň zobrazit v aplikaci jako „centrum notifikací“

## UI část

### 9. Formuláře a vstupní data (bez technických kódů)

#### 9.1 Registrace obchodníka

Kanonická pole (sjednoceno):

**A) Identita a kontakt**
- Jméno a příjmení
- Firma / obchodní název (pokud relevantní)
- IČO / DIČ (pokud relevantní)
- E-mail
- Telefon

**B) Profil a úroveň**
- Úroveň obchodníka: Partner / Premium / Elite
- Počet slotů (odvozeno od úrovně)
- Regionální fokus (kraje)
- Typičtí investoři (např. privátní / institucionální / family office) – volitelné

**C) Fakturační a platební údaje**
- Fakturační adresa
- Bankovní účet

**D) Právní prohlášení a souhlasy**
- Souhlas s podmínkami platformy
- Prohlášení k právnímu důvodu evidence investorů (GDPR/komunikace)

#### 9.2 Registrace developera

Cíl registrace: vědět, kdo projekty zadává, kdo je oprávněná osoba a že má právo s projektem nakládat.

**Sekce A – Společnost (povinné)**
- Typ subjektu: právnická osoba / fyzická osoba podnikatel
- Název společnosti
- Identifikační číslo osoby
- Daňové identifikační číslo (volitelné)
- Sídlo společnosti
- Země registrace
- E-mail (přihlašovací)
- Telefon

**Sekce B – Oprávněná osoba (statutár / zástupce)**
- Jméno a příjmení
- Funkce
- Kontaktní e-mail
- Kontaktní telefon

**Sekce C – Profil developera (informativní + pro matching)**
- Zaměření (vícenásobný výběr; typy projektů)
- Regiony působnosti (vícenásobný výběr)
- Počet realizovaných projektů (informativní)
- Celkový objem projektů (informativní)
- Typické financování: banka / privátní kapitál / jiné / kombinace
- Web / prezentace (volitelné)

**Sekce D – Právní a smluvní souhlasy (povinné)**
- Prohlášení o oprávnění k projektu
- Souhlas s podmínkami platformy
- Souhlas se zpracováním osobních údajů (GDPR)

**Sekce E – Stav (spravuje administrátor)**
- Stav účtu (čeká na ověření / aktivní (ověřen) / pozastaven / zamítnut / zablokován)

Poznámka:
- Některé dokumenty zmiňují „rámcovou smlouvu“ a „anti-obcházející ujednání“ jako krok spravovaný administrátorem mimo self-service registraci. Doporučení: evidovat tyto dokumenty u profilu developera jako „splněno/nesplněno“ + datum + kdo potvrdil.


#### 9.3 Založení investora obchodníkem (evidence investorů)

Investor je interní záznam obchodníka (ne účet). Cílem je:
- evidovat kontaktní a základní identifikační údaje,
- držet investiční profil pro matching,
- umožnit odeslání dokumentů k podpisu (rezervační smlouva + GDPR informace).

Platforma investory neschvaluje ani neověřuje.

Kanonická pole:

**A) Identita**
- Typ investora: fyzická osoba / právnická osoba
- Jméno a příjmení / název společnosti
- IČO (u právnické osoby)

**B) Kontakt**
- E-mail
- Telefon
- Kontaktní osoba (u právnické osoby)

**C) Investiční profil (pro matching)**
- Preferované typy projektů
- Preferované lokality (kraje)
- Investiční částka: min / max
- Preferovaný výnos: min
- Preferovaná doba: min / max
- Preferované zajištění (enum + volitelné upřesnění)

**D) Interní poznámky**
- Poznámka obchodníka

#### 9.4 Zadání projektu (developer nebo obchodník)

Kanonická pole projektu (sjednoceno a rozšířeno):

**A) Identifikace**
- Název projektu
- Typ projektu
- Stručný popis (3–5 vět)
- Detailní popis / profil projektu (volitelně delší)

**B) Lokalita a nemovitost**
- Obec / město
- Kraj
- Přesná adresa (volitelné – dle citlivosti, lze skrýt pro brokery do aktivace)
- Popis nemovitosti / assetu

**C) Developer / vlastník projektu**
- Pokud projekt zadává developer: návaznost na profil developera (automaticky)
- Pokud projekt zadává obchodník (lead):
  - název developera / společnosti
  - kontaktní osoba
  - e-mail, telefon
  - IČO (pokud je k dispozici)
  - interní poznámka pro administrátora (stav jednání, zdroj leadu)

**D) Finanční rámec projektu**
- Celkový rozpočet projektu
- Vlastní kapitál
- Cizí zdroje – typ (banka / úvěr / jiné)
- Cizí zdroje – výše
- Orientační podmínky (text)
- Harmonogram projektu (text)

**E) Právní a technický stav**
- Vlastnický stav: vlastník / SPV
- Stavební stav: povolení ano / ne
- Existující zástavy (text)
- Věcná břemena (text)

**F) Využití prostředků (procenta)**
- Procentuální rozpad (součet 100 %)

**G) Dokumenty k projektu (přílohy)**
- List vlastnictví
- Projektová dokumentace
- Rozpočet projektu
- Term sheet / shrnutí
- Další podklady

Poznámka k viditelnosti:
- V části 13 (Matice viditelnosti a oprávnění) držíme pravidlo, že broker před aktivací vidí jen „decision-first“ parametry (výnos, LTV, částka, doba, zajištění…), nikoli citlivé identifikátory projektu.

#### 9.5 Zadání tiketu developerem

Kanonická pole tiketu:

**A) Základní parametry**
- Název / označení tiketu
- Investiční částka
- Doba trvání
- Typ tiketu: dluhový / kapitálový / hybridní

**B) Výnos a podmínky**
- Výnos v Kč (primární)
- Výnos v % (sekundární, pro interní výpočty / přepočet)
- Výplatní profil: měsíčně / kvartálně / na konci

**C) Forma financování (enum)**
- Použít kanonický seznam z kapitoly 8.4 (Forma financování).

**D) Ručení a zajištění (enum + parametry)**
- Typ zajištění
- Hodnota zástavy (pokud relevantní)
- LTV (pokud relevantní)
- Další podmínky

**E) Proces, kapacity a časové limity**

- Kapacita tiketu: maximální počet rezervací, které mohou být současně **v kapacitě** (výchozí 3; nastavuje administrátor; návrh může dát developer i obchodník při zadání).
- Do kapacity se **počítají rezervace od chvíle, kdy investor podepíše rezervační smlouvu** (včetně stavu „čeká na podpis developera“, „rezervace aktivní“ a „jednání“).
- Rezervace před podpisem investora (rozpracovaná / čeká na podpis investora) kapacitu tiketu neblokují.

Pořadí rezervací na tiketu:
- pořadí se určuje podle **data a času podpisu investora** (u fyzického podpisu podle data a času nahrání scanu),
- čas podpisu developera pořadí **neovlivňuje**.

Konkurence a přesuny ve frontě:
- systém vždy udržuje „top N“ rezervací **v kapacitě** (N = kapacita tiketu),
- pokud některá rezervace z top N odpadne (expirace, zrušení, odmítnutí developerem), systém automaticky posune další rezervaci podle pořadí do kapacity,
- pokud jedna rezervace dosáhne financování, ostatní rezervace na tiketu automaticky zanikají.

Časové limity (výchozí, vše upravitelné i prodlužitelné administrátorem):
- podpis investora: 48 hodin,
- podpis developera: 48 hodin (od chvíle, kdy je rezervace v kapacitě),
- jednání / financování: 30 dní od aktivace,
- splatnost developera: 14 dnů od vzniku nároku,
- splatnost platformy pro výplatu obchodníka: 3 dny,
- publikační okno tiketu: 90 dnů.

**F) Provize a obchodní podmínky (spravuje administrátor)**
- Provize platformy vůči developerovi: X % z profinancované částky (nebo ekvivalent v Kč; primární reporting v Kč)
- Rozdělení provize mezi platformu / obchodníka 1 / obchodníka 2: zadává administrátor ručně (např. 50/25/25) + pravidlo „pokud je obchodník stejná osoba v obou rolích, může dostat součet“
- Splatnost provize developer → platforma (výchozí 14 dnů; upravitelné)
- SLA výplaty obchodníkovi po úhradě provize platformě (výchozí 3 dny; upravitelné)
- Pokud je aktivní bonusový program Pool: část podílu platformy se odvádí do poolu (výchozí 10 % z podílu platformy); podíly obchodníků se tím nekrátí.

Poznámka:
- Dokumenty jsou vedeny na úrovni projektu (přílohy projektu). Pro tiket v MVP nepřidáváme samostatné přílohy.

### 13. Matice viditelnosti a oprávnění (MVP)

#### 13.1 Skupiny viditelnosti dat

Pro jednoduchost dělíme data na skupiny:

1) **Veřejná data tiketu (decision-first)** – výnos, částka, doba, zajištění, LTV, kraj, typ projektu.
2) **Identita projektu** – název projektu, jméno developera, přesná adresa, dokumenty s identifikátory.
3) **Identita investora** – jméno/název, kontakty.
4) **Identita obchodníka** – jméno/název obchodníka (odemkne se developerovi po aktivaci).

#### 13.2 Kdo co vidí podle stavu rezervace

| Stav | Obchodník | Developer | Administrátor |
|---|---|---|---|
| Rozpracovaná | (1) + investor | (1)+(2) | vše |
| Čeká na podpis investora | (1) + investor | (1)+(2) | vše |
| Podepsáno investorem – čeká ve frontě (mimo kapacitu) | (1) + investor | (1)+(2) | vše |
| Podepsáno investorem – v kapacitě (čeká na podpis developera) | (1) + investor | (1)+(2) | vše |
| Rezervace aktivní / jednání probíhá | (1)+(2) + investor | (1)+(2)+(3)+(4) | vše |
| Financování potvrzeno / ukončeno | dle účelu (bez cizích investorů) | dle účelu | vše |

Poznámka:
- Obchodník nikdy nevidí investory jiných obchodníků.

#### 13.3 Oprávnění (akce)

| Akce | Obchodník | Developer | Administrátor |
|---|---|---|---|
| Vytvořit projekt | ano (lead) | ano | ano |
| Odeslat projekt/tiket ke schválení | ano (lead) | ano | ano |
| Založit tiket (plný) | ne | ano | ano |
| Vytvořit rezervaci a odeslat k podpisu investorovi | ano | ne | ano |
| Stáhnout PDF rezervační smlouvy | ano | ne | ano |
| Nahrát scan podepsané smlouvy investorem | ano | ne | ano |
| Podepsat rezervační smlouvu | ne | ano | ne |
| Prodloužit termíny (podpis / jednání) | ne | ne | ano |
| Zrušit rezervaci | ne (jen žádost) | ne (jen žádost) | ano |
| Potvrdit financování (přijetí na účet developera) | ne | ano | ano |
| Vystavit fakturu platformě | ano | ne | ne |
| Označit fakturu jako uhrazenou | ne | ne | ano |

### Příloha B: Uživatelské rozhraní – hierarchie informací a rozhodovací údaje

Tato příloha je určena hlavně pro návrháře uživatelského rozhraní a pro programátora (aby chápal, proč některá data existují a kdy se zobrazují).

#### B.1 Základní princip: „nejdřív rozhodnutí, pak detail“

Obchodník se rozhoduje rychle. V seznamu tiketů a v rychlém náhledu musí být okamžitě jasné:
1) **kolik si vydělá** (provize v korunách českých),
2) **jaký je výnos** (výnos za rok),
3) **jaké je krytí** (zajištění a poměr financování k hodnotě zástavy),
4) **jak rychle musí jednat** (dostupnost a časové lhůty).

#### B.2 Doporučené pořadí informací na kartě tiketu (seznam tiketů)

**Horní část (nejviditelnější):**
- Provize obchodníka (Kč)
- Výnos za rok
- Zajištění (stručné štítky + pořadí zástavy, pokud je relevantní)

**Střed (pro rychlé posouzení):**
- Investiční částka + měna
- Doba trvání
- Poměr financování k hodnotě zástavy (pokud existuje)
- Typ projektu + kraj
- Forma financování

**Spodní část (operativní):**
- Dostupnost (počet volných rezervací / limit)
- Čas do konce nabídky (pokud je definován)
- Tlačítka akcí dle oprávnění (např. „Rezervovat“)

#### B.3 Maskování identity (před aktivací rezervace)

Před aktivací rezervace obchodník nevidí:
- název projektu,
- jméno developera,
- přesnou adresu,
- dokumenty s identifikátory.

Doporučené texty v rozhraní (bez marketingových frází, neutrálně):
- „Název projektu se zobrazí po aktivaci rezervace.“
- „Jméno developera se zobrazí po aktivaci rezervace.“

#### B.4 Stavové štítky (uživatelské rozhraní)

Uživatelé potřebují srozumitelný stav. Doporučené názvy stavů pro zobrazení:
- „Rozpracováno“
- „Čeká na podpis investora“
- „Čeká na podpis developera“
- „Rezervace aktivní“
- „Jednání probíhá“
- „Financování potvrzeno“
- „Ukončeno úspěšně“
- „Ukončeno neúspěšně“
- „Spor“

#### B.5 Prázdné stavy a chybové stavy (návrh)

- „Zatím zde nejsou žádné tikety, které odpovídají vašim filtrům.“
- „Nemáte volný slot pro rezervaci. Kontaktujte administrátora nebo zvyšte úroveň.“
- „Tento tiket již není dostupný.“

#### B.6 Doporučené filtry (obchodník)

- Typ projektu
- Kraj
- Investiční částka (rozsah)
- Výnos (rozsah)
- Doba trvání (rozsah)
- Forma financování
- Zajištění (ano/ne + typy)
- Poměr financování k hodnotě zástavy (rozsah)
- Dostupnost (jen dostupné / vše)




#### B.7 Mapa obrazovek pro obchodníka (informační architektura)

Doporučená navigace (MVP):
- Přehled
- Nabídka tiketů
- Moje rezervace
- Investoři (interní databáze obchodníka)
- Provize a fakturace
- Bonusový program „Pool“ (pokud je aktivní)
- Profil a nastavení
- Podpora a dokumenty

Poznámky:
- Obchodník vždy vidí pouze své investory a své rezervace.
- Před aktivací rezervace obchodník nevidí identitu projektu ani developera (viz maskování identity).

#### B.8 Mapa obrazovek pro developera (informační architektura)

Doporučená navigace (MVP):
- Přehled
- Projekty
- Tikety
- Rezervace (k podpisu / aktivní)
- Financování a provize
- Dokumenty
- Profil a nastavení
- Podpora

Poznámky:
- Developer před aktivací rezervace nevidí identitu investora.
- Po aktivaci rezervace developer vidí identitu investora i jméno obchodníka (důkaz introdukce).

#### B.9 Obrazovka „Nabídka tiketů“ (obchodník)

**Účel:** rychlý výběr, porovnání a rozhodnutí, zda má smysl zahájit rezervaci.

**Zobrazení v seznamu (karty tiketů):**
- Držet se doporučeného pořadí informací z kapitoly B.2.
- Povinně zobrazit i „Formu financování“.

**Dostupnost a konkurence (bez úniku citlivých dat):**
- Zobrazit kapacitu tiketu (např. „V kapacitě: 2 / 3“).
- Zobrazit agregovaný počet investorem podepsaných rezervací (např. „Podepsáno investorem: 5“), bez zobrazení identit.
- Obchodník v detailu své rezervace vidí svoji pozici ve frontě („Jste 4. v pořadí“).

**Výchozí filtry a řazení (doporučení):**
- Filtry: dle kapitoly B.6.
- Řazení: „Nejvyšší provize (Kč)“ nebo „Nejnovější“ (volba v nastavení uživatele).

**Prázdné stavy:** viz kapitola B.5.

#### B.10 Obrazovka „Detail tiketu“ (obchodník)

**Účel:** potvrdit rozhodnutí a založit rezervaci pro vybraného investora.

**Sekce v detailu (doporučené):**
1) **Rychlé shrnutí** (nahoře): provize v Kč, výnos, částka, doba, zajištění, forma financování, kraj + město.
2) **Zajištění a krytí**: typy zajištění, pořadí, poměr financování k hodnotě zástavy (pokud existuje), zdroj ocenění.
3) **Využití prostředků**: procentuální rozpad + kontrola součtu 100 % (pokud vyplněno).
4) **Časové parametry**: publikační okno (kolik dní zbývá) + standardní lhůty (podpisy, jednání) s poznámkou, že administrátor může lhůty měnit.
5) **Dostupnost**: kapacita tiketu, počet podepsaných rezervací investorem, informace o tom, že rozhoduje čas podpisu investora.
6) **Akce**:
   - „Založit rezervaci pro investora“ (otevře průvodce).
   - Pokud už má obchodník rozpracovanou rezervaci na tento tiket: „Pokračovat v rezervaci“.

**Maskování identity:**
- Před aktivací rezervace se v detailu nezobrazuje název projektu ani jméno developera (viz kapitola B.3).

#### B.11 Průvodce založením rezervace (obchodník)

**Cíl:** vytvořit rezervaci a získat podpis investora ve lhůtě.

Doporučené kroky (MVP):
1) **Výběr investora** z interní databáze (nebo „Přidat investora“).
2) **Rekapitulace tiketu** + potvrzení obchodníka, že má právní důvod investora evidovat a kontaktovat.
3) **Volba způsobu podpisu investora**:
   - elektronický podpis (odeslání odkazu e-mailem),
   - fyzický podpis (vygenerovat a stáhnout PDF).
4) **Vytvoření rezervace** a zobrazení dalších kroků:
   - odpočet času do expirace podpisu investora,
   - možnost znovu odeslat výzvu,
   - možnost nahrát scan (pokud zvolen fyzický podpis).

Poznámka:
- Teprve po podpisu investora se rezervace zařadí do pořadí a může obsadit kapacitu tiketu.

#### B.12 Obrazovka „Moje rezervace“ (obchodník)

**Zobrazení:** seznam rezervací + detail.

V seznamu doporučujeme:
- stavový štítek,
- odpočet relevantní lhůty (podpis investora / podpis developera / konec jednání),
- informaci, zda je rezervace „v kapacitě“ nebo „mimo kapacitu“,
- informaci o pozici ve frontě (pokud je investorem podepsaná).

V detailu rezervace doporučujeme:
- časovou osu událostí (vytvoření → podpis investora → podpis developera → aktivace → jednání → financování),
- dokumenty k podpisu (PDF, záznam o podpisu, scan),
- po aktivaci odemknuté identity (název projektu + developer),
- důvody ukončení (např. „financováno jiným investorem“).

#### B.13 Obrazovka „Rezervace“ (developer)

**Účel:** podepsat rezervační smlouvu a následně potvrdit financování.

V seznamu rezervací doporučujeme:
- zobrazovat jen rezervace, které jsou pro developera relevantní (typicky podepsané investorem a čekající na podpis developera, a aktivní rezervace),
- ukazovat odpočet času do expirace podpisu developera.

V detailu rezervace doporučujeme:
- možnost podepsat elektronicky,
- možnost stáhnout PDF a nahrát scan (fyzický podpis),
- možnost odmítnout podpis (důvod; rezervace se ukončí a uvolní se kapacita pro další v pořadí),
- po aktivaci zobrazení identity investora a obchodníka.

#### B.14 Formulář „Potvrdit financování“ (developer)

**Účel:** potvrdit, že prostředky od investora skutečně dorazily na bankovní účet developera. Na základě tohoto data se spouští následné lhůty (provize, fakturace, výplata).

Doporučená pole:
- Datum přijetí na bankovní účet (povinné).
- Skutečně profinancovaná částka (povinné; může se lišit od částky tiketu).
- Důvod odchylky částky (povinné, pokud se liší).
- Příloha k potvrzení (volitelné; například potvrzení o platbě pro audit).

Poznámky:
- Platforma v první verzi platby neověřuje, ale potvrzení musí být auditováno.
- Po potvrzení financování se tiket uzavírá a ostatní rezervace na tiketu se automaticky ukončí.

#### B.15 Obrazovka „Provize a fakturace“ (obchodník)

**Účel:** obchodník vidí, kdy mu vznikl nárok vystavit fakturu platformě a co má k dispozici za podklady.

Doporučené části:
- Seznam „K vyfakturování“: tiket, profinancovaná částka, podíl obchodníka, datum vzniku nároku, termín výplaty.
- Detail položky: podklady od platformy (shrnutí, číslo tiketu, auditní data) + nahrání faktury.
- Stav faktury: nahráno → přijato → schváleno → uhrazeno.

#### B.16 Obrazovka „Pool“ (obchodník)

**Účel:** motivace a transparentní přehled plnění met v aktuálním období.

Doporučené části:
- Aktuální období (od–do), meta 1, meta 2.
- Váš obrat v období + progress vůči metám.
- Stav poolu (kolik je v poolu).
- Pořadí obchodníků:
  - doporučení: zobrazit minimálně vlastní pořadí; zobrazení žebříčku (top 3) je možné zapnout jako obchodní parametr (citlivost dat).

### Příloha C: Administrátorské rozhraní – navigace, seznamy, sloupce, filtry, akce

Tato příloha shrnuje, jak by mělo vypadat administrátorské rozhraní v první verzi, aby šly procesy efektivně řídit.

#### C.1 Doporučená struktura navigace

- Přehled
- Uživatelé (obchodníci, developeři)
- Projekty
- Tikety
- Rezervace
- Financování a provize
- Faktury
- Spory a incidenty
- Auditní záznam
- Nastavení

#### C.2 Rezervace (seznam)

**Sloupce (doporučení):**
- Identifikátor rezervace
- Tiket / projekt (anonymně, dokud není aktivní)
- Obchodník (iniciátor)
- Investor (vždy vidí administrátor)
- Stav
- Termín podpisu investora
- Termín podpisu developera
- Termín konce jednání
- Poznámka / důvod (pokud relevantní)

**Filtry:**
- Stav
- Obchodník
- Developer
- Datum vytvoření (rozsah)

**Akce:**
- Zrušit rezervaci (s důvodem)
- Prodloužit termín (u podpisu / jednání)
- Znovu odeslat výzvu k podpisu
- Zobrazit financování potvrzené developerem (a případně upravit datum / označit jako sporné – override)
- Založit spor

#### C.3 Financování a provize

**Sloupce:**
- Tiket
- Profinancovaná částka
- Provize platformy (Kč)
- Splatnost developerem
- Stav úhrady
- Podíl platformy / obchodníka 1 / obchodníka 2
- Termín výplaty obchodníkům

**Akce:**
- Nastavit / změnit rozdělení
- Označit úhradu developera
- Poskytnout podklady obchodníkům k fakturaci
- Označit fakturu obchodníka jako přijatou / uhrazenou

#### C.4 Spory a incidenty

- Fronta sporů podle priority
- Časová osa událostí
- Připojené dokumenty
- Rozhodnutí administrátora (s auditní stopou)



### G.3 Základní komponenty a datové bloky

#### G.3.1 Karta projektu (v katalogu)
Účel: rychle rozhodnout, zda projekt stojí za otevření.

Povinné prvky:
- Typ projektu (Rezidenční / Logistika / …)
- Lokalita (kraj + město)
- Souhrn (1–2 věty, bez citlivých identit)
- Počet tiketů v projektu
- Stav projektu (v přípravě / publikovaný / skrytý / uzavřený)

#### G.3.2 Karta tiketu (v katalogu) – povinné bloky
Účel: rozhodnout, zda tiket rezervovat.

**Poznámka:** Název projektu a jméno developera mohou být maskované (dle pravidel odkrývání identit).

Povinné bloky na kartě:
1) **Odměna obchodníka (Kč)** – primární motivátor
   - zobrazovat v Kč jako hlavní číslo
   - procento jen sekundárně (např. v detailu)
2) **Částka tiketu (Kč)**
3) **Forma financování** (povinně jako štítek/čip)
   - Zápůjčka / úvěr
   - Mezaninové financování
   - Kapitálový vstup
   - Joint Venture (společný podnik)
   - Konvertibilní zápůjčka
   - Zpětný leasing (sale & leaseback)
   - Nabídka projektu (prodej projektu) – volitelné
4) **Výnos** (pokud je definovaný) + jednotka (např. ročně)
5) **Zajištění** (štítky) + **LTV** (pokud je relevantní)
6) **Do uzávěrky** (odpočet do expirace publikačního okna, default 90 dnů)
7) **Kapacita rezervací** (např. 2/3 obsazeno) + dostupnost
8) **Akce**: „Rezervovat“ / „Plno“ / „Uzavřeno“

Doporučené doplňkové bloky (pokud pomáhají rozhodnutí):
- Typ projektu
- Investiční účel (kategorizace využití prostředků – procentuální rozpad)
- „Shoda s investory“ (jen pro brokera, interní)

#### G.3.3 Stavové štítky (status chips)
- Jedna barva = jeden význam (konzistentně v celé aplikaci).
- Status štítky použít pro:
  - stav projektu
  - stav tiketu
  - stav rezervace
  - stav financování / plateb

#### G.3.4 Krokovník (timeline) pro rezervaci
Na detailu rezervace vždy zobrazit krokovník:
1) Rozpracováno
2) Čeká na podpis investora (48 h)
3) Čeká na podpis developera (48 h)
4) Aktivní rezervace (identita odhalena)
5) Jednání (default 30 dní)
6) Financování potvrzeno developerem
7) Provize a fakturace

---

### G.4 Obrazovky – obchodník (broker)

> Poznámka: Investor nemá přístup do platformy. Vše, co investor dělá, probíhá přes e-mail / podpisový tok.

#### BRO-001 Přihlášení
- Email + heslo
- Zapomenuté heslo
- Zabezpečení: omezení pokusů, audit přihlášení

#### BRO-010 Přehled (dashboard)
Zobrazit:
- Počet aktivních rezervací / kapacita (globální sloty)
- Moje rozpracované rezervace (top 5)
- Tikety s blížící se expirací (top 5)
- Pool: aktuální období (souhrnný progres)

#### BRO-020 Projekty a tikety (katalog)
Funkce:
- fulltext vyhledávání
- filtry (minimálně): typ projektu, kraj + město, forma financování, zajištění, LTV, výnos, dostupnost kapacity
- řazení: nejvyšší odměna, nejbližší expirace, nejvyšší výnos

Zobrazení:
- seznam karet tiketů (viz G.3.2)

#### BRO-021 Detail projektu
- základní informace (bez citlivých identit, dokud není aktivní rezervace)
- seznam tiketů projektu
- dokumenty projektu:
  - **doporučení:** dokumenty zobrazit brokerovi až po aktivní rezervaci (ochrana informací)
  - pokud bude rozhodnuto jinak, zavést minimálně watermark + audit stažení

#### BRO-022 Detail tiketu
Zobrazit:
- všechny parametry tiketu
- stav tiketu (otevřený / expirovaný / skrytý / uzavřený)
- kapacita rezervací + obsazenost
- historie změn tiketu (pokud byl upraven)

Akce:
- „Vytvořit rezervaci“ (pokud je kapacita)

#### BRO-030 Vytvoření rezervace (wizard)
Kroky:
1) Výběr investora (z interní databáze brokera) nebo založení nového
2) Rekapitulace tiketu + odměna + klíčová upozornění
3) Volba podpisu investora:
   - elektronicky (odeslat link)
   - mimo elektronický podpis: vygenerovat PDF → vytisknout → nahrát scan
4) Odeslání

Systém po odeslání:
- vytvoří rezervaci ve stavu „čeká na podpis investora“
- spustí odpočet 48 h
- určí pořadí v kapacitě dle času podpisu investora

#### BRO-031 Detail rezervace
Zobrazit:
- krokovník + odpočty
- aktuální pozice v kapacitě (např. 2/3)
- identita developera/projektu až po aktivaci
- dokumenty: rezervační smlouva, případně scan

Akce (dle stavu):
- připomenout investorovi podpis
- nahrát scan (pokud offline)
- zrušit rezervaci (pokud to pravidla dovolují)

#### BRO-040 Investoři (seznam)
Zobrazit:
- seznam investorů brokera
- filtry podle preferencí (typy projektů, forma financování, region, objem)
- rychlé akce: detail, edit, archivace

#### BRO-041 Detail investora
Zobrazit:
- kontaktní údaje
- investiční profil a preference
- historie rezervací tohoto investora (jen v rámci brokera)
- poznámky brokera
- souhlasy (GDPR): stav + datum

#### BRO-060 Fakturace
Zobrazit:
- přehled nároků na odměnu (vznikají až po financování)
- stav: čeká na úhradu platformě od developera / lze fakturovat / faktura nahraná / proplaceno
- pro každý nárok: částka v Kč + identifikace tiketu + datum financování (od developera)

Akce:
- stáhnout podklady k fakturaci
- nahrát fakturu (PDF)

#### BRO-050 Pool
Zobrazit:
- aktuální období (datum od/do)
- celková výše Poolu
- moje dosažený obrat (dle pravidel v kapitole 10.7)
- metriky: Meta1 (100 mil. Kč) + Meta2 (200 mil. Kč)
- leaderboard top 3 (bez citlivých údajů investorů)

#### BRO-070 Podpora / incidenty
- vytvoření požadavku
- stav požadavku
- komunikace s administrátorem

---

### G.5 Obrazovky – developer

#### DEV-010 Přehled (dashboard)
Zobrazit:
- projekty ve stavu: koncept / čeká na schválení / publikované
- tikety: otevřené / s rezervacemi / uzavřené
- rezervace čekající na podpis developera (s odpočtem 48 h)

#### DEV-020 Projekty (seznam)
- seznam projektů developera
- stav projektu
- akce: detail, vytvořit nový projekt, žádost o úpravu

#### DEV-030 Tikety (seznam)
- seznam tiketů
- stav tiketu
- kapacita rezervací
- akce: detail, požádat o úpravu (pokud to stav dovoluje)

#### DEV-040 Rezervace (přehled)
Zobrazit tabulku:
- tiket
- pořadí rezervace v kapacitě (dle času podpisu investora)
- stav (čeká na podpis developera / aktivní / jednání / financování)
- zbývající čas na podpis

Akce:
- otevřít detail

#### DEV-041 Detail rezervace + podpis
Zobrazit:
- anonymizovaný profil investora (bez identity) před aktivací
- rezervační smlouvu k podpisu
- volbu podpisu:
  - elektronicky
  - mimo elektronický podpis: vygenerovat PDF → podepsat → nahrát scan

Po podpisu developera:
- rezervace se aktivuje a odhalí identitu stran dle pravidel

#### DEV-050 Potvrzení financování
Na detailu aktivní rezervace / tiketu:
- potvrzení, že peníze investora dorazily na účet developera
- pole: datum přijetí + skutečně profinancovaná částka (pokud se liší)
- možnost nahrát podklad (volitelné)

Důsledek:
- vzniká nárok na provizi platformě
- spouští se lhůty splatnosti (developer → platforma)

#### DEV-060 Finance
Zobrazit:
- seznam profinancovaných tiketů
- závazek vůči platformě (částka + splatnost, default 14 dní, upravitelné administrátorem)
- stav: neuhrazeno / uhrazeno (zadává administrátor ručně, pokud není bankovní napojení)

---

### G.6 Obrazovky – administrátor

#### ADM-010 Přehled (dashboard)
Zobrazit:
- fronty ke schválení (projekty, tikety)
- expirace tiketů
- rezervace s blížící se lhůtou podpisu
- finance: neuhrazené závazky developerů, nevyplacené provize
- incidenty

#### ADM-020 Schvalování projektů
- seznam projektů čekajících na schválení
- detail projektu (všechna data)
- akce: schválit / vrátit k doplnění / zamítnout

#### ADM-021 Schvalování tiketů
- seznam tiketů čekajících na schválení
- detail tiketu
- nastavení kapacity rezervací (default 3, upravitelné)
- akce: schválit / vrátit / zamítnout

#### ADM-040 Rezervace a smlouvy
- monitoring všech rezervací
- možnost prodloužit lhůty pro konkrétní rezervaci
- možnost ručně změnit stav (pouze s auditem a důvodem)

#### ADM-050 Finance a provize
- evidence financování (podle potvrzení developera)
- evidence úhrady platformě od developera (ruční zadání)
- generování podkladů pro obchodníka k fakturaci
- evidence nahraných faktur od obchodníků
- evidence výplat obchodníkům

#### ADM-060 Pool
- nastavení období, pravidel a met
- výpočet leaderboardu
- uzavření období + přidělení výplaty

#### ADM-070 Nastavení systému
Nastavitelné (globálně i per rezervace/tiket):
- lhůty podpisu (investor, developer)
- délka jednání
- publikační okno tiketu
- splatnosti a lhůty v provizích
- kapacita rezervací na tiketu
- globální sloty obchodníků (Partner/Premium/Elite)

---

### Příloha I: Registry formulářů (MVP – finální datový registr, Milník 1 uzavřen)

### I.0 Konvence registrů (obecná pravidla)

Tato příloha je **kanonický datový registr vstupů** pro implementaci. Určuje, jaká pole existují, kdo je vyplňuje, jaké mají základní validace a kdy se (ne)smí měnit. Texty v uživatelském rozhraní, microcopy a pořadí polí ve formulářích budeme ladit až v milníku UX/UI.

**Obecné principy editace:**
- **Administrátor může změnit jakékoliv pole kdykoliv**, ale změny musí být auditovatelné (kdo, kdy, co, proč). Historické hodnoty se nesmí „přepsat“ zpětně u již vzniklých dokumentů (např. faktury, exporty, rezervační smlouvy) – dokumenty používají **snapshot** dat platný v okamžiku jejich vytvoření.
- **Uživatel (obchodník/developer)** může měnit pole, která zadal, dokud entita není uzamčena stavem (typicky: „schváleno/publikováno“, „odesláno k podpisu“, „rezervace aktivní“, „tiket uzavřen“).
- Pole typu **souhlas** jsou z principu **jednosměrná** (souhlas lze udělit; „odvolání“ řeší administrátor jako stavovou změnu účtu/procesu – viz kapitola GDPR a audit).

**Konvence časových parametrů (SLA/lhůty):**
- Pro ukládání lhůt v systému používáme **počet hodin (celé číslo)** jako společný interní standard. (Např. 48 hodin, 14 dnů = 336 hodin, 30 dnů = 720 hodin, 90 dnů = 2160 hodin.)
- Kromě „délky“ musí systém ukládat i **referenční datum** (od kdy lhůta běží) a **deadline** (do kdy má být splněno), aby bylo jednoznačné, jak se lhůta počítá i při ručních zásazích.

**Poznámka ke zdrojům:** Word podklady jsou brány jako **archivní vstup**. Závazná je tato příloha a zbytek Souhrnu dat.

---

#### I.1 Registrace obchodníka (broker)

##### I.1.1 Formulář registrace obchodníka

| Sekce | Pole | Povinné | Kdo vyplňuje | Typ hodnoty | Validace / pravidlo | Poznámka (zobrazení) |
|---|---:|:---:|---|---|---|---|
| Identifikace | Typ subjektu | Ano | Obchodník | Výběr (enum) | právnická osoba / fyzická osoba | Default: právnická osoba |
| Identifikace | Název společnosti / Jméno a příjmení | Ano | Obchodník | Text | min. 2 znaky |  |
| Identifikace | IČO | Ano | Obchodník | Text | formát IČO, unikátní v systému | Povinné i pro fyzickou osobu (B2B) |
| Identifikace | Plátce DPH | Ano | Obchodník | Výběr (ano/ne) | pokud ANO, DIČ je povinné | Řídí fakturaci obchodníka |
| Identifikace | DIČ | Podmíněně | Obchodník | Text | formát DIČ | Povinné, pokud „Plátce DPH = ano“ |
| Identifikace | Fakturační adresa (ulice, číslo, město, PSČ, stát) | Ano | Obchodník | Text | základní validace (neprázdné) |  |
| Kontakty | E-mail (přihlášení) | Ano | Obchodník | E-mail | validní e-mail, unikátní | Klíčový login identifikátor |
| Kontakty | Telefon | Ano | Obchodník | Telefon | český formát nebo E.164 |  |
| Přístup | Heslo | Ano | Obchodník | Heslo | min. délka 10, doporučení: síla hesla |  |
| Přístup | Potvrzení hesla | Ano | Obchodník | Heslo | musí se shodovat | neukládá se |
| Profil | Region působnosti | Ne | Obchodník | Více-výběr | kraje + volitelně města | pro matching a statistiky |
| Profil | Specializace (typy projektů) | Ne | Obchodník | Více-výběr | viz kap. 8.3 |  |
| Profil | Specializace (formy financování) | Ne | Obchodník | Více-výběr | viz kap. 8.4 |  |
| Platební údaje | Bankovní účet pro výplaty (IBAN) | Ne | Obchodník | Text | IBAN validace | použije se pro výplatu provize |
| Souhlasy | Souhlas se smluvními podmínkami platformy (VOP) | Ano | Obchodník | Checkbox | bez souhlasu nelze pokračovat | jednosměrné |
| Souhlasy | Souhlas s provizními podmínkami platformy | Ano | Obchodník | Checkbox | bez souhlasu nelze pokračovat | jednosměrné |
| Souhlasy | Souhlas s mlčenlivostí (NDA) | Ano | Obchodník | Checkbox | bez souhlasu nelze pokračovat | jednosměrné |
| Souhlasy | Souhlas s etickým kodexem | Ano | Obchodník | Checkbox | bez souhlasu nelze pokračovat | jednosměrné |
| Souhlasy | Souhlas s obchodními sděleními | Ne | Obchodník | Checkbox | volitelný | kdykoliv odvolatelné (mimo MVP UX) |

##### I.1.1.1 Editace a zamykání polí (registrace obchodníka)

- **E-mail pro přihlášení:** v MVP považujeme za stabilní identifikátor – změna pouze přes administrátora (podpora), s auditní stopou.
- **Identifikační a fakturační údaje** (typ subjektu, název/jméno, IČO, plátce DPH, DIČ, adresa):
  - obchodník může upravit do schválení účtu,
  - po schválení je změna možná jen jako administrátorská změna (nebo jako žádost o změnu schválená administrátorem),
  - změny se **nepromítají zpětně** do již vystavených dokumentů; dokumenty používají snapshot.
- **Profil a platební účet (IBAN):** obchodník může měnit kdykoliv; změna se projeví jen pro budoucí výplaty.
- **Souhlasy:** po udělení je obchodník nemůže „odškrtnout“ zpět. Případné odvolání se řeší procesně (typicky deaktivací účtu nebo odhlášením z marketingu).

##### I.1.2 Administrátorské doplnění po registraci

| Sekce | Pole | Kdo vyplňuje | Typ | Pravidla |
|---|---|---|---|---|
| Governance | Stav účtu | Administrátor | enum | Čeká / Aktivní / Zamítnut / Zablokován |
| Governance | Datum schválení | Administrátor | datum a čas |  |
| Governance | Poznámka / důvod změny stavu | Administrátor | text | povinné při Zamítnut/Zablokován |
| Sloty | Úroveň obchodníka | Administrátor | enum | Partner / Premium / Elite |
| Sloty | Limit slotů (override) | Administrátor | celé číslo | default: Partner=10, Premium=25, Elite=50; admin může upravit |

##### I.1.2.1 Editace a zamykání (admin nastavení obchodníka)

- Administrátor může měnit úroveň i limit slotů kdykoliv. Doporučení: **vyžadovat důvod změny** a logovat do auditu.

##### I.1.3 Rozhodnutí a odchylky (finální)

- Platforma v této verzi neimplementuje plnohodnotné procesy AML/KYC. Probíhá pouze **interní administrativní schválení** obchodníků a developerů (kontrola údajů a smluvních dokumentů).
- Položky typu „typ spolupráce“ z Word podkladů **neevidujeme**.

---

#### I.2 Registrace developera

##### I.2.1 Formulář registrace developera

| Sekce | Pole | Povinné | Kdo vyplňuje | Typ hodnoty | Validace / pravidlo | Poznámka |
|---|---:|:---:|---|---|---|---|
| Identifikace | Typ subjektu | Ano | Developer | Výběr (enum) | právnická osoba / fyzická osoba | Default: právnická osoba |
| Identifikace | Název společnosti / Jméno a příjmení | Ano | Developer | Text | min. 2 znaky |  |
| Identifikace | IČO | Ano | Developer | Text | formát IČO, unikátní v systému |  |
| Identifikace | Plátce DPH | Ano | Developer | Výběr (ano/ne) | pokud ANO, DIČ je povinné | pro fakturaci |
| Identifikace | DIČ | Podmíněně | Developer | Text | formát DIČ | povinné, pokud „Plátce DPH = ano“ |
| Identifikace | Fakturační adresa (ulice, číslo, město, PSČ, stát) | Ano | Developer | Text | základní validace (neprázdné) |  |
| Kontakty | Oprávněná osoba – jméno | Ano | Developer | Text |  |  |
| Kontakty | Oprávněná osoba – e-mail | Ano | Developer | E-mail | validní e-mail |  |
| Kontakty | Oprávněná osoba – telefon | Ano | Developer | Telefon | český formát nebo E.164 |  |
| Kontakty | E-mail (přihlášení) | Ano | Developer | E-mail | validní e-mail, unikátní | login identifikátor |
| Přístup | Heslo | Ano | Developer | Heslo | min. délka 10, doporučení: síla hesla |  |
| Přístup | Potvrzení hesla | Ano | Developer | Heslo | musí se shodovat | neukládá se |
| Souhlasy | Souhlas se smluvními podmínkami platformy (VOP) | Ano | Developer | Checkbox | bez souhlasu nelze pokračovat | jednosměrné |
| Souhlasy | GDPR a ochrana osobních údajů | Ano | Developer | Checkbox | bez souhlasu nelze pokračovat | jednosměrné |
| Souhlasy | Prohlášení o pravdivosti údajů | Ano | Developer | Checkbox | bez souhlasu nelze pokračovat | jednosměrné |
| Souhlasy | Souhlas s marketingem | Ne | Developer | Checkbox | volitelný | odvolatelné |

##### I.2.1.1 Editace a zamykání polí (registrace developera)

- **E-mail pro přihlášení:** v MVP změna pouze přes administrátora (podpora), s auditní stopou.
- **Identifikační a fakturační údaje** (typ subjektu, název/jméno, IČO, plátce DPH, DIČ, adresa):
  - developer může upravit do schválení účtu,
  - po schválení je změna možná jen jako administrátorská změna (nebo žádost o změnu schválená administrátorem),
  - změny se nesmí promítat zpětně do již vystavených dokumentů.
- **Souhlasy:** jednosměrné; odvolání řeší procesně administrátor.

##### I.2.2 Administrátorské doplnění po registraci

| Sekce | Pole | Kdo vyplňuje | Typ | Pravidla |
|---|---|---|---|---|
| Governance | Stav účtu | Administrátor | enum | Čeká / Aktivní / Zamítnut / Zablokován |
| Governance | Datum schválení | Administrátor | datum a čas |  |
| Governance | Poznámka / důvod | Administrátor | text | povinné při Zamítnut/Zablokován |
| Fakturace | Fakturační e-mail pro zasílání faktur | Administrátor | e-mail | default: oprávněná osoba e-mail |
| Fakturace | Splatnost faktur (dny) | Administrátor | celé číslo | default: 14; admin může upravit |

##### I.2.2.1 Editace a zamykání (admin nastavení developera)

- Změna splatnosti a fakturačního e-mailu je možná kdykoliv, doporučeně s auditním důvodem.

##### I.2.3 Rozhodnutí a odchylky (finální)

- Položky typu AML/KYC a datum narození (DoB) jsou v MVP **mimo rozsah**.

---

#### I.3 Evidence investorů obchodníkem (interní databáze)

##### I.3.1 Karta investora (zadává obchodník)

| Sekce | Pole | Povinné | Kdo vyplňuje | Typ hodnoty | Validace / pravidlo | Poznámka |
|---|---:|:---:|---|---|---|---|
| Identifikace | Typ investora | Ano | Obchodník | Výběr (enum) | právnická osoba / fyzická osoba |  |
| Identifikace | Jméno a příjmení / Název společnosti | Ano | Obchodník | Text | min. 2 znaky |  |
| Identifikace | IČO | Podmíněně | Obchodník | Text | formát IČO | povinné pro právnickou osobu |
| Identifikace | DIČ | Ne | Obchodník | Text | formát DIČ | volitelné |
| Kontakty | E-mail investora | Podmíněně | Obchodník | E-mail | validní e-mail | povinné pro e-podpis a elektronické GDPR; pro offline lze nahradit dokumentem |
| Kontakty | Telefon investora | Ano | Obchodník | Telefon | český formát nebo E.164 |  |
| Lokalita | Kraj | Ne | Obchodník | Výběr (enum) | dle seznamu krajů |  |
| Lokalita | Město / obec | Ne | Obchodník | Text |  |  |
| Preference | Preferované typy projektů | Ne | Obchodník | Více-výběr | viz kap. 8.3 |  |
| Preference | Preferované formy financování | Ne | Obchodník | Více-výběr | viz kap. 8.4 |  |
| Finance (vol.) | Minimální výše investice | Ne | Obchodník | Číslo (Kč) | >=0 |  |
| Finance (vol.) | Maximální výše investice | Ne | Obchodník | Číslo (Kč) | >=0 |  |
| Finance (vol.) | Minimální výnos ročně | Ne | Obchodník | Číslo (%) | 0–100 | volitelné |
| Finance (vol.) | Maximální výnos ročně | Ne | Obchodník | Číslo (%) | 0–100 | volitelné |
| Poznámka | Poznámka (interní) | Ne | Obchodník | Text |  | pouze pro obchodníka a admin |
| Komunikace | Preferovaný způsob komunikace | Ne | Obchodník | Výběr (enum) | telefon / e-mail / osobně / kombinace |  |
| Komunikace | Frekvence kontaktu | Ne | Obchodník | Výběr (enum) | ihned / při nové nabídce / periodicky |  |

##### I.3.1.1 Editace a zamykání (karta investora)

- Investor je „interní kontakt“ obchodníka. Obchodník může kartu investora upravovat kdykoliv.
- Pro právní jistotu systém při vytvoření rezervace a podpisu dokumentů ukládá **snapshot investora** do rezervace (tj. i kdyby obchodník později upravil e-mail/jméno, historické dokumenty a audit zůstávají konzistentní).

##### I.3.2 GDPR a právní komunikace s investorem (automatizované záznamy)

| Pole | Kdo vyplňuje | Typ | Pravidla |
|---|---|---|---|
| Stav souhlasu investora se zpracováním osobních údajů | Systém | enum | Neposláno / Odesláno / Souhlas udělen / Souhlas odmítnut / Odvolán |
| Datum a čas udělení souhlasu | Systém | datum a čas | ukládat včetně časové zóny |
| Důkaz souhlasu | Systém | text + odkaz | např. identifikátor e-mailu / podpisu, IP, hash dokumentu |

> Doporučení: GDPR a informační texty posílat investorovi už při vytvoření investora (nečekat až na rezervaci), aby se eliminovalo zdržení v procesu.

##### I.3.3 Rozhodnutí a odchylky (finální)

- Platforma investora **neschvaluje ani neověřuje**. Obchodník může vytvořit investora a rovnou jej použít v rezervaci.
- AML/KYC položky (doklady, datum narození) jsou v MVP **mimo rozsah**.

---

#### I.4 Zadání projektu (developer i obchodník)

> Princip: Projekt může do systému zadat **developer** nebo **obchodník**. V obou případech jde o **návrh ke schválení administrátorem**. Pokud projekt zadává obchodník, administrátor následně mimo platformu zajistí zasmluvnění projektu s developerem.

| Sekce | Pole | Povinné | Kdo vyplňuje | Typ hodnoty | Validace / pravidlo | Poznámka (zobrazení) |
|---|---:|:---:|---|---|---|---|
| Základ | Název projektu | Ano | Developer / Obchodník | Text | Max. délka dle UI (doporučení 120 znaků) | Skryto pro ostatní obchodníky do aktivace rezervace |
| Základ | Typ projektu | Ano | Developer / Obchodník | Výběr z nabídky | Viz kap. 8.3 (Rezidenční, Logistika, …) | Viditelné v anonymizované podobě i před aktivací |
| Základ | Stručný popis projektu | Ano | Developer / Obchodník | Text | Doporučení: 3–5 vět | Před aktivací bez identifikačních detailů |
| Lokalita | Kraj | Ano | Developer / Obchodník | Výběr z nabídky | Viz kap. 8.7.1 | Viditelné před aktivací |
| Lokalita | Město / obec | Ano | Developer / Obchodník | Text | Bez speciální validace (doporučení: našeptávač) | Viditelné před aktivací |
| Lokalita | Přesná adresa | Ne | Developer / Obchodník | Text |  | Skryto před aktivací |
| Lokalita | Popis nemovitosti / lokality | Ne | Developer / Obchodník | Text |  |  |
| Developer (lead) | Developer (pokud zadává developer) | Ano | Developer | Vazba na subjekt |  | Developer vždy vidí své údaje |
| Developer (lead) | Název společnosti developera (pokud zadává obchodník) | Ano | Obchodník | Text |  | Administrátor následně doplní/napáruje účet developera |
| Developer (lead) | IČO developera (pokud zadává obchodník) | Ne | Obchodník | Text | Formát IČO | Pomáhá párování |
| Developer (lead) | Kontaktní osoba – jméno | Ano | Developer / Obchodník | Text |  | Skryto pro ostatní obchodníky |
| Developer (lead) | Kontaktní osoba – e-mail | Ano | Developer / Obchodník | E-mail | E-mail validace | Skryto pro ostatní obchodníky |
| Developer (lead) | Kontaktní osoba – telefon | Ano | Developer / Obchodník | Telefon | E.164 nebo český formát | Skryto pro ostatní obchodníky |
| Ekonomika (vol.) | Celkový rozpočet projektu | Ne | Developer / Obchodník | Číslo (Kč) | >=0 | Nezveřejňovat citlivé detaily před aktivací |
| Ekonomika (vol.) | Vlastní kapitál | Ne | Developer / Obchodník | Číslo (Kč) | >=0 |  |
| Ekonomika (vol.) | Cizí zdroje – typ | Ne | Developer / Obchodník | Výběr z nabídky | Banka / jiný úvěr / jiné |  |
| Ekonomika (vol.) | Cizí zdroje – výše | Ne | Developer / Obchodník | Číslo (Kč) | >=0 |  |
| Finance | Využití prostředků – procentuální rozpad (sum=100%) | Ano | Developer / Obchodník | Seznam kategorií + % | Součet = 100 % | Kanonický rozpad dle kap. 8.6 |
| Finance | Tagy využití prostředků (volitelně) | Ne | Developer / Obchodník | Tagy | volitelné | doplňková kategorizace |
| Dokumenty | Dokumenty k projektu | Ne | Developer / Obchodník | Soubor(y) | PDF / DOCX / XLSX / JPG; limit velikosti dle UI | Viditelnost dle role a stavu (kap. 4.5) |

##### I.4.1 Editace a zamykání (projekt)

- Projekt je editovatelný v režimu **Koncept** a **Ke schválení** (dokud administrátor neschválí).
- Po **schválení/publikaci** projektu se přímá editace projektových dat uzamkne. Změny probíhají přes žádost o změnu schválenou administrátorem (s auditní stopou).

---

#### I.5 Zadání tiketu (pod projektem)

| Sekce | Pole | Povinné | Kdo vyplňuje | Typ hodnoty | Validace / pravidlo | Poznámka |
|---|---:|:---:|---|---|---|---|
| Základ | Projekt | Ano | Developer / Obchodník | Vazba na projekt | musí existovat |  |
| Základ | Název tiketu (interní) | Ne | Developer / Obchodník | Text |  | pro administraci |
| Finance | Cílová částka tiketu (Kč) | Ano | Developer / Obchodník | Číslo (Kč) | >0 | 1 tiket = 1 investor (bez částečného financování) |
| Finance | Forma financování | Ano | Developer / Obchodník | Výběr (enum) | viz kap. 8.4 | musí být viditelné v kartě tiketu |
| Finance | Předpokládaný výnos (vol.) | Ne | Developer / Obchodník | Text / číslo |  | volitelné |
| Finance | Provize platformy (%) | Ano | Administrátor | Číslo (%) | 0–100 | primárně se komunikuje v Kč; % je interní |
| Finance | Provize platformy (Kč) | Ano | Administrátor | Číslo (Kč) | >=0 | primární údaj pro uživatele |
| Rezervace | Kapacita aktivních rezervací na tiket | Ano | Administrátor | celé číslo | default 3; admin může upravit | rozhoduje o počtu investorů „v kapacitě“ |
| Rezervace | Lhůta podpisu investora | Ano | Administrátor | číslo (hodiny) | default 48 | lze upravit per rezervace |
| Rezervace | Lhůta podpisu developera | Ano | Administrátor | číslo (hodiny) | default 48 | lze upravit per rezervace |
| Rezervace | Doba jednání po aktivaci rezervace | Ano | Administrátor | číslo (hodiny) | default 720 (30 dnů) | lze prodloužit |
| Publikace | Publikační okno tiketu | Ano | Administrátor | číslo (hodiny) | default 2160 (90 dnů) | admin může upravit a prodloužit |
| Publikace | Viditelnost tiketu | Ano | Administrátor | enum | Viditelný / Skrytý | skrytý = ruční zásah admina |
| Dokumenty | Dokumenty k projektu (sdílené) | Ne | Developer / Obchodník | (odkaz) | viz projekt | dokumenty jsou jen na projektu, ne na tiketu |

##### I.5.1 Editace a zamykání (tiket)

- Tiket může měnit přímou editací pouze administrátor; developer může změny **navrhnout** jako žádost.
- Tiket **nelze měnit**, pokud:
  - existuje **aktivní rezervace**, nebo
  - existuje **rezervace v procesu podpisu** (odesláno k podpisu investora / developera).
- Po financování je tiket **uzavřen** a slouží jen jako reference.

---

#### I.6 Vytvoření rezervace a podpis rezervační smlouvy

##### I.6.1 Kroky rezervace (obchodník)

| Krok | Akce / pole | Povinné | Kdo provádí | Typ hodnoty | Pravidla |
|---:|---|:---:|---|---|---|
| 1 | Výběr tiketu | Ano | Obchodník | Reference | tiket musí být Viditelný a ne Uzavřený |
| 2 | Výběr investora z interní databáze | Ano | Obchodník | Reference | investor nemusí být schválen platformou |
| 3 | Volba způsobu podpisu investorem | Ano | Obchodník | enum | Elektronický podpis / Offline (PDF + podpis + scan) |
| 4 | Generovat rezervační smlouvu | Ano | Systém | dokument | vygenerovat z aktuálních snapshotů |
| 5 | Podpis investora | Ano | Investor | podpis | rozhoduje pořadí ve frontě dle času podpisu investora |
| 6 | Nahrání scanu (pokud offline) | Podmíněně | Obchodník | soubor | PDF/JPG; povinné pro offline |
| 7 | Notifikace developera k podpisu | Ano | Systém | event | developer je vyzván k podpisu pouze pokud je investor „v kapacitě“ |

##### I.6.1.1 Editace a zamykání (rezervace)

- Po založení rezervace nelze změnit **tiket** ani **investora** – řeší se zrušením rezervace a vytvořením nové (administrátor může výjimečně zasáhnout s auditní stopou).
- Po podpisu investora se rezervace uzamyká vůči úpravám obsahu smlouvy; změnit lze pouze stav (zrušení/expirace) dle pravidel.

##### I.6.2 Podpis rezervace developerem

| Krok | Akce / pole | Povinné | Kdo provádí | Typ hodnoty | Pravidla |
|---:|---|:---:|---|---|---|
| 1 | Volba způsobu podpisu developerem | Ano | Developer | enum | Elektronický podpis / Offline (PDF + podpis + scan) |
| 2 | Podpis developera | Ano | Developer | podpis | po podpisu obou stran se rezervace aktivuje |
| 3 | Nahrání scanu (pokud offline) | Podmíněně | Developer | soubor | PDF/JPG; povinné pro offline |
| 4 | Aktivace rezervace | Ano | Systém | stav | odkryje se identita stran + jméno obchodníka (viz kap. 4.5) |

##### I.6.2.1 Editace a zamykání (podpis developerem)

- Po aktivaci rezervace jsou dokumenty a metadata (kdo/kdy podepsal) **neměnné**; možné jsou jen administrátorské opravy se zachováním původních souborů a auditní stopy.

---
#### I.7 Potvrzení financování (developer)

| Pole / akce | Povinné | Kdo provádí | Typ hodnoty | Pravidlo | Poznámka |
|---|:---:|---|---|---|---|
| Výběr rezervace k potvrzení | Ano | Developer | Výběr | Pouze rezervace ve stavu „aktivní“ |  |
| Datum přijetí financí na účet developera | Ano | Developer | Datum | **Od tohoto data běží lhůty** (splatnost provize developer → platforma) | Viz kap. 4.6.2 |
| Skutečně profinancovaná částka | Ano | Developer (admin může opravit) | Číslo (Kč) | Může se lišit od cílové částky tiketu (bez částečného financování) | Slouží pro výpočet provizí |
| Podklady k financování | Volitelné | Developer | Nahrání souborů | PDF/JPG/PNG | Pokud nejsou přiloženy, vyžaduje se „Poznámka / důvod“ |
| Poznámka / důvod (pokud nejsou podklady) | Podmíněně | Developer | Text | Povinné, pokud nejsou přiloženy žádné podklady | Doporučeno stručně popsat zdroj potvrzení (např. „výpis z účtu“, „potvrzení banky“, „e-mail CFO“) |
| Potvrdit profinancování | Ano | Developer | Akce | Nevratná akce (mimo administrátorské opravy s auditní stopou) | Vyvolá zánik ostatních rezervací a start finančních lhůt |
| Zrušení ostatních rezervací na tiketu | Ano (syst.) | Systém | Akce | Po potvrzení financování se ostatní rezervace ukončí | Notifikace obchodníkům + důvod |

**Auditní stopa (automaticky):**
- systém uloží událost „Potvrzení profinancování“: kdo, kdy, jaká částka, jaké datum profinancování, zda jsou podklady / poznámka;
- pokud administrátor provede později opravu částky nebo data, ukládá se samostatná událost „Administrátorská korekce profinancování“ včetně původní hodnoty, nové hodnoty a důvodu.

#### I.8 Fakturace obchodníka platformě (nahrání faktury)

**Účel:** obchodník vystaví platformě fakturu na provizi za úspěšně profinancovaný tiket na základě podkladů, které mu platforma poskytne.

**Kdy je možné fakturovat:**
- až po tom, co je u dané rezervace potvrzené financování developerem (kap. 4.6.2) **a zároveň**
- až po tom, co administrátor (ručně) potvrdí úhradu provize platformě od developera (bez bankovní integrace).

| Pole / akce | Povinné | Kdo provádí | Typ hodnoty | Pravidlo | Poznámka |
|---|:---:|---|---|---|---|
| Výběr provizní události k fakturaci | Ano | Obchodník | Výběr | Pouze položky ve stavu „lze fakturovat“ | Typicky 1 událost = 1 faktura |
| Podklady k fakturaci (souhrn) | Ano (syst.) | Systém | Zobrazení / PDF | Obsahuje: identifikaci platformy, identifikaci tiketu, datum financování, částku financování, částku provize obchodníka (v Kč) | Slouží jako „návod“ pro vystavení faktury |
| Číslo faktury | Ano | Obchodník | Text | Unikátní v rámci obchodníka |  |
| Datum vystavení | Ano | Obchodník | Datum |  |  |
| Datum splatnosti | Ano | Obchodník | Datum | Výchozí dle nastavení platformy (např. 14 dní) | Administrátor může dohodnout jinak |
| Fakturovaná částka (v Kč) | Ano | Obchodník | Číslo | Musí odpovídat podkladům k fakturaci (nebo vyžaduje ruční schválení administrátorem) | Primární částka je v Kč |
| Daň z přidané hodnoty (DPH) – sazba | Podmíněně | Obchodník | Výběr | Pouze pokud je obchodník plátce DPH | Sazba dle aktuální legislativy (ponecháváme jako datové pole) |
| DPH – částka | Podmíněně | Obchodník | Číslo | Musí odpovídat výpočtu z částky bez DPH | Pokud není plátce DPH, je 0 |
| Celková částka k úhradě | Ano (odvozeně) | Systém | Číslo | Součet částky bez DPH a DPH |  |
| Nahrání faktury (PDF) | Ano | Obchodník | Soubor | Povinný formát PDF | Platforma ukládá jako účetní doklad |
| Poznámka k faktuře | Ne | Obchodník | Text |  |  |
| Stav faktury | Ano (syst.) | Systém | Stav | „nahraná“ → „schválená“ → „proplacená“ | Stav mění administrátor |


#### I.9 Administrátorské nastavení parametrů (globální + na úrovni tiketu/rezervace)

**Zdroje:** kap. 6 (nastavitelné parametry), kap. 4.5.4 (kapacita), kap. 4.6 (finance), kap. 10 (provize, pool, publikační okno), kap. 17 (nastavení administrátora).

> Administrátor má právo změnit vše na platformě. Každá změna musí mít důvod a auditní stopu.

##### I.9.1 Globální parametry (výchozí hodnoty)

| Parametr | Výchozí hodnota | Kdo mění | Poznámka |
|---|---:|---|---|
| Lhůta podpisu investora | 48 hodin | Administrátor | Lze upravit i pro konkrétní rezervaci |
| Lhůta podpisu developera | 48 hodin | Administrátor | Start až když je rezervace „v kapacitě“ |
| Doba jednání po aktivaci rezervace | 30 dnů | Administrátor | Lze upravit/prodloužit pro konkrétní rezervaci |
| Publikační okno tiketu | 90 dnů | Administrátor | Lze upravit/prodloužit pro konkrétní tiket |
| Splatnost provize developer → platforma | 14 dnů | Administrátor | Lze upravit pro konkrétní tiket/projekt |
| Splatnost platforma → obchodník | 3 dny | Administrátor | Po úhradě provize platformě |
| Výchozí kapacita rezervací na tiketu | 3 | Administrátor | Per tiket lze nastavit 1–3 (nebo více, pokud dovolíte) |
| Podíl do bonusového programu Pool | 10 % z podílu platformy (bez DPH) | Administrátor | Pouze pokud je Pool aktivní |
| Meta 1 / Meta 2 pro Pool (základ) | 100 mil. / 200 mil. Kč | Administrátor | Pro zkrácené první období se mety přepočítají poměrně dle délky období |
| Limit kvalifikovaných obchodníků pro Pool | 3 | Administrátor | Pouze první 3, kteří dosáhnou mety 1 |
| Uzávěrka období Pool | datum‑do + 14 dní | Administrátor | Před uzávěrkou lze započítat pozdní potvrzení úhrad, které patří do období |
| Rollover pravidlo (0 kvalifikovaných) | 50 % platforma / 50 % převod | Administrátor | Administrátor může upravit |
| Pravidlo rozdělení Poolu | Meta 2: vítěz bere 100 % / Jinak: poměrově dle obratu kvalifikovaných | Administrátor | Pokud je kvalifikovaný jen 1 obchodník (meta 1), bere 100 % |
##### I.9.2 Parametry na úrovni tiketu

| Parametr | Povinné | Kdo mění | Pravidlo | Poznámka |
|---|:---:|---|---|---|
| Kapacita rezervací na tiketu | Ano | Administrátor | Určuje počet rezervací „v kapacitě“ (fronta se řídí časem podpisu investora) | Výchozí 3 |
| Publikační okno – datum konce | Ano | Administrátor | Po uplynutí: tiket expirovaný | Lze prodlužovat |
| Stav tiketu (publikovaný/skrytý/expirovaný/uzavřený) | Ano | Administrátor | Administrátor může měnit ručně | Uzavřený = profinancovaný |
| Procento provize platformy (z financované částky) | Ano | Administrátor | Odpovídá smlouvě s developerem | Primární je vyjádření v Kč, ale procento je nutné pro výpočet |
| Rozdělení provize (platforma/obchodník 1/obchodník 2) | Ano | Administrátor | Součet = 100 % | Default 50/25/25, ale je to ručně nastavitelné |

##### I.9.3 Parametry na úrovni rezervace

| Parametr | Povinné | Kdo mění | Pravidlo | Poznámka |
|---|:---:|---|---|---|
| Prodloužení lhůty podpisu investora | Ne | Administrátor | Uloží se nový termín | Vždy s důvodem |
| Prodloužení lhůty podpisu developera | Ne | Administrátor | Uloží se nový termín | Vždy s důvodem |
| Prodloužení doby jednání | Ne | Administrátor | Uloží se nový termín | Vždy s důvodem |
| Ruční úprava profinancované částky (override) | Ne | Administrátor | Má dopad na provize i obrat pro Pool | Auditní stopa povinná |


#### I.10 Ruční zadání plateb (bez bankovní integrace)

**Účel:** protože platforma není napojená na banku, stavy úhrad se potvrzují ručně v systému.

| Pole / akce | Povinné | Kdo provádí | Typ hodnoty | Pravidlo | Poznámka |
|---|:---:|---|---|---|---|
| Potvrdit úhradu provize platformě od developera | Ano | Administrátor | Akce + datum + částka | Odemkne možnost fakturace obchodníků | Doporučení: uložit variabilní symbol / poznámku / přílohu |
| Datum přijetí platby platformou | Ano | Administrátor | Datum | Od tohoto data může běžet splatnost směrem k obchodníkům |  |
| Částka přijatá platformou | Ano | Administrátor | Číslo | Musí odpovídat očekávané provizi (nebo vyžaduje vysvětlení) |  |
| Potvrdit výplatu obchodníkovi | Ano | Administrátor | Akce + datum + částka | U každé faktury zvlášť |  |
| Datum odeslání platby obchodníkovi | Ano | Administrátor | Datum |  |  |
| Částka odeslaná obchodníkovi | Ano | Administrátor | Číslo | Musí odpovídat schválené faktuře |  |
| Přílohy k platbě | Ne | Administrátor | Soubor |  | Např. potvrzení o platbě |
