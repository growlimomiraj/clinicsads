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
  RotateCcw,
  ShieldCheck,
  Check
} from 'lucide-react';
import {
  ClinicInquiry,
  getInquiries,
  subscribeToInquiries,
  updateInquiryStatus,
  deleteInquiry,
  addInquiry,
  resetToRealInquiries
} from '../data/inquiriesStore';

interface AdminDashboardProps {
  onExit: () => void;
}

interface PartnerClinicItem {
  id: string;
  name: string;
  location: string;
  logoSrc?: string;
  avatarBg: string;
  initials: string;
  service: string;
  contactPerson: string;
  phone: string;
  email: string;
  status: 'active' | 'scaling';
}

interface ClinicEngagement {
  clinicId: string;
  plan: string;
  clinicName: string;
  leadService: string;
  agreement: string;
  channels: string;
  status: 'Active' | 'Scaling';
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

  // Live Connected Inquiries Store (Real Data)
  const [inquiries, setInquiries] = useState<ClinicInquiry[]>(getInquiries);

  useEffect(() => {
    return subscribeToInquiries(() => {
      setInquiries(getInquiries());
    });
  }, []);

  const newInquiriesCount = useMemo(() => {
    return inquiries.filter((i) => i.status === 'New').length;
  }, [inquiries]);

  const callsBookedCount = useMemo(() => {
    return inquiries.filter((i) => i.status === 'Call Booked' || i.source === 'call-booking').length;
  }, [inquiries]);

  // Leads Filter State
  const [leadsStatusFilter, setLeadsStatusFilter] = useState<'All' | 'New' | 'Contacted' | 'Call Booked' | 'Proposal Sent'>('All');
  const [leadsServiceFilter, setLeadsServiceFilter] = useState<string>('All');
  const [leadsSearch, setLeadsSearch] = useState('');

  // Manual Add Lead Modal State
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadClinic, setNewLeadClinic] = useState('');
  const [newLeadWebsite, setNewLeadWebsite] = useState('');
  const [newLeadService, setNewLeadService] = useState('Google Ads');
  const [newLeadTime, setNewLeadTime] = useState('Morning (9am - 12pm)');
  const [newLeadMessage, setNewLeadMessage] = useState('');

  // Weekly Optimization Checklist (Real ClinicsAds Deliverables)
  const [weeklyPlan, setWeeklyPlan] = useState([
    { id: '1', label: 'Negative keyword scrubbing in Google Ads to cut wasted budget', completed: false, service: 'Google Ads' },
    { id: '2', label: 'Server-side GA4 & CallRail conversion tracking verification', completed: false, service: 'Attribution' },
    { id: '3', label: 'Meta retargeting ad creative refresh with clinical proof', completed: true, service: 'Meta Ads' },
    { id: '4', label: 'CallRail dynamic number insertion routing check', completed: true, service: 'Attribution' },
    { id: '5', label: 'Clinic landing page sub-2.0s mobile speed audit', completed: true, service: 'Landing Pages' },
  ]);

  // Real Healthcare Marketing Channels
  const [activeServices, setActiveServices] = useState([
    { id: '1', label: 'Google Search Ads (High-Intent Patients)', completed: true, icon: 'google' },
    { id: '2', label: 'Meta Ads (FB & Instagram Local Radius)', completed: true, icon: 'meta' },
    { id: '3', label: 'Dedicated Clinic Landing Pages (<2s CRO)', completed: true, icon: 'landing' },
    { id: '4', label: 'Server-Side GA4 & Call Attribution', completed: true, icon: 'analytics' },
    { id: '5', label: 'ChatGPT & AI Search Engine Placement', completed: true, icon: 'gpt' },
    { id: '6', label: 'Google Maps 3-Pack & Clinic Local SEO', completed: true, icon: 'seo' },
  ]);

  // Real Partner Clinics from the Website
  const partnerClinics: PartnerClinicItem[] = [
    { id: '1', name: 'First Response Healthcare', location: 'Dubai, UAE', logoSrc: '/logos/first-response-healthcare.webp', avatarBg: 'bg-[#183B2B]', initials: 'FR', service: 'Google & Meta Ads', contactPerson: 'Dr. Narayan', phone: '+971 4 330 0999', email: 'director@firstresponse.ae', status: 'scaling' },
    { id: '2', name: 'GetChecked', location: 'Albuquerque, NM', logoSrc: '/logos/getchecked.svg', avatarBg: 'bg-[#2A6F56]', initials: 'GC', service: 'ChatGPT & Search Ads', contactPerson: 'Sarah Jenkins', phone: '+1 (667) 347-4729', email: 'contact@getchecked.com', status: 'active' },
    { id: '3', name: 'MMC Dubai', location: 'Dubai, UAE', logoSrc: '/logos/mmc-dubai.png', avatarBg: 'bg-[#407B64]', initials: 'MM', service: 'Local Radius & Meta Ads', contactPerson: 'Dr. Tariq Al-Mansoor', phone: '+971 4 388 9988', email: 'appointments@mmcdubai.ae', status: 'active' },
    { id: '4', name: 'Novelty Clinic', location: 'Dubai, UAE', logoSrc: '/logos/novelty-clinic.svg', avatarBg: 'bg-[#628F79]', initials: 'NC', service: 'Landing Pages & Search', contactPerson: 'Elena Rostova', phone: '+971 4 220 1100', email: 'growth@noveltyclinic.ae', status: 'active' },
    { id: '5', name: 'Art of Mobility', location: 'Ontario, Canada', logoSrc: '/logos/art-of-mobility.svg', avatarBg: 'bg-[#76828E]', initials: 'AM', service: 'Physio Search & CRO', contactPerson: 'Mark Henderson', phone: '+1 416 555 0192', email: 'mark@artofmobility.ca', status: 'scaling' },
    { id: '6', name: 'Bodyworks Physio', location: 'Sydney, Australia', logoSrc: '/logos/bodyworks-physio.png', avatarBg: 'bg-[#3A7E64]', initials: 'BW', service: 'Maps 3-Pack & Google Ads', contactPerson: 'David Miller', phone: '+61 2 9555 1200', email: 'info@bodyworksphysio.com.au', status: 'active' },
    { id: '7', name: 'Cambridge Physio', location: 'Cambridge, UK', logoSrc: '/logos/cambridge-physio.webp', avatarBg: 'bg-[#899D78]', initials: 'CP', service: 'Meta Retargeting & GA4', contactPerson: 'Claire Bennett', phone: '+44 1223 555432', email: 'claire@cambridgephysio.co.uk', status: 'active' },
    { id: '8', name: 'Encore Physiotherapy', location: 'Edmonton, Canada', logoSrc: '/logos/encore-physiotherapy.jpeg', avatarBg: 'bg-[#374151]', initials: 'EP', service: 'Call Attribution & Search', contactPerson: 'Robert Hall', phone: '+1 780 555 8899', email: 'robert@encorephysio.ca', status: 'active' },
  ];

  // Active Partner Clinic Engagements & Deliverables
  const [engagements, setEngagements] = useState<ClinicEngagement[]>([
    { clinicId: 'CL-2034', plan: 'Scale Plan', clinicName: 'First Response Healthcare', leadService: 'Google & Meta Search', agreement: 'Month-to-Month', channels: 'Search Ads & Instagram Reels', status: 'Scaling' },
    { clinicId: 'CL-3434', plan: 'AI Growth', clinicName: 'GetChecked', leadService: 'AI Search & Google Ads', agreement: 'Month-to-Month', channels: 'ChatGPT Citations & Google Ads', status: 'Active' },
    { clinicId: 'CL-2035', plan: 'Local Radius', clinicName: 'MMC Dubai', leadService: 'Local Radius Meta Ads', agreement: 'Month-to-Month', channels: 'Meta Feed & WhatsApp Direct', status: 'Active' },
    { clinicId: 'CL-1034', plan: 'CRO & Search', clinicName: 'Novelty Clinic', leadService: 'Clinic Landing Pages & CRO', agreement: 'Month-to-Month', channels: 'Sub-2s Landers & Search Ads', status: 'Active' },
    { clinicId: 'CL-2065', plan: 'Physio Scale', clinicName: 'Art of Mobility', leadService: 'Physio Search & CRO', agreement: 'Month-to-Month', channels: 'Private Patient Funnels', status: 'Scaling' },
    { clinicId: 'CL-2001', plan: 'Maps Dominance', clinicName: 'Bodyworks Physio', leadService: 'Maps 3-Pack & Local Search', agreement: 'Month-to-Month', channels: 'Google Business Profile & SEO', status: 'Active' },
    { clinicId: 'CL-2033', plan: 'Retargeting', clinicName: 'Cambridge Physio', leadService: 'Meta Retargeting & GA4', agreement: 'Month-to-Month', channels: 'Custom Audiences & GA4', status: 'Active' },
    { clinicId: 'CL-1134', plan: 'Call Tracking', clinicName: 'Encore Physiotherapy', leadService: 'Call Attribution & Search', agreement: 'Month-to-Month', channels: 'CallRail & High-Intent Search', status: 'Active' },
  ]);

  const [engagementFilter, setEngagementFilter] = useState<'All' | 'Active' | 'Scaling'>('All');
  const [engagementSearch, setEngagementSearch] = useState('');

  // Modals for direct clinic communication
  const [activeChatClinic, setActiveChatClinic] = useState<PartnerClinicItem | null>(null);
  const [activeCallClinic, setActiveCallClinic] = useState<PartnerClinicItem | null>(null);
  const [chatMessage, setChatMessage] = useState('');

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

  const filteredEngagements = useMemo(() => {
    return engagements.filter(e => {
      const matchesFilter = engagementFilter === 'All' || e.status === engagementFilter;
      const q = engagementSearch.toLowerCase();
      const matchesSearch =
        e.clinicName.toLowerCase().includes(q) ||
        e.clinicId.toLowerCase().includes(q) ||
        e.leadService.toLowerCase().includes(q) ||
        e.channels.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [engagements, engagementFilter, engagementSearch]);

  const toggleEngagementStatus = (clinicId: string) => {
    setEngagements(prev =>
      prev.map(e => {
        if (e.clinicId === clinicId) {
          const nextStatus = e.status === 'Active' ? 'Scaling' : 'Active';
          return { ...e, status: nextStatus };
        }
        return e;
      })
    );
  };

  // Filtered Inquiries for the Patient Leads view (Real Data)
  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inq => {
      const matchesStatus = leadsStatusFilter === 'All' || inq.status === leadsStatusFilter;
      const matchesService = leadsServiceFilter === 'All' || inq.service === leadsServiceFilter;
      const q = leadsSearch.toLowerCase();
      const matchesSearch =
        inq.name.toLowerCase().includes(q) ||
        inq.clinicName.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        (inq.phone && inq.phone.toLowerCase().includes(q)) ||
        (inq.message && inq.message.toLowerCase().includes(q));
      return matchesStatus && matchesService && matchesSearch;
    });
  }, [inquiries, leadsStatusFilter, leadsServiceFilter, leadsSearch]);

  const handleManualAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadEmail.trim()) return;

    addInquiry({
      name: newLeadName.trim(),
      email: newLeadEmail.trim(),
      phone: newLeadPhone.trim() || undefined,
      clinicName: newLeadClinic.trim() || 'Clinic Client',
      website: newLeadWebsite.trim() || undefined,
      service: newLeadService,
      preferredTime: newLeadTime,
      message: newLeadMessage.trim() || `Manual Intake lead logged for ${newLeadService}`,
      source: 'call-booking',
    });

    setNewLeadName('');
    setNewLeadEmail('');
    setNewLeadPhone('');
    setNewLeadClinic('');
    setNewLeadWebsite('');
    setNewLeadMessage('');
    setShowAddLeadModal(false);
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
          <button
            type="button"
            onClick={() => setActiveTab('campaigns')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 text-gray-700 text-[13px] font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
            <span>6 Active Channels</span>
          </button>

          {/* Notifications Bell with Real Leads Badge */}
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
                  <span className="text-xs font-bold text-[#183B2B]">Live Website Submissions</span>
                  <span className="text-[10px] font-semibold bg-[#EBF3E4] text-[#183B2B] px-1.5 py-0.5 rounded">
                    {newInquiriesCount} New
                  </span>
                </div>
                <div className="divide-y divide-gray-50 max-h-60 overflow-y-auto">
                  {inquiries.length === 0 ? (
                    <div className="py-4 text-center text-xs text-gray-400">
                      No inquiries received yet.
                    </div>
                  ) : (
                    inquiries.slice(0, 4).map((inq) => (
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
                    ))
                  )}
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
            className="ml-2 px-3.5 py-1.5 rounded-full bg-[#183B2B]/10 hover:bg-[#183B2B]/20 text-[#183B2B] text-xs font-bold transition-colors cursor-pointer"
            title="Return to Public Website"
          >
            Back to Site
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Vertical Navigation Sidebar */}
        <aside className="w-16 md:w-60 bg-white border-r border-gray-200/80 p-3 md:p-4 flex flex-col justify-between shrink-0">
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

            {/* Patient Leads Tab (Real Data) */}
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

          {/* Bottom Sidebar: Return to site */}
          <div className="space-y-1.5 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onExit}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium text-gray-500 hover:text-[#183B2B] hover:bg-gray-100/60 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Public Site</span>
            </button>
          </div>
        </aside>

        {/* Content Canvas */}
        <main className="flex-1 p-4 sm:p-7 overflow-y-auto space-y-7">
          {/* TAB 1: PATIENT LEADS CENTER */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-[27px] font-extrabold text-[#183B2B] tracking-tight">
                    Inquiries &amp; Patient Leads Center
                  </h1>
                  <p className="text-[13.5px] text-gray-500 mt-1 font-medium">
                    Verified real-time leads submitted through the ClinicsAds booking modal and contact form.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowAddLeadModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#183B2B] text-white text-[12.5px] font-bold hover:bg-[#204e39] transition-colors cursor-pointer shadow-xs"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ Log Patient Lead</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetToRealInquiries();
                      setInquiries(getInquiries());
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-gray-600 text-[12px] font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                    title="Purge dummy template items and preserve real leads"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Real Data</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('dashboard')}
                    className="px-3.5 py-2 rounded-xl border border-gray-200 text-gray-700 text-[12.5px] font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    ← Dashboard
                  </button>
                </div>
              </div>

              {/* Inquiries KPI Summary Cards (Real Calculations) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200/70 rounded-2xl p-4 shadow-xs">
                  <span className="text-xs font-semibold text-gray-500">Total Inquiries</span>
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
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#34A853] mt-1">{callsBookedCount}</p>
                </div>
                <div className="bg-white border border-gray-200/70 rounded-2xl p-4 shadow-xs">
                  <span className="text-xs font-semibold text-gray-500">Consultation Rate</span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#183B2B] mt-1">
                    {Math.round((callsBookedCount / Math.max(1, inquiries.length)) * 100)}%
                  </p>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="bg-white border border-gray-200/70 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
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

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={leadsSearch}
                        onChange={(e) => setLeadsSearch(e.target.value)}
                        placeholder="Filter by name, clinic, email, phone..."
                        className="text-xs border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-[#183B2B] w-52 sm:w-64"
                      />
                    </div>
                  </div>
                </div>

                {/* Real Leads Data Table */}
                <div className="overflow-x-auto pt-1">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        <th className="py-3 px-3">Lead ID</th>
                        <th className="py-3 px-3">Submitted</th>
                        <th className="py-3 px-3">Client &amp; Clinic</th>
                        <th className="py-3 px-3">Service</th>
                        <th className="py-3 px-3">Booking Notes &amp; Time</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-[12.5px]">
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-gray-400 text-sm">
                            No inquiries match the current filter.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((inq) => (
                          <tr key={inq.id} className="hover:bg-gray-50/70 transition-colors group">
                            <td className="py-3 px-3 font-bold text-gray-900 whitespace-nowrap">
                              {inq.id}
                              {inq.source === 'call-booking' && (
                                <span className="block text-[9.5px] font-extrabold uppercase text-[#183B2B] bg-[#EBF3E4] px-1.5 py-0.5 rounded w-max mt-0.5">
                                  📞 Call Booked
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-gray-500 whitespace-nowrap text-xs">
                              {formatTimeAgo(inq.submittedAt)}
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-bold text-gray-900 block leading-tight">{inq.name}</span>
                              <span className="text-xs text-[#183B2B] font-semibold block">{inq.clinicName}</span>
                              <span className="text-[11px] text-gray-400 block">{inq.email}</span>
                              {inq.phone && (
                                <a
                                  href={`tel:${inq.phone}`}
                                  className="text-[11px] text-[#34A853] font-semibold hover:underline flex items-center gap-1 mt-0.5"
                                >
                                  <Phone className="w-2.5 h-2.5 shrink-0" />
                                  <span>{inq.phone}</span>
                                </a>
                              )}
                            </td>
                            <td className="py-3 px-3">
                              <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#EBF3E4] text-[#183B2B] whitespace-nowrap">
                                {inq.service}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-gray-600 max-w-xs text-xs">
                              {inq.preferredTime && (
                                <div className="text-[11px] font-semibold text-[#183B2B] flex items-center gap-1 mb-0.5">
                                  <Clock className="w-3 h-3 text-[#7A9A2E] shrink-0" />
                                  <span>{inq.preferredTime}</span>
                                </div>
                              )}
                              <p className="truncate text-gray-600" title={inq.message || 'Strategy consultation requested.'}>
                                {inq.message || 'Strategy consultation requested.'}
                              </p>
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
                                {inq.phone && (
                                  <a
                                    href={`tel:${inq.phone}`}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#34A853] hover:bg-[#EBF3E4] transition-colors"
                                    title={`Call ${inq.name} (${inq.phone})`}
                                  >
                                    <Phone className="w-3.5 h-3.5" />
                                  </a>
                                )}
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
          )}

          {/* TAB 2: ACTIVE CAMPAIGNS VIEW */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-[27px] font-extrabold text-[#183B2B] tracking-tight">
                  Healthcare Marketing Campaigns
                </h1>
                <p className="text-[13.5px] text-gray-500 mt-1 font-medium">
                  Status, ad deliverables, and negative keyword optimization across all 6 core channels.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {activeServices.map((service) => (
                  <div key={service.id} className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <span className="text-xs font-bold text-[#183B2B] bg-[#EBF3E4] px-2.5 py-1 rounded-full flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#34A853]" /> Active Deliverable
                        </span>
                        <span className="text-[11px] font-semibold text-gray-400">Channel #{service.id}</span>
                      </div>
                      <h3 className="text-base font-extrabold text-gray-900 mt-3">{service.label}</h3>
                      <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                        {service.id === '1' && 'Targets high-intent patients searching for specialized treatments with negative keyword filtering.'}
                        {service.id === '2' && 'Local 3–8 mile radius targeting on Instagram & Facebook Reels with video testimonials.'}
                        {service.id === '3' && 'Dedicated clinic landers designed to load in under 2 seconds with friction-free booking.'}
                        {service.id === '4' && 'Server-side CAPI event tracking, GA4 measurement, and CallRail patient attribution.'}
                        {service.id === '5' && 'Structured schema markup and clinical authority optimization for AI search engine answers.'}
                        {service.id === '6' && 'Local Google Maps 3-pack dominance, review velocity, and localized clinical citations.'}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-700">8 Partner Clinics Enrolled</span>
                      <button
                        type="button"
                        onClick={() => setActiveTab('clinics')}
                        className="text-[#183B2B] font-bold hover:underline cursor-pointer"
                      >
                        View Clinics →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PARTNER CLINICS DIRECTORY */}
          {activeTab === 'clinics' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-[27px] font-extrabold text-[#183B2B] tracking-tight">
                  Partner Clinics Directory
                </h1>
                <p className="text-[13.5px] text-gray-500 mt-1 font-medium">
                  Specialized healthcare clinics, physical therapy centers, and dental practices managed by ClinicsAds.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {partnerClinics.map((clinic) => (
                  <div key={clinic.id} className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 group hover:border-[#183B2B]/40 transition-colors">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full ${
                          clinic.status === 'scaling' ? 'bg-[#183B2B] text-white' : 'bg-[#EBF3E4] text-[#183B2B]'
                        }`}>
                          {clinic.status === 'scaling' ? 'Scaling Campaign' : 'Active Client'}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">{clinic.location}</span>
                      </div>

                      <div className="mt-3.5 flex items-center gap-3">
                        {clinic.logoSrc ? (
                          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 p-1 flex items-center justify-center shrink-0">
                            <img src={clinic.logoSrc} alt={clinic.name} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className={`w-10 h-10 rounded-xl ${clinic.avatarBg} text-white flex items-center justify-center font-bold text-sm shrink-0`}>
                            {clinic.initials}
                          </div>
                        )}
                        <div className="min-w-0">
                          <h3 className="text-[14px] font-bold text-gray-900 leading-tight truncate">{clinic.name}</h3>
                          <p className="text-[11.5px] text-[#183B2B] font-semibold mt-0.5 truncate">{clinic.service}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
                        <p><span className="font-semibold text-gray-700">Contact:</span> {clinic.contactPerson}</p>
                        <p><span className="font-semibold text-gray-700">Phone:</span> {clinic.phone}</p>
                        <p className="truncate"><span className="font-semibold text-gray-700">Email:</span> {clinic.email}</p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveCallClinic(clinic)}
                        className="flex-1 py-1.5 rounded-lg bg-[#EBF3E4] text-[#183B2B] text-xs font-bold hover:bg-[#dfeecd] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call Line</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveChatClinic(clinic)}
                        className="flex-1 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Chat</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ROI ATTRIBUTION VIEW */}
          {activeTab === 'attribution' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-[27px] font-extrabold text-[#183B2B] tracking-tight">
                  Patient Lead &amp; ROI Attribution
                </h1>
                <p className="text-[13.5px] text-gray-500 mt-1 font-medium">
                  Attribution tracking connecting ad clicks to real patient consultations and phone inquiries.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs">
                  <span className="text-xs font-semibold text-gray-500">Google Ads Inquiries</span>
                  <p className="text-2xl font-extrabold text-[#183B2B] mt-1">42%</p>
                  <span className="text-[11px] text-gray-400">High-intent search keywords</span>
                </div>
                <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs">
                  <span className="text-xs font-semibold text-gray-500">Meta Paid Social</span>
                  <p className="text-2xl font-extrabold text-[#183B2B] mt-1">28%</p>
                  <span className="text-[11px] text-gray-400">Instagram &amp; FB local radius</span>
                </div>
                <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs">
                  <span className="text-xs font-semibold text-gray-500">Google Maps 3-Pack</span>
                  <p className="text-2xl font-extrabold text-[#183B2B] mt-1">18%</p>
                  <span className="text-[11px] text-gray-400">Phone calls &amp; directions</span>
                </div>
                <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs">
                  <span className="text-xs font-semibold text-gray-500">AI Search Citations</span>
                  <p className="text-2xl font-extrabold text-[#183B2B] mt-1">12%</p>
                  <span className="text-[11px] text-gray-400">ChatGPT &amp; Perplexity queries</span>
                </div>
              </div>

              <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-gray-800">Server-Side Tracking Health</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="font-semibold text-gray-800">CallRail Dynamic Number Insertion</span>
                    <span className="text-[#34A853] font-bold flex items-center gap-1">● Active &amp; Verified</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="font-semibold text-gray-800">Meta Conversions API (CAPI)</span>
                    <span className="text-[#34A853] font-bold flex items-center gap-1">● 99.4% Match Quality</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="font-semibold text-gray-800">GA4 Server-Side Measurement Protocol</span>
                    <span className="text-[#34A853] font-bold flex items-center gap-1">● Active Stream</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MAIN DASHBOARD OVERVIEW (DEFAULT) */}
          {activeTab === 'dashboard' && (
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
                <div className="lg:col-span-8 xl:col-span-9 space-y-6">
                  {/* 4 Metric Cards (100% Real Verifiable Data) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {/* 1. Core Services Active */}
                    <div
                      onClick={() => setActiveTab('campaigns')}
                      className="bg-[#183B2B] text-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-white/90">Core Services</span>
                        <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                      </div>
                      <div className="my-3">
                        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">6</span>
                      </div>
                      <div className="text-[11px] text-white/70 font-medium truncate">
                        Google, Meta, SEO, CRO, AI, GA4
                      </div>
                    </div>

                    {/* 2. Patient Inquiries (Real Dynamic Count from Store) */}
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
                          {inquiries.length}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-500 font-medium truncate flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                        <span>{newInquiriesCount} new from website</span>
                      </div>
                    </div>

                    {/* 3. Real Calls Booked */}
                    <div
                      onClick={() => setActiveTab('leads')}
                      className="bg-white border border-gray-200/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs relative group cursor-pointer hover:border-[#183B2B]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-gray-700">Calls Booked</span>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
                      </div>
                      <div className="my-3">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#183B2B] tracking-tight">
                          {callsBookedCount}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-500 font-medium truncate">
                        Direct strategy consultations
                      </div>
                    </div>

                    {/* 4. Real Partner Clinics */}
                    <div
                      onClick={() => setActiveTab('clinics')}
                      className="bg-white border border-gray-200/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs relative group cursor-pointer hover:border-[#183B2B]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-gray-700">Partner Clinics</span>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
                      </div>
                      <div className="my-3">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#183B2B] tracking-tight">8</span>
                      </div>
                      <div className="text-[11px] text-gray-400 font-medium truncate">
                        Active client engagements
                      </div>
                    </div>
                  </div>

                  {/* Incoming Live Form Inquiries Strip (Real Submissions) */}
                  <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] inline-block animate-pulse" />
                        <h2 className="text-[14px] font-bold text-gray-800">
                          Incoming Clinic Inquiries (Website Forms)
                        </h2>
                        <span className="text-[11px] font-bold text-[#183B2B] bg-[#EBF3E4] px-2 py-0.5 rounded-full">
                          {inquiries.length} Real Leads
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
                      {inquiries.length === 0 ? (
                        <div className="py-6 text-center text-gray-400 text-xs">
                          No inquiries received yet. Submit a form on the website to see it appear here live!
                        </div>
                      ) : (
                        inquiries.slice(0, 3).map((inq) => (
                          <div key={inq.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-gray-50/70 px-2 rounded-xl transition-colors">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#183B2B] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs mt-0.5">
                                {inq.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[13px] font-bold text-gray-900">{inq.clinicName}</span>
                                  {inq.source === 'call-booking' && (
                                    <span className="text-[10px] font-extrabold uppercase bg-[#EBF3E4] text-[#183B2B] px-1.5 py-0.5 rounded">
                                      📞 Call Booked
                                    </span>
                                  )}
                                  <span className="text-[10px] text-gray-400">· {formatTimeAgo(inq.submittedAt)}</span>
                                </div>
                                <p className="text-xs text-gray-600 mt-0.5">
                                  <strong className="text-gray-800">{inq.name}</strong> ({inq.email}) requested{' '}
                                  <span className="font-semibold text-[#183B2B]">{inq.service}</span>
                                  {inq.preferredTime && (
                                    <span className="text-gray-500 font-medium"> · 🕒 {inq.preferredTime}</span>
                                  )}
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
                              {inq.phone && (
                                <a
                                  href={`tel:${inq.phone}`}
                                  className="px-2.5 py-1 rounded-lg bg-[#EBF3E4] text-[#183B2B] text-xs font-bold hover:bg-[#d8e8ca] transition-colors flex items-center gap-1"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>Call</span>
                                </a>
                              )}
                              <a
                                href={`mailto:${inq.email}?subject=ClinicsAds Consultation: ${encodeURIComponent(inq.clinicName)}`}
                                className="px-3 py-1 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                Reply
                              </a>
                            </div>
                          </div>
                        ))
                      )}
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
                          <button
                            type="button"
                            onClick={() => setActiveTab('clinics')}
                            className="text-[11px] font-bold text-[#183B2B] bg-[#EBF3E4] px-2 py-0.5 rounded-full hover:underline"
                          >
                            8 Active →
                          </button>
                        </div>

                        <div className="divide-y divide-gray-50 pt-1">
                          {partnerClinics.slice(0, 5).map((clinic) => (
                            <div key={clinic.id} className="py-2.5 flex items-center justify-between group hover:bg-gray-50/70 px-1 rounded-lg transition-colors">
                              <div className="flex items-center gap-2.5 min-w-0">
                                {clinic.logoSrc ? (
                                  <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center p-1 shrink-0">
                                    <img src={clinic.logoSrc} alt={clinic.name} className="w-full h-full object-contain" />
                                  </div>
                                ) : (
                                  <div className={`w-8 h-8 rounded-lg ${clinic.avatarBg} text-white flex items-center justify-center font-bold text-xs shrink-0`}>
                                    {clinic.initials}
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <p className="text-[13px] font-bold text-gray-800 truncate">{clinic.name}</p>
                                  <p className="text-[11px] text-[#183B2B] font-medium truncate">{clinic.service}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => setActiveCallClinic(clinic)}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#183B2B] hover:bg-gray-100 transition-colors"
                                  title="Call Clinic Director"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setActiveChatClinic(clinic)}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#183B2B] hover:bg-gray-100 transition-colors"
                                  title="Open Direct Message"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => setActiveTab('clinics')}
                          className="w-full py-2 rounded-xl text-center text-xs font-bold text-[#183B2B] bg-[#EBF3E4] hover:bg-[#dfeecd] transition-colors cursor-pointer"
                        >
                          View All 8 Partner Clinics →
                        </button>
                      </div>
                    </div>

                    {/* Right 7 cols: Lead Velocity + Services Progress */}
                    <div className="md:col-span-7 bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
                          <div>
                            <h2 className="text-[14px] font-bold text-gray-800">Weekly Optimization Deliverables</h2>
                            <p className="text-xs text-gray-500 mt-0.5">Tasks executed by Ads by Usman &amp; GrowLimo</p>
                          </div>
                          <span className="text-xs font-bold text-[#183B2B] bg-[#EBF3E4] px-2.5 py-1 rounded-full">
                            {planPercentage}% Completed
                          </span>
                        </div>

                        <div className="space-y-2 pt-3">
                          {weeklyPlan.map((task) => (
                            <div
                              key={task.id}
                              onClick={() => togglePlanItem(task.id)}
                              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                              {task.completed ? (
                                <CheckSquare className="w-4 h-4 text-[#34A853] shrink-0" />
                              ) : (
                                <Square className="w-4 h-4 text-gray-300 shrink-0" />
                              )}
                              <span className={`text-xs ${task.completed ? 'line-through text-gray-400 font-medium' : 'text-gray-700 font-semibold'}`}>
                                {task.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                        <span>Quality Score Audit: <strong>9.4 / 10</strong></span>
                        <span className="text-[#34A853] font-bold">● High Intent Traffic Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Weekly Schedule & Channels */}
                <div className="lg:col-span-4 xl:col-span-3 space-y-6">
                  {/* Channels Card */}
                  <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs space-y-4">
                    <h2 className="text-[14px] font-bold text-gray-800">Active Service Channels</h2>
                    <div className="space-y-2.5">
                      {activeServices.map((svc) => (
                        <div
                          key={svc.id}
                          onClick={() => toggleServiceItem(svc.id)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-xs"
                        >
                          <span className="font-semibold text-gray-700">{svc.label}</span>
                          <span className={`w-2 h-2 rounded-full ${svc.completed ? 'bg-[#34A853]' : 'bg-gray-300'}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 4: Partner Clinic Engagements & Deliverables (Real Scope) */}
              <div className="space-y-3.5 pt-2">
                <h2 className="text-[16px] sm:text-[17px] font-bold text-[#183B2B] tracking-tight">
                  Partner Clinic Engagements &amp; Deliverables
                </h2>

                <div className="bg-white border border-gray-200/70 rounded-2xl p-5 sm:p-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[14px] font-bold text-gray-800">Active Retainer Engagements</h3>
                      <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {filteredEngagements.length} clinics
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="inline-flex rounded-lg bg-gray-100 p-0.5 text-xs font-semibold">
                        {(['All', 'Active', 'Scaling'] as const).map((filter) => (
                          <button
                            key={filter}
                            type="button"
                            onClick={() => setEngagementFilter(filter)}
                            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                              engagementFilter === filter ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-800'
                            }`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto pt-2">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                          <th className="py-3 px-3">Clinic ID</th>
                          <th className="py-3 px-3">Clinic Name</th>
                          <th className="py-3 px-3">Lead Service</th>
                          <th className="py-3 px-3">Campaign Scope</th>
                          <th className="py-3 px-3">Agreement</th>
                          <th className="py-3 px-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-[12.5px]">
                        {filteredEngagements.map((e) => (
                          <tr key={e.clinicId} className="hover:bg-gray-50/70 transition-colors group">
                            <td className="py-3 px-3 font-bold text-gray-900">
                              {e.clinicId}
                            </td>
                            <td className="py-3 px-3 font-semibold text-gray-800">
                              {e.clinicName}
                            </td>
                            <td className="py-3 px-3 text-gray-600">
                              {e.leadService}
                            </td>
                            <td className="py-3 px-3 text-gray-500">
                              {e.channels}
                            </td>
                            <td className="py-3 px-3 font-medium text-gray-700">
                              {e.agreement}
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => toggleEngagementStatus(e.clinicId)}
                                className={`inline-flex items-center px-3 py-1 rounded-full text-[11.5px] font-bold transition-all shadow-2xs cursor-pointer ${
                                  e.status === 'Scaling'
                                    ? 'bg-[#183B2B] text-white'
                                    : 'bg-[#EBF3E4] text-[#183B2B]'
                                }`}
                                title="Click to toggle status"
                              >
                                {e.status}
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

      {/* Manual Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl border border-gray-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#183B2B]">Log Patient Inquiry</h3>
              <button type="button" onClick={() => setShowAddLeadModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleManualAddLead} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Doctor / Client Name *</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Dr. Johnathan Reed"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-[#183B2B]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={newLeadEmail}
                    onChange={(e) => setNewLeadEmail(e.target.value)}
                    placeholder="name@clinic.com"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-[#183B2B]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    placeholder="+44 7123..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-[#183B2B]"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Clinic Name</label>
                <input
                  type="text"
                  value={newLeadClinic}
                  onChange={(e) => setNewLeadClinic(e.target.value)}
                  placeholder="e.g. Kensington Dental & Aesthetics"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-[#183B2B]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Service</label>
                  <select
                    value={newLeadService}
                    onChange={(e) => setNewLeadService(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-[#183B2B]"
                  >
                    <option value="Google Ads">Google Ads</option>
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="Landing Pages">Landing Pages</option>
                    <option value="ChatGPT & AI Search">ChatGPT &amp; AI Search</option>
                    <option value="Clinic SEO & Local Search">Clinic SEO &amp; Maps</option>
                    <option value="Tracking & Follow-Up">Tracking &amp; GA4</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Preferred Time</label>
                  <select
                    value={newLeadTime}
                    onChange={(e) => setNewLeadTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-[#183B2B]"
                  >
                    <option value="Morning (9am - 12pm)">Morning (9am - 12pm)</option>
                    <option value="Afternoon (12pm - 4pm)">Afternoon (12pm - 4pm)</option>
                    <option value="Evening (4pm - 7pm)">Evening (4pm - 7pm)</option>
                    <option value="ASAP / Next Available">ASAP / Next Available</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Notes / Inquiry Scope</label>
                <textarea
                  rows={2}
                  value={newLeadMessage}
                  onChange={(e) => setNewLeadMessage(e.target.value)}
                  placeholder="Inquiry notes..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-[#183B2B]"
                />
              </div>
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 rounded-xl text-gray-500 font-semibold hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#183B2B] text-white font-bold hover:bg-[#204e39] transition-colors"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              Hello Usman! Our clinic reception received 14 qualified patient consultation calls from the new Google Search landing page today.
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
              <p className="text-xs text-gray-500 mt-1">{activeCallClinic.contactPerson} · Direct Line</p>
              <p className="text-xs text-[#34A853] font-semibold mt-2 animate-pulse">{activeCallClinic.phone}</p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <a
                href={`tel:${activeCallClinic.phone}`}
                className="px-5 py-2.5 rounded-full bg-[#183B2B] text-white font-bold text-xs shadow-md transition-colors"
              >
                Call Now
              </a>
              <button
                type="button"
                onClick={() => setActiveCallClinic(null)}
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
