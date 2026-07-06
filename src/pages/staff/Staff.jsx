// src/pages/staff/Staff.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Shield, UserCheck, Clock } from 'lucide-react';
import { toast } from 'react-toastify';
import { mockStaff } from '../../data/mockData';
import { staggerContainer, staggerItem, fadeIn } from '../../animations/variants';

const ROLE_COLORS = {
  'Head Librarian': 'bg-gradient-primary',
  'Assistant Librarian': 'bg-gradient-success',
  'Catalog Librarian': 'bg-gradient-purple-solid',
  'IT Support': 'bg-gradient-warning',
};

export default function Staff() {
  const [staff, setStaff] = useState(mockStaff);

  return (
    <div className="space-y-5">
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white">Staff Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">{staff.length} staff members</p>
        </div>
        <button className="btn-primary gap-2 self-start"><Plus className="w-4 h-4" /> Add Staff</button>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staff.map((member) => (
          <motion.div key={member.id} variants={staggerItem} whileHover={{ y: -4 }} className="card-glass p-5">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-14 h-14 ${ROLE_COLORS[member.role] || 'bg-gradient-primary'} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-sm shrink-0`}>
                {member.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display font-semibold text-slate-800 dark:text-white">{member.name}</h3>
                    <p className="text-xs text-slate-500">{member.role}</p>
                  </div>
                  <span className={`badge text-xs shrink-0 ${member.status === 'Active' ? 'badge-green' : 'badge-gray'}`}>{member.status}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-xs text-slate-500">{member.email}</p>
              <p className="text-xs text-slate-500">{member.phone}</p>
              <p className="text-xs text-slate-400">Joined: {member.joinDate}</p>
            </div>

            {/* Attendance Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> Attendance</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{member.attendance}%</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${member.attendance >= 90 ? 'bg-gradient-success' : 'bg-gradient-warning'}`} style={{ width: `${member.attendance}%` }} />
              </div>
            </div>

            {/* Permissions */}
            <div className="flex flex-wrap gap-1 mb-4">
              {(member.permissions.includes('all') ? ['All Access'] : member.permissions).map((p) => (
                <span key={p} className="badge badge-blue text-xs"><Shield className="w-3 h-3" />{p}</span>
              ))}
            </div>

            <div className="flex gap-2">
              <button className="btn-secondary btn-sm flex-1 gap-1.5"><Edit className="w-3.5 h-3.5" /> Edit</button>
              <button onClick={() => { setStaff((prev) => prev.filter((s) => s.id !== member.id)); toast.success('Staff removed'); }} className="btn-icon btn-ghost hover:bg-red-50 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
