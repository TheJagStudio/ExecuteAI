import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Video, Quote } from 'lucide-react';
import { cn } from '../lib/utils';
import { apiGet } from '../api';

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function monthGrid(year, month) {
  const first = new Date(year, month, 1);
  const start = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = 0; i < 42; i++) {
    if (i < start) {
      cells.push({ day: prevDays - start + i + 1, inMonth: false, date: new Date(year, month - 1, prevDays - start + i + 1) });
    } else if (i - start < daysInMonth) {
      const day = i - start + 1;
      cells.push({ day, inMonth: true, date: new Date(year, month, day) });
    } else {
      const day = i - start - daysInMonth + 1;
      cells.push({ day, inMonth: false, date: new Date(year, month + 1, day) });
    }
  }
  return cells;
}

const iso = (d) => d.toISOString().slice(0, 10);

export function CalendarPage() {
  const now = new Date();
  const [cursor, setCursor] = React.useState({ year: now.getFullYear(), month: now.getMonth() });
  const [events, setEvents] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    apiGet(`/events/?year=${cursor.year}&month=${cursor.month + 1}`).then((rows) => {
      setEvents(rows);
      setSelected(rows[0] || null);
    });
  }, [cursor]);

  const cells = monthGrid(cursor.year, cursor.month);
  const byDate = events.reduce((acc, event) => {
    (acc[event.date] ||= []).push(event);
    return acc;
  }, {});
  const label = new Date(cursor.year, cursor.month, 1).toLocaleString(undefined, { month: 'long', year: 'numeric' });

  return (
    <div className="flex flex-1 gap-6 h-[calc(100vh-12rem)] overflow-hidden">
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <button onClick={() => setCursor((c) => ({ year: c.month === 0 ? c.year - 1 : c.year, month: c.month === 0 ? 11 : c.month - 1 }))} className="p-1 hover:bg-slate-100 rounded-lg text-slate-500"><ChevronLeft size={20} /></button>
            <span className="text-slate-800 font-semibold text-lg">{label}</span>
            <button onClick={() => setCursor((c) => ({ year: c.month === 11 ? c.year + 1 : c.year, month: c.month === 11 ? 0 : c.month + 1 }))} className="p-1 hover:bg-slate-100 rounded-lg text-slate-500"><ChevronRight size={20} /></button>
          </div>
        </header>
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/50">
          {weekdayLabels.map((day) => <div key={day} className="py-3 text-center text-sm font-semibold text-slate-500">{day}</div>)}
        </div>
        <div className="flex-1 grid grid-cols-7 grid-rows-6 overflow-y-auto">
          {cells.map((cell, i) => {
            const key = iso(cell.date);
            const dayEvents = byDate[key] || [];
            const isToday = iso(new Date()) === key;
            return (
              <div key={i} className={cn('border-b border-r border-slate-100 p-2 min-h-[90px]', !cell.inMonth && 'bg-slate-50/50 text-slate-400')}>
                <span className={cn('text-sm font-medium', isToday && 'w-6 h-6 inline-flex items-center justify-center bg-primary text-white rounded-full text-xs')}>{cell.day}</span>
                <div className="mt-2 space-y-1">
                  {dayEvents.map((event) => (
                    <button key={event.id} onClick={() => setSelected(event)} className={cn('w-full text-left text-[10px] px-2 py-1 rounded border-l-4 truncate', selected?.id === event.id ? 'bg-violet-600 text-white border-violet-900' : 'bg-violet-100 text-primary border-primary')}>
                      {event.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-80 lg:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-1 leading-snug">{selected?.title || 'Select an event'}</h3>
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            <CalendarIcon size={16} />
            {selected?.date || 'No date'}
          </p>
        </div>
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Commitment Context</h4>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
              <div className="absolute -left-3 top-4 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center"><Quote size={12} fill="currentColor" /></div>
              <p className="text-slate-600 text-sm italic pl-2">{selected?.notes || 'Pick a calendar item loaded from SQLite.'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Video size={18} /></div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Django calendar API</p>
              <p className="text-xs text-slate-500">Task ID: #{selected?.id || '—'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
