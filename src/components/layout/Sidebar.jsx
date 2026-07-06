// src/components/layout/Sidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Tag, UserRound, Building2,
  Users, ArrowRightLeft, RotateCcw, BookMarked, DollarSign,
  Barcode, FileBarChart2, ShieldUser, Bell, Settings, UserCircle,
  LogOut, ChevronLeft, ChevronRight, BookCopy, Library
} from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext';
import { useAuth } from '../../context/AuthContext';
import { sidebarItemVariants } from '../../animations/variants';
import { ROLES } from '../../data/roles';

// Each item has a `permission` key that maps to the `can()` check in AuthContext.
// Admin has ['all'] so passes every check.
// Operator has an explicit list — barcodes, reports, staff, settings are NOT in it.
// General user only has: dashboard, books, my-reservations, my-fines, notifications, profile.
const navItems = [
  { section: 'Main', items: [
    { label: 'Dashboard',   icon: LayoutDashboard, path: '/dashboard',  permission: 'dashboard' },
  ]},
  { section: 'Catalog', items: [
    { label: 'Books',       icon: BookOpen,   path: '/books',      permission: 'books' },
    { label: 'Categories',  icon: Tag,        path: '/categories', permission: 'categories' },
    { label: 'Authors',     icon: UserRound,  path: '/authors',    permission: 'authors' },
    { label: 'Publishers',  icon: Building2,  path: '/publishers', permission: 'publishers' },
  ]},
  { section: 'Circulation', items: [
    { label: 'Members',         icon: Users,          path: '/members',      permission: 'members' },
    { label: 'Issue Book',      icon: ArrowRightLeft, path: '/issue',        permission: 'issue' },
    { label: 'Return Book',     icon: RotateCcw,      path: '/return',       permission: 'return' },
    { label: 'Reservations',    icon: BookMarked,     path: '/reservations', permission: 'reservations' },
    { label: 'Fine Management', icon: DollarSign,     path: '/fines',        permission: 'fines' },
  ]},
  { section: 'Tools', items: [
    { label: 'Barcode', icon: Barcode,       path: '/barcodes', permission: 'barcodes' },
    { label: 'Reports', icon: FileBarChart2, path: '/reports',  permission: 'reports' },
  ]},
  { section: 'Administration', items: [
    { label: 'Staff',         icon: ShieldUser, path: '/staff',         permission: 'staff' },
    { label: 'Notifications', icon: Bell,       path: '/notifications', permission: 'notifications', badge: 3 },
    { label: 'Settings',      icon: Settings,   path: '/settings',      permission: 'settings' },
  ]},
];

const ROLE_AVATAR_COLOR = {
  admin:    'bg-gradient-primary',
  operator: 'bg-gradient-success',
  user:     'bg-gradient-purple-solid',
};

export default function Sidebar() {
  const { isCollapsed, toggle, isMobileOpen, closeMobile } = useSidebar();
  const { user, logout, can } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Filter sections: keep only items the current user can access
  // and drop empty sections entirely
  const visibleNav = navItems
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => can(item.permission)),
    }))
    .filter((section) => section.items.length > 0);

  const roleInfo = ROLES[user?.role];
  const avatarInitials = user?.name?.split(' ').map((w) => w[0]).join('').slice(0, 2) || 'U';

  const sidebarContent = (
    <motion.div
      animate={{ width: isCollapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="h-full flex flex-col glass border-r border-white/50 dark:border-white/10 overflow-hidden relative"
      style={{ minWidth: isCollapsed ? 72 : 260 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/40 dark:border-white/10 shrink-0">
        <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow shrink-0">
          <Library className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <p className="font-display font-bold text-slate-800 dark:text-white text-sm leading-tight">Library MS</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Management System</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {visibleNav.map((section) => (
          <div key={section.section} className="mb-1">
            <AnimatePresence>
              {!isCollapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 py-2 mt-1"
                >
                  {section.section}
                </motion.p>
              )}
            </AnimatePresence>
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => { if (isMobileOpen) closeMobile(); }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer transition-all duration-200 relative group ${
                    isActive
                      ? 'bg-gradient-primary text-white shadow-glow'
                      : 'text-slate-600 dark:text-slate-400 hover:text-brand-700 dark:hover:text-white hover:bg-brand-50/80 dark:hover:bg-white/10'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-white' : ''}`} />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.2 }}
                          className="text-sm font-medium flex-1 whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {item.badge && !isCollapsed && (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {item.badge && isCollapsed && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                    {/* Tooltip for collapsed */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg transition-opacity duration-150">
                        {item.label}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            ))}
            {!isCollapsed && <div className="h-px bg-slate-100 dark:bg-white/10 my-1 mx-2" />}
          </div>
        ))}
      </div>

      {/* User Card + Logout + Toggle */}
      <div className="border-t border-white/40 dark:border-white/10 p-3 shrink-0 space-y-2">
        <NavLink
          to="/profile"
          className="flex items-center gap-3 p-2 rounded-2xl hover:bg-brand-50 dark:hover:bg-white/10 transition-colors group"
        >
          <div className={`w-9 h-9 ${ROLE_AVATAR_COLOR[user?.role] || 'bg-gradient-primary'} rounded-xl flex items-center justify-center shrink-0 shadow-sm`}>
            <span className="text-white font-bold text-xs">{avatarInitials}</span>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-semibold text-slate-700 dark:text-white truncate">{user?.name}</p>
                <p className="text-xs text-slate-400 truncate flex items-center gap-1">
                  <span>{roleInfo?.badge}</span>
                  <span>{roleInfo?.label}</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group relative"
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
          {isCollapsed && (
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg transition-opacity duration-150">
              Logout
            </div>
          )}
        </button>

        {/* Toggle */}
        <button
          onClick={toggle}
          className="flex items-center justify-center w-full p-2 rounded-2xl text-slate-500 hover:bg-brand-50 dark:hover:bg-white/10 hover:text-brand-600 transition-all duration-200"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-screen sticky top-0 z-30 shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={closeMobile}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed left-0 top-0 h-full z-50 lg:hidden"
              style={{ width: 260 }}
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
