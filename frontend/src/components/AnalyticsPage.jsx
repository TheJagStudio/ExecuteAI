import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  Smile, 
  Clock, 
  ChevronRight,
  ArrowUpRight,
  Target
} from 'lucide-react';
import { cn } from '../lib/utils';

const velocityData = [
  { name: 'Week 1', velocity: 45 },
  { name: 'Week 2', velocity: 52 },
  { name: 'Week 3', velocity: 48 },
  { name: 'Week 4', velocity: 61 },
  { name: 'Week 5', velocity: 55 },
  { name: 'Week 6', velocity: 67 },
  { name: 'Week 7', velocity: 72 },
];

const sentimentData = [
  { name: 'Mon', sentiment: 75 },
  { name: 'Tue', sentiment: 62 },
  { name: 'Wed', sentiment: 88 },
  { name: 'Thu', sentiment: 82 },
  { name: 'Fri', sentiment: 91 },
];

const topCommitters = [
  { name: 'Sarah Chen', role: 'Project Manager', count: 42, color: 'bg-violet-100 text-violet-600' },
  { name: 'John Doe', role: 'Sales Lead', count: 38, color: 'bg-blue-100 text-blue-600' },
  { name: 'Alice Wong', role: 'Lead Engineer', count: 31, color: 'bg-emerald-100 text-emerald-600' },
  { name: 'Mike Ross', role: 'Product Designer', count: 24, color: 'bg-orange-100 text-orange-600' },
];

export function AnalyticsPage() {
  return (
    <div className="h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics & AI Insights</h1>
          <p className="text-slate-500 text-sm">Deep dive into team commitment patterns and follow-through rates.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button className="px-4 py-1.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-800">Last 30 Days</button>
          <button className="px-4 py-1.5 text-slate-500 text-xs font-medium hover:text-slate-800">Last 90 Days</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Follow-through Rate', value: '87%', trend: '+4.2%', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Response Velocity', value: '2.4h', trend: '-12%', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Commitment Density', value: '4.2', sub: 'per meeting', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-lg", stat.bg, stat.color)}>
                <stat.icon size={20} />
              </div>
              <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", stat.trend?.startsWith('+') ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700")}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.label}</h3>
            <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
            {stat.sub && <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Commitment Velocity</h3>
            <div className="text-xs font-medium text-slate-400">Tasks extracted per week</div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={velocityData}>
                <defs>
                  <linearGradient id="colorVel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6D28D9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="velocity" stroke="#6D28D9" strokeWidth={3} fillOpacity={1} fill="url(#colorVel)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Meeting Sentiment Analysis</h3>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
              <Smile size={14} />
              Highly Positive
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sentimentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="sentiment" fill="#6D28D9" radius={[4, 4, 0, 0]} barSize={30}>
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.sentiment > 80 ? '#6D28D9' : entry.sentiment > 70 ? '#8B5CF6' : '#C4B5FD'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Top Committers</h3>
            <button className="text-xs text-primary font-bold hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-50">
            {topCommitters.map((person, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold", person.color)}>
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{person.name}</h4>
                    <p className="text-xs text-slate-500">{person.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-900">{person.count}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Tasks</div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between">
          <div>
            <div className="bg-primary/20 p-3 rounded-2xl w-fit mb-6">
              <TrendingUp size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Recommendation</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Your team's commitment density has increased by <span className="text-white font-bold">18%</span> this month. We recommend enabling "Auto-Draft Follow-ups" for Sarah Chen to save ~4h/week.
            </p>
          </div>
          <button className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
            Enable Auto-Draft
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
