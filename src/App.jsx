import { useState, useMemo, useCallback } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, CartesianGrid, Legend } from "recharts";
import { Search, Bell, Settings, ChevronRight, ChevronDown, Filter, Plus, Send, Target, Zap, Users, Building2, Mail, LayoutDashboard, GitBranch, BookOpen, TrendingUp, Clock, CheckCircle, AlertTriangle, ArrowUpRight, ArrowDownRight, MoreHorizontal, Star, Phone, Linkedin, Video, Eye, Edit3, X, ChevronLeft, Activity, Award, Briefcase, Globe, MapPin, Calendar, MessageSquare, PlayCircle, PauseCircle, BarChart3, CircleDot, UserCheck, FileText } from "lucide-react";

// ═══════════════════════════════════════════
// REAL DATA FROM IMPROZO GTM-OS
// ═══════════════════════════════════════════

const ACCOUNTS = [
  { id: 1, name: "Novartis", tier: 1, gccLocation: "Hyderabad", headcount: "3,000+", revenue: "$50B+", status: "active", icpScore: 23, owner: "Tirth Ray", stage: "Enrichment", signals: 4, contacts: 12, lastActivity: "2d ago", logo: "N", color: "#0460A9", industry: "Pharma", notes: "Strong GCC presence. Multiple AI/ML initiatives underway." },
  { id: 2, name: "Bristol Myers Squibb", tier: 1, gccLocation: "Hyderabad", headcount: "2,500+", revenue: "$45B+", status: "cooling", icpScore: 22, owner: "Tirth Ray", stage: "Monitoring", signals: 3, contacts: 8, lastActivity: "1w ago", logo: "B", color: "#BE2BBB", industry: "Pharma", notes: "Tirth's former employer. Cooling period — warm intro possible via alumni." },
  { id: 3, name: "Amgen", tier: 1, gccLocation: "Hyderabad", headcount: "1,500+", revenue: "$26B+", status: "active", icpScore: 21, owner: "Tirth Ray", stage: "Enrichment", signals: 3, contacts: 6, lastActivity: "3d ago", logo: "A", color: "#0063BE", industry: "Biotech", notes: "Expanding Hyderabad operations. Databricks adoption in progress." },
  { id: 4, name: "Sanofi", tier: 1, gccLocation: "Hyderabad", headcount: "2,000+", revenue: "$44B+", status: "active", icpScore: 20, owner: "Tirth Ray", stage: "Enrichment", signals: 5, contacts: 9, lastActivity: "1d ago", logo: "S", color: "#7B2D8E", industry: "Pharma", notes: "GBS hub active. Veeva migration signals detected." },
  { id: 5, name: "Pfizer", tier: 1, gccLocation: "Multiple India", headcount: "2,000+", revenue: "$58B+", status: "active", icpScore: 19, owner: "Tirth Ray", stage: "Enrichment", signals: 2, contacts: 5, lastActivity: "5d ago", logo: "P", color: "#0093D0", industry: "Pharma", notes: "Alumni connection angle for Tirth. Multiple India locations." },
  { id: 6, name: "AstraZeneca", tier: 1, gccLocation: "India Ops", headcount: "1,200+", revenue: "$45B+", status: "active", icpScore: 18, owner: "Tirth Ray", stage: "Enrichment", signals: 2, contacts: 4, lastActivity: "1w ago", logo: "Z", color: "#830051", industry: "Pharma", notes: "Expanding India operations. Data platform modernization signals." },
  { id: 7, name: "Roche", tier: 2, gccLocation: "India", headcount: "800+", revenue: "$65B+", status: "monitoring", icpScore: 15, owner: "Unassigned", stage: "Research", signals: 1, contacts: 2, lastActivity: "2w ago", logo: "R", color: "#0066CC", industry: "Pharma", notes: "Strong diagnostics + pharma. India presence growing." },
  { id: 8, name: "Merck / MSD", tier: 2, gccLocation: "India", headcount: "1,000+", revenue: "$60B+", status: "monitoring", icpScore: 14, owner: "Unassigned", stage: "Research", signals: 1, contacts: 3, lastActivity: "2w ago", logo: "M", color: "#00857C", industry: "Pharma", notes: "IT hub in India. Commercial analytics build-out." },
  { id: 9, name: "GSK", tier: 2, gccLocation: "India", headcount: "700+", revenue: "$36B+", status: "monitoring", icpScore: 13, owner: "Unassigned", stage: "Research", signals: 1, contacts: 2, lastActivity: "3w ago", logo: "G", color: "#F36633", industry: "Pharma", notes: "Consumer health spin-off creating new analytics needs." },
  { id: 10, name: "Eli Lilly", tier: 2, gccLocation: "India", headcount: "600+", revenue: "$35B+", status: "monitoring", icpScore: 12, owner: "Unassigned", stage: "Research", signals: 0, contacts: 1, lastActivity: "1m ago", logo: "L", color: "#D52B1E", industry: "Pharma", notes: "Fast-growing. GLP-1 revenue surge driving tech investment." },
];

const SIGNALS = [
  { id: 1, type: "Job Posting", account: "Sanofi", detail: "Hiring 5x Databricks Engineers for Hyderabad GBS", score: 14, recency: 5, relevance: 5, authority: 4, date: "2026-03-11", status: "hot", weight: "HIGH" },
  { id: 2, type: "Leadership Change", account: "Novartis", detail: "New VP Data & Analytics appointed for GCC India", score: 13, recency: 4, relevance: 5, authority: 4, date: "2026-03-09", status: "hot", weight: "HIGH" },
  { id: 3, type: "Technology Signal", account: "Amgen", detail: "Databricks adoption — posting for platform engineers", score: 12, recency: 4, relevance: 4, authority: 4, date: "2026-03-08", status: "hot", weight: "MEDIUM-HIGH" },
  { id: 4, type: "Job Change", account: "Novartis", detail: "New Director of Commercial Analytics joined from Roche", score: 12, recency: 5, relevance: 4, authority: 3, date: "2026-03-10", status: "hot", weight: "HIGH" },
  { id: 5, type: "Veeva Migration", account: "Sanofi", detail: "CRM-to-Vault migration RFP expected Q2 2026", score: 11, recency: 3, relevance: 5, authority: 3, date: "2026-03-05", status: "warm", weight: "MEDIUM-HIGH" },
  { id: 6, type: "GCC Expansion", account: "Sanofi", detail: "New floor lease signed — 200 additional seats in Hyderabad", score: 10, recency: 4, relevance: 3, authority: 3, date: "2026-03-07", status: "warm", weight: "MEDIUM" },
  { id: 7, type: "Content Engagement", account: "Novartis", detail: "VP Data liked post on Agentic AI in pharma", score: 9, recency: 4, relevance: 3, authority: 2, date: "2026-03-10", status: "warm", weight: "MEDIUM" },
  { id: 8, type: "Job Posting", account: "Amgen", detail: "Hiring Veeva Technical Architect — Hyderabad", score: 9, recency: 3, relevance: 4, authority: 2, date: "2026-03-06", status: "warm", weight: "HIGH" },
  { id: 9, type: "Event Attendance", account: "Pfizer", detail: "Commercial IT head registered for NASSCOM GCC Summit", score: 8, recency: 3, relevance: 3, authority: 2, date: "2026-03-04", status: "warm", weight: "MEDIUM" },
  { id: 10, type: "Technology Signal", account: "AstraZeneca", detail: "Snowflake partnership announcement for India data hub", score: 8, recency: 3, relevance: 3, authority: 2, date: "2026-03-03", status: "warm", weight: "MEDIUM-HIGH" },
  { id: 11, type: "Job Posting", account: "BMS", detail: "AI/ML Lead — Commercial Analytics, Hyderabad", score: 7, recency: 2, relevance: 3, authority: 2, date: "2026-02-28", status: "monitor", weight: "HIGH" },
  { id: 12, type: "Content Engagement", account: "Pfizer", detail: "Director SFE engaged with GCC analytics content", score: 6, recency: 3, relevance: 2, authority: 1, date: "2026-03-01", status: "monitor", weight: "MEDIUM" },
];

const CONTACTS = [
  { id: 1, name: "Rajesh Kumar", title: "VP Data & Analytics", account: "Novartis", persona: "Data/AI Leader", email: "r.kumar@novartis.com", linkedin: true, phone: true, icpScore: 5, signalScore: 13, status: "hot", lastEngagement: "2d ago", sequence: "Tier 1 — Day 2" },
  { id: 2, name: "Priya Sharma", title: "Director Commercial Analytics", account: "Novartis", persona: "Commercial Tech Leader", email: "p.sharma@novartis.com", linkedin: true, phone: false, icpScore: 4, signalScore: 12, status: "hot", lastEngagement: "3d ago", sequence: "Tier 1 — Day 1" },
  { id: 3, name: "Amit Patel", title: "Head of GCC Operations", account: "Sanofi", persona: "GCC Builder", email: "a.patel@sanofi.com", linkedin: true, phone: true, icpScore: 5, signalScore: 14, status: "hot", lastEngagement: "1d ago", sequence: "Tier 1 — Day 4" },
  { id: 4, name: "Deepa Menon", title: "VP Commercial IT", account: "Sanofi", persona: "Commercial Tech Leader", email: "d.menon@sanofi.com", linkedin: true, phone: false, icpScore: 4, signalScore: 11, status: "warm", lastEngagement: "5d ago", sequence: "Tier 1 — Day 1" },
  { id: 5, name: "Vikram Singh", title: "Director AI/ML", account: "Amgen", persona: "Data/AI Leader", email: "v.singh@amgen.com", linkedin: true, phone: true, icpScore: 4, signalScore: 12, status: "hot", lastEngagement: "3d ago", sequence: "Tier 1 — Day 2" },
  { id: 6, name: "Neha Gupta", title: "Head of Data Platform", account: "Amgen", persona: "Data/AI Leader", email: "n.gupta@amgen.com", linkedin: true, phone: false, icpScore: 3, signalScore: 9, status: "warm", lastEngagement: "1w ago", sequence: "Not started" },
  { id: 7, name: "Suresh Reddy", title: "GCC Site Lead", account: "Pfizer", persona: "GCC Builder", email: "s.reddy@pfizer.com", linkedin: true, phone: true, icpScore: 5, signalScore: 8, status: "warm", lastEngagement: "5d ago", sequence: "Tier 1 — Day 1" },
  { id: 8, name: "Kavitha Nair", title: "Director Digital Transformation", account: "AstraZeneca", persona: "Transformation Lead", email: "k.nair@astrazeneca.com", linkedin: true, phone: false, icpScore: 4, signalScore: 8, status: "warm", lastEngagement: "1w ago", sequence: "Not started" },
  { id: 9, name: "Rahul Mehta", title: "VP SFE Technology", account: "BMS", persona: "Commercial Tech Leader", email: "r.mehta@bms.com", linkedin: true, phone: true, icpScore: 5, signalScore: 7, status: "cooling", lastEngagement: "2w ago", sequence: "Paused" },
  { id: 10, name: "Anita Joshi", title: "Head Analytics CoE", account: "Roche", persona: "Data/AI Leader", email: "a.joshi@roche.com", linkedin: true, phone: false, icpScore: 3, signalScore: 5, status: "monitor", lastEngagement: "3w ago", sequence: "Not started" },
];

const SEQUENCES = [
  { id: 1, name: "Tier 1 — Signal Hot", tier: 1, steps: 10, duration: "14 days", active: 4, completed: 0, paused: 1, channels: ["Email", "LinkedIn", "Phone", "Video"], status: "active" },
  { id: 2, name: "Tier 2 — Warm Nurture", tier: 2, steps: 7, duration: "21 days", active: 2, completed: 0, paused: 0, channels: ["Email", "LinkedIn"], status: "active" },
  { id: 3, name: "Tier 3 — Standard", tier: 3, steps: 5, duration: "30 days", active: 0, completed: 0, paused: 0, channels: ["Email"], status: "draft" },
  { id: 4, name: "Veeva Migration Specialist", tier: 1, steps: 8, duration: "14 days", active: 2, completed: 0, paused: 0, channels: ["Email", "LinkedIn", "Phone"], status: "active" },
];

const PIPELINE_STAGES = [
  { name: "Research", deals: [
    { id: 1, account: "Roche", value: "TBD", probability: 5, owner: "Unassigned", days: 14, color: "#0066CC" },
    { id: 2, account: "Merck / MSD", value: "TBD", probability: 5, owner: "Unassigned", days: 14, color: "#00857C" },
    { id: 3, account: "GSK", value: "TBD", probability: 5, owner: "Unassigned", days: 21, color: "#F36633" },
  ]},
  { name: "Enrichment", deals: [
    { id: 4, account: "Novartis", value: "$200K-500K", probability: 15, owner: "Tirth Ray", days: 7, color: "#0460A9" },
    { id: 5, account: "Amgen", value: "$150K-300K", probability: 10, owner: "Tirth Ray", days: 10, color: "#0063BE" },
    { id: 6, account: "Sanofi", value: "$200K-400K", probability: 15, owner: "Tirth Ray", days: 5, color: "#7B2D8E" },
    { id: 7, account: "AstraZeneca", value: "$100K-250K", probability: 10, owner: "Tirth Ray", days: 7, color: "#830051" },
    { id: 8, account: "Pfizer", value: "$150K-350K", probability: 10, owner: "Tirth Ray", days: 12, color: "#0093D0" },
  ]},
  { name: "Outreach", deals: [] },
  { name: "Meeting Booked", deals: [] },
  { name: "Proposal", deals: [] },
  { name: "Negotiation", deals: [] },
  { name: "Closed Won", deals: [] },
];

const TIER1_SEQUENCE_STEPS = [
  { day: 1, channel: "Email", action: "Signal-based personalized email", template: "new-hire-signal", status: "sent" },
  { day: 2, channel: "LinkedIn", action: "Connection + personalized note", template: null, status: "sent" },
  { day: 4, channel: "Email", action: "Follow-up with insight/case study", template: "follow-up-1", status: "scheduled" },
  { day: 5, channel: "LinkedIn", action: "Engage with their recent post", template: null, status: "scheduled" },
  { day: 7, channel: "Email", action: "Value-add: benchmarking data or trend report", template: "follow-up-2", status: "pending" },
  { day: 8, channel: "Phone", action: "Warm call — ask for 15-min meeting", template: null, status: "pending" },
  { day: 10, channel: "LinkedIn", action: "DM: 'Worth a quick call?'", template: null, status: "pending" },
  { day: 11, channel: "Video", action: "HeyGen 60-sec personalized video", template: "heygen-intro", status: "pending" },
  { day: 14, channel: "Email", action: "Breakup: 'Last note' with clear CTA", template: "breakup", status: "pending" },
];

const DASHBOARD_METRICS = {
  totalAccounts: 10, tier1: 6, tier2: 4,
  totalContacts: 52, enriched: 38, verified: 31,
  activeSignals: 12, hotSignals: 4, warmSignals: 6,
  sequencesActive: 8, emailsSent: 24, responses: 3,
  pipelineValue: "$800K-$1.8M", meetingsBooked: 0,
};

const ACTIVITY_FEED = [
  { time: "2h ago", type: "signal", text: "New signal: Sanofi hiring 5x Databricks Engineers", icon: "zap" },
  { time: "3h ago", type: "email", text: "Email sent to Amit Patel (Sanofi) — Day 4 follow-up", icon: "mail" },
  { time: "1d ago", type: "signal", text: "Novartis VP Data liked Agentic AI post on LinkedIn", icon: "zap" },
  { time: "1d ago", type: "sequence", text: "Priya Sharma (Novartis) entered Tier 1 sequence", icon: "play" },
  { time: "2d ago", type: "enrichment", text: "12 new contacts enriched for Novartis via Apollo", icon: "users" },
  { time: "2d ago", type: "signal", text: "New signal: Novartis — New VP Data & Analytics appointed", icon: "zap" },
  { time: "3d ago", type: "email", text: "Email sent to Rajesh Kumar (Novartis) — Day 1 intro", icon: "mail" },
  { time: "3d ago", type: "enrichment", text: "6 contacts enriched for Amgen — 4 verified", icon: "users" },
  { time: "5d ago", type: "sequence", text: "Suresh Reddy (Pfizer) entered Tier 1 sequence", icon: "play" },
  { time: "1w ago", type: "signal", text: "AstraZeneca Snowflake partnership for India data hub", icon: "zap" },
];

// ═══════════════════════════════════════════
// UTILITY COMPONENTS
// ═══════════════════════════════════════════

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    hot: "bg-red-50 text-red-700 border border-red-200",
    warm: "bg-amber-50 text-amber-700 border border-amber-200",
    cool: "bg-blue-50 text-blue-700 border border-blue-200",
    monitor: "bg-slate-50 text-slate-600 border border-slate-200",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    tier1: "bg-violet-50 text-violet-700 border border-violet-200",
    tier2: "bg-sky-50 text-sky-700 border border-sky-200",
    tier3: "bg-slate-50 text-slate-600 border border-slate-200",
    active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    draft: "bg-slate-50 text-slate-500 border border-slate-200",
    paused: "bg-amber-50 text-amber-600 border border-amber-200",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.default} ${className}`}>{children}</span>;
};

const MetricCard = ({ label, value, sub, icon: Icon, trend, trendDir, color = "violet" }) => {
  const colors = { violet: "from-violet-500 to-violet-600", sky: "from-sky-500 to-sky-600", emerald: "from-emerald-500 to-emerald-600", amber: "from-amber-500 to-amber-600", red: "from-red-500 to-red-600", indigo: "from-indigo-500 to-indigo-600" };
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
        </div>
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors[color]} flex items-center justify-center`}>
          <Icon size={18} className="text-white" />
        </div>
      </div>
      {trend && (
        <div className={`flex items-center mt-3 text-xs font-medium ${trendDir === "up" ? "text-emerald-600" : "text-red-500"}`}>
          {trendDir === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span className="ml-1">{trend}</span>
        </div>
      )}
    </div>
  );
};

const ScoreBadge = ({ score, max = 25 }) => {
  const pct = (score / max) * 100;
  const color = pct >= 75 ? "text-red-600 bg-red-50 border-red-200" : pct >= 50 ? "text-amber-600 bg-amber-50 border-amber-200" : pct >= 30 ? "text-sky-600 bg-sky-50 border-sky-200" : "text-slate-500 bg-slate-50 border-slate-200";
  return <span className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border text-sm font-bold ${color}`}>{score}</span>;
};

const ChannelIcon = ({ channel, size = 14 }) => {
  switch (channel) {
    case "Email": return <Mail size={size} />;
    case "LinkedIn": return <Linkedin size={size} />;
    case "Phone": return <Phone size={size} />;
    case "Video": return <Video size={size} />;
    default: return <MessageSquare size={size} />;
  }
};

const SignalTypeIcon = ({ type }) => {
  const map = { "Job Posting": "bg-blue-100 text-blue-600", "Job Change": "bg-violet-100 text-violet-600", "Leadership Change": "bg-red-100 text-red-600", "Technology Signal": "bg-emerald-100 text-emerald-600", "Veeva Migration": "bg-amber-100 text-amber-600", "GCC Expansion": "bg-sky-100 text-sky-600", "Content Engagement": "bg-pink-100 text-pink-600", "Event Attendance": "bg-indigo-100 text-indigo-600", "RFP": "bg-red-100 text-red-700" };
  return <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs ${map[type] || "bg-slate-100 text-slate-600"}`}><Zap size={14} /></span>;
};

// ═══════════════════════════════════════════
// SCREEN: DASHBOARD
// ═══════════════════════════════════════════

const DashboardScreen = ({ setActiveScreen, setSelectedAccount }) => {
  const signalsByType = useMemo(() => {
    const counts = {};
    SIGNALS.forEach(s => { counts[s.type] = (counts[s.type] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name: name.length > 15 ? name.slice(0, 14) + "..." : name, value }));
  }, []);

  const pipelineChart = useMemo(() => PIPELINE_STAGES.map(s => ({ name: s.name.length > 8 ? s.name.slice(0, 7) + "..." : s.name, count: s.deals.length })), []);

  const weeklyActivity = [
    { day: "Mon", emails: 4, signals: 2, enriched: 6 },
    { day: "Tue", emails: 6, signals: 1, enriched: 12 },
    { day: "Wed", emails: 3, signals: 3, enriched: 4 },
    { day: "Thu", emails: 8, signals: 4, enriched: 8 },
    { day: "Fri", emails: 3, signals: 2, enriched: 8 },
  ];

  const COLORS = ["#7c3aed", "#0ea5e9", "#f59e0b", "#10b981", "#ef4444", "#6366f1", "#ec4899", "#14b8a6"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">GTM Command Center</h1>
          <p className="text-sm text-slate-500 mt-1">Improzo Pipeline & Outreach Hub — Phase v1.0</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Last sync: 2h ago</span>
          <button className="px-3 py-1.5 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 flex items-center gap-1.5"><Zap size={14} /> Run Signal Scan</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard label="Target Accounts" value={DASHBOARD_METRICS.totalAccounts} sub={`${DASHBOARD_METRICS.tier1} Tier 1 · ${DASHBOARD_METRICS.tier2} Tier 2`} icon={Building2} color="violet" />
        <MetricCard label="Contacts" value={DASHBOARD_METRICS.totalContacts} sub={`${DASHBOARD_METRICS.verified} verified`} icon={Users} color="sky" trend="+12 this week" trendDir="up" />
        <MetricCard label="Active Signals" value={DASHBOARD_METRICS.activeSignals} sub={`${DASHBOARD_METRICS.hotSignals} hot · ${DASHBOARD_METRICS.warmSignals} warm`} icon={Zap} color="amber" trend="+4 new" trendDir="up" />
        <MetricCard label="In Sequences" value={DASHBOARD_METRICS.sequencesActive} sub={`${DASHBOARD_METRICS.emailsSent} emails sent`} icon={Send} color="emerald" />
        <MetricCard label="Responses" value={DASHBOARD_METRICS.responses} sub="12.5% reply rate" icon={MessageSquare} color="indigo" trend="+1 today" trendDir="up" />
        <MetricCard label="Pipeline Value" value={DASHBOARD_METRICS.pipelineValue} sub="8 active deals" icon={Target} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hot Signals */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2"><Zap size={16} className="text-amber-500" /> Hot Signals</h3>
            <button onClick={() => setActiveScreen("signals")} className="text-xs text-violet-600 hover:text-violet-700 font-medium">View all</button>
          </div>
          <div className="space-y-3">
            {SIGNALS.filter(s => s.status === "hot").map(s => (
              <div key={s.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all">
                <SignalTypeIcon type={s.type} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{s.detail}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">{s.account}</span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs text-slate-400">{s.date}</span>
                  </div>
                </div>
                <ScoreBadge score={s.score} max={15} />
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 lg:col-span-1">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Activity size={16} className="text-violet-500" /> Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)" }} />
              <Area type="monotone" dataKey="emails" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="signals" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} />
              <Area type="monotone" dataKey="enriched" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-4 mt-2">
            <span className="flex items-center gap-1 text-xs text-slate-500"><span className="w-2 h-2 rounded-full bg-violet-500" />Emails</span>
            <span className="flex items-center gap-1 text-xs text-slate-500"><span className="w-2 h-2 rounded-full bg-amber-500" />Signals</span>
            <span className="flex items-center gap-1 text-xs text-slate-500"><span className="w-2 h-2 rounded-full bg-sky-500" />Enriched</span>
          </div>
        </div>

        {/* Signal Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 lg:col-span-1">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><CircleDot size={16} className="text-emerald-500" /> Signal Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={signalsByType} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {signalsByType.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {signalsByType.map((s, i) => (
              <span key={s.name} className="flex items-center gap-1 text-xs text-slate-500"><span className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />{s.name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed + Top Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Clock size={16} className="text-slate-400" /> Recent Activity</h3>
          <div className="space-y-1">
            {ACTIVITY_FEED.map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5 border-b border-slate-50 last:border-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${a.type === "signal" ? "bg-amber-100 text-amber-600" : a.type === "email" ? "bg-violet-100 text-violet-600" : a.type === "sequence" ? "bg-emerald-100 text-emerald-600" : "bg-sky-100 text-sky-600"}`}>
                  {a.type === "signal" ? <Zap size={12} /> : a.type === "email" ? <Mail size={12} /> : a.type === "sequence" ? <PlayCircle size={12} /> : <Users size={12} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700">{a.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2"><Building2 size={16} className="text-violet-500" /> Top Accounts by Signal Score</h3>
            <button onClick={() => setActiveScreen("accounts")} className="text-xs text-violet-600 hover:text-violet-700 font-medium">View all</button>
          </div>
          <div className="space-y-2">
            {ACCOUNTS.slice(0, 6).map(a => (
              <div key={a.id} onClick={() => { setSelectedAccount(a); setActiveScreen("account-detail"); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: a.color }}>{a.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-800">{a.name}</span>
                    <Badge variant={`tier${a.tier}`}>T{a.tier}</Badge>
                  </div>
                  <p className="text-xs text-slate-500">{a.signals} signals · {a.contacts} contacts · {a.stage}</p>
                </div>
                <ScoreBadge score={a.icpScore} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// SCREEN: ACCOUNTS
// ═══════════════════════════════════════════

const AccountsScreen = ({ setActiveScreen, setSelectedAccount }) => {
  const [filterTier, setFilterTier] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => ACCOUNTS.filter(a => {
    if (filterTier !== "all" && a.tier !== parseInt(filterTier)) return false;
    if (filterStatus !== "all" && a.status !== filterStatus) return false;
    if (searchTerm && !a.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  }), [filterTier, filterStatus, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Target Accounts</h1>
          <p className="text-sm text-slate-500 mt-1">{ACCOUNTS.length} accounts · {ACCOUNTS.filter(a => a.tier === 1).length} Tier 1 · {ACCOUNTS.filter(a => a.tier === 2).length} Tier 2</p>
        </div>
        <button className="px-3 py-1.5 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 flex items-center gap-1.5"><Plus size={14} /> Add Account</button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search accounts..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
          </div>
          <select value={filterTier} onChange={e => setFilterTier(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500">
            <option value="all">All Tiers</option>
            <option value="1">Tier 1</option>
            <option value="2">Tier 2</option>
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500">
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="cooling">Cooling</option>
            <option value="monitoring">Monitoring</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Account</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tier</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ICP Score</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stage</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Signals</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contacts</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Owner</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Activity</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} onClick={() => { setSelectedAccount(a); setActiveScreen("account-detail"); }} className="border-b border-slate-50 hover:bg-violet-50/30 cursor-pointer transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ background: a.color }}>{a.logo}</div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{a.name}</p>
                      <p className="text-xs text-slate-400">{a.gccLocation} · {a.headcount}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5"><Badge variant={`tier${a.tier}`}>Tier {a.tier}</Badge></td>
                <td className="px-4 py-3.5"><ScoreBadge score={a.icpScore} /></td>
                <td className="px-4 py-3.5"><span className="text-sm text-slate-600">{a.stage}</span></td>
                <td className="px-4 py-3.5"><span className="text-sm font-medium text-slate-700">{a.signals}</span></td>
                <td className="px-4 py-3.5"><span className="text-sm text-slate-600">{a.contacts}</span></td>
                <td className="px-4 py-3.5"><span className="text-xs text-slate-500">{a.owner}</span></td>
                <td className="px-4 py-3.5"><span className="text-xs text-slate-400">{a.lastActivity}</span></td>
                <td className="px-4 py-3.5"><ChevronRight size={16} className="text-slate-300" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// SCREEN: ACCOUNT DETAIL
// ═══════════════════════════════════════════

const AccountDetailScreen = ({ account, setActiveScreen }) => {
  const [activeTab, setActiveTab] = useState("overview");
  if (!account) return null;
  const accountSignals = SIGNALS.filter(s => s.account === account.name);
  const accountContacts = CONTACTS.filter(c => c.account === account.name);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => setActiveScreen("accounts")} className="p-1.5 rounded-lg hover:bg-slate-100"><ChevronLeft size={18} className="text-slate-500" /></button>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: account.color }}>{account.logo}</div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{account.name}</h1>
            <Badge variant={`tier${account.tier}`}>Tier {account.tier}</Badge>
            <Badge variant={account.status === "active" ? "success" : account.status === "cooling" ? "paused" : "default"}>{account.status}</Badge>
          </div>
          <p className="text-sm text-slate-500">{account.industry} · {account.gccLocation} · {account.headcount} headcount · {account.revenue} revenue</p>
        </div>
        <ScoreBadge score={account.icpScore} />
      </div>

      <div className="flex gap-1 border-b border-slate-200 pb-0">
        {["overview", "contacts", "signals", "sequences", "notes"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium capitalize rounded-t-lg transition-colors ${activeTab === tab ? "text-violet-700 bg-violet-50 border-b-2 border-violet-600" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}>{tab}</button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Account Intelligence</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{account.notes}</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-slate-50 rounded-lg"><p className="text-xs text-slate-500">Stage</p><p className="text-sm font-medium text-slate-800 mt-1">{account.stage}</p></div>
                <div className="p-3 bg-slate-50 rounded-lg"><p className="text-xs text-slate-500">Owner</p><p className="text-sm font-medium text-slate-800 mt-1">{account.owner}</p></div>
                <div className="p-3 bg-slate-50 rounded-lg"><p className="text-xs text-slate-500">Active Signals</p><p className="text-sm font-medium text-slate-800 mt-1">{accountSignals.length}</p></div>
                <div className="p-3 bg-slate-50 rounded-lg"><p className="text-xs text-slate-500">Contacts Mapped</p><p className="text-sm font-medium text-slate-800 mt-1">{accountContacts.length}</p></div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Recent Signals</h3>
              {accountSignals.length === 0 ? <p className="text-sm text-slate-400">No signals detected yet.</p> : (
                <div className="space-y-2">
                  {accountSignals.map(s => (
                    <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                      <SignalTypeIcon type={s.type} />
                      <div className="flex-1"><p className="text-sm text-slate-700">{s.detail}</p><p className="text-xs text-slate-400">{s.type} · {s.date}</p></div>
                      <Badge variant={s.status}>{s.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Key Contacts</h3>
              {accountContacts.length === 0 ? <p className="text-sm text-slate-400">No contacts mapped yet.</p> : (
                <div className="space-y-3">
                  {accountContacts.map(c => (
                    <div key={c.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xs font-bold">{c.name.split(" ").map(n => n[0]).join("")}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{c.name}</p>
                        <p className="text-xs text-slate-500 truncate">{c.title}</p>
                      </div>
                      <Badge variant={c.status}>{c.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-violet-50 rounded-lg transition-colors"><Mail size={14} className="text-violet-500" /> Start Outreach Sequence</button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-violet-50 rounded-lg transition-colors"><Users size={14} className="text-violet-500" /> Enrich Contacts</button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-violet-50 rounded-lg transition-colors"><Zap size={14} className="text-violet-500" /> Scan for Signals</button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-violet-50 rounded-lg transition-colors"><FileText size={14} className="text-violet-500" /> View Playbook</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "contacts" && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Contact</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Persona</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Channels</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Score</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Sequence</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
            </tr></thead>
            <tbody>
              {accountContacts.map(c => (
                <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <p className="text-sm font-medium text-slate-800">{c.name}</p>
                    <p className="text-xs text-slate-500">{c.title}</p>
                  </td>
                  <td className="px-4 py-3"><Badge>{c.persona}</Badge></td>
                  <td className="px-4 py-3"><div className="flex gap-1.5">{c.email && <Mail size={14} className="text-slate-400" />}{c.linkedin && <Linkedin size={14} className="text-blue-500" />}{c.phone && <Phone size={14} className="text-slate-400" />}</div></td>
                  <td className="px-4 py-3"><ScoreBadge score={c.signalScore} max={15} /></td>
                  <td className="px-4 py-3"><span className="text-xs text-slate-600">{c.sequence}</span></td>
                  <td className="px-4 py-3"><Badge variant={c.status}>{c.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
          {accountContacts.length === 0 && <div className="p-8 text-center text-sm text-slate-400">No contacts mapped. Click "Enrich Contacts" to find decision-makers.</div>}
        </div>
      )}

      {activeTab === "signals" && (
        <div className="space-y-3">
          {accountSignals.length === 0 ? <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-sm text-slate-400">No signals detected. Run signal scan to check.</div> : accountSignals.map(s => (
            <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
              <SignalTypeIcon type={s.type} />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{s.detail}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-slate-500">{s.type}</span>
                  <span className="text-xs text-slate-400">{s.date}</span>
                  <Badge variant={s.weight === "HIGH" ? "hot" : s.weight === "MEDIUM-HIGH" ? "warm" : "default"}>{s.weight}</Badge>
                </div>
              </div>
              <div className="text-right">
                <ScoreBadge score={s.score} max={15} />
                <p className="text-xs text-slate-400 mt-1">R:{s.recency} Rv:{s.relevance} A:{s.authority}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "sequences" && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Active Sequences for {account.name}</h3>
          {accountContacts.filter(c => c.sequence !== "Not started" && c.sequence !== "Paused").length === 0 ? (
            <p className="text-sm text-slate-400">No active sequences for this account.</p>
          ) : (
            <div className="space-y-4">
              {accountContacts.filter(c => c.sequence !== "Not started").map(c => (
                <div key={c.id} className="p-4 border border-slate-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-800">{c.name}</span>
                    <Badge variant={c.sequence === "Paused" ? "paused" : "active"}>{c.sequence}</Badge>
                  </div>
                  <div className="flex gap-1">
                    {TIER1_SEQUENCE_STEPS.map((step, i) => (
                      <div key={i} className={`flex-1 h-2 rounded-full ${step.status === "sent" ? "bg-violet-500" : step.status === "scheduled" ? "bg-violet-200" : "bg-slate-100"}`} title={`Day ${step.day}: ${step.action}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "notes" && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-3">Account Notes</h3>
          <textarea className="w-full h-48 p-3 border border-slate-200 rounded-lg text-sm text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500" defaultValue={account.notes} placeholder="Add notes about this account..." />
          <div className="flex justify-end mt-3"><button className="px-4 py-1.5 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700">Save Notes</button></div>
        </div>
      )}
    </div>
  );
};

export default function ImprozoGTMPlatform() {
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "accounts", label: "Accounts", icon: Building2 },
    { id: "contacts", label: "Contacts", icon: Users },
    { id: "signals", label: "Signals", icon: Zap },
    { id: "sequences", label: "Sequences", icon: GitBranch },
    { id: "pipeline", label: "Pipeline", icon: Target },
    { id: "email-composer", label: "Email Composer", icon: Mail },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "playbooks", label: "Playbooks", icon: BookOpen },
    { id: "team", label: "Team", icon: Award },
  ];

  const renderScreen = () => {
    switch (activeScreen) {
      case "dashboard": return <DashboardScreen setActiveScreen={setActiveScreen} setSelectedAccount={setSelectedAccount} />;
      case "accounts": return <AccountsScreen setActiveScreen={setActiveScreen} setSelectedAccount={setSelectedAccount} />;
      case "account-detail": return <AccountDetailScreen account={selectedAccount} setActiveScreen={setActiveScreen} />;
      case "contacts": return <ContactsScreen />;
      case "signals": return <SignalsScreen />;
      case "sequences": return <SequencesScreen />;
      case "pipeline": return <PipelineScreen />;
      case "email-composer": return <EmailComposerScreen />;
      case "analytics": return <AnalyticsScreen />;
      case "playbooks": return <PlaybooksScreen />;
      case "team": return <TeamScreen />;
      default: return <DashboardScreen setActiveScreen={setActiveScreen} setSelectedAccount={setSelectedAccount} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? "w-16" : "w-56"} bg-slate-900 flex flex-col transition-all duration-200 flex-shrink-0`}>
        <div className="p-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-violet-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">I</div>
          {!sidebarCollapsed && <div><p className="text-white font-bold text-sm">Improzo</p><p className="text-slate-400 text-[10px] uppercase tracking-widest">GTM Platform</p></div>}
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
          {navItems.map(item => {
            const isActive = activeScreen === item.id || (item.id === "accounts" && activeScreen === "account-detail");
            return (
              <button key={item.id} onClick={() => setActiveScreen(item.id)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}>
                <item.icon size={18} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-slate-800">
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-sm">
            {sidebarCollapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /><span>Collapse</span></>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
          <div className="relative w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search accounts, contacts, signals..." className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-slate-50" />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 rounded-lg hover:bg-slate-100">
                <Bell size={18} className="text-slate-500" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-xl z-50 p-4">
                  <h4 className="font-semibold text-sm text-slate-900 mb-3">Notifications</h4>
                  {SIGNALS.filter(s => s.status === "hot").slice(0, 3).map(s => (
                    <div key={s.id} className="py-2 border-b border-slate-50 last:border-0">
                      <p className="text-sm text-slate-700">{s.detail}</p>
                      <p className="text-xs text-slate-400">{s.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-violet-600 rounded-full flex items-center justify-center text-white text-xs font-bold">TR</div>
              <span className="text-sm font-medium text-slate-700">Tirth Ray</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN: CONTACTS
// ═══════════════════════════════════════════

function ContactsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPersona, setFilterPersona] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = useMemo(() => CONTACTS.filter(c => {
    if (searchTerm && !c.name.toLowerCase().includes(searchTerm.toLowerCase()) && !c.account.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filterPersona !== "all" && c.persona !== filterPersona) return false;
    if (filterStatus !== "all" && c.status !== filterStatus) return false;
    return true;
  }), [searchTerm, filterPersona, filterStatus]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Contacts</h1><p className="text-sm text-slate-500 mt-1">{CONTACTS.length} contacts across {new Set(CONTACTS.map(c => c.account)).size} accounts</p></div>
        <button className="px-3 py-1.5 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 flex items-center gap-1.5"><Plus size={14} /> Enrich New</button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" placeholder="Search contacts..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
          <select value={filterPersona} onChange={e => setFilterPersona(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500">
            <option value="all">All Personas</option>
            <option value="GCC Builder">GCC Builder</option>
            <option value="Data/AI Leader">Data/AI Leader</option>
            <option value="Commercial Tech Leader">Commercial Tech Leader</option>
            <option value="Transformation Lead">Transformation Lead</option>
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500">
            <option value="all">All Statuses</option>
            <option value="hot">Hot</option>
            <option value="warm">Warm</option>
            <option value="cooling">Cooling</option>
            <option value="monitor">Monitor</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-slate-100 bg-slate-50/50">
            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Contact</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Account</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Persona</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Channels</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Signal Score</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Sequence</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
          </tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-b border-slate-50 hover:bg-violet-50/30 cursor-pointer">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xs font-bold">{c.name.split(" ").map(n => n[0]).join("")}</div>
                    <div><p className="text-sm font-medium text-slate-800">{c.name}</p><p className="text-xs text-slate-500">{c.title}</p></div>
                  </div>
                </td>
                <td className="px-4 py-3.5"><span className="text-sm text-slate-600">{c.account}</span></td>
                <td className="px-4 py-3.5"><Badge>{c.persona}</Badge></td>
                <td className="px-4 py-3.5"><div className="flex gap-1.5">{c.email && <Mail size={14} className="text-slate-400" />}{c.linkedin && <Linkedin size={14} className="text-blue-500" />}{c.phone && <Phone size={14} className="text-slate-400" />}</div></td>
                <td className="px-4 py-3.5"><ScoreBadge score={c.signalScore} max={15} /></td>
                <td className="px-4 py-3.5"><span className="text-xs text-slate-600">{c.sequence}</span></td>
                <td className="px-4 py-3.5"><Badge variant={c.status}>{c.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN: SIGNALS
// ═══════════════════════════════════════════

function SignalsScreen() {
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = useMemo(() => SIGNALS.filter(s => {
    if (filterType !== "all" && s.type !== filterType) return false;
    if (filterStatus !== "all" && s.status !== filterStatus) return false;
    return true;
  }), [filterType, filterStatus]);

  const signalTypes = [...new Set(SIGNALS.map(s => s.type))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Signal Scanner</h1><p className="text-sm text-slate-500 mt-1">{SIGNALS.length} signals detected · {SIGNALS.filter(s => s.status === "hot").length} hot · {SIGNALS.filter(s => s.status === "warm").length} warm</p></div>
        <button className="px-3 py-1.5 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 flex items-center gap-1.5"><Zap size={14} /> Run Full Scan</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <MetricCard label="Hot Signals (12+)" value={SIGNALS.filter(s => s.score >= 12).length} icon={AlertTriangle} color="red" sub="Immediate outreach needed" />
        <MetricCard label="Warm Signals (8-11)" value={SIGNALS.filter(s => s.score >= 8 && s.score < 12).length} icon={TrendingUp} color="amber" sub="Nurture sequence" />
        <MetricCard label="Monitor (<8)" value={SIGNALS.filter(s => s.score < 8).length} icon={Eye} color="sky" sub="Watch list" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500">
            <option value="all">All Signal Types</option>
            {signalTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500">
            <option value="all">All Priorities</option>
            <option value="hot">Hot (12+)</option>
            <option value="warm">Warm (8-11)</option>
            <option value="monitor">Monitor (&lt;8)</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(s => (
          <div key={s.id} className={`bg-white rounded-xl border p-4 flex items-center gap-4 hover:shadow-sm transition-shadow ${s.status === "hot" ? "border-red-200 bg-red-50/30" : s.status === "warm" ? "border-amber-200 bg-amber-50/20" : "border-slate-200"}`}>
            <SignalTypeIcon type={s.type} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800">{s.detail}</p>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-xs font-medium text-slate-700">{s.account}</span>
                <Badge variant={s.weight === "HIGH" ? "hot" : s.weight === "VERY HIGH" ? "hot" : s.weight === "MEDIUM-HIGH" ? "warm" : "default"}>{s.weight}</Badge>
                <span className="text-xs text-slate-400">{s.type}</span>
                <span className="text-xs text-slate-400">{s.date}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <ScoreBadge score={s.score} max={15} />
              <div className="flex gap-2 mt-1 text-xs text-slate-400">
                <span title="Recency">R:{s.recency}</span>
                <span title="Relevance">Rv:{s.relevance}</span>
                <span title="Authority">A:{s.authority}</span>
              </div>
            </div>
            <Badge variant={s.status}>{s.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN: SEQUENCES
// ═══════════════════════════════════════════

function SequencesScreen() {
  const [selectedSeq, setSelectedSeq] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Outreach Sequences</h1><p className="text-sm text-slate-500 mt-1">{SEQUENCES.length} sequences · {SEQUENCES.filter(s => s.status === "active").length} active</p></div>
        <button className="px-3 py-1.5 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 flex items-center gap-1.5"><Plus size={14} /> New Sequence</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SEQUENCES.map(seq => (
          <div key={seq.id} onClick={() => setSelectedSeq(selectedSeq?.id === seq.id ? null : seq)} className={`bg-white rounded-xl border p-5 cursor-pointer hover:shadow-md transition-all ${selectedSeq?.id === seq.id ? "border-violet-400 ring-2 ring-violet-100" : "border-slate-200"}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-900">{seq.name}</h3>
                <Badge variant={seq.status}>{seq.status}</Badge>
              </div>
              <Badge variant={`tier${seq.tier}`}>Tier {seq.tier}</Badge>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-3">
              <div><p className="text-xs text-slate-500">Steps</p><p className="text-sm font-semibold text-slate-800">{seq.steps}</p></div>
              <div><p className="text-xs text-slate-500">Duration</p><p className="text-sm font-semibold text-slate-800">{seq.duration}</p></div>
              <div><p className="text-xs text-slate-500">Active</p><p className="text-sm font-semibold text-emerald-600">{seq.active}</p></div>
              <div><p className="text-xs text-slate-500">Paused</p><p className="text-sm font-semibold text-amber-600">{seq.paused}</p></div>
            </div>
            <div className="flex gap-1.5">
              {seq.channels.map(ch => (
                <span key={ch} className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded text-xs text-slate-600"><ChannelIcon channel={ch} size={10} />{ch}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedSeq && selectedSeq.tier === 1 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Sequence Timeline: {selectedSeq.name}</h3>
          <div className="space-y-0">
            {TIER1_SEQUENCE_STEPS.map((step, i) => (
              <div key={i} className="flex items-start gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step.status === "sent" ? "bg-violet-600 border-violet-600 text-white" : step.status === "scheduled" ? "bg-violet-100 border-violet-300 text-violet-600" : "bg-white border-slate-200 text-slate-400"}`}>
                    <ChannelIcon channel={step.channel} size={14} />
                  </div>
                  {i < TIER1_SEQUENCE_STEPS.length - 1 && <div className={`w-0.5 h-8 ${step.status === "sent" ? "bg-violet-400" : "bg-slate-200"}`} />}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">Day {step.day}</span>
                    <span className="text-xs px-1.5 py-0.5 bg-slate-100 rounded text-slate-500">{step.channel}</span>
                    <Badge variant={step.status === "sent" ? "success" : step.status === "scheduled" ? "warm" : "default"}>{step.status}</Badge>
                  </div>
                  <p className="text-sm text-slate-700 mt-0.5">{step.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN: PIPELINE
// ═══════════════════════════════════════════

function PipelineScreen() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Pipeline</h1><p className="text-sm text-slate-500 mt-1">8 deals · $800K - $1.8M potential value</p></div>
        <button className="px-3 py-1.5 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 flex items-center gap-1.5"><Plus size={14} /> Add Deal</button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {PIPELINE_STAGES.map(stage => (
          <div key={stage.name} className="flex-shrink-0 w-56">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-700">{stage.name}</h3>
              <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">{stage.deals.length}</span>
            </div>
            <div className="space-y-2 min-h-[200px]">
              {stage.deals.map(deal => (
                <div key={deal.id} className="bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold" style={{ background: deal.color }}>{deal.account[0]}</div>
                    <span className="text-sm font-medium text-slate-800">{deal.account}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{deal.value}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{deal.probability}% prob</span>
                    <span className="text-xs text-slate-400">{deal.days}d</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1 mt-2">
                    <div className="h-1 rounded-full bg-violet-500" style={{ width: `${deal.probability}%` }} />
                  </div>
                </div>
              ))}
              {stage.deals.length === 0 && (
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center text-xs text-slate-400">No deals</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN: EMAIL COMPOSER
// ═══════════════════════════════════════════

function EmailComposerScreen() {
  const [selectedTemplate, setSelectedTemplate] = useState("new-hire");
  const [selectedContact, setSelectedContact] = useState(CONTACTS[0]);

  const templates = [
    { id: "new-hire", name: "New Hire Signal", subject: "Congrats on the move, {first_name}", preview: "Saw you recently joined {company} as {title}. Having built and scaled pharma GCC analytics teams — most recently a 120-person operation across 62 countries at BMS — I know the first 90 days are critical..." },
    { id: "job-posting", name: "Job Posting Signal", subject: "Saw {company} is building out {function}", preview: "Noticed {company} is hiring for {role_count} {function} roles in Hyderabad. When we helped a similar pharma GCC stand up their analytics team, we had them productive in weeks, not quarters..." },
    { id: "veeva-migration", name: "Veeva Migration", subject: "Veeva CRM → Vault at {company}?", preview: "Hearing rumblings about {company} evaluating CRM-to-Vault. We've led these migrations at enterprise pharma scale — the sequencing of data migration, user training, and multi-country rollout is where most teams underestimate complexity..." },
    { id: "breakup", name: "Breakup Email", subject: "Closing the loop, {first_name}", preview: "I've reached out a few times and haven't heard back — totally understand you're busy. I'll close the loop here. If pharma GCC analytics, data platform modernization, or Veeva migration ever hits your desk, happy to be a sounding board..." },
  ];

  const activeTemplate = templates.find(t => t.id === selectedTemplate);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900">Email Composer</h1><p className="text-sm text-slate-500 mt-1">Craft personalized outreach using signal-based templates</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="font-semibold text-sm text-slate-900 mb-3">Select Template</h3>
            <div className="space-y-1.5">
              {templates.map(t => (
                <button key={t.id} onClick={() => setSelectedTemplate(t.id)} className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${selectedTemplate === t.id ? "bg-violet-50 text-violet-700 border border-violet-200" : "text-slate-600 hover:bg-slate-50 border border-transparent"}`}>{t.name}</button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="font-semibold text-sm text-slate-900 mb-3">Select Contact</h3>
            <div className="space-y-1.5 max-h-60 overflow-y-auto">
              {CONTACTS.filter(c => c.status === "hot" || c.status === "warm").map(c => (
                <button key={c.id} onClick={() => setSelectedContact(c)} className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${selectedContact?.id === c.id ? "bg-violet-50 border border-violet-200" : "hover:bg-slate-50 border border-transparent"}`}>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-[10px] font-bold">{c.name.split(" ").map(n => n[0]).join("")}</div>
                  <div className="min-w-0"><p className="text-sm text-slate-800 truncate">{c.name}</p><p className="text-xs text-slate-400 truncate">{c.account}</p></div>
                  <Badge variant={c.status} className="ml-auto flex-shrink-0">{c.status}</Badge>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase">To</label>
              <input type="text" value={selectedContact ? `${selectedContact.name} <${selectedContact.email}>` : ""} readOnly className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase">Subject</label>
              <input type="text" defaultValue={activeTemplate?.subject.replace("{first_name}", selectedContact?.name?.split(" ")[0] || "").replace("{company}", selectedContact?.account || "")} className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase">Body</label>
              <textarea defaultValue={activeTemplate?.preview.replace("{first_name}", selectedContact?.name?.split(" ")[0] || "").replace("{company}", selectedContact?.account || "").replace("{title}", selectedContact?.title || "")} className="w-full mt-1 px-3 py-3 border border-slate-200 rounded-lg text-sm h-48 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 leading-relaxed" />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">Save Draft</button>
                <button className="px-3 py-1.5 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1"><Zap size={12} /> AI Personalize</button>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm text-violet-600 border border-violet-200 rounded-lg hover:bg-violet-50">Schedule</button>
                <button className="px-4 py-1.5 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 flex items-center gap-1.5"><Send size={14} /> Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN: ANALYTICS
// ═══════════════════════════════════════════

function AnalyticsScreen() {
  const funnelData = [
    { stage: "TAM", value: 52, pct: "100%" },
    { stage: "Enriched", value: 38, pct: "73%" },
    { stage: "Verified", value: 31, pct: "60%" },
    { stage: "In Sequence", value: 8, pct: "15%" },
    { stage: "Responded", value: 3, pct: "6%" },
    { stage: "Meeting", value: 0, pct: "0%" },
  ];

  const outreachPerf = [
    { week: "W1", sent: 8, opened: 5, replied: 1, meetings: 0 },
    { week: "W2", sent: 16, opened: 11, replied: 2, meetings: 0 },
    { week: "W3", sent: 24, opened: 16, replied: 3, meetings: 0 },
  ];

  const accountScores = ACCOUNTS.slice(0, 6).map(a => ({ name: a.name.length > 10 ? a.name.slice(0, 9) + "..." : a.name, score: a.icpScore, signals: a.signals * 3 }));

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900">Analytics</h1><p className="text-sm text-slate-500 mt-1">Pipeline performance and outreach metrics</p></div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Email Open Rate" value="67%" icon={Eye} color="violet" trend="+5% vs last week" trendDir="up" />
        <MetricCard label="Reply Rate" value="12.5%" icon={MessageSquare} color="emerald" trend="+2.1%" trendDir="up" />
        <MetricCard label="Avg Signal Score" value="10.2" icon={Zap} color="amber" sub="across 12 signals" />
        <MetricCard label="Pipeline Velocity" value="14d" icon={TrendingUp} color="sky" sub="avg stage duration" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Contact Funnel</h3>
          <div className="space-y-2">
            {funnelData.map((f, i) => (
              <div key={f.stage} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-20 text-right">{f.stage}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-7 overflow-hidden">
                  <div className="h-full rounded-full flex items-center px-3 transition-all" style={{ width: `${(f.value / funnelData[0].value) * 100}%`, background: `hsl(${260 - i * 20}, 60%, ${50 + i * 5}%)` }}>
                    <span className="text-xs font-medium text-white">{f.value}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 w-10">{f.pct}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Outreach Performance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={outreachPerf}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="sent" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              <Bar dataKey="opened" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="replied" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Account Engagement Score</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={accountScores} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: "#64748b" }} width={80} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="score" name="ICP Score" fill="#7c3aed" radius={[0, 4, 4, 0]} />
            <Bar dataKey="signals" name="Signal Strength" fill="#f59e0b" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN: PLAYBOOKS
// ═══════════════════════════════════════════

function PlaybooksScreen() {
  const [expandedPlaybook, setExpandedPlaybook] = useState(null);

  const playbooks = [
    { id: "objections", name: "Objection Handling", icon: MessageSquare, items: [
      { trigger: '"We have internal resources"', response: "We typically come in for specialized spikes — Veeva migrations, platform builds, AI POCs — where pharma-specific expertise accelerates your timeline." },
      { trigger: '"Not the right time"', response: "Totally understand. Mind if I check back in next quarter? Happy to share relevant content in the meantime." },
      { trigger: '"We work with [competitor]"', response: "We've actually collaborated with them. We tend to complement rather than compete — we bring pharma GCC-specific depth." },
      { trigger: '"Too expensive"', response: "Our engagement models are flexible — from project-based to embedded teams to outcome-linked pricing. Worth a quick scoping call?" },
      { trigger: '"Send me information"', response: "Happy to! What's the most pressing challenge — data platform, Veeva migration, or analytics talent? I'll tailor what I send." },
    ]},
    { id: "signals", name: "Signal Response Playbook", icon: Zap, items: [
      { trigger: "New Hire Signal (VP+)", response: "Reach out within 2-4 weeks. Congratulate on the move. Reference their background. Offer peer-to-peer insight on the 90-day challenge." },
      { trigger: "Job Posting (3+ similar roles)", response: "Reach within 1 week. Reference specific roles. Position Improzo as embedded team that bridges while they hire." },
      { trigger: "Veeva Migration Signal", response: "Immediate outreach. Lead with Veeva CRM-to-Vault migration experience. Highlight multi-country rollout complexity." },
      { trigger: "GCC Expansion Signal", response: "Reach 1-3 months after. Reference expansion news. Offer GCC capability building expertise." },
    ]},
    { id: "qualifying", name: "Qualification Framework", icon: Target, items: [
      { trigger: "Company Fit (1-5)", response: "Tier 1 pharma with Hyderabad GCC = 5 · Mid-size pharma India ops = 3 · Non-pharma or no India presence = 1" },
      { trigger: "Role Fit (1-5)", response: "VP+ in target function = 5 · Director level = 4 · Manager level = 2 · Unknown role = 1" },
      { trigger: "Signal Strength (1-5)", response: "Multiple active signals, score 12+ = 5 · Single strong signal = 3 · No signals = 1" },
      { trigger: "Budget Likelihood (1-5)", response: "Known budget/RFP = 5 · Expansion signals = 3 · No budget indicators = 1" },
    ]},
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900">Playbooks</h1><p className="text-sm text-slate-500 mt-1">Battle-tested frameworks for outbound execution</p></div>
      <div className="space-y-4">
        {playbooks.map(pb => (
          <div key={pb.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button onClick={() => setExpandedPlaybook(expandedPlaybook === pb.id ? null : pb.id)} className="w-full flex items-center gap-3 p-5 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600"><pb.icon size={18} /></div>
              <div className="flex-1 text-left"><h3 className="font-semibold text-slate-900">{pb.name}</h3><p className="text-xs text-slate-500">{pb.items.length} entries</p></div>
              <ChevronDown size={18} className={`text-slate-400 transition-transform ${expandedPlaybook === pb.id ? "rotate-180" : ""}`} />
            </button>
            {expandedPlaybook === pb.id && (
              <div className="border-t border-slate-100 p-5 space-y-3">
                {pb.items.map((item, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-800 mb-1.5">{item.trigger}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.response}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN: TEAM
// ═══════════════════════════════════════════

function TeamScreen() {
  const team = [
    { name: "Tirth Ray", role: "VP Data & AI GCC", focus: "Outbound engine, BD strategy, client relationships", hours: "~20 hrs/week on outbound", accounts: ["Novartis", "BMS", "Amgen", "Sanofi", "Pfizer", "AstraZeneca"], background: "20+ years pharma commercial tech. Former BMS (120-person team, 62 countries), Pfizer, Novartis, IQVIA.", avatar: "TR", color: "from-violet-500 to-violet-600" },
    { name: "Abhi", role: "Founder / Senior Leader", focus: "Strategic direction, key client relationships, pricing", hours: "Strategic oversight", accounts: [], background: "Strategic direction and key decisions. Pricing authority.", avatar: "AB", color: "from-emerald-500 to-emerald-600" },
    { name: "BD Associate", role: "Planned — Month 3", focus: "Tier 2/3 outreach, CRM management", hours: "Full-time (planned)", accounts: [], background: "To be hired. Will handle Tier 2/3 volume outreach and CRM ops.", avatar: "BD", color: "from-slate-400 to-slate-500" },
    { name: "Content Marketer", role: "Planned — Month 6", focus: "LinkedIn content, thought leadership, inbound lead gen", hours: "Full-time (planned)", accounts: [], background: "To be hired. Will drive inbound through content and brand building.", avatar: "CM", color: "from-slate-400 to-slate-500" },
  ];

  const techStack = [
    { tool: "Apollo.io", purpose: "Prospecting, contact data, intent signals", status: "setup" },
    { tool: "Instantly.ai", purpose: "Cold email, warmup, deliverability", status: "setup" },
    { tool: "LinkedIn Sales Nav", purpose: "Profile discovery, social selling", status: "setup" },
    { tool: "HubSpot", purpose: "CRM, pipeline, deals, reporting", status: "setup" },
    { tool: "Hunter.io", purpose: "Email verification (waterfall layer 2)", status: "setup" },
    { tool: "NeverBounce", purpose: "Email verification before sending", status: "setup" },
    { tool: "HeyGen", purpose: "AI video for Tier 1 prospects", status: "optional" },
    { tool: "Claude Code", purpose: "Enrichment scripts, signal scanning, personalization", status: "active" },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900">Team</h1><p className="text-sm text-slate-500 mt-1">Ownership, roles, and technology stack</p></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {team.map(t => (
          <div key={t.name} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold`}>{t.avatar}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{t.name}</h3>
                <p className="text-sm text-violet-600">{t.role}</p>
                <p className="text-xs text-slate-500 mt-2">{t.focus}</p>
                <p className="text-xs text-slate-400 mt-1">{t.hours}</p>
                {t.accounts.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">{t.accounts.map(a => <Badge key={a} variant="tier1">{a}</Badge>)}</div>
                )}
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">{t.background}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Technology Stack</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {techStack.map(t => (
            <div key={t.tool} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">{t.tool[0]}</div>
              <div className="flex-1"><p className="text-sm font-medium text-slate-800">{t.tool}</p><p className="text-xs text-slate-500">{t.purpose}</p></div>
              <Badge variant={t.status === "active" ? "success" : t.status === "setup" ? "warm" : "default"}>{t.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
