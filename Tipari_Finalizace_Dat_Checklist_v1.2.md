# Tipari.cz — Finalizace dat (bez UX/UI)

> Stav k: 19. 1. 2026
> 
> Cíl: uzamknout kanonická data a obchodní pravidla tak, aby šly přímo převést do databázového modelu, validací a procesních pravidel.

---

## A) Co je už považované za uzamčené

- **Role a odpovědnosti**: administrátor / obchodník / developer / investor (investor není uživatel platformy).
- **Typy projektů (hlavní)**: Rezidenční, Logistika, Komerční, Smíšený, Retail, Ubytovací zařízení, Pozemky, Energetika, Ostatní.
- **Doplňkové tagy projektu**: procentuální rozpad (součet 100 %) + volitelné doplňkové tagy.
- **Úrovně obchodníka a sloty**: Partner (10), Premium (25), Elite (50) — upravitelné administrátorem.
- **Formy financování (jedno pole na tiketu)**:
  - Zápůjčka / úvěr
  - Mezaninové financování
  - Kapitálový vstup
  - Joint Venture
  - Konvertibilní zápůjčka
  - Zpětný leasing (sale & leaseback)
  - Nabídka projektu (prodej projektu) – volitelné
- **Rezervace aktivní po podpisu obou stran**, až poté se v uživatelském rozhraní odkrývají identity.
- **Publikační okno tiketu**: výchozí 90 dní (upravitelné, prodlužovatelné administrátorem).
- **Bez napojení na banku**: stavy plateb se zadávají ručně.
- **Měna**: pouze koruna česká.

---

## B) Co ještě zbývá uzamknout (aby byla implementace bez domýšlení)

### 1) Finanční milníky a ruční potvrzení

- [ ] **Potvrzení profinancování developerem** – finální datová definice polí a pravidel:
  - datum přijetí peněz na účet developera (finální datum)
  - finální profinancovaná částka
  - volitelné podklady (soubor)
  - volitelná poznámka / důvod, pokud podklady nejsou
  - kdo smí potvrzení zadat/změnit (developer; administrátor může provést opravu)

- [ ] **Ruční oprava potvrzení profinancování administrátorem**:
  - co přesně může měnit (datum, částka, přílohy, poznámka)
  - kdy je oprava ještě povolená (před jakým bodem je „lock“)
  - jak se oprava auditně značí (viz bod 4)

- [ ] **Potvrzení přijetí provize platformou na bankovní účet** (zadává administrátor):
  - datum přijetí
  - částka
  - volitelný podklad
  - od tohoto okamžiku se spouští: výplata obchodníkům + započtení do obratu pro bonusový program

### 2) Fakturace a daň z přidané hodnoty

- [ ] **Tok fakturace platforma → developer**:
  - platforma fakturuje developerovi provizi + (případně) daň z přidané hodnoty
  - faktura se vystavuje v účetním systému Pohoda, zasílá e-mailem a ukládá do platformy

- [ ] **Tok fakturace obchodník → platforma**:
  - obchodník fakturuje svůj podíl z provize platformy
  - pokud je obchodník plátce daně z přidané hodnoty, připočítá daň
  - pokud není plátce, fakturuje bez daně

- [ ] **Nastavení daně z přidané hodnoty na úrovni konkrétní faktury (transakce)**:
  - možnost vystavit fakturu s daní i bez daně
  - zákaz zpětných změn po vystavení/odeslání (řešit mimo platformu)

- [ ] **Povinné náležitosti faktury a platební identifikátory** dle české legislativy:
  - povinné položky dokladu
  - doporučené identifikátory pro párování (variabilní symbol apod.)

- [ ] **Pravidla po splatnosti**:
  - upozornění pro developera a administrátora
  - vznik incidentu / sporu (kdy, jak se eviduje)

### 3) Zaokrouhlování a haléřové vyrovnání

- [ ] **Pravidlo zaokrouhlování**: 2 desetinná místa, zaokrouhlení nahoru.
- [ ] **Algoritmus haléřového vyrovnání**:
  - aby součet podílů seděl na celkovou částku
  - aby nevznikaly účetní „zbytky“

### 4) Číselníky důvodů a auditní značení

- [ ] **Číselník důvodů** (minimálně):
  - zánik rezervace
  - odmítnutí investora developerem
  - expirace publikačního okna
  - financováno jiným investorem
  - zásah administrátora
  - incident/spor

- [ ] **Auditní značení ručních změn**:
  - typ události
  - kdo
  - kdy
  - co se změnilo (před/po)
  - důvod (kód + volitelný text)
  - vazba na podklad (soubor)

### 5) Bonusový program Pool

- [ ] **Definice obratu (datově)**:
  - počítá se finální profinancovaná částka investorem do tiketu
  - měna koruna česká
  - datum = datum přijetí na účet developera

- [ ] **Období**:
  - pololetí od 1. 1. a 1. 7.
  - při startu platformy uprostřed období počítat jen od startu do konce pololetí

- [ ] **Mety a výplata**:
  - meta 1 (100 000 000 Kč) = kvalifikace
  - meta 2 (200 000 000 Kč) = vítěz bere vše (první podle času)
  - pokud meta 2 není dosažena: podílové rozdělení mezi první 1–3 kvalifikované podle jejich obratu na konci období
  - pořadí v rámci dne rozhoduje čas
  - vyhlášení anonymní (obchodníci se neidentifikují)

- [ ] **Pravidlo převodu zůstatku, pokud se nekvalifikuje nikdo** (část zůstává platformě, část se převádí) – uzamknout.

- [ ] **Kdy se pool plní a kdy se vyplácí**:
  - započítává se až po potvrzení přijetí provize platformou (administrátor)

### 6) Retence a mazání údajů investora

- [ ] **Retence**:
  - kontaktní údaje investora držíme do smazání administrátorem
  - auditní stopa 5 let

- [ ] **Žádost o smazání**:
  - formulář (broker / investor / developer)
  - potvrzení přijetí
  - smazání do 48 hodin
  - auditní záznam o provedení

### 7) Reporty a exporty

- [ ] Minimální export do tabulky (Excel):
  - profinancované tikety
  - provize (nárok, splatnost, úhrada, rozdělení)
  - výsledky bonusového programu
  - auditní log

- [ ] Uzamknout sloupce a filtrování (časová osa, filtr podle entity, stavů).

### 8) Registry vstupních polí formulářů (datová finalizace)

- [ ] Potvrdit a uzamknout registry pro:
  - registraci obchodníka
  - registraci developera
  - evidenci investora obchodníkem
  - zadání projektu
  - zadání tiketu
  - vytvoření rezervace (včetně offline podpisů a fronty)

- [ ] Rozhodnutí: **IČO u fyzické osoby obchodníka** (doporučení: povinné, protože B2B a fakturace).

---

## C) Doporučené pořadí další práce

1) Finanční milníky + ruční potvrzení + audit
2) Fakturace a daň z přidané hodnoty + povinné náležitosti dokladů
3) Zaokrouhlování
4) Číselníky důvodů
5) Bonusový program Pool
6) Retence a mazání
7) Reporty a exporty
8) Registry formulářů (datová finalizace)
