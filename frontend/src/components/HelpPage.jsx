import React from 'react';
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  PlayCircle, 
  FileText, 
  ChevronRight, 
  ExternalLink,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Globe,
  LifeBuoy
} from 'lucide-react';
import { cn } from '../lib/utils';

const categories = [
  { label: 'Getting Started', icon: PlayCircle, count: 12, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Integrations', icon: Sparkles, count: 24, color: 'text-primary', bg: 'bg-violet-50' },
  { label: 'AI & Extraction', icon: BookOpen, count: 18, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Billing & Account', icon: FileText, count: 8, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const faqs = [
  { q: 'How accurate is the AI extraction?', a: 'Our models are trained specifically on business communication and achieve 94%+ accuracy. You can always review and edit extracted tasks before they are finalized.' },
  { q: 'Can I connect multiple Zoom accounts?', a: 'Yes, Pro and Enterprise plans support multiple account connections across different platforms.' },
  { q: 'Is my data used to train the AI?', a: 'No. We use pre-trained models and never use your private meeting data or emails for model training purposes.' },
  { q: 'How do I export tasks to Jira?', a: 'Go to Integrations, connect Jira, and then you can use the "Export" button on any task or set up auto-sync rules.' },
];

export function HelpPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Help Center</h1>
        <p className="text-slate-500 mt-1">Everything you need to know about CommitAI.</p>
      </div>

      <div className="space-y-16 pb-12">
        {/* Search Section */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for articles, guides, or keywords..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all duration-300 cursor-pointer group">
              <div className={cn("p-3 rounded-xl w-fit mb-6 transition-transform duration-300 group-hover:scale-110", cat.bg, cat.color)}>
                <cat.icon size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{cat.label}</h3>
              <p className="text-xs text-slate-500 mb-6">{cat.count} Articles</p>
              <div className="flex items-center gap-1 text-primary text-xs font-bold group-hover:gap-2 transition-all">
                Browse Articles
                <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>

        {/* FAQs & Support */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors duration-300">
                  <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-3">
                    <HelpCircle size={18} className="text-primary" />
                    {faq.q}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed pl-7">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View all FAQs
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <LifeBuoy size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Still need help?</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                  Our support team is available 24/7 to help you with any issues or questions.
                </p>
                <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                  <MessageCircle size={18} />
                  Chat with Support
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:border-slate-300 transition-colors duration-300">
              <h3 className="font-bold text-slate-900 mb-6">Resources</h3>
              <div className="space-y-4">
                {[
                  { label: 'Video Tutorials', icon: PlayCircle },
                  { label: 'API Documentation', icon: FileText },
                  { label: 'Community Forum', icon: Globe },
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center justify-between text-sm text-slate-600 hover:text-primary transition-colors group">
                    <div className="flex items-center gap-3">
                      <item.icon size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
                      {item.label}
                    </div>
                    <ExternalLink size={14} className="text-slate-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
