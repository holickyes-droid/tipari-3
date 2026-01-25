# Tipconnecta — Souhrn Dat (CLEAN, CANONICAL)

**Verze:** 1.2.0  
**Datum:** 2026-01-24  
**Stav:** CANONICAL (AI-friendly, bez duplicitních variant)

---

## Jak s tím pracovat ve Figmě (Gemini 3 Pro)

- Tento dokument je **zdroj pravdy pro datová pole, enumerace a business pravidla**.
- Pokud je konflikt s UX Specem:  
  - **UX Spec vyhrává pro UI copy a interakce**,  
  - **Souhrn Dat vyhrává pro význam, stavy a formátování dat**.

---

## 1) Základní entity a vztahy

### 1.1 Ticket (Tiket)
Investiční příležitost, kterou broker nabízí investorům.

- Tiket je navázaný na **Projekt** (project) a **Developera** (developer).
- Tiket má **kapacitu** (tranše / místa), **expiraci**, parametry investice a provizi brokera.

### 1.2 Reservation (Rezervace)
Záznam o tom, že broker vybral investora pro konkrétní tiket a poslal podpisový balík.

- Rezervace má svůj **stav** a **SLA lhůty** (typicky 48h na podpis balíku).

### 1.3 Investor
Osoba / firma, kterou broker spravuje.

### 1.4 Documents (Podklady)
Soubory navázané na tiket/projekt (teaser, posudek, vzor smlouvy…).

### 1.5 Media (Galerie)
Obrázky navázané na projekt/tiket: cover + galerie.

### 1.6 Matching (Shody s investory)
Výpočet shody mezi investorem a tiketem (vysoká/střední/nízká/mimo kritéria) + důvody.

---

## 2) Pravidla uzamčení (maskování)

### 2.1 Co znamená „uzamčený tiket“
Do podpisu **Souhlasu se sdílením údajů** investorem jsou citlivé informace omezené.

**Doporučené UX zobrazení (sjednoceno):**
- V seznamu tiketů lze zobrazit základní parametry (objem, výnos, splatnost, kapacita).
- Citlivé části, které jsou uzamčené:
  - identita developera (název firmy, IČ, kontakty)
  - privátní dokumenty
  - galerie / reálné fotografie (nahrazeno placeholderem)
  - detailní popis zajištění (např. přesná adresa)

> Pozn.: Pokud chcete režim „plně anonymizované identity projektu“, použijte v UI místo názvu projektu `Tiket #{ticket_code}`. V praxi to lze řídit feature flagem `anonymize_project_name`.

### 2.2 Co odemyká přístup
- **Souhlas se sdílením údajů** je hlavní „odemknutí“.  
- V praxi investor podepisuje **1 balík dokumentů** (Souhlas + NDA + Rezervační smlouva).  
- Jakmile je Souhlas podepsán → systém může odemknout citlivé části (podklady, galerie).

---

## 3) Enumerace a statusy

### 3.1 Ticket status (ticket_status)
- `active` — aktivní, lze rezervovat
- `closing_soon` — aktivní, poslední místa (badge „POSLEDNÍ MÍSTA“)
- `full` — naplněno (badge „NAPLNĚNO“, CTA disabled)
- `closed` — uzavřeno (CTA disabled)

### 3.2 Lock status (lock_status)
- `unlocked`
- `partially_locked` (badge „ČÁSTEČNĚ UZAMČENO“)
- `locked` (placeholder „ZAMČENO“)

### 3.3 Matching level (match_level)
- `high` — Vysoká shoda
- `medium` — Střední shoda
- `low` — Nízká shoda
- `out_of_criteria` — Mimo kritéria

### 3.4 Reservation status (reservation_status)
- `draft` — vytvořeno, ale neodesláno k podpisu (většinou UI neukazuje)
- `sent_for_signature` — odesláno investorovi
- `investor_signed` — investor podepsal (balík kompletní nebo částečný dle implementace)
- `developer_signed` — developer podepsal (pokud relevantní)
- `expired` — vypršela 48h lhůta
- `cancelled` — ručně zrušeno
- `active` — rezervace platná, probíhá financování
- `finished` — dokončeno (profinancováno / uzavřeno)

---

## 4) Datový model (pole)

### 4.1 Ticket — minimální pole
| Pole | Typ | Příklad | Poznámka |
|---|---|---|---|
| `ticket_id` | string | `tik_001` | interní ID |
| `ticket_code` | string | `TIK-2024-001` | zobrazované ID |
| `project_name` | string | `Rezidence Kampa` | může být anonymizováno feature flagem |
| `location_label` | string | `Praha 1` | město / region |
| `expiry_date` | date | `2026-02-24` | expirace tiketu |
| `ticket_volume_czk` | int | `25000000` | „Objem“ |
| `yield_pa_pct` | float | `9.5` | „Výnos p.a.“ |
| `term_months` | int | `18` | „Splatnost“ |
| `interest_period` | enum | `monthly` | „Úrok. období“ |
| `min_reservation_czk` | int | `100000` | min. výše rezervace |
| `ltv_pct` | int | `65` | LTV |
| `security_rank` | string | `1. v pořadí` | zobrazení v kartě |
| `broker_fee_czk_ex_vat` | int | `625000` | odměna brokera |
| `remaining_to_fund_czk` | int | `8500000` | detail — karta vpravo |
| `capacity_total_tranches` | int | `3` | např. 3 tranše |
| `capacity_reserved_tranches` | int | `2` | obsazeno |
| `queue_count` | int | `12` | ve frontě |
| `ticket_status` | enum | `active` | viz 3.1 |
| `lock_status` | enum | `partially_locked` | viz 3.2 |
| `ready_score` | enum | `A` | A/B/C |
| `created_at` | datetime |  | audit |

### 4.2 Media — cover + galerie
| Pole | Typ | Příklad | Poznámka |
|---|---|---|---|
| `media.cover_url` | url \| null | `https://.../cover.jpg` | pokud uzamčeno → null |
| `media.gallery` | array | viz níže | pokud uzamčeno → prázdné / placeholder |
| `media.gallery_count` | int | `8` | pro badge `+8` |

`media.gallery[]` objekt:
- `url` (string)
- `thumb_url` (string, optional)
- `caption` (string, optional)
- `order` (int)

### 4.3 Documents (Podklady)
| Pole | Typ | Příklad | Poznámka |
|---|---|---|---|
| `documents[]` | array |  | seznam |
| `documents[].name` | string | `Znalecký posudek` | |
| `documents[].file_type` | enum | `pdf`/`doc` | |
| `documents[].size_bytes` | int | `15100000` | UI formát MB/KB |
| `documents[].is_private` | bool | `true` | privátní = lockable |
| `documents[].download_url` | url \| null |  | null pokud uzamčeno a privátní |

### 4.4 Matching summary (pro kartu „Shody s investory“)
| Pole | Typ | Příklad |
|---|---|---|
| `matching.count_high` | int | 4 |
| `matching.count_medium` | int | 12 |
| `matching.count_low` | int | 8 |
| `matching.top_investors[]` | array | (jméno, reason, level) |

### 4.5 Reservation — pole
| Pole | Typ | Příklad | Poznámka |
|---|---|---|---|
| `reservation_id` | string | `res_001` | |
| `ticket_id` | string | `tik_001` | |
| `investor_id` | string | `inv_101` | |
| `created_by_broker_id` | string | `brk_01` | |
| `status` | enum | `sent_for_signature` | viz 3.4 |
| `signature_package_deadline_at` | datetime | `2026-01-26T10:30:00Z` | 48h SLA |
| `signature_docs` | array | Souhlas, NDA, Rezervační | pro UI rekapitulaci |
| `consent_signed_at` | datetime \| null |  | odemyká |
| `nda_signed_at` | datetime \| null |  | |
| `reservation_agreement_signed_at` | datetime \| null |  | |
| `cancel_reason` | string \| null |  | expired/cancelled |

---

## 5) Data mapping → UI (Tikety / Detail)

### 5.1 Tikety — karta v seznamu (UX)
- `ticket_code` → badge vlevo nahoře
- `lock_status` → placeholder/real cover image
- `project_name` → název (nebo anonymní varianta)
- `location_label` → meta řádek
- `expiry_date` → „Expirace: …“ + relativní `(za X dní)`
- `ticket_volume_czk` → „Objem“
- `yield_pa_pct` → „Výnos p.a.“
- `term_months` → „Splatnost“
- `capacity_reserved_tranches/capacity_total_tranches` → progress bar + `2/3`
- `security_rank` → „Zajištění“
- `broker_fee_czk_ex_vat` → „Odměna brokera (bez DPH)“
- `ticket_status`:
  - `active` → CTA enabled
  - `full`/`closed` → CTA disabled

### 5.2 Detail tiketu — hero + pravý sloupec
- `media.cover_url` + `media.gallery` → galerie grid + lightbox
- `remaining_to_fund_czk` → „Zbývá k profinancování“
- `capacity_reserved_tranches/capacity_total_tranches` → „2/3 tranší obsazeno“
- `queue_count` → „12 ve frontě“
- `broker_fee_czk_ex_vat` → „Odměna brokera“
- `expiry_date` → „Expirace tiketu“
- `ready_score` → „Ready Score: A“ v sekci Podklady

---

## 6) Výpočet odvozených UI stavů (doporučení)

### 6.1 Badge „POSLEDNÍ MÍSTA“
- `ticket_status = closing_soon` NEBO (odvozeně) pokud zbývá ≤ 10–15 % kapacity

### 6.2 Badge „NAPLNĚNO“
- `ticket_status = full` NEBO `capacity_reserved_tranches == capacity_total_tranches`

### 6.3 Relativní expirace „za X dní“
- `X = ceil(expiry_date - today)` (dny)

---

## 7) Ukázková data (pro design)

### 7.1 Tickets
1) **Rezidence Kampa**  
- `ticket_code`: TIK-2024-001  
- `location_label`: Praha 1  
- `expiry_date`: 2026-02-24  
- `ticket_volume_czk`: 25 000 000  
- `yield_pa_pct`: 9.5  
- `term_months`: 18  
- `min_reservation_czk`: 100 000  
- `ltv_pct`: 65  
- `security_rank`: 1. v pořadí  
- `broker_fee_czk_ex_vat`: 625 000  
- `remaining_to_fund_czk`: 8 500 000  
- `capacity`: 2/3, `queue_count`: 12  
- `ticket_status`: active  
- `lock_status`: partially_locked  
- `ready_score`: A  
- `media.gallery_count`: 8 (ale pokud locked, cover_url = null)

2) **Logistický park D1**  
- `ticket_code`: TIK-2024-002  
- `location_label`: Jihlava  
- `expiry_date`: 2026-01-30  
- `ticket_volume_czk`: 50 000 000  
- `yield_pa_pct`: 11.2  
- `term_months`: 36  
- `capacity`: 1/4  
- `security_rank`: 2. v pořadí  
- `broker_fee_czk_ex_vat`: 1 500 000  
- `ticket_status`: closing_soon  
- `lock_status`: locked  

3) **Retail Park Ostrava**  
- `ticket_code`: TIK-2024-005  
- `location_label`: Ostrava  
- `expiry_date`: 2026-02-05  
- `ticket_volume_czk`: 30 000 000  
- `yield_pa_pct`: 10.0  
- `term_months`: 24  
- `capacity`: 2/3  
- `security_rank`: 1. v pořadí  
- `broker_fee_czk_ex_vat`: 840 000  
- `ticket_status`: active  
- `lock_status`: partially_locked  

### 7.2 Investors (pro matching)
- `Jan Novák` — preference Praha, limit LTV 65 %, částka 20–40M
- `Firma ABC s.r.o.` — preferuje retail, částka 10–30M
- `Martin Dvořák` — preferuje krátkou splatnost ≤ 24 měs.

---

## 8) Changelog (1.2.0 vs 1.1.x)
- Sjednoceno: **1 podpisový balík** + **48h** limit (UI copy i datová pole).
- Doplněn model `media` (cover + galerie + count) pro potřeby galerie v kartě i detailu.
- Sjednoceno maskování: co je uzamčeno do podpisu Souhlasu.
- Přidán mapping dat → UI pro Tikety a Detail tiketu.
