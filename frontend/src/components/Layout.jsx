import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  BarChart3, 
  Blocks, 
  Settings, 
  HelpCircle,
  Zap,
  Bell,
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  MoreHorizontal,
  Star,
  Clock,
  ChevronDown,
  LogOut,
  Video
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { apiGet } from '../api';

export function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) {
  const [expandedGroups, setExpandedGroups] = useState(['dashboard']);

  const toggleGroup = (group) => {
    setExpandedGroups(prev => 
      prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group]
    );
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'main' },
    { id: 'meetings', label: 'Meetings', icon: Video, group: 'main' },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: '12', group: 'main' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, group: 'main' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, group: 'main' },
    { id: 'integrations', label: 'Integrations', icon: Blocks, group: 'main' },
  ];

  const subMenuItems = [
    { id: 'starred', label: 'Starred', icon: Star },
    { id: 'recent', label: 'Recent', icon: Clock },
  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 0 : 280 }}
      className="fixed inset-y-0 left-0 z-50 bg-[#F3F2F1] flex flex-col transition-all duration-300 ease-in-out border-r border-slate-200/50 hidden lg:flex"
    >
      <div className="flex h-full">
        {/* Expanded Content */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col py-6 px-4 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8 px-2">
                <div className="flex items-center gap-2">
                  <div className="bg-slate-900 text-white p-1.5 rounded-lg">
                    <Zap size={18} fill="currentColor" />
                  </div>
                  <span className="font-bold text-slate-900">CommitAI</span>
                </div>
                <button 
                  onClick={() => setIsCollapsed(true)}
                  className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
              </div>

              <div className="space-y-6 overflow-y-auto hide-scrollbar">
                <div>
                  <div className="space-y-1">
                    {subMenuItems.map(item => (
                      <button key={item.id} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
                        <item.icon size={16} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between px-2 mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reports</span>
                    <Plus size={14} className="text-slate-400 cursor-pointer hover:text-primary" />
                  </div>
                  <nav className="space-y-1">
                    {menuItems.map((item) => (
                      <div key={item.id}>
                        <button
                          onClick={() => setActiveTab(item.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative",
                            activeTab === item.id 
                              ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
                              : "text-slate-500 hover:bg-white/50"
                          )}
                        >
                          <item.icon size={18} className={cn(activeTab === item.id ? "text-primary" : "text-slate-400")} />
                          <span className="font-medium text-sm">{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>

              <div className="mt-auto pt-6 flex flex-col gap-2">
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors",
                    activeTab === 'settings' ? "text-primary font-bold" : "text-slate-500 hover:text-slate-900"
                  )}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
                <button 
                  onClick={() => setActiveTab('help')}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors",
                    activeTab === 'help' ? "text-primary font-bold" : "text-slate-500 hover:text-slate-900"
                  )}
                >
                  <HelpCircle size={18} />
                  <span>Help Center</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse Toggle for slim view */}
      {isCollapsed && (
        <button 
          onClick={() => setIsCollapsed(false)}
          className="absolute top-6 left-6 bg-white border border-slate-200 rounded-full p-2 shadow-sm text-slate-400 hover:text-primary z-50"
        >
          <Menu size={18} />
        </button>
      )}
    </motion.aside>
  );
}

export function Header({ title }) {
  const [profile, setProfile] = React.useState(null);
  React.useEffect(() => {
    apiGet('/profile/').then(setProfile).catch(() => {});
  }, []);
  const name = profile?.full_name || 'Sarah Chen';
  const email = profile?.email || 'sarah@company.com';
  const seed = profile?.first_name || 'Sarah';
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-transparent">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder='Try searching "insights"' 
            className="w-full pl-12 pr-4 py-3 bg-white border-none rounded-full text-sm shadow-sm focus:ring-2 focus:ring-primary/20 text-slate-700 placeholder-slate-400"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-white pl-3 pr-1 py-1 rounded-full shadow-sm border border-slate-200">
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-slate-900 leading-none">{name}</span>
            <span className="text-[10px] text-slate-400">{email}</span>
          </div>
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} 
            alt="User Profile" 
            className="w-8 h-8 rounded-full border border-slate-100"
          />
        </div>
        
        <button 
          type="button"
          onClick={() => { window.location.href = '/'; }}
          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
