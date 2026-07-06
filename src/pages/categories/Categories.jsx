// src/pages/categories/Categories.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, BookOpen } from 'lucide-react';
import { toast } from 'react-toastify';
import { mockCategories } from '../../data/mockData';
import { staggerContainer, staggerItem, fadeIn } from '../../animations/variants';

export default function Categories() {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState(mockCategories);

  const filtered = categories.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white">Categories</h1>
          <p className="text-sm text-slate-500 mt-0.5">{filtered.length} book categories</p>
        </div>
        <button className="btn-primary gap-2 self-start"><Plus className="w-4 h-4" /> Add Category</button>
      </motion.div>

      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="input-base pl-10" placeholder="Search categories..." />
        </div>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((cat) => (
          <motion.div
            key={cat.id}
            variants={staggerItem}
            whileHover={{ y: -6, scale: 1.01 }}
            className="card-glass p-6 cursor-pointer"
            style={{ background: cat.color + '70' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{cat.icon}</div>
              <div className="flex gap-1">
                <button className="btn-icon btn-ghost hover:bg-white/80 w-7 h-7"><Edit className="w-3 h-3" /></button>
                <button onClick={() => { setCategories((p) => p.filter((c) => c.id !== cat.id)); toast.success('Category removed'); }} className="btn-icon btn-ghost hover:bg-red-50 hover:text-red-600 w-7 h-7"><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
            <h3 className="font-display font-bold text-slate-800 dark:text-white text-lg mb-1">{cat.name}</h3>
            <p className="text-xs text-slate-500 line-clamp-2 mb-4">{cat.description}</p>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <BookOpen className="w-4 h-4" />
              {cat.booksCount} books
            </div>
          </motion.div>
        ))}

        {/* Add Card */}
        <motion.div
          variants={staggerItem}
          whileHover={{ y: -6 }}
          className="card-glass p-6 flex flex-col items-center justify-center gap-3 cursor-pointer border-2 border-dashed border-brand-200 dark:border-brand-700 hover:border-brand-400 transition-colors min-h-[180px]"
        >
          <div className="w-14 h-14 bg-brand-50 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center">
            <Plus className="w-6 h-6 text-brand-500" />
          </div>
          <p className="text-sm font-medium text-brand-600">New Category</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
