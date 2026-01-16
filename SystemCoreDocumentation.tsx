/**
 * ================================================================
 * KANONICKÁ REALIZAČNÍ DOKUMENTACE JÁDRA PLATFORMY
 * Tipari.cz — B2B Investment Platform
 * ================================================================
 *
 * VERSION: 3.4.0 — GOVERNANCE MODULAR SPLIT
 * Date: 2026-01-14
 *
 * ⚠️ REFACTORED:
 * This file has been refactored into three modular components:
 *
 * 1. SystemCoreSchema.ts
 *    - Canonical data structures
 *    - Entity definitions
 *    - Enums and types
 *    - Domain data (§3–§5)
 *
 * 2. SystemCoreDocumentation.md
 *    - Governance framework
 *    - Documentation texts
 *    - Business rules
 *    - Process descriptions (§1, §9–§12)
 *
 * 3. SystemCoreAppendix.tsx
 *    - Mapping tables
 *    - Pseudocode examples
 *    - Calculation formulas
 *    - Implementation examples (§8, §10–§11)
 *
 * ================================================================
 *
 * SOURCE OF TRUTH pro:
 * - Backend development
 * - Frontend development
 * - UX/UI design
 * - Legal compliance
 * - QA testing
 *
 * TENTO DOKUMENT JE:
 * - AUTORITATIVNÍ
 * - VERZOVANÝ
 * - AUDITOVATELNÝ
 * - ZÁVAZNÝ PRO VŠECHNY TÝMY
 *
 * ================================================================
 * CHANGELOG v3.4.0:
 *
 * | 3.4.0 | 2026-01-14 | MINOR | Governance Modular Split — Refaktorování SystemCoreDocumentation.tsx do tří modulů podle Governance Guidelines • SystemCoreSchema.ts (typy, entity, enums §3–§5) • SystemCoreDocumentation.md (governance, textové části §1, §9–§12) • SystemCoreAppendix.tsx (mapování, pseudokódy §8, §10–§11) • Strukturální změna pro lepší údržbu a modularitu • Zachována 100% kompatibilita | §1–§12 (ALL) | Admin (Platform Owner) |
 *
 * ================================================================
 */

// ================================================================
// MODULE IMPORTS
// ================================================================

/**
 * SystemCoreSchema.ts
 * Canonical data structures, entity definitions, enums (§3–§5)
 */
export * from "./SystemCoreSchema";

/**
 * SystemCoreAppendix.tsx
 * Mappings, pseudocode, calculations (§8, §10–§11)
 */
export * from "./SystemCoreAppendix";

/**
 * SystemCoreDocumentation.md
 * Governance framework, business rules, process descriptions (§1, §9–§12)
 *
 * Note: Markdown file is referenced for documentation purposes.
 * See /Canon dictionary/SystemCoreDocumentation.md for full governance documentation.
 */

// ================================================================
// VERSION METADATA
// ================================================================

export const SYSTEM_CORE_VERSION = "3.4.0";
export const SYSTEM_CORE_REFACTOR_DATE = "2026-01-14";
export const GOVERNANCE_STATUS =
  "Active — Modular Structure Enabled";

export const VERSION_METADATA = {
  version: SYSTEM_CORE_VERSION,
  refactor_date: SYSTEM_CORE_REFACTOR_DATE,
  governance_status: GOVERNANCE_STATUS,

  modules: {
    schema: "SystemCoreSchema.ts",
    documentation: "SystemCoreDocumentation.md",
    appendix: "SystemCoreAppendix.tsx",
  },

  changelog: {
    version: "3.4.0",
    date: "2026-01-14",
    type: "MINOR",
    description: "Governance Modular Split",
    approved_by: "Admin (Platform Owner)",
  },
} as const;

// ================================================================
// RE-EXPORTS FOR BACKWARDS COMPATIBILITY
// ================================================================

/**
 * Legacy exports for backwards compatibility
 * Applications using the old SystemCoreDocumentation.tsx import
 * will continue to work without changes.
 */

// Schema exports
export {
  SYSTEM_CORE_SCHEMA_VERSION,

  // Entity interfaces
  type Project,
  type Ticket,
  type Slot,
  type Reservation,
  type Commission,
  type User,
  type Investor,
  type Company,
  type Document,
  type Notification,
  type AuditLog,
  type CommissionSplitRule,

  // Domain enums
  type InvestmentForm,
  type ProjectType,
  type SecurityType,
  type FundAllocationCategory,
  type ValuationMethod,
  type ValuationType,
  type AppraisalStatus,
  type ReservationState,
  type CancelReason,
  type AuditAction,
  type WaitingOnEntity,
  type ReservationWaitingReason,
  type ReservationTerminationReason,
  type CommissionWaitingReason,
  type CommissionTerminationReason,
  type TiparLevel,
  type UserRole,
  type InvestorType,
  type DocumentType,
  type CommissionSplitStatus,
  type CommissionEntitlementPhase,
  type CommissionPaymentPhase,
  type CommissionCollectability,

  // Interfaces
  type FundAllocation,
  type AppraisalReportFields,
  type CommissionRecipient,
  type InvestorInputData,
  type InvestorPreferences,
  type DeveloperInputData,
  type UserRegistrationData,
  type ProjectOriginAssignmentInput,
  type InvestorMatchingInput,
  type InvestorMatchingResult,

  // Constants
  VALIDATION_RULES,
  TIPAR_SLOT_CAPACITY,
  TIPAR_PROGRESSION,
} from "./SystemCoreSchema";

// Appendix exports
export {
  SYSTEM_CORE_APPENDIX_VERSION,

  // Commission logic
  COMMISSION_CREATION_PSEUDOCODE,
  COMMISSION_CALCULATION_EXAMPLE,
  COMMISSION_SPLIT_EXAMPLE,
  COMMISSION_COLLECTABILITY_STATE_MACHINE,
  COMMISSION_COLLECTABILITY_PSEUDOCODE,
  COMMISSION_SPLIT_RULE_LOOKUP_PSEUDOCODE,
  calculateCommissionAmount,
  calculateCommissionSplit,

  // SLA & Timeouts
  TIMEOUT_CONSTANTS,
  SLA_CALCULATION_EXAMPLES,
  AUTOMATIC_EXPIRATION_PSEUDOCODE,
  calculateReservationExpiresAt,
  calculateNegotiationDeadline,
  calculatePlatformPaymentDeadline,
  calculateBrokerPayoutDeadline,

  // Events & Notifications
  EVENT_TRIGGER_MAP,
  generateNotificationContent,

  // React component
  SystemCoreAppendix,
} from "./SystemCoreAppendix";

// ================================================================
// LEGACY COMPONENT (Preserved for backwards compatibility)
// ================================================================

import { useState } from "react";
import {
  FileText,
  Book,
  Code,
  Table,
  AlertCircle,
  CheckCircle2,
  GitBranch,
} from "lucide-react";

/**
 * SystemCoreDocumentation Component
 *
 * ⚠️ DEPRECATED: This component has been refactored into modular structure.
 *
 * New applications should use:
 * - SystemCoreSchema.ts for data structures
 * - SystemCoreDocumentation.md for documentation
 * - SystemCoreAppendix component for calculations
 *
 * This component is preserved for backwards compatibility only.
 */
export function SystemCoreDocumentation() {
  const [selectedModule, setSelectedModule] = useState<
    "schema" | "documentation" | "appendix" | null
  >(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <AlertCircle className="size-8 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                SystemCore Documentation — Modular Structure
              </h1>
              <p className="text-gray-600 mb-4">
                Kanonická realizační dokumentace jádra platformy
                Tipari.cz
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-900">
                    <p className="font-semibold mb-1">
                      ⚠️ REFACTORED v3.4.0 (2026-01-14)
                    </p>
                    <p className="mb-2">
                      SystemCoreDocumentation.tsx byl
                      refaktorován do tří modulů podle
                      Governance Guidelines:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>
                        <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">
                          SystemCoreSchema.ts
                        </code>{" "}
                        — Canonical data structures (§3–§5)
                      </li>
                      <li>
                        <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">
                          SystemCoreDocumentation.md
                        </code>{" "}
                        — Governance framework (§1, §9–§12)
                      </li>
                      <li>
                        <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">
                          SystemCoreAppendix.tsx
                        </code>{" "}
                        — Calculations & mappings (§8, §10–§11)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-green-600" />
              <span>Version: {SYSTEM_CORE_VERSION}</span>
            </div>
            <div className="flex items-center gap-2">
              <GitBranch className="size-4 text-blue-600" />
              <span>Governance: {GOVERNANCE_STATUS}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-purple-600" />
              <span>
                Refactor Date: {SYSTEM_CORE_REFACTOR_DATE}
              </span>
            </div>
          </div>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Schema Module */}
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Code className="size-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  SystemCoreSchema.ts
                </h3>
                <p className="text-xs text-gray-500">
                  Data Structures
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Canonical data structures, entity definitions,
              enums a doménové typy.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  §3 — Kanonické entity
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  §4 — Doménová data & enumy
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  §5 — Vstupní datové struktury
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedModule("schema")}
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              View Schema Module
            </button>
          </div>

          {/* Documentation Module */}
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Book className="size-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  SystemCoreDocumentation.md
                </h3>
                <p className="text-xs text-gray-500">
                  Governance & Rules
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Governance framework, business pravidla, procesy a
              vysvětlující texty.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  §1 — Governance Framework
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  §9 — Reservation State Machine
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  §10–§12 — SLA, Events, Audit
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                window.open(
                  "/Canon dictionary/SystemCoreDocumentation.md",
                  "_blank",
                )
              }
              className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              View Documentation
            </button>
          </div>

          {/* Appendix Module */}
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Table className="size-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  SystemCoreAppendix.tsx
                </h3>
                <p className="text-xs text-gray-500">
                  Calculations & Maps
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Mapovací tabulky, pseudokódy, calculation examples
              a implementation guides.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  §8 — Commission Logic
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  §10 — SLA Calculations
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  §11 — Event Mappings
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedModule("appendix")}
              className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              View Appendix Module
            </button>
          </div>
        </div>

        {/* Module Content */}
        {selectedModule === "appendix" && (
          <div className="mt-8">
            <SystemCoreAppendix />
          </div>
        )}

        {selectedModule === "schema" && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-4">
              SystemCoreSchema.ts
            </h2>
            <p className="text-gray-600 mb-4">
              Import this module in your TypeScript application:
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              <code>{`import {
  // Entity types
  type Project,
  type Ticket,
  type Reservation,
  type Commission,
  
  // Enums
  type ReservationState,
  type CommissionEntitlementPhase,
  type TiparLevel,
  
  // Constants
  VALIDATION_RULES,
  TIPAR_SLOT_CAPACITY,
} from './SystemCoreSchema';`}</code>
            </pre>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 bg-gray-800 text-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold mb-2">
            📚 Documentation Resources
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              • <strong>SystemCoreSchema.ts</strong> — Canonical
              data structures & entity definitions
            </li>
            <li>
              • <strong>SystemCoreDocumentation.md</strong> —
              Governance framework & business rules
            </li>
            <li>
              • <strong>SystemCoreAppendix.tsx</strong> —
              Calculations, mappings & pseudocode
            </li>
          </ul>

          <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-400">
            <p>
              Version: {SYSTEM_CORE_VERSION} | Governance:{" "}
              {GOVERNANCE_STATUS}
            </p>
            <p>
              Refactor Date: {SYSTEM_CORE_REFACTOR_DATE} |
              Approved by: Admin (Platform Owner)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================================================================
// DEFAULT EXPORT
// ================================================================

export default {
  VERSION: SYSTEM_CORE_VERSION,
  REFACTOR_DATE: SYSTEM_CORE_REFACTOR_DATE,
  GOVERNANCE_STATUS,
  VERSION_METADATA,
  SystemCoreDocumentation,
} as const;