import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  ArrowUpRight,
  Video,
  Mail,
  MessageSquare,
  Pause,
  Square,
  ChevronRight,
  Calendar,
  CheckSquare,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { apiGet } from '../api';

const iconFor = (kind) => {
  if (kind === 'outlook' || kind === 'gmail') return Mail;
  if (kind === 'slack') return MessageSquare;
  if (kind === 'calendar') return Calendar;
  return Video;
};

export function Dashboard() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    apiGet('/dashboard/')
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p className="text-red-600 text-sm">Could not load dashboard: {error}</p>;
  }
  if (!data) {
    return <p className="text-slate-500 text-sm">Loading workspace from Django…</p>;
  }

  const stats = [
    { label: 'Active Commitments', value: String(data.stats.active_commitments), sub: `${data.stats.high_priority} High Priority`, color: 'bg-primary', text: 'text-white' },
    { label: 'Upcoming Deadlines', value: String(data.stats.upcoming_deadlines), sub: `${data.stats.due_today} Due Today`, color: 'bg-white', text: 'text-slate-900', trend: 'text-orange-600' },
    { label: 'New Insights (Today)', value: String(data.stats.new_insights), sub: `From ${data.stats.meetings_today} meetings`, color: 'bg-white', text: 'text-slate-900' },
    { label: 'Extraction Accuracy', value: `${data.stats.accuracy}%`, sub: 'Based on stored confidence', color: 'bg-white', text: 'text-slate-900', trend: 'text-green-600' },
  ];

  const auto = data.auto_resolution || [];
  const automated = auto.find((item) => item.name === 'Done')?.value ?? 0;
  const urgent = data.urgent;

  return (
    <div className="h-full">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Commitment Extractor</h1>
          <p className="text-slate-500 text-sm">Live data from the Django SQLite backend.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className={cn('p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group', stat.color)}>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <h3 className={cn('font-medium', stat.color === 'bg-primary' ? 'text-violet-100' : 'text-slate-600')}>{stat.label}</h3>
              <div className={cn('p-1.5 rounded-lg backdrop-blur-sm', stat.color === 'bg-primary' ? 'bg-white/20' : 'bg-slate-100 text-slate-500')}>
                <ArrowUpRight size={14} />
              </div>
            </div>
            <div className="relative z-10">
              <div className={cn('text-4xl font-bold mb-1', stat.text)}>{stat.value}</div>
              <p className={cn('text-xs font-medium', stat.trend || (stat.color === 'bg-primary' ? 'text-violet-200 bg-black/20 inline-block px-2 py-1 rounded-md' : 'text-slate-500'))}>
                {stat.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Extraction Efficiency</h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.efficiency}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="tasks" fill="#1e293b" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="auto" fill="#6D28D9" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl shadow-md text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/40 rounded-full blur-3xl"></div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">High Priority Action</h3>
              <span className="bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Urgent</span>
            </div>
            {urgent ? (
              <div className="mb-6">
                <p className="text-xs text-slate-400 mb-1">Source: {urgent.source}</p>
                <h4 className="text-xl font-semibold leading-tight mb-2">{urgent.title}</h4>
                <p className="text-sm text-slate-300 line-clamp-2">{urgent.excerpt}</p>
              </div>
            ) : (
              <p className="text-slate-400">No high-priority tasks.</p>
            )}
          </div>
          <div>
            <a href="/tasks" className="w-full bg-white text-slate-900 font-semibold py-3 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
              Review Draft
              <ChevronRight size={16} />
            </a>
            {urgent && (
              <div className="mt-3 flex justify-between items-center text-xs text-slate-400">
                <span>AI Confidence: {urgent.confidence}%</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Meeting Action Queue</h3>
          </div>
          <div className="space-y-4">
            {(data.queue || []).map((item) => {
              const Icon = iconFor(item.source_kind);
              return (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-transparent">
                  <div className="flex items-start gap-4 mb-3 sm:mb-0">
                    <div className="bg-white p-2 rounded-lg shadow-sm text-primary">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.source} • {item.deadline || 'No deadline'}</p>
                      {item.badge && (
                        <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">{item.badge}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-sm font-bold text-slate-400">{item.confidence}%</span>
                    <a href="/tasks" className="text-xs font-medium px-4 py-2 rounded-lg bg-primary text-white">
                      {item.action_label || 'Open'}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
            <h3 className="font-bold text-slate-800 text-lg mb-6 self-start w-full">Task Auto-Resolution</h3>
            <div className="relative w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={auto} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {auto.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-3xl font-bold text-slate-900">{automated}%</span>
                <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Automated</span>
              </div>
            </div>
          </div>

          <div className="bg-black rounded-2xl p-6 shadow-sm overflow-hidden relative min-h-[200px] flex flex-col justify-between">
            <div className="relative z-20 text-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-slate-300 text-sm">Live Transcript</h3>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
              <div className="text-center mb-6">
                <div className="text-4xl font-mono font-light tracking-wider mb-2">
                  {data.live_meeting ? 'LIVE' : 'IDLE'}
                </div>
                <p className="text-xs text-slate-400">"{data.live_meeting?.title || 'No live meeting'}"</p>
              </div>
              <div className="flex justify-center gap-4">
                <button className="bg-white text-black rounded-full p-2.5"><Pause size={18} fill="currentColor" /></button>
                <button className="bg-red-500 text-white rounded-full p-2.5"><Square size={18} fill="currentColor" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
