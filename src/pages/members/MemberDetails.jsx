// src/pages/members/MemberDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, BookOpen, DollarSign, Edit } from 'lucide-react';
import { mockMembers, mockIssuedBooks } from '../../data/mockData';
import { fadeIn, staggerContainer, staggerItem } from '../../animations/variants';

export default function MemberDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = mockMembers.find((m) => m.id === parseInt(id));
  const issued = mockIssuedBooks.filter((i) => i.memberId === parseInt(id));

  if (!member) return <div className="text-center py-20 text-slate-400">Member not found</div>;

  return (
    <div className="space-y-5">
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex items-center justify-between flex-wrap gap-4">
        <button onClick={() => navigate('/members')} className="btn-ghost gap-2"><ArrowLeft className="w-4 h-4" /> Back</button>
        <button className="btn-secondary gap-2"><Edit className="w-4 h-4" /> Edit Member</button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Profile Card */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-6 flex flex-col items-center text-center gap-4">
          <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-glow">
            {member.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-slate-800 dark:text-white">{member.name}</h2>
            <p className="text-sm text-slate-500">{member.department} · {member.course}</p>
            <div className="flex gap-2 justify-center mt-3">
              <span className={`badge ${member.status === 'Active' ? 'badge-green' : 'badge-red'}`}>{member.status}</span>
              <span className="badge badge-blue">{member.membershipType}</span>
            </div>
          </div>
          <div className="w-full space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Mail className="w-4 h-4 text-brand-500" />{member.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Phone className="w-4 h-4 text-brand-500" />{member.phone}
            </div>
            <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
              <MapPin className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />{member.address}
            </div>
          </div>
        </motion.div>

        {/* Stats + History */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-2 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Member ID', value: member.memberId, icon: '🪪' },
              { label: 'Borrowed', value: member.borrowedBooks, icon: '📚' },
              { label: 'Total', value: member.totalBorrowed, icon: '📖' },
              { label: 'Fine', value: member.pendingFine > 0 ? `₹${member.pendingFine}` : 'Clear', icon: '💰' },
            ].map((s) => (
              <motion.div key={s.label} variants={staggerItem} className="card-glass p-4 text-center">
                <p className="text-2xl mb-1">{s.icon}</p>
                <p className="font-bold text-slate-800 dark:text-white text-lg">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Membership Info */}
          <motion.div variants={staggerItem} className="card-glass p-5">
            <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4">Membership Details</h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6">
              {[
                { label: 'Student ID', value: member.studentId },
                { label: 'Membership Type', value: member.membershipType },
                { label: 'Joined', value: member.membershipDate },
                { label: 'Expires', value: member.expiryDate },
              ].map((r) => (
                <div key={r.label}>
                  <p className="text-xs text-slate-400">{r.label}</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{r.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Current Books */}
          <motion.div variants={staggerItem} className="card-glass p-5">
            <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4">Currently Issued Books</h3>
            {issued.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">No books currently issued</p>
            ) : (
              <div className="space-y-3">
                {issued.map((issue) => (
                  <div key={issue.id} className="flex items-center gap-3 p-3 bg-white/60 dark:bg-white/5 rounded-2xl border border-white/50 dark:border-white/10">
                    <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-brand-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{issue.bookTitle}</p>
                      <p className="text-xs text-slate-400">Due: {issue.dueDate}</p>
                    </div>
                    <span className={`badge text-xs ${issue.status === 'Overdue' ? 'badge-red' : 'badge-yellow'}`}>{issue.status}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
