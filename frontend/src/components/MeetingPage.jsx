import React from 'react';
import { 
  ArrowLeft, 
  Search, 
  Bell, 
  Share, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Copy,
  Play
} from 'lucide-react';
import { cn } from '../lib/utils';

export function MeetingPage() {
  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-slate-900 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Meetings</span>
              <span>›</span>
              <span>Product</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold text-slate-900">Q3 Product Roadmap Sync</h1>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Completed</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search transcript..." 
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none w-64"
            />
          </div>
          <button className="text-slate-400 hover:text-slate-900 transition-colors">
            <Bell size={20} />
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-secondary transition-colors">
            <Share size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 min-h-0">
        {/* Left Column - Video & Summary */}
        <div className="w-80 border-r border-slate-100 p-6 overflow-y-auto hide-scrollbar flex flex-col gap-8">
          {/* Video Placeholder */}
          <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800" 
              alt="Meeting Recording" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={24} className="text-white ml-1" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Attendees */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Attendees</h3>
            <div className="flex -space-x-2">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Alex" className="w-8 h-8 rounded-full border-2 border-white bg-slate-100" />
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" className="w-8 h-8 rounded-full border-2 border-white bg-slate-100" />
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" alt="Marcus" className="w-8 h-8 rounded-full border-2 border-white bg-slate-100" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                +2
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Summary</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              The team discussed the Q3 product roadmap with a focus on the new mobile app launch. Sarah raised concerns about the timeline for the authentication service. Marcus committed to finalizing the API specs by Friday.
            </p>
          </div>
        </div>

        {/* Middle Column - Transcript */}
        <div className="flex-1 border-r border-slate-100 flex flex-col min-w-0">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h2 className="font-bold text-slate-900">Transcript</h2>
            <div className="flex items-center gap-3">
              <button className="text-slate-400 hover:text-slate-900 transition-colors"><Download size={16} /></button>
              <button className="text-slate-400 hover:text-slate-900 transition-colors"><Search size={16} /></button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-8">
            {/* Transcript Item 1 */}
            <div className="flex gap-4">
              <span className="text-xs font-mono text-slate-400 mt-1 w-10 shrink-0">12:42</span>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Alex Morgan</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Alright, let's get started. The main goal for today is to finalize the feature set for the Q3 release. Does everyone have the latest specs?
                </p>
              </div>
            </div>

            {/* Transcript Item 2 */}
            <div className="flex gap-4">
              <span className="text-xs font-mono text-slate-400 mt-1 w-10 shrink-0">12:45</span>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1 text-primary">Sarah Chen</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Yes, I've reviewed them. I'm a bit concerned about the authentication service timeline. It seems tight given the current backend resources.
                </p>
              </div>
            </div>

            {/* Transcript Item 3 - Highlighted */}
            <div className="flex gap-4 bg-violet-50/50 p-4 rounded-xl border border-violet-100 -mx-4">
              <span className="text-xs font-mono text-primary mt-1 w-10 shrink-0">12:48</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-bold text-slate-900">Marcus Johnson</h4>
                  <span className="px-1.5 py-0.5 bg-primary text-white text-[10px] font-bold rounded">Action Detected</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  I understand the concern. <span className="bg-violet-200/50 text-slate-900 font-medium px-1 rounded">I will schedule a sync with the backend team tomorrow</span> to see if we can expedite the auth module.
                </p>
              </div>
            </div>

            {/* Transcript Item 4 */}
            <div className="flex gap-4">
              <span className="text-xs font-mono text-slate-400 mt-1 w-10 shrink-0">12:50</span>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Alex Morgan</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  That sounds good. Let's make sure we have that sorted before the sprint planning on Monday.
                </p>
              </div>
            </div>

            {/* Transcript Item 5 - Highlighted */}
            <div className="flex gap-4 bg-violet-50/50 p-4 rounded-xl border border-violet-100 -mx-4">
              <span className="text-xs font-mono text-primary mt-1 w-10 shrink-0">12:52</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-bold text-primary">Sarah Chen</h4>
                  <span className="px-1.5 py-0.5 bg-primary text-white text-[10px] font-bold rounded">Action Detected</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Okay. <span className="bg-violet-200/50 text-slate-900 font-medium px-1 rounded">I'll update the documentation to reflect the new API endpoints</span> by end of day today, so the frontend team isn't blocked.
                </p>
              </div>
            </div>

            {/* Transcript Item 6 */}
            <div className="flex gap-4">
              <span className="text-xs font-mono text-slate-400 mt-1 w-10 shrink-0">12:55</span>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Alex Morgan</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Perfect. Moving on to the design review...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - AI Commitments */}
        <div className="w-80 flex flex-col bg-slate-50/50">
          <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-2">
              <SparklesIcon />
              <h2 className="font-bold text-slate-900">AI Commitments</h2>
            </div>
            <span className="px-2 py-0.5 bg-violet-100 text-primary text-xs font-bold rounded-full">3 Found</span>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-4">
            {/* Commitment Card 1 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" alt="Marcus" className="w-5 h-5 rounded-full bg-slate-100" />
                  <span className="text-xs font-bold text-slate-900">Marcus Johnson</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">12:48</span>
              </div>
              <p className="text-sm text-slate-700 mb-4">
                Schedule a sync with the backend team regarding auth module.
              </p>
              <div className="flex items-center gap-2">
                <button className="flex-1 bg-primary text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-secondary transition-colors">
                  <CheckCircle2 size={14} />
                  Add Task
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Commitment Card 2 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" className="w-5 h-5 rounded-full bg-slate-100" />
                  <span className="text-xs font-bold text-slate-900">Sarah Chen</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">12:52</span>
              </div>
              <p className="text-sm text-slate-700 mb-4">
                Update documentation to reflect new API endpoints.
              </p>
              <div className="flex items-center gap-2">
                <button className="flex-1 bg-primary text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-secondary transition-colors">
                  <CheckCircle2 size={14} />
                  Add Task
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Commitment Card 3 - Completed */}
            <div className="bg-white/50 p-4 rounded-xl border border-slate-200 shadow-sm opacity-60">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Alex" className="w-5 h-5 rounded-full bg-slate-100 grayscale" />
                  <span className="text-xs font-bold text-slate-500">Alex Morgan</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">13:05</span>
              </div>
              <p className="text-sm text-slate-400 mb-4 line-through">
                Send sprint report to stakeholders.
              </p>
              <div className="flex items-center justify-center gap-1 text-emerald-600 text-xs font-bold py-1">
                <CheckCircle2 size={14} />
                Added to Asana
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
              <Copy size={16} />
              Copy All Actions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
