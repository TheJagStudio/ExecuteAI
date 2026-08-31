import React from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Zap, Clock, Target } from 'lucide-react';
import { cn } from '../lib/utils';
import { apiGet } from '../api';

export function AnalyticsPage() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    apiGet('/analytics/').then(setData).catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-red-600 text-sm">{error}</p>;
  if (!data) return <p className="text-slate-500 text-sm">Loading analytics…</p>;

  const stats = [
    { label: 'Follow-through Rate', value: `${data.stats.follow_through}%`, trend: '+4.2%', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Response Velocity', value: data.stats.response_velocity, trend: '-12%', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Commitment Density', value: String(data.stats.commitment_density), sub: 'per meeting', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="h-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Analytics & AI Insights</h1>
        <p className="text-slate-500 text-sm">Computed from SQLite tasks and meetings.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div className={cn('p-2 rounded-lg', stat.bg, stat.color)}><stat.icon size={20} /></div>
              {stat.trend && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">{stat.trend}</span>}
            </div>
            <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
            <p className="text-sm text-slate-500 mt-1">{stat.label}{stat.sub ? ` • ${stat.sub}` : ''}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 h-72">
          <h3 className="font-bold mb-4">Commitment velocity</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={data.velocity}><XAxis dataKey="name" /><Tooltip /><Area dataKey="velocity" stroke="#6D28D9" fill="#ddd6fe" /></AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 h-72">
          <h3 className="font-bold mb-4">Sentiment</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={data.sentiment}><XAxis dataKey="name" /><Tooltip /><Line dataKey="sentiment" stroke="#2563eb" /></LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <h3 className="font-bold mb-4">Top committers</h3>
        <div className="space-y-3">
          {(data.top_committers || []).map((person) => (
            <div key={person.name} className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">{person.name}</p>
                <p className="text-xs text-slate-500">{person.role}</p>
              </div>
              <span className={cn('text-sm font-bold px-3 py-1 rounded-full', person.color)}>{person.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
