// src/pages/authors/Authors.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, BookOpen, User } from 'lucide-react';
import { toast } from 'react-toastify';
import { mockAuthors } from '../../data/mockData';
import { staggerContainer, staggerItem, fadeIn } from '../../animations/variants';

const AVATAR_COLORS = ['bg-gradient-primary', 'bg-gradient-success', 'bg-gradient-purple-solid', 'bg-gradient-warning', 'bg-gradient-teal', 'bg-gradient-danger', 'bg-gradient-info'];

export default function Authors() {
  const [search, setSearch] = useState('');
  const [authors, setAuthors] = useState(mockAuthors);

  const filtered = authors.filter((a) =>
    !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.nationality.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white">Authors</h1>
          <p className="text-sm text-slate-500 mt-0.5">{filtered.length} authors in system</p>
        </div>
        <button className="btn-primary gap-2 self-start sm:self-auto"><Plus className="w-4 h-4" /> Add Author</button>
      </motion.div>

      {/* Search */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="input-base pl-10" placeholder="Search authors..." />
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((author, i) => (
          <motion.div key={author.id} variants={staggerItem} whileHover={{ y: -4 }} className="card-glass p-5">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 ${AVATAR_COLORS[i % AVATAR_COLORS.length]} rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-sm`}>
                {author.name.charAt(0)}
              </div>
              <div className="flex gap-1">
                <button className="btn-icon btn-ghost hover:bg-yellow-50 hover:text-yellow-600 w-8 h-8"><Edit className="w-3.5 h-3.5" /></button>
                <button onClick={() => { setAuthors((p) => p.filter((a) => a.id !== author.id)); toast.success('Author removed'); }} className="btn-icon btn-ghost hover:bg-red-50 hover:text-red-600 w-8 h-8"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <h3 className="font-display font-semibold text-slate-800 dark:text-white text-base mb-1">{author.name}</h3>
            <p className="text-xs text-slate-500 mb-3 line-clamp-2">{author.bio}</p>
            <div className="flex items-center justify-between">
              <span className="badge badge-gray text-xs">📍 {author.nationality}</span>
              <div className="flex items-center gap-1 text-xs text-brand-600 font-medium">
                <BookOpen className="w-3.5 h-3.5" />
                {author.booksCount} books
              </div>
            </div>
          </motion.div>
        ))}
        {/* Add Card */}
        <motion.div
          variants={staggerItem}
          whileHover={{ y: -4 }}
          className="card-glass p-5 border-2 border-dashed border-brand-200 dark:border-brand-700 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-brand-400 transition-colors min-h-[180px]"
        >
          <div className="w-14 h-14 bg-brand-50 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center">
            <Plus className="w-6 h-6 text-brand-500" />
          </div>
          <p className="text-sm font-medium text-brand-600">Add New Author</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
