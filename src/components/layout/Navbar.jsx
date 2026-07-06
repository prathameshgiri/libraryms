// src/components/layout/Navbar.jsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Bell, Sun, Moon, Menu, ChevronDown,
  UserCircle, Settings, LogOut, Globe, MessageSquare
} from 'lucide-react';
import { format } from 'date-fns';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';
import { mockNotifications } from '../../data/mockData';
import { scaleIn, overlayVariants } from '../../animations/variants';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { openMobile } = useSidebar();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifIcons = {
    overdue: '🔴',
    due: '🟡',
    reservation: '🔵',
    new_member: '🟢',
    fine: '💰',
    system: '⚙️',
  };

  return (
    <header className="sticky top-0 z-20 h-16 glass border-b border-white/50 dark:border-white/10 flex items-center px-4 lg:px-6 gap-4">
      {/* Mobile Menu Button */}
      <button
        onClick={openMobile}
        className="lg:hidden btn-icon text-slate-600 dark:text-slate-400 hover:bg-brand-50 dark:hover:bg-white/10"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Global Search */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books, members, ISBN..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/20 bg-white/80 dark:bg-white/10 text-sm text-slate-700 dark:text-white placeholder-slate-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-300 dark:focus:ring-brand-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5 ml-auto">
        {/* Date */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white/60 dark:bg-white/10 border border-white/50 dark:border-white/20">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {format(new Date(), 'EEE, dd MMM yyyy')}
          </span>
        </div>

        {/* Language */}
        <button className="btn-icon text-slate-500 dark:text-slate-400 hover:bg-white/80 dark:hover:bg-white/10 hover:text-brand-600 transition-colors hidden md:flex">
          <Globe className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
        </button>

        {/* Messages */}
        <button className="btn-icon text-slate-500 dark:text-slate-400 hover:bg-white/80 dark:hover:bg-white/10 hover:text-brand-600 transition-colors relative">
          <MessageSquare style={{ width: 18, height: 18 }} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-white" />
        </button>

        {/* Dark Mode */}
        <button
          onClick={toggleTheme}
          className="btn-icon text-slate-500 dark:text-slate-400 hover:bg-white/80 dark:hover:bg-white/10 hover:text-brand-600 transition-all duration-200"
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Sun style={{ width: 18, height: 18 }} />
              </motion.div>
            ) : (
              <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Moon style={{ width: 18, height: 18 }} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotif((p) => !p); setShowProfile(false); }}
            className="btn-icon text-slate-500 dark:text-slate-400 hover:bg-white/80 dark:hover:bg-white/10 hover:text-brand-600 transition-colors relative"
          >
            <Bell style={{ width: 18, height: 18 }} />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
              >
                {unreadCount}
              </motion.span>
            )}
          </button>

          <AnimatePresence>
            {showNotif && (
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 top-full mt-2 w-80 glass rounded-3xl shadow-glass-lg border border-white/50 dark:border-white/20 overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800 dark:text-white text-sm">Notifications</h3>
                  <button className="text-xs text-brand-600 font-medium hover:underline">Mark all read</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {mockNotifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 border-b border-slate-50 dark:border-white/5 hover:bg-brand-50/50 dark:hover:bg-white/5 transition-colors cursor-pointer ${!n.read ? 'bg-brand-50/30 dark:bg-brand-900/20' : ''}`}
                    >
                      <div className="flex gap-3">
                        <span className="text-lg">{notifIcons[n.type]}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{n.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                        </div>
                        {!n.read && <span className="w-2 h-2 bg-brand-500 rounded-full mt-1 shrink-0" />}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => { navigate('/notifications'); setShowNotif(false); }}
                  className="w-full py-3 text-xs font-medium text-brand-600 hover:bg-brand-50 dark:hover:bg-white/5 transition-colors text-center"
                >
                  View all notifications
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setShowProfile((p) => !p); setShowNotif(false); }}
            className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-2xl hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-200"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">{user?.name?.charAt(0) || 'A'}</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-slate-700 dark:text-white leading-tight">{user?.name?.split(' ')[0]}</p>
              <p className="text-[10px] text-slate-400 leading-tight">{user?.role}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 top-full mt-2 w-52 glass rounded-3xl shadow-glass-lg border border-white/50 dark:border-white/20 overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-slate-100 dark:border-white/10">
                  <p className="font-semibold text-slate-800 dark:text-white text-sm">{user?.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                </div>
                {[
                  { icon: UserCircle, label: 'Profile', path: '/profile' },
                  { icon: Settings, label: 'Settings', path: '/settings' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => { navigate(item.path); setShowProfile(false); }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-white/10 transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-slate-100 dark:border-white/10">
                  <button
                    onClick={() => { logout(); navigate('/login'); }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
