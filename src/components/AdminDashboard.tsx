import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  Target,
  Building2,
  Users,
  TrendingUp,
  HelpCircle,
  LogOut,
  Search,
  Settings,
  Bell,
  ExternalLink,
  MessageSquare,
  Phone,
  CheckSquare,
  Square,
  ArrowUpRight,
  Send,
  X,
  PhoneCall,
  Activity,
  Layers,
  Sparkles,
  Megaphone,
  Share2,
  Globe,
  Bot,
  Mail,
  Trash2,
  CheckCircle2,
  Clock,
  PlusCircle,
  ChevronDown,
  Filter
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

interface PartnerClinicItem {
  id: string;
  name: string;
  logoSrc?: string;
  avatarBg: string;
  initials: string;
  service: string;
  contactPerson: string;
  status: 'active' | 'review' | 'scaling';
}

interface ClinicBilling {
  clinicId: string;
  tier: string;
  clinicName: string;
  leadService: string;
  billingDate: string;
  adSpend: string;
  retainerFee: string;
  status: 'Received' | 'Pending';
}

function formatTimeAgo(isoString: string): string {
  try {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;
    return new Date(isoString).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return 'Recently';
  }
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'campaigns' | 'clinics' | 'leads' | 'attribution'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

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

  // Leads Filter State
  const [leadsStatusFilter, setLeadsStatusFilter] = useState<'All' | 'New' | 'Contacted' | 'Call Booked' | 'Proposal Sent'>('All');
  const [leadsServiceFilter, setLeadsServiceFilter] = useState<string>('All');
  const [leadsSearch, setLeadsSearch] = useState('');

  // Weekly Optimization Checklist (aligned with ClinicsAds services)
  const [weeklyPlan, setWeeklyPlan] = useState([
    { id: '1', label: 'Negative keyword scrubbing', completed: false, service: 'Google Ads' },
    { id: '2', label: 'Server-side GA4 conversion audit', completed: false, service: 'Tracking' },
    { id: '3', label: 'Meta retargeting creative refresh', completed: true, service: 'Meta Ads' },
    { id: '4', label: 'CallRail patient routing verification', completed: true, service: 'Tracking' },
    { id: '5', label: 'Landing page sub-2s speed check', completed: true, service: 'Landing Pages' },
  ]);

  // Today's Active Channels & Core Services
  const [activeServices, setActiveServices] = useState([
    { id: '1', label: 'Google Search Ads (Intent)', completed: true, icon: 'google' },
    { id: '2', label: 'Meta Ads (FB & Instagram)', completed: true, icon: 'meta' },
    { id: '3', label: 'Dedicated Clinic Landing Pages', completed: true, icon: 'landing' },
    { id: '4', label: 'Server-Side Attribution & GA4', completed: true, icon: 'analytics' },
    { id: '5', label: 'ChatGPT & AI Search Engine', completed: false, icon: 'gpt' },
    { id: '6', label: 'Google Maps 3-Pack & Clinic SEO', completed: false, icon: 'seo' },
  ]);

  // Partner Clinics
  const partnerClinics: PartnerClinicItem[] = [
    { id: '1', name: 'First Response Healthcare', logoSrc: '/logos/first-response-healthcare.webp', avatarBg: 'bg-[#183B2B]', initials: 'FR', service: 'Google & Meta Ads', contactPerson: 'Dr. Narayan', status: 'scaling' },
    { id: '2', name: 'GetChecked', logoSrc: '/logos/getchecked.svg', avatarBg: 'bg-[#2A6F56]', initials: 'GC', service: 'ChatGPT & Search Ads', contactPerson: 'Sarah Jenkins', status: 'active' },
    { id: '3', name: 'MMC Dubai', logoSrc: '/logos/mmc-dubai.png', avatarBg: 'bg-[#407B64]', initials: 'MM', service: 'Local Radius & Meta Ads', contactPerson: 'Dr. Tariq Al-Mansoor', status: 'active' },
    { id: '4', name: 'Novelty Clinic', logoSrc: '/logos/novelty-clinic.svg', avatarBg: 'bg-[#628F79]', initials: 'NC', service: 'Landing Pages & Search', contactPerson: 'Elena Rostova', status: 'active' },
    { id: '5', name: 'Art of Mobility', logoSrc: '/logos/art-of-mobility.svg', avatarBg: 'bg-[#76828E]', initials: 'AM', service: 'Physio Search & CRO', contactPerson: 'Mark Henderson', status: 'scaling' },
    { id: '6', name: 'Bodyworks Physio', logoSrc: '/logos/bodyworks-physio.png', avatarBg: 'bg-[#3A7E64]', initials: 'BW', service: 'Maps 3-Pack & Google Ads', contactPerson: 'David Miller', status: 'active' },
    { id: '7', name: 'Cambridge Physio', logoSrc: '/logos/cambridge-physio.webp', avatarBg: 'bg-[#899D78]', initials: 'CP', service: 'Meta Retargeting & GA4', contactPerson: 'Claire Bennett', status: 'active' },
    { id: '8', name: 'Encore Physiotherapy', logoSrc: '/logos/encore-physiotherapy.jpeg', avatarBg: 'bg-[#374151]', initials: 'EP', service: 'Call Attribution & Search', contactPerson: 'Robert Hall', status: 'active' },
  ];

  // Clinic Billings / Invoices
  const [billings, setBillings] = useState<ClinicBilling[]>([
    { clinicId: 'CL-2034', tier: 'Scale', clinicName: 'First Response Healthcare', leadService: 'Google & Meta Ads', billingDate: '01.01.2025', adSpend: '£6,500', retainerFee: '£1,800', status: 'Received' },
    { clinicId: 'CL-3434', tier: 'Growth', clinicName: 'GetChecked', leadService: 'AI Search & Google Ads', billingDate: '01.10.2024', adSpend: '£4,200', retainerFee: '£1,500', status: 'Received' },
    { clinicId: 'CL-2035', tier: 'Starter', clinicName: 'MMC Dubai', leadService: 'Local Radius & Meta Ads', billingDate: '01.10.2024', adSpend: '£2,800', retainerFee: '£950', status: 'Pending' },
    { clinicId: 'CL-1034', tier: 'Growth', clinicName: 'Novelty Clinic', leadService: 'Landing Pages & Search', billingDate: '15.09.2024', adSpend: '£5,100', retainerFee: '£1,650', status: 'Received' },
    { clinicId: 'CL-2065', tier: 'Scale', clinicName: 'Art of Mobility', leadService: 'Physio Search & CRO', billingDate: '01.01.2025', adSpend: '£7,200', retainerFee: '£2,100', status: 'Received' },
    { clinicId: 'CL-2001', tier: 'Starter', clinicName: 'Bodyworks Physio', leadService: 'Maps 3-Pack & Google Ads', billingDate: '15.07.2024', adSpend: '£2,100', retainerFee: '£850', status: 'Received' },
    { clinicId: 'CL-2033', tier: 'Growth', clinicName: 'Cambridge Physio', leadService: 'Meta Retargeting & GA4', billingDate: '01.01.2025', adSpend: '£3,900', retainerFee: '£1,300', status: 'Received' },
    { clinicId: 'CL-1134', tier: 'Starter', clinicName: 'Encore Physiotherapy', leadService: 'Call Attribution & Search', billingDate: '01.01.2025', adSpend: '£2,400', retainerFee: '£900', status: 'Received' },
  ]);

  const [billingFilter, setBillingFilter] = useState<'All' | 'Received' | 'Pending'>('All');
  const [billingSearch, setBillingSearch] = useState('');

  // Modals for direct clinic communication
  const [activeChatClinic, setActiveChatClinic] = useState<PartnerClinicItem | null>(null);
  const [activeCallClinic, setActiveCallClinic] = useState<PartnerClinicItem | null>(null);
  const [chatMessage, setChatMessage] = useState('');

  // Dynamic calculation of weekly plan completion percentage
  const planCompletedCount = weeklyPlan.filter(p => p.completed).length;
  const planPercentage = Math.round((planCompletedCount / weeklyPlan.length) * 100);

  const togglePlanItem = (id: string) => {
    setWeeklyPlan(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const toggleServiceItem = (id: string) => {
    setActiveServices(prev =>
      prev.map(s => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const filteredBillings = useMemo(() => {
    return billings.filter(b => {
      const matchesFilter = billingFilter === 'All' || b.status === billingFilter;
      const q = billingSearch.toLowerCase();
      const matchesSearch =
        b.clinicName.toLowerCase().includes(q) ||
        b.clinicId.toLowerCase().includes(q) ||
        b.leadService.toLowerCase().includes(q) ||
        b.tier.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [billings, billingFilter, billingSearch]);

  const toggleBillingStatus = (clinicId: string) => {
    setBillings(prev =>
      prev.map(b => {
        if (b.clinicId === clinicId) {
          const nextStatus = b.status === 'Received' ? 'Pending' : 'Received';
          return { ...b, status: nextStatus };
        }
        return b;
      })
    );
  };

  // Filtered Inquiries for the Patient Leads view
  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inq => {
      const matchesStatus = leadsStatusFilter === 'All' || inq.status === leadsStatusFilter;
      const matchesService = leadsServiceFilter === 'All' || inq.service === leadsServiceFilter;
      const q = leadsSearch.toLowerCase();
      const matchesSearch =
        inq.name.toLowerCase().includes(q) ||
        inq.clinicName.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        (inq.message && inq.message.toLowerCase().includes(q));
      return matchesStatus && matchesService && matchesSearch;
    });
  }, [inquiries, leadsStatusFilter, leadsServiceFilter, leadsSearch]);

  // Simulate a test incoming lead
  const handleSimulateLead = () => {
    const testClinics = [
      { name: 'Dr. Robert Hayes', clinic: 'Highland Spinal & Sports Physio', email: 'rhayes@highlandphysio.com', service: 'Google Ads' },
      { name: 'Dr. Layla Mansour', clinic: 'Elysian Aesthetic Dental', email: 'layla@elysiandental.ae', service: 'Meta Ads' },
      { name: 'Dr. James Thorne', clinic: 'Pinnacle Urgent Care', email: 'jthorne@pinnacleurgent.com', service: 'Landing Pages' }
    ];
    const pick = testClinics[Math.floor(Math.random() * testClinics.length)];
    addInquiry({
      name: pick.name,
      clinicName: pick.clinic,
      email: pick.email,
      website: `https://${pick.clinic.toLowerCase().replace(/[^a-z]/g, '')}.com`,
      service: pick.service,
      message: 'Interested in growing patient booking volume through targeted healthcare campaigns.',
      source: 'modal'
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F2] text-[#2D3748] font-sans flex flex-col selection:bg-[#183B2B] selection:text-white">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-gray-200/80 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-xs">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#183B2B] flex items-center justify-center text-white shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M12 4v16m-8-8h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[17px] sm:text-[18px] font-extrabold text-[#183B2B] tracking-tight leading-none">
              ClinicsAds
            </span>
            <span className="text-[10.5px] font-semibold text-[#183B2B]/60 tracking-wider uppercase mt-0.5">
              Client &amp; Campaign Operations
            </span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-[460px] mx-4 relative items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns, partner clinics, patient leads..."
            className="w-full bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2 text-[13.5px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#183B2B] focus:ring-1 focus:ring-[#183B2B] transition-all"
          />
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3 relative">
          {/* Settings Button */}
          <button
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 text-gray-700 text-[13px] font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <span>Settings</span>
            <Settings className="w-3.5 h-3.5 text-gray-500" />
          </button>

          {/* Notifications Bell with Connected Leads Badge */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              aria-label="View notifications"
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {newInquiriesCount > 0 && (
                <span className="min-w-4 h-4 px-1 rounded-full bg-[#EA4335] text-white text-[10px] font-bold absolute -top-1 -right-1 flex items-center justify-center border-2 border-white animate-pulse">
                  {newInquiriesCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <span className="text-xs font-bold text-[#183B2B]">Live Patient Inquiries</span>
                  <span className="text-[10px] font-semibold bg-[#EBF3E4] text-[#183B2B] px-1.5 py-0.5 rounded">
                    {newInquiriesCount} New
                  </span>
                </div>
                <div className="divide-y divide-gray-50 max-h-60 overflow-y-auto">
                  {inquiries.slice(0, 4).map((inq) => (
                    <div
                      key={inq.id}
                      onClick={() => {
                        setActiveTab('leads');
                        setNotificationsOpen(false);
                      }}
                      className="py-2.5 px-1 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-bold text-gray-800">{inq.clinicName}</span>
                        <span className="text-[10px] text-gray-400">{formatTimeAgo(inq.submittedAt)}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">
                        {inq.name} · {inq.service}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-gray-100 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('leads');
                      setNotificationsOpen(false);
                    }}
                    className="text-xs font-bold text-[#183B2B] hover:underline"
                  >
                    View All Leads ({inquiries.length}) →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-1 sm:pl-2">
            <div className="w-9 h-9 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-bold text-xs ring-2 ring-gray-100 cursor-pointer shadow-xs">
              MU
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-[13px] font-bold text-[#183B2B] leading-tight">Muhammad Usman</p>
              <p className="text-[11px] text-gray-500 font-medium">Lead Growth Strategist</p>
            </div>
          </div>

          {/* Return to Website button */}
          <button
            type="button"
            onClick={onExit}
            className="ml-2 px-3 py-1.5 rounded-full bg-[#183B2B]/10 hover:bg-[#183B2B]/20 text-[#183B2B] text-xs font-semibold transition-colors cursor-pointer"
            title="Return to Main ClinicsAds Website"
          >
            Back to Site
          </button>
        </div>
      </header>

      {/* Main Container: Left Sidebar + Content Canvas */}
      <div className="flex-1 flex w-full max-w-[1560px] mx-auto">
        {/* Left Vertical Sidebar */}
        <aside className="w-20 md:w-56 shrink-0 bg-white border-r border-gray-200/80 p-3 sm:p-5 flex flex-col justify-between">
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#EBF3E4] text-[#183B2B]'
                  : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900'
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 shrink-0 ${activeTab === 'dashboard' ? 'text-[#183B2B]' : 'text-gray-500'}`} />
              <span className="hidden md:inline">Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('campaigns')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all cursor-pointer ${
                activeTab === 'campaigns'
                  ? 'bg-[#EBF3E4] text-[#183B2B]'
                  : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900'
              }`}
            >
              <Target className={`w-4 h-4 shrink-0 ${activeTab === 'campaigns' ? 'text-[#183B2B]' : 'text-gray-500'}`} />
              <span className="hidden md:inline">Campaigns</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('clinics')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all cursor-pointer ${
                activeTab === 'clinics'
                  ? 'bg-[#EBF3E4] text-[#183B2B]'
                  : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900'
              }`}
            >
              <Building2 className={`w-4 h-4 shrink-0 ${activeTab === 'clinics' ? 'text-[#183B2B]' : 'text-gray-500'}`} />
              <span className="hidden md:inline">Partner Clinics</span>
            </button>

            {/* Patient Leads Tab (Connected with Form Submissions) */}
            <button
              type="button"
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-[#EBF3E4] text-[#183B2B]'
                  : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className={`w-4 h-4 shrink-0 ${activeTab === 'leads' ? 'text-[#183B2B]' : 'text-gray-500'}`} />
                <span className="hidden md:inline">Patient Leads</span>
              </div>
              {newInquiriesCount > 0 && (
                <span className="hidden md:inline text-[10px] font-bold bg-[#EA4335] text-white px-1.5 py-0.5 rounded-full">
                  {newInquiriesCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('attribution')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all cursor-pointer ${
                activeTab === 'attribution'
                  ? 'bg-[#EBF3E4] text-[#183B2B]'
                  : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900'
              }`}
            >
              <TrendingUp className={`w-4 h-4 shrink-0 ${activeTab === 'attribution' ? 'text-[#183B2B]' : 'text-gray-500'}`} />
              <span className="hidden md:inline">ROI Attribution</span>
            </button>
          </div>

          {/* Bottom Sidebar: Help & Logout */}
          <div className="space-y-1.5 pt-6 border-t border-gray-100">
            <button
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100/60 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-gray-400" />
              <span className="hidden md:inline">Knowledge Base</span>
            </button>
            <button
              type="button"
              onClick={onExit}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium text-gray-500 hover:text-[#EA4335] hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Back to Site</span>
            </button>
          </div>
        </aside>

        {/* Content Canvas */}
        <main className="flex-1 p-4 sm:p-7 overflow-y-auto space-y-7">
          {/* VIEW 1: DEDICATED PATIENT LEADS VIEW (CONNECTED WITH INQUIRY FORMS) */}
          {activeTab === 'leads' ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-[27px] font-extrabold text-[#183B2B] tracking-tight">
                    Inquiries &amp; Patient Leads Center
                  </h1>
                  <p className="text-[13.5px] text-gray-500 mt-1 font-medium">
                    Real-time leads submitted through website booking modals and strategy consultation forms.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleSimulateLead}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#183B2B] text-white text-[12.5px] font-bold hover:bg-[#204e39] transition-colors cursor-pointer shadow-xs"
                    title="Simulate a real-time incoming form submission"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Simulate Test Lead</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('dashboard')}
                    className="px-3.5 py-2 rounded-xl border border-gray-200 text-gray-700 text-[12.5px] font-semibold hover:bg-gray-50 transition-colors"
                  >
                    ← Dashboard
                  </button>
                </div>
              </div>

              {/* Inquiries KPI Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200/70 rounded-2xl p-4 shadow-xs">
                  <span className="text-xs font-semibold text-gray-500">Total Form Submissions</span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#183B2B] mt-1">{inquiries.length}</p>
                </div>
                <div className="bg-[#183B2B] text-white rounded-2xl p-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white/80">New Uncontacted</span>
                    <span className="w-2 h-2 rounded-full bg-[#99BC44] animate-ping" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{newInquiriesCount}</p>
                </div>
                <div className="bg-white border border-gray-200/70 rounded-2xl p-4 shadow-xs">
                  <span className="text-xs font-semibold text-gray-500">Calls Booked</span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#34A853] mt-1">
                    {inquiries.filter((i) => i.status === 'Call Booked').length}
                  </p>
                </div>
                <div className="bg-white border border-gray-200/70 rounded-2xl p-4 shadow-xs">
                  <span className="text-xs font-semibold text-gray-500">Conversion Rate</span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#183B2B] mt-1">
                    {Math.round(
                      (inquiries.filter((i) => i.status === 'Call Booked' || i.status === 'Proposal Sent').length /
                        Math.max(1, inquiries.length)) *
                        100
                    )}%
                  </p>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="bg-white border border-gray-200/70 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  {/* Status Tabs */}
                  <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
                    {(['All', 'New', 'Contacted', 'Call Booked', 'Proposal Sent'] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setLeadsStatusFilter(status)}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          leadsStatusFilter === status ? 'bg-white text-gray-900 shadow-xs font-bold' : 'text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        {status} {status === 'New' && newInquiriesCount > 0 && `(${newInquiriesCount})`}
                      </button>
                    ))}
                  </div>

                  {/* Search and Service Filter */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={leadsSearch}
                        onChange={(e) => setLeadsSearch(e.target.value)}
                        placeholder="Filter by name, clinic, email..."
                        className="text-xs border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-[#183B2B] w-52 sm:w-64"
                      />
                    </div>
                  </div>
                </div>

                {/* Leads Data Table */}
                <div className="overflow-x-auto pt-1">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        <th className="py-3 px-3">Lead ID</th>
                        <th className="py-3 px-3">Submitted</th>
                        <th className="py-3 px-3">Client &amp; Clinic</th>
                        <th className="py-3 px-3">Service</th>
                        <th className="py-3 px-3">Inquiry Message</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-[12.5px]">
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-gray-400 text-sm">
                            No inquiries match the selected filter.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((inq) => (
                          <tr key={inq.id} className="hover:bg-gray-50/70 transition-colors group">
                            <td className="py-3 px-3 font-bold text-gray-900 whitespace-nowrap">
                              {inq.id}
                            </td>
                            <td className="py-3 px-3 text-gray-500 whitespace-nowrap text-xs">
                              {formatTimeAgo(inq.submittedAt)}
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-bold text-gray-900 block leading-tight">{inq.name}</span>
                              <span className="text-xs text-[#183B2B] font-semibold block">{inq.clinicName}</span>
                              <span className="text-[11px] text-gray-400 block">{inq.email}</span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#EBF3E4] text-[#183B2B] whitespace-nowrap">
                                {inq.service}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-gray-600 max-w-xs text-xs truncate" title={inq.message || 'Standard consultation requested.'}>
                              {inq.message || 'Standard consultation requested.'}
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap">
                              <select
                                value={inq.status}
                                onChange={(e) => updateInquiryStatus(inq.id, e.target.value as ClinicInquiry['status'])}
                                className={`text-[11.5px] font-bold rounded-full px-2.5 py-1 border-0 cursor-pointer shadow-2xs ${
                                  inq.status === 'New'
                                    ? 'bg-[#183B2B] text-white'
                                    : inq.status === 'Contacted'
                                    ? 'bg-blue-100 text-blue-800'
                                    : inq.status === 'Call Booked'
                                    ? 'bg-[#EBF3E4] text-[#183B2B]'
                                    : 'bg-purple-100 text-purple-800'
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Call Booked">Call Booked</option>
                                <option value="Proposal Sent">Proposal Sent</option>
                              </select>
                            </td>
                            <td className="py-3 px-3 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={`mailto:${inq.email}?subject=ClinicsAds Consultation: ${encodeURIComponent(inq.clinicName)}`}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#183B2B] hover:bg-[#EBF3E4] transition-colors"
                                  title={`Email ${inq.name}`}
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => deleteInquiry(inq.id)}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
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
          ) : (
            /* VIEW 2: MAIN DASHBOARD OVERVIEW */
            <>
              {/* Welcome Headline */}
              <div>
                <h1 className="text-2xl sm:text-[27px] font-extrabold text-[#183B2B] tracking-tight">
                  Welcome back, Usman!
                </h1>
                <p className="text-[13.5px] text-gray-500 mt-1 font-medium">
                  Monitor active clinic campaigns, patient inquiries, and ad spend with precision.
                </p>
              </div>

              {/* Top Row: Main 4-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left 8 or 9 cols: Metric KPI Cards + Middle Content */}
                <div className="lg:col-span-8 xl:col-span-9 space-y-6">
                  {/* 4 Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {/* 1. Active Campaigns */}
                    <div className="bg-[#183B2B] text-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-white/90">Active Campaigns</span>
                        <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                      </div>
                      <div className="my-3">
                        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">48</span>
                      </div>
                      <div className="text-[11px] text-white/70 font-medium truncate">
                        Across 8 partner clinics
                      </div>
                    </div>

                    {/* 2. Patient Inquiries (Live Dynamic from Store) */}
                    <div
                      onClick={() => setActiveTab('leads')}
                      className="bg-white border border-gray-200/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs relative group cursor-pointer hover:border-[#183B2B]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-gray-700">Patient Inquiries</span>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
                      </div>
                      <div className="my-3">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#34A853] tracking-tight">
                          {1280 + inquiries.length}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-500 font-medium truncate flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                        <span>+{newInquiriesCount} new from website</span>
                      </div>
                    </div>

                    {/* 3. Average CPL */}
                    <div className="bg-white border border-gray-200/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-gray-700">Average CPL</span>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
                      </div>
                      <div className="my-3">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#183B2B] tracking-tight">£18.40</span>
                      </div>
                      <div className="text-[11px] text-gray-400 font-medium truncate">
                        -14% vs benchmark (£21.40)
                      </div>
                    </div>

                    {/* 4. Total Ad Spend Managed */}
                    <div className="bg-white border border-gray-200/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-gray-700">Managed Spend</span>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
                      </div>
                      <div className="my-3">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#183B2B] tracking-tight">£42.5k</span>
                      </div>
                      <div className="text-[11px] text-gray-400 font-medium truncate">
                        98.4% monthly pacing
                      </div>
                    </div>
                  </div>

                  {/* Incoming Live Form Inquiries Strip (Connected Form Submissions) */}
                  <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] inline-block animate-pulse" />
                        <h2 className="text-[14px] font-bold text-gray-800">
                          Incoming Clinic Inquiries (Website Forms)
                        </h2>
                        <span className="text-[11px] font-bold text-[#183B2B] bg-[#EBF3E4] px-2 py-0.5 rounded-full">
                          {inquiries.length} Registered
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('leads')}
                        className="text-xs font-bold text-[#183B2B] hover:underline cursor-pointer"
                      >
                        Manage All Leads →
                      </button>
                    </div>

                    <div className="divide-y divide-gray-50 pt-1">
                      {inquiries.slice(0, 3).map((inq) => (
                        <div key={inq.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-gray-50/70 px-2 rounded-xl transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#183B2B] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs mt-0.5">
                              {inq.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[13px] font-bold text-gray-900">{inq.clinicName}</span>
                                <span className="text-[10px] text-gray-400">· {formatTimeAgo(inq.submittedAt)}</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-0.5">
                                <strong className="text-gray-800">{inq.name}</strong> ({inq.email}) requested{' '}
                                <span className="font-semibold text-[#183B2B]">{inq.service}</span>
                              </p>
                              {inq.message && (
                                <p className="text-[11px] text-gray-500 italic mt-0.5 line-clamp-1">
                                  &ldquo;{inq.message}&rdquo;
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                                inq.status === 'New'
                                  ? 'bg-[#183B2B] text-white'
                                  : 'bg-[#EBF3E4] text-[#183B2B]'
                              }`}
                            >
                              {inq.status}
                            </span>
                            <a
                              href={`mailto:${inq.email}`}
                              className="px-3 py-1 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              Reply
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Middle Section: Partner Clinics (Left) + Lead Velocity & Calendar (Right) */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    {/* Partner Clinics (Left 5 cols) */}
                    <div className="md:col-span-5 bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] inline-block animate-pulse" />
                            <h2 className="text-[14px] font-bold text-gray-800">Partner Clinics</h2>
                          </div>
                          <span className="text-[11px] font-bold text-[#183B2B] bg-[#EBF3E4] px-2 py-0.5 rounded-full">
                            8 Active
                          </span>
                        </div>

                        <div className="divide-y divide-gray-50 pt-1">
                          {partnerClinics.map((clinic) => (
                            <div key={clinic.id} className="py-2.5 flex items-center justify-between group hover:bg-gray-50/70 px-1 rounded-lg transition-colors">
                              <div className="flex items-center gap-2.5 min-w-0">
                                {clinic.logoSrc ? (
                                  <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center p-1 shrink-0">
                                    <img
                                      src={clinic.logoSrc}
                                      alt={clinic.name}
                                      className="w-full h-full object-contain"
                                    />
                                  </div>
                                ) : (
                                  <div className={`w-8 h-8 rounded-lg ${clinic.avatarBg} text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-xs`}>
                                    {clinic.initials}
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <span className="text-[12.5px] font-semibold text-gray-800 block truncate" title={clinic.name}>
                                    {clinic.name}
                                  </span>
                                  <span className="text-[10px] text-gray-400 block truncate">
                                    {clinic.service}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => setActiveChatClinic(clinic)}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#183B2B] hover:bg-[#EBF3E4] transition-colors cursor-pointer"
                                  title={`Message ${clinic.name}`}
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setActiveCallClinic(clinic)}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#183B2B] hover:bg-[#EBF3E4] transition-colors cursor-pointer"
                                  title={`Call ${clinic.name}`}
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Patient Lead Inflow & Launch Calendar (Right 7 cols) */}
                    <div className="md:col-span-7 space-y-5">
                      {/* Inquiry Inflow Bar Chart Card */}
                      <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-[14px] font-bold text-gray-800">Weekly Patient Inquiries</h2>
                            <p className="text-[11.5px] text-gray-400 font-medium mt-0.5">Daily average: 38 inquiries across all clinics</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-700" />
                        </div>

                        {/* Bar Chart Visualization */}
                        <div className="pt-6 pb-2">
                          <div className="h-32 flex items-end justify-between gap-3 px-3">
                            <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                              <div className="w-full max-w-[28px] bg-[#374151] rounded-full h-20 group-hover:brightness-110 transition-all relative">
                                <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity">42 leads</span>
                              </div>
                              <span className="text-[11px] font-bold text-gray-600">M</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                              <div className="w-full max-w-[28px] bg-[#E5E7EB] rounded-full h-12 group-hover:bg-gray-300 transition-all relative">
                                <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity">28 leads</span>
                              </div>
                              <span className="text-[11px] font-bold text-gray-600">T</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                              <div className="w-full max-w-[28px] bg-[#374151] rounded-full h-16 group-hover:brightness-110 transition-all relative">
                                <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity">36 leads</span>
                              </div>
                              <span className="text-[11px] font-bold text-gray-600">W</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                              <div className="w-full max-w-[28px] bg-[#374151] rounded-full h-20 group-hover:brightness-110 transition-all relative">
                                <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity">45 leads</span>
                              </div>
                              <span className="text-[11px] font-bold text-gray-600">T</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-2 relative group cursor-pointer">
                              <span className="text-[11px] font-bold text-white bg-[#183B2B] px-2 py-0.5 rounded-full shadow-xs mb-1">
                                64 leads
                              </span>
                              <div className="w-full max-w-[28px] bg-[#183B2B] rounded-full h-24 ring-2 ring-[#99BC44]/30 shadow-xs group-hover:brightness-110 transition-all" />
                              <span className="text-[11px] font-extrabold text-[#183B2B]">F</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                              <div className="w-full max-w-[28px] bg-[#E5E7EB] rounded-full h-10 group-hover:bg-gray-300 transition-all relative">
                                <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity">22 leads</span>
                              </div>
                              <span className="text-[11px] font-bold text-gray-600">S</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                              <div className="w-full max-w-[28px] bg-[#E5E7EB] rounded-full h-14 group-hover:bg-gray-300 transition-all relative">
                                <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity">31 leads</span>
                              </div>
                              <span className="text-[11px] font-bold text-gray-600">S</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Campaign Launch & Optimization Schedule Card */}
                      <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                          <h2 className="text-[14px] font-bold text-gray-800">Optimization Schedule</h2>
                          <ExternalLink className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-700" />
                        </div>

                        <div className="pt-3">
                          <div className="grid grid-cols-7 text-center text-[11px] font-bold text-gray-500 pb-3 border-b border-dashed border-gray-200">
                            <span>M</span>
                            <span>T</span>
                            <span>W</span>
                            <span>T</span>
                            <span className="text-[#183B2B] font-extrabold">F</span>
                            <span>S</span>
                            <span>S</span>
                          </div>

                          <div className="pt-3 space-y-2.5 relative">
                            <div className="flex items-center justify-between bg-[#374151] text-white px-3.5 py-2 rounded-xl text-[12px] shadow-xs">
                              <div>
                                <span className="font-bold block">Google Ads Bid Audit</span>
                                <span className="text-[10px] text-gray-300">First Response &amp; GetChecked</span>
                              </div>
                              <div className="flex -space-x-1.5 overflow-hidden">
                                <div className="w-5 h-5 rounded-full bg-blue-500 border border-[#374151]" />
                                <div className="w-5 h-5 rounded-full bg-emerald-400 border border-[#374151]" />
                              </div>
                            </div>

                            <div className="flex items-center justify-between bg-[#F3F4F6] text-gray-800 px-3.5 py-2 rounded-xl text-[12px] border border-gray-200/60 shadow-xs">
                              <div>
                                <span className="font-bold block">Mobile Landing Page CRO Test</span>
                                <span className="text-[10px] text-gray-500">Art of Mobility &amp; MMC Dubai</span>
                              </div>
                              <div className="flex -space-x-1.5 overflow-hidden">
                                <div className="w-5 h-5 rounded-full bg-amber-400 border border-white" />
                                <div className="w-5 h-5 rounded-full bg-indigo-500 border border-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Weekly Optimization Plan & Active Services Widgets */}
                <div className="lg:col-span-4 xl:col-span-3 space-y-6">
                  {/* Widget 1: Weekly Optimization Plan */}
                  <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-[14px] font-bold text-gray-800">Weekly Optimization</h2>
                      <ExternalLink className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-700" />
                    </div>

                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="relative w-36 h-36 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="transparent"
                            stroke="#E5E7EB"
                            strokeWidth="10"
                            strokeDasharray="238.76"
                            strokeDashoffset="0"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="transparent"
                            stroke="#183B2B"
                            strokeWidth="10"
                            strokeDasharray="238.76"
                            strokeDashoffset={238.76 - (238.76 * planPercentage) / 100}
                            strokeLinecap="round"
                            className="transition-all duration-700 ease-out"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-3xl font-extrabold text-gray-800 tracking-tight">
                            {planPercentage}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-1">
                      {weeklyPlan.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => togglePlanItem(item.id)}
                          className="flex items-center justify-between py-1 px-1 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-[#EBF3E4] group-hover:text-[#183B2B] transition-colors">
                              <CheckSquare className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <span className={`text-[12px] font-semibold block transition-colors ${item.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                {item.label}
                              </span>
                              <span className="text-[10px] text-gray-400">{item.service}</span>
                            </div>
                          </div>
                          <div className="text-gray-400 group-hover:text-[#183B2B]">
                            {item.completed ? (
                              <CheckSquare className="w-4 h-4 text-[#183B2B]" />
                            ) : (
                              <Square className="w-4 h-4 text-gray-300" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Widget 2: What We Offer (Active Channels) */}
                  <div className="bg-[#183B2B] text-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[14px] font-bold text-white">Active Channels</h2>
                      <ExternalLink className="w-4 h-4 text-white/70 hover:text-white cursor-pointer" />
                    </div>

                    <div className="space-y-2.5">
                      {activeServices.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => toggleServiceItem(service.id)}
                          className="flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white/90">
                              <Target className="w-3.5 h-3.5" />
                            </div>
                            <span className={`text-[12px] font-semibold transition-colors ${service.completed ? 'text-white' : 'text-white/50'}`}>
                              {service.label}
                            </span>
                          </div>
                          <div>
                            {service.completed ? (
                              <span className="text-[10px] font-bold bg-[#99BC44] text-[#183B2B] px-1.5 py-0.5 rounded">
                                LIVE
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium text-white/40 border border-white/20 px-1.5 py-0.5 rounded">
                                SETUP
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Monthly Growth Review (Inquiries, CTR, Bookings) */}
              <div className="space-y-3.5 pt-2">
                <h2 className="text-[16px] sm:text-[17px] font-bold text-[#183B2B] tracking-tight">
                  Monthly Growth &amp; Attribution Review
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-gray-700">Patient Inquiries</span>
                      <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer" />
                    </div>
                    <div className="mt-2.5">
                      <span className="text-3xl font-extrabold text-[#183B2B] tracking-tight">1,498</span>
                      <div className="flex items-center gap-1.5 text-[11.5px] text-[#34A853] font-semibold mt-0.5">
                        <span>+24% higher vs benchmark</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="pt-4">
                      <svg className="w-full h-24 overflow-visible" viewBox="0 0 240 80">
                        <line x1="0" y1="20" x2="240" y2="20" stroke="#E5E7EB" strokeDasharray="3 3" />
                        <line x1="0" y1="45" x2="240" y2="45" stroke="#E5E7EB" strokeDasharray="3 3" />
                        <line x1="0" y1="70" x2="240" y2="70" stroke="#E5E7EB" strokeDasharray="3 3" />
                        <defs>
                          <linearGradient id="gradVisits" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#183B2B" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#183B2B" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 55 Q 30 50, 45 52 T 75 68 T 105 40 T 135 72 T 165 52 T 195 56 T 240 25 L 240 70 L 0 70 Z"
                          fill="url(#gradVisits)"
                        />
                        <path
                          d="M 0 55 Q 30 50, 45 52 T 75 68 T 105 40 T 135 72 T 165 52 T 195 56 T 240 25"
                          fill="none"
                          stroke="#183B2B"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium pt-1">
                        <span>Week 1</span>
                        <span>Week 4</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-gray-700">Phone Conversion Rate</span>
                      <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer" />
                    </div>
                    <div className="mt-2.5">
                      <span className="text-3xl font-extrabold text-[#183B2B] tracking-tight">14.6%</span>
                      <div className="flex items-center gap-1.5 text-[11.5px] text-[#34A853] font-semibold mt-0.5">
                        <span>+3.2% mobile CTR lift</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="pt-4">
                      <svg className="w-full h-24 overflow-visible" viewBox="0 0 240 80">
                        <line x1="0" y1="20" x2="240" y2="20" stroke="#E5E7EB" strokeDasharray="3 3" />
                        <line x1="0" y1="45" x2="240" y2="45" stroke="#E5E7EB" strokeDasharray="3 3" />
                        <line x1="0" y1="70" x2="240" y2="70" stroke="#E5E7EB" strokeDasharray="3 3" />
                        <defs>
                          <linearGradient id="gradReturning" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#34A853" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#34A853" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 58 L 25 70 L 55 52 L 85 52 L 115 38 L 145 55 L 175 42 L 205 48 L 240 28 L 240 70 L 0 70 Z"
                          fill="url(#gradReturning)"
                        />
                        <path
                          d="M 0 58 L 25 70 L 55 52 L 85 52 L 115 38 L 145 55 L 175 42 L 205 48 L 240 28"
                          fill="none"
                          stroke="#183B2B"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium pt-1">
                        <span>Week 1</span>
                        <span>Week 4</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-gray-700">Booked Consultations</span>
                      <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer" />
                    </div>
                    <div className="mt-2.5">
                      <span className="text-3xl font-extrabold text-[#183B2B] tracking-tight">412</span>
                      <div className="flex items-center gap-1.5 text-[11.5px] text-[#34A853] font-semibold mt-0.5">
                        <span>+18% qualified patients</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="pt-4">
                      <svg className="w-full h-24 overflow-visible" viewBox="0 0 240 80">
                        <line x1="0" y1="20" x2="240" y2="20" stroke="#E5E7EB" strokeDasharray="3 3" />
                        <line x1="0" y1="45" x2="240" y2="45" stroke="#E5E7EB" strokeDasharray="3 3" />
                        <line x1="0" y1="70" x2="240" y2="70" stroke="#E5E7EB" strokeDasharray="3 3" />
                        <path
                          d="M 0 65 L 40 52 L 80 48 L 120 42 L 160 55 L 200 48 L 240 35"
                          fill="none"
                          stroke="#183B2B"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium pt-1">
                        <span>Week 1</span>
                        <span>Week 4</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 4: Track Client Retainers & Ad Spend (Upcoming Billings Table) */}
              <div className="space-y-3.5 pt-2">
                <h2 className="text-[16px] sm:text-[17px] font-bold text-[#183B2B] tracking-tight">
                  Track Clinic Retainers &amp; Managed Ad Spend
                </h2>

                <div className="bg-white border border-gray-200/70 rounded-2xl p-5 sm:p-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[14px] font-bold text-gray-800">Clinic Client Invoices</h3>
                      <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {filteredBillings.length} partner clinics
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="inline-flex rounded-lg bg-gray-100 p-0.5 text-xs font-semibold">
                        {(['All', 'Received', 'Pending'] as const).map((filter) => (
                          <button
                            key={filter}
                            type="button"
                            onClick={() => setBillingFilter(filter)}
                            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                              billingFilter === filter ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-800'
                            }`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>

                      <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer ml-1" />
                    </div>
                  </div>

                  <div className="overflow-x-auto pt-2">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                          <th className="py-3 px-3">Clinic ID</th>
                          <th className="py-3 px-3">Plan Tier</th>
                          <th className="py-3 px-3">Clinic Name</th>
                          <th className="py-3 px-3">Core Deliverables</th>
                          <th className="py-3 px-3">Billing Cycle</th>
                          <th className="py-3 px-3">Ad Spend</th>
                          <th className="py-3 px-3">Retainer Fee</th>
                          <th className="py-3 px-3 text-right">Invoice Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-[12.5px]">
                        {filteredBillings.map((b) => (
                          <tr key={b.clinicId} className="hover:bg-gray-50/70 transition-colors group">
                            <td className="py-3 px-3 font-bold text-gray-900">
                              {b.clinicId}
                            </td>
                            <td className="py-3 px-3 font-medium text-gray-600">
                              <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                                b.tier === 'Scale' ? 'bg-[#183B2B] text-white' : b.tier === 'Growth' ? 'bg-[#EBF3E4] text-[#183B2B]' : 'bg-gray-100 text-gray-700'
                              }`}>
                                {b.tier}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-semibold text-gray-800">
                              {b.clinicName}
                            </td>
                            <td className="py-3 px-3 text-gray-600">
                              {b.leadService}
                            </td>
                            <td className="py-3 px-3 text-gray-500">
                              {b.billingDate}
                            </td>
                            <td className="py-3 px-3 font-medium text-gray-700">
                              {b.adSpend}
                            </td>
                            <td className="py-3 px-3 font-bold text-gray-900">
                              {b.retainerFee}
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => toggleBillingStatus(b.clinicId)}
                                className={`inline-flex items-center px-3 py-1 rounded-full text-[11.5px] font-bold transition-all shadow-2xs cursor-pointer ${
                                  b.status === 'Received'
                                    ? 'bg-[#3D6947] text-white hover:bg-[#32573a]'
                                    : 'bg-[#FCEFEA] text-[#D95338] hover:bg-[#fae3da]'
                                }`}
                                title="Click to toggle status"
                              >
                                {b.status}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Mini Chat Modal with Partner Clinic */}
      {activeChatClinic && (
        <div className="fixed bottom-4 right-4 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="bg-[#183B2B] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full ${activeChatClinic.avatarBg} flex items-center justify-center text-xs font-bold`}>
                {activeChatClinic.initials}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold leading-tight truncate">{activeChatClinic.name}</p>
                <p className="text-[10px] text-white/70">{activeChatClinic.contactPerson} · Online</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveChatClinic(null)}
              className="text-white/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 h-48 overflow-y-auto bg-gray-50 text-xs space-y-2">
            <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-2xs max-w-[85%] text-gray-700">
              Hello Usman! Our reception team saw an increase of 14 patient calls from the new Google Search landing page today.
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!chatMessage.trim()) return;
              setChatMessage('');
            }}
            className="p-2.5 border-t border-gray-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Reply to clinic..."
              className="flex-1 text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#183B2B]"
            />
            <button
              type="submit"
              className="w-7 h-7 rounded-lg bg-[#183B2B] text-white flex items-center justify-center shrink-0 hover:bg-[#204e39]"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Mini Call Modal with Partner Clinic */}
      {activeCallClinic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl border border-gray-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className={`w-20 h-20 rounded-full ${activeCallClinic.avatarBg} text-white mx-auto flex items-center justify-center text-2xl font-bold shadow-lg ring-8 ring-green-50`}>
              {activeCallClinic.initials}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{activeCallClinic.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{activeCallClinic.contactPerson} · Campaign Review Line</p>
              <p className="text-xs text-[#34A853] font-semibold mt-2 animate-pulse">Connecting to Clinic Director...</p>
            </div>
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setActiveCallClinic(null)}
                className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
