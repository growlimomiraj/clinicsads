import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  FileText,
  Users,
  GraduationCap,
  TrendingUp,
  HelpCircle,
  LogOut,
  Search,
  Settings,
  Bell,
  User,
  ExternalLink,
  MessageSquare,
  Phone,
  CheckSquare,
  Square,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  X,
  PhoneCall,
  Send,
  SlidersHorizontal,
  ChevronDown,
  Filter
} from 'lucide-react';

interface AdminDashboardProps {
  onExit: () => void;
}

interface OnlineTutor {
  id: string;
  name: string;
  avatarBg: string;
  initials: string;
  role: string;
  status: 'online' | 'busy' | 'away';
}

interface DueBilling {
  studentId: string;
  classCode: string;
  studentName: string;
  tutorName: string;
  startDate: string;
  fee: string;
  due: string;
  status: 'Received' | 'Pending';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports' | 'tutors' | 'students' | 'analytics'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Weekly Plan items with interactive toggle
  const [weeklyPlan, setWeeklyPlan] = useState([
    { id: '1', label: 'Webinar course', completed: false, icon: 'webinar' },
    { id: '2', label: 'Parents day', completed: false, icon: 'parents' },
    { id: '3', label: 'Discuss goals', completed: true, icon: 'goals' },
    { id: '4', label: 'Weekly meeting', completed: true, icon: 'meeting' },
    { id: '5', label: 'Tutor interview', completed: true, icon: 'interview' },
  ]);

  // Today's courses items with interactive toggle
  const [todayCourses, setTodayCourses] = useState([
    { id: '1', label: 'Statistics', completed: false },
    { id: '2', label: 'Public Speaking', completed: false },
    { id: '3', label: 'Digital Marketing', completed: false },
    { id: '4', label: 'English', completed: true },
    { id: '5', label: 'SMM', completed: true },
    { id: '6', label: 'Mathematics', completed: true },
  ]);

  // Online Tutors
  const tutors: OnlineTutor[] = [
    { id: '1', name: 'Dr Alice Meenss', avatarBg: 'bg-[#A77960]', initials: 'AM', role: 'Biology', status: 'online' },
    { id: '2', name: 'Dr Christopher Smith', avatarBg: 'bg-[#407B64]', initials: 'CS', role: 'Chemistry', status: 'online' },
    { id: '3', name: 'Mrs Monica Black', avatarBg: 'bg-[#4A7298]', initials: 'MB', role: 'Art & Design', status: 'online' },
    { id: '4', name: 'Mr Ralph Fare', avatarBg: 'bg-[#76828E]', initials: 'RF', role: 'History', status: 'online' },
    { id: '5', name: 'Ms Keith Rodman', avatarBg: 'bg-[#B68B4B]', initials: 'KR', role: 'Mathematics', status: 'online' },
    { id: '6', name: 'Dr Daniel Kha', avatarBg: 'bg-[#3A7E64]', initials: 'DK', role: 'Physics', status: 'online' },
    { id: '7', name: 'Ms Julie McLaren', avatarBg: 'bg-[#9C7058]', initials: 'JM', role: 'Literature', status: 'online' },
    { id: '8', name: 'Dr Marcus MesCaline', avatarBg: 'bg-[#A2624D]', initials: 'MM', role: 'Medicine', status: 'online' },
    { id: '9', name: 'Mr Maxim Accardo', avatarBg: 'bg-[#3B6B92]', initials: 'MA', role: 'Economics', status: 'online' },
  ];

  // Due Billings Table Data
  const [billings, setBillings] = useState<DueBilling[]>([
    { studentId: '2034789', classCode: 'A123', studentName: 'Susan Smith', tutorName: 'Dr Maxim Accardo', startDate: '01.01.2025', fee: '£1,300', due: '£800', status: 'Received' },
    { studentId: '3434118', classCode: 'A123', studentName: 'Alex Smith', tutorName: 'Mr Ralph Perry', startDate: '01.10.2024', fee: '£950', due: '£0', status: 'Received' },
    { studentId: '2035487', classCode: 'B12', studentName: 'Steven Black', tutorName: 'Ms Keith Rodman', startDate: '01.10.2024', fee: '£850', due: '£820', status: 'Pending' },
    { studentId: '1034786', classCode: 'A100', studentName: 'Anna-Maria Mur', tutorName: 'Dr Marcus MesCaline', startDate: '15.09.2024', fee: '£1,240', due: '£200', status: 'Received' },
    { studentId: '2065985', classCode: 'H78', studentName: 'Alice Rodman', tutorName: 'Ms Anna Long', startDate: '01.01.2025', fee: '£1,300', due: '£0', status: 'Received' },
    { studentId: '2001389', classCode: 'B134', studentName: 'Tom Pitt', tutorName: 'Mrs Anna Dickens', startDate: '15.07.2024', fee: '£250', due: '£0', status: 'Received' },
    { studentId: '2033789', classCode: 'G45', studentName: 'Alex Muller', tutorName: 'Dr Diana Lorens', startDate: '01.01.2025', fee: '£1,000', due: '£0', status: 'Received' },
    { studentId: '1134289', classCode: 'A123', studentName: 'Aria Brown', tutorName: 'Mr Arthur John', startDate: '01.01.2025', fee: '£550', due: '£150', status: 'Received' },
  ]);

  const [billingFilter, setBillingFilter] = useState<'All' | 'Received' | 'Pending'>('All');
  const [billingSearch, setBillingSearch] = useState('');

  // Modals for chat & call
  const [activeChatTutor, setActiveChatTutor] = useState<OnlineTutor | null>(null);
  const [activeCallTutor, setActiveCallTutor] = useState<OnlineTutor | null>(null);
  const [chatMessage, setChatMessage] = useState('');

  // Dynamic calculation of weekly plan completion percentage
  const planCompletedCount = weeklyPlan.filter(p => p.completed).length;
  const planPercentage = Math.round((planCompletedCount / weeklyPlan.length) * 100);

  const togglePlanItem = (id: string) => {
    setWeeklyPlan(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const toggleCourseItem = (id: string) => {
    setTodayCourses(prev =>
      prev.map(c => (c.id === id ? { ...c, completed: !c.completed } : c))
    );
  };

  const filteredBillings = useMemo(() => {
    return billings.filter(b => {
      const matchesFilter = billingFilter === 'All' || b.status === billingFilter;
      const q = billingSearch.toLowerCase();
      const matchesSearch =
        b.studentName.toLowerCase().includes(q) ||
        b.studentId.includes(q) ||
        b.tutorName.toLowerCase().includes(q) ||
        b.classCode.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [billings, billingFilter, billingSearch]);

  const toggleBillingStatus = (studentId: string) => {
    setBillings(prev =>
      prev.map(b => {
        if (b.studentId === studentId) {
          const nextStatus = b.status === 'Received' ? 'Pending' : 'Received';
          return { ...b, status: nextStatus };
        }
        return b;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F6F2] text-[#2D3748] font-sans flex flex-col selection:bg-[#183B2B] selection:text-white">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-gray-200/80 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-xs">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#183B2B] flex items-center justify-center text-white shadow-sm">
            {/* Hexagon / Graduation Academy Icon */}
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[17px] sm:text-[18px] font-extrabold text-[#183B2B] tracking-tight">
            SkillSphere Academy
          </span>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-[460px] mx-4 relative items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, tutors, billings..."
            className="w-full bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2 text-[13.5px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#183B2B] focus:ring-1 focus:ring-[#183B2B] transition-all"
          />
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Settings Button */}
          <button
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 text-gray-700 text-[13px] font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <span>Settings</span>
            <Settings className="w-3.5 h-3.5 text-gray-500" />
          </button>

          {/* Notifications Bell */}
          <button
            type="button"
            aria-label="View notifications"
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-[#34A853] absolute top-2 right-2 border-2 border-white" />
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-1 sm:pl-2">
            <div className="w-9 h-9 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-bold text-xs ring-2 ring-gray-100 cursor-pointer shadow-xs">
              AD
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-[13px] font-bold text-[#183B2B] leading-tight">Adam</p>
              <p className="text-[11px] text-gray-500 font-medium">Head Administrator</p>
            </div>
          </div>

          {/* Exit / Return to Main Website button */}
          <button
            type="button"
            onClick={onExit}
            className="ml-2 px-3 py-1.5 rounded-full bg-[#183B2B]/10 hover:bg-[#183B2B]/20 text-[#183B2B] text-xs font-semibold transition-colors cursor-pointer"
            title="Return to Main Website"
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
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all cursor-pointer ${
                activeTab === 'reports'
                  ? 'bg-[#EBF3E4] text-[#183B2B]'
                  : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900'
              }`}
            >
              <FileText className={`w-4 h-4 shrink-0 ${activeTab === 'reports' ? 'text-[#183B2B]' : 'text-gray-500'}`} />
              <span className="hidden md:inline">Reports</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('tutors')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all cursor-pointer ${
                activeTab === 'tutors'
                  ? 'bg-[#EBF3E4] text-[#183B2B]'
                  : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900'
              }`}
            >
              <Users className={`w-4 h-4 shrink-0 ${activeTab === 'tutors' ? 'text-[#183B2B]' : 'text-gray-500'}`} />
              <span className="hidden md:inline">Tutors</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all cursor-pointer ${
                activeTab === 'students'
                  ? 'bg-[#EBF3E4] text-[#183B2B]'
                  : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900'
              }`}
            >
              <GraduationCap className={`w-4 h-4 shrink-0 ${activeTab === 'students' ? 'text-[#183B2B]' : 'text-gray-500'}`} />
              <span className="hidden md:inline">Students</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-[#EBF3E4] text-[#183B2B]'
                  : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900'
              }`}
            >
              <TrendingUp className={`w-4 h-4 shrink-0 ${activeTab === 'analytics' ? 'text-[#183B2B]' : 'text-gray-500'}`} />
              <span className="hidden md:inline">Analytics</span>
            </button>
          </div>

          {/* Bottom Sidebar: Help & Logout */}
          <div className="space-y-1.5 pt-6 border-t border-gray-100">
            <button
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100/60 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-gray-400" />
              <span className="hidden md:inline">Help</span>
            </button>
            <button
              type="button"
              onClick={onExit}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium text-gray-500 hover:text-[#EA4335] hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Log out</span>
            </button>
          </div>
        </aside>

        {/* Content Canvas */}
        <main className="flex-1 p-4 sm:p-7 overflow-y-auto space-y-7">
          {/* Welcome Headline */}
          <div>
            <h1 className="text-2xl sm:text-[27px] font-extrabold text-[#183B2B] tracking-tight">
              Welcome back, Adam!
            </h1>
            <p className="text-[13.5px] text-gray-500 mt-1 font-medium">
              Plan, prioritize, and accomplish your tasks with ease.
            </p>
          </div>

          {/* Top Row: Main 4-Column Grid (Left 3 columns for main panels + Right 1 column for widgets) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 or 9 cols: Metric KPI Cards + Middle Content */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-6">
              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* 1. Total courses (Dark Forest Green Highlight Card) */}
                <div className="bg-[#183B2B] text-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-white/90">Total courses</span>
                    <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                  <div className="my-3">
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">134</span>
                  </div>
                  <div className="text-[11px] text-white/70 font-medium truncate">
                    Incl: 2 pending courses
                  </div>
                </div>

                {/* 2. Running Card (Clean White) */}
                <div className="bg-white border border-gray-200/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-gray-700">Running</span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
                  </div>
                  <div className="my-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#34A853] tracking-tight">42</span>
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium truncate">
                    Incl: 2 pending courses
                  </div>
                </div>

                {/* 3. Finished Card (Clean White) */}
                <div className="bg-white border border-gray-200/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-gray-700">Finished</span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
                  </div>
                  <div className="my-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#183B2B] tracking-tight">92</span>
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium truncate">
                    Excl: 2 pending courses
                  </div>
                </div>

                {/* 4. New Courses Card (Clean White) */}
                <div className="bg-white border border-gray-200/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-gray-700">New courses</span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
                  </div>
                  <div className="my-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#183B2B] tracking-tight">+28</span>
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium truncate">
                    Incl: 4 this week
                  </div>
                </div>
              </div>

              {/* Middle Section: Online (Left) + Project Progress & Calendar (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Online Tutors Column (5 cols) */}
                <div className="md:col-span-5 bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] inline-block animate-pulse" />
                        <h2 className="text-[14px] font-bold text-gray-800">Online</h2>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-700" />
                    </div>

                    <div className="divide-y divide-gray-50 pt-1">
                      {tutors.map((tutor) => (
                        <div key={tutor.id} className="py-2.5 flex items-center justify-between group hover:bg-gray-50/70 px-1 rounded-lg transition-colors">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-7 h-7 rounded-full ${tutor.avatarBg} text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-xs`}>
                              {tutor.initials}
                            </div>
                            <span className="text-[12.5px] font-semibold text-gray-800 truncate" title={tutor.name}>
                              {tutor.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => setActiveChatTutor(tutor)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#183B2B] hover:bg-[#EBF3E4] transition-colors cursor-pointer"
                              title={`Chat with ${tutor.name}`}
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveCallTutor(tutor)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#183B2B] hover:bg-[#EBF3E4] transition-colors cursor-pointer"
                              title={`Call ${tutor.name}`}
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Progress & Calendar (7 cols) */}
                <div className="md:col-span-7 space-y-5">
                  {/* Project Progress Bar Chart Card */}
                  <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-[14px] font-bold text-gray-800">Project progress</h2>
                        <p className="text-[11.5px] text-gray-400 font-medium mt-0.5">Weekly average: 12.3h</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-700" />
                    </div>

                    {/* Bar Chart Visualization matching reference */}
                    <div className="pt-6 pb-2">
                      <div className="h-32 flex items-end justify-between gap-3 px-3">
                        {/* Monday */}
                        <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                          <div className="w-full max-w-[28px] bg-[#374151] rounded-full h-20 group-hover:brightness-110 transition-all relative">
                            <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity">12h</span>
                          </div>
                          <span className="text-[11px] font-bold text-gray-600">M</span>
                        </div>

                        {/* Tuesday */}
                        <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                          <div className="w-full max-w-[28px] bg-[#E5E7EB] rounded-full h-10 group-hover:bg-gray-300 transition-all relative">
                            <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity">6h</span>
                          </div>
                          <span className="text-[11px] font-bold text-gray-600">T</span>
                        </div>

                        {/* Wednesday */}
                        <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                          <div className="w-full max-w-[28px] bg-[#374151] rounded-full h-14 group-hover:brightness-110 transition-all relative">
                            <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity">9h</span>
                          </div>
                          <span className="text-[11px] font-bold text-gray-600">W</span>
                        </div>

                        {/* Thursday */}
                        <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                          <div className="w-full max-w-[28px] bg-[#374151] rounded-full h-18 group-hover:brightness-110 transition-all relative">
                            <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity">11h</span>
                          </div>
                          <span className="text-[11px] font-bold text-gray-600">T</span>
                        </div>

                        {/* Friday (Highlighted with 17h badge & #183B2B color) */}
                        <div className="flex-1 flex flex-col items-center gap-2 relative group cursor-pointer">
                          <span className="text-[11px] font-bold text-white bg-[#183B2B] px-2 py-0.5 rounded-full shadow-xs mb-1">
                            17h
                          </span>
                          <div className="w-full max-w-[28px] bg-[#183B2B] rounded-full h-24 ring-2 ring-[#99BC44]/30 shadow-xs group-hover:brightness-110 transition-all" />
                          <span className="text-[11px] font-extrabold text-[#183B2B]">F</span>
                        </div>

                        {/* Saturday */}
                        <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                          <div className="w-full max-w-[28px] bg-[#E5E7EB] rounded-full h-8 group-hover:bg-gray-300 transition-all relative">
                            <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity">4h</span>
                          </div>
                          <span className="text-[11px] font-bold text-gray-600">S</span>
                        </div>

                        {/* Sunday */}
                        <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                          <div className="w-full max-w-[28px] bg-[#E5E7EB] rounded-full h-10 group-hover:bg-gray-300 transition-all relative">
                            <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity">5h</span>
                          </div>
                          <span className="text-[11px] font-bold text-gray-600">S</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Calendar Timetable Card */}
                  <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <h2 className="text-[14px] font-bold text-gray-800">Calendar</h2>
                      <ExternalLink className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-700" />
                    </div>

                    <div className="pt-3">
                      {/* Day Columns */}
                      <div className="grid grid-cols-7 text-center text-[11px] font-bold text-gray-500 pb-3 border-b border-dashed border-gray-200">
                        <span>M</span>
                        <span>T</span>
                        <span>W</span>
                        <span>T</span>
                        <span className="text-[#183B2B] font-extrabold">F</span>
                        <span>S</span>
                        <span>S</span>
                      </div>

                      {/* Timetable Events */}
                      <div className="pt-3 space-y-2.5 relative">
                        {/* Event 1: English */}
                        <div className="flex items-center justify-between bg-[#374151] text-white px-3.5 py-2 rounded-xl text-[12px] shadow-xs">
                          <div>
                            <span className="font-bold block">English</span>
                            <span className="text-[10px] text-gray-300">Alina &amp; Daniel</span>
                          </div>
                          <div className="flex -space-x-1.5 overflow-hidden">
                            <div className="w-5 h-5 rounded-full bg-amber-400 border border-[#374151]" />
                            <div className="w-5 h-5 rounded-full bg-emerald-400 border border-[#374151]" />
                          </div>
                        </div>

                        {/* Event 2: Art Fundamentals */}
                        <div className="flex items-center justify-between bg-[#F3F4F6] text-gray-800 px-3.5 py-2 rounded-xl text-[12px] border border-gray-200/60 shadow-xs">
                          <div>
                            <span className="font-bold block">Art fundamentals</span>
                            <span className="text-[10px] text-gray-500">Monica &amp; Christopher</span>
                          </div>
                          <div className="flex -space-x-1.5 overflow-hidden">
                            <div className="w-5 h-5 rounded-full bg-blue-400 border border-white" />
                            <div className="w-5 h-5 rounded-full bg-green-500 border border-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Weekly Plan & Today's Courses Widgets */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-6">
              {/* Widget 1: Weekly Plan with SVG Donut Progress Chart */}
              <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-[14px] font-bold text-gray-800">Weekly plan</h2>
                  <ExternalLink className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-700" />
                </div>

                {/* Circular Gauge / Donut Progress Chart */}
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      {/* Background track circle */}
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
                      {/* Active green progress arc */}
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

                {/* Checklist items */}
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
                        <span className={`text-[12.5px] font-medium transition-colors ${item.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                          {item.label}
                        </span>
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

              {/* Widget 2: Today's Courses (Dark Forest Green Card) */}
              <div className="bg-[#183B2B] text-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[14px] font-bold text-white">Today&apos;s courses</h2>
                  <ExternalLink className="w-4 h-4 text-white/70 hover:text-white cursor-pointer" />
                </div>

                <div className="space-y-2.5">
                  {todayCourses.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => toggleCourseItem(course.id)}
                      className="flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white/90">
                          <GraduationCap className="w-3.5 h-3.5" />
                        </div>
                        <span className={`text-[12.5px] font-semibold transition-colors ${course.completed ? 'text-white/50 line-through' : 'text-white'}`}>
                          {course.label}
                        </span>
                      </div>
                      <div>
                        {course.completed ? (
                          <CheckSquare className="w-4 h-4 text-[#99BC44]" />
                        ) : (
                          <Square className="w-4 h-4 text-white/40 group-hover:text-white" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: January report review (3 Line Chart Sparkline Cards) */}
          <div className="space-y-3.5 pt-2">
            <h2 className="text-[16px] sm:text-[17px] font-bold text-[#183B2B] tracking-tight">
              January report review
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Sparkline 1: Website visits */}
              <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-gray-700">Website visits</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer" />
                </div>
                <div className="mt-2.5">
                  <span className="text-3xl font-extrabold text-[#183B2B] tracking-tight">198</span>
                  <div className="flex items-center gap-1.5 text-[11.5px] text-[#34A853] font-semibold mt-0.5">
                    <span>2.6 more than usual</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* SVG Line Chart */}
                <div className="pt-4">
                  <svg className="w-full h-24 overflow-visible" viewBox="0 0 240 80">
                    <line x1="0" y1="20" x2="240" y2="20" stroke="#E5E7EB" strokeDasharray="3 3" />
                    <line x1="0" y1="45" x2="240" y2="45" stroke="#E5E7EB" strokeDasharray="3 3" />
                    <line x1="0" y1="70" x2="240" y2="70" stroke="#E5E7EB" strokeDasharray="3 3" />
                    {/* Area gradient */}
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
                    <span>Jan 25</span>
                    <span>Feb 25</span>
                  </div>
                </div>
              </div>

              {/* Sparkline 2: Returning visits */}
              <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-gray-700">Returning visits</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer" />
                </div>
                <div className="mt-2.5">
                  <span className="text-3xl font-extrabold text-[#183B2B] tracking-tight">46</span>
                  <div className="flex items-center gap-1.5 text-[11.5px] text-[#34A853] font-semibold mt-0.5">
                    <span>1.4 more than usual</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* SVG Line Chart */}
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
                    <span>Jan 25</span>
                    <span>Feb 25</span>
                  </div>
                </div>
              </div>

              {/* Sparkline 3: Special visitors */}
              <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-gray-700">Special visitors</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer" />
                </div>
                <div className="mt-2.5">
                  <span className="text-3xl font-extrabold text-[#183B2B] tracking-tight">14</span>
                  <div className="flex items-center gap-1.5 text-[11.5px] text-[#34A853] font-semibold mt-0.5">
                    <span>1.2 more than usual</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* SVG Line Chart */}
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
                    <span>Jan 25</span>
                    <span>Feb 25</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Track due billings (Upcoming Payments Table) */}
          <div className="space-y-3.5 pt-2">
            <h2 className="text-[16px] sm:text-[17px] font-bold text-[#183B2B] tracking-tight">
              Track due billings
            </h2>

            <div className="bg-white border border-gray-200/70 rounded-2xl p-5 sm:p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <h3 className="text-[14px] font-bold text-gray-800">Upcoming payments</h3>
                  <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {filteredBillings.length} records
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Status Filter Buttons */}
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

              {/* Data Table */}
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                      <th className="py-3 px-3">Student ID</th>
                      <th className="py-3 px-3">Class</th>
                      <th className="py-3 px-3">Student name</th>
                      <th className="py-3 px-3">Tutor name</th>
                      <th className="py-3 px-3">Start date</th>
                      <th className="py-3 px-3">Fee</th>
                      <th className="py-3 px-3">Due</th>
                      <th className="py-3 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-[12.5px]">
                    {filteredBillings.map((b) => (
                      <tr key={b.studentId} className="hover:bg-gray-50/70 transition-colors group">
                        <td className="py-3 px-3 font-bold text-gray-900">
                          {b.studentId}
                        </td>
                        <td className="py-3 px-3 font-medium text-gray-600">
                          {b.classCode}
                        </td>
                        <td className="py-3 px-3 font-semibold text-gray-800">
                          {b.studentName}
                        </td>
                        <td className="py-3 px-3 text-gray-600">
                          {b.tutorName}
                        </td>
                        <td className="py-3 px-3 text-gray-500">
                          {b.startDate}
                        </td>
                        <td className="py-3 px-3 font-medium text-gray-700">
                          {b.fee}
                        </td>
                        <td className="py-3 px-3 font-bold text-gray-900">
                          {b.due}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => toggleBillingStatus(b.studentId)}
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
        </main>
      </div>

      {/* Mini Chat Modal when clicking tutor chat */}
      {activeChatTutor && (
        <div className="fixed bottom-4 right-4 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="bg-[#183B2B] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full ${activeChatTutor.avatarBg} flex items-center justify-center text-xs font-bold`}>
                {activeChatTutor.initials}
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">{activeChatTutor.name}</p>
                <p className="text-[10px] text-white/70">{activeChatTutor.role} · Active now</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveChatTutor(null)}
              className="text-white/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 h-48 overflow-y-auto bg-gray-50 text-xs space-y-2">
            <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-2xs max-w-[85%] text-gray-700">
              Hello Adam! I have finished updating the coursework materials for today&apos;s session.
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
              placeholder="Write a message..."
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

      {/* Mini Call Modal when clicking tutor call */}
      {activeCallTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl border border-gray-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className={`w-20 h-20 rounded-full ${activeCallTutor.avatarBg} text-white mx-auto flex items-center justify-center text-2xl font-bold shadow-lg ring-8 ring-green-50`}>
              {activeCallTutor.initials}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{activeCallTutor.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{activeCallTutor.role} · Direct Voice Channel</p>
              <p className="text-xs text-[#34A853] font-semibold mt-2 animate-pulse">Calling...</p>
            </div>
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setActiveCallTutor(null)}
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
