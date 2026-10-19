import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  Target,
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
  Clock,
  ArrowUpRight,
  Download,
  Copy,
  Check,
  Calendar,
  DollarSign,
  Activity,
  Filter,
  Briefcase,
  Shield,
  X,
  Plus,
  ChevronRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import {
  ClinicInquiry,
  getInquiries,
  subscribeToInquiries,
  updateInquiryStatus,
  deleteInquiry,
  addInquiry
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

export interface CampaignItem {
  id: string;
  name: string;
  clinic: string;
  network: 'Google Search' | 'Meta Ads' | 'Google PMax' | 'ChatGPT / AI Search' | 'Local Maps 3-Pack';
  monthlyBudget: number;
  inquiriesDelivered: number;
  cpl: number; // Cost Per Patient Inquiry
  roas: string;
  status: 'Active' | 'Scaling' | 'Paused';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'clinics' | 'campaigns' | 'calculator'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLeadId, setCopiedLeadId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  // Leads Filter State
  const [leadsStatusFilter, setLeadsStatusFilter] = useState<'All' | 'New' | 'Contacted' | 'Call Booked' | 'Proposal Sent'>('All');
  const [leadsServiceFilter, setLeadsServiceFilter] = useState<string>('All');
  const [leadsSearch, setLeadsSearch] = useState('');

  // Verified Partner Clinics Roster
  const [partnerClinics, setPartnerClinics] = useState<PartnerClinicItem[]>([
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
  ]);

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
    status: 'Onboarding' as 'Active' | 'Scaling' | 'Onboarding'
  });

  // Active Performance Campaigns
  const [campaigns, setCampaigns] = useState<CampaignItem[]>([
    {
      id: 'CMP-801',
      name: 'Emergency Medical & Doctor On-Call',
      clinic: 'First Response Healthcare',
      network: 'Google Search',
      monthlyBudget: 8500,
      inquiriesDelivered: 312,
      cpl: 27.24,
      roas: '5.8x',
      status: 'Scaling'
    },
    {
      id: 'CMP-802',
      name: 'Private Walk-In Blood & Diagnostic Tests',
      clinic: 'GetChecked',
      network: 'Google Search',
      monthlyBudget: 5500,
      inquiriesDelivered: 428,
      cpl: 12.85,
      roas: '6.4x',
      status: 'Active'
    },
    {
      id: 'CMP-803',
      name: 'VIP Cosmetic & Dental Consultation Funnel',
      clinic: 'MMC Dubai',
      network: 'Meta Ads',
      monthlyBudget: 12000,
      inquiriesDelivered: 194,
      cpl: 61.85,
      roas: '7.2x',
      status: 'Scaling'
    },
    {
      id: 'CMP-804',
      name: 'Skin Laser & Aesthetic Teardown Landing Pages',
      clinic: 'Novelty Clinic',
      network: 'Google PMax',
      monthlyBudget: 4800,
      inquiriesDelivered: 176,
      cpl: 27.27,
      roas: '4.9x',
      status: 'Active'
    },
    {
      id: 'CMP-805',
      name: 'Spine & Sports Physio Initial Evaluation',
      clinic: 'Art of Mobility',
      network: 'Google Search',
      monthlyBudget: 3800,
      inquiriesDelivered: 182,
      cpl: 20.87,
      roas: '4.6x',
      status: 'Active'
    }
  ]);

  // Modal State for New Campaign
  const [isAddCampaignModalOpen, setIsAddCampaignModalOpen] = useState(false);
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    clinic: partnerClinics[0]?.name || 'First Response Healthcare',
    network: 'Google Search' as CampaignItem['network'],
    monthlyBudget: 5000,
    status: 'Active' as CampaignItem['status']
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

  // Filtered Inquiries for Leads View
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesStatus = leadsStatusFilter === 'All' || inq.status === leadsStatusFilter;
      const matchesService = leadsServiceFilter === 'All' || inq.service === leadsServiceFilter;
      const q = (leadsSearch || searchQuery).toLowerCase();
      const matchesSearch =
        inq.name.toLowerCase().includes(q) ||
        inq.clinicName.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        (inq.phone && inq.phone.includes(q)) ||
        (inq.message && inq.message.toLowerCase().includes(q));
      return matchesStatus && matchesService && matchesSearch;
    });
  }, [inquiries, leadsStatusFilter, leadsServiceFilter, leadsSearch, searchQuery]);

  // ACTION: Add an Inbound Lead directly to Partner Clinics Directory
  const handleAddLeadToPartnerClinics = (inq: ClinicInquiry) => {
    const alreadyExists = partnerClinics.some(
      (c) => c.name.toLowerCase() === inq.clinicName.toLowerCase() || c.email.toLowerCase() === inq.email.toLowerCase()
    );

    if (alreadyExists) {
      showToast(`"${inq.clinicName}" is already listed in Partner Clinics!`);
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
      status: 'Onboarding',
      monthlySpend: '£4,500/mo'
    };

    setPartnerClinics((prev) => [newPartner, ...prev]);
    updateInquiryStatus(inq.id, 'Proposal Sent');
    showToast(`Added "${inq.clinicName}" to Partner Clinics! Status updated.`);
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

    setPartnerClinics((prev) => [created, ...prev]);
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
      status: 'Onboarding'
    });
    showToast(`Partner clinic "${created.name}" created successfully!`);
  };

  // ACTION: Delete Partner Clinic
  const handleDeletePartnerClinic = (id: string, name: string) => {
    setPartnerClinics((prev) => prev.filter((c) => c.id !== id));
    showToast(`Removed "${name}" from Partner Clinics.`);
  };

  // ACTION: Handle New Campaign Creation
  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignForm.name.trim()) return;

    const newCamp: CampaignItem = {
      id: `CMP-${800 + campaigns.length + 1}`,
      name: campaignForm.name.trim(),
      clinic: campaignForm.clinic,
      network: campaignForm.network,
      monthlyBudget: Number(campaignForm.monthlyBudget) || 5000,
      inquiriesDelivered: 0,
      cpl: 24.5,
      roas: '5.2x',
      status: campaignForm.status
    };

    setCampaigns((prev) => [newCamp, ...prev]);
    setIsAddCampaignModalOpen(false);
    setCampaignForm({
      name: '',
      clinic: partnerClinics[0]?.name || 'First Response Healthcare',
      network: 'Google Search',
      monthlyBudget: 5000,
      status: 'Active'
    });
    showToast(`Campaign "${newCamp.name}" launched successfully!`);
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

  const handleToggleCampaignStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const next = c.status === 'Active' ? 'Paused' : c.status === 'Paused' ? 'Scaling' : 'Active';
          return { ...c, status: next };
        }
        return c;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-[#1E293B] font-sans flex flex-col selection:bg-[#183B2B] selection:text-white relative">
      {/* Dynamic Toast Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#183B2B] text-white rounded-xl shadow-xl text-xs font-bold border border-emerald-500/40 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-[#99BC44] shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="p-1 text-white/70 hover:text-white ml-2 rounded-lg"
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

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-[420px] mx-4 relative items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads, doctor names, clinics, or campaigns..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#183B2B] focus:bg-white transition-all"
          />
        </div>

        {/* Right Header Navigation & Strategist Profile */}
        <div className="flex items-center gap-3">
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
              MU
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-[12.5px] font-bold text-[#183B2B] leading-tight">Muhammad Usman</p>
              <p className="text-[10.5px] text-gray-500 font-medium">Senior Clinical PPC Lead</p>
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
              <span className="hidden md:inline text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-600">
                {partnerClinics.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('campaigns')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                activeTab === 'campaigns'
                  ? 'bg-[#183B2B] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Target className="w-4 h-4 shrink-0" />
                <span className="hidden md:inline">Live Campaigns</span>
              </div>
              <span className="hidden md:inline text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-600">
                {campaigns.length}
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
              onClick={onExit}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Exit Portal</span>
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
                    Live client acquisition telemetry, patient inquiries, and paid ad spend tracking.
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
                    <span>Active Partner Clinics</span>
                    <Building2 className="w-4 h-4 text-[#183B2B]" />
                  </div>
                  <p className="text-3xl font-black text-[#183B2B] mt-2">{partnerClinics.length}</p>
                  <span className="text-[11px] text-gray-500 font-medium block mt-1">
                    Verified medical institutions
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
                  {inquiries.slice(0, 4).map((inq) => (
                    <div key={inq.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/80 px-2 rounded-xl transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            {inq.id}
                          </span>
                          <span className="text-sm font-black text-gray-900">{inq.clinicName}</span>
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
                        {/* Option to Add Lead to Partner Clinics */}
                        <button
                          type="button"
                          onClick={() => handleAddLeadToPartnerClinics(inq)}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer border border-emerald-200"
                          title="Add this clinic to Partner Clinics"
                        >
                          <Building2 className="w-3.5 h-3.5" />
                          <span>+ Add to Partner Clinics</span>
                        </button>

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
                  ))}
                </div>
              </div>

              {/* Core Active Campaigns Snapshot */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h2 className="text-sm font-black text-gray-900">Active Paid Search &amp; Social Campaigns</h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('campaigns')}
                    className="text-xs font-bold text-[#183B2B] hover:underline cursor-pointer"
                  >
                    View All Campaigns →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {campaigns.slice(0, 3).map((camp) => (
                    <div key={camp.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{camp.network}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900">
                          {camp.status}
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-gray-900 line-clamp-1">{camp.name}</h3>
                      <p className="text-[11px] text-gray-500 font-medium">{camp.clinic}</p>
                      <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] text-gray-400 block">Deliveries</span>
                          <span className="font-bold text-gray-900">{camp.inquiriesDelivered} Patients</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-gray-400 block">ROAS</span>
                          <span className="font-bold text-emerald-600">{camp.roas}</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
                      className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold bg-white text-gray-700 focus:outline-none"
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
                        <th className="py-3 px-3 text-right">Partner Roster &amp; Actions</th>
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
                        filteredInquiries.map((inq) => (
                          <tr key={inq.id} className="hover:bg-gray-50/70 transition-colors">
                            <td className="py-3 px-3 font-mono font-bold text-gray-900 whitespace-nowrap">
                              {inq.id}
                            </td>
                            <td className="py-3 px-3 text-gray-500 whitespace-nowrap">
                              {new Date(inq.submittedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </td>
                            <td className="py-3 px-3 font-medium">
                              <span className="font-bold text-gray-900 block">{inq.clinicName}</span>
                              <span className="text-[11px] text-gray-500">{inq.name}</span>
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
                                {/* Option to Add Lead to Partner Clinics */}
                                <button
                                  type="button"
                                  onClick={() => handleAddLeadToPartnerClinics(inq)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                                  title="Add this lead to Partner Clinics"
                                >
                                  <Building2 className="w-3 h-3 text-emerald-700" />
                                  <span>+ Add to Partner Clinics</span>
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
                                  onClick={() => {
                                    deleteInquiry(inq.id);
                                    showToast(`Deleted lead ${inq.id}`);
                                  }}
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                  title="Delete Lead"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {partnerClinics.map((clinic) => (
                  <div key={clinic.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {clinic.id}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold ${
                            clinic.status === 'Scaling'
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                              : clinic.status === 'Active'
                              ? 'bg-blue-100 text-blue-900 border border-blue-200'
                              : 'bg-amber-100 text-amber-900 border border-amber-200'
                          }`}>
                            {clinic.status}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeletePartnerClinic(clinic.id, clinic.name)}
                            className="p-1 text-gray-300 hover:text-red-500 rounded transition-colors"
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
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 4: LIVE CAMPAIGNS                                   */}
          {/* ========================================================= */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-[26px] font-black text-[#183B2B] tracking-tight">
                    Healthcare Ad Campaigns
                  </h1>
                  <p className="text-xs sm:text-[13px] text-gray-500 mt-1">
                    Algorithmic bidding and creative deployment across Google Search, Meta Ads, and AI search engines.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddCampaignModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#183B2B] text-white text-xs font-bold hover:bg-[#204e39] transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Launch Campaign</span>
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      <th className="py-3 px-3">Campaign</th>
                      <th className="py-3 px-3">Partner Clinic</th>
                      <th className="py-3 px-3">Ad Network</th>
                      <th className="py-3 px-3">Monthly Budget</th>
                      <th className="py-3 px-3">Patient Inquiries</th>
                      <th className="py-3 px-3">Avg CPL</th>
                      <th className="py-3 px-3">ROAS</th>
                      <th className="py-3 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {campaigns.map((camp) => (
                      <tr key={camp.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3.5 px-3">
                          <span className="font-bold text-gray-900 block">{camp.name}</span>
                          <span className="text-[10px] font-mono text-gray-400">{camp.id}</span>
                        </td>
                        <td className="py-3.5 px-3 font-medium text-gray-800">{camp.clinic}</td>
                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-800 font-semibold text-[11px]">
                            {camp.network}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text-gray-900">
                          £{camp.monthlyBudget.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-3 font-bold text-emerald-700">
                          {camp.inquiriesDelivered} Bookings
                        </td>
                        <td className="py-3.5 px-3 font-mono font-medium text-gray-700">
                          £{camp.cpl.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-3 font-bold text-[#183B2B]">{camp.roas}</td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              handleToggleCampaignStatus(camp.id);
                              showToast(`Toggled ${camp.id} status`);
                            }}
                            className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors shadow-2xs ${
                              camp.status === 'Scaling'
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                : camp.status === 'Active'
                                ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {camp.status}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 5: PATIENT UNIT ECONOMICS & ROI CALCULATOR           */}
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

                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1.5">
                      <span>Monthly Ad Spend</span>
                      <span className="font-mono text-[#183B2B]">£{calcBudget.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={50000}
                      step={500}
                      value={calcBudget}
                      onChange={(e) => setCalcBudget(Number(e.target.value))}
                      className="w-full accent-[#183B2B] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>£1,000</span>
                      <span>£50,000</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1.5">
                      <span>Average Patient Treatment Value</span>
                      <span className="font-mono text-[#183B2B]">£{calcTreatmentValue.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={150}
                      max={15000}
                      step={150}
                      value={calcTreatmentValue}
                      onChange={(e) => setCalcTreatmentValue(Number(e.target.value))}
                      className="w-full accent-[#183B2B] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>£150 (Physio/GP)</span>
                      <span>£15,000 (Surgery/Implants)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1.5">
                      <span>Estimated Cost Per Lead (CPL)</span>
                      <span className="font-mono text-[#183B2B]">£{calcEstimatedCpl}</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={120}
                      step={2}
                      value={calcEstimatedCpl}
                      onChange={(e) => setCalcEstimatedCpl(Number(e.target.value))}
                      className="w-full accent-[#183B2B] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>£10 (Diagnostics)</span>
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
      {/* MODAL: ADD PARTNER CLINIC                                 */}
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
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
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
      {/* MODAL: LAUNCH NEW CAMPAIGN                                */}
      {/* ========================================================= */}
      {isAddCampaignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#183B2B]" />
                <h3 className="text-base font-black text-gray-900">Launch New Ad Campaign</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddCampaignModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Campaign Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Private MRI & Diagnostic Patient Funnel"
                  value={campaignForm.name}
                  onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#183B2B]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Partner Clinic *</label>
                <select
                  value={campaignForm.clinic}
                  onChange={(e) => setCampaignForm({ ...campaignForm, clinic: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#183B2B] bg-white"
                >
                  {partnerClinics.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.city})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Ad Network</label>
                  <select
                    value={campaignForm.network}
                    onChange={(e) => setCampaignForm({ ...campaignForm, network: e.target.value as any })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#183B2B] bg-white"
                  >
                    <option value="Google Search">Google Search</option>
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="Google PMax">Google PMax</option>
                    <option value="ChatGPT / AI Search">ChatGPT / AI Search</option>
                    <option value="Local Maps 3-Pack">Local Maps 3-Pack</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Monthly Ad Spend (£)</label>
                  <input
                    type="number"
                    min={500}
                    step={100}
                    value={campaignForm.monthlyBudget}
                    onChange={(e) => setCampaignForm({ ...campaignForm, monthlyBudget: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#183B2B]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddCampaignModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#183B2B] text-white font-bold hover:bg-[#204e39] transition-colors cursor-pointer shadow-xs"
                >
                  Deploy Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
