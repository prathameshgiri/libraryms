// src/pages/books/BookForm.jsx  — Add & Edit Book
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Save, X, Upload, BookOpen, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import { mockBooks, mockCategories, mockAuthors, mockPublishers } from '../../data/mockData';
import { staggerContainer, staggerItem, fadeIn } from '../../animations/variants';

export default function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const existing = isEdit ? mockBooks.find((b) => b.id === parseInt(id)) : null;

  const [coverPreview, setCoverPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: existing || { language: 'English', condition: 'Good', status: 'Available', quantity: 1 },
  });

  const title = watch('title');

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) setCoverPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    toast.success(isEdit ? 'Book updated successfully!' : 'Book added successfully!');
    navigate('/books');
  };

  return (
    <div className="space-y-5">
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white">{isEdit ? 'Edit Book' : 'Add New Book'}</h1>
          <p className="text-sm text-slate-500 mt-0.5">{isEdit ? 'Update book details' : 'Add a new book to the catalog'}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => navigate('/books')} className="btn-secondary gap-1.5"><X className="w-4 h-4" /> Cancel</button>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left — Cover Upload */}
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-5 flex flex-col items-center gap-4">
            <div className="w-full aspect-[3/4] bg-gradient-to-br from-brand-50 to-soft-teal rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-brand-200 hover:border-brand-400 transition-colors relative overflow-hidden cursor-pointer">
              {coverPreview ? (
                <img src={coverPreview} alt="Cover" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
              ) : (
                <>
                  <BookOpen className="w-12 h-12 text-brand-300 mb-3" />
                  <p className="text-sm text-brand-500 font-medium">Upload Cover</p>
                  <p className="text-xs text-slate-400 mt-1">JPG, PNG, WebP</p>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleCoverChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
            <button type="button" className="btn-secondary btn-sm w-full gap-2"><Upload className="w-3.5 h-3.5" /> Choose Image</button>
            {coverPreview && <button type="button" onClick={() => setCoverPreview(null)} className="text-xs text-red-500 hover:underline">Remove</button>}

            {/* Preview Card */}
            {title && (
              <div className="w-full p-4 bg-gradient-soft rounded-2xl border border-brand-100">
                <p className="text-xs text-slate-400 mb-1 font-medium">Preview</p>
                <p className="font-semibold text-slate-800 text-sm line-clamp-2">{title}</p>
              </div>
            )}
          </motion.div>

          {/* Right — Book Details */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-2 card-glass p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Title */}
              <div className="sm:col-span-2">
                <label className="label-base">Book Title *</label>
                <input {...register('title', { required: 'Title is required' })} className={`input-base ${errors.title ? 'input-error' : ''}`} placeholder="Enter book title" />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>

              {/* ISBN */}
              <div>
                <label className="label-base">ISBN *</label>
                <input {...register('isbn', { required: 'ISBN is required' })} className={`input-base ${errors.isbn ? 'input-error' : ''}`} placeholder="978-x-xxx-xxxxx-x" />
                {errors.isbn && <p className="text-red-500 text-xs mt-1">{errors.isbn.message}</p>}
              </div>

              {/* Barcode */}
              <div>
                <label className="label-base">Barcode</label>
                <input {...register('barcode')} className="input-base" placeholder="LIB-2024-XXXXX" />
              </div>

              {/* Category */}
              <div>
                <label className="label-base">Category *</label>
                <select {...register('category', { required: true })} className="input-base">
                  <option value="">Select category</option>
                  {mockCategories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="label-base">Author *</label>
                <select {...register('author', { required: true })} className="input-base">
                  <option value="">Select author</option>
                  {mockAuthors.map((a) => <option key={a.id} value={a.name}>{a.name}</option>)}
                </select>
              </div>

              {/* Publisher */}
              <div>
                <label className="label-base">Publisher</label>
                <select {...register('publisher')} className="input-base">
                  <option value="">Select publisher</option>
                  {mockPublishers.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>

              {/* Edition */}
              <div>
                <label className="label-base">Edition</label>
                <input {...register('edition')} className="input-base" placeholder="1st, 2nd..." />
              </div>

              {/* Language */}
              <div>
                <label className="label-base">Language</label>
                <select {...register('language')} className="input-base">
                  {['English', 'Hindi', 'Marathi', 'French', 'German', 'Other'].map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>

              {/* Publication Year */}
              <div>
                <label className="label-base">Publication Year</label>
                <input {...register('publicationYear')} type="number" className="input-base" placeholder="2024" min={1800} max={2030} />
              </div>

              {/* Price */}
              <div>
                <label className="label-base">Price (₹)</label>
                <input {...register('price')} type="number" className="input-base" placeholder="0.00" />
              </div>

              {/* Quantity */}
              <div>
                <label className="label-base">Quantity *</label>
                <input {...register('quantity', { required: true, min: 1 })} type="number" className="input-base" min={1} />
              </div>

              {/* Shelf */}
              <div>
                <label className="label-base">Shelf</label>
                <input {...register('shelf')} className="input-base" placeholder="A, B, C..." />
              </div>

              {/* Rack */}
              <div>
                <label className="label-base">Rack Number</label>
                <input {...register('rack')} className="input-base" placeholder="R-01" />
              </div>

              {/* Condition */}
              <div>
                <label className="label-base">Condition</label>
                <select {...register('condition')} className="input-base">
                  {['Excellent', 'Good', 'Fair', 'Poor'].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="label-base">Status</label>
                <select {...register('status')} className="input-base">
                  {['Available', 'Issued', 'Reserved', 'Lost', 'Under Repair'].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="label-base">Description</label>
                <textarea {...register('description')} rows={4} className="input-base resize-none" placeholder="Brief description of the book..." />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6 pt-5 border-t border-slate-100 dark:border-white/10">
              <button type="submit" disabled={saving} className="btn-primary gap-2 px-8">
                {saving ? '💾 Saving...' : <><Save className="w-4 h-4" /> {isEdit ? 'Update Book' : 'Add Book'}</>}
              </button>
              <button type="button" onClick={() => navigate('/books')} className="btn-secondary gap-2">
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </motion.div>
        </div>
      </form>
    </div>
  );
}
