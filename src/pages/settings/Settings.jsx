// src/pages/settings/Settings.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Library, Clock, DollarSign, BookOpen, Users, Palette, Shield, Save, Database } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';
import { fadeIn, staggerContainer, staggerItem } from '../../animations/variants';

const TABS = [
  { key: 'library', label: 'Library Info', icon: Library },
  { key: 'hours', label: 'Working Hours', icon: Clock },
  { key: 'fines', label: 'Fine Rules', icon: DollarSign },
  { key: 'borrow', label: 'Borrow Limits', icon: BookOpen },
  { key: 'membership', label: 'Membership', icon: Users },
  { key: 'theme', label: 'Theme', icon: Palette },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'backup', label: 'Backup', icon: Database },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('library');
  const { isDark, toggleTheme } = useTheme();

  const save = () => toast.success('Settings saved!');

  return (
    <div className="space-y-5">
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Configure your library management system</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Tabs */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-3 lg:col-span-1 h-fit">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-2xl text-sm font-medium mb-1 transition-all ${activeTab === tab.key ? 'bg-gradient-primary text-white shadow-glow' : 'text-slate-600 dark:text-slate-400 hover:bg-brand-50 dark:hover:bg-white/10'}`}
            >
              <tab.icon className="w-4 h-4 shrink-0" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="lg:col-span-3 card-glass p-6">
          {activeTab === 'library' && (
            <div className="space-y-4">
              <h2 className="font-display font-semibold text-lg text-slate-800 dark:text-white">Library Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="label-base">Library Name</label><input defaultValue="City Central Library" className="input-base" /></div>
                <div><label className="label-base">Code</label><input defaultValue="CCL-001" className="input-base" /></div>
                <div className="sm:col-span-2"><label className="label-base">Address</label><textarea rows={2} defaultValue="123 Library Road, City Centre, State 400001" className="input-base resize-none" /></div>
                <div><label className="label-base">Phone</label><input defaultValue="+91-22-12345678" className="input-base" /></div>
                <div><label className="label-base">Email</label><input defaultValue="library@citycentral.com" className="input-base" /></div>
                <div><label className="label-base">Website</label><input defaultValue="www.citycentral.com/library" className="input-base" /></div>
                <div><label className="label-base">Established Year</label><input defaultValue="1985" type="number" className="input-base" /></div>
              </div>
            </div>
          )}

          {activeTab === 'fines' && (
            <div className="space-y-4">
              <h2 className="font-display font-semibold text-lg text-slate-800 dark:text-white">Fine Rules</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="label-base">Fine per day (₹)</label><input defaultValue="5" type="number" className="input-base" /></div>
                <div><label className="label-base">Maximum fine (₹)</label><input defaultValue="500" type="number" className="input-base" /></div>
                <div><label className="label-base">Grace period (days)</label><input defaultValue="0" type="number" className="input-base" /></div>
                <div><label className="label-base">Damage minimum (₹)</label><input defaultValue="50" type="number" className="input-base" /></div>
              </div>
            </div>
          )}

          {activeTab === 'borrow' && (
            <div className="space-y-4">
              <h2 className="font-display font-semibold text-lg text-slate-800 dark:text-white">Borrow Limits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="label-base">Student — Max books</label><input defaultValue="3" type="number" className="input-base" /></div>
                <div><label className="label-base">Student — Duration (days)</label><input defaultValue="14" type="number" className="input-base" /></div>
                <div><label className="label-base">Faculty — Max books</label><input defaultValue="8" type="number" className="input-base" /></div>
                <div><label className="label-base">Faculty — Duration (days)</label><input defaultValue="30" type="number" className="input-base" /></div>
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-6">
              <h2 className="font-display font-semibold text-lg text-slate-800 dark:text-white">Theme & Appearance</h2>
              <div className="flex items-center justify-between p-4 bg-white/60 dark:bg-white/5 rounded-2xl border border-white/50 dark:border-white/10">
                <div>
                  <p className="font-medium text-slate-700 dark:text-slate-200">Dark Mode</p>
                  <p className="text-xs text-slate-500">Switch between light and dark theme</p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${isDark ? 'bg-brand-500' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${isDark ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="space-y-5">
              <h2 className="font-display font-semibold text-lg text-slate-800 dark:text-white">Backup & Restore</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={() => toast.success('Creating backup...')} className="btn-primary gap-2 py-4 flex-col h-24">
                  <Database className="w-6 h-6" /><span>Create Backup</span>
                </button>
                <button onClick={() => toast.info('Select backup file to restore')} className="btn-secondary gap-2 py-4 flex-col h-24">
                  <Save className="w-6 h-6" /><span>Restore Backup</span>
                </button>
              </div>
              <p className="text-xs text-slate-400">Last backup: Today at 2:00 AM</p>
            </div>
          )}

          {/* Default for unimplemented tabs */}
          {['hours', 'membership', 'security'].includes(activeTab) && (
            <div className="space-y-4">
              <h2 className="font-display font-semibold text-lg text-slate-800 dark:text-white">{TABS.find((t) => t.key === activeTab)?.label}</h2>
              <div className="space-y-3">
                {['Option 1', 'Option 2', 'Option 3'].map((o, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/60 dark:bg-white/5 rounded-2xl border border-white/50 dark:border-white/10">
                    <div><p className="font-medium text-slate-700 dark:text-slate-200 text-sm">{o}</p><p className="text-xs text-slate-400">Configure this setting</p></div>
                    <input className="input-base w-32" defaultValue={`Value ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/10">
            <button onClick={save} className="btn-primary gap-2 px-8"><Save className="w-4 h-4" /> Save Changes</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
