/**
 * Client Inquiries & Leads Store for ClinicsAds Admin Panel
 * Handles persistence, status updates, and live cross-component synchronization.
 */

export interface ClinicInquiry {
  id: string;
  name: string;
  email: string;
  clinicName: string;
  website?: string;
  service: string;
  message?: string;
  submittedAt: string;
  status: 'New' | 'Contacted' | 'Call Booked' | 'Proposal Sent';
  source: 'modal' | 'contact-page';
}

const STORAGE_KEY = 'clinicsads_inquiries_v1';

// Seed initial inquiries representing real prospective clinic clients
const INITIAL_INQUIRIES: ClinicInquiry[] = [
  {
    id: 'INQ-1042',
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@oakwooddental.com',
    clinicName: 'Oakwood Dental & Aesthetics',
    website: 'https://oakwooddental.com',
    service: 'Google Ads',
    message: 'We are opening a second location in November and need high-intent dental implant patient inquiries.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    status: 'New',
    source: 'modal',
  },
  {
    id: 'INQ-1041',
    name: 'Dr. Emily Vance',
    email: 'dr.vance@westsidephysio.co.uk',
    clinicName: 'Westside Physiotherapy & Rehab',
    website: 'https://westsidephysio.co.uk',
    service: 'Landing Pages',
    message: 'Current bounce rate on Google Ads traffic is 68%. Looking for sub-2-second conversion landing pages.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    status: 'Contacted',
    source: 'contact-page',
  },
  {
    id: 'INQ-1040',
    name: 'Markus Al-Hassan',
    email: 'markus@apexmedicaldxb.ae',
    clinicName: 'Apex Medical Centre Dubai',
    website: 'https://apexmedicaldxb.ae',
    service: 'Meta Ads',
    message: 'Need local radius patient awareness campaigns on Instagram for our cosmetic dermatology department.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(), // Yesterday
    status: 'Call Booked',
    source: 'modal',
  },
  {
    id: 'INQ-1039',
    name: 'Dr. Michael Chen',
    email: 'mchen@horizonortho.ca',
    clinicName: 'Horizon Orthodontics',
    website: 'https://horizonortho.ca',
    service: 'ChatGPT & AI Search',
    message: 'Interested in optimizing clinical citations so local patients finding providers on ChatGPT get directed to us.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    status: 'Proposal Sent',
    source: 'modal',
  },
];

let memoryInquiries: ClinicInquiry[] | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('clinicsads_inquiry_update'));
  }
}

export function getInquiries(): ClinicInquiry[] {
  if (typeof window === 'undefined') {
    return INITIAL_INQUIRIES;
  }
  if (memoryInquiries) {
    return memoryInquiries;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_INQUIRIES));
      memoryInquiries = INITIAL_INQUIRIES;
      return memoryInquiries;
    }
    memoryInquiries = JSON.parse(raw);
    return memoryInquiries || [];
  } catch (err) {
    console.warn('Failed to load inquiries from localStorage:', err);
    return INITIAL_INQUIRIES;
  }
}

export function saveInquiries(items: ClinicInquiry[]): void {
  memoryInquiries = items;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.warn('Failed to save inquiries to localStorage:', err);
    }
  }
  notify();
}

export function addInquiry(
  data: Omit<ClinicInquiry, 'id' | 'submittedAt' | 'status'>
): ClinicInquiry {
  const current = getInquiries();
  const newInquiry: ClinicInquiry = {
    ...data,
    id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
    submittedAt: new Date().toISOString(),
    status: 'New',
  };
  const updated = [newInquiry, ...current];
  saveInquiries(updated);
  return newInquiry;
}

export function updateInquiryStatus(
  id: string,
  status: ClinicInquiry['status']
): void {
  const current = getInquiries();
  const updated = current.map((item) =>
    item.id === id ? { ...item, status } : item
  );
  saveInquiries(updated);
}

export function deleteInquiry(id: string): void {
  const current = getInquiries();
  const updated = current.filter((item) => item.id !== id);
  saveInquiries(updated);
}

export function subscribeToInquiries(callback: () => void): () => void {
  listeners.add(callback);
  if (typeof window !== 'undefined') {
    const handler = () => callback();
    window.addEventListener('clinicsads_inquiry_update', handler);
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) {
        memoryInquiries = null;
        callback();
      }
    });
    return () => {
      listeners.delete(callback);
      window.removeEventListener('clinicsads_inquiry_update', handler);
    };
  }
  return () => {
    listeners.delete(callback);
  };
}
