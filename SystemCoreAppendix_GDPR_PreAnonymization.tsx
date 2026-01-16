/**
 * ================================================================
 * § 30.39 — GDPR PRE-ANONYMIZATION NOTICE (v3.8.1)
 * ================================================================
 * 
 * Notifikace uživatelů (investorů a brokerů) 7 dní před anonymizací jejich osobních údajů.
 * GDPR compliance: Čl. 13 (právo být informován) + Čl. 17 (právo být zapomenut)
 * 
 * Governance Note: GDPR pre-anonymization notice added — v3.8.1
 */

import { addDays, startOfDay } from 'date-fns';

/**
 * § 30.39.1 — Notify Pending Anonymization (Core Logic)
 * 
 * CANONICAL RULE:
 * - Běží denně v 09:00 CET (cron job)
 * - Najde všechny archived investory/brokery s data_retention_until za 7 dní
 * - Odešle e-mail + in-app notifikaci
 * - Vytvoří audit log
 */
export const GDPR_PRE_ANONYMIZATION_PSEUDOCODE = `
/**
 * Notify Pending GDPR Anonymization (v3.8.1)
 */
async function notifyPendingAnonymization() {
  console.log('🔍 Checking for users pending anonymization in 7 days...');
  
  const now = new Date();
  const targetDate = addDays(startOfDay(now), 7); // 7 days from today
  const targetDateEnd = addDays(targetDate, 1);
  
  // Fetch investors pending anonymization
  const investors = await db.investor.findMany({
    where: {
      state: 'archived',
      data_retention_until: {
        gte: targetDate,
        lt: targetDateEnd,
      },
      anonymized_at: null, // Not yet anonymized
    },
  });
  
  // Fetch brokers pending anonymization
  const brokers = await db.broker.findMany({
    where: {
      state: 'archived',
      data_retention_until: {
        gte: targetDate,
        lt: targetDateEnd,
      },
      anonymized_at: null,
    },
  });
  
  const usersToNotify = [
    ...investors.map(i => ({ ...i, type: 'investor' })),
    ...brokers.map(b => ({ ...b, type: 'broker' })),
  ];
  
  if (usersToNotify.length === 0) {
    console.log('✅ No users pending anonymization in 7 days');
    return;
  }
  
  console.log(\`📧 Sending notifications to \${usersToNotify.length} users...\`);
  
  // Process each user
  for (const user of usersToNotify) {
    try {
      // 1. Send email notification
      await sendAnonymizationWarningEmail(user);
      
      // 2. Create in-app notification
      await createAnonymizationNotification(user);
      
      // 3. Log audit event
      await logAuditEvent('gdpr_pre_anonymization_notice', {
        entity_type: user.type,
        entity_id: user.id,
        user_id: user.id,
        user_email: user.email,
        user_name: user.name,
        retention_date: user.data_retention_until.toISOString(),
        days_remaining: 7,
        notification_sent_at: new Date().toISOString(),
        severity: 'low',
      });
      
      console.log(\`✅ Notified \${user.type} \${user.id} (\${user.email})\`);
      
    } catch (error) {
      console.error(\`❌ Failed to notify \${user.type} \${user.id}:\`, error);
      
      // Log error to audit
      await logAuditEvent('gdpr_pre_anonymization_notice_failed', {
        entity_type: user.type,
        entity_id: user.id,
        user_id: user.id,
        error: error.message,
        severity: 'high',
      });
    }
  }
  
  console.log(\`✅ Anonymization notices sent to \${usersToNotify.length} users\`);
}

/**
 * § 30.39.2 — Send Anonymization Warning Email
 */
async function sendAnonymizationWarningEmail(user) {
  const retentionDate = user.data_retention_until.toLocaleDateString('cs-CZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const emailSubject = 'Upozornění: Vaše data budou anonymizována za 7 dní';
  
  const emailBody = \`
Dobrý den \${user.name},

upozorňujeme Vás, že Vaše osobní údaje v systému Tipari.cz budou v souladu 
s nařízením GDPR automaticky anonymizovány po uplynutí doby uchování dat.

📅 Datum anonymizace: \${retentionDate} (za 7 dní)
📋 Typ účtu: \${user.type === 'investor' ? 'Investor' : 'Broker'}

ℹ️ CO SE STANE:
Vaše osobní údaje (jméno, e-mail, kontaktní informace) budou nahrazeny 
pseudonymizovanými identifikátory. Finanční transakce zůstanou zachovány 
pro účely účetnictví a auditu, ale nebudou spojeny s Vaší identitou.

🔒 DŮVOD:
V souladu s GDPR (čl. 17 - Právo být zapomenut) automaticky mažeme osobní 
údaje po uplynutí doby uchování dat u neaktivních uživatelů.

❓ MÁTE OTÁZKY?
Pokud máte jakékoli dotazy ohledně zpracování Vašich osobních údajů, 
kontaktujte našeho Data Protection Officer:

📧 E-mail: dpo@tipari.cz
📞 Telefon: +420 123 456 789

Děkujeme za důvěru.

S pozdravem,
Tým Tipari.cz

---
Tato zpráva byla odeslána automaticky v souladu s GDPR čl. 13 (právo být informován).
  \`.trim();
  
  await sendEmail({
    to: user.email,
    subject: emailSubject,
    body: emailBody,
    from: 'notifications@tipari.cz',
    replyTo: 'dpo@tipari.cz',
    priority: 'normal',
    tags: ['gdpr', 'anonymization', 'pre-notice'],
  });
  
  console.log(\`📧 Email sent to \${user.email}\`);
}

/**
 * § 30.39.3 — Create In-App Notification
 */
async function createAnonymizationNotification(user) {
  const retentionDate = user.data_retention_until.toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  
  await db.notification.create({
    data: {
      user_id: user.id,
      type: 'gdpr_pre_anonymization',
      title: 'Anonymizace dat za 7 dní',
      message: \`Vaše osobní údaje budou automaticky anonymizovány dne \${retentionDate} v souladu s GDPR. Máte-li otázky, kontaktujte dpo@tipari.cz.\`,
      severity: 'info',
      read: false,
      created_at: new Date(),
      expires_at: user.data_retention_until,
      action_url: '/settings/privacy',
      action_label: 'Více informací',
      metadata: {
        retention_date: user.data_retention_until.toISOString(),
        days_remaining: 7,
        user_type: user.type,
      },
    },
  });
  
  console.log(\`🔔 In-app notification created for user \${user.id}\`);
}

/**
 * § 30.39.4 — Cron Job Scheduling
 * 
 * Runs daily at 09:00 CET (Central European Time)
 */
import cron from 'node-cron';

function schedulePendingAnonymizationNotifications() {
  // Cron expression: "0 9 * * *" = Every day at 09:00
  cron.schedule('0 9 * * *', async () => {
    console.log('⏰ Running daily GDPR pre-anonymization notice job...');
    console.log(\`🕐 Time: \${new Date().toISOString()}\`);
    
    try {
      await notifyPendingAnonymization();
      
      // Log successful cron run
      await logAuditEvent('gdpr_cron_job_completed', {
        job_name: 'pre_anonymization_notice',
        status: 'success',
        executed_at: new Date().toISOString(),
        severity: 'low',
      });
      
      console.log('✅ GDPR pre-anonymization notice job completed');
      
    } catch (error) {
      console.error('❌ GDPR pre-anonymization notice job failed:', error);
      
      // Log failed cron run
      await logAuditEvent('gdpr_cron_job_failed', {
        job_name: 'pre_anonymization_notice',
        status: 'failed',
        error: error.message,
        executed_at: new Date().toISOString(),
        severity: 'high',
      });
      
      // Alert DPO
      await sendEmail({
        to: 'dpo@tipari.cz',
        subject: '🚨 GDPR Pre-Anonymization Cron Job Failed',
        body: \`Error: \${error.message}\`,
        priority: 'high',
      });
    }
  }, {
    timezone: 'Europe/Prague', // CET timezone
  });
  
  console.log('📅 GDPR pre-anonymization notice cron job scheduled (daily at 09:00 CET)');
}

// Initialize cron on server startup
schedulePendingAnonymizationNotifications();
\`;

/**
 * § 30.39.5 — GDPR Compliance Mapping
 */
export const GDPR_COMPLIANCE_MAPPING = {
  article_13: {
    name: 'Right to be informed',
    requirement: 'Inform data subjects about data processing',
    implementation: 'Email + notification 7 days before anonymization',
    status: 'compliant',
  },
  article_17: {
    name: 'Right to erasure (Right to be forgotten)',
    requirement: 'Delete personal data when no longer necessary',
    implementation: 'Automatic anonymization after retention period',
    status: 'compliant',
  },
  article_30: {
    name: 'Records of processing activities',
    requirement: 'Maintain records of data processing',
    implementation: 'Complete audit trail (gdpr_pre_anonymization_notice)',
    status: 'compliant',
  },
  article_32: {
    name: 'Security of processing',
    requirement: 'Implement appropriate security measures',
    implementation: 'Secure email delivery + encrypted database',
    status: 'compliant',
  },
} as const;

/**
 * § 30.39.6 — Notification Timeline
 */
export const ANONYMIZATION_TIMELINE = `
┌─────────────────────────────────────────────────────────┐
│ GDPR Anonymization Timeline                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Day -7:  📧 Warning email sent                        │
│           🔔 In-app notification created               │
│           📋 Audit log: gdpr_pre_anonymization_notice  │
│                                                         │
│  Day -6:  ⏳ User has 6 days to respond                │
│  Day -5:  ⏳ User has 5 days to respond                │
│  Day -4:  ⏳ User has 4 days to respond                │
│  Day -3:  ⏳ User has 3 days to respond                │
│  Day -2:  ⏳ User has 2 days to respond                │
│  Day -1:  ⏳ User has 1 day to respond                 │
│                                                         │
│  Day 0:   🗑️ Data anonymization proceeds               │
│           📋 Audit log: gdpr_anonymization_completed   │
│           🔔 Notification expires                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
`;

/**
 * § 30.39.7 — DPO Contact Information
 */
export const DPO_CONTACT = {
  email: 'dpo@tipari.cz',
  phone: '+420 123 456 789',
  name: 'Data Protection Officer',
  availability: 'Po-Pá 09:00-17:00 CET',
  response_time: '24-48 hours',
} as const;

/**
 * § 30.39.8 — Email Template Variables
 */
export const EMAIL_TEMPLATE_VARIABLES = {
  user_name: 'User's full name',
  retention_date: 'Formatted date (e.g., "19. března 2026")',
  user_type: '"Investor" or "Broker"',
  dpo_email: 'dpo@tipari.cz',
  dpo_phone: '+420 123 456 789',
  support_url: 'https://tipari.cz/support',
  privacy_url: 'https://tipari.cz/privacy',
} as const;

/**
 * § 30.39.9 — Audit Event Schema
 */
export interface GDPRPreAnonymizationAuditEvent {
  action: 'gdpr_pre_anonymization_notice' | 'gdpr_pre_anonymization_notice_failed';
  entity_type: 'investor' | 'broker';
  entity_id: string;
  user_id: string;
  user_email: string;
  user_name: string;
  retention_date: string; // ISO timestamp
  days_remaining: number; // Always 7
  notification_sent_at: string; // ISO timestamp
  severity: 'low' | 'high';
  error?: string; // Only for failed events
}

/**
 * § 30.39.10 — Notification Schema
 */
export interface GDPRPreAnonymizationNotification {
  user_id: string;
  type: 'gdpr_pre_anonymization';
  title: 'Anonymizace dat za 7 dní';
  message: string; // Contains retention date and DPO contact
  severity: 'info';
  read: boolean; // Initially false
  created_at: Date;
  expires_at: Date; // Set to data_retention_until
  action_url: '/settings/privacy';
  action_label: 'Více informací';
  metadata: {
    retention_date: string; // ISO timestamp
    days_remaining: 7;
    user_type: 'investor' | 'broker';
  };
}

// ================================================================
// END OF GDPR PRE-ANONYMIZATION NOTICE (v3.8.1)
// ================================================================
