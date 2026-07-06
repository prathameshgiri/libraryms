// src/pages/books/BookList.jsx
import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus, Search, Filter, Download, BookOpen, Eye, Edit, Trash2,
  ChevronLeft, ChevronRight, SortAsc, Grid3X3, List
} from 'lucide-react';
import { toast } from 'react-toastify';
import { mockBooks } from '../../data/mockData';
import { staggerContainer, staggerItem, fadeIn } from '../../animations/variants';

const STATUS_COLORS = {
  Available: 'badge-green',
  Issued: 'badge-yellow',
  Reserved: 'badge-purple',
  Lost: 'badge-red',
};

const CATEGORY_COLORS = {
  Technology: 'bg-blue-50 text-blue-700',
  'Self-Help': 'bg-green-50 text-green-700',
  History: 'bg-yellow-50 text-yellow-700',
  Fiction: 'bg-purple-50 text-purple-700',
  Business: 'bg-orange-50 text-orange-700',
  Science: 'bg-teal-50 text-teal-700',
};

export default function BookList() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [view, setView] = useState('table');
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState(mockBooks);
  const navigate = useNavigate();
  const perPage = 6;

  const categories = ['All', ...new Set(mockBooks.map((b) => b.category))];
  const statuses = ['All', 'Available', 'Issued', 'Reserved'];

  const filtered = useMemo(() =>
    books.filter((b) => {
      const q = search.toLowerCase();
      const matchSearch = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.isbn.includes(q);
      const matchCat = category === 'All' || b.category === category;
      const matchStatus = status === 'All' || b.status === status;
      return matchSearch && matchCat && matchStatus;
    }),
    [books, search, category, status]
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
    toast.success('Book deleted successfully');
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white">Books</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{filtered.length} books in catalog</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary btn-sm gap-1.5"><Download className="w-4 h-4" /> Export</button>
          <Link to="/books/add" className="btn-primary btn-sm gap-1.5"><Plus className="w-4 h-4" /> Add Book</Link>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="input-base pl-10"
            placeholder="Search by title, author, ISBN..."
          />
        </div>
        <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="input-base sm:w-44">
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="input-base sm:w-36">
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
        <div className="flex gap-2">
          <button onClick={() => setView('table')} className={`btn-icon ${view === 'table' ? 'bg-brand-100 text-brand-700' : 'btn-ghost'}`}><List className="w-4 h-4" /></button>
          <button onClick={() => setView('grid')} className={`btn-icon ${view === 'grid' ? 'bg-brand-100 text-brand-700' : 'btn-ghost'}`}><Grid3X3 className="w-4 h-4" /></button>
        </div>
      </motion.div>

      {/* Table View */}
      {view === 'table' && (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="table-wrapper">
          <table className="table-base">
            <thead>
              <tr>
                <th>#</th>
                <th>Book</th>
                <th>ISBN</th>
                <th>Category</th>
                <th>Shelf</th>
                <th className="text-center">Available</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((book, i) => (
                <motion.tr key={book.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <td className="font-medium text-slate-400 text-xs">{(page - 1) * perPage + i + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-13 bg-gradient-soft rounded-xl flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-brand-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700 dark:text-white text-sm">{book.title}</p>
                        <p className="text-xs text-slate-400">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-xs text-slate-500">{book.isbn}</td>
                  <td>
                    <span className={`badge text-xs ${CATEGORY_COLORS[book.category] || 'badge-gray'}`}>{book.category}</span>
                  </td>
                  <td className="text-xs text-slate-500">{book.shelf}-{book.rack}</td>
                  <td className="text-center">
                    <span className={`font-semibold text-sm ${book.available > 0 ? 'text-green-600' : 'text-red-500'}`}>{book.available}/{book.quantity}</span>
                  </td>
                  <td><span className={`badge ${STATUS_COLORS[book.status] || 'badge-gray'}`}>{book.status}</span></td>
                  <td>
                    <div className="flex items-center justify-center gap-1.5">
                      <button onClick={() => navigate(`/books/${book.id}`)} className="btn-icon btn-ghost hover:bg-brand-50 hover:text-brand-600 w-8 h-8"><Eye className="w-3.5 h-3.5" /></button>
                      <button onClick={() => navigate(`/books/edit/${book.id}`)} className="btn-icon btn-ghost hover:bg-yellow-50 hover:text-yellow-600 w-8 h-8"><Edit className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(book.id)} className="btn-icon btn-ghost hover:bg-red-50 hover:text-red-600 w-8 h-8"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={8} className="text-center py-12 text-slate-400">No books found</td></tr>
              )}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Grid View */}
      {view === 'grid' && (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.map((book) => (
            <motion.div key={book.id} variants={staggerItem} whileHover={{ y: -4 }} className="card-glass p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-20 bg-gradient-to-br from-brand-100 to-brand-50 rounded-2xl flex items-center justify-center shrink-0">
                  <BookOpen className="w-7 h-7 text-brand-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-slate-800 dark:text-white text-sm leading-tight line-clamp-2 mb-1">{book.title}</h3>
                  <p className="text-xs text-slate-500">{book.author}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className={`badge text-xs ${CATEGORY_COLORS[book.category] || 'badge-gray'}`}>{book.category}</span>
                    <span className={`badge text-xs ${STATUS_COLORS[book.status] || 'badge-gray'}`}>{book.status}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span>{book.shelf}-{book.rack}</span>
                <span className={`font-semibold ${book.available > 0 ? 'text-green-600' : 'text-red-500'}`}>{book.available}/{book.quantity} available</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => navigate(`/books/${book.id}`)} className="btn-secondary btn-sm flex-1"><Eye className="w-3 h-3" /> View</button>
                <button onClick={() => navigate(`/books/edit/${book.id}`)} className="btn-icon btn-ghost hover:bg-yellow-50 hover:text-yellow-600"><Edit className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(book.id)} className="btn-icon btn-ghost hover:bg-red-50 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex items-center justify-between">
          <p className="text-sm text-slate-500">Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</p>
          <div className="flex gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="btn-secondary btn-sm disabled:opacity-40"><ChevronLeft className="w-4 h-4" /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`btn-sm w-9 h-9 ${p === page ? 'btn-primary' : 'btn-secondary'}`}>{p}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-secondary btn-sm disabled:opacity-40"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
