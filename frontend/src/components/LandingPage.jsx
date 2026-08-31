import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export function LandingPage() {
  const navigate = useNavigate();
  const onGetStarted = () => navigate('/onboarding');
  return (
    <div className="min-h-screen bg-[#F3F4F6] text-gray-900 font-sans selection:bg-[#6D28D9]/20 selection:text-[#6D28D9]">
      {/* Material Symbols Import */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet"/>

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 px-6 py-4">
        <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl px-6 py-3 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <div className="bg-[#6D28D9] text-white p-1.5 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">psychology</span>
            </div>
            <span className="font-bold text-lg tracking-tight">CommitAI</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a className="hover:text-[#6D28D9] transition-colors" href="#how-it-works">How it Works</a>
            <a className="hover:text-[#6D28D9] transition-colors" href="#features">Features</a>
            <a className="hover:text-[#6D28D9] transition-colors" href="#pricing">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="hidden md:block text-sm font-medium hover:text-[#6D28D9] transition-colors"
            >
              Log In
            </button>
            <button 
              onClick={onGetStarted}
              className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-[#6D28D9]/30"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#6D28D9]/20 blur-[100px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-gray-600">v2.0 Now Available with Zoom Integration</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Turn messy meetings into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#A78BFA]">clear actions.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              Stop manually taking notes. Our AI listens to your meetings, identifies commitments, and automatically creates tasks in your favorite project management tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onGetStarted}
                className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white px-8 py-4 rounded-xl text-base font-semibold transition-all shadow-xl shadow-[#6D28D9]/25 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">download</span>
                Download for Mac
              </button>
              <button className="bg-white border border-gray-200 hover:border-[#6D28D9]/50 text-gray-800 px-8 py-4 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">play_circle</span>
                Watch Demo
              </button>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <img 
                    key={i}
                    alt="User" 
                    className="w-8 h-8 rounded-full border-2 border-white" 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`}
                  />
                ))}
                <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold">+2k</div>
              </div>
              <p>Trusted by productive teams everywhere</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6D28D9] to-purple-600 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs font-mono text-gray-400">Commitment Extractor AI</div>
              </div>
              <div className="p-6 grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-7 space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Live Transcript</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <img alt="Sarah" className="w-8 h-8 rounded-full" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"/>
                      <div className="bg-gray-100 p-3 rounded-tr-xl rounded-b-xl text-sm text-gray-700">
                        Okay team, we need to finalize the Q3 roadmap by Friday.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <img alt="Mike" className="w-8 h-8 rounded-full" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"/>
                      <div className="bg-[#6D28D9]/10 p-3 rounded-tr-xl rounded-b-xl text-sm text-gray-700 border border-[#6D28D9]/20">
                        <span className="bg-[#6D28D9]/20 text-[#6D28D9] text-xs font-bold px-1.5 py-0.5 rounded mr-2">ACTION DETECTED</span>
                        I'll draft the initial proposal and send it to everyone for review before Wednesday EOD.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-5 space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Extracted Commitments</h3>
                  <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#6D28D9]"></div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-semibold text-[#6D28D9] bg-[#6D28D9]/10 px-2 py-0.5 rounded">High Priority</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">Draft Q3 Proposal</h4>
                    <p className="text-xs text-gray-500 mb-3">Owner: Mike</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      <span className="text-xs text-gray-400">Due: Wed EOD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-200 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-12 h-12 rounded-full border-4 border-[#6D28D9] flex items-center justify-center text-[#6D28D9] text-xs font-bold">88%</div>
              <div>
                <div className="text-xs text-gray-500">Accuracy Score</div>
                <div className="text-lg font-bold">Excellent</div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Hours Saved', value: '10k+' },
            { label: 'Accuracy Rate', value: '99%' },
            { label: 'Integrations', value: '50+' },
            { label: 'User Rating', value: '4.9/5' }
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 relative" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your AI Secretary in Action</h2>
            <p className="text-gray-600">It works silently in the background, joining your calls and reading your emails to ensure nothing slips through the cracks.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: '1. Connect & Listen', desc: 'Integrates with Zoom, Google Meet, and Teams. The AI joins as a participant and transcribes in real-time.', icon: 'mic' },
              { title: '2. Analyze & Extract', desc: 'Using advanced NLP, it distinguishes between casual chatter and firm commitments, identifying owners and due dates.', icon: 'psychology_alt', highlighted: true },
              { title: '3. Sync & Assign', desc: 'Approved tasks are instantly pushed to Jira, Asana, Trello, or Slack with all the relevant context attached.', icon: 'rocket_launch' }
            ].map((step, i) => (
              <div 
                key={i}
                className={cn(
                  "p-8 rounded-2xl border transition-all",
                  step.highlighted 
                    ? "bg-white border-[#6D28D9] shadow-lg ring-4 ring-[#6D28D9]/5 relative" 
                    : "bg-white border-gray-200 shadow-sm hover:border-[#6D28D9] group"
                )}
              >
                {step.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#6D28D9] text-white text-xs font-bold px-3 py-1 rounded-full">
                    AI PROCESSING
                  </div>
                )}
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors",
                  step.highlighted ? "bg-[#6D28D9] text-white shadow-lg shadow-[#6D28D9]/30" : "bg-[#6D28D9]/10 text-[#6D28D9] group-hover:bg-[#6D28D9] group-hover:text-white"
                )}>
                  <span className="material-symbols-outlined">{step.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-[#6D28D9] text-white p-1 rounded-md flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">psychology</span>
                </div>
                <span className="font-bold text-lg">CommitAI</span>
              </div>
              <p className="text-sm text-gray-500">
                AI-powered meeting assistant that ensures nothing gets lost in translation.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a className="hover:text-[#6D28D9]" href="#">Features</a></li>
                <li><a className="hover:text-[#6D28D9]" href="#">Integrations</a></li>
                <li><a className="hover:text-[#6D28D9]" href="#">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a className="hover:text-[#6D28D9]" href="#">About Us</a></li>
                <li><a className="hover:text-[#6D28D9]" href="#">Careers</a></li>
                <li><a className="hover:text-[#6D28D9]" href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a className="hover:text-[#6D28D9]" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-[#6D28D9]" href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p>© 2023 CommitAI Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}
