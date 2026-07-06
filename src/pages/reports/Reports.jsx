// src/pages/reports/Reports.jsx
import { motion } from 'framer-motion';
import { FileBarChart2, Download, FileText, TrendingUp, Users, BookOpen, DollarSign, Printer } from 'lucide-react';
import { toast } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { monthlyIssueData, fineCollectionData, mockDashboardStats } from '../../data/mockData';
import { staggerContainer, staggerItem, fadeIn } from '../../animations/variants';

const REPORTS = [
  { id: 1, title: 'Books Report', desc: 'Complete catalog inventory', icon: BookOpen, color: 'bg-gradient-primary' },
  { id: 2, title: 'Issue Report', desc: 'All issued books log', icon: TrendingUp, color: 'bg-gradient-success' },
  { id: 3, title: 'Return Report', desc: 'Book return history', icon: FileText, color: 'bg-gradient-warning' },
  { id: 4, title: 'Fine Report', desc: 'Fine collection summary', icon: DollarSign, color: 'bg-gradient-danger' },
  { id: 5, title: 'Member Report', desc: 'Member activity report', icon: Users, color: 'bg-gradient-purple-solid' },
  { id: 6, title: 'Monthly Report', desc: 'Monthly statistics', icon: FileBarChart2, color: 'bg-gradient-teal' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="glass rounded-2xl px-3 py-2 shadow-glass text-sm">
        <p className="font-semibold text-slate-700 mb-1">{label}</p>
        {payload.map((p, i) => <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>)}
      </div>
    );
  }
  return null;
};

export default function Reports() {
  const handleDownload = (report, format) => {
    toast.success(`Downloading ${report} as ${format}...`);
  };

  return (
    <div className="space-y-5">
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white">Reports</h1>
          <p className="text-sm text-slate-500 mt-0.5">Generate and export library reports</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="btn-secondary gap-2"><Printer className="w-4 h-4" /> Print All</button>
        </div>
      </motion.div>

      {/* Report Cards */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REPORTS.map((report) => (
          <motion.div key={report.id} variants={staggerItem} whileHover={{ y: -4 }} className="card-glass p-5">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 ${report.color} rounded-2xl flex items-center justify-center shrink-0`}>
                <report.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-slate-800 dark:text-white">{report.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{report.desc}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleDownload(report.title, 'PDF')} className="btn-secondary btn-sm flex-1 gap-1.5">
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
              <button onClick={() => handleDownload(report.title, 'Excel')} className="btn-secondary btn-sm flex-1 gap-1.5">
                <Download className="w-3.5 h-3.5" /> Excel
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-5">
          <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-5">Monthly Issues</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyIssueData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="issued" name="Issued" fill="#2979FF" radius={[6,6,0,0]} />
              <Bar dataKey="returned" name="Returned" fill="#43A047" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-5">
          <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-5">Fine Collection</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={fineCollectionData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="collected" name="Collected" fill="#43A047" radius={[6,6,0,0]} />
              <Bar dataKey="pending" name="Pending" fill="#FB8C00" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
