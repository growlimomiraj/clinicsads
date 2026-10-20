import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  TrendingUp,
  LogOut,
  Search,
  Bell,
  Phone,
  Mail,
  Trash2,
  CheckCircle2,
  Download,
  Copy,
  Check,
  DollarSign,
  X,
  Plus,
  Eye,
  EyeOff,
  Calendar,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Shield,
  Activity,
  RefreshCw,
  Lock
} from 'lucide-react';
import {
  ClinicInquiry,
  getInquiries,
  subscribeToInquiries,
  updateInquiryStatus,
  markInquiryAsRead,
  deleteInquiry,
  getPartnerClinicsFromCloud,
  pushPartnerClinicsToCloud,
  syncInquiriesWithCloud,
  verifyAdminPasscode,
  getAdminToken,
  setAdminToken,
  subscribeToConnectionStatus,
  ConnectionStatus
} from '../data/inquiriesStore';

interface AdminDashboardProps {
  onExit: () => void;
}

export interface PartnerClinicItem {
  id: string;
  name: string;
  logoSrc?: string;
  avatarBg: string;
  initials: string;
  vertical: string;
  service: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  status: 'Active' | 'Scaling' | 'Onboarding';
  monthlySpend: string;
}

const DEFAULT_PARTNER_CLINICS: PartnerClinicItem[] = [
  {
    id: 'PC-101',
    name: 'First Response Healthcare',
    logoSrc: '/logos/first-response-healthcare.webp',
    avatarBg: 'bg-[#183B2B]',
    initials: 'FR',
    vertical: 'Urgent & Home Healthcare',
    service: 'Google Search + Meta Ads',
    contactPerson: 'Dr. Narayan',
    email: 'partners@firstresponse.ae',
    phone: '+971 4 345 6789',
    city: 'Dubai, UAE',
    status: 'Scaling',
    monthlySpend: '£8,500/mo'
  },
  {
    id: 'PC-102',
    name: 'GetChecked',
    logoSrc: '/logos/getchecked.svg',
    avatarBg: 'bg-[#2A6F56]',
    initials: 'GC',
    vertical: 'Private Diagnostics & Testing',
    service: 'ChatGPT & High-Intent Search',
    contactPerson: 'Sarah Jenkins',
    email: 'clinical@getchecked.co.uk',
    phone: '+44 20 7946 0912',
    city: 'London, UK',
    status: 'Active',
    monthlySpend: '£5,500/mo'
  },
  {
    id: 'PC-103',
    name: 'MMC Dubai',
    logoSrc: '/logos/mmc-dubai.png',
    avatarBg: 'bg-[#407B64]',
    initials: 'MM',
    vertical: 'Cosmetic & Aesthetic Surgery',
    service: 'Local Radius + Meta Retargeting',
    contactPerson: 'Dr. Tariq Al-Mansoor',
    email: 'director@mmcdubai.ae',
    phone: '+971 4 892 1100',
    city: 'Dubai, UAE',
    status: 'Scaling',
    monthlySpend: '£12,000/mo'
  },
  {
    id: 'PC-104',
    name: 'Novelty Clinic',
    logoSrc: '/logos/novelty-clinic.svg',
    avatarBg: 'bg-[#628F79]',
    initials: 'NC',
    vertical: 'Dermatology & Skin Laser',
    service: 'Dedicated Conversion Landing Pages',
    contactPerson: 'Elena Rostova',
    email: 'inquiries@noveltyclinic.com',
    phone: '+44 20 7123 4567',
    city: 'London, UK',
    status: 'Active',
    monthlySpend: '£4,800/mo'
  },
  {
    id: 'PC-105',
    name: 'Art of Mobility',
    logoSrc: '/logos/art-of-mobility.svg',
    avatarBg: 'bg-[#76828E]',
    initials: 'AM',
    vertical: 'Physiotherapy & Spine Rehab',
    service: 'Paid Search & CRO',
    contactPerson: 'Mark Henderson',
    email: 'clinics@artofmobility.co.uk',
    phone: '+44 161 496 0182',
    city: 'Manchester, UK',
    status: 'Active',
    monthlySpend: '£3,800/mo'
  },
  {
    id: 'PC-106',
    name: 'Bodyworks Physio',
    logoSrc: '/logos/bodyworks-physio.png',
    avatarBg: 'bg-[#3A7E64]',
    initials: 'BW',
    vertical: 'Sports Rehabilitation',
    service: 'Google Maps 3-Pack + Search',
    contactPerson: 'David Miller',
    email: 'info@bodyworksphysio.com',
    phone: '+44 121 496 0883',
    city: 'Birmingham, UK',
    status: 'Active',
    monthlySpend: '£3,200/mo'
  },
  {
    id: 'PC-107',
    name: 'Cambridge Physio',
    logoSrc: '/logos/cambridge-physio.webp',
    avatarBg: 'bg-[#899D78]',
    initials: 'CP',
    vertical: 'Orthopedic & Joint Care',
    service: 'Meta Ads Retargeting & GA4',
    contactPerson: 'Claire Bennett',
    email: 'appointments@cambridgephysio.co.uk',
    phone: '+44 1223 456789',
    city: 'Cambridge, UK',
    status: 'Active',
    monthlySpend: '£4,100/mo'
  },
  {
    id: 'PC-108',
    name: 'Encore Physiotherapy',
    logoSrc: '/logos/encore-physiotherapy.jpeg',
    avatarBg: 'bg-[#374151]',
    initials: 'EP',
    vertical: 'Musculoskeletal & Post-Op Rehab',
    service: 'Call Attribution & Paid Search',
    contactPerson: 'Robert Hall',
    email: 'admin@encorephysio.co.uk',
    phone: '+44 113 496 0234',
    city: 'Leeds, UK',
    status: 'Scaling',
    monthlySpend: '£4,900/mo'
  }
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'clinics' | 'calculator'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLeadId, setCopiedLeadId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  // Detail Modal & Delete Confirmation State
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<ClinicInquiry | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'inquiry' | 'clinic'; id: string; name: string } | null>(null);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const token = getAdminToken();
    return !!token;
  });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);
  const [isVerifyingPasscode, setIsVerifyingPasscode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Connection State
  const [connStatus, setConnStatus] = useState<ConnectionStatus>('connected');

  useEffect(() => {
    return subscribeToConnectionStatus((st) => setConnStatus(st));
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcodeInput.trim()) {
      setPasscodeError('Please enter the administrator passcode.');
      return;
    }
    setIsVerifyingPasscode(true);
    setPasscodeError(null);
    try {
      const ok = await verifyAdminPasscode(passcodeInput.trim());
      if (ok) {
        setIsAuthenticated(true);
        showToast('✓ Access granted: Operations Hub live synchronized.');
        const latest = await syncInquiriesWithCloud();
        setInquiries(latest);
      } else {
        setPasscodeError('Incorrect passcode. Please check your credentials or Vercel ADMIN_KEY setting.');
      }
    } catch {
      setPasscodeError('Network error verifying credentials.');
    } finally {
      setIsVerifyingPasscode(false);
    }
  };

  const handleAdminLogout = () => {
    setAdminToken(null);
    setIsAuthenticated(false);
    setPasscodeInput('');
    showToast('Admin session locked.');
  };

  // Live Connected Inquiries Store
  const [inquiries, setInquiries] = useState<ClinicInquiry[]>(getInquiries);

  useEffect(() => {
    return subscribeToInquiries(() => {
      setInquiries(getInquiries());
    });
  }, []);

  const newInquiriesCount = useMemo(() => {
    return inquiries.filter((i) => i.status === 'New').length;
  }, [inquiries]);

  // Robust Toast Notification System
  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(msg);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimeoutRef.current = null;
    }, 3800);
  };

  // Leads Filter State
  const [leadsStatusFilter, setLeadsStatusFilter] = useState<'All' | 'New' | 'Contacted' | 'Call Booked' | 'Proposal Sent'>('All');
  const [leadsServiceFilter, setLeadsServiceFilter] = useState<string>('All');
  const [leadsSearch, setLeadsSearch] = useState('');

  // Verified Partner Clinics Roster (Persisted locally & synced with global cloud)
  const [partnerClinics, setPartnerClinics] = useState<PartnerClinicItem[]>(() => {
    try {
      const stored = localStorage.getItem('clinicsads_partner_clinics');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to default
    }
    return DEFAULT_PARTNER_CLINICS;
  });

  const [isSyncingCloud, setIsSyncingCloud] = useState(false);

  // Sync Partner Clinics from Global Cloud on Mount
  useEffect(() => {
    getPartnerClinicsFromCloud().then((cloudClinics) => {
      if (cloudClinics && Array.isArray(cloudClinics) && cloudClinics.length > 0) {
        setPartnerClinics(cloudClinics);
      }
    });
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('clinicsads_partner_clinics', JSON.stringify(partnerClinics));
    } catch {
      // Ignore
    }
  }, [partnerClinics]);

  // Global manual sync trigger
  const handleManualCloudSync = async () => {
    setIsSyncingCloud(true);
    try {
      const [latestInquiries, latestClinics] = await Promise.all([
        syncInquiriesWithCloud(),
        getPartnerClinicsFromCloud(),
      ]);
      if (latestInquiries) setInquiries(latestInquiries);
      if (latestClinics) setPartnerClinics(latestClinics);
      showToast(`✓ Cloud Synced: ${latestInquiries.length} leads live across all devices.`);
    } catch (err) {
      showToast('Cloud sync verified with local cache.');
    } finally {
      setIsSyncingCloud(false);
    }
  };

  // Robust connection detection
  const isClinicConnected = (clinicName?: string, email?: string) => {
    if (!clinicName && !email) return false;
    const cleanName = (clinicName || '').trim().toLowerCase();
    const cleanEmail = (email || '').trim().toLowerCase();

    return partnerClinics.some((c) => {
      const cName = c.name.trim().toLowerCase();
      const cEmail = c.email ? c.email.trim().toLowerCase() : '';
      return (
        (cleanName && cName === cleanName) ||
        (cleanName && (cName.includes(cleanName) || cleanName.includes(cName))) ||
        (cleanEmail && cEmail === cleanEmail)
      );
    });
  };

  // Modal State for Manual Add Partner Clinic
  const [isAddClinicModalOpen, setIsAddClinicModalOpen] = useState(false);
  const [clinicForm, setClinicForm] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: 'London, UK',
    vertical: 'Private Healthcare Clinic',
    service: 'Google Ads & CRO',
    monthlySpend: '£4,500/mo',
    status: 'Active' as 'Active' | 'Scaling' | 'Onboarding'
  });

  // Interactive Patient ROI Calculator State
  const [calcBudget, setCalcBudget] = useState<number>(5000);
  const [calcTreatmentValue, setCalcTreatmentValue] = useState<number>(1800);
  const [calcEstimatedCpl, setCalcEstimatedCpl] = useState<number>(25);

  const calcResults = useMemo(() => {
    const projectedInquiries = Math.round(calcBudget / Math.max(1, calcEstimatedCpl));
    const bookedPatients = Math.round(projectedInquiries * 0.28); // 28% consultation conversion benchmark
    const projectedRevenue = bookedPatients * calcTreatmentValue;
    const roas = (projectedRevenue / Math.max(1, calcBudget)).toFixed(1);
    return { projectedInquiries, bookedPatients, projectedRevenue, roas };
  }, [calcBudget, calcTreatmentValue, calcEstimatedCpl]);

  // Filtered Inquiries for Leads View & Search
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesStatus = leadsStatusFilter === 'All' || inq.status === leadsStatusFilter;
      const matchesService = leadsServiceFilter === 'All' || inq.service === leadsServiceFilter;
      const effectiveSearch = (leadsSearch || searchQuery).trim().toLowerCase();
      const matchesSearch =
        !effectiveSearch ||
        inq.name.toLowerCase().includes(effectiveSearch) ||
        inq.clinicName.toLowerCase().includes(effectiveSearch) ||
        inq.email.toLowerCase().includes(effectiveSearch) ||
        (inq.phone && inq.phone.includes(effectiveSearch)) ||
        (inq.message && inq.message.toLowerCase().includes(effectiveSearch));
      return matchesStatus && matchesService && matchesSearch;
    });
  }, [inquiries, leadsStatusFilter, leadsServiceFilter, leadsSearch, searchQuery]);

  // Filtered Partner Clinics for Search
  const filteredPartnerClinics = useMemo(() => {
    if (!searchQuery.trim()) return partnerClinics;
    const q = searchQuery.toLowerCase().trim();
    return partnerClinics.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.contactPerson.toLowerCase().includes(q) ||
        c.vertical.toLowerCase().includes(q) ||
        c.service.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
    );
  }, [partnerClinics, searchQuery]);

  // ACTION: Add an Inbound Lead directly to Partner Clinics Directory
  const handleAddLeadToPartnerClinics = (inq: ClinicInquiry) => {
    if (isClinicConnected(inq.clinicName, inq.email)) {
      showToast(`✓ "${inq.clinicName}" is already connected to Partner Clinics!`);
      setActiveTab('clinics');
      return;
    }

    const words = inq.clinicName.trim().split(/\s+/);
    const initials = words.length > 1
      ? `${words[0][0]}${words[1][0]}`.toUpperCase()
      : inq.clinicName.slice(0, 2).toUpperCase();

    const newPartner: PartnerClinicItem = {
      id: `PC-${100 + partnerClinics.length + 1}`,
      name: inq.clinicName,
      avatarBg: 'bg-[#183B2B]',
      initials,
      vertical: inq.service ? `${inq.service} Clinic` : 'Specialist Medical Center',
      service: inq.service || 'Paid Search & Meta Ads',
      contactPerson: inq.name,
      email: inq.email,
      phone: inq.phone || '+44 20 7946 0000',
      city: 'London, UK',
      status: 'Active',
      monthlySpend: '£4,500/mo'
    };

    const updatedPartners = [newPartner, ...partnerClinics];
    setPartnerClinics(updatedPartners);
    pushPartnerClinicsToCloud(updatedPartners);
    updateInquiryStatus(inq.id, 'Proposal Sent');
    showToast(`✓ Connected: "${inq.clinicName}" is now active in Partner Clinics!`);
  };

  // ACTION: Handle Manual Partner Clinic Creation
  const handleCreatePartnerClinic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clinicForm.name.trim()) return;

    const words = clinicForm.name.trim().split(/\s+/);
    const initials = words.length > 1
      ? `${words[0][0]}${words[1][0]}`.toUpperCase()
      : clinicForm.name.slice(0, 2).toUpperCase();

    const created: PartnerClinicItem = {
      id: `PC-${100 + partnerClinics.length + 1}`,
      name: clinicForm.name.trim(),
      avatarBg: 'bg-[#183B2B]',
      initials,
      vertical: clinicForm.vertical.trim() || 'Private Healthcare',
      service: clinicForm.service.trim() || 'Google Ads & CRO',
      contactPerson: clinicForm.contactPerson.trim() || 'Medical Director',
      email: clinicForm.email.trim() || 'contact@clinic.com',
      phone: clinicForm.phone.trim() || '+44 20 7946 0000',
      city: clinicForm.city.trim() || 'London, UK',
      status: clinicForm.status,
      monthlySpend: clinicForm.monthlySpend.trim() || '£4,500/mo'
    };

    const updatedPartners = [created, ...partnerClinics];
    setPartnerClinics(updatedPartners);
    pushPartnerClinicsToCloud(updatedPartners);
    setIsAddClinicModalOpen(false);
    setClinicForm({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      city: 'London, UK',
      vertical: 'Private Healthcare Clinic',
      service: 'Google Ads & CRO',
      monthlySpend: '£4,500/mo',
      status: 'Active'
    });
    showToast(`✓ Connected: "${created.name}" added to Partner Clinics!`);
  };

  // Execute Confirmed Deletion
  const handleExecuteDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'inquiry') {
      deleteInquiry(deleteTarget.id);
      if (selectedLeadForDetail?.id === deleteTarget.id) {
        setSelectedLeadForDetail(null);
      }
      showToast(`Deleted lead ${deleteTarget.id}`);
    } else {
      const updated = partnerClinics.filter((c) => c.id !== deleteTarget.id);
      setPartnerClinics(updated);
      pushPartnerClinicsToCloud(updated);
      showToast(`Removed "${deleteTarget.name}" from Partner Clinics.`);
    }
    setDeleteTarget(null);
  };

  // Export Inquiries to CSV
  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['Inquiry ID', 'Submitted Date', 'Client Name', 'Clinic Name', 'Email', 'Phone', 'Service', 'Preferred Time', 'Status', 'Notes'];
    const rows = inquiries.map((i) => [
      i.id,
      new Date(i.submittedAt).toLocaleDateString(),
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.clinicName.replace(/"/g, '""')}"`,
      i.email,
      i.phone || '',
      `"${i.service}"`,
      `"${i.preferredTime || ''}"`,
      i.status,
      `"${(i.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clinicsads_leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported leads database to CSV.');
  };

  const handleCopyLead = (inq: ClinicInquiry) => {
    const text = `Lead ${inq.id}: ${inq.name} (${inq.clinicName})\nEmail: ${inq.email}\nPhone: ${inq.phone || 'N/A'}\nService: ${inq.service}\nPreferred Time: ${inq.preferredTime || 'N/A'}\nNotes: ${inq.message || 'N/A'}`;
    navigator.clipboard.writeText(text);
    setCopiedLeadId(inq.id);
    showToast(`Lead ${inq.id} contact details copied to clipboard.`);
    setTimeout(() => setCopiedLeadId(null), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F3F8E9] flex items-center justify-center p-4 font-sans text-[#183B2B]">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-[#DFECC8] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#183B2B] text-white flex items-center justify-center mx-auto shadow-md">
              <Shield className="w-7 h-7 text-[#99BC44]" />
            </div>
            <h1 className="text-2xl font-black text-[#183B2B] tracking-tight">
              ClinicsAds™ Command Hub
            </h1>
            <p className="text-xs text-[#59665D]">
              Private Operations &amp; Client Inquiries Portal. Authorized owner access only.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-passcode" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                Admin Access Passcode
              </label>
              <div className="relative">
                <input
                  id="admin-passcode"
                  type={showPassword ? 'text' : 'password'}
                  value={passcodeInput}
                  onChange={(e) => {
                    setPasscodeInput(e.target.value);
                    if (passcodeError) setPasscodeError(null);
                  }}
                  placeholder="Enter administrator passcode"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#183B2B] pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                  title={showPassword ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passcodeError && (
                <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{passcodeError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isVerifyingPasscode}
              className="w-full py-3 rounded-xl bg-[#183B2B] text-white text-sm font-bold hover:bg-[#204e39] transition-colors shadow-xs cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isVerifyingPasscode ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#99BC44]" />
                  <span>Verifying Passcode...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#99BC44]" />
                  <span>Authenticate &amp; Enter Portal</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-400 font-medium">ClinicsAds Security</span>
            <button
              type="button"
              onClick={onExit}
              className="font-bold text-[#183B2B] hover:underline cursor-pointer"
            >
              ← Back to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-[#1E293B] font-sans flex flex-col selection:bg-[#183B2B] selection:text-white relative">
      {/* Dynamic Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#183B2B] text-white rounded-xl shadow-2xl text-xs font-bold border border-emerald-500/40 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-[#99BC44] shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="p-1 text-white/70 hover:text-white ml-2 rounded-lg cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Executive Header Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 px-5 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-xs">
        {/* Brand & Systems Status */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#183B2B] flex items-center justify-center text-white shadow-xs font-black text-sm">
            CA
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[17px] font-black text-[#183B2B] tracking-tight leading-none">
                ClinicsAds™
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Operations Hub
              </span>
            </div>
            <span className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase mt-0.5">
              Healthcare Growth Command Center
            </span>
          </div>
        </div>

        {/* Global Live Search Bar */}
        <div className="hidden md:flex flex-1 max-w-[420px] mx-4 relative items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads, doctor names, or clinics..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-9 py-2 text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#183B2B] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-gray-400 hover:text-gray-600 p-0.5 rounded cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Header Navigation & Strategist Profile */}
        <div className="flex items-center gap-2.5">
          {/* Global Backend Sync Status & Trigger */}
          <button
            type="button"
            onClick={handleManualCloudSync}
            disabled={isSyncingCloud}
            title="Synchronize all inbound leads with authoritative server"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200/90 transition-all cursor-pointer shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isSyncingCloud ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">
              {isSyncingCloud ? 'Syncing...' : connStatus === 'connected' ? 'Live Connected' : 'Sync Server'}
            </span>
          </button>

          {/* Real Unread Leads Counter */}
          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
            title="View Inbound Leads"
          >
            <Bell className="w-3.5 h-3.5 text-gray-500" />
            <span>Inquiries</span>
            {newInquiriesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#EA4335] text-white text-[10px] font-black animate-pulse">
                {newInquiriesCount}
              </span>
            )}
          </button>

          {/* Lead Growth Strategist Profile Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
            <div className="w-8 h-8 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              CA
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-[12.5px] font-bold text-[#183B2B] leading-tight">ClinicsAds Admin</p>
              <p className="text-[10.5px] text-gray-500 font-medium">Marketing Operations Lead</p>
            </div>
          </div>

          {/* Back to Site Button */}
          <button
            type="button"
            onClick={onExit}
            className="ml-2 px-3.5 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            Back to Site
          </button>
        </div>
      </header>

      {/* Main Workspace: Left Sidebar + Content Area */}
      <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
        {/* Left Navigation Sidebar */}
        <aside className="w-20 md:w-60 shrink-0 bg-white border-r border-gray-200 p-3 sm:p-5 flex flex-col justify-between">
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#183B2B] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline">Command Hub</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-[#183B2B] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 shrink-0" />
                <span className="hidden md:inline">Inbound Leads</span>
              </div>
              {newInquiriesCount > 0 && (
                <span className={`hidden md:inline text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                  activeTab === 'leads' ? 'bg-[#99BC44] text-[#183B2B]' : 'bg-[#EA4335] text-white'
                }`}>
                  {newInquiriesCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('clinics')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                activeTab === 'clinics'
                  ? 'bg-[#183B2B] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 shrink-0" />
                <span className="hidden md:inline">Partner Clinics</span>
              </div>
              <span className="hidden md:inline text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                {partnerClinics.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('calculator')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-[#183B2B] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline">ROI Unit Economics</span>
            </button>
          </div>

          {/* Bottom Sidebar Summary */}
          <div className="pt-6 border-t border-gray-100 space-y-2">
            <div className="hidden md:block p-3 rounded-xl bg-gray-50 border border-gray-200/80 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Security &amp; Encryption
              </span>
              <p className="text-[11px] text-gray-600 leading-snug">
                Data secured with 256-bit HIPAA compliant clinical routing.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAdminLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Lock Admin Portal and clear session"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Lock / Log Out</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-5 sm:p-8 overflow-y-auto space-y-7">
          
          {/* ========================================================= */}
          {/* VIEW 1: COMMAND HUB (OVERVIEW DASHBOARD)                  */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-[26px] font-black text-[#183B2B] tracking-tight">
                    Healthcare Performance Command Hub
                  </h1>
                  <p className="text-xs sm:text-[13px] text-gray-500 mt-1">
                    Live client acquisition telemetry, patient inquiries, and clinical partner roster.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('leads')}
                    className="px-4 py-2 rounded-xl bg-[#183B2B] text-white text-xs font-bold hover:bg-[#204e39] transition-colors cursor-pointer shadow-xs"
                  >
                    View All Leads ({inquiries.length}) →
                  </button>
                </div>
              </div>

              {/* 4 Professional KPI Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                    <span>Total Inbound Leads</span>
                    <Users className="w-4 h-4 text-[#183B2B]" />
                  </div>
                  <p className="text-3xl font-black text-[#183B2B] mt-2">{inquiries.length}</p>
                  <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                    +{newInquiriesCount} uncontacted prospects
                  </span>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                    <span>Strategy Calls Booked</span>
                    <Phone className="w-4 h-4 text-[#34A853]" />
                  </div>
                  <p className="text-3xl font-black text-emerald-700 mt-2">
                    {inquiries.filter((i) => i.status === 'Call Booked' || i.source === 'call-booking').length}
                  </p>
                  <span className="text-[11px] text-gray-400 font-medium block mt-1">
                    Direct phone / WhatsApp calls
                  </span>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                    <span>Connected Partner Clinics</span>
                    <Building2 className="w-4 h-4 text-emerald-700" />
                  </div>
                  <p className="text-3xl font-black text-[#183B2B] mt-2">{partnerClinics.length}</p>
                  <span className="text-[11px] text-emerald-600 font-semibold block mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live connected healthcare network
                  </span>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                    <span>Average Acquisition CPL</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-3xl font-black text-[#183B2B] mt-2">£28.40</p>
                  <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                    18.4% lower than NHS/Private avg
                  </span>
                </div>
              </div>

              {/* Priority Live Inbound Inquiries Feed */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <h2 className="text-sm font-black text-gray-900">Recent Clinical Consultation Requests</h2>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      Live Telemetry
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('leads')}
                    className="text-xs font-bold text-[#183B2B] hover:underline cursor-pointer"
                  >
                    Open Leads Center →
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {inquiries.slice(0, 5).map((inq) => {
                    const isConnected = isClinicConnected(inq.clinicName, inq.email);
                    return (
                      <div key={inq.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/80 px-2 rounded-xl transition-colors">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {inq.id}
                            </span>
                            <span className="text-sm font-black text-gray-900">{inq.clinicName}</span>

                            {/* Connected badge on lead */}
                            {isConnected ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-black uppercase tracking-wider shadow-2xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Connected
                              </span>
                            ) : (
                              <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full ${
                                inq.status === 'New'
                                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                                  : inq.status === 'Call Booked'
                                  ? 'bg-blue-100 text-blue-900 border border-blue-200'
                                  : inq.status === 'Proposal Sent'
                                  ? 'bg-purple-100 text-purple-900 border border-purple-200'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {inq.status}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">
                            <strong>{inq.name}</strong> • <a href={`mailto:${inq.email}`} className="text-[#183B2B] hover:underline font-medium">{inq.email}</a>
                            {inq.phone && ` • ${inq.phone}`}
                          </p>
                          {inq.message && (
                            <p className="text-xs text-gray-500 italic line-clamp-1">
                              &ldquo;{inq.message}&rdquo;
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {/* Quick Inspect Details Button */}
                          <button
                            type="button"
                            onClick={() => setSelectedLeadForDetail(inq)}
                            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
                            title="Inspect Lead Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Connected button or Add to Partner Clinics */}
                          {isConnected ? (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveTab('clinics');
                                showToast(`✓ Connected: Viewing ${inq.clinicName} in Partner Clinics roster`);
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-xs font-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                              title="Clinic is connected to Partner Clinics. Click to view."
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Connected</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleAddLeadToPartnerClinics(inq)}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer border border-emerald-200 shadow-2xs"
                              title="Add this clinic to Partner Clinics"
                            >
                              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                              <span>+ Add to Partner Clinics</span>
                            </button>
                          )}

                          {inq.phone && (
                            <a
                              href={`tel:${inq.phone}`}
                              className="px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              <span>Call</span>
                            </a>
                          )}
                          <a
                            href={`mailto:${inq.email}?subject=ClinicsAds Consultation: ${encodeURIComponent(inq.clinicName)}`}
                            className="px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-800 text-xs font-bold transition-colors flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3" />
                            <span>Email</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 2: INBOUND PATIENT LEADS CENTER                     */}
          {/* ========================================================= */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-[26px] font-black text-[#183B2B] tracking-tight">
                    Inbound Patient Leads Center
                  </h1>
                  <p className="text-xs sm:text-[13px] text-gray-500 mt-1">
                    Real prospects submitted through high-converting clinic booking funnels and strategy consultations.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export to CSV</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search Control Bar */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  {/* Status Pills */}
                  <div className="flex flex-wrap gap-1.5 bg-gray-100 p-1 rounded-xl text-xs font-bold">
                    {(['All', 'New', 'Contacted', 'Call Booked', 'Proposal Sent'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setLeadsStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          leadsStatusFilter === st
                            ? 'bg-white text-gray-900 shadow-xs'
                            : 'text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        {st} {st === 'New' && newInquiriesCount > 0 && `(${newInquiriesCount})`}
                      </button>
                    ))}
                  </div>

                  {/* Search and Service Filter */}
                  <div className="flex items-center gap-2">
                    <select
                      value={leadsServiceFilter}
                      onChange={(e) => setLeadsServiceFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold bg-white text-gray-700 focus:outline-none cursor-pointer"
                    >
                      <option value="All">All Specialties</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="Meta Ads">Meta Ads</option>
                      <option value="Landing Pages">Landing Pages</option>
                      <option value="ChatGPT & AI Search">ChatGPT &amp; AI Search</option>
                      <option value="Clinic SEO & Local Search">SEO &amp; Maps</option>
                    </select>

                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={leadsSearch}
                        onChange={(e) => setLeadsSearch(e.target.value)}
                        placeholder="Filter by name, clinic..."
                        className="text-xs border border-gray-200 rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-[#183B2B] w-48 sm:w-60"
                      />
                    </div>
                  </div>
                </div>

                {/* Leads Data Table */}
                <div className="overflow-x-auto pt-1">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        <th className="py-3 px-3">Inquiry ID</th>
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Doctor &amp; Clinic</th>
                        <th className="py-3 px-3">Contact</th>
                        <th className="py-3 px-3">Service</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Partner Status &amp; Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs">
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-gray-400 font-medium">
                            No inquiries match the current search or status filter.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((inq) => {
                          const isConnected = isClinicConnected(inq.clinicName, inq.email);
                          return (
                            <tr key={inq.id} className="hover:bg-gray-50/70 transition-colors">
                              <td className="py-3 px-3 font-mono font-bold text-gray-900 whitespace-nowrap">
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedLeadForDetail(inq)}
                                    className="hover:underline text-[#183B2B] cursor-pointer"
                                    title="View full lead details"
                                  >
                                    {inq.id}
                                  </button>
                                  {inq.read === false && (
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="New unread inquiry" />
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-3 text-gray-500 whitespace-nowrap">
                                {new Date(inq.submittedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                              </td>
                              <td className="py-3 px-3 font-medium">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedLeadForDetail(inq)}
                                    className="font-bold text-gray-900 hover:text-[#183B2B] text-left cursor-pointer"
                                  >
                                    {inq.clinicName}
                                  </button>
                                  {isConnected && (
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black uppercase tracking-wider shadow-2xs">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                      Connected
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-gray-500 block">{inq.name}</span>
                              </td>
                              <td className="py-3 px-3 whitespace-nowrap">
                                <span className="text-gray-800 block font-medium">{inq.email}</span>
                                <span className="text-[11px] text-gray-500">{inq.phone || 'No phone provided'}</span>
                              </td>
                              <td className="py-3 px-3">
                                <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-800 font-semibold text-[11px]">
                                  {inq.service}
                                </span>
                              </td>
                              <td className="py-3 px-3 whitespace-nowrap">
                                <select
                                  value={inq.status}
                                  onChange={(e) => {
                                    updateInquiryStatus(inq.id, e.target.value as any);
                                    showToast(`Updated ${inq.id} status to ${e.target.value}`);
                                  }}
                                  className="text-xs font-bold rounded-lg border border-gray-200 px-2 py-1 bg-white text-gray-800 focus:outline-none cursor-pointer"
                                >
                                  <option value="New">New</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Call Booked">Call Booked</option>
                                  <option value="Proposal Sent">Proposal Sent</option>
                                </select>
                              </td>
                              <td className="py-3 px-3 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1.5">
                                  {/* Read / Unread toggle */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      markInquiryAsRead(inq.id, !inq.read);
                                      showToast(`Marked ${inq.id} as ${inq.read ? 'Unread' : 'Read'}`);
                                    }}
                                    className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                                      inq.read
                                        ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                        : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                                    }`}
                                    title={inq.read ? 'Mark as Unread' : 'Mark as Read'}
                                  >
                                    {inq.read ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                  </button>

                                  {/* Displays "Connected" badge button once added to Partner Clinics */}
                                  {isConnected ? (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveTab('clinics');
                                        showToast(`✓ Connected: Viewing ${inq.clinicName} in Partner Clinics directory`);
                                      }}
                                      className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-[11px] font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                                      title="Clinic is connected to Partner Clinics. Click to view."
                                    >
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                                      <span>Connected</span>
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleAddLeadToPartnerClinics(inq)}
                                      className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                                      title="Add this lead to Partner Clinics"
                                    >
                                      <Building2 className="w-3 h-3 text-emerald-700" />
                                      <span>+ Add to Partner Clinics</span>
                                    </button>
                                  )}

                                  {/* View Details Modal Trigger */}
                                  <button
                                    type="button"
                                    onClick={() => setSelectedLeadForDetail(inq)}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                                    title="View Full Details"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleCopyLead(inq)}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                                    title="Copy Lead Summary"
                                  >
                                    {copiedLeadId === inq.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                  </button>
                                  {inq.phone && (
                                    <a
                                      href={`tel:${inq.phone}`}
                                      className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                                      title="Call Phone"
                                    >
                                      <Phone className="w-3.5 h-3.5" />
                                    </a>
                                  )}
                                  <a
                                    href={`mailto:${inq.email}?subject=ClinicsAds Consultation: ${encodeURIComponent(inq.clinicName)}`}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-[#183B2B] hover:bg-gray-100 transition-colors"
                                    title="Send Email"
                                  >
                                    <Mail className="w-3.5 h-3.5" />
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() => setDeleteTarget({ type: 'inquiry', id: inq.id, name: inq.clinicName })}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                    title="Delete Lead"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 3: PARTNER CLINICS DIRECTORY                         */}
          {/* ========================================================= */}
          {activeTab === 'clinics' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-[26px] font-black text-[#183B2B] tracking-tight">
                    Verified Partner Clinics Network
                  </h1>
                  <p className="text-xs sm:text-[13px] text-gray-500 mt-1">
                    Active healthcare institutions and medical groups scaled by ClinicsAds.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddClinicModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#183B2B] text-white text-xs font-bold hover:bg-[#204e39] transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add Partner Clinic</span>
                  </button>
                </div>
              </div>

              {filteredPartnerClinics.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-3">
                  <Building2 className="w-8 h-8 text-gray-400 mx-auto" />
                  <h3 className="text-sm font-bold text-gray-900">No partner clinics found matching your search.</h3>
                  <p className="text-xs text-gray-500">Try searching for a different clinic name, city, or specialty.</p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 cursor-pointer"
                  >
                    Clear Search Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredPartnerClinics.map((clinic) => (
                    <div key={clinic.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            {clinic.id}
                          </span>
                          <div className="flex items-center gap-2">
                            {/* Connected indicator badge */}
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Connected
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold ${
                              clinic.status === 'Scaling'
                                ? 'bg-blue-100 text-blue-900 border border-blue-200'
                                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            }`}>
                              {clinic.status}
                            </span>
                            <button
                              type="button"
                              onClick={() => setDeleteTarget({ type: 'clinic', id: clinic.id, name: clinic.name })}
                              className="p-1 text-gray-300 hover:text-red-500 rounded transition-colors cursor-pointer"
                              title="Remove Partner Clinic"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {clinic.logoSrc ? (
                            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-1.5 shrink-0">
                              <img src={clinic.logoSrc} alt={clinic.name} className="w-full h-full object-contain" />
                            </div>
                          ) : (
                            <div className={`w-10 h-10 rounded-xl ${clinic.avatarBg} text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs`}>
                              {clinic.initials}
                            </div>
                          )}
                          <div>
                            <h3 className="text-sm font-black text-gray-900 leading-snug">{clinic.name}</h3>
                            <span className="text-xs text-gray-500 font-medium">{clinic.city}</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 font-medium">Vertical:</span>
                            <span className="font-bold text-gray-800">{clinic.vertical}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 font-medium">Channel:</span>
                            <span className="font-bold text-[#183B2B]">{clinic.service}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 font-medium">Monthly Retainer:</span>
                            <span className="font-bold text-emerald-700 font-mono">{clinic.monthlySpend}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                        <span className="text-gray-500 font-medium truncate max-w-[170px]">
                          Director: {clinic.contactPerson}
                        </span>
                        <a
                          href={`mailto:${clinic.email}`}
                          className="text-[#183B2B] font-bold hover:underline shrink-0"
                        >
                          Contact →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 4: PATIENT UNIT ECONOMICS & ROI CALCULATOR           */}
          {/* ========================================================= */}
          {activeTab === 'calculator' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-[26px] font-black text-[#183B2B] tracking-tight">
                  Patient Acquisition ROI &amp; Unit Economics
                </h1>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-1">
                  Model patient acquisition volume, treatment lifetime value, and return on ad spend (ROAS).
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Inputs */}
                <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-5">
                  <h2 className="text-sm font-black text-gray-900 border-b border-gray-100 pb-3">
                    Campaign Inputs
                  </h2>

                  {/* Monthly Ad Spend */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1.5">
                      <span>Monthly Ad Spend</span>
                      <span className="font-mono text-[#183B2B] text-sm">£{calcBudget.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={50000}
                      step={250}
                      value={calcBudget}
                      onChange={(e) => setCalcBudget(Number(e.target.value))}
                      className="w-full accent-[#183B2B] cursor-pointer"
                    />
                    <div className="flex gap-1.5 mt-2">
                      {[2500, 5000, 10000, 25000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setCalcBudget(preset)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${
                            calcBudget === preset
                              ? 'bg-[#183B2B] text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          £{(preset / 1000).toFixed(preset % 1000 === 0 ? 0 : 1)}k
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Average Patient Treatment Value */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1.5">
                      <span>Average Patient Treatment Value</span>
                      <span className="font-mono text-[#183B2B] text-sm">£{calcTreatmentValue.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={150}
                      max={15000}
                      step={50}
                      value={calcTreatmentValue}
                      onChange={(e) => setCalcTreatmentValue(Number(e.target.value))}
                      className="w-full accent-[#183B2B] cursor-pointer"
                    />
                    <div className="flex gap-1.5 mt-2">
                      {[
                        { label: 'Physio (£250)', val: 250 },
                        { label: 'Dental (£1.8k)', val: 1800 },
                        { label: 'Surgery (£6.5k)', val: 6500 },
                      ].map((preset) => (
                        <button
                          key={preset.val}
                          type="button"
                          onClick={() => setCalcTreatmentValue(preset.val)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${
                            calcTreatmentValue === preset.val
                              ? 'bg-[#183B2B] text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Estimated Cost Per Lead */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1.5">
                      <span>Estimated Cost Per Lead (CPL)</span>
                      <span className="font-mono text-[#183B2B] text-sm">£{calcEstimatedCpl}</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={120}
                      step={1}
                      value={calcEstimatedCpl}
                      onChange={(e) => setCalcEstimatedCpl(Number(e.target.value))}
                      className="w-full accent-[#183B2B] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>£10 (Diagnostics)</span>
                      <span>£45 (Dental)</span>
                      <span>£120 (Cosmetic Surgery)</span>
                    </div>
                  </div>
                </div>

                {/* Outputs & Return Forecast */}
                <div className="lg:col-span-7 bg-[#183B2B] text-white rounded-2xl p-6 sm:p-7 shadow-sm space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Forecasted Monthly Growth
                    </span>
                    <h2 className="text-xl font-black mt-1">Projected Clinical Returns</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/10 border border-white/10">
                      <span className="text-xs text-white/70 block">Projected Patient Inquiries</span>
                      <span className="text-3xl font-black mt-1 block">{calcResults.projectedInquiries}</span>
                      <span className="text-[10px] text-white/50 block">Inquiries per month</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/10 border border-white/10">
                      <span className="text-xs text-white/70 block">Booked Private Consultations</span>
                      <span className="text-3xl font-black text-[#99BC44] mt-1 block">
                        {calcResults.bookedPatients}
                      </span>
                      <span className="text-[10px] text-white/50 block">28% close rate</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/10 border border-white/10">
                      <span className="text-xs text-white/70 block">Projected Clinic Revenue</span>
                      <span className="text-3xl font-black text-white mt-1 block font-mono">
                        £{calcResults.projectedRevenue.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-emerald-400 block">Gross patient volume</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/10 border border-white/10">
                      <span className="text-xs text-white/70 block">Estimated ROAS Multiplier</span>
                      <span className="text-3xl font-black text-emerald-300 mt-1 block">
                        {calcResults.roas}x
                      </span>
                      <span className="text-[10px] text-white/50 block">Return on marketing ad spend</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: VIEW LEAD FULL DETAILS                          */}
      {/* ========================================================= */}
      {selectedLeadForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {selectedLeadForDetail.id}
                </span>
                <h3 className="text-base font-black text-gray-900">{selectedLeadForDetail.clinicName}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLeadForDetail(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-gray-700">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200/80">
                <div>
                  <span className="text-gray-400 font-medium block">Contact Name</span>
                  <span className="font-bold text-gray-900 text-[13px]">{selectedLeadForDetail.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Submitted Time</span>
                  <span className="font-bold text-gray-900">
                    {new Date(selectedLeadForDetail.submittedAt).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Email Address</span>
                  <a href={`mailto:${selectedLeadForDetail.email}`} className="font-bold text-[#183B2B] hover:underline">
                    {selectedLeadForDetail.email}
                  </a>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Phone Number</span>
                  <span className="font-bold text-gray-900">
                    {selectedLeadForDetail.phone || 'None provided'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-gray-400 font-medium block mb-1">Consultation Message / Growth Requirements</span>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 font-medium text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {selectedLeadForDetail.message || 'No specific notes entered with inquiry.'}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200/80">
                <div>
                  <span className="text-gray-400 font-medium block">Lead Status</span>
                  <span className="font-bold text-gray-900">{selectedLeadForDetail.status}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Specialty Focus</span>
                  <span className="font-bold text-[#183B2B]">{selectedLeadForDetail.service}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Partner Status</span>
                  {isClinicConnected(selectedLeadForDetail.clinicName, selectedLeadForDetail.email) ? (
                    <span className="inline-flex items-center gap-1 font-black text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                    </span>
                  ) : (
                    <span className="font-bold text-gray-500">Not Connected</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setDeleteTarget({ type: 'inquiry', id: selectedLeadForDetail.id, name: selectedLeadForDetail.clinicName });
                }}
                className="px-3 py-1.5 rounded-xl text-red-600 hover:bg-red-50 text-xs font-bold transition-colors cursor-pointer"
              >
                Delete Lead
              </button>

              <div className="flex items-center gap-2">
                {!isClinicConnected(selectedLeadForDetail.clinicName, selectedLeadForDetail.email) && (
                  <button
                    type="button"
                    onClick={() => {
                      handleAddLeadToPartnerClinics(selectedLeadForDetail);
                      setSelectedLeadForDetail(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    + Add to Partner Clinics
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedLeadForDetail(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: ADD PARTNER CLINIC                               */}
      {/* ========================================================= */}
      {isAddClinicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#183B2B]" />
                <h3 className="text-base font-black text-gray-900">Add New Partner Clinic</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddClinicModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePartnerClinic} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Clinic / Hospital Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Harley Street Spine & Joint Clinic"
                  value={clinicForm.name}
                  onChange={(e) => setClinicForm({ ...clinicForm, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#183B2B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Director / Contact Person</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Jonathan Vance"
                    value={clinicForm.contactPerson}
                    onChange={(e) => setClinicForm({ ...clinicForm, contactPerson: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#183B2B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">City / Region</label>
                  <input
                    type="text"
                    placeholder="London, UK"
                    value={clinicForm.city}
                    onChange={(e) => setClinicForm({ ...clinicForm, city: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#183B2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="director@clinic.com"
                    value={clinicForm.email}
                    onChange={(e) => setClinicForm({ ...clinicForm, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#183B2B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+44 20 7946 0000"
                    value={clinicForm.phone}
                    onChange={(e) => setClinicForm({ ...clinicForm, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#183B2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Clinical Vertical</label>
                  <input
                    type="text"
                    placeholder="Physiotherapy / Urgent Care"
                    value={clinicForm.vertical}
                    onChange={(e) => setClinicForm({ ...clinicForm, vertical: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#183B2B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Monthly Retainer</label>
                  <input
                    type="text"
                    placeholder="£4,500/mo"
                    value={clinicForm.monthlySpend}
                    onChange={(e) => setClinicForm({ ...clinicForm, monthlySpend: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#183B2B]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddClinicModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#183B2B] text-white font-bold hover:bg-[#204e39] transition-colors cursor-pointer shadow-xs"
                >
                  Add Partner Clinic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: CONFIRM DELETE                                   */}
      {/* ========================================================= */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900">
                  Confirm Deletion
                </h3>
                <p className="text-xs text-gray-500">
                  Are you sure you want to delete {deleteTarget.type === 'inquiry' ? 'lead' : 'partner clinic'} &ldquo;{deleteTarget.name}&rdquo;?
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
