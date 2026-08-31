import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Search, Plus, Trash2, CheckCircle2, Copy, Sparkles, Play } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { apiDelete, apiGet, apiPatch } from '../api';

export function MeetingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = React.useState(null);
  const [query, setQuery] = React.useState('');
  const [error, setError] = React.useState('');

  const load = React.useCallback(() => {
    apiGet(`/meetings/${id}/`).then(setMeeting).catch((err) => setError(err.message));
  }, [id]);

  React.useEffect(() => { load(); }, [load]);

  if (error) return <p className="text-red-600 text-sm">{error}</p>;
  if (!meeting) return <p className="text-slate-500 text-sm">Loading meeting…</p>;

  const transcript = (meeting.transcript || []).filter((line) =>
    !query || line.text.toLowerCase().includes(query.toLowerCase()) || line.speaker.toLowerCase().includes(query.toLowerCase())
  );
  const commitments = meeting.commitments || [];

  const completeTask = async (task) => {
    await apiPatch(`/tasks/${task.id}/`, { status: 'Completed' });
    load();
  };

  const removeTask = async (task) => {
    await apiDelete(`/tasks/${task.id}/`);
    load();
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200">
      <header className="px-8 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/meetings')} className="p-2 hover:bg-slate-50 rounded-full">
            <ArrowLeft size={20} className="text-slate-500" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <span>Meetings</span> / <span>{meeting.category}</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-900">{meeting.title}</h1>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md border border-emerald-100">{meeting.status}</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search transcript..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm w-64 outline-none" />
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 border-r border-slate-100 p-8 overflow-y-auto hide-scrollbar space-y-8">
          <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden">
            {meeting.thumbnail && <img src={meeting.thumbnail} alt="" className="w-full h-full object-cover opacity-60" />}
            <div className="absolute inset-0 flex items-center justify-center text-white"><Play fill="currentColor" size={20} /></div>
          </div>
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attendees</h3>
            <div className="flex items-center -space-x-2">
              {(meeting.attendees || []).map((person) => (
                <img key={person.id} src={person.avatar} alt={person.name} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Summary</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{meeting.summary}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100"><h2 className="font-bold text-slate-900">Transcript</h2></div>
          <div className="flex-1 overflow-y-auto p-8 space-y-8 hide-scrollbar">
            {transcript.map((item) => (
              <div key={item.id} className={cn('flex gap-6', item.is_action && 'bg-violet-50/50 -mx-8 px-8 py-6 border-y border-violet-100')}>
                <span className="text-xs font-bold text-slate-300 w-12 pt-1">{item.time}</span>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{item.speaker}</span>
                    {item.is_action && <span className="px-2 py-0.5 bg-primary text-white text-[8px] font-bold rounded uppercase">Action Detected</span>}
                  </div>
                  <p className={cn('text-sm leading-relaxed', item.is_action ? 'text-slate-700 font-medium' : 'text-slate-500')}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-96 border-l border-slate-100 flex flex-col overflow-hidden bg-slate-50/30">
          <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2 text-primary"><Sparkles size={18} /><h2 className="font-bold text-slate-900">AI Commitments</h2></div>
            <span className="px-2 py-0.5 bg-violet-100 text-primary text-[10px] font-bold rounded-full">{commitments.length} Found</span>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
            {commitments.map((item) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.speaker || item.assignee?.name || 'Team'}</h4>
                    <p className="text-[10px] text-slate-400">{item.time || item.deadline}</p>
                  </div>
                  <button onClick={() => removeTask(item)} className="text-slate-300 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">{item.title}</p>
                {item.status === 'Completed' ? (
                  <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold py-2 px-3 bg-emerald-50 rounded-xl w-fit">
                    <CheckCircle2 size={14} /> Done
                  </div>
                ) : (
                  <button onClick={() => completeTask(item)} className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-xl text-xs font-bold">
                    <Plus size={14} /> Add Task
                  </button>
                )}
              </motion.div>
            ))}
          </div>
          <div className="p-6 bg-white border-t border-slate-100">
            <button
              onClick={() => navigator.clipboard.writeText(commitments.map((c) => c.title).join('\n'))}
              className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600"
            >
              <Copy size={16} /> Copy All Actions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
