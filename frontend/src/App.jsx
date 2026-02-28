import React, { useState } from 'react';
import { Sidebar, Header } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { MeetingPage } from './components/MeetingPage';
import { TasksPage } from './components/TasksPage';
import { CalendarPage } from './components/CalendarPage';
import { IntegrationsPage } from './components/IntegrationsPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { SettingsPage } from './components/SettingsPage';
import { HelpPage } from './components/HelpPage';
import { LandingPage } from './components/LandingPage';
import { OnboardingPage } from './components/OnboardingPage';
import { 
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [view, setView] = useState('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('onboarding')} />;
  }

  if (view === 'onboarding') {
    return <OnboardingPage onComplete={() => setView('app')} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'meetings':
        return <MeetingPage />;
      case 'tasks':
        return <TasksPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'integrations':
        return <IntegrationsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'help':
        return <HelpPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F2F1] flex font-sans selection:bg-primary/20 selection:text-primary overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />
      
      <motion.main 
        animate={{ marginLeft: isMobile ? 0 : (isCollapsed ? 80 : 280) }}
        className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out"
      >
        <Header title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} />
        
        <div className="flex-1 px-4 lg:px-8 pb-4 lg:pb-8">
          <motion.div 
            layout
            className="h-full bg-white rounded-2xl lg:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-200/50 overflow-hidden flex flex-col"
          >
            <div className="flex-1 overflow-y-auto p-4 lg:p-8 hide-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full"
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.main>

      {/* Mobile Menu Trigger (Simplified for demo) */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button className="bg-primary text-white p-4 rounded-full shadow-xl shadow-primary/30 active:scale-95 transition-transform">
          <Zap size={24} fill="currentColor" />
        </button>
      </div>
    </div>
  );
}

function Placeholder({ title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="bg-slate-50 p-6 rounded-full mb-6">
        <Zap size={48} className="text-primary/20" fill="currentColor" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
      <p className="text-slate-500 max-w-md">{subtitle}</p>
      <button className="mt-8 px-6 py-2.5 bg-primary text-white rounded-xl font-medium shadow-lg shadow-primary/20">
        Coming Soon
      </button>
    </div>
  );
}
