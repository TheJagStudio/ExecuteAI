import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Video,
  Mail,
  Edit3,
  ExternalLink,
  Quote,
  CheckCircle2,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const calendarDays = Array.from({ length: 35 }, (_, i) => ({
  day: (i % 31) + 1,
  isCurrentMonth: i >= 2 && i < 33,
  events: i === 3 ? ['Send Q4 Report'] : 
          i === 5 ? ['Review Budget', 'Team Sync'] :
          i === 9 ? ['Finalize Slide Deck'] :
          i === 11 ? ['Client Call Prep'] :
          i === 12 ? ['Submit Expenses'] :
          i === 15 ? ['Approve Designs'] :
          i === 17 ? ['Share Proposal', 'Sync with Devs'] :
          i === 22 ? ['Project Kickoff Notes'] :
          i === 25 ? ['Update JIRA'] :
          i === 29 ? ['Monthly Report'] :
          i === 32 ? ['Budget for Nov'] : []
}));

export function CalendarPage() {
  return (
    <div className="flex flex-1 gap-6 h-[calc(100vh-12rem)] overflow-hidden">
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-500">
                <ChevronLeft size={20} />
              </button>
              <span className="text-slate-800 font-semibold text-lg">October 2023</span>
              <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-500">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-xs font-semibold text-slate-800">Month</button>
              <button className="px-4 py-1.5 text-slate-500 text-xs font-medium hover:text-slate-800">Week</button>
              <button className="px-4 py-1.5 text-slate-500 text-xs font-medium hover:text-slate-800">Day</button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/50">
          {days.map(day => (
            <div key={day} className="py-3 text-center text-sm font-semibold text-slate-500">{day}</div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-7 grid-rows-5 overflow-y-auto">
          {calendarDays.map((d, i) => (
            <div 
              key={i} 
              className={cn(
                "border-b border-r border-slate-100 p-2 min-h-[100px] relative group hover:bg-slate-50 transition-colors",
                !d.isCurrentMonth && "bg-slate-50/50 text-slate-400",
                i % 7 === 6 && "border-r-0"
              )}
            >
              <span className={cn("text-sm font-medium", d.isCurrentMonth ? "text-slate-700" : "text-slate-400")}>
                {d.day === 10 ? (
                  <span className="w-6 h-6 flex items-center justify-center bg-primary text-white rounded-full text-xs font-bold">10</span>
                ) : d.day}
              </span>
              <div className="mt-2 space-y-1">
                {d.events.map((event, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "text-[10px] px-2 py-1 rounded border-l-4 truncate cursor-pointer hover:opacity-80 transition-opacity",
                      event === 'Finalize Slide Deck' 
                        ? "bg-violet-600 text-white border-violet-900 shadow-sm" 
                        : "bg-violet-100 text-primary border-primary"
                    )}
                  >
                    {event}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Sidebar */}
      <div className="w-80 lg:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-100">
          <div className="flex justify-between items-start mb-2">
            <span className="bg-violet-100 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide border border-violet-200">
              High Confidence
            </span>
            <div className="flex gap-2">
              <button className="text-slate-400 hover:text-primary transition-colors">
                <Edit3 size={18} />
              </button>
              <button className="text-slate-400 hover:text-red-500 transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-1 leading-snug">Finalize Slide Deck</h3>
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            <CalendarIcon size={16} />
            Oct 8, 2023 • 5:00 PM
          </p>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Commitment Context</h4>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
              <div className="absolute -left-3 top-4 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-sm ring-4 ring-white">
                <Quote size={12} fill="currentColor" />
              </div>
              <p className="text-slate-600 text-sm italic pl-2 leading-relaxed">
                "I'll make sure to have the <span className="bg-violet-100 text-primary font-semibold px-1 rounded">final slide deck ready by Tuesday evening</span> so we can review it before the client meeting."
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Source</h4>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Video size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-primary transition-colors">Weekly Product Sync</p>
                <p className="text-xs text-slate-500 truncate">Recorded Oct 5 • 42m duration</p>
              </div>
              <ExternalLink size={16} className="text-slate-400" />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Suggested Action</h4>
            <button className="w-full bg-primary hover:bg-secondary text-white text-sm font-medium py-3 px-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group">
              <Edit3 size={18} className="group-hover:rotate-12 transition-transform" />
              Draft Email with Attachment
            </button>
            <button className="w-full bg-white border border-slate-200 text-slate-700 text-sm font-medium py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
              <ExternalLink size={18} />
              Open in PowerPoint
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-b-2xl border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Task ID: #4492</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 size={14} className="text-green-500" />
            AI Verified
          </span>
        </div>
      </div>
    </div>
  );
}
