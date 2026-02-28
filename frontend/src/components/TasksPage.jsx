import React from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Video, 
  Mail, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  FileText,
  Edit3,
  Eye
} from 'lucide-react';
import { cn } from '../lib/utils';

const tasks = [
  {
    id: '1',
    title: 'Review & Approve Q3 Budget Proposal',
    excerpt: 'Extracted from: "The budget needs final approval by EOD..."',
    source: 'Zoom Sync',
    sourceIcon: Video,
    sourceColor: 'text-blue-600 bg-blue-50',
    assignee: { name: 'Sarah C.', initials: 'SC', color: 'bg-violet-100 text-violet-600' },
    deadline: 'Today',
    deadlineIcon: AlertCircle,
    deadlineColor: 'text-orange-600',
    status: 'Draft Ready',
    statusColor: 'bg-amber-100 text-amber-800'
  },
  {
    id: '2',
    title: 'Send Partnership Contract to Jane',
    excerpt: 'Extracted from: "I\'ll send over the contract draft..."',
    source: 'Outlook',
    sourceIcon: Mail,
    sourceColor: 'text-blue-500 bg-blue-50',
    assignee: { name: 'John D.', initials: 'JD', color: 'bg-emerald-100 text-emerald-600' },
    deadline: 'Tomorrow',
    status: 'Pending Review',
    statusColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: '3',
    title: 'Schedule Follow-up: Tech Review',
    excerpt: 'Extracted from: "Let\'s grab a slot next week for..."',
    source: 'Slack',
    sourceIcon: MessageSquare,
    sourceColor: 'text-purple-500 bg-purple-50',
    assignee: { name: 'Alice W.', initials: 'AW', color: 'bg-orange-100 text-orange-600' },
    deadline: 'Oct 24, 2023',
    status: 'Not Started',
    statusColor: 'bg-slate-100 text-slate-800'
  },
  {
    id: '4',
    title: 'Update Jira Ticket #4022',
    excerpt: 'Extracted from: "Can someone update the ticket status..."',
    source: 'Zoom Sync',
    sourceIcon: Video,
    sourceColor: 'text-blue-600 bg-blue-50',
    assignee: { name: 'Mike K.', initials: 'MK', color: 'bg-pink-100 text-pink-600' },
    deadline: 'Oct 25, 2023',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-800'
  },
  {
    id: '5',
    title: 'Prepare Slides for Q4 Kickoff',
    excerpt: 'Extracted from: "We need the slide deck ready by Friday..."',
    source: 'Outlook',
    sourceIcon: Mail,
    sourceColor: 'text-blue-500 bg-blue-50',
    assignee: { name: 'Sarah C.', initials: 'SC', color: 'bg-violet-100 text-violet-600' },
    deadline: 'Tomorrow',
    deadlineColor: 'text-orange-600',
    status: 'In Progress',
    statusColor: 'bg-amber-100 text-amber-800'
  }
];

export function TasksPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            Task Management Center
            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium border border-primary/20">All Commitments</span>
          </h1>
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Sidebar Filters */}
        <aside className="w-64 bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col overflow-y-auto hidden md:flex shrink-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Filters</h3>
            <button className="text-xs text-primary hover:text-secondary font-medium">Reset All</button>
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Priority</h4>
            <div className="space-y-2">
              {['High Priority', 'Medium Priority', 'Low Priority'].map((p, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-primary rounded border-slate-300 focus:ring-primary/50" />
                  <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">{p}</span>
                  <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{[4, 12, 8][i]}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Source</h4>
            <div className="space-y-2">
              {[
                { label: 'Zoom', icon: Video, color: 'text-blue-500' },
                { label: 'Outlook', icon: Mail, color: 'text-blue-400' },
                { label: 'Teams', icon: MessageSquare, color: 'text-purple-500' },
              ].map((s, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-primary rounded border-slate-300 focus:ring-primary/50" />
                  <div className="flex items-center gap-2 text-sm text-slate-600 group-hover:text-primary transition-colors">
                    <s.icon size={16} className={s.color} /> {s.label}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Status</h4>
            <div className="flex flex-wrap gap-2">
              {['Draft', 'Pending', 'Completed'].map((s, i) => (
                <span key={i} className={cn(
                  "px-2 py-1 rounded-md text-xs font-medium border cursor-pointer",
                  s === 'Draft' ? "bg-amber-100 text-amber-700 border-amber-200" :
                  s === 'Pending' ? "bg-blue-100 text-blue-700 border-blue-200" :
                  "bg-green-100 text-green-700 border-green-200"
                )}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Table */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search tasks, meetings, or people..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 text-slate-700 placeholder-slate-400"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 text-sm font-medium">
                <Filter size={16} />
                Sort by
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors text-sm font-medium shadow-lg shadow-primary/20">
                <Plus size={16} />
                New Task
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <th className="p-4 border-b border-slate-200 w-12">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-primary rounded border-slate-300 focus:ring-primary/50" />
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Commitment Title</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Source</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Assignee</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Deadline</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Status</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-primary rounded border-slate-300 focus:ring-primary/50" />
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-900 text-sm">{task.title}</div>
                      <div className="text-xs text-slate-500 mt-1 line-clamp-1">{task.excerpt}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className={cn("p-1.5 rounded-lg", task.sourceColor)}>
                          <task.sourceIcon size={16} />
                        </div>
                        <span className="text-xs font-medium text-slate-600">{task.source}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold", task.assignee.color)}>
                          {task.assignee.initials}
                        </div>
                        <span className="text-sm text-slate-700">{task.assignee.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className={cn("flex items-center gap-1 text-sm font-medium", task.deadlineColor || "text-slate-600")}>
                        {task.deadlineIcon && <task.deadlineIcon size={14} />}
                        {task.deadline}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", task.statusColor)}>
                        {task.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg" title="View Transcript">
                          <FileText size={18} />
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-xs font-bold transition-colors">
                          <Edit3 size={14} />
                          Draft Email
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-200 flex items-center justify-between shrink-0">
            <span className="text-sm text-slate-500">Showing 1 to 5 of 24 entries</span>
            <div className="flex gap-2">
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 disabled:opacity-50">
                <ChevronLeft size={18} />
              </button>
              <button className="px-3 py-1 bg-primary text-white rounded-lg text-sm font-medium">1</button>
              <button className="px-3 py-1 hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-medium">2</button>
              <button className="px-3 py-1 hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-medium">3</button>
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
