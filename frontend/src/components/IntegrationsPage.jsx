import React from 'react';
import { 
  Plus, 
  Video, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  RefreshCw,
  MoreVertical,
  Zap,
  Globe,
  Search
} from 'lucide-react';
import { cn } from '../lib/utils';

const integrations = [
  { id: 'zoom', name: 'Zoom', category: 'Meetings', status: 'Connected', icon: Video, color: 'text-blue-600', bg: 'bg-blue-50', lastSync: '12m ago', description: 'Extract tasks from meeting transcripts and recordings.' },
  { id: 'gmail', name: 'Gmail', category: 'Email', status: 'Connected', icon: Mail, color: 'text-red-500', bg: 'bg-red-50', lastSync: '2h ago', description: 'Monitor email threads for commitments and deadlines.' },
  { id: 'slack', name: 'Slack', category: 'Messaging', status: 'Connected', icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-50', lastSync: 'Just now', description: 'Sync action items from channels and direct messages.' },
  { id: 'teams', name: 'Microsoft Teams', category: 'Meetings', status: 'Disconnected', icon: MessageSquare, color: 'text-indigo-600', bg: 'bg-indigo-50', lastSync: 'Never', description: 'Analyze Teams calls and chat history for tasks.' },
];

const availableIntegrations = [
  { name: 'Outlook', icon: Mail, color: 'text-blue-500' },
  { name: 'Google Calendar', icon: Globe, color: 'text-green-500' },
  { name: 'Jira', icon: Zap, color: 'text-blue-700' },
  { name: 'Notion', icon: FileText, color: 'text-slate-800' },
  { name: 'Asana', icon: CheckCircle2, color: 'text-rose-500' },
  { name: 'Linear', icon: Zap, color: 'text-indigo-500' },
];

function FileText({ size, className }) {
  return <Zap size={size} className={className} />; // Placeholder
}

export function IntegrationsPage() {
  return (
    <div className="h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Integration Management</h1>
          <p className="text-slate-500 text-sm">Connect your communication tools to start extracting commitments.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-secondary transition-all font-medium text-sm shadow-lg shadow-primary/20">
          <Plus size={18} />
          Add New Integration
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            Active Connections
            <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">3 Online</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {integrations.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-primary/30 transition-all group relative overflow-hidden">
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className={cn("p-3 rounded-xl shadow-sm", item.bg, item.color)}>
                    <item.icon size={24} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide",
                      item.status === 'Connected' ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                    )}>
                      {item.status}
                    </span>
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
                <div className="relative z-10">
                  <h4 className="font-bold text-slate-900 mb-1">{item.name}</h4>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                      <RefreshCw size={12} className={cn(item.status === 'Connected' && "animate-spin-slow")} />
                      Last sync: {item.lastSync}
                    </div>
                    <button className={cn(
                      "text-xs font-bold transition-colors",
                      item.status === 'Connected' ? "text-primary hover:text-secondary" : "text-slate-900 hover:text-primary"
                    )}>
                      {item.status === 'Connected' ? 'Manage' : 'Connect'}
                    </button>
                  </div>
                </div>
                {item.status === 'Connected' && (
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 max-w-md">
              <h3 className="text-2xl font-bold mb-3">Enterprise Security</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Your data is encrypted end-to-end. We never store raw transcripts or emails, only the extracted commitments you approve.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <CheckCircle2 size={16} className="text-primary" />
                  SOC2 Compliant
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <CheckCircle2 size={16} className="text-primary" />
                  GDPR Ready
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-bold text-slate-800 text-lg">Add New Integration</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search tools..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/50 text-slate-700 placeholder-slate-400"
              />
            </div>
            
            <div className="space-y-4">
              {availableIntegrations.map((tool, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg bg-white shadow-sm border border-slate-100", tool.color)}>
                      <tool.icon size={18} />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors">{tool.name}</span>
                  </div>
                  <Plus size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-bold hover:border-primary hover:text-primary transition-all uppercase tracking-widest">
              Request Integration
            </button>
          </div>

          <div className="bg-violet-50 rounded-2xl p-6 border border-violet-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary text-white p-2 rounded-lg">
                <Zap size={18} fill="currentColor" />
              </div>
              <h4 className="font-bold text-slate-900">Custom Webhook</h4>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Connect any tool using our API. Perfect for custom internal tools or niche platforms.
            </p>
            <button className="text-primary text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
              View Documentation
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
