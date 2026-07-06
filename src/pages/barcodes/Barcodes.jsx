// src/pages/barcodes/Barcodes.jsx
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Barcode as BarcodeIcon, QrCode, Download, Printer, Plus, Hash } from 'lucide-react';
import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';
import { mockBooks } from '../../data/mockData';
import { staggerContainer, staggerItem, fadeIn } from '../../animations/variants';
import { toast } from 'react-toastify';

export default function Barcodes() {
  const [selected, setSelected] = useState(mockBooks[0]);
  const [type, setType] = useState('barcode');
  const [bulkCount, setBulkCount] = useState(5);
  const barcodeRef = useRef(null);

  const handlePrint = () => {
    window.print();
    toast.success('Sent to printer!');
  };

  return (
    <div className="space-y-5">
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white">Barcode Management</h1>
        <p className="text-sm text-slate-500 mt-0.5">Generate, print, and download barcodes & QR codes</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Book Selector */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-5">
          <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4">Select Book</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {mockBooks.map((book) => (
              <button
                key={book.id}
                onClick={() => setSelected(book)}
                className={`w-full text-left p-3 rounded-2xl transition-all ${selected?.id === book.id ? 'bg-gradient-primary text-white shadow-glow' : 'bg-white/60 dark:bg-white/5 hover:bg-brand-50 dark:hover:bg-white/10 border border-white/50 dark:border-white/10'}`}
              >
                <p className={`text-sm font-medium line-clamp-1 ${selected?.id === book.id ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>{book.title}</p>
                <p className={`text-xs mt-0.5 font-mono ${selected?.id === book.id ? 'text-white/70' : 'text-slate-400'}`}>{book.barcode}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Preview */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="lg:col-span-2 space-y-4">
          {/* Type Toggle */}
          <div className="card-glass p-4 flex gap-2">
            {[
              { key: 'barcode', label: 'Barcode', icon: BarcodeIcon },
              { key: 'qr', label: 'QR Code', icon: QrCode },
            ].map((t) => (
              <button key={t.key} onClick={() => setType(t.key)} className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all ${type === t.key ? 'bg-gradient-primary text-white shadow-glow' : 'bg-white/60 dark:bg-white/10 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/20'}`}>
                <t.icon className="w-4 h-4" />{t.label}
              </button>
            ))}
          </div>

          {/* Barcode Display */}
          {selected && (
            <div className="card-glass p-8">
              <div className="flex flex-col items-center gap-4 mb-6" ref={barcodeRef}>
                <div className="bg-white p-5 rounded-2xl shadow-soft w-full overflow-hidden flex justify-center">
                  {type === 'barcode' ? (
                    <div className="w-full overflow-hidden flex justify-center">
                      <Barcode
                        value={selected.barcode || selected.isbn}
                        width={1.4}
                        height={72}
                        displayValue={true}
                        fontSize={11}
                        margin={8}
                      />
                    </div>
                  ) : (
                    <QRCode value={selected.isbn} size={160} />
                  )}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-slate-800 dark:text-white">{selected.title}</p>
                  <p className="text-xs text-slate-500 font-mono mt-1">{type === 'barcode' ? selected.barcode : selected.isbn}</p>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button onClick={handlePrint} className="btn-primary gap-2"><Printer className="w-4 h-4" /> Print</button>
                <button onClick={() => toast.success('Downloading...')} className="btn-secondary gap-2"><Download className="w-4 h-4" /> Download</button>
              </div>
            </div>
          )}

          {/* Bulk Generation */}
          <div className="card-glass p-5">
            <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Hash className="w-5 h-5 text-brand-500" /> Bulk Generation
            </h3>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="label-base">Number of barcodes</label>
                <input type="number" value={bulkCount} onChange={(e) => setBulkCount(e.target.value)} min={1} max={100} className="input-base" />
              </div>
              <button onClick={() => toast.success(`Generating ${bulkCount} barcodes...`)} className="btn-primary gap-2 whitespace-nowrap">
                <Plus className="w-4 h-4" /> Generate All
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
