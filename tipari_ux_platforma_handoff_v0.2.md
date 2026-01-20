# Tipari.cz – UX Handoff Package (Platforma MVP)
*Verze: v0.2 (návrh) • Datum: 2026-01-20 • Autor: Tipari Product & Design Council*

**Zdroje pravdy (vstupy):**
- DATA: `Tipari_Souhrn_Dat_DATA_v1.7.md` (poslední dodaná datová verze)
- PRAVIDLA (LOCKED): `Tipari_Souhrn_Dat_a_Pravidel_DATA_v1.3_LOCKED.md`
- Zadání PO v chatu: fyzický podpis (scan) pro **Souhlas + NDA** a následně pro **Rezervační smlouvu**, vč. náhledu vzorů a inline vytvoření investora.

> Pozn.: V datech v1.7 je uvedeno, že byla odstraněna offline varianta podpisu; toto je v konfliktu s posledním zadáním a s v1.3. V tomto návrhu proto uvádíme **eSign jako default** + **offline/scan jako podporovanou variantu** (viz TBD/rozhodnutí).

---

## Zapojené role (Tipari Product & Design Council)
- Facilitátor / Head of Product
- UX Lead / Service Designer
- Information Architect
- Interaction Designer
- UX Writer (mikrocopy + notifikace)
- Behavioral Psychologist + Ethics & Trust reviewer
- Accessibility specialist (WCAG)
- Data / Product Analyst (měření + eventy)
- UI Lead (handoff brief + design system requirements)

---

## 1) Executive summary (scope + 5–10 vět)
1. Navrhujeme **MVP UX pro platformu Tipari.cz** pro role **Obchodník (broker), Developer, Admin** se zaměřením na klíčový flow: **rezervace → podpisy dokumentů (Souhlas+NDA → Rezervační smlouva) → kapacita/fronta → podpis developera → profinancování → provize/fakturace**.
2. Rezervace je řešena jako **multi-step wizard** s jasným stepperem a „next-best action“ logikou, aby obchodník vždy viděl *co udělat teď* a *co se stane potom*.
3. Do wizardu doplňujeme **inline vytvoření investora** (aby obchodník nemusel předem zakládat investora mimo flow).
4. V každém kroku dokumentů doplňujeme **Náhled vzoru** (Souhlas, NDA, Rezervační smlouva) + volbu metody podpisu **eSign / fyzicky+scan**.
5. Zohledňujeme pravidla **maskování/odkrytí identit** a jednotné odmaskování (aby se nikdy neodmaskoval např. obrázek bez názvu apod.).
6. Kapacitu a pořadí ve frontě počítáme až od podpisu **Rezervační smlouvy investorem**; rezervace před tím kapacitu neblokují.
7. Přidáváme pro všechny strany **Finance přehled**: každá role vidí *své* faktury/nároky/provize (Admin vidí vše) + stavové badge a termíny.
8. UX obsahuje „anti-error“ prvky: checkpointy, rekapitulace, potvrzovací dialogy, explicitní lhůty, automatické připomínky.
9. Součástí je **Figma-ready handoff**: seznam obrazovek, komponenty, stavy, responzivita, tracking a acceptance criteria.

**Scope MVP (v tomto dokumentu):**
- Broker: Tikety (list/detail), Rezervace (wizard + detail + list), Investoři (inline + list), Finance.
- Developer: Rezervace (list/detail), Finance.
- Admin: Finance (schvalování/označení plateb), Nastavení šablon dokumentů (základ), Audit (minimálně log událostí u rezervace).

---

## 2) Předpoklady + TBD + rizika
### Předpoklady (abychom mohli navrhnout UX bez dalších dat)
- Platforma je **webová aplikace** (desktop-first) s responzivním chováním pro tablet/mobil (obchodníci pracují i „v terénu“).
- E‑sign integrace: **Signi.com** (nebo kompatibilní provider). Platforma ukládá stav podpisu přes callback/webhook.
- Notifikace: **e-mail** jako minimum; in‑app notifikace v UI.

### TBD / rozhodnutí pro PO (max dopad na UX)
1. **Offline/scan podpisy**: v1.7 říká „odstraněno“, zadání + v1.3 říká „podporovat“.  
   - Varianta A (doporučení MVP): eSign default + scan jako fallback (v tomto návrhu).  
   - Varianta B: pouze eSign (zjednoduší UX + backend).  
   - Varianta C: pouze scan (nižší náklady, vyšší chybovost).
2. **SLA délky**: v datech je uvedeno 48h pro podpisy (Souhlas+NDA, RS investor, RS developer). Dříve zaznělo 24h.  
   - Doporučení: začít 48h a testovat dopad (nižší churn, méně supportu).
3. **Kdy se odmaskuje identita developera investorovi** (a zda je Rezervační smlouva anonymizovaná):  
   - Varianta A: investor vidí plné údaje až po Souhlasu+NDA (logicky), RS může být už plná.  
   - Varianta B: RS je anonymní a plné údaje se odmaskují až po podpisu developera (vyšší ochrana, nižší důvěra).
4. **Platební důkaz**: může developer nahrát potvrzení o úhradě faktury platformě (urychlení procesu), nebo jen admin ručně označuje platbu?
5. **Pravidla viditelnosti provizí**: Broker/Developer vidí pouze „své“ (doporučeno). Admin vidí všechny.

### Rizika
- Komplexita flow (více dokumentů + kapacita/fronta) → riziko kognitivní zátěže. Řešíme stepperem + timeline + next action.
- Offline/scan varianta zvyšuje chybovost (špatné soubory, nečitelný scan, chybějící podpis) → nutné validační UI + QA.
- Maskování/odmaskování musí být konzistentní (jinak ztráta důvěry).

---

## 3) Persony / role (stručně)
1. **Obchodník (junior)** – chce rychle vytvořit rezervaci, nechce se „proklikávat“, bojí se, že prošvihne SLA.
2. **Obchodník (senior)** – spravuje více rezervací, potřebuje dashboard priorit a přehled provizí.
3. **Developer (CFO / project lead)** – chce mít přehled o validních rezervacích v kapacitě, rychle podepsat, pak hlídat faktury.
4. **Admin operátor** – řeší schvalování, platby, audit, SLA výjimky.
5. **Nový uživatel (první den)** – potřebuje jednoduchý onboarding a nápovědy (co je tiket, kapacita, fronta).

---

## 4) User flow (happy path + edge cases)

### 4.1 Happy path – eSign (doporučený default)
```mermaid
flowchart TD
  A[BKR: Detail tiketu (maskovaný)] --> B[Klik: Vytvořit rezervaci]
  B --> C[Wizard 1: Vybrat / vytvořit investora]
  C --> D[Wizard 2: Souhlas + NDA → odeslat k eSign]
  D --> E[Investor podepíše Souhlas + NDA]
  E --> F[Odemkne se plný detail pro brokera + developer vidí rezervaci]
  F --> G[Wizard 3: Rezervační smlouva → odeslat k eSign]
  G --> H[Investor podepíše RS (tím se určí pořadí ve frontě)]
  H --> I{Je v kapacitě?}
  I -- ano --> J[DEV: SLA 48h na podpis RS]
  I -- ne --> K[Čeká mimo kapacitu (fronta)]
  K -->|uvolní se místo| J
  J --> L[DEV podepíše → Rezervace aktivní]
  L --> M[30 dní na profinancování]
  M --> N[DEV potvrdí profinancování]
  N --> O[Ticket uzavřen, ostatní rezervace ukončeny]
  O --> P[Finance: faktura platformy developerovi]
  P --> Q[Po úhradě: Broker může fakturovat platformě]
  Q --> R[Admin schválí, platforma vyplatí provizi]
```

### 4.2 Alternativa – fyzický podpis (scan) (podle posledního zadání)
- V kroku 2 obchodník **nahraje scan Souhlasu** a **scan NDA** (čas nahrání = auditní stopa / „čas podpisu“).
- Po dokončení kroku 2 obchodník **nahraje scan Rezervační smlouvy** (čas nahrání = pořadí ve frontě).
- Developer podpis: buď eSign (doporučení), nebo scan (pokud PO chce symetrii).

### 4.3 Edge cases (minimální)
- Investor nepodepíše Souhlas+NDA do SLA → rezervace zanikne, broker dostane upozornění + možnost založit znovu.
- Investor podepíše Souhlas+NDA, ale nepodepíše RS → rezervace zanikne.
- Investor podepíše RS, ale je mimo kapacitu → čeká; pokud se místo neuvolní do [TBD], rezervace zanikne / zůstane (dle pravidel).
- Developer nepodepíše RS do SLA → rezervace zanikne, další ve frontě postoupí.
- Ticket profinancován jinou rezervací → ostatní rezervace ukončeny, brokerům se zobrazí důvod.
- Upload scanu nečitelný / špatný formát → validace + možnost nahrát znovu.
- Duplicita investora (e‑mail už existuje v evidenci obchodníka) → nabídnout „sloučit“ / použít existující.

---

## 5) IA / navigace (role-based)
### Broker (Obchodník)
- Dashboard
- Tikety
- Rezervace
- Investoři
- Finance
- Notifikace
- Nastavení

### Developer
- Dashboard
- Rezervace
- Finance
- Notifikace
- Nastavení

### Admin
- Dashboard
- Rezervace
- Finance
- Uživatelé (MVP: read-only)
- Nastavení (SLA, šablony dokumentů)
- Audit

---

## 6) Seznam obrazovek (MVP)
| ID | Role | Název |
|---|---|---|
| BKR-00 | Broker | Dashboard – úkoly + SLA alerty |
| BKR-01 | Broker | Tikety – list |
| BKR-02 | Broker | Tiket – detail (maskovaný) |
| BKR-03 | Broker | Rezervace wizard – Krok 1: Investor |
| BKR-04 | Broker | Rezervace wizard – Krok 2: Souhlas + NDA |
| BKR-05 | Broker | Rezervace wizard – Krok 3: Rezervační smlouva |
| BKR-06 | Broker | Rezervace wizard – Krok 4: Shrnutí + vytvořit |
| BKR-07 | Broker | Rezervace – detail |
| BKR-08 | Broker | Rezervace – list |
| BKR-09 | Broker | Investoři – list + detail (MVP) |
| FIN-01 | Broker/Dev/Admin | Finance – přehled (role-based) |
| DEV-01 | Dev | Rezervace – list |
| DEV-02 | Dev | Rezervace – detail + podpis + profinancování |
| ADM-01 | Admin | Finance – správa plateb a schvalování |
| ADM-02 | Admin | Nastavení – šablony dokumentů + SLA (MVP) |

---

## 7) Specifikace obrazovek (pro UI handoff)

> Konvence proměnných v textu: `[Číslo tiketu]`, `[Název projektu]`, `[Developer]`, `[Investor]`, `[Deadline]`, `[Částka]`, `[Odkaz na podpis]`…

---

### BKR-01 Tikety – list

**Účel:** Rychle najít vhodný tiket a pochopit základní parametry + kapacitu rezervací.

**Rozhodovací údaje (must-have):**
- `[Číslo tiketu]`, cílová částka, minimální investice, výnos p.a., splatnost, typ zajištění / forma financování (dle dat).
- Stav kapacity: `Volná kapacita / Plno / Fronta` + čísla.
- „Maskování“ indikátor (co je skryto a proč).

**Layout (ASCII):**
```
[Topbar: Search | Notif | Profil]
[Tikety]  [Filtry ▾] [Řazení ▾]

| Tiket | Parametry | Kapacita | CTA |
| #123  | 10M • 8% • 24m | 2/3 + fronta 4 | [Detail] |
| #124  | ...          | plno + fronta 9 | [Detail] |

[Legenda: Kapacita = aktivní rezervace po podpisu RS investorem]
```

**Komponenty:**
- Filter bar (chips + advanced drawer)
- TicketCardRow / TableRow
- CapacityBadge (varianty: volno, plno, fronta)
- MaskedText / Placeholder image

**Stavy:**
- Loading skeleton (table rows)
- Empty (žádné tikety) + CTA „Změnit filtry“
- Error (API) + „Zkusit znovu“

**Mikrocopy (vybrané):**
- Filtr placeholder: „Hledejte podle čísla tiketu, lokality nebo parametrů…“
- Empty: „Zatím tu není žádný tiket, který odpovídá filtrům.“

**Přístupnost:**
- Tabulka musí být čitelná i jako list pro mobil (stacked rows).
- Badge nesmí být jediný nositel informace (doplnit text a čísla).

---

### BKR-02 Tiket – detail (maskovaný režim)

**Účel:** Porozumět tiketu, vysvětlit pravidla maskování a spustit rezervaci.

**Rozhodovací údaje:**
- Parametry tiketu (viz list) + dostupné „teaser“ dokumenty.
- Kapacita a pravidla pořadí.

**Wireframe obrázek (low‑fi):**
![BKR-02 wireframe](assets/wireframes/01_broker_ticket_detail.png)

**Komponenty:**
- Header + Status badges
- KeyValue grid (parametry)
- DocumentList (teaser docs)
- Sticky sidebar „Vytvořit rezervaci“

**Mikrocopy:**
- Info panel: „Detaily projektu a developera se odemknou po podpisu Souhlasu a NDA investorem.“

**Přístupnost:**
- „Maskováno“ musí být čitelné pro screen reader („Skryto do dokončení kroku X“).

---

### BKR-03 Rezervace – wizard (Krok 1: Investor)

**Účel:** Vybrat investora nebo ho vytvořit inline.

**Rozhodovací údaje:**
- Kdo je investor (FO/PO), kontaktní e‑mail (nutný pro eSign).
- Minimalizace chyb: deduplikace podle e‑mailu.

**Wireframe obrázek:**
![BKR-03 wireframe](assets/wireframes/02_reservation_wizard_step1_investor.png)

**Data/field mapping (podle datového slovníku investora):**
- `Typ investora` (FO/PO) – povinné
- `Křestní jméno`, `Příjmení` – povinné pro FO
- `Název společnosti`, `IČO` – povinné pro PO
- `E‑mail` – povinné
- `Telefon`, `Adresa`, `Poznámka` – volitelné (MVP: telefon + poznámka)

**Stavy:**
- Autocomplete loading
- Duplicita e‑mailu → nabídnout „Použít existujícího investora“

**Mikrocopy:**
- CTA: „Pokračovat“
- Nápověda: „E‑mail slouží k odeslání podpisových odkazů.“

**Přístupnost:**
- Focus trapping v modalu
- Stepper jako `aria-current="step"`.

---

### BKR-04 Rezervace – wizard (Krok 2: Souhlas + NDA)

**Účel:** Zajistit právní základ pro sdílení informací (Souhlas) + NDA.

**Rozhodovací údaje:**
- Metoda podpisu (eSign / fyzicky+scan)
- Stav každého dokumentu a deadline.

**Wireframe obrázek:**
![BKR-04 wireframe](assets/wireframes/03_reservation_wizard_step2_consent_nda.png)

**Komponenty:**
- DocumentRow (název, náhled, metoda, stav, akce)
- DeadlineBadge (včetně „zbývá 12h“)
- UploadDropzone + file validation
- „Vygenerovat tiskový balíček“ (pokud offline)

**Mikrocopy (vybrané):**
- U Souhlasu: „Souhlas umožňuje předat developerovi nezbytné údaje pro pokračování v rezervaci.“
- U NDA: „NDA chrání citlivé informace o projektu. Developer NDA nevidí.“

**Chybové hlášky:**
- „Soubor je příliš velký. Max. [TBD] MB.“
- „Podporované formáty: PDF, JPG.“

**Přístupnost:**
- Upload musí mít alternativu k drag&drop (tlačítko „Vybrat soubor“).

---

### BKR-05 Rezervace – wizard (Krok 3: Rezervační smlouva)

**Účel:** Získat podpis RS od investora; tím se určí pořadí ve frontě a případný vstup do kapacity.

**Rozhodovací údaje:**
- Metoda podpisu, stav, deadline.
- Transparentní vysvětlení kapacity.

**Wireframe obrázek:**
![BKR-05 wireframe](assets/wireframes/04_reservation_wizard_step3_reservation_contract.png)

**Mikrocopy:**
- Info: „Pořadí ve frontě je určeno časem podpisu Rezervační smlouvy investorem.“

**Edge case UI:**
- Pokud investor podepsal, ale rezervace je mimo kapacitu → zobrazit pozici ve frontě + odhad (TBD).

---

### BKR-06 Rezervace – wizard (Krok 4: Shrnutí)

**Účel:** Rekapitulace před vytvořením + poslední kontrola.

**Layout (ASCII):**
```
[Souhrn]
Investor: [Jméno] (email)
Dokumenty: Souhlas ✔ | NDA ✔ | RS čeká/✔
Kapacita: počítá se až po RS podpisu
Notifikace: investor dostane e-mail s odkazem (pokud eSign)

[Zpět]  [Vytvořit rezervaci]
```

**Komponenty:**
- SummaryCard
- ConfirmDialog pro „Vytvořit“

---

### BKR-07 Rezervace – detail (obchodník)

**Účel:** Jedno místo pro řízení rezervace: timeline, dokumenty, kapacita, komunikace, finance.

**Wireframe obrázek:**
![BKR-07 wireframe](assets/wireframes/05_broker_reservation_detail.png)

**Rozhodovací údaje:**
- Stav rezervace + SLA
- Kapacita/fronta pozice
- Co je „další krok“ a kdo ho má udělat (investor vs developer vs admin)
- Finance: očekávaná provize + stav nároku

**Komponenty:**
- StatusBadge (rezervace)
- Timeline / Step list
- NextBestAction card
- Tabs (Overview/Documents/Finance/Audit)
- AuditLog (minimálně: kdo/kdy co udělal)

**Stavy:**
- „Expirované“ (SLA) – read-only + CTA „Vytvořit novou rezervaci“
- „Ukončeno profinancováním jiného investora“ – vysvětlení + link na tiket

**Přístupnost:**
- Timeline musí být srozumitelná i bez barev (ikonky + text).

---

### DEV-01 Rezervace – list (developer)

**Účel:** Rychle vidět rezervace v kapacitě a ty, které vyžadují podpis.

**Layout (ASCII):**
```
[Rezervace]
Filtr: V kapacitě / Ve frontě / Aktivní / Dokončené

| Rezervace | Investor | Obchodník | Stav | Deadline | Akce |
| R-001 | Novák | Broker A | čeká na podpis dev | 12h | [Detail] |
| R-002 | ...   | ...      | mimo kapacitu | — | [Detail] |
```

**Pozn.:** Dokument RS je dostupný pouze u rezervací v kapacitě (pokud je to pravidlo).

---

### DEV-02 Rezervace – detail + podpis + profinancování

**Účel:** Podepsat RS (pokud v kapacitě), potom potvrdit profinancování a sledovat finance.

**Obsah:**
- Header: `[Rezervace]` + badge „v kapacitě“ / „mimo kapacitu“
- Sekce „Investor + Broker“ (odkrytá po Souhlasu+NDA)
- Dokumenty: Souhlas (viditelný), RS (viditelná pouze pokud v kapacitě), NDA (neviditelné)
- Akce: `Podepsat` / `Zamítnout` (s důvodem) / `Potvrdit profinancování`

**Anti-error:**
- Před podpisem: rekapitulace dopadu („Po podpisu začíná 30 dní na profinancování.“)
- Před potvrzením profinancování: potvrzovací dialog + povinná pole (datum, částka)

---

### FIN-01 Finance – přehled (role-based)

**Účel:** Každý vidí své faktury/nároky/provize a ví, co udělat.

**Wireframe obrázek:**
![FIN-01 wireframe](assets/wireframes/06_finance_overview.png)

**Role varianty:**
- Broker: „Nároky na provizi“ + upload faktury platformě (a její stav).
- Developer: „Faktury od platformy“ + bankovní instrukce + stav úhrady.
- Admin: vše + akce „Označit zaplaceno“, „Schválit“, „Vyplatit“.

---

## 8) Notifikace a mikrotexty (událost → komu → kanál → text)
> Copy je návrh; právní wording musí potvrdit právník.

| Událost | Komu | Kanál | Text (šablona) |
|---|---|---|---|
| Vytvořena rezervace (krok 2 odeslán) | Investor | Email | Předmět: „Podpis dokumentů pro rezervaci [Číslo tiketu]“ • Tělo: „Dobrý den, prosíme o podpis Souhlasu a NDA. Odkaz: [Odkaz na podpis]. Platí do [Deadline].“ |
| Souhlas+NDA podepsáno | Broker | In-app + Email | „Investor [Investor] dokončil Souhlas+NDA. Nyní můžete odeslat Rezervační smlouvu.“ |
| RS investorem podepsána | Broker | In-app + Email | „Investor [Investor] podepsal Rezervační smlouvu. Vaše pozice ve frontě: [Pozice].“ |
| Rezervace vstoupila do kapacity | Developer | In-app + Email | „Rezervace [Rezervace] je v kapacitě. Podepište prosím RS do [Deadline].“ |
| Developer podepsal | Broker + Investor | Email | „Rezervace byla aktivována pro [Název projektu] u [Developer]. Další krok: profinancování do [Datum].“ |
| SLA expirace (investor / developer) | Příslušná role | In-app + Email | „Vypršel čas pro podpis [Dokument]. Rezervace byla ukončena. Můžete založit novou.“ |
| Profinancování potvrzeno | Všichni relevantní | In-app + Email | „Tiket [Číslo tiketu] byl profinancován dne [Datum].“ |
| Vystavena faktura platformy developerovi | Developer | In-app + Email | „Byla vystavena faktura [Číslo faktury] na [Částka]. Splatnost [Datum].“ |
| Developer zaplaceno (admin označil) | Broker | In-app + Email | „Provize je připravena k fakturaci. Nahrajte prosím fakturu do [Datum].“ |
| Broker nahrál fakturu | Admin | In-app | „Nová faktura od obchodníka čeká na schválení: [Broker], [Částka].“ |
| Provize vyplacena | Broker | In-app + Email | „Provize [Částka] byla vyplacena dne [Datum].“ |

---

## 9) UI brief pro designéry (Figma-ready)

### 9.1 Layout hierarchy
- Desktop: 12‑column grid; detail stránky: **2‑sloupcový layout** (content + sticky sidebar akcí).
- Wizard: modal 720–840px šířka, stepper nahoře, footer se sticky CTA.
- Finance: table-first, s filtry nahoře a stavovými badge.

### 9.2 Klíčové UI patterny / komponenty (Design system požadavky)
- **Stepper** (4 kroky) + mobilní zjednodušená verze
- **Status badge** (rezervace / dokument / finance) + tooltip
- **Deadline badge** („zbývá 12h“, „expirované“)
- **Timeline / Checklist** (pro detail rezervace)
- **DocumentRow** (náhled, metoda podpisu, stav, akce)
- **UploadDropzone** + validace + progress
- **ConfirmDialog** (storno, potvrzení profinancování)
- **Table** (sort, filter, pagination) + mobile stacked cards
- **MaskedText / PlaceholderImage** (sjednocené maskování)

### 9.3 States (minimálně)
- Default / Hover / Focus / Active / Disabled
- Loading skeleton
- Empty / Error
- Expired / In queue / In capacity / Active / Finished
- Upload in progress / Upload failed / Uploaded

### 9.4 Naming convention pro Figma obrazovky
`ROLE-ID__Název__State`  
Příklad: `BKR-04__ReservationWizard_SouhlasNDA__Default`

### 9.5 Responsivita
- < 768px: tabulky → cards; sticky CTA → bottom bar; wizard → full-screen sheet.
- Upload a dokumenty musí být použitelné i na mobilu (kamerou nafotit a nahrát – TBD).

---

## 10) Checklist + Acceptance criteria + Next steps

### 10.1 Acceptance criteria (výběr – P0)
**Rezervace wizard**
- [P0] Nelze přejít na krok 3, dokud nejsou Souhlas+NDA ve stavu „Podepsáno“ nebo „Scan nahrán“.
- [P0] Po podpisu RS investorem systém uloží čas a určí pořadí ve frontě.
- [P0] Kapacita se počítá až od podpisu RS investorem.
- [P0] U rezervace v kapacitě se developerovi zobrazí deadline a CTA k podpisu.

**Maskování**
- [P0] Maskování je konzistentní: název projektu, developer, obrázky i dokumenty se odmaskují najednou dle pravidel.

**Finance**
- [P0] Broker vidí pouze své nároky/provize; Developer vidí pouze své faktury; Admin vidí vše.
- [P0] Stav nároku prochází definovanými stavy: čeká na úhradu developerem → lze fakturovat → faktura nahrána → proplaceno.

**Přístupnost**
- [P0] Wizard modal: focus trap, ESC zavře, fokus se vrací na spouštěcí CTA.
- [P0] Všechny důležité informace mají textovou formu (ne jen barvy).

### 10.2 Analytics & event tracking (MVP)
- `ticket_list_viewed`
- `ticket_detail_viewed`
- `reservation_wizard_opened`
- `reservation_investor_selected` / `reservation_investor_created`
- `reservation_doc_preview_opened` (doc_type)
- `reservation_consent_sent` / `reservation_consent_scan_uploaded`
- `reservation_nda_sent` / `reservation_nda_scan_uploaded`
- `reservation_contract_sent` / `reservation_contract_scan_uploaded`
- `reservation_investor_signed` (doc_type)
- `reservation_entered_capacity`
- `reservation_dev_signed` / `reservation_dev_rejected`
- `funding_confirmed`
- `invoice_generated_platform_to_dev`
- `broker_claim_available_to_invoice`
- `broker_invoice_uploaded`
- `payout_marked_paid`

### 10.3 Next steps (doporučené pořadí)
1. Rozhodnout TBD (offline podpisy, SLA, odmaskování investorovi).
2. UX review s PO + 2 obchodníky (usability smoke test).
3. UI tým připraví design system komponenty (Stepper, Timeline, DocumentRow, StatusBadge).
4. Implementační tickets: wizard + rezervace detail + finance.
5. Nastavit tracking + dashboard (funnel: Ticket detail → Wizard step 1 → step 2 complete → step 3 complete → dev sign → funded).

---

## Simulovaný uživatelský panel (rychlá zpětná vazba) – **SIMULACE**
### Obchodník junior
- Super: stepper a jasné „co teď“.
- Mátlo: rozdíl mezi Souhlas/NDA/RS – chce stručné vysvětlení přímo u dokumentu.
- Chybí: tlačítko „Zavolat investorovi“ (kopírovat telefon) na detailu rezervace.

### Obchodník senior
- Super: finance přehled a stavy.
- Chybí: dashboard „SLA v ohrožení“ a hromadné připomínky.

### Developer (CFO)
- Super: jasná kapacita + deadline.
- Riziko: chce rychle poznat, zda je RS validní (checksum / podpisový log).
- Chybí: přehled faktur + bankovní instrukce na jednom místě.

### Admin operátor
- Super: auditní log + jedno místo na finance.
- Chybí: filtr „rezervace expirované dnes“ a rychlá akce „prodloužit SLA“ (TBD, policy).

### Nový uživatel
- Mátlo: „kapacita“ vs „fronta“. Pomůže tooltip + krátká animace v onboarding.

### Iteration summary (úpravy podle panelu)
1. Přidat mini‑vysvětlení u každého dokumentu (1 věta + „více“).
2. Na detail rezervace doplnit rychlé akce: kopírovat e‑mail/telefon, poslat připomínku.
3. Dashboard pro brokera: sekce „SLA dnes/zítra“.
4. Developer detail: „ověření podpisu“ (stav z eSign provideru) + download log.

