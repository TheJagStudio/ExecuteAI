import React from 'react';
import { Plus, Video, Mail, MessageSquare, Globe, Zap, CheckCircle2, MoreVertical } from 'lucide-react';
import { cn } from '../lib/utils';
import { apiGet, apiPost } from '../api';

const ICONS = { video: Video, mail: Mail, message: MessageSquare, globe: Globe, zap: Zap, check: CheckCircle2 };

export function IntegrationsPage() {
  const [items, setItems] = React.useState([]);
  const [error, setError] = React.useState('');

  const load = () => apiGet('/integrations/').then(setItems).catch((err) => setError(err.message));
  React.useEffect(() => { load(); }, []);

  const toggle = async (item) => {
    await apiPost(`/integrations/${item.id}/toggle/`);
    load();
  };

  const active = items.filter((i) => !i.catalog);
  const catalog = items.filter((i) => i.catalog);
  const online = active.filter((i) => i.connected).length;

  return (
    <div className="h-full">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Integration Management</h1>
          <p className="text-slate-500 text-sm">Connection state is stored in SQLite via Django.</p>
        </div>
      </div>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            Active Connections
            <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">{online} Online</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {active.map((item) => {
              const Icon = ICONS[item.icon] || Zap;
              return (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-slate-50 text-primary"><Icon size={24} /></div>
                    <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full uppercase', item.connected ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500')}>
                      {item.connected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">{item.name}</h4>
                  <p className="text-xs text-slate-500 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Last sync {item.last_sync}</span>
                    <button onClick={() => toggle(item)} className="text-xs font-bold text-primary">{item.connected ? 'Disconnect' : 'Connect'}</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2"><Plus size={16} /> Available</h3>
          <div className="space-y-3">
            {catalog.map((item) => {
              const Icon = ICONS[item.icon] || Zap;
              return (
                <button key={item.id} onClick={() => toggle(item)} className="w-full flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-primary/40">
                  <Icon size={18} className="text-slate-500" />
                  <span className="text-sm font-medium">{item.name}</span>
                  <MoreVertical size={14} className="ml-auto text-slate-300" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
