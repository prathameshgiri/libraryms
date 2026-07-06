// src/pages/publishers/Publishers.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Globe, Phone, Mail, MapPin, Building2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { mockPublishers } from '../../data/mockData';
import { staggerContainer, staggerItem, fadeIn } from '../../animations/variants';

const PUB_COLORS = ['bg-gradient-primary', 'bg-gradient-success', 'bg-gradient-purple-solid', 'bg-gradient-warning', 'bg-gradient-teal', 'bg-gradient-danger', 'bg-gradient-info'];

export default function Publishers() {
  const [search, setSearch] = useState('');
  const [publishers, setPublishers] = useState(mockPublishers);

  const filtered = publishers.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white">Publishers</h1>
          <p className="text-sm text-slate-500 mt-0.5">{filtered.length} publishers</p>
        </div>
        <button className="btn-primary gap-2 self-start"><Plus className="w-4 h-4" /> Add Publisher</button>
      </motion.div>

      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="input-base pl-10" placeholder="Search publishers..." />
        </div>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((pub, i) => (
          <motion.div key={pub.id} variants={staggerItem} whileHover={{ y: -4 }} className="card-glass p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${PUB_COLORS[i % PUB_COLORS.length]} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                  {pub.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-slate-800 dark:text-white">{pub.name}</h3>
                  <p className="text-xs text-brand-600 font-medium">{pub.booksCount} books published</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="btn-icon btn-ghost hover:bg-yellow-50 hover:text-yellow-600 w-8 h-8"><Edit className="w-3.5 h-3.5" /></button>
                <button onClick={() => { setPublishers((p) => p.filter((x) => x.id !== pub.id)); toast.success('Publisher removed'); }} className="btn-icon btn-ghost hover:bg-red-50 hover:text-red-600 w-8 h-8"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-xs text-slate-500"><MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-brand-400" />{pub.address}</div>
              <div className="flex items-center gap-2 text-xs text-slate-500"><Phone className="w-3.5 h-3.5 text-brand-400" />{pub.phone}</div>
              <div className="flex items-center gap-2 text-xs text-slate-500"><Mail className="w-3.5 h-3.5 text-brand-400" />{pub.email}</div>
              <div className="flex items-center gap-2 text-xs text-brand-600"><Globe className="w-3.5 h-3.5" />{pub.website}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
