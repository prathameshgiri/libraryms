// src/pages/members/MemberList.jsx
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, UserPlus, Eye, Edit, Trash2, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { mockMembers } from '../../data/mockData';
import { staggerContainer, staggerItem, fadeIn } from '../../animations/variants';

const STATUS_BADGE = { Active: 'badge-green', Suspended: 'badge-red', Expired: 'badge-yellow', Inactive: 'badge-gray' };
const TYPE_BADGE = { Student: 'badge-blue', Faculty: 'badge-purple', 'PG Student': 'badge-teal' };

function MemberAvatar({ name, size = 'md' }) {
  const colors = ['bg-gradient-primary', 'bg-gradient-success', 'bg-gradient-purple-solid', 'bg-gradient-warning', 'bg-gradient-teal'];
  const color = colors[name.charCodeAt(0) % colors.length];
  const sz = size === 'md' ? 'w-10 h-10 text-sm' : 'w-12 h-12 text-base';
  return (
    <div className={`${sz} ${color} rounded-2xl flex items-center justify-center text-white font-bold shrink-0`}>
      {name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
    </div>
  );
}

export default function MemberList() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [type, setType] = useState('All');
  const [page, setPage] = useState(1);
  const [members, setMembers] = useState(mockMembers);
  const navigate = useNavigate();
  const perPage = 5;

  const filtered = useMemo(() =>
    members.filter((m) => {
      const q = search.toLowerCase();
      const matchSearch = !q || m.name.toLowerCase().includes(q) || m.memberId.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.studentId.toLowerCase().includes(q);
      const matchStatus = status === 'All' || m.status === status;
      const matchType = type === 'All' || m.membershipType === type;
      return matchSearch && matchStatus && matchType;
    }),
    [members, search, status, type]
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-5">
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white">Members</h1>
          <p className="text-sm text-slate-500 mt-0.5">{filtered.length} registered members</p>
        </div>
        <button className="btn-primary gap-2 self-start sm:self-auto"><UserPlus className="w-4 h-4" /> Add Member</button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: mockMembers.length, color: 'bg-brand-50 text-brand-700' },
          { label: 'Active', value: mockMembers.filter((m) => m.status === 'Active').length, color: 'bg-green-50 text-green-700' },
          { label: 'Suspended', value: mockMembers.filter((m) => m.status === 'Suspended').length, color: 'bg-red-50 text-red-700' },
          { label: 'With Fines', value: mockMembers.filter((m) => m.pendingFine > 0).length, color: 'bg-yellow-50 text-yellow-700' },
        ].map((s) => (
          <motion.div key={s.label} variants={staggerItem} className={`card-glass p-4 text-center ${s.color}`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs font-medium mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="input-base pl-10" placeholder="Search by name, ID, email..." />
        </div>
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="input-base sm:w-36">
          {['All', 'Active', 'Suspended', 'Expired', 'Inactive'].map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={type} onChange={(e) => { setType(e.target.value); setPage(1); }} className="input-base sm:w-40">
          {['All', 'Student', 'Faculty', 'PG Student'].map((t) => <option key={t}>{t}</option>)}
        </select>
      </motion.div>

      {/* Table */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="table-wrapper">
        <table className="table-base">
          <thead>
            <tr>
              <th>Member</th>
              <th>ID</th>
              <th>Department</th>
              <th>Type</th>
              <th className="text-center">Borrowed</th>
              <th>Pending Fine</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((m, i) => (
              <motion.tr key={m.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <td>
                  <div className="flex items-center gap-3">
                    <MemberAvatar name={m.name} />
                    <div>
                      <p className="font-semibold text-slate-700 dark:text-white text-sm">{m.name}</p>
                      <p className="text-xs text-slate-400">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <p className="text-xs font-mono font-medium text-slate-600 dark:text-slate-300">{m.memberId}</p>
                    <p className="text-xs text-slate-400">{m.studentId}</p>
                  </div>
                </td>
                <td className="text-xs text-slate-600 dark:text-slate-400">{m.department}</td>
                <td><span className={`badge text-xs ${TYPE_BADGE[m.membershipType] || 'badge-gray'}`}>{m.membershipType}</span></td>
                <td className="text-center">
                  <span className={`font-semibold text-sm ${m.borrowedBooks > 0 ? 'text-brand-600' : 'text-slate-400'}`}>{m.borrowedBooks}</span>
                </td>
                <td>
                  {m.pendingFine > 0
                    ? <span className="text-red-600 font-semibold text-sm">₹{m.pendingFine}</span>
                    : <span className="text-green-600 text-sm font-medium">Clear</span>
                  }
                </td>
                <td><span className={`badge text-xs ${STATUS_BADGE[m.status] || 'badge-gray'}`}>{m.status}</span></td>
                <td>
                  <div className="flex items-center justify-center gap-1.5">
                    <button onClick={() => navigate(`/members/${m.id}`)} className="btn-icon btn-ghost hover:bg-brand-50 hover:text-brand-600 w-8 h-8"><Eye className="w-3.5 h-3.5" /></button>
                    <button className="btn-icon btn-ghost hover:bg-yellow-50 hover:text-yellow-600 w-8 h-8"><Edit className="w-3.5 h-3.5" /></button>
                    <button onClick={() => { setMembers((p) => p.filter((x) => x.id !== m.id)); toast.success('Member removed'); }} className="btn-icon btn-ghost hover:bg-red-50 hover:text-red-600 w-8 h-8"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {paginated.length === 0 && <tr><td colSpan={8} className="text-center py-12 text-slate-400">No members found</td></tr>}
          </tbody>
        </table>
      </motion.div>

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
