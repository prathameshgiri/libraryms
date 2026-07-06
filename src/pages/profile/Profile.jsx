// src/pages/profile/Profile.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Save, Key, Activity, Shield, Mail, Phone, User } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { fadeIn, staggerContainer, staggerItem } from '../../animations/variants';

const TABS = ['Personal', 'Change Password', 'Activity', 'Permissions'];

export default function Profile() {
  const { user } = useAuth();
  const [tab, setTab] = useState('Personal');
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });

  return (
    <div className="space-y-5">
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white">My Profile</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your account settings</p>
      </motion.div>

      {/* Profile Header */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-6 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="relative flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-white text-4xl font-bold border-2 border-white/30">
              {user?.name?.charAt(0)}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-xl flex items-center justify-center text-brand-600 shadow-sm hover:scale-110 transition-transform">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl">{user?.name}</h2>
            <p className="text-white/80">{user?.role}</p>
            <p className="text-white/60 text-sm">{user?.email}</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all ${tab === t ? 'bg-gradient-primary text-white shadow-glow' : 'bg-white/60 dark:bg-white/10 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/20 hover:border-brand-300'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div key={tab} variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-6">
        {tab === 'Personal' && (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="label-base">Full Name</label><div className="relative"><User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input defaultValue={user?.name} className="input-base pl-10" /></div></div>
              <div><label className="label-base">Email</label><div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input defaultValue={user?.email} type="email" className="input-base pl-10" /></div></div>
              <div><label className="label-base">Phone</label><div className="relative"><Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input defaultValue="+91-9876543200" className="input-base pl-10" /></div></div>
              <div><label className="label-base">Role</label><input defaultValue={user?.role} disabled className="input-base opacity-60 cursor-not-allowed" /></div>
              <div className="sm:col-span-2"><label className="label-base">Bio</label><textarea rows={3} placeholder="Tell us about yourself..." defaultValue="Senior Library Administrator with 8+ years of experience." className="input-base resize-none" /></div>
            </div>
            <button onClick={() => toast.success('Profile updated!')} className="btn-primary gap-2 mt-2"><Save className="w-4 h-4" /> Save Changes</button>
          </div>
        )}

        {tab === 'Change Password' && (
          <div className="space-y-4 max-w-md">
            <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4">Change Password</h3>
            {[['current', 'Current Password'], ['new', 'New Password'], ['confirm', 'Confirm New Password']].map(([key, label]) => (
              <div key={key}>
                <label className="label-base">{label}</label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type={showPass[key] ? 'text' : 'password'} className="input-base pl-10 pr-10" placeholder={`Enter ${label.toLowerCase()}`} />
                  <button type="button" onClick={() => setShowPass((p) => ({ ...p, [key]: !p[key] }))} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs">
                    {showPass[key] ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
            ))}
            <button onClick={() => toast.success('Password changed!')} className="btn-primary gap-2 mt-2"><Key className="w-4 h-4" /> Change Password</button>
          </div>
        )}

        {tab === 'Activity' && (
          <div>
            <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'Logged in', time: 'Today, 9:00 AM', icon: '🔑' },
                { action: 'Issued "Atomic Habits" to Aarav Sharma', time: 'Today, 10:15 AM', icon: '📤' },
                { action: 'Processed return for Priya Nair', time: 'Today, 11:30 AM', icon: '📥' },
                { action: 'Updated library settings', time: 'Yesterday, 3:00 PM', icon: '⚙️' },
                { action: 'Added new book "Python Crash Course"', time: 'Yesterday, 4:45 PM', icon: '📚' },
              ].map((act, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/60 dark:bg-white/5 rounded-2xl border border-white/50 dark:border-white/10">
                  <span className="text-xl">{act.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{act.action}</p>
                    <p className="text-xs text-slate-400">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Permissions' && (
          <div>
            <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4">Your Permissions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Book Management', 'Member Management', 'Issue Books', 'Return Books', 'Fine Management', 'Reports', 'Staff Management', 'Settings', 'System Admin'].map((perm) => (
                <div key={perm} className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                  <Shield className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{perm}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
