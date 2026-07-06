// src/pages/issue/IssueBook.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, User, BookOpen, Calendar, CheckCircle, ArrowRightLeft, Loader2, Receipt
} from 'lucide-react';
import { toast } from 'react-toastify';
import { format, addDays } from 'date-fns';
import { mockMembers, mockBooks } from '../../data/mockData';
import { fadeIn, staggerContainer, staggerItem, scaleIn } from '../../animations/variants';

export default function IssueBook() {
  const [memberSearch, setMemberSearch] = useState('');
  const [bookSearch, setBookSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [duration, setDuration] = useState(14);
  const [issuing, setIssuing] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const memberResults = memberSearch.length > 1
    ? mockMembers.filter((m) => m.name.toLowerCase().includes(memberSearch.toLowerCase()) || m.memberId.includes(memberSearch)).slice(0, 4)
    : [];

  const bookResults = bookSearch.length > 1
    ? mockBooks.filter((b) => (b.title.toLowerCase().includes(bookSearch.toLowerCase()) || b.isbn.includes(bookSearch)) && b.available > 0).slice(0, 4)
    : [];

  const today = new Date();
  const returnDate = addDays(today, duration);

  const handleIssue = async () => {
    if (!selectedMember || !selectedBook) return toast.error('Please select both member and book');
    setIssuing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIssuing(false);
    setReceipt({
      issueId: `ISS-2024-${Math.floor(Math.random() * 9000 + 1000)}`,
      member: selectedMember,
      book: selectedBook,
      issueDate: format(today, 'yyyy-MM-dd'),
      returnDate: format(returnDate, 'yyyy-MM-dd'),
    });
    toast.success('Book issued successfully!');
  };

  const handleReset = () => {
    setSelectedMember(null);
    setSelectedBook(null);
    setMemberSearch('');
    setBookSearch('');
    setReceipt(null);
  };

  if (receipt) {
    return (
      <motion.div variants={scaleIn} initial="hidden" animate="visible" className="max-w-md mx-auto">
        <div className="card-glass p-8 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="font-display font-bold text-2xl text-slate-800 dark:text-white mb-1">Book Issued!</h2>
          <p className="text-slate-500 text-sm mb-6">Issue receipt generated</p>

          <div className="bg-gradient-soft rounded-2xl p-5 text-left space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Issue ID</span>
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">{receipt.issueId}</span>
            </div>
            <div className="h-px bg-slate-100 dark:bg-white/10" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Member</span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{receipt.member.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Book</span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 text-right max-w-[60%]">{receipt.book.title}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Issue Date</span>
              <span className="text-sm font-medium text-slate-700">{receipt.issueDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Due Date</span>
              <span className="text-sm font-bold text-brand-600">{receipt.returnDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Fine Rule</span>
              <span className="text-xs text-slate-600">₹5/day after due date</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="btn-secondary flex-1 gap-2"><Receipt className="w-4 h-4" /> Print</button>
            <button onClick={handleReset} className="btn-primary flex-1 gap-2"><ArrowRightLeft className="w-4 h-4" /> Issue Another</button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white">Issue Book</h1>
        <p className="text-sm text-slate-500 mt-0.5">Issue a book to a library member</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Member Search */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-5">
          <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-brand-500" /> Select Member
          </h3>
          {selectedMember ? (
            <motion.div variants={scaleIn} initial="hidden" animate="visible" className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
              <div className="w-10 h-10 bg-gradient-success rounded-xl flex items-center justify-center text-white font-bold">
                {selectedMember.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-800 dark:text-white text-sm">{selectedMember.name}</p>
                <p className="text-xs text-slate-500">{selectedMember.memberId} · {selectedMember.membershipType}</p>
              </div>
              <button onClick={() => setSelectedMember(null)} className="text-xs text-slate-400 hover:text-red-500">✕</button>
            </motion.div>
          ) : (
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="input-base pl-10"
                placeholder="Search by name or member ID..."
              />
              <AnimatePresence>
                {memberResults.length > 0 && (
                  <motion.div variants={scaleIn} initial="hidden" animate="visible" exit="exit" className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl shadow-glass-lg z-10 overflow-hidden">
                    {memberResults.map((m) => (
                      <button key={m.id} onClick={() => { setSelectedMember(m); setMemberSearch(''); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-50 dark:hover:bg-white/10 transition-colors text-left">
                        <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-xs font-bold">{m.name.charAt(0)}</div>
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{m.name}</p>
                          <p className="text-xs text-slate-400">{m.memberId}</p>
                        </div>
                        <span className={`ml-auto badge text-xs ${m.status === 'Active' ? 'badge-green' : 'badge-red'}`}>{m.status}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {selectedMember && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="p-3 bg-white/60 dark:bg-white/5 rounded-xl text-center">
                <p className="text-lg font-bold text-slate-700 dark:text-white">{selectedMember.borrowedBooks}</p>
                <p className="text-xs text-slate-400">Books Issued</p>
              </div>
              <div className={`p-3 rounded-xl text-center ${selectedMember.pendingFine > 0 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
                <p className={`text-lg font-bold ${selectedMember.pendingFine > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {selectedMember.pendingFine > 0 ? `₹${selectedMember.pendingFine}` : 'Clear'}
                </p>
                <p className="text-xs text-slate-400">Fine Status</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Book Search */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-5">
          <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-500" /> Select Book
          </h3>
          {selectedBook ? (
            <motion.div variants={scaleIn} initial="hidden" animate="visible" className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-800 dark:text-white text-sm line-clamp-1">{selectedBook.title}</p>
                <p className="text-xs text-slate-500">{selectedBook.isbn}</p>
              </div>
              <span className="badge badge-green text-xs">{selectedBook.available} avail</span>
              <button onClick={() => setSelectedBook(null)} className="text-xs text-slate-400 hover:text-red-500">✕</button>
            </motion.div>
          ) : (
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={bookSearch}
                onChange={(e) => setBookSearch(e.target.value)}
                className="input-base pl-10"
                placeholder="Search by title or ISBN..."
              />
              <AnimatePresence>
                {bookResults.length > 0 && (
                  <motion.div variants={scaleIn} initial="hidden" animate="visible" exit="exit" className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl shadow-glass-lg z-10 overflow-hidden">
                    {bookResults.map((b) => (
                      <button key={b.id} onClick={() => { setSelectedBook(b); setBookSearch(''); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-50 dark:hover:bg-white/10 transition-colors text-left">
                        <div className="w-8 h-8 bg-gradient-soft rounded-xl flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-brand-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200 line-clamp-1">{b.title}</p>
                          <p className="text-xs text-slate-400">{b.isbn}</p>
                        </div>
                        <span className="badge badge-green text-xs">{b.available} avail</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>

      {/* Borrow Duration */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-5">
        <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-brand-500" /> Borrow Duration
        </h3>
        <div className="flex flex-wrap gap-3 mb-4">
          {[7, 14, 21, 30].map((d) => (
            <button key={d} onClick={() => setDuration(d)} className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all ${duration === d ? 'bg-gradient-primary text-white shadow-glow' : 'bg-white/60 dark:bg-white/10 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/20 hover:border-brand-300'}`}>
              {d} days
            </button>
          ))}
          <input type="number" value={duration} onChange={(e) => setDuration(parseInt(e.target.value) || 14)} min={1} max={90} className="input-base w-24" placeholder="Custom" />
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div>
            <span className="text-slate-400 text-xs">Issue Date</span>
            <p className="font-semibold text-slate-700 dark:text-slate-200">{format(today, 'dd MMM yyyy')}</p>
          </div>
          <div className="text-slate-300">→</div>
          <div>
            <span className="text-slate-400 text-xs">Return Date</span>
            <p className="font-semibold text-brand-600">{format(returnDate, 'dd MMM yyyy')}</p>
          </div>
          <div className="ml-auto p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl">
            <p className="text-xs text-slate-400">Fine Rate</p>
            <p className="font-bold text-yellow-700">₹5 / day</p>
          </div>
        </div>
      </motion.div>

      {/* Issue Button */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex gap-3">
        <button
          onClick={handleIssue}
          disabled={!selectedMember || !selectedBook || issuing}
          className="btn-primary gap-2 px-8 py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {issuing ? <><Loader2 className="w-5 h-5 animate-spin" /> Issuing...</> : <><CheckCircle className="w-5 h-5" /> Confirm Issue</>}
        </button>
        <button onClick={handleReset} className="btn-secondary gap-2">Reset</button>
      </motion.div>
    </div>
  );
}
