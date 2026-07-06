// src/pages/reservations/Reservations.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookMarked, CheckCircle, XCircle, Clock, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import { mockReservations } from '../../data/mockData';
import { staggerContainer, staggerItem, fadeIn } from '../../animations/variants';

const STATUS_BADGE = { Waiting: 'badge-yellow', Ready: 'badge-green', Cancelled: 'badge-red', Expired: 'badge-gray' };

export default function Reservations() {
  const [reservations, setReservations] = useState(mockReservations);
  const [filter, setFilter] = useState('All');

  const filtered = reservations.filter((r) => filter === 'All' || r.status === filter);

  const handleApprove = (id) => {
    setReservations((prev) => prev.map((r) => r.id === id ? { ...r, status: 'Ready' } : r));
    toast.success('Reservation approved!');
  };

  const handleCancel = (id) => {
    setReservations((prev) => prev.map((r) => r.id === id ? { ...r, status: 'Cancelled' } : r));
    toast.info('Reservation cancelled');
  };

  return (
    <div className="space-y-5">
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white">Reservations</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage book reservation requests</p>
        </div>
        <button className="btn-primary gap-2 self-start"><Plus className="w-4 h-4" /> New Reservation</button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-3 gap-3">
        {[
          { label: 'Waiting', count: reservations.filter((r) => r.status === 'Waiting').length, icon: Clock, color: 'bg-yellow-50 text-yellow-700' },
          { label: 'Ready', count: reservations.filter((r) => r.status === 'Ready').length, icon: CheckCircle, color: 'bg-green-50 text-green-700' },
          { label: 'Cancelled', count: reservations.filter((r) => r.status === 'Cancelled').length, icon: XCircle, color: 'bg-red-50 text-red-700' },
        ].map((s) => (
          <motion.div key={s.label} variants={staggerItem} className={`card-glass p-4 flex items-center gap-3 ${s.color}`}>
            <s.icon className="w-6 h-6 shrink-0" />
            <div>
              <p className="text-2xl font-bold">{s.count}</p>
              <p className="text-xs font-medium">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-4 flex gap-2">
        {['All', 'Waiting', 'Ready', 'Cancelled'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all ${filter === f ? 'bg-gradient-primary text-white' : 'bg-white/60 dark:bg-white/10 text-slate-600 border border-slate-200 dark:border-white/20'}`}>
            {f}
          </button>
        ))}
      </motion.div>

      {/* Cards */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((res) => (
          <motion.div key={res.id} variants={staggerItem} whileHover={{ y: -4 }} className="card-glass p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <BookMarked className="w-5 h-5 text-white" />
              </div>
              <span className={`badge text-xs ${STATUS_BADGE[res.status]}`}>{res.status}</span>
            </div>
            <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-1 text-sm">{res.bookTitle}</h3>
            <p className="text-xs text-slate-500 mb-3">Reserved by: <span className="font-medium text-slate-700 dark:text-slate-200">{res.memberName}</span></p>
            <div className="text-xs text-slate-400 space-y-1 mb-4">
              <p>Reserved: {res.reservedDate}</p>
              <p>Expires: {res.expiryDate}</p>
              {res.position > 0 && <p>Queue position: #{res.position}</p>}
            </div>
            {res.status === 'Waiting' && (
              <div className="flex gap-2">
                <button onClick={() => handleApprove(res.id)} className="btn-success btn-sm flex-1 gap-1"><CheckCircle className="w-3.5 h-3.5" /> Approve</button>
                <button onClick={() => handleCancel(res.id)} className="btn-danger btn-sm gap-1"><XCircle className="w-3.5 h-3.5" /> Cancel</button>
              </div>
            )}
            {res.status === 'Ready' && (
              <p className="text-xs text-green-600 font-medium flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Ready for pickup</p>
            )}
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-400">No reservations found</div>
        )}
      </motion.div>
    </div>
  );
}
