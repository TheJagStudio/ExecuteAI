import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ChevronRight, Video } from 'lucide-react';
import { cn } from '../lib/utils';
import { apiGet } from '../api';

export function MeetingsPage() {
  const [meetings, setMeetings] = React.useState([]);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    apiGet('/meetings/').then(setMeetings).catch((err) => setError(err.message));
  }, []);

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Meetings</h1>
        <p className="text-slate-500 text-sm">Recordings and transcripts stored in Django.</p>
      </div>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {meetings.map((meeting) => (
          <button
            key={meeting.id}
            onClick={() => navigate(`/meetings/${meeting.id}`)}
            className="text-left bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all"
          >
            <div className="relative aspect-video bg-slate-900">
              {meeting.thumbnail ? (
                <img src={meeting.thumbnail} alt="" className="w-full h-full object-cover opacity-70" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white"><Video /></div>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white">
                  <Play fill="currentColor" size={20} />
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">
                Meetings <ChevronRight size={10} /> {meeting.category}
              </div>
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-bold text-slate-900">{meeting.title}</h2>
                <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-md', meeting.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : meeting.status === 'live' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600')}>
                  {meeting.status}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-2 line-clamp-2">{meeting.summary}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex -space-x-2">
                  {(meeting.attendees || []).slice(0, 4).map((person) => (
                    <img key={person.id} src={person.avatar} alt={person.name} className="w-7 h-7 rounded-full border-2 border-white" />
                  ))}
                </div>
                <span className="text-xs text-slate-400">{meeting.commitment_count} commitments</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
