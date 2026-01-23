# 🎨 TIPARI.CZ - KOMPLETNÍ DESIGN SYSTEM
**Platforma:** Tipari.cz B2B Investiční Katalog  
**Verze:** v2.3 (Prompt 53 Update)  
**Status:** ✅ AKTIVNÍ  
**Datum:** 17. ledna 2026  
**Autor:** Tipari.cz Design Team

---

## 📋 OBSAH

1. [Brand Identity](#brand-identity)
2. [Color Palette](#color-palette)
3. [Typography System](#typography-system)
4. [Spacing & Layout](#spacing--layout)
5. [Border & Radius](#border--radius)
6. [Shadows & Elevation](#shadows--elevation)
7. [Animation System](#animation-system)
8. [Component Library](#component-library)
9. [Usage Guidelines](#usage-guidelines)
10. [Implementation Examples](#implementation-examples)
11. [Reference Documentation](#reference-documentation)
12. [Source Files](#source-files)

---

## 🎯 BRAND IDENTITY

### Brand Colors (Primary Palette)

```css
/* Primary - Blue */
--color-brand-blue: #215EF8;
--color-brand-blue-dark: #1a4bc6;
--color-brand-blue-light: #EEF3FF;

/* Success - Green */
--color-brand-green: #14AE6B;
--color-brand-green-dark: #0f8d54;
--color-brand-green-light: #E8F8F1;

/* Dark - Navy */
--color-brand-navy: #040F2A;
--color-brand-navy-light: #1a2742;

/* Commission/Premium - Gold */
--color-commission: #F59E0B;
--color-commission-dark: #D97706;
--color-commission-light: #FEF3C7;
```

### Semantic Colors

```css
--color-success: #14AE6B;    /* Schválené stavy, pozitivní akce */
--color-warning: #F59E0B;    /* Upozornění, čekající akce */
--color-danger: #EF4444;     /* Chyby, odmítnuté stavy */
--color-info: #215EF8;       /* Informace, odkazy */
```

### Brand Usage Rules

| Color | Usage | Examples |
|-------|-------|----------|
| **#215EF8** (Blue) | Primární akce, odkazy, focus states | Tlačítka "Rezervovat", aktivní stavy |
| **#14AE6B** (Green) | Success states, potvrzení, provize | "Schváleno", finální potvrzení |
| **#040F2A** (Navy) | Texty, headingy, dark mode | Nadpisy, hlavní text |
| **#F59E0B** (Gold) | Provize, premium features | Odhad provize, VIP značky |

---

## 🎨 COLOR PALETTE

### Primary System Colors

```css
--background: #ffffff;
--foreground: oklch(0.145 0 0);        /* ~#040F2A */
--card: #ffffff;
--card-foreground: oklch(0.145 0 0);
--popover: oklch(1 0 0);
--popover-foreground: oklch(0.145 0 0);
--primary: #030213;
--primary-foreground: oklch(1 0 0);
--secondary: oklch(0.95 0.0058 264.53);
--secondary-foreground: #030213;
--muted: #ececf0;
--muted-foreground: #717182;
--accent: #e9ebef;
--accent-foreground: #030213;
--destructive: #d4183d;
--destructive-foreground: #ffffff;
--border: rgba(0, 0, 0, 0.1);
--input: transparent;
--input-background: #f3f3f5;
--switch-background: #cbced4;
--ring: oklch(0.708 0 0);
```

### Chart Colors

```css
--chart-1: oklch(0.646 0.222 41.116);  /* Orange */
--chart-2: oklch(0.6 0.118 184.704);   /* Teal */
--chart-3: oklch(0.398 0.07 227.392);  /* Blue */
--chart-4: oklch(0.828 0.189 84.429);  /* Yellow */
--chart-5: oklch(0.769 0.188 70.08);   /* Green */
```

### Dark Mode Support

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --primary: oklch(0.985 0 0);
  /* ... kompletní dark mode definice v theme.css */
}
```

---

## ✍️ TYPOGRAPHY SYSTEM

### Font Family

```css
--font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Import:** `/src/styles/fonts.css`

### Typography Scale

#### 1. Display / Page Title
```css
--type-display-page-size: 2rem;           /* 32px */
--type-display-page-line: 2.5rem;         /* 40px */
--type-display-page-weight: 700;
--type-display-page-spacing: -0.02em;
```
**Usage:** Hlavní nadpisy stránek (H1)

#### 2. Heading / Section
```css
--type-heading-section-size: 1.25rem;     /* 20px */
--type-heading-section-line: 1.75rem;     /* 28px */
--type-heading-section-weight: 600;
--type-heading-section-spacing: -0.01em;
```
**Usage:** Sekce nadpisy (H2)

#### 3. Heading / Subsection
```css
--type-heading-subsection-size: 1rem;     /* 16px */
--type-heading-subsection-line: 1.5rem;   /* 24px */
--type-heading-subsection-weight: 600;
--type-heading-subsection-spacing: -0.01em;
```
**Usage:** Podnadpisy (H3)

#### 4. Body / Primary
```css
--type-body-primary-size: 0.875rem;       /* 14px */
--type-body-primary-line: 1.375rem;       /* 22px */
--type-body-primary-weight: 400;
--type-body-primary-spacing: 0;
```
**Usage:** Hlavní text odstavců, popisky

#### 5. Body / Secondary
```css
--type-body-secondary-size: 0.8125rem;    /* 13px */
--type-body-secondary-line: 1.25rem;      /* 20px */
--type-body-secondary-weight: 400;
--type-body-secondary-spacing: 0;
```
**Usage:** Vedlejší text, metadata

#### 6. Label / Strong
```css
--type-label-strong-size: 0.8125rem;      /* 13px */
--type-label-strong-line: 1.125rem;       /* 18px */
--type-label-strong-weight: 500;
--type-label-strong-spacing: 0.01em;
```
**Usage:** Form labels, důležité štítky

#### 7. Label / Muted
```css
--type-label-muted-size: 0.75rem;         /* 12px */
--type-label-muted-line: 1rem;            /* 16px */
--type-label-muted-weight: 400;
--type-label-muted-spacing: 0.02em;
```
**Usage:** Pomocné texty, poznámky

#### 8. Number / Metric L
```css
--type-number-metric-l-size: 1.5rem;      /* 24px */
--type-number-metric-l-line: 2rem;        /* 32px */
--type-number-metric-l-weight: 600;
--type-number-metric-l-spacing: -0.01em;
```
**Usage:** Velké číselné hodnoty, metriky

#### 9. Number / Metric M
```css
--type-number-metric-m-size: 1rem;        /* 16px */
--type-number-metric-m-line: 1.5rem;      /* 24px */
--type-number-metric-m-weight: 600;
--type-number-metric-m-spacing: -0.01em;
```
**Usage:** Střední číselné hodnoty

#### 10. Button / Primary
```css
--type-button-primary-size: 0.875rem;     /* 14px */
--type-button-primary-line: 1.25rem;      /* 20px */
--type-button-primary-weight: 600;
--type-button-primary-spacing: 0.01em;
```
**Usage:** Primární tlačítka (CTA)

#### 11. Button / Secondary
```css
--type-button-secondary-size: 0.875rem;   /* 14px */
--type-button-secondary-line: 1.25rem;    /* 20px */
--type-button-secondary-weight: 500;
--type-button-secondary-spacing: 0.01em;
```
**Usage:** Sekundární tlačítka

#### 12. Badge / Status
```css
--type-badge-status-size: 0.75rem;        /* 12px */
--type-badge-status-line: 1rem;           /* 16px */
--type-badge-status-weight: 500;
--type-badge-status-spacing: 0.02em;
```
**Usage:** Status badges, labely

#### 13. Table / Cell
```css
--type-table-cell-size: 0.875rem;         /* 14px */
--type-table-cell-line: 1.25rem;          /* 20px */
--type-table-cell-weight: 400;
--type-table-cell-spacing: 0;
```
**Usage:** Obsah tabulkových buněk

#### 14. Table / Header
```css
--type-table-header-size: 0.8125rem;      /* 13px */
--type-table-header-line: 1.125rem;       /* 18px */
--type-table-header-weight: 500;
--type-table-header-spacing: 0.02em;
```
**Usage:** Hlavičky tabulek

### Typography Utilities

```css
/* Tabular Numbers - zarovnání čísel */
.tabular-nums {
  font-feature-settings: "tnum" 1;
  font-variant-numeric: tabular-nums;
}

/* Value Typography - důležité číselné hodnoty */
.text-value {
  @apply tabular-nums font-bold;
}
```

---

## 📐 SPACING & LAYOUT

### Spacing Scale

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
```

### Layout Guidelines

| Element | Spacing | Token |
|---------|---------|-------|
| Card Padding | 20px | `var(--space-5)` |
| Card Gap | 24px | `var(--space-6)` |
| Section Gap | 32px | `var(--space-8)` |
| Button Padding | 12px 20px | `var(--space-3) var(--space-5)` |
| Input Padding | 12px 16px | `var(--space-3) var(--space-4)` |

### Grid System

```
Columns:    3 (desktop), 2 (tablet), 1 (mobile)
Gap:        24px (var(--space-6))
Max Width:  1440px
Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
```

---

## 🔲 BORDER & RADIUS

### Border Radius Scale

```css
--radius-sm: 0.375rem;  /* 6px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-full: 9999px;  /* Plný kruh */

/* Base Radius (pro shadcn/ui) */
--radius: 0.625rem;     /* 10px */
```

### Usage Examples

| Component | Radius | Token |
|-----------|--------|-------|
| Cards | 12px | `var(--radius-lg)` |
| Buttons | 8px | `var(--radius-md)` |
| Inputs | 8px | `var(--radius-md)` |
| Badges | 6px | `var(--radius-sm)` |
| Avatars | 9999px | `var(--radius-full)` |
| Modals | 16px | `var(--radius-xl)` |

---

## 🌓 SHADOWS & ELEVATION

### Shadow Scale

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
```

### Elevation System

| Level | Shadow | Usage |
|-------|--------|-------|
| **Level 0** | None | Flat surfaces, backgrounds |
| **Level 1** | `shadow-sm` | Cards, tiles (default state) |
| **Level 2** | `shadow-md` | Cards on hover, dropdowns |
| **Level 3** | `shadow-lg` | Modals, popovers, overlays |

---

## 🎬 ANIMATION SYSTEM

### Base Animations

#### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in { animation: fadeIn 150ms ease-out; }
.animate-fade-in-slow { animation: fadeIn 200ms ease-out; }
```

#### Slide Animations
```css
/* Slide In Top */
@keyframes slideInTop {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Slide Left */
@keyframes slideLeft {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Slide Right */
@keyframes slideRight {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
```

#### Scale & Pop
```css
/* Modal Scale Up */
@keyframes modalScaleUp {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Pop Animation */
@keyframes pop {
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
```

#### State Animations
```css
/* Success Pulse */
@keyframes successPulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.02); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
}

/* Checkbox Bounce */
@keyframes checkboxBounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
```

### Animation Classes

```css
.animate-fade-in           /* 150ms fade */
.animate-fade-in-slow      /* 200ms fade */
.animate-slide-in-top      /* 250ms slide from top */
.animate-slide-left        /* 250ms slide from right */
.animate-slide-right       /* 250ms slide from left */
.animate-modal-enter       /* 300ms modal entry */
.animate-pop               /* 120ms pop effect */
.animate-success-pulse     /* 180ms success pulse */
.animate-checkbox-bounce   /* 90ms checkbox bounce */
.animate-banner-scale      /* 400ms banner emphasis */
```

### Stagger Animation
```css
.stagger-fade > * {
  animation: fadeIn 150ms ease-out;
  animation-fill-mode: backwards;
}

.stagger-fade > *:nth-child(1) { animation-delay: 0ms; }
.stagger-fade > *:nth-child(2) { animation-delay: 50ms; }
.stagger-fade > *:nth-child(3) { animation-delay: 100ms; }
/* ... up to :nth-child(10) with 450ms delay */
```

### Microinteractions

```css
/* Hover Scale Effect */
.hover-scale {
  @apply transition-transform duration-200 ease-out;
}
.hover-scale:hover {
  @apply scale-[1.02];
}
```

---

## 🧩 COMPONENT LIBRARY

### Umístění
`/src/app/components/ui/`

### Core Components (shadcn/ui)

| Component | File | Usage |
|-----------|------|-------|
| **Button** | `button.tsx` | Primární/sekundární akce |
| **Card** | `card.tsx` | Content containers |
| **Badge** | `badge.tsx` | Status indicators |
| **Input** | `input.tsx` | Text inputs |
| **Label** | `label.tsx` | Form labels |
| **Select** | `select.tsx` | Dropdown selections |
| **Checkbox** | `checkbox.tsx` | Boolean inputs |
| **Switch** | `switch.tsx` | Toggle switches |
| **Dialog** | `dialog.tsx` | Modal dialogs |
| **Drawer** | `drawer.tsx` | Side panels |
| **Dropdown Menu** | `dropdown-menu.tsx` | Context menus |
| **Popover** | `popover.tsx` | Floating content |
| **Toast** | `sonner.tsx` | Notifications |
| **Table** | `table.tsx` | Data tables |
| **Tabs** | `tabs.tsx` | Tab navigation |
| **Accordion** | `accordion.tsx` | Collapsible sections |
| **Alert** | `alert.tsx` | Alert messages |
| **Avatar** | `avatar.tsx` | User avatars |
| **Calendar** | `calendar.tsx` | Date picker |
| **Chart** | `chart.tsx` | Data visualization |
| **Progress** | `progress.tsx` | Progress bars |
| **Skeleton** | `skeleton.tsx` | Loading states |
| **Tooltip** | `tooltip.tsx` | Hover info |

### Custom Tipari Components

| Component | Location | Purpose |
|-----------|----------|---------|
| **ReservationModalRedesign** | `/dev/` | Nový rezervační flow (Prompt 53) |
| **TicketsPageNew_dev** | `/dev/` | Hlavní stránka tiketů |
| **NotificationBanner_dev** | `/dev/` | Toast notifications |
| **RoleSwitchTester** | `/system/` | Role testing (Test 51-A) |
| **SlaDashboard** | `/system/` | SLA monitoring |

---

## 📚 USAGE GUIDELINES

### DO ✅

#### 1. Use Design Tokens
```tsx
// GOOD ✅
<div style={{ 
  color: 'var(--color-brand-blue)',
  fontSize: 'var(--type-body-primary-size)',
  padding: 'var(--space-4)'
}}>
  Content
</div>
```

#### 2. Use Component Library
```tsx
// GOOD ✅
import { Button } from '@/app/components/ui/button';

<Button variant="default">Rezervovat</Button>
```

#### 3. Additive Extensions
```tsx
// GOOD ✅
<div className="relative">
  <OriginalComponent />
  <Badge className="absolute -top-2 -right-2">New</Badge>
</div>
```

#### 4. Consistent Spacing
```tsx
// GOOD ✅
<div className="space-y-6">  {/* 24px gap */}
  <Section />
  <Section />
</div>
```

### DON'T ❌

#### 1. Custom Values
```tsx
// BAD ❌
<div style={{ 
  color: '#FF5733',  // Custom color!
  fontSize: '15px',  // Off-scale size!
  padding: '13px'    // Random spacing!
}}>
  Content
</div>
```

#### 2. Inline Styles Override
```tsx
// BAD ❌
<Button style={{ fontSize: '18px', padding: '25px' }}>
  Custom Button
</Button>
```

#### 3. Direct Component Modification
```tsx
// BAD ❌
<TicketCard className="p-8 text-2xl" /> {/* Breaking layout! */}
```

#### 4. Non-Semantic Colors
```tsx
// BAD ❌
<div className="bg-purple-500 text-pink-400">
  Random colors
</div>
```

---

## 💻 IMPLEMENTATION EXAMPLES

### Example 1: Ticket Card (Correct)

```tsx
import { Card, CardHeader, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

export function TicketCard({ ticket }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#040F2A]">
            {ticket.name}
          </h3>
          <Badge variant="default" className="bg-[#215EF8]">
            Dostupný
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="text-sm text-gray-600">Investiční částka:</span>
          <p className="text-xl font-semibold text-[#040F2A] tabular-nums">
            {ticket.amount.toLocaleString('cs-CZ')} Kč
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Výnos p.a.:</span>
          <p className="text-lg font-semibold text-[#14AE6B]">
            {ticket.yield}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Example 2: Modal with Animation

```tsx
import { Dialog, DialogContent } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';

export function ReservationModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[720px] animate-modal-enter">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-[#040F2A]">
            Nová rezervace
          </h2>
          
          <div className="space-y-4">
            {/* Content */}
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Zrušit
            </Button>
            <Button className="bg-[#215EF8] hover:bg-[#1a4bc6]">
              Potvrdit →
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### Example 3: Status Badge System

```tsx
const statusConfig = {
  available: {
    color: '#215EF8',
    bg: '#EEF3FF',
    label: 'Dostupný'
  },
  reserved: {
    color: '#F59E0B',
    bg: '#FEF3C7',
    label: 'Rezervováno'
  },
  completed: {
    color: '#14AE6B',
    bg: '#E8F8F1',
    label: 'Dokončeno'
  }
};

export function StatusBadge({ status }) {
  const config = statusConfig[status];
  
  return (
    <Badge
      style={{
        backgroundColor: config.bg,
        color: config.color,
      }}
      className="font-medium"
    >
      {config.label}
    </Badge>
  );
}
```

### Example 4: Form with Design Tokens

```tsx
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

export function InvestorForm() {
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-semibold">
          Jméno investora *
        </Label>
        <Input
          id="name"
          placeholder="Jan Novák"
          className="h-12"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold">
          E-mail *
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="investor@email.cz"
          className="h-12"
        />
      </div>
      
      <Button 
        type="submit"
        className="w-full bg-[#215EF8] hover:bg-[#1a4bc6]"
      >
        Odeslat
      </Button>
    </form>
  );
}
```

---

## 📖 REFERENCE DOCUMENTATION

### Primary Documentation Files

| File | Location | Purpose |
|------|----------|---------|
| **Design System Summary** | `/DESIGN_SYSTEM_SUMMARY.md` | Master index & quick reference |
| **Design Constraints** | `/DESIGN_CONSTRAINTS_TIKETY.md` | Preservation rules |
| **Design Tokens** | `/TIKETY_DESIGN_TOKENS.md` | Token reference |
| **Extension Guide** | `/TIKETY_EXTENSION_GUIDE.md` | Implementation patterns |
| **Design System Logic** | `/DESIGN_SYSTEM_LOGIC.md` | System logic |

### CSS Files

| File | Location | Content |
|------|----------|---------|
| **Theme Tokens** | `/src/styles/theme.css` | ⭐ HLAVNÍ SOUBOR - všechny tokeny |
| **Font Imports** | `/src/styles/fonts.css` | Inter font import |
| **Tailwind Config** | `/src/styles/tailwind.css` | Tailwind v4 setup |
| **Index** | `/src/styles/index.css` | Main CSS entry point |

### Component Documentation

| Documentation | Location |
|---------------|----------|
| UI Components | `/src/app/components/ui/` |
| Dev Components | `/src/app/components/dev/` |
| System Components | `/src/app/components/system/` |

---

## 🔐 DESIGN CONSTRAINTS

### Tikety Page: STRICT MODE

**LOCKED:**
- ✅ Typography (size, weight, line-height)
- ✅ Layout (grid, spacing, alignment)
- ✅ Colors (brand palette only)
- ✅ Spacing (token-based only)

**ALLOWED:**
- ✅ Overlay patterns (modals, tooltips)
- ✅ Badge additions (absolute positioning)
- ✅ Role-based logic (visibility, permissions)
- ✅ Animation (within guidelines)

### Other Pages: FLEXIBLE MODE

**REQUIRED:**
- ✅ Use design tokens
- ✅ Follow brand colors
- ✅ Maintain Inter font
- ✅ Consistent spacing scale

**ALLOWED:**
- ✅ Flexible layouts
- ✅ Custom component arrangements
- ✅ New components
- ✅ Creative extensions

---

## 🚀 QUICK START CHECKLIST

### Before Adding Features

- [ ] Review `/DESIGN_SYSTEM_SUMMARY.md`
- [ ] Check design tokens in `/src/styles/theme.css`
- [ ] Browse UI components in `/src/app/components/ui/`
- [ ] Understand constraints (Tikety = STRICT, Others = FLEXIBLE)
- [ ] Plan additive approach (overlays, not modifications)

### During Implementation

- [ ] Use CSS custom properties (`var(--token)`)
- [ ] Import from component library
- [ ] Apply brand colors (#215EF8, #14AE6B, #040F2A)
- [ ] Use spacing scale (4px increments)
- [ ] Add animations from design system
- [ ] Test responsive behavior

### Before Deployment

- [ ] Visual regression test (no layout shifts)
- [ ] Typography preserved (size, weight, spacing)
- [ ] Colors match brand palette
- [ ] Spacing follows token scale
- [ ] Animations smooth and performant
- [ ] Dark mode support (if applicable)
- [ ] Code review approved

---

## 🎯 DESIGN PRINCIPLES

### 1. Consistency First
> "Every element should feel like it belongs to the same family."

### 2. Performance Matters
> "Animations should enhance, not hinder user experience."

### 3. Accessibility Always
> "Design for all users, including those with disabilities."

### 4. Mobile-First
> "Start with mobile constraints, expand to desktop."

### 5. Token-Driven
> "Never hardcode values that have tokens."

### 6. Additive Extensions
> "Preserve original, extend with overlays."

---

## 📊 VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| **v2.3** | 2026-01-17 | Prompt 53: Reservation UX Flow Redesign |
| **v2.2** | 2026-01-16 | Test 51-A: Role Switch Testing Module |
| **v2.1** | 2026-01-08 | Design System documentation created |
| **v2.0** | 2026-01-05 | Tikety base design established |
| **v1.6** | — | Hybrid Tipari Assets introduced |

---

## 💡 SUPPORT & QUESTIONS

### Design Questions
→ Check `/DESIGN_CONSTRAINTS_TIKETY.md`

### Token Questions
→ Check `/src/styles/theme.css` or `/TIKETY_DESIGN_TOKENS.md`

### Implementation Questions
→ Check `/TIKETY_EXTENSION_GUIDE.md`

### Component Questions
→ Browse `/src/app/components/ui/` + shadcn/ui docs

### Still Unsure?
→ Ask design team before implementing

---

## ✅ FINAL NOTES

**Remember:**
1. **Preserve first** - Don't modify existing designs (especially Tikety page)
2. **Token-driven** - Always use design tokens, never hardcode
3. **Component library** - Use shadcn/ui components as foundation
4. **Additive approach** - Extend with overlays, modals, badges
5. **Test everything** - Visual regression, responsive, accessibility

**Brand Colors Memory Aid:**
- 🔵 **#215EF8** = Primary Blue (Actions, Links)
- 🟢 **#14AE6B** = Success Green (Confirmations)
- ⚫ **#040F2A** = Navy Dark (Text, Headers)
- 🟡 **#F59E0B** = Commission Gold (Premium)

---

**Created:** 17. ledna 2026  
**Status:** ✅ AKTIVNÍ  
**Compliance:** POVINNÉ  
**Review:** REQUIRED

**Tipari.cz Design System v2.3** 🎨

---

## 📂 SOURCE FILES

Zde jsou kompletní zdrojové kódy klíčových souborů design systému a komponent.

### `/src/styles/theme.css`

```css
@custom-variant dark (&:is(.dark *));

:root {
  --font-size: 16px;
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --card: #ffffff;
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: #030213;
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.95 0.0058 264.53);
  --secondary-foreground: #030213;
  --muted: #ececf0;
  --muted-foreground: #717182;
  --accent: #e9ebef;
  --accent-foreground: #030213;
  --destructive: #d4183d;
  --destructive-foreground: #ffffff;
  --border: rgba(0, 0, 0, 0.1);
  --input: transparent;
  --input-background: #f3f3f5;
  --switch-background: #cbced4;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: #030213;
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
  
  /* ========================================
     TIPARI.CZ DESIGN SYSTEM - LOGOMANUÁL
     ======================================== */
  
  /* Brand Colors - Primary Palette */
  --color-brand-blue: #215EF8;
  --color-brand-blue-dark: #1a4bc6;
  --color-brand-blue-light: #EEF3FF;
  
  --color-brand-green: #14AE6B;
  --color-brand-green-dark: #0f8d54;
  --color-brand-green-light: #E8F8F1;
  
  --color-brand-navy: #040F2A;
  --color-brand-navy-light: #1a2742;
  
  /* Commission/Reward Color - Premium Gold */
  --color-commission: #F59E0B;
  --color-commission-dark: #D97706;
  --color-commission-light: #FEF3C7;
  
  /* Semantic Colors */
  --color-success: #14AE6B;
  --color-warning: #F59E0B;
  --color-danger: #EF4444;
  --color-info: #215EF8;
  
  /* Typography Scale */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  
  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Spacing Scale */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  
  /* Border Radius */
  --radius-sm: 0.375rem;  /* 6px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* ========================================
     TYPOGRAPHY SYSTEM - INTER FONT
     ======================================== */
  
  /* Font Family */
  --font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  /* 1. Display / Page Title */
  --type-display-page-size: 2rem;           /* 32px */
  --type-display-page-line: 2.5rem;         /* 40px */
  --type-display-page-weight: 700;
  --type-display-page-spacing: -0.02em;
  
  /* 2. Heading / Section */
  --type-heading-section-size: 1.25rem;     /* 20px */
  --type-heading-section-line: 1.75rem;     /* 28px */
  --type-heading-section-weight: 600;
  --type-heading-section-spacing: -0.01em;
  
  /* 3. Heading / Subsection */
  --type-heading-subsection-size: 1rem;     /* 16px */
  --type-heading-subsection-line: 1.5rem;   /* 24px */
  --type-heading-subsection-weight: 600;
  --type-heading-subsection-spacing: -0.01em;
  
  /* 4. Body / Primary */
  --type-body-primary-size: 0.875rem;       /* 14px */
  --type-body-primary-line: 1.375rem;       /* 22px */
  --type-body-primary-weight: 400;
  --type-body-primary-spacing: 0;
  
  /* 5. Body / Secondary */
  --type-body-secondary-size: 0.8125rem;    /* 13px */
  --type-body-secondary-line: 1.25rem;      /* 20px */
  --type-body-secondary-weight: 400;
  --type-body-secondary-spacing: 0;
  
  /* 6. Label / Strong */
  --type-label-strong-size: 0.8125rem;      /* 13px */
  --type-label-strong-line: 1.125rem;       /* 18px */
  --type-label-strong-weight: 500;
  --type-label-strong-spacing: 0.01em;
  
  /* 7. Label / Muted */
  --type-label-muted-size: 0.75rem;         /* 12px */
  --type-label-muted-line: 1rem;            /* 16px */
  --type-label-muted-weight: 400;
  --type-label-muted-spacing: 0.02em;
  
  /* 8. Number / Metric L */
  --type-number-metric-l-size: 1.5rem;      /* 24px */
  --type-number-metric-l-line: 2rem;        /* 32px */
  --type-number-metric-l-weight: 600;
  --type-number-metric-l-spacing: -0.01em;
  
  /* 9. Number / Metric M */
  --type-number-metric-m-size: 1rem;        /* 16px */
  --type-number-metric-m-line: 1.5rem;      /* 24px */
  --type-number-metric-m-weight: 600;
  --type-number-metric-m-spacing: -0.01em;
  
  /* 10. Button / Primary */
  --type-button-primary-size: 0.875rem;     /* 14px */
  --type-button-primary-line: 1.25rem;      /* 20px */
  --type-button-primary-weight: 600;
  --type-button-primary-spacing: 0.01em;
  
  /* 11. Button / Secondary */
  --type-button-secondary-size: 0.875rem;   /* 14px */
  --type-button-secondary-line: 1.25rem;    /* 20px */
  --type-button-secondary-weight: 500;
  --type-button-secondary-spacing: 0.01em;
  
  /* 12. Badge / Status */
  --type-badge-status-size: 0.75rem;        /* 12px */
  --type-badge-status-line: 1rem;           /* 16px */
  --type-badge-status-weight: 500;
  --type-badge-status-spacing: 0.02em;
  
  /* 13. Table / Cell */
  --type-table-cell-size: 0.875rem;         /* 14px */
  --type-table-cell-line: 1.25rem;          /* 20px */
  --type-table-cell-weight: 400;
  --type-table-cell-spacing: 0;
  
  /* 14. Table / Header */
  --type-table-header-size: 0.8125rem;      /* 13px */
  --type-table-header-line: 1.125rem;       /* 18px */
  --type-table-header-weight: 500;
  --type-table-header-spacing: 0.02em;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-input-background: var(--input-background);
  --color-switch-background: var(--switch-background);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
    font-family: var(--font-inter);
  }

  /**
  * Default typography styles for HTML elements (h1-h4, p, label, button, input).
  * These are in @layer base, so Tailwind utility classes (like text-sm, text-lg) automatically override them.
  */

  html {
    font-size: var(--font-size);
  }

  h1 {
    font-size: var(--text-2xl);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  h2 {
    font-size: var(--text-xl);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  h3 {
    font-size: var(--text-lg);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  h4 {
    font-size: var(--text-base);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  label {
    font-size: var(--text-base);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  button {
    font-size: var(--text-base);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  input {
    font-size: var(--text-base);
    font-weight: var(--font-weight-normal);
    line-height: 1.5;
  }

  /* Enhanced Select Styling */
  select {
    font-size: var(--text-base);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  /* Custom styled select options */
  select option {
    padding: 0.5rem 0.75rem;
    background-color: white;
    color: #040F2A;
    font-weight: 500;
  }

  select option:hover,
  select option:focus,
  select option:checked {
    background: linear-gradient(135deg, #215EF8 0%, #1a4bc6 100%);
    color: white;
  }

  select option:disabled {
    background-color: #f3f4f6;
    color: #9ca3af;
  }
  
  /* ========================================
     TYPOGRAPHY UTILITIES
     ======================================== */
  
  /* Tabular Numbers - for aligned numeric values */
  .tabular-nums {
    font-feature-settings: "tnum" 1;
    font-variant-numeric: tabular-nums;
  }
  
  /* Value Typography - for important numeric data */
  .text-value {
    @apply tabular-nums font-bold;
  }
  
  /* ========================================
     MICROINTERACTION UTILITIES
     ======================================== */
  
  /* Hover Scale Effect - for interactive buttons */
  .hover-scale {
    @apply transition-transform duration-200 ease-out;
  }
  
  .hover-scale:hover {
    @apply scale-[1.02];
  }
  
  /* Fade In Animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .animate-fade-in {
    animation: fadeIn 150ms ease-out;
  }
  
  .animate-fade-in-slow {
    animation: fadeIn 200ms ease-out;
  }
  
  /* Stagger Children Animation */
  .stagger-fade > * {
    animation: fadeIn 150ms ease-out;
    animation-fill-mode: backwards;
  }
  
  .stagger-fade > *:nth-child(1) { animation-delay: 0ms; }
  .stagger-fade > *:nth-child(2) { animation-delay: 50ms; }
  .stagger-fade > *:nth-child(3) { animation-delay: 100ms; }
  .stagger-fade > *:nth-child(4) { animation-delay: 150ms; }
  .stagger-fade > *:nth-child(5) { animation-delay: 200ms; }
  .stagger-fade > *:nth-child(6) { animation-delay: 250ms; }
  .stagger-fade > *:nth-child(7) { animation-delay: 300ms; }
  .stagger-fade > *:nth-child(8) { animation-delay: 350ms; }
  .stagger-fade > *:nth-child(9) { animation-delay: 400ms; }
  .stagger-fade > *:nth-child(10) { animation-delay: 450ms; }
  
  /* ========================================
     RESERVATION STATE ANIMATIONS
     ======================================== */
  
  /* Slide In Top - for state banners */
  @keyframes slideInTop {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Crossfade - for banner color transitions */
  @keyframes crossfade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  /* Overlay Fade - for visibility overlays */
  @keyframes overlayFade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  /* State Banner Animation Classes */
  .animate-slide-in-top {
    animation: slideInTop 250ms ease-out;
  }
  
  .animate-crossfade {
    animation: crossfade 200ms ease-in-out;
  }
  
  .animate-overlay-fade {
    animation: overlayFade 300ms ease-in-out;
  }
  
  /* Banner Scale Effect - for investor_signed state */
  @keyframes bannerScale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
    100% {
      transform: scale(1);
    }
  }
  
  .animate-banner-scale {
    animation: bannerScale 400ms ease-in-out;
  }
  
  /* ========================================
     MODAL & STEP TRANSITION ANIMATIONS
     ======================================== */
  
  /* Modal Scale Up - entry animation */
  @keyframes modalScaleUp {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .animate-modal-enter {
    animation: modalScaleUp 300ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Slide Left - for step transitions forward */
  @keyframes slideLeft {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .animate-slide-left {
    animation: slideLeft 250ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Slide Right - for step transitions backward */
  @keyframes slideRight {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .animate-slide-right {
    animation: slideRight 250ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Checkbox Bounce - for checkbox check animation */
  @keyframes checkboxBounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }
  
  .animate-checkbox-bounce {
    animation: checkboxBounce 90ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  /* Success Pulse - for success states */
  @keyframes successPulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.02);
      opacity: 0.9;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  .animate-success-pulse {
    animation: successPulse 180ms ease-in-out;
  }
  
  /* Pop Animation - for success checkmark */
  @keyframes pop {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  .animate-pop {
    animation: pop 120ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}
```

### `/src/styles/fonts.css`

```css
/* ========================================
   TIPARI.CZ - FONT IMPORTS
   ======================================== */

/* Inter Font Family - Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

### `/src/styles/tailwind.css`

```css
@import 'tailwindcss' source(none);
@source '../**/*.{js,ts,jsx,tsx}';

@import 'tw-animate-css';
```

### `/src/styles/index.css`

```css
@import './fonts.css';
@import './tailwind.css';
@import './theme.css';
```

### `/src/app/components/dev/TicketsPageNew_dev.tsx`

```tsx
/**
 * 🧩 TICKETS PAGE DEV MODE
 * Tento soubor je bezpečná pracovní kopie verze v2.1.
 * Jakékoli úpravy se netýkají produkčního buildu.
 * 
 * Base Version: v2.1 (Snapshot Locked)
 * Production File: /src/app/components/TicketsPageNew.tsx
 * Status: 🔓 UNLOCKED - Development Active
 * Last Sync: 2026-01-06
 * ...
 */
 
// (Obsah souboru byl vložen výše. Pro úplnost je zde zkrácená verze, ale v reálném souboru je celý kód.)
// Z důvodu délky zde uvádím referenci na soubor v projektu.
```

**Poznámka:** Kompletní obsah souboru `TicketsPageNew_dev.tsx` je v projektu na cestě `/src/app/components/dev/TicketsPageNew_dev.tsx`.

### `/src/app/components/dev/ReservationModalRedesign.tsx`

```tsx
/**
 * RESERVATION MODAL REDESIGN
 * Prompt 53: Reservation UX Flow Redesign (Hybrid UX v2.3)
 * Multi-step reservation modal with approval workflow
 */

import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, FileText, Shield, DollarSign, Mail, User, Phone, TrendingUp, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { useReservationUXFlow, type InvestorData } from '../../hooks/useReservationUXFlow';
import { toast } from 'sonner';

interface ReservationModalRedesignProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: {
    id: string;
    name: string;
    investmentAmount: number;
    commission: number;
    yieldPA: number;
    duration: number;
  };
}

export function ReservationModalRedesign({
  isOpen,
  onClose,
  ticket
}: ReservationModalRedesignProps) {
  const { state, actions, helpers } = useReservationUXFlow({
    ticketId: ticket.id,
    onComplete: () => {
      toast.success('✅ Rezervace úspěšně vytvořena!', {
        description: 'Investor byl informován a dokumenty byly odeslány k podpisu.',
      });
      setTimeout(() => {
        actions.resetFlow();
        onClose();
      }, 1500);
    },
    onError: (error) => {
      toast.error('❌ Chyba při vytváření rezervace', {
        description: error,
      });
    },
  });

  const [formData, setFormData] = useState<Partial<InvestorData>>({
    name: '',
    email: '',
    phone: '',
    investorType: 'FO',
    preferredAmount: undefined,
    expectedYield: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleFormChange = (field: keyof InvestorData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    actions.updateInvestorData({ [field]: value });
  };

  const handleNext = () => {
    if (state.phase === 'Init') {
      actions.advancePhase();
    } else if (state.phase === 'FillData') {
      actions.submitInvestorData();
    } else if (state.phase === 'ConfirmConsents') {
      actions.submitForApproval();
    } else if (state.phase === 'Approved') {
      actions.sendForSignature();
    }
  };

  const commissionAmount = (ticket.investmentAmount * ticket.commission) / 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-[720px] w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-semibold text-[#040F2A]">
              {state.phase === 'Init' && '🎯 Nová rezervace'}
              {state.phase === 'FillData' && '👤 Informace o investorovi'}
              {state.phase === 'ConfirmConsents' && '✅ Potvrzení a souhlasy'}
              {state.phase === 'ApprovalPending' && '⏳ Čeká na schválení'}
              {state.phase === 'Approved' && '✅ Schváleno platformou'}
              {state.phase === 'Signed' && '🎉 Smlouva podepsána'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">{ticket.name}</p>
          </div>
          <button
            onClick={onClose}
            disabled={state.phase === 'ApprovalPending' || state.phase === 'Signed'}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {['FillData', 'ConfirmConsents', 'ApprovalPending', 'Approved', 'Signed'].map((phase, index) => {
              const phaseIndex = ['Init', 'FillData', 'ConfirmConsents', 'ApprovalPending', 'Approved', 'Signed'].indexOf(state.phase);
              const currentIndex = ['Init', 'FillData', 'ConfirmConsents', 'ApprovalPending', 'Approved', 'Signed'].indexOf(phase);
              const isActive = currentIndex <= phaseIndex;
              const isCurrent = phase === state.phase;

              return (
                <div key={phase} className="contents">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                        isActive
                          ? isCurrent
                            ? 'bg-[#215EF8] text-white ring-4 ring-blue-100'
                            : 'bg-[#14AE6B] text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isActive && !isCurrent ? <Check className="w-4 h-4" /> : index + 1}
                    </div>
                    <span className="text-xs text-gray-600 mt-1 text-center max-w-[60px]">
                      {phase === 'FillData' && 'Data'}
                      {phase === 'ConfirmConsents' && 'Souhlasy'}
                      {phase === 'ApprovalPending' && 'Schválení'}
                      {phase === 'Approved' && 'OK'}
                      {phase === 'Signed' && 'Podpis'}
                    </span>
                  </div>
                  {index < 4 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                        currentIndex > index ? 'bg-[#14AE6B]' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* PHASE: Init */}
          {state.phase === 'Init' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-[#040F2A] mb-2">📋 Přehled tiketu</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Investiční částka:</span>
                    <p className="font-semibold text-[#040F2A]">
                      {ticket.investmentAmount.toLocaleString('cs-CZ')} Kč
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Výnos p.a.:</span>
                    <p className="font-semibold text-[#14AE6B]">{ticket.yieldPA}%</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Doba trvání:</span>
                    <p className="font-semibold text-[#040F2A]">{ticket.duration} měsíců</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Odhad provize:</span>
                    <p className="font-semibold text-[#215EF8]">
                      {commissionAmount.toLocaleString('cs-CZ')} Kč
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-[#040F2A]">🎯 Co následuje:</h3>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-[#215EF8] mt-0.5">1.</span>
                    Vyplníte základní informace o investorovi
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-[#215EF8] mt-0.5">2.</span>
                    Systém automaticky spáruje investora podle CRM preferencí
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-[#215EF8] mt-0.5">3.</span>
                    Potvrdíte souhlasy (podmínky, NDA, provize)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-[#215EF8] mt-0.5">4.</span>
                    Rezervace bude odeslána ke schválení platformě
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-[#215EF8] mt-0.5">5.</span>
                    Po schválení obdrží investor e-mail k podpisu smlouvy
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* PHASE: FillData */}
          {state.phase === 'FillData' && (
            <div className="space-y-6">
              {/* Investor Type */}
              <div>
                <Label className="text-sm font-semibold text-[#040F2A] mb-2">
                  Typ investora *
                </Label>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => handleFormChange('investorType', 'FO')}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      formData.investorType === 'FO'
                        ? 'border-[#215EF8] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <User className="w-5 h-5 mx-auto mb-2 text-[#215EF8]" />
                    <p className="font-semibold text-sm">Fyzická osoba</p>
                  </button>
                  <button
                    onClick={() => handleFormChange('investorType', 'PO')}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      formData.investorType === 'PO'
                        ? 'border-[#215EF8] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Shield className="w-5 h-5 mx-auto mb-2 text-[#215EF8]" />
                    <p className="font-semibold text-sm">Právnická osoba</p>
                  </button>
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-semibold text-[#040F2A]">
                    Jméno investora *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    placeholder={formData.investorType === 'FO' ? 'Jan Novák' : 'ABC Investments s.r.o.'}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-[#040F2A]">
                    E-mail *
                  </Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      placeholder="investor@email.cz"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold text-[#040F2A]">
                    Telefon
                  </Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleFormChange('phone', e.target.value)}
                      placeholder="+420 XXX XXX XXX"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Optional preferences */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <h4 className="font-semibold text-sm text-[#040F2A]">📊 Preference (volitelné)</h4>
                
                <div>
                  <Label htmlFor="preferredAmount" className="text-sm text-gray-700">
                    Preferovaná výše investice
                  </Label>
                  <div className="relative mt-2">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="preferredAmount"
                      type="number"
                      value={formData.preferredAmount || ''}
                      onChange={(e) => handleFormChange('preferredAmount', parseInt(e.target.value))}
                      placeholder="5 000 000"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="expectedYield" className="text-sm text-gray-700">
                    Očekávaný výnos p.a.
                  </Label>
                  <div className="relative mt-2">
                    <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="expectedYield"
                      value={formData.expectedYield}
                      onChange={(e) => handleFormChange('expectedYield', e.target.value)}
                      placeholder="5.5%"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PHASE: ConfirmConsents */}
          {state.phase === 'ConfirmConsents' && (
            <div className="space-y-6">
              {/* CRM Match Score */}
              {state.matchScore !== undefined && (
                <div className={`rounded-lg p-4 border-2 ${
                  state.matchScore >= 80 
                    ? 'bg-green-50 border-green-500' 
                    : state.matchScore >= 60 
                    ? 'bg-yellow-50 border-yellow-500' 
                    : 'bg-orange-50 border-orange-500'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      state.matchScore >= 80 
                        ? 'bg-green-600 text-white' 
                        : state.matchScore >= 60 
                        ? 'bg-yellow-600 text-white' 
                        : 'bg-orange-600 text-white'
                    }`}>
                      {state.matchScore}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#040F2A]">
                        {state.matchScore >= 80 ? '🎯 Výborná shoda!' : state.matchScore >= 60 ? '✅ Dobrá shoda' : '⚠️ Nižší shoda'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Investor odpovídá CRM preferencím na {state.matchScore}%
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Consents */}
              <div className="space-y-4">
                <h3 className="font-semibold text-[#040F2A]">📝 Potvrzení a souhlasy</h3>

                {/* Terms */}
                <label className="flex items-start gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-[#215EF8] cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={state.consents.termsAccepted}
                    onChange={(e) => actions.updateConsent('termsAccepted', e.target.checked)}
                    className="mt-1 w-5 h-5 text-[#215EF8] rounded border-gray-300 focus:ring-[#215EF8]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-[#215EF8]" />
                      <span className="font-semibold text-sm">Obecné obchodní podmínky</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Souhlasím s obecnými obchodními podmínkami platformy Tipari.cz
                    </p>
                  </div>
                </label>

                {/* NDA */}
                <label className="flex items-start gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-[#215EF8] cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={state.consents.ndaAccepted}
                    onChange={(e) => actions.updateConsent('ndaAccepted', e.target.checked)}
                    className="mt-1 w-5 h-5 text-[#215EF8] rounded border-gray-300 focus:ring-[#215EF8]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-[#215EF8]" />
                      <span className="font-semibold text-sm">NDA a mlčenlivost</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Zavazuji se zachovat mlčenlivost o všech interních informacích
                    </p>
                  </div>
                </label>

                {/* Commission */}
                <label className="flex items-start gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-[#215EF8] cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={state.consents.commissionAccepted}
                    onChange={(e) => actions.updateConsent('commissionAccepted', e.target.checked)}
                    className="mt-1 w-5 h-5 text-[#215EF8] rounded border-gray-300 focus:ring-[#215EF8]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-[#215EF8]" />
                      <span className="font-semibold text-sm">Provize</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      Odhad provize: <span className="font-semibold text-[#215EF8]">{commissionAmount.toLocaleString('cs-CZ')} Kč</span> ({ticket.commission}% z {ticket.investmentAmount.toLocaleString('cs-CZ')} Kč)
                    </p>
                  </div>
                </label>
              </div>

              {state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span className="text-sm text-red-700">{state.error}</span>
                </div>
              )}
            </div>
          )}

          {/* PHASE: ApprovalPending */}
          {state.phase === 'ApprovalPending' && (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative">
                <Loader2 className="w-16 h-16 text-[#215EF8] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-[#040F2A]">
                  ⏳ Čeká na schválení platformou
                </h3>
                <p className="text-gray-600 max-w-md">
                  Rezervace byla odeslána ke schválení. Platforma nyní ověřuje investora a připravuje smlouvu.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-[#215EF8] rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-[#215EF8] rounded-full animate-pulse delay-100" />
                  <div className="w-2 h-2 bg-[#215EF8] rounded-full animate-pulse delay-200" />
                </div>
              </div>
            </div>
          )}

          {/* PHASE: Approved */}
          {state.phase === 'Approved' && (
            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#040F2A] mb-2">
                  ✅ Schváleno platformou!
                </h3>
                <p className="text-gray-600">
                  Investor byl úspěšně schválen. Nyní můžete odeslat smlouvu k podpisu.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-[#040F2A] mb-3">📧 Co se stane dál:</h4>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-[#215EF8]">1.</span>
                    Investor obdrží e-mail s odkazem na elektronický podpis
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-[#215EF8]">2.</span>
                    Po podpisu se rezervace automaticky aktivuje
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-[#215EF8]">3.</span>
                    Obdržíte notifikaci o dokončení procesu
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* PHASE: Signed */}
          {state.phase === 'Signed' && (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold text-[#040F2A]">
                  🎉 Smlouva podepsána!
                </h3>
                <p className="text-gray-600 max-w-md">
                  Rezervace byla úspěšně vytvořena a smlouva byla podepsána investorem.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={state.phase === 'ApprovalPending' || state.phase === 'Signed'}
          >
            {state.phase === 'Signed' ? 'Zavřít' : 'Zrušit'}
          </Button>

          <div className="flex items-center gap-3">
            {state.phase === 'Init' && (
              <Button
                onClick={handleNext}
                className="bg-[#215EF8] hover:bg-[#1a4bc6] text-white"
              >
                Začít rezervaci →
              </Button>
            )}

            {state.phase === 'FillData' && (
              <Button
                onClick={handleNext}
                disabled={!helpers.canProceed()}
                className="bg-[#215EF8] hover:bg-[#1a4bc6] text-white"
              >
                Pokračovat →
              </Button>
            )}

            {state.phase === 'ConfirmConsents' && (
              <Button
                onClick={handleNext}
                disabled={!helpers.canProceed()}
                className="bg-[#14AE6B] hover:bg-[#0f8b54] text-white"
              >
                Odeslat ke schválení →
              </Button>
            )}

            {state.phase === 'Approved' && (
              <Button
                onClick={handleNext}
                className="bg-[#215EF8] hover:bg-[#1a4bc6] text-white"
              >
                Odeslat k podpisu →
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### `/src/app/components/dev/NotificationBanner_dev.tsx`

```tsx
/**
 * NOTIFICATION BANNER
 * Prompt 53: Success/Error notifications for reservation flow
 */

import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, X } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationBannerProps {
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number; // Auto-hide after ms (0 = no auto-hide)
  onClose?: () => void;
}

export function NotificationBanner({
  type,
  title,
  message,
  duration = 5000,
  onClose
}: NotificationBannerProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onClose?.(), 300); // Wait for fade animation
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-900',
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-900',
      icon: <XCircle className="w-5 h-5 text-red-600" />,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      text: 'text-yellow-900',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-900',
      icon: <CheckCircle2 className="w-5 h-5 text-blue-600" />,
    },
  };

  const style = styles[type];

  return (
    <div
      className={`fixed top-20 right-6 z-50 max-w-md ${style.bg} border-2 ${style.border} rounded-lg shadow-xl p-4 animate-slide-in-right`}
    >
      <div className="flex items-start gap-3">
        {style.icon}
        <div className="flex-1">
          <h4 className={`font-semibold ${style.text}`}>{title}</h4>
          {message && (
            <p className={`text-sm mt-1 ${style.text} opacity-80`}>{message}</p>
          )}
        </div>
        {onClose && (
          <button
            onClick={() => {
              setVisible(false);
              setTimeout(() => onClose(), 300);
            }}
            className="p-1 hover:bg-white/50 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
```
