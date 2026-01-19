# Tipari.cz – Specifikace uživatelské zkušenosti (kostra)

**Verze:** 1.1 (kostra)  
**Datum:** 2026-01-19  
**Stav:** připraveno k doplňování (bez grafiky, bez kódu)

> Tento dokument popisuje *uživatelské cesty, chování obrazovek a pravidla použitelnosti*.  
> **Kanonická data a obchodní pravidla jsou zdrojem pravdy** a jsou popsaná ve: `Tipari_Souhrn_Dat_DATA_v1.0.md`.
>
> Grafická podoba a konkrétní prvky uživatelského rozhraní budou řešeny v samostatném dokumentu: `Tipari_UI_SPEC_v0.1.md`.

---

## Obsah

1. [Účel dokumentu a rozsah](#1-účel-dokumentu-a-rozsah)  
2. [Slovník pojmů a jednotná terminologie](#2-slovník-pojmů-a-jednotná-terminologie)  
3. [Role, přístupy a základní mentalita uživatelů](#3-role-přístupy-a-základní-mentalita-uživatelů)  
4. [Zásady uživatelské zkušenosti](#4-zásady-uživatelské-zkušenosti)  
5. [Informační architektura a navigace](#5-informační-architektura-a-navigace)  
6. [Hlavní objekty v systému a jejich „život“ v rozhraní](#6-hlavní-objekty-v-systému-a-jejich-život-v-rozhraní)  
7. [Maskování a odkrytí identit](#7-maskování-a-odkrytí-identit)  
8. [Klíčové uživatelské cesty](#8-klíčové-uživatelské-cesty)  
9. [Formuláře, validace a práce s daty](#9-formuláře-validace-a-práce-s-daty)  
10. [Dokumenty a podpisy](#10-dokumenty-a-podpisy)  
11. [Notifikace a komunikace](#11-notifikace-a-komunikace)  
12. [Časové lhůty, odpočty a průběhové indikátory](#12-časové-lhůty-odpočty-a-průběhové-indikátory)  
13. [Chybové stavy, okrajové situace a konkurenční konflikty](#13-chybové-stavy-okrajové-situace-a-konkurenční-konflikty)  
14. [Přístupnost a srozumitelnost](#14-přístupnost-a-srozumitelnost)  
15. [Záznam událostí a auditní stopa v rozhraní](#15-záznam-událostí-a-auditní-stopa-v-rozhraní)  
16. [Otevřené body a seznam rozhodnutí k doplnění](#16-otevřené-body-a-seznam-rozhodnutí-k-doplnění)  

Přílohy:
- [Příloha A: Šablona specifikace obrazovky](#příloha-a-šablona-specifikace-obrazovky)
- [Příloha B: Šablona specifikace uživatelské cesty](#příloha-b-šablona-specifikace-uživatelské-cesty)

---

## 1. Účel dokumentu a rozsah

### 1.1 Účel

- Popsat, jak má platforma Tipari.cz fungovat z pohledu uživatelské zkušenosti.
- Převést kanonická data, stavy a procesy do:
  - seznamu obrazovek,
  - očekávaného chování,
  - pravidel pro práci s časem,
  - pravidel pro viditelnost informací,
  - minimalizace rizika chyb a nedorozumění.

### 1.2 V rozsahu

- Role: **obchodník**, **developer**, **administrátor**.
- Komunikace s investorem mimo platformu (e-mail, podpis dokumentu), protože investor nemá přístup do aplikace.
- Procesy: projekty a tikety, rezervace a smlouvy, potvrzení financování, provize a fakturace, bonusový program Pool.

### 1.3 Mimo rozsah

- Grafické návrhy, rozmístění prvků, barevnost, typografie (řeší UI specifikace a design systém).
- Integrace banky (v systému se zadává ručně).
- Detailní texty všech notifikací (budou doplněny později; zde jsou zatím typy událostí a obsahové požadavky).

---

## 2. Slovník pojmů a jednotná terminologie

> Cíl: všichni (zadání, návrh, vývoj, testování) používají stejné pojmy.

Používat konzistentně:

- **Projekt** – celek zadání od developera.
- **Tiket** – konkrétní nabídka k financování v rámci projektu.
- **Rezervace** – proces vedoucí k aktivaci (podpis investora a developera).
- **Rezervační smlouva** – dokument mezi investorem a developerem.
- **Aktivní rezervace** – stav po podpisu obou stran.
- **Jednání** – časové okno po aktivaci rezervace (výchozí 30 dnů; administrátor může upravit/prodloužit).
- **Financování** – reálné přijetí peněz na účet developera; potvrzuje developer v aplikaci.
- **Provize platformy** – vzniká až po financování.
- **Provize obchodníka** – podíl z provize platformy; obchodník fakturuje platformě.
- **Pool** – bonusový program financovaný z podílu platformy.

---

## 3. Role, přístupy a základní mentalita uživatelů

### 3.1 Obchodník

- Vidí katalog projektů a tiketů, ale do aktivace rezervace má omezenou identifikaci projektu a developera.
- Eviduje své investory v interní databázi (bez schvalování platformou).
- Vytváří rezervace a zajišťuje podpis investora.
- Potřebuje jasně vidět:
  - pozici v pořadí,
  - zda je „v kapacitě“,
  - kolik času zbývá,
  - zda už jiný investor projekt profinancoval.

### 3.2 Developer

- Zadává projekty a tikety, spravuje projektové dokumenty.
- U rezervací vyhodnocuje investory a podepisuje rezervační smlouvy.
- Potvrzuje datum přijetí financí na účet a případnou finální profinancovanou částku.
- Nemůže měnit tiket, pokud existují aktivní rezervace nebo již běží proces podpisu.

### 3.3 Administrátor

- Může změnit vše (správa rolí, dat, lhůt, kapacit, stavů).
- Ručně potvrzuje přijetí provize platformou na účet (pro spuštění výplat obchodníkům a obratu do Poolu).
- Spravuje auditní stopu a řeší incidenty.

### 3.4 Investor

- Nemá přístup do aplikace.
- Interaguje skrze:
  - podpis rezervační smlouvy (elektronicky nebo naskenovaný podpis),
  - povinné souhlasy a informace o ochraně osobních údajů (zákonné minimum).

---

## 4. Zásady uživatelské zkušenosti

### 4.1 Data rozhodují, text vysvětluje

- Primární informace jsou čísla, stavy a termíny.
- Text má být krátký a popisovat „co to znamená“ a „co dělat dál“.

### 4.2 Vždy je jasné, kdo je na tahu

- U každého kroku musí být vidět:
  - kdo má udělat další akci,
  - do kdy,
  - co se stane při nečinnosti.

### 4.3 Časovače a lhůty jsou transparentní

- Všude, kde běží čas, zobrazit:
  - datum a čas konce,
  - zbývající čas,
  - možnost prodloužení administrátorem (a záznam o prodloužení).

### 4.4 Platforma chrání obchodní tajemství a právní pozici

- Identita stran se odkrývá až po podpisu obou stran (aktivace rezervace).
- Rozhraní musí podporovat důkazní stopu „představení investora developerovi“.

---

## 5. Informační architektura a navigace

> Níže je minimální návrh struktury menu. Detailní návrh obrazovek bude v UI specifikaci.

### 5.1 Navigace – obchodník

1) Přehled  
2) Projekty a tikety (katalog)  
3) Moje rezervace  
4) Investoři  
5) Fakturace  
6) Pool  
7) Podpora / incidenty  
8) Profil a nastavení

### 5.2 Navigace – developer

1) Přehled  
2) Projekty  
3) Tikety  
4) Rezervace  
5) Finance (závazky vůči platformě)  
6) Dokumenty  
7) Podpora / incidenty  
8) Profil a nastavení

### 5.3 Navigace – administrátor

1) Přehled  
2) Schvalování (projekty, tikety)  
3) Uživatelé  
4) Rezervace a smlouvy  
5) Finance a provize  
6) Pool  
7) Nastavení systému  
8) Audit  
9) Incident management

---

## 6. Hlavní objekty v systému a jejich „život“ v rozhraní

> Detailní datové modely jsou v Souhrnu dat. Zde definujeme, jak se s nimi pracuje v rozhraní.

### 6.1 Projekt

- Vytvoření → odeslání ke schválení → schválení/zamítnutí → publikace tiketů.
- Projekt má dokumenty (pouze projektové dokumenty).

### 6.2 Tiket

- Má publikační okno (výchozí 90 dnů) a stavovou logiku (aktivní, expirovaný, skrytý, uzavřený).
- Tiket má kapacitu rezervací (výchozí 3; upravitelné administrátorem).
- Zobrazuje formu financování (povinný údaj v kartě tiketu).

### 6.3 Rezervace

- Vzniká obchodníkem pro vybraného investora.
- Důležité body:
  - pořadí podle času podpisu investora,
  - podpis developera neovlivňuje pořadí,
  - po podpisu obou stran je rezervace aktivní a odkrývají se identity.
- Po úspěšném financování jedním investorem všechny ostatní rezervace k tiketu zanikají.

### 6.4 Financování

- Potvrzuje developer: datum přijetí na účet + finální profinancovaná částka.
- Může přiložit podklady nebo uvést poznámku/důvod.
- Od tohoto data se počítají lhůty (například splatnost provize platformě).

### 6.5 Provize a fakturace

- Platforma fakturuje developerovi provizi (v českých korunách) + případně daň z přidané hodnoty.
- Obchodník fakturuje platformě svůj podíl z provize platformy (v českých korunách) + případně daň z přidané hodnoty.

### 6.6 Pool

- Bonusový program financovaný z podílu platformy.
- Vyhodnocení v pololetích.

---

## 7. Maskování a odkrytí identit

### 7.1 Co je maskováno

Do aktivace rezervace se maskuje:
- název projektu,
- jméno developera,
- identifikační údaje investora,
- identifikace obchodníka vůči developerovi.

### 7.2 Kdy a komu se identita odkrývá

Po podpisu rezervační smlouvy oběma stranami (aktivace rezervace):
- obchodník uvidí název projektu a jméno developera,
- developer uvidí jméno investora,
- developer uvidí jméno obchodníka.

### 7.3 Důkazní a auditní stopa

- Systém musí umět dohledat:
  - kdy došlo k aktivaci,
  - jaká verze dokumentu byla podepsána,
  - komu se jaké údaje v jaký okamžik zpřístupnily.

---

## 8. Klíčové uživatelské cesty

> Zde se budou doplňovat detailní kroky, obrazovky a akce.

### 8.1 Obchodník – registrace a schválení

- krok 1: vyplnění registračního formuláře
- krok 2: odeslání ke schválení
- krok 3: schválení nebo zamítnutí administrátorem

### 8.2 Obchodník – evidence investorů

- vytvoření investora (interní databáze)
- úprava investora
- vyřazení/smazání investora

### 8.3 Obchodník – rezervace na tiketu

- výběr tiketu
- výběr investora z databáze
- vygenerování rezervační smlouvy
- podpis investora (elektronicky nebo nahraný podpis)
- čekání na podpis developera
- aktivace rezervace (odkrytí identit)
- jednání a průběh do financování

### 8.4 Developer – potvrzení financování

- vybrat aktivní rezervaci
- zadat datum přijetí peněz na účet
- zadat finální profinancovanou částku
- přiložit podklady nebo uvést poznámku

### 8.5 Administrátor – finanční tok a výplata provizí

- potvrzení, že provize byla uhrazena platformě (ručně)
- spuštění výplaty obchodníkům (na základě faktury)
- započtení obratu do Poolu

### 8.6 Pool – vyhodnocení období

- období je vždy pololetí (od 1. 1. / od 1. 7.)
- kvalifikace podle obratu
- anonymní vyhlášení výsledků

---

## 9. Formuláře, validace a práce s daty

> Tato část bude doplněna podle finálního seznamu polí v Souhrnu dat.

### 9.1 Obecné zásady formulářů

- povinná pole jasně označit,
- validace v reálném čase,
- jednotný styl chybových hlášek,
- možnost uložit rozpracovaný stav.

### 9.2 Registrace obchodníka – pole

- [DOPLNIT] (viz Souhrn dat)

### 9.3 Registrace developera – pole

- [DOPLNIT] (viz Souhrn dat)

### 9.4 Investor – pole pro interní databázi obchodníka

- [DOPLNIT] (viz Souhrn dat)

### 9.5 Projekt a tiket – pole

- [DOPLNIT] (viz Souhrn dat)

---

## 10. Dokumenty a podpisy

### 10.1 Elektronický podpis

- Rezervační smlouva může být podepsána elektronicky investorem i developerem.

### 10.2 Podpis mimo elektronický podpis

- Obchodník i developer musí mít možnost:
  - vygenerovat dokument do souboru PDF,
  - vytisknout,
  - podepsat fyzicky,
  - nahrát scan do rozpracované rezervace.

### 10.3 Verze dokumentů

- Pokud se dokument v průběhu mění, musí být vždy dohledatelná verze, která byla podepsána.

---

## 11. Notifikace a komunikace

> Notifikace: hlavně e-mail + doplňkově centrum notifikací v aplikaci.

### 11.1 Události pro notifikace

- [PŘEVZATO Z EXISTUJÍCÍHO SEZNAMU – DOPLNIT DETAILY]

### 11.2 Obsahové zásady

- neutrální tón,
- jasné termíny a následky,
- u investora povinné informace k ochraně osobních údajů.

---

## 12. Časové lhůty, odpočty a průběhové indikátory

- podpis investora: výchozí 48 hodin (upravitelné administrátorem)
- podpis developera: výchozí 48 hodin (upravitelné administrátorem)
- jednání po aktivaci: výchozí 30 dnů (upravitelné/prodloužitelné)
- publikační okno tiketu: výchozí 90 dnů (upravitelné/prodloužitelné)

V rozhraní vždy zobrazit:
- zbývající čas,
- datum konce,
- kdo je na tahu,
- informaci, že administrátor může lhůtu prodloužit.

---

## 13. Chybové stavy, okrajové situace a konkurenční konflikty

### 13.1 Kapacita rezervací a pořadí

- Kapacita tiketu určuje, kolik rezervací může být v „aktivním procesu“.
- Pořadí určuje podpis investora.
- Pokud developer odmítne investora na vyšším pořadí, další se automaticky posouvají.

### 13.2 Zánik rezervací po financování

- Po potvrzení financování jedním investorem ostatní rezervace zanikají.

### 13.3 Změna finální profinancované částky

- Administrátor může ručně opravit finální částku pro účely správného výpočtu provizí.

---

## 14. Přístupnost a srozumitelnost

- ovladatelnost klávesnicí,
- informace nesmí být sděleny pouze barvou,
- jasné chybové zprávy,
- potvrzení citlivých akcí.

---

## 15. Záznam událostí a auditní stopa v rozhraní

> Pro návrh auditní stopy je zdrojem pravdy Souhrn dat. Tady popisujeme, co má být vidět uživateli.

- U důležitých událostí zobrazit „časovou osu“:
  - vytvoření rezervace,
  - podpis investora,
  - podpis developera,
  - aktivace,
  - potvrzení financování,
  - potvrzení úhrady provize platformě,
  - výplata obchodníkovi.

- Administrátor musí mít detailní auditní záznam:
  - kdo co změnil,
  - kdy,
  - z jaké hodnoty na jakou,
  - s důvodem, pokud je vyžadován.

---

## 16. Otevřené body a seznam rozhodnutí k doplnění

- [DOPLNIT] Přesné texty notifikací.
- [DOPLNIT] Finální pořadí a povinnost polí formulářů.
- [DOPLNIT] Detailní mapování obrazovek na datové entity.

---

# Příloha A: Šablona specifikace obrazovky

> Používat pro každý návrh obrazovky.

- **Název obrazovky:**
- **Role:**
- **Cíl uživatele:**
- **Primární akce:**
- **Sekundární akce:**
- **Data, která se zobrazují:**
- **Data, která se zadávají:**
- **Podmínky viditelnosti (práva, stavy):**
- **Stavy a chování (načítání, prázdný stav, chyba):**
- **Notifikace (kdy a komu):**
- **Auditní záznamy (co se loguje):**

---

# Příloha B: Šablona specifikace uživatelské cesty

> Používat pro každou klíčovou cestu.

- **Název cesty:**
- **Role:**
- **Spouštěč (co se stane):**
- **Předpoklady:**
- **Kroky (1…N):**
- **Možné výsledky:**
- **Časové lhůty:**
- **Notifikace:**
- **Rizika a chybové stavy:**
- **Auditní stopa:**

