import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Video, 
  Mail, 
  MessageSquare, 
  Globe, 
  Zap, 
  ArrowRight, 
  ChevronLeft,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { cn } from '../lib/utils';

export function OnboardingPage({ onComplete }) {
  const [step, setStep] = useState(1);
  const [selectedTools, setSelectedTools] = useState([]);

  const toggleTool = (id) => {
    setSelectedTools(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const tools = [
    { id: 'zoom', name: 'Zoom', icon: Video, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'gmail', name: 'Gmail', icon: Mail, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 'slack', name: 'Slack', icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 'teams', name: 'Teams', icon: MessageSquare, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'outlook', name: 'Outlook', icon: Mail, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'calendar', name: 'Calendar', icon: Globe, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2 text-primary">
            <Zap size={24} fill="currentColor" />
            <span className="font-bold text-xl text-slate-900">CommitAI</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  step === i ? "w-8 bg-primary" : step > i ? "w-4 bg-primary/40" : "w-4 bg-slate-200"
                )}
              ></div>
            ))}
          </div>
        </div>

        {/* Step 1: Welcome & Tools */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to CommitAI</h1>
            <p className="text-slate-500 mb-8">Select the tools you use for communication to start extracting commitments.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => toggleTool(tool.id)}
                  className={cn(
                    "p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 group relative",
                    selectedTools.includes(tool.id) 
                      ? "border-primary bg-white shadow-xl shadow-primary/10" 
                      : "border-transparent bg-white hover:border-slate-200 shadow-sm"
                  )}
                >
                  <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110", tool.bg, tool.color)}>
                    <tool.icon size={24} />
                  </div>
                  <span className="font-bold text-slate-700 text-sm">{tool.name}</span>
                  {selectedTools.includes(tool.id) && (
                    <div className="absolute top-2 right-2 text-primary">
                      <CheckCircle2 size={18} fill="currentColor" className="text-primary" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button 
              onClick={nextStep}
              disabled={selectedTools.length === 0}
              className="w-full bg-primary hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* Step 2: Permissions & Privacy */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <button onClick={prevStep} className="flex items-center gap-1 text-slate-400 hover:text-primary mb-6 transition-colors font-medium">
              <ChevronLeft size={18} />
              Back
            </button>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy & Permissions</h1>
            <p className="text-slate-500 mb-8">We take your data security seriously. Here's how we handle your information.</p>
            
            <div className="space-y-4 mb-10">
              {[
                { title: 'End-to-End Encryption', desc: 'Your meeting transcripts are encrypted and never stored in plain text.', icon: Lock },
                { title: 'No Training on Private Data', desc: 'We never use your private data to train our AI models.', icon: ShieldCheck },
                { title: 'Selective Extraction', desc: 'Only commitments you approve are synced to your task manager.', icon: CheckCircle2 },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="bg-primary/10 p-2.5 rounded-xl text-primary shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={nextStep}
              className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              I Understand & Agree
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* Step 3: Finalizing */}
        {step === 3 && (
          <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
              <Zap size={48} className="text-primary animate-pulse" fill="currentColor" />
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Setting up your workspace</h1>
            <p className="text-slate-500 mb-12">Connecting your tools and preparing your AI assistant...</p>
            
            <div className="max-w-xs mx-auto space-y-3 mb-12">
              {selectedTools.map((toolId) => {
                const tool = tools.find(t => t.id === toolId);
                return (
                  <div key={toolId} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-1.5 rounded-lg", tool?.bg, tool?.color)}>
                        {tool && <tool.icon size={16} />}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{tool?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-green-600 uppercase tracking-widest">
                      <CheckCircle2 size={14} />
                      Linked
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={onComplete}
              className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2"
            >
              Enter Dashboard
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
