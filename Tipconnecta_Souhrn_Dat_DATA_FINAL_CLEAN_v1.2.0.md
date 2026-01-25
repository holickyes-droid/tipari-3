# Tipconnecta — Souhrn dat (DATA) — FINAL CLEAN v1.2.0

**Poslední aktualizace:** 2026-01-24  
**Určeno pro:** Figma AI (Gemini 3 Pro / Flash), product tým, dev tým  
**Tento dokument je „source of truth“ pro datové názvy, významy polí a business pravidla.**  
Pokud je rozpor mezi dokumenty, **vyhrává tento soubor** (a UX Spec se musí přizpůsobit).

---

## 0) Jak s tím pracovat ve Figmě (aby nevznikal chaos)

1. **Používej přesně názvy obrazovek a komponent** z UX Spec + názvy datových polí z tohoto dokumentu.
2. **Nevymýšlej nové entity ani stavy**, pokud nejsou explicitně zde.
3. Kde je uveden **„LOCKED / PARTIALLY_UNLOCKED / UNLOCKED“**, vždy generuj i odpovídající UI stav (placeholder, zámek, disabled akce…).
4. **Texty (microcopy)** kopíruj z UX Spec; data/počty ber odsud.
5. **Vzorková data** v kapitole 6 jsou canonical pro demo obrazovky – používej je konzistentně napříč kartami, detailem i modaly.

---

## 1) Slovník pojmů (glossary)

- **Tiket (Ticket)** = investiční příležitost, kterou broker nabízí investorovi (např. seniorní úvěr / equity).
- **Projekt (Project)** = investiční záměr (např. „Rezidence Kampa“), na který je tiket vypsán.
- **Rezervace (Reservation)** = závazné „držení“ kapacity tiketu pro konkrétního investora.
- **Kapacita (Capacity)** = počet „slotů“/tranší pro rezervace (např. 2/3 obsazeno).
- **Fronta (Queue)** = pořadí dalších zájemců (brokerů) mimo kapacitu.
- **Maskování / uzamčení (Locking)** = část citlivých informací a dokumentů je dostupná až po podpisu dokumentů investorem.
- **Balík dokumentů (DocumentPackage)** = jeden e‑sign proces pro investora (v UI „1 balík“).
- **Odměna brokera** = provize pro brokera (bez DPH), nárok obvykle vzniká až po profinancování.

---

## 2) Role a oprávnění (high‑level)

### 2.1 Broker (Partner)
- Vidí seznam **Tikety** + detail tiketu.
- Může **vybrat investora** a vytvořit rezervaci.
- Může spravovat **Investory** (přidat, upravit, interní poznámky).
- Vidí stav podpisů, lhůty, frontu, a výši odměny.
- Některé podklady / identita / galerie mohou být **uzamčené**, dokud investor nepodepíše dokumenty.

### 2.2 Investor (signer)
- Nemusí být uživatel platformy.
- Dostane e‑mail s odkazem na **online podpis balíku dokumentů**.

### 2.3 Developer
- Spravuje projekty a tikety, nahrává podklady.
- Podepisuje dokumenty po investorovi (pokud je to v procesu vyžadováno).

### 2.4 Admin
- Konfigurace systému (lhůty, šablony dokumentů, pravidla maskování, scoring…).
- Správa uživatelů a audit.

---

## 3) Entity model (kanonické struktury)

> Níže jsou **kanonické názvy polí**. UI může používat lidské labely, ale data model zůstává stejný.

### 3.1 Ticket
**Primární klíč:** `ticket_id` (např. `TIK-2024-001`)

| Pole | Typ | Pov. | Popis |
|---|---:|:---:|---|
| `ticket_id` | string | ✓ | ID tiketu |
| `project_name` | string | ✓ | Marketingový název projektu (může být viditelný i při uzamčení) |
| `project_city` | string | ✓ | Město / region (např. „Praha 1“) |
| `ticket_type` | enum | ✓ | `DEBT` \| `EQUITY` |
| `financing_form` | string | (DEBT) | Např. „Seniorní úvěr“ |
| `total_volume_czk` | int | ✓ | Celkový objem (Kč) |
| `yield_pa_pct` | float | ✓ | Výnos p.a. v % |
| `maturity_months` | int | ✓ | Splatnost v měsících |
| `min_reservation_czk` | int | ✓ | Minimální výše rezervace |
| `security_rank` | int | (DEBT) | Pořadí zajištění (1/2/3…) |
| `ltv_pct` | float | (DEBT) |_req_ pro detail; volitelně pro kartu |
| `broker_reward_czk` | int | ✓ | Odměna brokera bez DPH |
| `expires_at` | date | ✓ | Datum expirace tiketu |
| `capacity_total` | int | ✓ | Počet slotů |
| `capacity_used` | int | ✓ | Obsazené sloty |
| `queue_count` | int | ✓ | Počet ve frontě |
| `funding_remaining_czk` | int | ✓ | Zbývá k profinancování (pro detail) |
| `capacity_fill_pct` | float | ✓ | Naplněnost kapacity v % (0–100) |
| `lock_state` | enum | ✓ | `LOCKED` \| `PARTIALLY_UNLOCKED` \| `UNLOCKED` |
| `status_badges` | array | ✓ | Pole badge tagů (viz 3.5) |
| `ready_score` | enum | ✓ | `A` \| `B` \| `C` \| `D` |

#### 3.1.1 Ticket gallery / media
| Pole | Typ | Pov. | Popis |
|---|---:|:---:|---|
| `cover_image_url` | string | (UNLOCKED) | Hlavní obrázek |
| `gallery_image_urls` | string[] | (UNLOCKED) | Galerie (0–10) |
| `gallery_count` | int | ✓ | Počet obrázků (i když jsou uzamčené) |

> Když je `lock_state != UNLOCKED`, UI zobrazí placeholder místo reálných obrázků.
> `gallery_count` je vždy k dispozici – díky tomu může UI na kartě zobrazit indikátor „Galerie (3)“, i když jsou fotky uzamčené.

### 3.2 Investor
**Primární klíč:** `investor_id` (např. `INV-0001`)

| Pole | Typ | Pov. | Popis |
|---|---:|:---:|---|
| `investor_id` | string | ✓ | ID investora |
| `display_name` | string | ✓ | Jméno / firma |
| `email` | string | ✓ | Pro e‑sign |
| `phone` | string |  | volitelné |
| `is_platform_user` | bool | ✓ | Pokud false, investor podepisuje jen přes e‑mail link |
| `notes_internal` | string |  | poznámky brokera (interní) |

### 3.3 Reservation
**Primární klíč:** `reservation_id` (např. `REZ-2026-0001`)

| Pole | Typ | Pov. | Popis |
|---|---:|:---:|---|
| `reservation_id` | string | ✓ | ID rezervace |
| `ticket_id` | string | ✓ | vazba na tiket |
| `investor_id` | string | ✓ | vazba na investora |
| `created_by_broker_id` | string | ✓ | kdo založil |
| `status` | enum | ✓ | viz 4.2 |
| `created_at` | datetime | ✓ | vytvoření |
| `sign_deadline_at` | datetime | ✓ | deadline pro podpis balíku |
| `signed_at` | datetime |  | kdy investor dokončil podpis |
| `broker_note_to_investor` | string |  | poznámka vyplněná v modalu (1/2) |

### 3.4 Document / DocumentPackage
| Pole | Typ | Pov. | Popis |
|---|---:|:---:|---|
| `document_id` | string | ✓ | ID dokumentu |
| `title` | string | ✓ | Název (např. „Znalecký posudek“) |
| `file_type` | enum | ✓ | `PDF` \| `DOC` \| `XLS` … |
| `file_size_bytes` | int | ✓ | velikost |
| `download_url` | string |  | dostupné jen když není uzamčeno |
| `is_locked` | bool | ✓ | uzamčeno/odemčeno |
| `lock_reason` | string |  | např. „Odemkne se po podpisu Souhlasu“ |

**Investor signing package (1 balík):**
- `CONSENT_DATA_SHARING` (Souhlas se sdílením údajů)
- `NDA`
- `RESERVATION_AGREEMENT` (Rezervační smlouva)

### 3.5 Badge tagy (status_badges)
Kanonické hodnoty:
- `PARTIALLY_LOCKED` = „Částečně uzamčeno“
- `LOCKED` = „Zamčeno“ (používá se i pro placeholder obrázek)
- `LAST_SEATS` = „Poslední místa“
- `FREE_CAPACITY` = „Volná kapacita“
- `FULL` = „Naplněno“
- `CLOSING_SOON` = „Končí brzy“ (pokud používáte)
- `ACTIVE` = „Aktivní“ (nepovinné, často implicitní)

---

## 4) Stavy a pravidla

### 4.1 Locking (uzamčení) — jednotné pravidlo
- `LOCKED`  
  - galerie: placeholder (bez reálných fotek)  
  - citlivé dokumenty: zamčeno  
  - CTA „Vybrat investora“ je dostupné  
- `PARTIALLY_UNLOCKED`  
  - některé dokumenty odemčené (typicky teaser)  
  - ostatní zamčeno  
- `UNLOCKED`  
  - všechny odemčené podklady dle oprávnění  
  - galerie a cover jsou viditelné

**Přechod na UNLOCKED (pro brokera) nastává:**
- jakmile investor v rámci balíku dokumentů dokončí podpis položek **Souhlas + NDA** (může to být v jedné e‑sign relaci).

### 4.2 Reservation status (kanonické)
- `DRAFT` (modal 1/2 vyplněn, ještě neodesláno)
- `SENT_TO_INVESTOR` (odesláno k podpisu)
- `INVESTOR_SIGNING` (investor otevřel link, podpis probíhá)
- `INVESTOR_SIGNED` (balík podepsán)
- `DEVELOPER_SIGNING` (pokud developer podepisuje)
- `ACTIVE` (rezervace aktivní)
- `EXPIRED` (deadline pro podpis vypršel)
- `CANCELLED` (zrušeno brokerem/adminem)

### 4.3 Lhůty (defaulty)
- `investor_sign_deadline_hours = 48`  → 48 hodin na podpis **celého balíku dokumentů**  
- `developer_sign_deadline_hours = 48` (pokud je potřeba)  
- `fund_transfer_deadline_days = 5`  
- `negotiation_max_days = 30` (pokud používáte v detailu rezervace)

> Lhůty jsou **konfigurovatelné adminem**.

---

## 5) Datové balíčky pro UI (co potřebuje která obrazovka)

### 5.1 BRK-200 Tikety (list)
Každá karta potřebuje:
- `ticket_id`, `project_name`, `project_city`
- `ticket_type`, `total_volume_czk`, `yield_pa_pct`, `maturity_months`
- `capacity_used`, `capacity_total`
- `expires_at` (+ odvozený text „za X dní“)
- `broker_reward_czk`
- `security_rank` (pokud DEBT) / jinak label „Equity“
- `lock_state` + `status_badges`
- `cover_image_url` (jen pokud UNLOCKED) jinak placeholder
- `gallery_count` (volitelné zobrazení indikátoru „Galerie (n)“ na kartě)

### 5.2 BRK-210 Tiket detail
- všechno z listu +
- `funding_remaining_czk`, `capacity_fill_pct`, `queue_count`
- `ltv_pct` (DEBT)
- `gallery_image_urls` (UNLOCKED) + `gallery_count`
- `project_description`
- `use_of_funds_description`
- `documents[]` (včetně `is_locked`)
- `recommended_investors[]` (matching)
- `process_steps[]` (Rezervace / Podpis / Převod)

### 5.3 BRK-220 Zahájit rezervaci (1/2)
- `ticket_summary` (název, id, objem, výnos, cover)
- `investor_select_options[]` (display_name + email)
- pole `broker_note_to_investor`

### 5.4 BRK-230 Potvrzení rezervace (2/2)
- seznam dokumentů k podpisu (3 položky)
- `sign_deadline_at` (v UI „48 hodin…“)
- `investor_summary` (jméno, email)
- checkbox `broker_has_client_consent = true/false`

---

## 6) Demo dataset (konzistentní ukázková data)

> Používej jako demo napříč UI. Část polí je „zjednodušená“ (např. bez plného developera).

```yaml
tickets:
  - ticket_id: TIK-2024-001
    project_name: Rezidence Kampa
    project_city: Praha 1
    ticket_type: DEBT
    financing_form: Seniorní úvěr
    total_volume_czk: 25000000
    yield_pa_pct: 9.5
    maturity_months: 18
    min_reservation_czk: 100000
    security_rank: 1
    ltv_pct: 65
    broker_reward_czk: 625000
    expires_at: 2026-02-24
    capacity_total: 3
    capacity_used: 2
    queue_count: 12
    funding_remaining_czk: 8500000
    capacity_fill_pct: 66
    lock_state: UNLOCKED
    status_badges: [FREE_CAPACITY]
    ready_score: A
    gallery_count: 3
    cover_image_url: https://example.com/img/kampa-cover.jpg
    gallery_image_urls:
      - https://example.com/img/kampa-1.jpg
      - https://example.com/img/kampa-2.jpg
      - https://example.com/img/kampa-3.jpg

  - ticket_id: TIK-2024-002
    project_name: Logistický park D1
    project_city: Jihlava
    ticket_type: DEBT
    financing_form: Seniorní úvěr
    total_volume_czk: 50000000
    yield_pa_pct: 11.2
    maturity_months: 36
    min_reservation_czk: 1000000
    security_rank: 2
    ltv_pct: 60
    broker_reward_czk: 1500000
    expires_at: 2026-01-30
    capacity_total: 4
    capacity_used: 1
    queue_count: 4
    funding_remaining_czk: 25000000
    capacity_fill_pct: 25
    lock_state: PARTIALLY_UNLOCKED
    status_badges: [PARTIALLY_LOCKED, LAST_SEATS]
    ready_score: B
    gallery_count: 0

  - ticket_id: TIK-2024-003
    project_name: Bytový dům Smíchov
    project_city: Praha 5
    ticket_type: EQUITY
    total_volume_czk: 10000000
    yield_pa_pct: 15.0
    maturity_months: 18
    min_reservation_czk: 200000
    broker_reward_czk: 400000
    expires_at: 2026-02-28
    capacity_total: 3
    capacity_used: 3
    queue_count: 8
    funding_remaining_czk: 0
    capacity_fill_pct: 100
    lock_state: PARTIALLY_UNLOCKED
    status_badges: [PARTIALLY_LOCKED, FULL]
    ready_score: B
    gallery_count: 0

  - ticket_id: TIK-2024-004
    project_name: Solar Park Morava
    project_city: Znojmo
    ticket_type: DEBT
    financing_form: Seniorní úvěr
    total_volume_czk: 100000000
    yield_pa_pct: 8.5
    maturity_months: 48
    min_reservation_czk: 2000000
    security_rank: 1
    ltv_pct: 70
    broker_reward_czk: 2000000
    expires_at: 2026-03-10
    capacity_total: 5
    capacity_used: 1
    queue_count: 0
    funding_remaining_czk: 80000000
    capacity_fill_pct: 20
    lock_state: UNLOCKED
    status_badges: [FREE_CAPACITY]
    ready_score: A
    gallery_count: 4
    cover_image_url: https://example.com/img/solar-cover.jpg
    gallery_image_urls:
      - https://example.com/img/solar-1.jpg
      - https://example.com/img/solar-2.jpg
      - https://example.com/img/solar-3.jpg
      - https://example.com/img/solar-4.jpg

  - ticket_id: TIK-2024-005
    project_name: Retail Park Ostrava
    project_city: Ostrava
    ticket_type: DEBT
    financing_form: Seniorní úvěr
    total_volume_czk: 30000000
    yield_pa_pct: 10.0
    maturity_months: 24
    min_reservation_czk: 500000
    security_rank: 1
    ltv_pct: 55
    broker_reward_czk: 840000
    expires_at: 2026-02-05
    capacity_total: 3
    capacity_used: 2
    queue_count: 6
    funding_remaining_czk: 12000000
    capacity_fill_pct: 66
    lock_state: PARTIALLY_UNLOCKED
    status_badges: [PARTIALLY_LOCKED, LAST_SEATS]
    ready_score: B
    gallery_count: 0

investors:
  - investor_id: INV-0001
    display_name: Jan Novák
    email: jan.novak@email.cz
    is_platform_user: false

  - investor_id: INV-0002
    display_name: Firma ABC s.r.o.
    email: info@firma-abc.cz
    is_platform_user: false

  - investor_id: INV-0003
    display_name: Martin Dvořák
    email: martin.d@email.cz
    is_platform_user: false
```

---

## 7) Formátování v UI (jednotně)

- **Měna:** `Kč` s mezerami jako oddělovač tisíců → `25 000 000 Kč`
- **Procenta:** `9.5 % p.a.` (jedna desetinná, pokud je potřeba)
- **Splatnost:** `18 měsíců` / `36 měsíců`
- **Expirace:** formát `D. M. YYYY` + doplněk `za X dní` (odvozeně)
- **Kapacita:** progress bar + text `2/3`
- **Ready Score:** `Ready Score: A` (A nejlepší)

---

## 8) Poznámky k auditům a disclaimerům

- Platforma může zobrazovat informaci: **„Platforma podklady neověřuje. Slouží jako evidence pro audit a komunikaci.“**
- Doporučení investorů / matching: **„Matching je doporučení pro výběr. Nejde o investiční poradenství.“**

---
