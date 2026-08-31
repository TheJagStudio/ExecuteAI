import React from 'react';
import {
  Search,
  Plus,
  Video,
  Mail,
  MessageSquare,
  AlertCircle,
  FileText,
  Edit3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { apiGet, apiPatch, apiPost, statusClass } from '../api';

const sourceIcon = { zoom: Video, outlook: Mail, slack: MessageSquare, gmail: Mail };

export function TasksPage() {
  const [tasks, setTasks] = React.useState([]);
  const [q, setQ] = React.useState('');
  const [priority, setPriority] = React.useState([]);
  const [statusFilter, setStatusFilter] = React.useState('');
  const [creating, setCreating] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [error, setError] = React.useState('');

  const load = React.useCallback(() => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (statusFilter) params.set('status', statusFilter);
    apiGet(`/tasks/?${params.toString()}`)
      .then((rows) => setTasks(rows))
      .catch((err) => setError(err.message));
  }, [q, statusFilter]);

  React.useEffect(() => {
    const t = setTimeout(load, 200);
    return () => clearTimeout(t);
  }, [load]);

  const visible = tasks.filter((task) => !priority.length || priority.includes(task.priority));
  const counts = {
    high: tasks.filter((t) => t.priority === 'high').length,
    medium: tasks.filter((t) => t.priority === 'medium').length,
    low: tasks.filter((t) => t.priority === 'low').length,
  };

  const togglePriority = (value) => {
    setPriority((prev) => (prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]));
  };

  const createTask = async () => {
    if (!title.trim()) return;
    await apiPost('/tasks/', { title: title.trim(), source: 'Manual', source_kind: 'slack', status: 'Not Started', priority: 'medium' });
    setTitle('');
    setCreating(false);
    load();
  };

  const markDone = async (task) => {
    await apiPatch(`/tasks/${task.id}/`, { status: task.status === 'Completed' ? 'Not Started' : 'Completed' });
    load();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          Task Management Center
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium border border-primary/20">{visible.length} from API</span>
        </h1>
      </div>
      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <div className="flex flex-1 gap-6 overflow-hidden">
        <aside className="w-64 bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col overflow-y-auto hidden md:flex shrink-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Filters</h3>
            <button className="text-xs text-primary font-medium" onClick={() => { setPriority([]); setStatusFilter(''); setQ(''); }}>Reset All</button>
          </div>
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Priority</h4>
            {['high', 'medium', 'low'].map((p) => (
              <label key={p} className="flex items-center gap-3 cursor-pointer mb-2">
                <input type="checkbox" checked={priority.includes(p)} onChange={() => togglePriority(p)} className="form-checkbox h-4 w-4 text-primary rounded border-slate-300" />
                <span className="text-sm text-slate-600 capitalize">{p} Priority</span>
                <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{counts[p]}</span>
              </label>
            ))}
          </div>
          <div className="mt-auto">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Status</h4>
            <div className="flex flex-wrap gap-2">
              {['Draft Ready', 'Pending Review', 'Completed'].map((s) => (
                <button key={s} onClick={() => setStatusFilter(statusFilter === s ? '' : s)} className={cn('px-2 py-1 rounded-md text-xs font-medium border', statusFilter === s ? 'bg-primary text-white border-primary' : 'bg-slate-50 text-slate-600 border-slate-200')}>{s.replace(' Review', '').replace(' Ready', '')}</button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tasks, meetings, or people..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>
            <button onClick={() => setCreating((v) => !v)} className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium">
              <Plus size={16} /> New Task
            </button>
          </div>

          {creating && (
            <div className="p-4 border-b border-slate-100 flex gap-2">
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm" />
              <button onClick={createTask} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold">Save</button>
            </div>
          )}

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b">Commitment Title</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b">Source</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b">Assignee</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b">Deadline</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b">Status</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.map((task) => {
                  const Icon = sourceIcon[task.source_kind] || Video;
                  return (
                    <tr key={task.id} className="hover:bg-slate-50 group">
                      <td className="p-4">
                        <div className="font-semibold text-slate-900 text-sm">{task.title}</div>
                        <div className="text-xs text-slate-500 mt-1 line-clamp-1">{task.excerpt}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600"><Icon size={16} /></div>
                          <span className="text-xs font-medium text-slate-600">{task.source}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {task.assignee ? (
                          <div className="flex items-center gap-2">
                            <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold', task.assignee.color)}>{task.assignee.initials}</div>
                            <span className="text-sm text-slate-700">{task.assignee.name}</span>
                          </div>
                        ) : <span className="text-sm text-slate-400">Unassigned</span>}
                      </td>
                      <td className="p-4">
                        <div className={cn('flex items-center gap-1 text-sm font-medium', task.deadline === 'Today' ? 'text-orange-600' : 'text-slate-600')}>
                          {task.deadline === 'Today' && <AlertCircle size={14} />}
                          {task.deadline || '—'}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', statusClass(task.status))}>{task.status}</span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {task.meeting && (
                            <a href={`/meetings/${task.meeting}`} className="p-2 text-slate-400 hover:text-primary" title="View meeting"><FileText size={18} /></a>
                          )}
                          <button onClick={() => markDone(task)} className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-xs font-bold">
                            <Edit3 size={14} />
                            {task.status === 'Completed' ? 'Reopen' : 'Complete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-200 flex items-center justify-between shrink-0">
            <span className="text-sm text-slate-500">Showing {visible.length} entries from SQLite</span>
            <div className="flex gap-2 text-slate-400">
              <ChevronLeft size={18} />
              <ChevronRight size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
