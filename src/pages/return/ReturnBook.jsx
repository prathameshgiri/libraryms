// src/pages/return/ReturnBook.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, RotateCcw, CheckCircle, DollarSign, Loader2, Receipt } from 'lucide-react';
import { toast } from 'react-toastify';
import { format, differenceInDays } from 'date-fns';
import { mockMembers, mockIssuedBooks } from '../../data/mockData';
import { fadeIn, scaleIn } from '../../animations/variants';

export default function ReturnBook() {
  const [memberSearch, setMemberSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [returning, setReturning] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [damageCharge, setDamageCharge] = useState(0);

  const memberResults = memberSearch.length > 1
    ? mockMembers.filter((m) => m.name.toLowerCase().includes(memberSearch.toLowerCase()) || m.memberId.includes(memberSearch)).slice(0, 4)
    : [];

  const issuedBooks = selectedMember
    ? mockIssuedBooks.filter((i) => i.memberId === selectedMember.id && !i.returnDate)
    : [];

  const today = new Date();

  const getFineDays = (issue) => {
    const due = new Date(issue.dueDate);
    return Math.max(0, differenceInDays(today, due));
  };

  const getAutoFine = (issue) => getFineDays(issue) * 5;

  const handleReturn = async () => {
    if (!selectedIssue) return toast.error('Select a book to return');
    setReturning(true);
    await new Promise((r) => setTimeout(r, 1200));
    setReturning(false);
    const fine = getAutoFine(selectedIssue) + parseInt(damageCharge || 0);
    setReceipt({
      id: `RET-2024-${Math.floor(Math.random() * 9000 + 1000)}`,
      member: selectedMember,
      issue: selectedIssue,
      returnDate: format(today, 'yyyy-MM-dd'),
      lateDays: getFineDays(selectedIssue),
      lateFine: getAutoFine(selectedIssue),
      damageFine: parseInt(damageCharge || 0),
      totalFine: fine,
    });
    toast.success('Book returned successfully!');
  };

  const handleReset = () => {
    setSelectedMember(null);
    setSelectedIssue(null);
    setMemberSearch('');
    setReceipt(null);
    setDamageCharge(0);
  };

  if (receipt) {
    return (
      <motion.div variants={scaleIn} initial="hidden" animate="visible" className="max-w-md mx-auto">
        <div className="card-glass p-8 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="font-display font-bold text-2xl text-slate-800 dark:text-white mb-1">Book Returned!</h2>
          <p className="text-slate-500 text-sm mb-6">Return receipt generated</p>
          <div className="bg-gradient-soft rounded-2xl p-5 text-left space-y-3 mb-6">
            <div className="flex justify-between"><span className="text-xs text-slate-400">Return ID</span><span className="text-xs font-mono font-bold">{receipt.id}</span></div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between"><span className="text-xs text-slate-400">Member</span><span className="text-sm font-semibold">{receipt.member.name}</span></div>
            <div className="flex justify-between"><span className="text-xs text-slate-400">Book</span><span className="text-sm font-semibold text-right max-w-[60%]">{receipt.issue.bookTitle}</span></div>
            <div className="flex justify-between"><span className="text-xs text-slate-400">Return Date</span><span className="text-sm font-medium">{receipt.returnDate}</span></div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between"><span className="text-xs text-slate-400">Late Days</span><span className="text-sm font-medium text-orange-600">{receipt.lateDays} days</span></div>
            <div className="flex justify-between"><span className="text-xs text-slate-400">Late Fine</span><span className="text-sm font-medium">₹{receipt.lateFine}</span></div>
            <div className="flex justify-between"><span className="text-xs text-slate-400">Damage Charge</span><span className="text-sm font-medium">₹{receipt.damageFine}</span></div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between"><span className="text-sm font-bold text-slate-700">Total Fine</span><span className={`text-lg font-bold ${receipt.totalFine > 0 ? 'text-red-600' : 'text-green-600'}`}>{receipt.totalFine > 0 ? `₹${receipt.totalFine}` : 'None'}</span></div>
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary flex-1 gap-2"><Receipt className="w-4 h-4" /> Print</button>
            <button onClick={handleReset} className="btn-primary flex-1 gap-2"><RotateCcw className="w-4 h-4" /> Return Another</button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white">Return Book</h1>
        <p className="text-sm text-slate-500 mt-0.5">Process book returns and fine calculations</p>
      </motion.div>

      {/* Member Search */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-5">
        <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-brand-500" /> Find Member
        </h3>
        {selectedMember ? (
          <motion.div variants={scaleIn} initial="hidden" animate="visible" className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200">
            <div className="w-10 h-10 bg-gradient-success rounded-xl flex items-center justify-center text-white font-bold">{selectedMember.name.charAt(0)}</div>
            <div className="flex-1">
              <p className="font-semibold text-slate-800 dark:text-white text-sm">{selectedMember.name}</p>
              <p className="text-xs text-slate-500">{selectedMember.memberId}</p>
            </div>
            <button onClick={() => { setSelectedMember(null); setSelectedIssue(null); }} className="text-xs text-slate-400 hover:text-red-500">✕</button>
          </motion.div>
        ) : (
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={memberSearch} onChange={(e) => setMemberSearch(e.target.value)} className="input-base pl-10" placeholder="Search member by name or ID..." />
            <AnimatePresence>
              {memberResults.length > 0 && (
                <motion.div variants={scaleIn} initial="hidden" animate="visible" exit="exit" className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl shadow-glass-lg z-10 overflow-hidden">
                  {memberResults.map((m) => (
                    <button key={m.id} onClick={() => { setSelectedMember(m); setMemberSearch(''); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-50 dark:hover:bg-white/10 transition-colors text-left">
                      <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-xs font-bold">{m.name.charAt(0)}</div>
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{m.name}</p>
                        <p className="text-xs text-slate-400">{m.memberId} · {m.borrowedBooks} books</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Issued Books List */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="card-glass p-5">
            <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4">Issued Books ({issuedBooks.length})</h3>
            {issuedBooks.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">No active issued books for this member</p>
            ) : (
              <div className="space-y-3">
                {issuedBooks.map((issue) => {
                  const lateDays = getFineDays(issue);
                  const fine = getAutoFine(issue);
                  const isSelected = selectedIssue?.id === issue.id;
                  return (
                    <motion.div
                      key={issue.id}
                      onClick={() => setSelectedIssue(isSelected ? null : issue)}
                      whileHover={{ scale: 1.01 }}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${isSelected ? 'border-brand-400 bg-brand-50 dark:bg-brand-900/30' : 'border-white/50 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-brand-200'}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {isSelected && <CheckCircle className="w-5 h-5 text-brand-600 shrink-0" />}
                          <div>
                            <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{issue.bookTitle}</p>
                            <p className="text-xs text-slate-400">Due: {issue.dueDate} · Issued: {issue.issueDate}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className={`badge text-xs ${issue.status === 'Overdue' ? 'badge-red' : 'badge-yellow'}`}>{issue.status}</span>
                          {lateDays > 0 && <p className="text-xs font-bold text-red-600 mt-1">₹{fine} fine</p>}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fine Calculation */}
      <AnimatePresence>
        {selectedIssue && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="card-glass p-5">
            <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-brand-500" /> Fine Calculation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl text-center">
                <p className="text-2xl font-bold text-orange-600">{getFineDays(selectedIssue)}</p>
                <p className="text-xs text-slate-500">Late Days</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl text-center">
                <p className="text-2xl font-bold text-red-600">₹{getAutoFine(selectedIssue)}</p>
                <p className="text-xs text-slate-500">Late Fine</p>
              </div>
              <div className="p-4 bg-white/60 dark:bg-white/5 rounded-2xl">
                <label className="text-xs text-slate-400 block mb-1">Damage Charge (₹)</label>
                <input type="number" value={damageCharge} onChange={(e) => setDamageCharge(e.target.value)} min={0} className="input-base py-2 text-center font-bold" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-soft rounded-2xl">
              <span className="font-semibold text-slate-700 dark:text-slate-200">Total Fine</span>
              <span className={`text-2xl font-display font-bold ${(getAutoFine(selectedIssue) + parseInt(damageCharge || 0)) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                ₹{getAutoFine(selectedIssue) + parseInt(damageCharge || 0)}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      {selectedMember && (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex gap-3">
          <button onClick={handleReturn} disabled={!selectedIssue || returning} className="btn-primary gap-2 px-8 py-3.5 text-base disabled:opacity-50">
            {returning ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : <><CheckCircle className="w-5 h-5" /> Confirm Return</>}
          </button>
          <button onClick={handleReset} className="btn-secondary">Reset</button>
        </motion.div>
      )}
    </div>
  );
}
