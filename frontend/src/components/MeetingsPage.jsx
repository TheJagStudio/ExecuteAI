import React from 'react';
import { 
  ArrowLeft, 
  Search, 
  Bell, 
  Download, 
  MoreVertical, 
  Play, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Copy,
  Share2,
  ChevronRight,
  Sparkles,
  Video
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const attendees = [
  { name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { name: 'Alex Morgan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
  { name: 'Marcus Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus' },
];

const transcript = [
  { 
    time: '12:42', 
    speaker: 'Alex Morgan', 
    text: "Alright, let's get started. The main goal for today is to finalize the feature set for the Q3 release. Does everyone have the latest specs?" 
  },
  { 
    time: '12:45', 
    speaker: 'Sarah Chen', 
    text: "Yes, I've reviewed them. I'm a bit concerned about the authentication service timeline. It seems tight given the current backend resources." 
  },
  { 
    time: '12:48', 
    speaker: 'Marcus Johnson', 
    isAction: true,
    text: "I understand the concern. I will schedule a sync with the backend team tomorrow to see if we can expedite the auth module." 
  },
  { 
    time: '12:50', 
    speaker: 'Alex Morgan', 
    text: "That sounds good. Let's make sure we have that sorted before the sprint planning on Monday." 
  },
  { 
    time: '12:52', 
    speaker: 'Sarah Chen', 
    isAction: true,
    text: "Okay. I'll update the documentation to reflect the new API endpoints by end of day today, so the frontend team isn't blocked." 
  },
  { 
    time: '12:55', 
    speaker: 'Alex Morgan', 
    text: "Perfect. Moving on to the design review..." 
  },
];

const commitments = [
  {
    id: 1,
    speaker: 'Marcus Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    time: '12:48',
    text: 'Schedule a sync with the backend team regarding auth module.',
    status: 'pending'
  },
  {
    id: 2,
    speaker: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    time: '12:52',
    text: 'Update documentation to reflect new API endpoints.',
    status: 'pending'
  },
  {
    id: 3,
    speaker: 'Alex Morgan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    time: '13:05',
    text: 'Send sprint report to stakeholders.',
    status: 'completed',
    platform: 'Asana'
  }
];

export function MeetingsPage() {
  return (
    <div className="h-full flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200">
      {/* Header */}
      <header className="px-8 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <ArrowLeft size={20} className="text-slate-500" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <span>Meetings</span>
              <ChevronRight size={10} />
              <span>Product</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-900">Q3 Product Roadmap Sync</h1>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md border border-emerald-100">
                Completed
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search transcript..." 
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm w-64 focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <button className="p-2 text-slate-400 hover:text-slate-600">
            <Bell size={20} />
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-secondary transition-all">
            <Share2 size={16} />
            Export
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Video & Summary */}
        <div className="w-80 border-r border-slate-100 p-8 overflow-y-auto hide-scrollbar space-y-8">
          <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
              alt="Meeting Preview" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Play fill="currentColor" size={20} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attendees</h3>
            <div className="flex items-center -space-x-2">
              {attendees.map((person, i) => (
                <img 
                  key={i}
                  src={person.avatar} 
                  alt={person.name} 
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">
                +2
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Summary</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              The team discussed the Q3 product roadmap with a focus on the new mobile app launch. Sarah raised concerns about the timeline for the authentication service. Marcus committed to finalizing the API specs by Friday.
            </p>
          </div>
        </div>

        {/* Middle Column: Transcript */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Transcript</h2>
            <div className="flex items-center gap-4 text-slate-400">
              <button className="hover:text-slate-600 transition-colors">
                <Download size={18} />
              </button>
              <button className="hover:text-slate-600 transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 space-y-8 hide-scrollbar">
            {transcript.map((item, i) => (
              <div key={i} className={cn(
                "flex gap-6 group",
                item.isAction && "bg-violet-50/50 -mx-8 px-8 py-6 border-y border-violet-100"
              )}>
                <span className="text-xs font-bold text-slate-300 w-12 pt-1">{item.time}</span>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{item.speaker}</span>
                    {item.isAction && (
                      <span className="px-2 py-0.5 bg-primary text-white text-[8px] font-bold rounded uppercase tracking-wider">
                        Action Detected
                      </span>
                    )}
                  </div>
                  <p className={cn(
                    "text-sm leading-relaxed",
                    item.isAction ? "text-slate-700 font-medium" : "text-slate-500"
                  )}>
                    {item.isAction ? (
                      <>
                        {item.text.split(/(I will schedule a sync with the backend team tomorrow|I'll update the documentation to reflect the new API endpoints)/).map((part, j) => (
                          part.match(/(I will schedule a sync with the backend team tomorrow|I'll update the documentation to reflect the new API endpoints)/) ? (
                            <span key={j} className="bg-primary/20 border-b-2 border-primary text-slate-900">{part}</span>
                          ) : part
                        ))}
                      </>
                    ) : item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Commitments */}
        <div className="w-96 border-l border-slate-100 flex flex-col overflow-hidden bg-slate-50/30">
          <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <div className="text-primary">
                <Sparkles size={18} />
              </div>
              <h2 className="font-bold text-slate-900">AI Commitments</h2>
            </div>
            <span className="px-2 py-0.5 bg-violet-100 text-primary text-[10px] font-bold rounded-full">
              3 Found
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
            {commitments.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={item.avatar} alt={item.speaker} className="w-8 h-8 rounded-full border border-slate-100" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.speaker}</h4>
                      <p className="text-[10px] text-slate-400">{item.time}</p>
                    </div>
                  </div>
                  <button className="text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
                
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {item.text}
                </p>

                {item.status === 'completed' ? (
                  <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold py-2 px-3 bg-emerald-50 rounded-xl w-fit">
                    <CheckCircle2 size={14} />
                    Added to {item.platform}
                  </div>
                ) : (
                  <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-primary/10 hover:bg-secondary transition-all">
                    <Plus size={14} />
                    Add Task
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          <div className="p-6 bg-white border-t border-slate-100">
            <button className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Copy size={16} />
              Copy All Actions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
