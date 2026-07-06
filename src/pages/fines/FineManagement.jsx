// src/pages/fines/FineManagement.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Clock, CheckCircle, Download, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import { mockFines } from '../../data/mockData';
import { staggerContainer, staggerItem, fadeIn } from '../../animations/variants';

export default function FineManagement() {
  const [filter, setFilter] = useState('All');
  const [fines, setFines] = useState(mockFines);

  const filtered = fines.filter((f) => filter === 'All' || f.status === filter);
  const totalPending = fines.filter((f) => f.status === 'Pending').reduce((a, f) => a + f.amount, 0);
  const totalPaid = fines.filter((f) => f.status === 'Paid').reduce((a, f) => a + f.amount, 0);

  const handleCollect = (id) => {
    setFines((prev) => prev.map((f) => f.id === id ? { ...f, status: 'Paid' } : f));
    toast.success('Fine collected successfully!');
  };

  return (
    <div className="space-y-5">
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white">Fine Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track and collect library fines</p>
        </div>
        <button className="btn-secondary gap-2 self-start"><Download className="w-4 h-4" /> Export</button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Pending', value: `₹${totalPending}`, gradient: 'bg-gradient-danger', icon: Clock },
          { label: 'Total Collected', value: `₹${totalPaid}`, gradient: 'bg-gradient-success', icon: CheckCircle },
          { label: 'Pending Cases', value: fines.filter((f) => f.status === 'Pending').length, gradient: 'bg-gradient-warning', icon: DollarSign },
          { label: 'Resolved Cases', value: fines.filter((f) => f.status === 'Paid').length, gradient: 'bg-gradient-primary', icon: TrendingUp },
        ].map((s) => (
          <motion.div key={s.label} variants={staggerItem} className="card-glass p-5">
            <div className={`w-10 h-10 ${s.gradient} rounded-2xl flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-display font-bold text-slate-800 dark:text-white">{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-4 flex gap-2 flex-wrap">
        {['All', 'Pending', 'Paid'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all ${filter === f ? 'bg-gradient-primary text-white shadow-glow' : 'bg-white/60 dark:bg-white/10 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/20 hover:border-brand-300'}`}>
            {f}
          </button>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="table-wrapper">
        <table className="table-base">
          <thead>
            <tr>
              <th>#</th>
              <th>Member</th>
              <th>Book</th>
              <th className="text-center">Late Days</th>
              <th className="text-center">Rate/Day</th>
              <th>Fine Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((fine, i) => (
              <motion.tr key={fine.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}>
                <td className="text-xs text-slate-400">{i + 1}</td>
                <td className="font-medium text-slate-700 dark:text-slate-200 text-sm">{fine.memberName}</td>
                <td className="text-sm text-slate-600 dark:text-slate-400 max-w-[180px]"><p className="truncate">{fine.bookTitle}</p></td>
                <td className="text-center"><span className="font-semibold text-orange-600">{fine.lateDays}</span></td>
                <td className="text-center text-sm text-slate-600">₹{fine.ratePerDay}</td>
                <td><span className="font-bold text-slate-800 dark:text-white">₹{fine.amount}</span></td>
                <td className="text-sm text-slate-500">{fine.dueDate}</td>
                <td>
                  <span className={`badge text-xs ${fine.status === 'Paid' ? 'badge-green' : 'badge-red'}`}>{fine.status}</span>
                </td>
                <td>
                  <div className="flex items-center justify-center gap-1.5">
                    {fine.status === 'Pending' && (
                      <button onClick={() => handleCollect(fine.id)} className="btn-success btn-sm gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" /> Collect
                      </button>
                    )}
                    {fine.status === 'Paid' && <span className="text-xs text-green-600 font-medium flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Paid</span>}
                  </div>
                </td>
              </motion.tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={9} className="text-center py-12 text-slate-400">No fines found</td></tr>}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
