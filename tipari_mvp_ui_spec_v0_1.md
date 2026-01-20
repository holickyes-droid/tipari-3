# Tipari.cz – MVP UI návrh (v0.1)

**Zdroj zadání:** `tipari_ux_platforma_handoff_v0.2.md` + `Tipari_Souhrn_Dat_a_Pravidel_DATA_v1.3_LOCKED.md`  
**Artefakt:** `tipari_mvp_ui_prototype_v0_1.html` (statický UI prototyp – bez backendu)

---

## A) Shrnutí řešení
Navrhli jsme MVP UI pro tři role (Obchodník / Developer / Admin) jako **data‑first** systém s důrazem na **statusy, kapacitu/pořadí a odpočty lhůt**. Klíčový tok je „Rezervace“ s dvoufázovým podpisem investora (**Souhlas + NDA → Rezervační smlouva**), navázanými SLA (default 48h) a auditní stopou. UI striktně komunikuje, **co je skryté a kdy se odemkne**, a vede uživatele přes „next‑best action“ (kdo je na tahu). Finance jsou řešeny **manuálně** (bez bankovní integrace) s jasnými stavy: kdo má co udělat a kdy.

---

## B) Checklist souladu s pravidly
- **Maskování identit:** ✔ Projekt+developer maskované do podpisu Souhlasu+NDA investorem; NDA není viditelné developerovi.  
- **Lhůty & odpočty:** ✔ všude, kde běží čas: odpočet + deadline + „Na tahu“ + poznámka o možnosti prodloužení adminem.  
- **Audit:** ✔ v detailu rezervace je audit log (kdo/kdy/co), a citlivé akce vyžadují potvrzení + důvod.  
- **Manuální finance:** ✔ potvrzení profinancování developerem (datum/částka/podklady) + ruční potvrzení úhrad adminem.  
- **Terminologie:** ✔ Projekt / Tiket / Rezervace / Rezervační smlouva / Aktivní rezervace / Jednání / Financování / Provize / Pool.

---

## C) Flow map (kroky + rozhodovací body)
1. **Obchodník vybere Tiket** (maskované detaily) → *CTA: „Vytvořit rezervaci“*  
2. **Wizard Krok 1: Investor**  
   - vybrat existující / vytvořit inline (deduplikace dle e‑mailu)
3. **Wizard Krok 2: Souhlas + NDA**  
   - volba metody: eSign / fyzicky+scan  
   - běží SLA pro investora (default 48h)  
   - **Po podpisu obou dokumentů:** odmaskování projektu+developera obchodníkovi, rezervace se zobrazí developerovi
4. **Wizard Krok 3: Rezervační smlouva**  
   - investor podepisuje (eSign / scan)  
   - **timestamp podpisu** určí pořadí ve frontě  
   - rozhodnutí: **v kapacitě** vs **mimo kapacitu**
5. **Pokud v kapacitě:** systém zpřístupní RS developerovi → běží SLA pro developera (default 48h)  
6. **Developer podepíše RS / zamítne (důvod)**  
7. **Aktivní rezervace → Jednání (30 dní)**  
8. **Financování potvrzeno developerem** (datum/částka/podklady)  
9. **Provize & fakturace:**  
   - platforma fakturuje developera (stav ručně potvrzuje admin)  
   - po úhradě vzniká brokerovi možnost nahrát fakturu platformě  
   - admin vyplácí provizi (ručně, audit)

**Odbočky / edge cases:**
- expirace investora (SLA vyprší) → rezervace ukončena  
- rezervace mimo kapacitu čeká ve frontě → může být posunuta do kapacity, když se uvolní místo  
- tiket profinancován jiným investorem → ostatní rezervace ukončeny  
- offline podpis: rozhoduje **čas nahrání scanu** (pořadí)

---

## D) Screen-by-screen UI Spec (MVP)

### BKR-00 Přehled (Obchodník)
- **Účel / JTBD:** „Vím, co dnes hoří a co mám udělat jako další krok.“
- **Klíčová data:** SLA v ohrožení, rezervace podle „Na tahu“, očekávané provize.
- **Primární CTA:** „Otevřít detail rezervace“.
- **Sekundární:** Poslat připomínku, Export.
- **Stavy:** loading skeleton; empty („Nemáte nic k řešení“); error („Nepodařilo se načíst“).
- **Viditelnost/maskování:** u rezervací před Souhlas+NDA maskovat investora i identitu projektu/developera.
- **ASCII (desktop):**
```
[SIDENAV] | Přehled
          | [SLA dnes]  [Na tahu: Investor]  [Na tahu: Developer]
          | [Karty rezervací se štítky + odpočet + CTA Detail]
          | [Rychlé akce]
```

### BKR-01 Projekty a tikety (Obchodník)
- **Účel:** rychlý výběr tiketu podle parametrů a kapacity.
- **Povinné bloky karty tiketu:** Odměna (největší), částka, forma, výnos, zajištění+LTV, odpočet do uzávěrky, kapacita, CTA.
- **Interakce:** filtry, řazení, detail, rezervovat (spustí wizard).
- **Edge:** „Plno“ (disabled), „Uzavřeno“.
- **ASCII:**
```
[Filtry + hledání]
[TicketCard]
  Odměna: 125 000 Kč (BIG)
  Částka: 5 000 000 Kč | Výnos 8% | LTV 65% | Forma: Zápůjčka
  Do uzávěrky: 3d 4h (datum) | Kapacita 2/3 | CTA: Rezervovat
```

### BKR-02 Tiket detail (maskovaný)
- **Účel:** rozhodnutí + vysvětlení maskování + vstup do rezervace.
- **Klíčová data:** parametry, kapacita, odpočet, teaser dokumenty.
- **Maskování:** projekt+developer+většina dokumentů skryté do Souhlas+NDA.
- **CTA:** „Vytvořit rezervaci“.
- **ASCII:**
```
Header: Tiket #123 | [Maskováno] [Kapacita] [Odpočet]
Left: Parametry + teaser docs
Right: Sticky "Vytvořit rezervaci" + pravidla kapacity/pořadí
```

### BKR-03 Wizard 1/4 – Investor
- **Účel:** vybrat/vytvořit investora (interní evidence broker).
- **Validace:** e‑mail povinný; deduplikace podle e‑mailu.
- **Copy:** „Investor nemá login…“ + GDPR minimum.
- **CTA:** „Pokračovat“.

### BKR-04 Wizard 2/4 – Souhlas + NDA
- **Účel:** nastavit metodu podpisu a sledovat stav.
- **SLA:** odpočet + deadline + Na tahu: Investor; pozn. admin může prodloužit.
- **NDA:** explicitně označeno „developer dokument nevidí“.
- **CTA:** „Pokračovat“ (v reálu až po podepsání; v prototypu staticky).

### BKR-05 Wizard 3/4 – Rezervační smlouva
- **Účel:** podpis RS investorem, určení pořadí a kapacity.
- **Pravidlo pořadí:** timestamp podpisu, u scanu timestamp nahrání.
- **CTA:** „Pokračovat“.

### BKR-06 Wizard 4/4 – Shrnutí
- **Účel:** rekapitulace + vytvoření rezervace.
- **Audit:** potvrzení, že vytvoření uloží kdo/kdy/co.
- **CTA:** „Vytvořit rezervaci“.

### BKR-07 Rezervace detail (Obchodník)
- **Účel:** 1 obrazovka pro celý stav: timeline, SLA, dokumenty, finance, audit.
- **Klíčová data:** stavový štítek, odpočet, kapacita/pořadí, investor, developer, odměna.
- **Sekce:** Timeline, Dokumenty, Finance, Audit.
- **Citlivé akce:** Zrušit rezervaci (modal + důvod).
- **Edge:** mimo kapacitu (zobrazit „čekáte ve frontě“); tiket uzavřen jiným investorem (ukončit).
- **ASCII:**
```
Header: Rezervace R-xxxx | Status | Kapacita | Odpočet | Na tahu
Main:
  [Karty KPI] [Timeline]
  [Dokumenty]
  [Finance decision block]
  [Audit log]
Sidebar:
  [Další krok] [Citlivé akce]
```

### BKR-08 Moje rezervace (Obchodník)
- **Účel:** filtrovat a prioritizovat podle SLA.
- **UI:** tabulka se sloupci: rezervace, tiket, stav, kapacita, deadline, akce.
- **Maskování:** u rezervací před Souhlas+NDA maskovat investora.

### BKR-09 Investoři (Obchodník)
- **Účel:** interní evidence + rychlé kopírování kontaktů.
- **Audit:** změny citlivých údajů logovat.
- **Note:** investor nikdy nemá login.

### DEV-01 Rezervace (Developer)
- **Účel:** vědět, které rezervace v kapacitě vyžadují podpis.
- **Viditelnost:** rezervace se objeví po Souhlas+NDA.
- **Pravidlo:** RS dostupná jen u rezervací v kapacitě.
- **CTA:** „Detail“.

### DEV-02 Rezervace detail (Developer)
- **Účel:** podepsat RS / zamítnout (důvod) + potvrdit profinancování.
- **Financování:** datum/částka/podklady; citlivé potvrzení.
- **NDA:** není viditelné.
- **CTA:** „Podepsat“ / „Potvrdit profinancování“.

### FIN-01 Finance (role-based)
- **Broker:** nároky na provizi, stavy, upload faktury.
- **Developer:** faktury platformy, bankovní instrukce, upload potvrzení (pokud bude).
- **Admin:** přehled → odkaz na ADM-01.

### ADM-01 Finance a provize (Admin)
- **Účel:** ručně potvrzovat úhrady, schvalovat faktury brokerů, označovat výplaty.
- **Citlivé akce:** vyžadují důvod (audit).
- **UI:** tabulka + akce v řádku.

### ADM-02 Nastavení (Admin)
- **Účel:** SLA defaulty, povolení offline podpisů, správa šablon dokumentů.
- **Audit:** „Uložit“ vyžaduje důvod.

---

## E) Komponenty a design systém

### Tokeny (MVP)
- **Barvy:** Primary #0B1220, Accent #2563EB, Info #0EA5E9, Success #16A34A, Warning #F59E0B, Danger #DC2626, Neutral #94A3B8
- **Typografie:** Inter / system; H1 32/40; H2 20/28; Body 14/20; Decision number 28/32
- **Rohy:** 10/14/18; **Spacing:** 4/8/12/16/24/32/48

### Komponenty
1. **App shell** (sidebar + topbar)
2. **Status chip** (info/success/warning/danger/neutral/accent) – text vždy součást
3. **Countdown pill** (odpočet + deadline)
4. **Decision block** (primární číslo v Kč)
5. **Ticket card** (povinné bloky dle pravidel)
6. **Stepper** (wizard)
7. **Timeline** (rezervace)
8. **Document row** (název, metoda, stav, deadline, akce)
9. **Table** (se sticky headerem)
10. **Confirm modal** (důvod povinný u override)
11. **Form fields** (error state + helper)

---

## F) Copy deck (souhrn)
- „Maskováno do potvrzení Souhlasu + NDA investorem.“
- „Na tahu: Investor / Developer“
- „Zbývá 12:34:56 (do 21. 1. 2026 14:00)“
- CTA: „Vytvořit rezervaci“, „Rezervovat“, „Podepsat“, „Potvrdit profinancování“, „Nahrát scan“, „Stáhnout PDF“
- Chyby (příklady):
  - „Soubor je příliš velký. Max 20 MB.“
  - „Neplatný formát. Nahrajte PDF nebo JPG.“
  - „E‑mail je povinný pro odeslání podpisu.“

---

## G) Otevřené otázky / rizika (max 5) + další krok
1) Má developer možnost nahrát „potvrzení o úhradě“ faktury platformy, nebo je to čistě admin?  
2) Chceme v MVP mít „znovuotevření tiketu“ (admin override) přímo z detailu tiketu?  
3) Jaké jsou přesné stavy pro eSign (odesláno / zobrazeno / podepsáno / odmítnuto)? (UI má připravené placeholdery.)  
4) Jak přesně se počítá „fronta“: jen podepsané RS investorem, nebo i rozpracované?  
5) Pool: je mimo MVP (navržené jako „Soon“). Potvrďte, že ho neřešíme v první iteraci.

**Další krok:** pošlete první konkrétní „UX zadání“ (např. BRO-020 / DEV-041) nebo připomínky k prototypu – upravíme komponenty a poté přejdeme na pixel‑přesné Figma UI kit.
