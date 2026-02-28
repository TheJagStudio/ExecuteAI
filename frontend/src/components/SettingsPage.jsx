import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Sparkles, 
  CreditCard,
  UserCircle,
  Upload,
  Trash2,
  Mail,
  Check
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'account', label: 'Account', icon: UserCircle },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'ai', label: 'AI Preferences', icon: Sparkles },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [autoExtract, setAutoExtract] = useState(true);
  const [sensitivity, setSensitivity] = useState(75);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings & Preferences</h1>
        <p className="text-slate-500 mt-1">Manage your account settings and AI extraction preferences.</p>
      </div>

      <div className="flex flex-1 gap-8 min-h-0">
        {/* Settings Navigation */}
        <div className="w-64 flex flex-col gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                activeTab === tab.id 
                  ? "bg-white text-primary shadow-sm border border-slate-200" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <tab.icon size={18} className={cn(activeTab === tab.id ? "text-primary" : "text-slate-400")} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6 overflow-y-auto pr-2 hide-scrollbar pb-8">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Public Profile Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors duration-300">
                  <div className="p-8 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900">Public Profile</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage your personal information.</p>
                  </div>
                  
                  <div className="p-8 space-y-8">
                    {/* Profile Picture */}
                    <div className="flex items-center gap-6">
                      <div className="relative group">
                        <img 
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" 
                          alt="Profile" 
                          className="w-24 h-24 rounded-full border-2 border-slate-100 shadow-sm object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                          <Upload size={20} className="text-white" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-sm font-bold text-slate-900">Profile Picture</h3>
                        <p className="text-xs text-slate-500">We support PNGs, JPEGs and GIFs under 10MB</p>
                        <div className="flex gap-4">
                          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                            Upload New
                          </button>
                          <button className="px-4 py-2 text-xs font-bold text-red-500 hover:text-red-600 transition-colors">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">First Name</label>
                        <input 
                          type="text" 
                          defaultValue="Sarah"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Name</label>
                        <input 
                          type="text" 
                          defaultValue="Chen"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="email" 
                          defaultValue="sarah@company.com"
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Role</label>
                      <input 
                        type="text" 
                        defaultValue="Project Manager"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="p-8 border-t border-slate-100 flex justify-end gap-4">
                    <button className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
                      Cancel
                    </button>
                    <button className="px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-secondary transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'account' && (
              <motion.div
                key="account"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h3 className="text-sm font-bold text-slate-900 mb-1">Language</h3>
                      <p className="text-xs text-slate-500 mb-4">Select your preferred language for the interface.</p>
                      <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h3 className="text-sm font-bold text-slate-900 mb-1">Timezone</h3>
                      <p className="text-xs text-slate-500 mb-4">Your current timezone is used for task deadlines.</p>
                      <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Pacific Time (PT) - UTC-8</option>
                        <option>Eastern Time (ET) - UTC-5</option>
                        <option>UTC</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Notification Preferences</h2>
                  <div className="space-y-4">
                    {[
                      { title: 'Email Notifications', desc: 'Receive daily summaries of extracted tasks.' },
                      { title: 'Push Notifications', desc: 'Get alerted when a high-priority task is detected.' },
                      { title: 'Slack Integration', desc: 'Sync extracted tasks directly to your Slack channel.' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                        <button className="w-10 h-5 bg-primary rounded-full relative">
                          <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Security & Privacy</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Two-Factor Authentication</h3>
                        <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                      </div>
                      <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg">Enable</button>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-slate-900">Active Sessions</h3>
                      <div className="p-4 border border-slate-100 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-100 p-2 rounded-lg text-slate-400">
                            <Shield size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">Chrome on MacOS</p>
                            <p className="text-[10px] text-slate-400">San Francisco, USA • Active now</p>
                          </div>
                        </div>
                        <button className="text-[10px] font-bold text-red-500">Revoke</button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'ai' && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* AI Preferences Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors duration-300">
                  <div className="p-8 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900">AI Preferences</h2>
                    <p className="text-sm text-slate-500 mt-1">Fine-tune how the AI detects and processes your commitments.</p>
                  </div>
                  
                  <div className="p-8 space-y-8">
                    {/* Toggle Section */}
                    <div className="p-6 bg-violet-50/50 border border-violet-100 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-white p-2 rounded-xl shadow-sm border border-violet-100 text-primary">
                          <Sparkles size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">Automatic Commitment Extraction</h4>
                          <p className="text-xs text-slate-500">Automatically scan meeting transcripts and emails for action items.</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setAutoExtract(!autoExtract)}
                        className={cn(
                          "w-12 h-6 rounded-full relative transition-colors duration-200",
                          autoExtract ? "bg-primary" : "bg-slate-300"
                        )}
                      >
                        <div className={cn(
                          "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 shadow-sm",
                          autoExtract ? "right-1" : "left-1"
                        )}></div>
                      </button>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">Extraction Sensitivity</h4>
                          <p className="text-xs text-slate-500 mt-1">Higher sensitivity captures more potential tasks but may include non-critical items.</p>
                        </div>
                        <span className="text-primary font-bold text-sm">High</span>
                      </div>
                      
                      <div className="relative py-4">
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={sensitivity}
                          onChange={(e) => setSensitivity(parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between mt-4">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Strict (Critical Only)</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Standard</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loose (Capture All)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'billing' && (
              <motion.div
                key="billing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Billing & Subscription</h2>
                  <div className="p-6 bg-slate-900 rounded-2xl text-white mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Current Plan</p>
                      <h3 className="text-2xl font-bold mb-4">Pro Plan</h3>
                      <p className="text-sm text-slate-400 mb-6">Your next billing date is Oct 24, 2023 for $29.00.</p>
                      <button className="bg-white text-slate-900 px-4 py-2 rounded-lg text-xs font-bold">Manage Subscription</button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900">Payment Method</h3>
                    <div className="p-4 border border-slate-100 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-50 p-2 rounded-lg text-slate-400">
                          <CreditCard size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Visa ending in 4242</p>
                          <p className="text-[10px] text-slate-400">Expires 12/24</p>
                        </div>
                      </div>
                      <button className="text-[10px] font-bold text-primary">Edit</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
