/**
 * ClinicsAds Privacy-Safe Analytics & Conversion Measurement
 * Adheres strictly to Google Analytics 4 (GA4) recommended events and privacy regulations.
 * NEVER transmits patient names, emails, phone numbers, or health information.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    GA_MEASUREMENT_ID?: string;
  }
}

const trackedInquiries = new Set<string>();

/**
 * Push an event to dataLayer and gtag if available
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  // Clean and sanitize params to ensure no PII is accidentally sent
  const sanitizedParams: Record<string, any> = {};
  for (const [key, value] of Object.entries(params)) {
    if (['name', 'email', 'phone', 'message', 'notes', 'website'].includes(key)) {
      continue; // Exclude PII fields
    }
    sanitizedParams[key] = value;
  }

  // Push to GTM dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...sanitizedParams,
    timestamp: new Date().toISOString(),
  });

  // Call gtag if initialized
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, sanitizedParams);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Analytics Event] ${eventName}:`, sanitizedParams);
  }
}

/**
 * GA4 Recommended Event: generate_lead
 * Triggered ONLY when the server confirms an inquiry was successfully accepted and stored.
 * Protected by transaction_id deduplication.
 */
export function trackLeadGeneration(
  inquiryId: string,
  serviceName: string,
  source: string = 'website'
) {
  if (!inquiryId || trackedInquiries.has(inquiryId)) {
    return; // Prevent duplicate conversion events
  }

  trackedInquiries.add(inquiryId);

  trackEvent('generate_lead', {
    currency: 'USD',
    value: 0,
    transaction_id: inquiryId, // GA4 deduplication ID
    service_name: serviceName,
    lead_source: source,
  });
}

/**
 * Micro-conversion: Phone number click
 */
export function trackPhoneClick(phoneDisplay: string = '') {
  trackEvent('contact_phone_click', {
    method: 'phone_call',
    link_type: 'tel',
    label: phoneDisplay || 'hotline',
  });
}

/**
 * Micro-conversion: Email click
 */
export function trackEmailClick(emailAddress: string = '') {
  trackEvent('contact_email_click', {
    method: 'email',
    link_type: 'mailto',
    label: emailAddress || 'info_email',
  });
}

/**
 * Micro-conversion: Consultation modal opened
 */
export function trackConsultationOpen(serviceName: string = 'General') {
  trackEvent('consultation_modal_open', {
    service_interest: serviceName,
  });
}
