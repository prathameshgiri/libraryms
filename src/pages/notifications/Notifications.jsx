// src/pages/notifications/Notifications.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, Trash2, Filter } from 'lucide-react';
import { mockNotifications } from '../../data/mockData';
import { staggerContainer, staggerItem, fadeIn } from '../../animations/variants';
import { format } from 'date-fns';

const notifIcons = {
  overdue: { emoji: '🔴', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-100 dark:border-red-800' },
  due: { emoji: '🟡', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-100' },
  reservation: { emoji: '🔵', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-100' },
  new_member: { emoji: '🟢', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-100' },
  fine: { emoji: '💰', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-100' },
  system: { emoji: '⚙️', bg: 'bg-slate-50 dark:bg-slate-800', border: 'border-slate-100' },
};

export default function Notifications() {
  const [notifs, setNotifs] = useState(mockNotifications);
  const [filter, setFilter] = useState('All');

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const filtered = notifs.filter((n) => filter === 'All' || (filter === 'Unread' && !n.read) || (filter === 'Read' && n.read));
  const unread = notifs.filter((n) => !n.read).length;

  return (
    <div className="space-y-5">
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white flex items-center gap-2">
            Notifications
            {unread > 0 && <span className="badge badge-red">{unread} new</span>}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Library alerts and updates</p>
        </div>
        <button onClick={markAllRead} className="btn-secondary gap-2 self-start"><CheckCheck className="w-4 h-4" /> Mark all read</button>
      </motion.div>

      {/* Filter */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-4 flex gap-2">
        {['All', 'Unread', 'Read'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all ${filter === f ? 'bg-gradient-primary text-white' : 'bg-white/60 dark:bg-white/10 text-slate-600 border border-slate-200 dark:border-white/20'}`}>
            {f}
          </button>
        ))}
      </motion.div>

      {/* Notifications List */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-3">
        {filtered.map((notif) => {
          const cfg = notifIcons[notif.type] || notifIcons.system;
          return (
            <motion.div
              key={notif.id}
              variants={staggerItem}
              onClick={() => setNotifs((prev) => prev.map((n) => n.id === notif.id ? { ...n, read: true } : n))}
              className={`card-glass p-4 flex items-start gap-4 cursor-pointer ${!notif.read ? cfg.border + ' border-l-4' : ''} border border-white/50 dark:border-white/10`}
            >
              <div className={`w-11 h-11 ${cfg.bg} rounded-2xl flex items-center justify-center shrink-0 text-xl`}>
                {cfg.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p className={`text-sm font-semibold ${!notif.read ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>{notif.title}</p>
                  {!notif.read && <span className="w-2 h-2 bg-brand-500 rounded-full shrink-0" />}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{notif.message}</p>
                <p className="text-xs text-slate-400 mt-1">{format(new Date(notif.time), 'dd MMM yyyy, hh:mm a')}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setNotifs((prev) => prev.filter((n) => n.id !== notif.id)); }} className="btn-icon btn-ghost hover:bg-red-50 hover:text-red-500 w-8 h-8 shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No notifications</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
