/**
 * ================================================================
 * § 30.46 — UX ACCESSIBILITY COMPLIANCE (v3.8.1)
 * ================================================================
 * 
 * WCAG 2.1 AA accessibility compliance helpers and audit functions.
 * 
 * Governance Note: UX Accessibility Compliance added — v3.8.1
 */

/**
 * § 30.46.1 — Accessibility Audit Helper
 * 
 * CANONICAL RULE:
 * - Runs automated accessibility checks
 * - Counts ARIA attributes, focusable elements, semantic HTML
 * - Logs results to console + audit trail
 * - Run in development mode for continuous monitoring
 */
export const ACCESSIBILITY_AUDIT_PSEUDOCODE = `
/**
 * Run Accessibility Check (v3.8.1)
 * 
 * Automated accessibility audit for WCAG 2.1 AA compliance.
 */
export function runAccessibilityCheck() {
  const results = {
    // ARIA Attributes
    ariaLabels: document.querySelectorAll('[aria-label]').length,
    ariaLabelledby: document.querySelectorAll('[aria-labelledby]').length,
    ariaDescribedby: document.querySelectorAll('[aria-describedby]').length,
    ariaHidden: document.querySelectorAll('[aria-hidden="true"]').length,
    ariaModal: document.querySelectorAll('[aria-modal="true"]').length,
    ariaLive: document.querySelectorAll('[aria-live]').length,
    
    // ARIA Roles
    dialogs: document.querySelectorAll('[role="dialog"]').length,
    buttons: document.querySelectorAll('button, [role="button"]').length,
    links: document.querySelectorAll('a, [role="link"]').length,
    articles: document.querySelectorAll('article, [role="article"]').length,
    lists: document.querySelectorAll('[role="list"]').length,
    progressbars: document.querySelectorAll('[role="progressbar"]').length,
    alerts: document.querySelectorAll('[role="alert"]').length,
    status: document.querySelectorAll('[role="status"]').length,
    
    // Focusable Elements
    focusableElements: document.querySelectorAll(
      \`button:not([disabled]), 
       [href], 
       input:not([disabled]), 
       select:not([disabled]), 
       textarea:not([disabled]), 
       [tabindex]:not([tabindex="-1"])\`
    ).length,
    
    // Semantic HTML — Headings
    h1: document.querySelectorAll('h1').length,
    h2: document.querySelectorAll('h2').length,
    h3: document.querySelectorAll('h3').length,
    h4: document.querySelectorAll('h4').length,
    h5: document.querySelectorAll('h5').length,
    h6: document.querySelectorAll('h6').length,
    
    // Semantic HTML — Landmarks
    headers: document.querySelectorAll('header').length,
    navs: document.querySelectorAll('nav').length,
    mains: document.querySelectorAll('main').length,
    sections: document.querySelectorAll('section').length,
    articles: document.querySelectorAll('article').length,
    asides: document.querySelectorAll('aside').length,
    footers: document.querySelectorAll('footer').length,
    
    // Forms
    inputs: document.querySelectorAll('input').length,
    inputsWithLabels: Array.from(document.querySelectorAll('input')).filter(
      input => input.labels?.length || input.getAttribute('aria-label') || input.getAttribute('aria-labelledby')
    ).length,
    selects: document.querySelectorAll('select').length,
    textareas: document.querySelectorAll('textarea').length,
    
    // Images
    images: document.querySelectorAll('img').length,
    imagesWithAlt: document.querySelectorAll('img[alt]').length,
    decorativeImages: document.querySelectorAll('img[alt=""], img[aria-hidden="true"]').length,
    
    // Color Contrast Warnings (requires manual review)
    potentialContrastIssues: {
      textGray400: document.querySelectorAll('.text-gray-400').length,
      textGray500: document.querySelectorAll('.text-gray-500').length,
      borderGray200: document.querySelectorAll('.border-gray-200').length,
    },
    
    // Focus Indicators
    focusVisibleElements: document.querySelectorAll('[class*="focus-visible:ring"]').length,
    
    // Tables
    tables: document.querySelectorAll('table').length,
    tablesWithHeaders: document.querySelectorAll('table th').length,
    tablesWithScope: document.querySelectorAll('table th[scope]').length,
  };
  
  console.info('♿ Accessibility Check Results', results);
  console.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.info(\`✅ ARIA Labels: \${results.ariaLabels}\`);
  console.info(\`✅ Focusable Elements: \${results.focusableElements}\`);
  console.info(\`✅ Dialogs: \${results.dialogs}\`);
  console.info(\`✅ Inputs with Labels: \${results.inputsWithLabels}/\${results.inputs}\`);
  console.info(\`✅ Images with Alt: \${results.imagesWithAlt}/\${results.images}\`);
  console.info(\`⚠️  Potential Contrast Issues: text-gray-400=\${results.potentialContrastIssues.textGray400}, text-gray-500=\${results.potentialContrastIssues.textGray500}\`);
  console.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  // Calculate compliance score
  const score = calculateAccessibilityScore(results);
  console.info(\`📊 Accessibility Score: \${score}%\`);
  
  // Log to audit
  if (typeof logAuditEvent !== 'undefined') {
    logAuditEvent('a11y_compliance_checked', {
      entity_type: 'accessibility_audit',
      ...results,
      score,
      severity: 'low',
    });
  }
  
  return results;
}

/**
 * § 30.46.2 — Calculate Accessibility Score
 */
function calculateAccessibilityScore(results: any): number {
  let score = 0;
  let maxScore = 0;
  
  // ARIA Attributes (20 points)
  maxScore += 20;
  if (results.ariaLabels > 0) score += 5;
  if (results.ariaLabelledby > 0) score += 5;
  if (results.ariaHidden > 0) score += 5;
  if (results.ariaModal > 0) score += 5;
  
  // Semantic HTML (20 points)
  maxScore += 20;
  if (results.h1 > 0) score += 5;
  if (results.mains > 0) score += 5;
  if (results.navs > 0) score += 5;
  if (results.articles > 0 || results.sections > 0) score += 5;
  
  // Forms (20 points)
  maxScore += 20;
  const labelCoverage = results.inputs > 0 ? (results.inputsWithLabels / results.inputs) * 20 : 20;
  score += labelCoverage;
  
  // Images (20 points)
  maxScore += 20;
  const altCoverage = results.images > 0 ? (results.imagesWithAlt / results.images) * 20 : 20;
  score += altCoverage;
  
  // Focus Indicators (10 points)
  maxScore += 10;
  if (results.focusVisibleElements > 0) score += 10;
  
  // Color Contrast (10 points)
  maxScore += 10;
  const contrastIssues = results.potentialContrastIssues.textGray400 + results.potentialContrastIssues.textGray500;
  if (contrastIssues === 0) score += 10;
  else if (contrastIssues < 5) score += 5;
  
  return Math.round((score / maxScore) * 100);
}

/**
 * § 30.46.3 — Run Accessibility Check on Page Load (Dev Mode)
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      console.log('🔍 Running accessibility audit...');
      runAccessibilityCheck();
    }, 1000);
  });
}
`;

/**
 * § 30.46.4 — WCAG 2.1 AA Compliance Mapping
 */
export const WCAG_2_1_AA_COMPLIANCE = {
  // Level A
  '1.1.1': {
    name: 'Non-text Content',
    level: 'A',
    description: 'All non-text content has a text alternative',
    implementation: 'alt text, aria-label, aria-hidden for decorative',
    status: 'compliant',
  },
  '1.3.1': {
    name: 'Info and Relationships',
    level: 'A',
    description: 'Information, structure, and relationships can be programmatically determined',
    implementation: 'Semantic HTML (h1-h6, nav, button, etc.), ARIA roles',
    status: 'compliant',
  },
  '2.1.1': {
    name: 'Keyboard',
    level: 'A',
    description: 'All functionality available from keyboard',
    implementation: 'Tab navigation, Enter to activate, Escape to close',
    status: 'compliant',
  },
  '2.1.2': {
    name: 'No Keyboard Trap',
    level: 'A',
    description: 'Keyboard focus can be moved away from any component',
    implementation: 'Modal focus trap with Escape key to exit',
    status: 'compliant',
  },
  '2.4.3': {
    name: 'Focus Order',
    level: 'A',
    description: 'Focus order is logical and intuitive',
    implementation: 'Logical tab order (top to bottom, left to right)',
    status: 'compliant',
  },
  '3.2.1': {
    name: 'On Focus',
    level: 'A',
    description: 'No automatic context changes on focus',
    implementation: 'No auto-submit, auto-navigation on focus',
    status: 'compliant',
  },
  '4.1.2': {
    name: 'Name, Role, Value',
    level: 'A',
    description: 'UI components have accessible names and roles',
    implementation: 'ARIA labels, roles, states (aria-checked, etc.)',
    status: 'compliant',
  },
  
  // Level AA
  '1.4.3': {
    name: 'Contrast (Minimum)',
    level: 'AA',
    description: 'Text has contrast ratio of at least 4.5:1',
    implementation: 'text-gray-600 (4.7:1), text-blue-700 (5.8:1)',
    status: 'compliant',
  },
  '2.4.7': {
    name: 'Focus Visible',
    level: 'AA',
    description: 'Keyboard focus indicator is visible',
    implementation: 'focus-visible:ring-2 focus-visible:ring-blue-600',
    status: 'compliant',
  },
  '3.3.1': {
    name: 'Error Identification',
    level: 'A',
    description: 'Errors are identified and described to the user',
    implementation: 'role="alert", aria-live="assertive" for errors',
    status: 'compliant',
  },
} as const;

/**
 * § 30.46.5 — Focus Indicator System
 */
export const FOCUS_INDICATOR_CLASSES = {
  // Standard focus ring (blue, 2px, 2px offset)
  standard: 'focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
  
  // Alternative colors for different contexts
  error: 'focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2',
  success: 'focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2',
  warning: 'focus-visible:ring-2 focus-visible:ring-yellow-600 focus-visible:ring-offset-2',
  
  // Input-specific (always visible, not just keyboard)
  input: 'focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
} as const;

/**
 * § 30.46.6 — Color Contrast Requirements
 */
export const COLOR_CONTRAST_STANDARDS = {
  // WCAG AA
  text_normal: {
    ratio: 4.5,
    description: 'Normal text (< 18pt or < 14pt bold)',
  },
  text_large: {
    ratio: 3.0,
    description: 'Large text (≥ 18pt or ≥ 14pt bold)',
  },
  ui_components: {
    ratio: 3.0,
    description: 'UI components and graphical objects',
  },
  
  // WCAG AAA
  text_normal_aaa: {
    ratio: 7.0,
    description: 'Normal text (AAA enhanced)',
  },
  text_large_aaa: {
    ratio: 4.5,
    description: 'Large text (AAA enhanced)',
  },
} as const;

/**
 * § 30.46.7 — Approved Color Palette (WCAG AA Compliant)
 */
export const ACCESSIBLE_COLORS = {
  // Text Colors (4.5:1+ on white background)
  text: {
    primary: 'text-gray-900',      // 21:1 ✅
    secondary: 'text-gray-700',    // 6.2:1 ✅
    tertiary: 'text-gray-600',     // 4.7:1 ✅
    link: 'text-blue-700',         // 5.8:1 ✅
    error: 'text-red-700',         // 5.1:1 ✅
    success: 'text-green-700',     // 4.9:1 ✅
    warning: 'text-yellow-800',    // 5.2:1 ✅
  },
  
  // Border Colors (3:1+ on white background)
  border: {
    default: 'border-gray-300',    // 3.2:1 ✅
    hover: 'border-gray-400',      // 4.1:1 ✅
    focus: 'border-blue-600',      // 6.5:1 ✅
  },
  
  // Background Colors
  background: {
    primary: 'bg-white',
    secondary: 'bg-gray-50',
    card: 'bg-white border border-gray-300',
  },
  
  // DEPRECATED (Low Contrast — DO NOT USE)
  deprecated: {
    textGray400: 'text-gray-400',  // 2.8:1 ❌
    textGray500: 'text-gray-500',  // 3.5:1 ❌
    borderGray200: 'border-gray-200', // 1.5:1 ❌
  },
} as const;

/**
 * § 30.46.8 — Keyboard Navigation Map
 */
export const KEYBOARD_NAVIGATION = {
  tab: {
    key: 'Tab',
    action: 'Move focus to next interactive element',
    usage: 'All pages',
  },
  shiftTab: {
    key: 'Shift+Tab',
    action: 'Move focus to previous interactive element',
    usage: 'All pages',
  },
  enter: {
    key: 'Enter',
    action: 'Activate button, link, or form submit',
    usage: 'Buttons, links, forms',
  },
  space: {
    key: 'Space',
    action: 'Toggle checkbox, activate button',
    usage: 'Checkboxes, buttons',
  },
  escape: {
    key: 'Escape',
    action: 'Close modal, dismiss tooltip',
    usage: 'Modals, tooltips, dropdowns',
  },
  arrowKeys: {
    key: 'Arrow Keys',
    action: 'Navigate within component (dropdown, menu)',
    usage: 'Dropdowns, menus (future)',
  },
} as const;

/**
 * § 30.46.9 — ARIA Best Practices
 */
export const ARIA_BEST_PRACTICES = {
  // Buttons
  button: {
    example: '<button aria-label="Zobrazit detail">Detail</button>',
    rule: 'Always provide aria-label if button text is not descriptive',
  },
  
  // Modals
  modal: {
    example: '<div role="dialog" aria-modal="true" aria-labelledby="modal-title">',
    rule: 'Use role="dialog", aria-modal="true", aria-labelledby',
  },
  
  // Icons
  decorativeIcon: {
    example: '<Users aria-hidden="true" focusable="false" />',
    rule: 'Decorative icons must have aria-hidden="true" and focusable="false"',
  },
  meaningfulIcon: {
    example: '<button aria-label="Zavřít"><X aria-hidden="true" /></button>',
    rule: 'Icon-only buttons need aria-label on button, aria-hidden on icon',
  },
  
  // Live Regions
  livePolite: {
    example: '<div aria-live="polite">5 new messages</div>',
    rule: 'Use for non-critical updates (status, notifications)',
  },
  liveAssertive: {
    example: '<div role="alert" aria-live="assertive">Error occurred</div>',
    rule: 'Use for critical updates (errors, warnings)',
  },
  
  // Forms
  input: {
    example: '<input aria-label="Email address" type="email" />',
    rule: 'Inputs need <label>, aria-label, or aria-labelledby',
  },
  
  // Tables
  table: {
    example: '<table><thead><tr><th scope="col">Name</th></tr></thead></table>',
    rule: 'Use scope="col" on headers, <caption> for table title',
  },
} as const;

// ================================================================
// END OF UX ACCESSIBILITY COMPLIANCE (v3.8.1)
// ================================================================
