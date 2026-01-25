# Tipconnecta — Sitemap (Broker / Partner) — CLEAN

**Verze:** 1.2  
**Datum:** 2026-01-24  
**Stav:** CANONICAL

---

## Globální navigace (Broker)

- Dashboard
- **Tikety** *(interně: marketplace)*
- Rezervace
- Investoři
- Projekty (Lead)
- Provize
- Pool
- Notifikace
- Profil / Nastavení účtu

---

## Tikety

### 1) Seznam tiketů
- URL: `/tikety`
- Primární akce: **Vybrat investora** (zahájit rezervaci)
- Podpora: vyhledávání, řazení, filtry
- Stavové badge: Uzamčeno/Částečně uzamčeno, Poslední místa, Naplněno, Volná kapacita
- **Galerie (nově):**  
  - pokud tiket není uzamčený, náhled může otevírat lightbox galerii

### 2) Detail tiketu
- URL: `/tikety/{ticketCode}`
- Hero: galerie (cover + 2 náhledy) + CTA „Zobrazit galerii“
- Pravý sloupec: karta „Zbývá k profinancování“ + „Průběh procesu“ + „Shody s investory“
- Podklady: seznam dokumentů + Ready Score

### 3) Matching investorů (modal/drawer)
- Otevření z detailu tiketu (karta „Shody s investory“)

---

## Rezervace

### 1) Přehled rezervací
- URL: `/rezervace`
- Filtry: stav, datum, investor, tiket

### 2) Detail rezervace
- URL: `/rezervace/{reservationId}`
- Timeline: podpisy (investor/developer), financování, stav

---

## Investoři

### 1) Přehled investorů
- URL: `/investori`
- Akce: detail, edit, přidat investora

### 2) Detail investora
- URL: `/investori/{investorId}`

---

## Projekty (Lead)
- Přehled leadů
- Detail leadu
- Přiřazení / převod

---

## Provize
- Přehled provizí
- Detail provize / fakturace

---

## Pool
- Přehled poolu
- Detail

---

## Poznámka k názvosloví
- V UI používáme **Tikety** (ne „Marketplace“).
