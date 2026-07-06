// src/pages/books/BookDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Edit, Trash2, BookOpen, Star, User, Building2,
  Calendar, Hash, Globe, Package, MapPin, DollarSign, AlertCircle
} from 'lucide-react';
import { toast } from 'react-toastify';
import { mockBooks, mockIssuedBooks } from '../../data/mockData';
import { staggerContainer, staggerItem, fadeIn } from '../../animations/variants';
import QRCode from 'react-qr-code';

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 py-2.5 border-b border-slate-50 dark:border-white/10 last:border-0">
    <div className="w-8 h-8 bg-brand-50 dark:bg-brand-900/30 rounded-xl flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
    </div>
    <div className="flex-1">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{value || '—'}</p>
    </div>
  </div>
);

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = mockBooks.find((b) => b.id === parseInt(id));
  const issueHistory = mockIssuedBooks.filter((i) => i.bookId === parseInt(id));

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="w-12 h-12 text-slate-300" />
        <p className="text-slate-500">Book not found</p>
        <button onClick={() => navigate('/books')} className="btn-primary">Back to Books</button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex items-center justify-between flex-wrap gap-4">
        <button onClick={() => navigate('/books')} className="btn-ghost gap-2 text-slate-600">
          <ArrowLeft className="w-4 h-4" /> Back to Books
        </button>
        <div className="flex gap-2">
          <button onClick={() => navigate(`/books/edit/${book.id}`)} className="btn-secondary gap-2"><Edit className="w-4 h-4" /> Edit</button>
          <button onClick={() => { toast.success('Book deleted'); navigate('/books'); }} className="btn-danger gap-2"><Trash2 className="w-4 h-4" /> Delete</button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
          {/* Cover */}
          <div className="card-glass p-6 flex flex-col items-center gap-4">
            <div className="w-40 h-52 bg-gradient-to-br from-brand-100 to-brand-50 rounded-3xl flex items-center justify-center shadow-glass">
              <BookOpen className="w-16 h-16 text-brand-400" />
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= Math.floor(book.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                ))}
                <span className="text-sm font-semibold text-slate-700 ml-1">{book.rating}</span>
              </div>
              <p className="text-xs text-slate-400">{book.reviews} reviews</p>
            </div>
            <span className={`badge text-sm py-1.5 px-4 ${book.available > 0 ? 'badge-green' : 'badge-red'}`}>
              {book.available > 0 ? `${book.available} Available` : 'Not Available'}
            </span>
          </div>

          {/* QR Code */}
          <div className="card-glass p-5 flex flex-col items-center gap-3">
            <p className="text-sm font-semibold text-slate-700 dark:text-white">QR Code</p>
            <div className="p-3 bg-white rounded-2xl">
              <QRCode value={book.isbn} size={120} />
            </div>
            <p className="text-xs text-slate-400 font-mono">{book.barcode}</p>
            <button className="btn-secondary btn-sm w-full">Download QR</button>
          </div>

          {/* Availability */}
          <div className="card-glass p-5">
            <p className="text-sm font-semibold text-slate-700 dark:text-white mb-3">Availability</p>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary rounded-full"
                  style={{ width: `${(book.available / book.quantity) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-slate-600">{book.available}/{book.quantity}</span>
            </div>
            <p className="text-xs text-slate-400">{book.quantity - book.available} currently issued</p>
          </div>
        </motion.div>

        {/* Middle + Right */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="lg:col-span-2 space-y-5">
          {/* Book Info */}
          <div className="card-glass p-6">
            <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white mb-1">{book.title}</h1>
            <p className="text-slate-500 mb-4">{book.author}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">{book.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              <InfoRow icon={Hash} label="ISBN" value={book.isbn} />
              <InfoRow icon={BookOpen} label="Edition" value={book.edition} />
              <InfoRow icon={User} label="Author" value={book.author} />
              <InfoRow icon={Building2} label="Publisher" value={book.publisher} />
              <InfoRow icon={Calendar} label="Publication Year" value={book.publicationYear} />
              <InfoRow icon={Globe} label="Language" value={book.language} />
              <InfoRow icon={Package} label="Category" value={book.category} />
              <InfoRow icon={MapPin} label="Location" value={`Shelf ${book.shelf}, Rack ${book.rack}`} />
              <InfoRow icon={DollarSign} label="Price" value={`₹${book.price}`} />
              <InfoRow icon={AlertCircle} label="Condition" value={book.condition} />
            </div>
          </div>

          {/* Issue History */}
          <div className="card-glass p-6">
            <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4">Issue History</h3>
            {issueHistory.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">No issue history for this book</p>
            ) : (
              <div className="space-y-3">
                {issueHistory.map((issue) => (
                  <div key={issue.id} className="flex items-center gap-4 p-3 bg-white/60 dark:bg-white/5 rounded-2xl border border-white/50 dark:border-white/10">
                    <div className="w-8 h-8 bg-brand-50 rounded-xl flex items-center justify-center">
                      <User className="w-4 h-4 text-brand-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{issue.memberName}</p>
                      <p className="text-xs text-slate-400">Issued: {issue.issueDate} · Due: {issue.dueDate}</p>
                    </div>
                    <span className={`badge text-xs ${issue.status === 'Overdue' ? 'badge-red' : issue.status === 'Issued' ? 'badge-yellow' : 'badge-green'}`}>
                      {issue.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
