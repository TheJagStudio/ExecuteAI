import React from 'react';
import { Routes, Route, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar, Header } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { MeetingPage } from './components/MeetingPage';
import { MeetingsPage } from './components/MeetingsPage';
import { TasksPage } from './components/TasksPage';
import { CalendarPage } from './components/CalendarPage';
import { IntegrationsPage } from './components/IntegrationsPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { SettingsPage } from './components/SettingsPage';
import { HelpPage } from './components/HelpPage';
import { LandingPage } from './components/LandingPage';
import { OnboardingPage } from './components/OnboardingPage';
import { Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  const segment = location.pathname.split('/').filter(Boolean)[0] || 'dashboard';
  const title = segment.charAt(0).toUpperCase() + segment.slice(1);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const setActiveTab = (tab) => {
    navigate(`/${tab}`);
  };

  return (
    <div className="min-h-screen bg-[#F3F2F1] flex font-sans selection:bg-primary/20 selection:text-primary overflow-hidden">
      <Sidebar
        activeTab={segment}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <motion.main
        animate={{ marginLeft: isMobile ? 0 : isCollapsed ? 80 : 280 }}
        className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out"
      >
        <Header title={title} />

        <div className="flex-1 px-4 lg:px-8 pb-4 lg:pb-8">
          <motion.div
            layout
            className="h-full bg-white rounded-2xl lg:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-200/50 overflow-hidden flex flex-col"
          >
            <div className="flex-1 overflow-y-auto p-4 lg:p-8 hide-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="h-full"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.main>

      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="bg-primary text-white p-4 rounded-full shadow-xl shadow-primary/30 active:scale-95 transition-transform"
        >
          <Zap size={24} fill="currentColor" />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meetings" element={<MeetingsPage />} />
        <Route path="/meetings/:id" element={<MeetingPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
