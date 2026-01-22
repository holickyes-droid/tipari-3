# Tipconnecta — Brand manuál (lean) v1.0
*(interní dokument pro UX/UI, copy a sales materiály)*

**Datum:** 2026-01-22  
**Scope:** aplikace za loginem (B2B), interní užití; tonalita a vizuální styl pro web/app/sales.

## 1) Brand role a positioning
### Co Tipconnecta je
Procesní platforma, která standardizuje introdukci developerského financování mezi **brokerem (obchodníkem)** a **developerem** přes **projekty → tikety → rezervace**. Investor do aplikace nevstupuje (podpisy řeší e‑mailem/eSign).

### Proč existujeme
- Snižujeme chaos, spory a rizika vztahů (kdo koho přivedl, co kdy kdo podepsal, kdo je „na tahu“).
- Chráníme citlivé informace (teaser/odmaskování identit) a nastavujeme jasné lhůty (SLA).

### Esence (1 věta)
**„Jistota introdukce.“** *(alternativa: „Klid v rozhodování.“)*

## 2) Hodnoty značky (5)
1. **Důvěra** — auditní stopa, jasná pravidla.
2. **Profesionalita** — věcný jazyk, standardy, žádné sliby.
3. **Transparentnost** — termíny, stavy, částky v Kč.
4. **Respekt** — chráníme vztahy broker–investor–developer.
5. **Klid** — UI bez zbytečného stresu, vždy je jasný další krok.

## 3) Tone of voice
### Základní pravidla
- **Vykání**.
- **Věcně, kultivovaně** (private banking feeling), žádné superlativy.
- **Žádné sliby výnosů**, žádné „garance“ ani „snadné zbohatnutí“.
- Jazykově oddělovat **„rezervaci“** (proces) vs **„investici“** (rozhodnutí investora mimo naši aplikaci).
- Terminologicky preferovat **„zápůjčka / úvěr“** (ne „přímá půjčka“).

### Styl mikrocopy
- Krátké, akční, procesní: „Zahájit rezervaci“, „Odeslat k podpisu“, „Zobrazit stav“, „Stáhnout dokument“.
- Upřednostnit **konkrétní fakta**: termín, částka, stav, další krok.

### Zakázané formulace (příklady)
- „Garantujeme…“, „jistý výnos…“, „nejlepší investice…“, „bez rizika…“, „rychle zbohatněte…“.

## 4) Vizuální styl (UI look & feel)
### Principy
- **Whitespacové, čisté layouty**, důvěryhodná typografická hierarchie.
- **Outline ikony**, minimalistická vizuální řeč.
- **Modro‑bílý minimalismus**, bez agresivních barev.
- V hero/marketing grafice (pokud bude): **realistické rendery budov** s jemným overlay; bez retail-invest „hype“ stylu.

### Barevná paleta (základ)
- **Tipari Blue:** `#215EF8` (primární akce, odkazy, důraz)
- **Dark Navy:** `#040F2A` (nadpisy, důvěryhodný základ)
- Neutrály: bílá, velmi světlé šedé pozadí, neutrální šedé texty.
- Status barvy: úspěch (zelená), varování (oranžová), chyba (červená), info (modrá). *(Konkrétní odstíny upřesníme v design tokenech.)*

### Typografie (doporučení pro Figma/UI)
- Preferovat moderní systémový font nebo **Inter** (rychlá čitelnost, „fintech“ feel).
- Škála: H1/H2/H3 + body + caption; důraz na čitelnost na desktopu.

### Komponentový styl
- Karty (tile cards) pro tikety a rezervace: čisté hrany, jemný stín/outline.
- „Timeline“ komponenta jako klíčový prvek důvěry: Rezervace → Podpisy → Aktivace → Jednání → Financování → Provize.
- Badge/tagy pro stav + SLA (např. „Čeká na podpis investora (do 48 h)“).

## 5) Copy & UI patterny pro důvěru
- V každé kritické obrazovce ukázat:
  - **kdo je na tahu**
  - **do kdy**
  - **co se stane, když to neproběhne**
  - **co se sdílí / nesdílí** (maskování identit)
- Vždy uvádět částky primárně v **Kč** (základ bez DPH), DPH řešit až na fakturách.

## 6) Mini checklist konzistence (pro tým)
Před odevzdáním obrazovky si odškrtněte:
- [ ] UI jasně odděluje rezervaci vs investici.
- [ ] Nikde neslibujeme výnosy / garance.
- [ ] Je vidět aktuální stav + další krok + deadline.
- [ ] Identita investora je chráněná do aktivace (dle pravidel).
- [ ] Částky jsou primárně v Kč; DPH není „nafouknuté“ v provizních výpočtech.
