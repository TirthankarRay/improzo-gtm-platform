import { useState, useMemo, useCallback } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, CartesianGrid, Legend } from "recharts";
import { Search, Bell, Settings, ChevronRight, ChevronDown, Filter, Plus, Send, Target, Zap, Users, Building2, Mail, LayoutDashboard, GitBranch, BookOpen, TrendingUp, Clock, CheckCircle, AlertTriangle, ArrowUpRight, ArrowDownRight, MoreHorizontal, Star, Phone, Linkedin, Video, Eye, Edit3, X, ChevronLeft, Activity, Award, Briefcase, Globe, MapPin, Calendar, MessageSquare, PlayCircle, PauseCircle, BarChart3, CircleDot, UserCheck, FileText, Bot, Cpu, Wifi, WifiOff, RefreshCw, Shield, CheckCircle2, XCircle, ExternalLink, Radar, Database, BrainCircuit } from "lucide-react";

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
  { id: 1, type: "Job Posting", account: "Sanofi", detail: "Hiring 5x Databricks Engineers for Hyderabad GBS", score: 14, recency: 5, relevance: 5, authority: 4, date: "2026-03-11", status: "hot", weight: "HIGH", sourceUrl: "https://linkedin.com/jobs/123", sourceType: "LinkedIn", confidence: 92, nlpClassified: true, verified: true, autoEnrolled: true },
  { id: 2, type: "Leadership Change", account: "Novartis", detail: "New VP Data & Analytics appointed for GCC India", score: 13, recency: 4, relevance: 5, authority: 4, date: "2026-03-09", status: "hot", weight: "HIGH", sourceUrl: "https://linkedin.com/feed/456", sourceType: "LinkedIn", confidence: 88, nlpClassified: true, verified: true, autoEnrolled: true },
  { id: 3, type: "Technology Signal", account: "Amgen", detail: "Databricks adoption — posting for platform engineers", score: 12, recency: 4, relevance: 4, authority: 4, date: "2026-03-08", status: "hot", weight: "MEDIUM-HIGH", sourceUrl: "https://databricks.news/789", sourceType: "Newsroom", confidence: 85, nlpClassified: true, verified: null, autoEnrolled: true },
  { id: 4, type: "Job Change", account: "Novartis", detail: "New Director of Commercial Analytics joined from Roche", score: 12, recency: 5, relevance: 4, authority: 3, date: "2026-03-10", status: "hot", weight: "HIGH", sourceUrl: "https://linkedin.com/jobs/234", sourceType: "LinkedIn", confidence: 87, nlpClassified: true, verified: true, autoEnrolled: false },
  { id: 5, type: "Veeva Migration", account: "Sanofi", detail: "CRM-to-Vault migration RFP expected Q2 2026", score: 11, recency: 3, relevance: 5, authority: 3, date: "2026-03-05", status: "warm", weight: "MEDIUM-HIGH", sourceUrl: "https://pharmaexec.com/567", sourceType: "NewsAPI", confidence: 76, nlpClassified: true, verified: false, autoEnrolled: false },
  { id: 6, type: "GCC Expansion", account: "Sanofi", detail: "New floor lease signed — 200 additional seats in Hyderabad", score: 10, recency: 4, relevance: 3, authority: 3, date: "2026-03-07", status: "warm", weight: "MEDIUM", sourceUrl: "https://hyderabad-business.com/890", sourceType: "NewsAPI", confidence: 72, nlpClassified: false, verified: null, autoEnrolled: false },
  { id: 7, type: "Content Engagement", account: "Novartis", detail: "VP Data liked post on Agentic AI in pharma", score: 9, recency: 4, relevance: 3, authority: 2, date: "2026-03-10", status: "warm", weight: "MEDIUM", sourceUrl: "https://linkedin.com/posts/111", sourceType: "LinkedIn", confidence: 68, nlpClassified: true, verified: true, autoEnrolled: true },
  { id: 8, type: "Job Posting", account: "Amgen", detail: "Hiring Veeva Technical Architect — Hyderabad", score: 9, recency: 3, relevance: 4, authority: 2, date: "2026-03-06", status: "warm", weight: "HIGH", sourceUrl: "https://linkedin.com/jobs/222", sourceType: "JobBoard", confidence: 81, nlpClassified: true, verified: true, autoEnrolled: true },
  { id: 9, type: "Event Attendance", account: "Pfizer", detail: "Commercial IT head registered for NASSCOM GCC Summit", score: 8, recency: 3, relevance: 3, authority: 2, date: "2026-03-04", status: "warm", weight: "MEDIUM", sourceUrl: "https://nasscom-conference.com/333", sourceType: "Conferences", confidence: 74, nlpClassified: false, verified: null, autoEnrolled: false },
  { id: 10, type: "Technology Signal", account: "AstraZeneca", detail: "Snowflake partnership announcement for India data hub", score: 8, recency: 3, relevance: 3, authority: 2, date: "2026-03-03", status: "warm", weight: "MEDIUM-HIGH", sourceUrl: "https://snowflake.com/news/444", sourceType: "Newsroom", confidence: 79, nlpClassified: true, verified: null, autoEnrolled: true },
  { id: 11, type: "Job Posting", account: "BMS", detail: "AI/ML Lead — Commercial Analytics, Hyderabad", score: 7, recency: 2, relevance: 3, authority: 2, date: "2026-02-28", status: "monitor", weight: "HIGH", sourceUrl: "https://jobs.bms.com/555", sourceType: "JobBoard", confidence: 65, nlpClassified: false, verified: null, autoEnrolled: false },
  { id: 12, type: "Content Engagement", account: "Pfizer", detail: "Director SFE engaged with GCC analytics content", score: 6, recency: 3, relevance: 2, authority: 1, date: "2026-03-01", status: "monitor", weight: "MEDIUM", sourceUrl: "https://linkedin.com/posts/666", sourceType: "LinkedIn", confidence: 58, nlpClassified: true, verified: true, autoEnrolled: false },
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
  { time: "2h ago", type: "signal", text: "Auto-detected: Sanofi hiring 5x Databricks Engineers", icon: "zap" },
  { time: "3h ago", type: "email", text: "Email sent to Amit Patel (Sanofi) — Day 4 follow-up", icon: "mail" },
  { time: "1d ago", type: "signal", text: "Auto-detected: Novartis VP Data liked Agentic AI post on LinkedIn", icon: "zap" },
  { time: "1d ago", type: "sequence", text: "Priya Sharma (Novartis) entered Tier 1 sequence", icon: "play" },
  { time: "2d ago", type: "enrichment", text: "12 new contacts enriched for Novartis via Apollo", icon: "users" },
  { time: "2d ago", type: "signal", text: "Auto-detected: Novartis — New VP Data & Analytics appointed", icon: "zap" },
  { time: "3d ago", type: "email", text: "Email sent to Rajesh Kumar (Novartis) — Day 1 intro", icon: "mail" },
  { time: "3d ago", type: "enrichment", text: "6 contacts enriched for Amgen — 4 verified", icon: "users" },
  { time: "5d ago", type: "sequence", text: "Suresh Reddy (Pfizer) entered Tier 1 sequence", icon: "play" },
  { time: "1w ago", type: "signal", text: "Auto-detected: AstraZeneca Snowflake partnership for India data hub", icon: "zap" },
];

const SCRAPER_SOURCES = [
  { id: 1, name: "LinkedIn Jobs", type: "JobBoard", status: "active", lastRun: "2h ago", itemsCollected: 156, frequency: "hourly", health: 99 },
  { id: 2, name: "LinkedIn Posts", type: "LinkedIn", status: "active", lastRun: "1h ago", itemsCollected: 89, frequency: "hourly", health: 98 },
  { id: 3, name: "Databricks Newsroom", type: "Newsroom", status: "active", lastRun: "3h ago", itemsCollected: 12, frequency: "6-hourly", health: 100 },
  { id: 4, name: "Snowflake Newsroom", type: "Newsroom", status: "active", lastRun: "4h ago", itemsCollected: 8, frequency: "6-hourly", health: 100 },
  { id: 5, name: "Veeva Newsroom", type: "Newsroom", status: "active", lastRun: "5h ago", itemsCollected: 6, frequency: "6-hourly", health: 100 },
  { id: 6, name: "Pharma Industry News", type: "NewsAPI", status: "active", lastRun: "30m ago", itemsCollected: 234, frequency: "hourly", health: 97 },
  { id: 7, name: "Tech & GCC News", type: "NewsAPI", status: "active", lastRun: "45m ago", itemsCollected: 178, frequency: "hourly", health: 96 },
  { id: 8, name: "CrunchBase API", type: "NewsAPI", status: "active", lastRun: "1h ago", itemsCollected: 23, frequency: "daily", health: 99 },
  { id: 9, name: "Regulatory Filings", type: "Regulatory", status: "active", lastRun: "2h ago", itemsCollected: 3, frequency: "daily", health: 100 },
  { id: 10, name: "Glassdoor Jobs", type: "JobBoard", status: "warning", lastRun: "6h ago", itemsCollected: 45, frequency: "12-hourly", health: 72 },
  { id: 11, name: "Indeed Jobs", type: "JobBoard", status: "active", lastRun: "2h ago", itemsCollected: 67, frequency: "hourly", health: 94 },
  { id: 12, name: "ZoomInfo Updates", type: "LinkedIn", status: "active", lastRun: "3h ago", itemsCollected: 34, frequency: "6-hourly", health: 95 },
  { id: 13, name: "Conference Registrations", type: "Conferences", status: "active", lastRun: "1d ago", itemsCollected: 5, frequency: "daily", health: 100 },
  { id: 14, name: "PR Wire Services", type: "PRWire", status: "active", lastRun: "2h ago", itemsCollected: 41, frequency: "6-hourly", health: 98 },
  { id: 15, name: "Executive Move Tracker", type: "LinkedIn", status: "active", lastRun: "4h ago", itemsCollected: 19, frequency: "daily", health: 99 },
];

const SIGNAL_ENGINE_METRICS = {
  scraperUptime: 98.7,
  signalsToday: 47,
  signalsThisWeek: 287,
  avgConfidence: 79,
  classifierAccuracy: 89,
  processingTime: "2.3s",
};

const SIGNAL_VELOCITY = [
  { company: "Novartis", week1: 5, week2: 7, week3: 4, week4: 8 },
  { company: "Sanofi", week1: 6, week2: 8, week3: 6, week4: 9 },
  { company: "Amgen", week1: 3, week2: 5, week3: 4, week4: 7 },
  { company: "Pfizer", week1: 2, week2: 4, week3: 3, week4: 5 },
  { company: "AstraZeneca", week1: 1, week2: 3, week3: 2, week4: 4 },
];

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-slate-100 text-slate-700", hot: "bg-red-50 text-red-700 border border-red-200", warm: "bg-amber-50 text-amber-700 border border-amber-200", cool: "bg-blue-50 text-blue-700 border border-blue-200", monitor: "bg-slate-50 text-slate-600 border border-slate-200", success: "bg-emerald-50 text-emerald-700 border border-emerald-200", tier1: "bg-violet-50 text-violet-700 border border-violet-200", tier2: "bg-sky-50 text-sky-700 border border-sky-200", tier3: "bg-slate-50 text-slate-600 border border-slate-200", active: "bg-emerald-50 text-emerald-700 border border-emerald-200", draft: "bg-slate-50 text-slate-500 border border-slate-200", paused: "bg-amber-50 text-amber-600 border border-amber-200", newsroom: "bg-blue-50 text-blue-700", linkedin: "bg-violet-50 text-violet-700", jobboard: "bg-emerald-50 text-emerald-700", newsapi: "bg-indigo-50 text-indigo-700", conferences: "bg-pink-50 text-pink-700", regulatory: "bg-orange-50 text-orange-700",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.default} ${className}`}>{children}</span>;
};

const MetricCard = ({ label, value, sub, icon: Icon, trend, trendDir, color = "violet" }) => {
  const colors = { violet: "from-violet-500 to-violet-600", sky: "from-sky-500 to-sky-600", emerald: "from-emerald-500 to-emerald-600", amber: "from-amber-500 to-amber-600", red: "from-red-500 to-red-600", indigo: "from-indigo-500 to-indigo-600", green: "from-green-500 to-green-600" };
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

const ConfidenceBadge = ({ confidence }) => {
  let color = "text-red-600 bg-red-50 border-red-200";
  if (confidence >= 80) color = "text-emerald-600 bg-emerald-50 border-emerald-200";
  else if (confidence >= 70) color = "text-amber-600 bg-amber-50 border-amber-200";
  return <span className={`inline-flex items-center justify-center w-12 h-8 rounded-lg border text-xs font-bold ${color}`}>{confidence}%</span>;
};

const SignalTypeIcon = ({ type }) => {
  const map = { "Job Posting": "bg-blue-100 text-blue-600", "Job Change": "bg-violet-100 text-violet-600", "Leadership Change": "bg-red-100 text-red-600", "Technology Signal": "bg-emerald-100 text-emerald-600", "Veeva Migration": "bg-amber-100 text-amber-600", "GCC Expansion": "bg-sky-100 text-sky-600", "Content Engagement": "bg-pink-100 text-pink-600", "Event Attendance": "bg-indigo-100 text-indigo-600", "RFP": "bg-red-100 text-red-700" };
  return <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs ${map[type] || "bg-slate-100 text-slate-600"}`}><Zap size={14} /></span>;
};

const SourceTypeBadge = ({ sourceType }) => {
  const map = { "Newsroom": "newsroom", "LinkedIn": "linkedin", "JobBoard": "jobboard", "NewsAPI": "newsapi", "Conferences": "conferences", "Regulatory": "regulatory", "PRWire": "regulatory", };
  return <Badge variant={map[sourceType] || "default"} className="text-xs">{sourceType}</Badge>;
};

const DashboardScreen = ({ setActiveScreen, setSelectedAccount }) => {
  const signalsByType = useMemo(() => {
    const counts = {};
    SIGNALS.forEach(s => { counts[s.type] = (counts[s.type] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name: name.length > 15 ? name.slice(0, 14) + "..." : name, value }));
  }, []);
  const weeklyActivity = [ { day: "Mon", emails: 4, signals: 2, enriched: 6 }, { day: "Tue", emails: 6, signals: 1, enriched: 12 }, { day: "Wed", emails: 3, signals: 3, enriched: 4 }, { day: "Thu", emails: 8, signals: 4, enriched: 8 }, { day: "Fri", emails: 3, signals: 2, enriched: 8 }, ];
  const COLORS = ["#7c3aed", "#0ea5e9", "#f59e0b", "#10b981", "#ef4444", "#6366f1", "#ec4899", "#14b8a6"];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">GTM Command Center</h1>
          <p className="text-sm text-slate-500 mt-1">Phase v2.0 — Automated Signal Intelligence</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg">
            <Wifi size={14} className="text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">Signal Engine: ACTIVE</span>
          </div>
          <button className="px-3 py-1.5 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 flex items-center gap-1.5"><Zap size={14} /> Run Signal Scan</button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard label="Target Accounts" value={DASHBOARD_METRICS.totalAccounts} sub={`${DASHBOARD_METRICS.tier1} Tier 1 · ${DASHBOARD_METRICS.tier2} Tier 2`} icon={Building2} color="violet" />
        <MetricCard label="Contacts" value={DASHBOARD_METRICS.totalContacts} sub={`${DASHBOARD_METRICS.verified} verified`} icon={Users} color="sky" trend="+12 this week" trendDir="up" />
        <MetricCard label="Signals Today" value={SIGNAL_ENGINE_METRICS.signalsToday} sub="Auto-detected" icon={Radar} color="green" trend={`${SIGNAL_ENGINE_METRICS.signalsThisWeek}/week`} trendDir="up" />
        <MetricCard label="Engine Health" value={`${SIGNAL_ENGINE_METRICS.scraperUptime}%`} sub="Scraper uptime" icon={Cpu} color="emerald" />
        <MetricCard label="Responses" value={DASHBOARD_METRICS.responses} sub="12.5% reply rate" icon={MessageSquare} color="indigo" trend="+1 today" trendDir="up" />
        <MetricCard label="Pipeline Value" value={DASHBOARD_METRICS.pipelineValue} sub="8 active deals" icon={Target} color="red" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  <div className="flex items-center gap-2 mt-1"><span className="text-xs text-slate-500">{s.account}</span><span className="text-xs text-slate-300">·</span><span className="text-xs text-slate-400">{s.date}</span></div>
                </div>
                <ScoreBadge score={s.score} max={15} />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 lg:col-span-1">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Activity size={16} className="text-violet-500" /> Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} /><YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} /><Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)" }} />
              <Area type="monotone" dataKey="emails" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.15} strokeWidth={2} /><Area type="monotone" dataKey="signals" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} /><Area type="monotone" dataKey="enriched" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-4 mt-2">
            <span className="flex items-center gap-1 text-xs text-slate-500"><span className="w-2 h-2 rounded-full bg-violet-500" />Emails</span><span className="flex items-center gap-1 text-xs text-slate-500"><span className="w-2 h-2 rounded-full bg-amber-500" />Signals</span><span className="flex items-center gap-1 text-xs text-slate-500"><span className="w-2 h-2 rounded-full bg-sky-500" />Enriched</span>
          </div>
        </div>
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
          <div className="flex flex-wrap gap-2 justify-center mt-2">{signalsByType.map((s, i) => (<span key={s.name} className="flex items-center gap-1 text-xs text-slate-500"><span className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />{s.name}</span>))}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Clock size={16} className="text-slate-400" /> Recent Activity</h3>
          <div className="space-y-1">
            {ACTIVITY_FEED.map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5 border-b border-slate-50 last:border-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${a.type === "signal" ? "bg-amber-100 text-amber-600" : a.type === "email" ? "bg-violet-100 text-violet-600" : a.type === "sequence" ? "bg-emerald-100 text-emerald-600" : "bg-sky-100 text-sky-600"}`}>
                  {a.type === "signal" ? <Zap size={12} /> : a.type === "email" ? <Mail size={12} /> : a.type === "sequence" ? <PlayCircle size={12} /> : <Users size={12} />}
                </div>
                <div className="flex-1 min-w-0"><p className="text-sm text-slate-700">{a.text}</p><p className="text-xs text-slate-400 mt-0.5">{a.time}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2"><Building2 size={16} className="text-violet-500" /> Top Accounts</h3>
            <button onClick={() => setActiveScreen("accounts")} className="text-xs text-violet-600 hover:text-violet-700 font-medium">View all</button>
          </div>
          <div className="space-y-2">
            {ACCOUNTS.slice(0, 6).map(a => (
              <div key={a.id} onClick={() => { setSelectedAccount(a); setActiveScreen("account-detail"); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: a.color }}>{a.logo}</div>
                <div className="flex-1 min-w-0"><div className="flex items-center gap-2"><span className="text-sm font-medium text-slate-800">{a.name}</span><Badge variant={`tier${a.tier}`}>T{a.tier}</Badge></div><p className="text-xs text-slate-500">{a.signals} signals · {a.contacts} contacts · {a.stage}</p></div>
                <ScoreBadge score={a.icpScore} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const getScraperStatus = (accountId) => { const statuses = ["active", "warning", "error"]; return statuses[accountId % 3]; };
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
          <div className="relative flex-1 min-w-[200px]"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" placeholder="Search accounts..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" /></div>
          <select value={filterTier} onChange={e => setFilterTier(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500"><option value="all">All Tiers</option><option value="1">Tier 1</option><option value="2">Tier 2</option></select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500"><option value="all">All Statuses</option><option value="active">Active</option><option value="cooling">Cooling</option><option value="monitoring">Monitoring</option></select>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-slate-100 bg-slate-50/50">
            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Account</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tier</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ICP Score</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stage</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Signals</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Signal Velocity</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contacts</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Owner</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Activity</th>
            <th className="px-4 py-3"></th>
          </tr></thead>
          <tbody>
            {filtered.map(a => {
              const velocity = SIGNAL_VELOCITY.find(v => v.company === a.name);
              const scraperStatus = getScraperStatus(a.id);
              return (
                <tr key={a.id} onClick={() => { setSelectedAccount(a); setActiveScreen("account-detail"); }} className="border-b border-slate-50 hover:bg-violet-50/30 cursor-pointer transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ background: a.color }}>{a.logo}</div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white ${scraperStatus === "active" ? "bg-emerald-500" : scraperStatus === "warning" ? "bg-amber-500" : "bg-red-500"}`} title={`Scraper: ${scraperStatus}`}></div>
                      </div>
                      <div><p className="text-sm font-medium text-slate-800">{a.name}</p><p className="text-xs text-slate-400">{a.gccLocation} · {a.headcount}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5"><Badge variant={`tier${a.tier}`}>Tier {a.tier}</Badge></td>
                  <td className="px-4 py-3.5"><ScoreBadge score={a.icpScore} /></td>
                  <td className="px-4 py-3.5"><span className="text-sm text-slate-600">{a.stage}</span></td>
                  <td className="px-4 py-3.5"><span className="text-sm font-medium text-slate-700">{a.signals}</span></td>
                  <td className="px-4 py-3.5">
                    {velocity && (
                      <div className="flex gap-1 items-end h-6">
                        {[velocity.week1, velocity.week2, velocity.week3, velocity.week4].map((v, i) => (
                          <div key={i} className="flex-1 bg-gradient-to-t from-violet-500 to-violet-300 rounded-sm" style={{ height: `${(v / 9) * 100}%`, minHeight: "2px" }} title={`Week ${i+1}: ${v} signals`}></div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3.5"><span className="text-sm text-slate-600">{a.contacts}</span></td>
                  <td className="px-4 py-3.5"><span className="text-xs text-slate-500">{a.owner}</span></td>
                  <td className="px-4 py-3.5"><span className="text-xs text-slate-400">{a.lastActivity}</span></td>
                  <td className="px-4 py-3.5"><ChevronRight size={16} className="text-slate-300" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function SignalEngineScreen() {
  const [verifiedSignals, setVerifiedSignals] = useState({});
  const [activeTab, setActiveTab] = useState("scrapers");
  const [signalEngineData, setSignalEngineData] = useState(SIGNALS);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiScanning, setAiScanning] = useState(false);
  const [aiResults, setAiResults] = useState([]);
  const [aiSourceTypes, setAiSourceTypes] = useState({
    "News": false,
    "PR Wires": false,
    "Job Boards": false,
    "LinkedIn": false,
    "Regulatory": false,
    "SEC": false,
  });
  const [aiDateRange, setAiDateRange] = useState("This Week");
  const [aiCompanyFilter, setAiCompanyFilter] = useState("all");
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState(70);

  const signalsBySource = useMemo(() => {
    const grouped = {};
    signalEngineData.forEach(s => {
      grouped[s.sourceType] = (grouped[s.sourceType] || 0) + 1;
    });
    return Object.entries(grouped).map(([type, count]) => ({ name: type, value: count }));
  }, [signalEngineData]);

  const signalsByClassification = useMemo(() => {
    const grouped = {};
    signalEngineData.forEach(s => {
      grouped[s.type] = (grouped[s.type] || 0) + 1;
    });
    return Object.entries(grouped).map(([type, count]) => ({ name: type.length > 12 ? type.slice(0, 11) + "..." : type, value: count }));
  }, [signalEngineData]);

  const confidenceData = [
    { range: "80-100%", count: signalEngineData.filter(s => s.confidence >= 80).length, color: "#10b981" },
    { range: "60-79%", count: signalEngineData.filter(s => s.confidence >= 60 && s.confidence < 80).length, color: "#f59e0b" },
    { range: "&lt;60lt;60%", count: signalEngineData.filter(s => s.confidence < 60).length, color: "#ef4444" },
  ];

  const COLORS = ["#7c3aed", "#0ea5e9", "#f59e0b", "#10b981", "#ef4444", "#6366f1"];

  const toggleVerify = (signalId, status) => {
    setVerifiedSignals(prev => ({ ...prev, [signalId]: status }));
    setSignalEngineData(prev => prev.map(s => s.id === signalId ? { ...s, verified: status } : s));
  };

  const handleAiScan = () => {
    if (!aiPrompt.trim()) return;

    setAiScanning(true);

    // Simulate scanning delay
    setTimeout(() => {
      // Parse prompt and filter signals
      const filtered = signalEngineData.filter(s => {
        let matches = true;

        // Company filter
        if (aiCompanyFilter !== "all") {
          matches = matches && s.account === aiCompanyFilter;
        }

        // Confidence threshold
        matches = matches && s.confidence >= aiConfidenceThreshold;

        // Check if signal is relevant to the prompt
        const promptLower = aiPrompt.toLowerCase();
        const detailLower = s.detail.toLowerCase();
        matches = matches && (detailLower.includes("databricks") || detailLower.includes("snowflake") || detailLower.includes("cdo") || detailLower.includes("cto") || detailLower.includes("expansion") || detailLower.includes("hiring"));

        return matches;
      });

      setAiResults(filtered.slice(0, 6));
      setAiScanning(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Signal Engine Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Automated scraping infrastructure & signal processing</p>
        </div>
        <button className="px-3 py-1.5 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 flex items-center gap-1.5"><RefreshCw size={14} /> Refresh Status</button>
      </div>

      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-emerald-900 flex items-center gap-2"><CheckCircle2 size={18} /> Engine Status: HEALTHY</h3>
            <p className="text-sm text-emerald-700 mt-1">All systems operational</p>
          </div>
          <div className="grid grid-cols-4 gap-6 text-right">
            <div><p className="text-xs text-emerald-600">Scrapers Running</p><p className="text-2xl font-bold text-emerald-900 mt-1">15</p></div>
            <div><p className="text-xs text-emerald-600">Signals Today</p><p className="text-2xl font-bold text-emerald-900 mt-1">{SIGNAL_ENGINE_METRICS.signalsToday}</p></div>
            <div><p className="text-xs text-emerald-600">Classifier Accuracy</p><p className="text-2xl font-bold text-emerald-900 mt-1">{SIGNAL_ENGINE_METRICS.classifierAccuracy}%</p></div>
            <div><p className="text-xs text-emerald-600">Avg Confidence</p><p className="text-2xl font-bold text-emerald-900 mt-1">{SIGNAL_ENGINE_METRICS.avgConfidence}%</p></div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl border border-slate-200 border-b-0">
        <div className="flex items-center gap-0.5 px-5 py-0 flex-wrap">
          <button onClick={() => setActiveTab("scrapers")} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "scrapers" ? "border-violet-600 text-violet-600" : "border-transparent text-slate-600 hover:text-slate-900"}`}><Database size={14} className="inline mr-1.5" /> Scrapers</button>
          <button onClick={() => setActiveTab("pipeline")} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "pipeline" ? "border-violet-600 text-violet-600" : "border-transparent text-slate-600 hover:text-slate-900"}`}><Zap size={14} className="inline mr-1.5" /> Pipeline</button>
          <button onClick={() => setActiveTab("feed")} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "feed" ? "border-violet-600 text-violet-600" : "border-transparent text-slate-600 hover:text-slate-900"}`}><Activity size={14} className="inline mr-1.5" /> Feed</button>
          <button onClick={() => setActiveTab("ai-scanner")} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "ai-scanner" ? "border-violet-600 text-violet-600" : "border-transparent text-slate-600 hover:text-slate-900"}`}><BrainCircuit size={14} className="inline mr-1.5" /> AI Scanner</button>
        </div>
      </div>

      {activeTab === "scrapers" && (
      <div className="bg-white rounded-xl border border-slate-200 p-5 rounded-t-none border-t-0">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Database size={16} className="text-slate-600" /> Scraper Status (15 sources)</h3>
        <div className="overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Source</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Type</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Status</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Last Run</th>
              <th className="text-right px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Items</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Frequency</th>
              <th className="text-right px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Health</th>
            </tr></thead>
            <tbody>
              {SCRAPER_SOURCES.map(src => (
                <tr key={src.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-4 py-3"><span className="font-medium text-slate-800">{src.name}</span></td>
                  <td className="px-4 py-3"><SourceTypeBadge sourceType={src.type} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${src.status === "active" ? "bg-emerald-500" : src.status === "warning" ? "bg-amber-500" : "bg-red-500"}`}></div>
                      <span className="text-xs text-slate-600 capitalize">{src.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-xs text-slate-500">{src.lastRun}</span></td>
                  <td className="px-4 py-3 text-right"><span className="text-xs font-medium text-slate-700">{src.itemsCollected}</span></td>
                  <td className="px-4 py-3"><span className="text-xs text-slate-500">{src.frequency}</span></td>
                  <td className="px-4 py-3 text-right"><span className="text-xs font-medium text-slate-700">{src.health}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {activeTab === "pipeline" && (
      <div className="bg-white rounded-xl border border-slate-200 p-5 rounded-t-none border-t-0">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Zap size={16} className="text-amber-500" /> Signal Processing Pipeline</h3>
        <div className="flex items-center gap-4 py-8">
          <div className="flex-1 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2"><Database size={24} className="text-blue-600" /></div>
            <p className="font-medium text-slate-900 text-sm">Collection</p>
            <p className="text-xs text-slate-500 mt-1">{SCRAPER_SOURCES.reduce((sum, s) => sum + s.itemsCollected, 0)} items/day</p>
          </div>
          <div className="text-slate-300 text-2xl">→</div>
          <div className="flex-1 text-center">
            <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-2"><Filter size={24} className="text-violet-600" /></div>
            <p className="font-medium text-slate-900 text-sm">Deduplication</p>
            <p className="text-xs text-slate-500 mt-1">87% unique</p>
          </div>
          <div className="text-slate-300 text-2xl">→</div>
          <div className="flex-1 text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-2"><BrainCircuit size={24} className="text-indigo-600" /></div>
            <p className="font-medium text-slate-900 text-sm">NLP Classification</p>
            <p className="text-xs text-slate-500 mt-1">{SIGNAL_ENGINE_METRICS.classifierAccuracy}% accurate</p>
          </div>
          <div className="text-slate-300 text-2xl">→</div>
          <div className="flex-1 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2"><Send size={24} className="text-emerald-600" /></div>
            <p className="font-medium text-slate-900 text-sm">HubSpot Push</p>
            <p className="text-xs text-slate-500 mt-1">{SIGNAL_ENGINE_METRICS.signalsToday} today</p>
          </div>
        </div>
      </div>
      )}

      {activeTab === "feed" && (
      <div className="bg-white rounded-xl border border-slate-200 p-5 rounded-t-none border-t-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Real-time Signal Feed (Last 10)</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {signalEngineData.slice(0, 10).map(s => (
                <div key={s.id} className="p-3 border border-slate-100 rounded-lg hover:bg-slate-50">
                  <div className="flex items-start gap-3 justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <SignalTypeIcon type={s.type} />
                        <span className="text-xs font-medium text-slate-700">{s.detail.substring(0, 40)}...</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <SourceTypeBadge sourceType={s.sourceType} />
                        <ConfidenceBadge confidence={s.confidence} />
                        {s.nlpClassified && <Badge variant="default" className="text-xs">AI Classified</Badge>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => toggleVerify(s.id, true)} className={`px-2 py-1 rounded text-xs font-medium transition-colors ${verifiedSignals[s.id] === true ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600 hover:bg-emerald-50"}`}><CheckCircle size={12} className="inline mr-1" />Verify</button>
                      <button onClick={() => toggleVerify(s.id, false)} className={`px-2 py-1 rounded text-xs font-medium transition-colors ${verifiedSignals[s.id] === false ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-600 hover:bg-red-50"}`}><XCircle size={12} className="inline mr-1" />Reject</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Confidence Distribution</h3>
              <div className="space-y-3">
                {confidenceData.map(d => (
                  <div key={d.range}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">{d.range}</span>
                      <span className="text-sm font-bold text-slate-900">{d.count}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="h-full rounded-full" style={{ width: `${(d.count / signalEngineData.length) * 100}%`, background: d.color }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Signals by Source</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={signalsBySource} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
                    {signalsBySource.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 mt-6">
          <h3 className="font-semibold text-slate-900 mb-4">Signals by Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={signalsByClassification}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      )}

      {activeTab === "ai-scanner" && (
      <div className="bg-white rounded-xl border border-slate-200 p-5 rounded-t-none border-t-0 space-y-4">
        {/* Prompt Input Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-900">Scan Prompt</label>
          <textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} placeholder="e.g., Find all CDO/CTO appointments at top 20 pharma companies this week&#10;Scan for Databricks and Snowflake adoption signals in target accounts&#10;Check for GCC expansion news in Hyderabad for pharma companies" className="w-full h-24 p-3 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
          <button onClick={handleAiScan} disabled={aiScanning || !aiPrompt.trim()} className="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"><BrainCircuit size={14} /> {aiScanning ? "Scanning..." : "Run Scan"}</button>
        </div>

        {/* Settings Section */}
        <div className="space-y-3 pb-4 border-b border-slate-200">
          <h3 className="text-sm font-medium text-slate-900">Settings</h3>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-600">Source Types</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(aiSourceTypes).map(source => (
                <label key={source} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={aiSourceTypes[source]} onChange={e => setAiSourceTypes(prev => ({ ...prev, [source]: e.target.checked }))} className="rounded border-slate-300" />
                  <span className="text-xs text-slate-600">{source}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Date Range</label>
              <select value={aiDateRange} onChange={e => setAiDateRange(e.target.value)} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>Custom</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Company Filter</label>
              <select value={aiCompanyFilter} onChange={e => setAiCompanyFilter(e.target.value)} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option value="all">All Accounts</option>
                {ACCOUNTS.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600 block mb-2">Confidence Threshold: {aiConfidenceThreshold}%</label>
            <input type="range" min="0" max="100" step="5" value={aiConfidenceThreshold} onChange={e => setAiConfidenceThreshold(parseInt(e.target.value))} className="w-full" />
          </div>
        </div>

        {/* Processing State */}
        {aiScanning && (
        <div className="text-center py-8">
          <div className="flex justify-center gap-1 mb-3">
            <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
          <p className="text-sm font-medium text-slate-900">Parsing prompt...</p>
          <p className="text-xs text-slate-500 mt-1">Configuring scrapers · Scanning sources · Classifying signals</p>
        </div>
        )}

        {/* Results Section */}
        {!aiScanning && aiResults.length > 0 && (
        <div className="space-y-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <h3 className="text-sm font-medium text-emerald-900">Scan Complete</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div><p className="text-xs text-emerald-600">Signals Found</p><p className="text-lg font-bold text-emerald-900">{aiResults.length}</p></div>
              <div><p className="text-xs text-emerald-600">Classified</p><p className="text-lg font-bold text-emerald-900">{aiResults.filter(s => s.nlpClassified).length}</p></div>
              <div><p className="text-xs text-emerald-600">Avg Confidence</p><p className="text-lg font-bold text-emerald-900">{Math.round(aiResults.reduce((sum, s) => sum + s.confidence, 0) / aiResults.length)}%</p></div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-900">Results</h3>
            {aiResults.map(s => (
              <div key={s.id} className="p-3 border border-slate-100 rounded-lg hover:bg-slate-50">
                <div className="flex items-start gap-3">
                  <SignalTypeIcon type={s.type} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">{s.detail}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs text-slate-600">{s.account}</span>
                      <SourceTypeBadge sourceType={s.sourceType} />
                      <ConfidenceBadge confidence={s.confidence} />
                      {s.nlpClassified && <Badge variant="default" className="text-xs">AI Classified</Badge>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {!aiScanning && aiResults.length === 0 && aiPrompt.trim() && (
        <div className="text-center py-6 text-slate-500">
          <p className="text-sm">No signals matched your criteria. Try adjusting filters or confidence threshold.</p>
        </div>
        )}

        {!aiPrompt.trim() && (
        <div className="text-center py-8 text-slate-400">
          <BrainCircuit size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">Enter a prompt and click "Run Scan" to find relevant signals</p>
        </div>
        )}
      </div>
      )}
    </div>
  );
}

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

function SignalsScreen() {
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [signalData, setSignalData] = useState(SIGNALS);

  const filtered = useMemo(() => signalData.filter(s => {
    if (filterType !== "all" && s.type !== filterType) return false;
    if (filterStatus !== "all" && s.status !== filterStatus) return false;
    return true;
  }), [filterType, filterStatus, signalData]);

  const signalTypes = [...new Set(signalData.map(s => s.type))];
  const autoDetectedCount = signalData.filter(s => s.nlpClassified).length;
  const avgConfidence = Math.round(signalData.reduce((sum, s) => sum + s.confidence, 0) / signalData.length);
  const scraperCount = SCRAPER_SOURCES.filter(s => s.status === "active").length;

  const handleVerifySignal = (signalId) => {
    setSignalData(prev => prev.map(s => s.id === signalId ? { ...s, verified: true, status: "hot" } : s));
  };

  const handleRejectSignal = (signalId) => {
    setSignalData(prev => prev.map(s => s.id === signalId ? { ...s, verified: false, status: "monitor" } : s));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Signal Scanner</h1>
          <p className="text-sm text-slate-500 mt-1">{scraperCount} scrapers active · {signalData.length} signals today · {avgConfidence}% classifier accuracy</p>
        </div>
        <button className="px-3 py-1.5 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 flex items-center gap-1.5"><Zap size={14} /> Run Full Scan</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <MetricCard label="Hot Signals (12+)" value={signalData.filter(s => s.score >= 12).length} icon={AlertTriangle} color="red" sub="Immediate outreach needed" />
        <MetricCard label="Warm Signals (8-11)" value={signalData.filter(s => s.score >= 8 && s.score < 12).length} icon={TrendingUp} color="amber" sub="Nurture sequence" />
        <MetricCard label="Monitor (&lt;8)" value={signalData.filter(s => s.score < 8).length} icon={Eye} color="sky" sub="Watch list" />
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
                <SourceTypeBadge sourceType={s.sourceType} />
                <ConfidenceBadge confidence={s.confidence} />
                {s.nlpClassified && <Badge variant="default" className="text-xs">AI Classified</Badge>}
                <span className="text-xs text-slate-400">{s.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => handleVerifySignal(s.id)} className={`px-2 py-1 rounded text-xs font-medium transition-colors ${s.verified === true ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600 hover:bg-emerald-50"}`}><CheckCircle size={12} className="inline mr-1" />Verify</button>
              <button onClick={() => handleRejectSignal(s.id)} className={`px-2 py-1 rounded text-xs font-medium transition-colors ${s.verified === false ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-600 hover:bg-red-50"}`}><XCircle size={12} className="inline mr-1" />Reject</button>
            </div>
            <div className="text-right flex-shrink-0">
              <ScoreBadge score={s.score} max={15} />
              <div className="flex gap-2 mt-1 text-xs text-slate-400"><span title="Recency">R:{s.recency}</span><span title="Relevance">Rv:{s.relevance}</span><span title="Authority">A:{s.authority}</span></div>
            </div>
            <Badge variant={s.status}>{s.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function SequencesScreen() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900">Sequences</h1><p className="text-sm text-slate-500 mt-1">{SEQUENCES.filter(s => s.status === "active").length} active sequences</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SEQUENCES.map(seq => (
          <div key={seq.id} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start justify-between mb-4">
              <div><h3 className="font-semibold text-slate-900">{seq.name}</h3><p className="text-xs text-slate-500 mt-1">Tier {seq.tier} · {seq.duration}</p></div>
              <Badge variant={seq.status}>{seq.status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-slate-50 rounded-lg"><p className="text-xs text-slate-500">Active</p><p className="text-lg font-bold text-slate-900 mt-1">{seq.active}</p></div>
              <div className="p-3 bg-slate-50 rounded-lg"><p className="text-xs text-slate-500">Steps</p><p className="text-lg font-bold text-slate-900 mt-1">{seq.steps}</p></div>
            </div>
            <div className="flex flex-wrap gap-1">{seq.channels.map(ch => <Badge key={ch} variant="default" className="text-xs">{ch}</Badge>)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PipelineScreen() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900">Pipeline</h1><p className="text-sm text-slate-500 mt-1">{PIPELINE_STAGES.reduce((sum, s) => sum + s.deals.length, 0)} total deals · ${DASHBOARD_METRICS.pipelineValue} potential value</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {PIPELINE_STAGES.map(stage => (
          <div key={stage.name} className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900 text-sm mb-3">{stage.name}</h3>
            <p className="text-2xl font-bold text-slate-700 mb-4">{stage.deals.length}</p>
            <div className="space-y-2">
              {stage.deals.map(deal => (
                <div key={deal.id} className="p-2.5 bg-slate-50 rounded-lg border-l-4" style={{ borderColor: deal.color }}>
                  <p className="text-sm font-medium text-slate-800">{deal.account}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{deal.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmailComposerScreen() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Email Composer</h1>
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">Email composer interface coming soon...</div>
    </div>
  );
}

function AnalyticsScreen() {
  const funnelData = [ { stage: "TAM", value: 52, pct: "100%" }, { stage: "Enriched", value: 38, pct: "73%" }, { stage: "Verified", value: 31, pct: "60%" }, { stage: "In Sequence", value: 8, pct: "15%" }, { stage: "Responded", value: 3, pct: "6%" }, { stage: "Meeting", value: 0, pct: "0%" }, ];
  const outreachPerf = [ { week: "W1", sent: 8, opened: 5, replied: 1, meetings: 0 }, { week: "W2", sent: 16, opened: 11, replied: 2, meetings: 0 }, { week: "W3", sent: 24, opened: 16, replied: 3, meetings: 0 }, ];
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
                {t.accounts.length > 0 && (<div className="flex flex-wrap gap-1 mt-3">{t.accounts.map(a => <Badge key={a} variant="tier1">{a}</Badge>)}</div>)}
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

function AccountDetailScreen({ account, setActiveScreen }) {
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
                  <td className="px-5 py-3"><p className="text-sm font-medium text-slate-800">{c.name}</p><p className="text-xs text-slate-500">{c.title}</p></td>
                  <td className="px-4 py-3"><Badge>{c.persona}</Badge></td>
                  <td className="px-4 py-3"><div className="flex gap-1.5">{c.email && <Mail size={14} className="text-slate-400" />}{c.linkedin && <Linkedin size={14} className="text-blue-500" />}{c.phone && <Phone size={14} className="text-slate-400" />}</div></td>
                  <td className="px-4 py-3"><ScoreBadge score={c.signalScore} max={15} /></td>
                  <td className="px-4 py-3"><span className="text-xs text-slate-600">{c.sequence}</span></td>
                  <td className="px-4 py-3"><Badge variant={c.status}>{c.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
          {accountContacts.length === 0 && <div className="p-8 text-center text-sm text-slate-400">No contacts mapped.</div>}
        </div>
      )}
      {activeTab === "signals" && (
        <div className="space-y-3">
          {accountSignals.length === 0 ? <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-sm text-slate-400">No signals detected.</div> : accountSignals.map(s => (
            <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
              <SignalTypeIcon type={s.type} />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{s.detail}</p>
                <div className="flex items-center gap-3 mt-1"><span className="text-xs text-slate-500">{s.type}</span><span className="text-xs text-slate-400">{s.date}</span><Badge variant={s.weight === "HIGH" ? "hot" : s.weight === "MEDIUM-HIGH" ? "warm" : "default"}>{s.weight}</Badge></div>
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
}

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
    { id: "signal-engine", label: "Signal Engine", icon: Cpu },
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
      case "signal-engine": return <SignalEngineScreen />;
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

      <div className="flex-1 flex flex-col min-w-0">
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

        <div className="flex-1 overflow-y-auto p-6">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}
