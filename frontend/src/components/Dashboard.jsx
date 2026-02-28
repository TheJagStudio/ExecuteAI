import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal, 
  Video, 
  Mail, 
  MessageSquare,
  Play,
  Pause,
  Square,
  ChevronRight,
  Calendar,
  CheckSquare
} from 'lucide-react';
import { cn } from '../lib/utils';

const efficiencyData = [
  { name: 'Mon', tasks: 40, auto: 65 },
  { name: 'Tue', tasks: 55, auto: 45 },
  { name: 'Wed', tasks: 70, auto: 85 },
  { name: 'Thu', tasks: 45, auto: 60 },
  { name: 'Fri', tasks: 30, auto: 50 },
  { name: 'Sat', tasks: 20, auto: 35 },
  { name: 'Sun', tasks: 15, auto: 10 },
];

const autoResolutionData = [
  { name: 'Done', value: 65, color: '#6D28D9' },
  { name: 'Edited', value: 20, color: '#FBBF24' },
  { name: 'Manual', value: 15, color: '#E2E8F0' },
];

export function Dashboard() {
  return (
    <div className="h-full">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Commitment Extractor</h1>
          <p className="text-slate-500 text-sm">AI-powered analysis of your recent meetings and emails.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 bg-white text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-medium text-sm">
            Parser Config
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-secondary transition-colors font-medium text-sm shadow-lg shadow-primary/25">
            Upload Transcript
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Active Commitments', value: '24', sub: '8 High Priority', color: 'bg-primary', text: 'text-white' },
          { label: 'Upcoming Deadlines', value: '12', sub: '4 Due Today', color: 'bg-white', text: 'text-slate-900', trend: 'text-orange-600' },
          { label: 'New Insights (Today)', value: '7', sub: 'From 3 meetings', color: 'bg-white', text: 'text-slate-900' },
          { label: 'Extraction Accuracy', value: '94%', sub: 'Based on user feedback', color: 'bg-white', text: 'text-slate-900', trend: 'text-green-600' },
        ].map((stat, i) => (
          <div key={i} className={cn("p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group", stat.color)}>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <h3 className={cn("font-medium", stat.color === 'bg-primary' ? "text-violet-100" : "text-slate-600")}>{stat.label}</h3>
              <div className={cn("p-1.5 rounded-lg backdrop-blur-sm", stat.color === 'bg-primary' ? "bg-white/20" : "bg-slate-100 text-slate-500")}>
                <ArrowUpRight size={14} />
              </div>
            </div>
            <div className="relative z-10">
              <div className={cn("text-4xl font-bold mb-1", stat.text)}>{stat.value}</div>
              <p className={cn("text-xs font-medium", stat.trend || (stat.color === 'bg-primary' ? "text-violet-200 bg-black/20 inline-block px-2 py-1 rounded-md" : "text-slate-500"))}>
                {stat.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Efficiency Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Extraction Efficiency</h3>
            <div className="flex gap-4 text-xs font-medium">
              <div className="flex items-center gap-2 text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                Tasks Created
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                Auto-Executed
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="tasks" fill="#1e293b" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="auto" fill="#6D28D9" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* High Priority Card */}
        <div className="bg-slate-900 p-6 rounded-2xl shadow-md text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/40 rounded-full blur-3xl"></div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">High Priority Action</h3>
              <span className="bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Urgent</span>
            </div>
            <div className="mb-6">
              <p className="text-xs text-slate-400 mb-1">Source: Weekly Sync (Today, 10:00 AM)</p>
              <h4 className="text-xl font-semibold leading-tight mb-2">Review & Approve Q3 Budget Proposal</h4>
              <p className="text-sm text-slate-300 line-clamp-2">John mentioned the deadline is EOD. The draft is attached in the thread.</p>
            </div>
          </div>
          <div>
            <button className="w-full bg-white text-slate-900 font-semibold py-3 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
              Review Draft
              <ChevronRight size={16} />
            </button>
            <div className="mt-3 flex justify-between items-center text-xs text-slate-400">
              <span>AI Confidence: 98%</span>
              <button className="hover:text-white transition-colors">Dismiss</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Action Queue */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Meeting Action Queue</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">Filter</button>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">Rule</button>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Send Partnership Contract', sub: 'To: Jane Doe • Source: Zoom (1h ago)', icon: Video, color: 'text-primary', badge: 'DRAFT GENERATED', badgeColor: 'bg-green-100 text-green-700', action: 'Send Email', confidence: '92%' },
              { title: 'Schedule Follow-up: Tech Review', sub: 'With: Engineering Team • Source: Email Thread', icon: Calendar, color: 'text-amber-500', badge: 'NEEDS INPUT', badgeColor: 'bg-amber-100 text-amber-700', action: 'Review Details', confidence: '55%' },
              { title: 'Update Jira Ticket #4022', sub: 'Assignee: Alice W. • Source: Slack', icon: CheckSquare, color: 'text-blue-500', badge: 'READY', badgeColor: 'bg-blue-100 text-blue-700', action: 'Execute', confidence: '95%' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 group">
                <div className="flex items-start gap-4 mb-3 sm:mb-0">
                  <div className={cn("bg-white p-2 rounded-lg shadow-sm", item.color)}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                    <span className={cn("inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded", item.badgeColor)}>{item.badge}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-sm font-bold text-slate-400">{item.confidence}</span>
                  <button className={cn(
                    "text-xs font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm",
                    item.action === 'Review Details' ? "bg-white border border-slate-200 text-slate-700" : "bg-primary text-white hover:bg-secondary shadow-primary/20"
                  )}>
                    {item.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auto Resolution & Live Transcript */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
            <h3 className="font-bold text-slate-800 text-lg mb-6 self-start w-full">Task Auto-Resolution</h3>
            <div className="relative w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={autoResolutionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {autoResolutionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-3xl font-bold text-slate-900">65%</span>
                <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Automated</span>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-6 w-full">
              {autoResolutionData.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-[10px] font-medium text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black rounded-2xl p-6 shadow-sm overflow-hidden relative min-h-[200px] flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
            <div className="relative z-20 text-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-slate-300 text-sm">Live Transcript</h3>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </div>
              <div className="text-center mb-6">
                <div className="text-4xl font-mono font-light tracking-wider mb-2">00:42:15</div>
                <p className="text-xs text-slate-400">"Weekly Product Sync"</p>
              </div>
              <div className="flex justify-center gap-4">
                <button className="bg-white text-black rounded-full p-2.5 hover:bg-slate-200 transition-colors">
                  <Pause size={18} fill="currentColor" />
                </button>
                <button className="bg-red-500 text-white rounded-full p-2.5 hover:bg-red-600 transition-colors">
                  <Square size={18} fill="currentColor" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

