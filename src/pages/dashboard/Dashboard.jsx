// src/pages/dashboard/Dashboard.jsx
import { motion } from 'framer-motion';
import {
  BookOpen, Users, BookMarked, RotateCcw, DollarSign,
  UserCheck, ArrowRightLeft, ArrowUp, Clock, Star, Zap, TrendingUp, AlertCircle, Calendar
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { format, addDays, differenceInDays } from 'date-fns';
import { staggerContainer, staggerItem, fadeIn } from '../../animations/variants';
import {
  mockDashboardStats, monthlyIssueData, categoryChartData,
  fineCollectionData, recentActivities, mockIssuedBooks, mockBooks
} from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

// ── Animated Stat Card ──────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, change, gradient, delay = 0 }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(41,121,255,0.14)' }}
      className="card-glass p-5"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${gradient} rounded-2xl flex items-center justify-center shadow-sm`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {change !== undefined && (
          <span className={`badge ${change >= 0 ? 'badge-green' : 'badge-red'} text-xs`}>
            <ArrowUp className={`w-3 h-3 ${change < 0 ? 'rotate-180' : ''}`} />
            {Math.abs(change)}%
          </span>
        )}
      </div>
      <motion.p
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        className="text-3xl font-display font-bold text-slate-800 dark:text-white"
      >
        {typeof value === 'number' && value > 1000 ? value.toLocaleString() : value}
      </motion.p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">{label}</p>
    </motion.div>
  );
}

// ── Activity Icon ────────────────────────────────────────────────────────────
const activityConfig = {
  issue: { bg: 'bg-blue-50', text: 'text-blue-600', emoji: '📤' },
  return: { bg: 'bg-green-50', text: 'text-green-600', emoji: '📥' },
  fine: { bg: 'bg-yellow-50', text: 'text-yellow-600', emoji: '💰' },
  member: { bg: 'bg-purple-50', text: 'text-purple-600', emoji: '👤' },
  reserve: { bg: 'bg-teal-50', text: 'text-teal-600', emoji: '🔖' },
  add: { bg: 'bg-brand-50', text: 'text-brand-600', emoji: '➕' },
};

// ── Custom Tooltip ────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="glass rounded-2xl px-4 py-3 shadow-glass text-sm">
        <p className="font-semibold text-slate-700 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-medium">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ── User Dashboard Component ───────────────────────────────────────────────────
function UserDashboard({ user }) {
  const userHistory = mockIssuedBooks.filter((b) => b.memberName === user.name);

  const currentlyIssued = userHistory.filter((b) => b.status === 'Issued');
  const returnedBooks = userHistory.filter((b) => b.status === 'Returned');
  const dueBooks = currentlyIssued.filter((b) => new Date(b.dueDate) < new Date());
  
  const totalFine = userHistory.reduce((sum, b) => sum + (b.fine || 0), 0);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-6 bg-gradient-purple-solid text-white relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="relative">
          <p className="text-white/70 text-sm font-medium mb-1">Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'} 👋</p>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">Welcome, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-white/70 text-sm">Here is your reading history and current borrowed books.</p>
        </div>
      </motion.div>

      {/* User Stats */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="Currently Borrowed" value={currentlyIssued.length} gradient="bg-gradient-primary" />
        <StatCard icon={RotateCcw} label="Books Returned" value={returnedBooks.length} gradient="bg-gradient-success" />
        <StatCard icon={Clock} label="Overdue Books" value={dueBooks.length} gradient="bg-gradient-warning" />
        <StatCard icon={DollarSign} label="Total Fine Paid" value={`₹${totalFine}`} gradient="bg-gradient-info" />
      </motion.div>

      {/* Currently Issued & Overdue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-5">
          <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-500" /> Currently Borrowed
          </h3>
          {currentlyIssued.length === 0 ? (
            <p className="text-slate-500 text-sm p-4 text-center border border-dashed rounded-xl">No books currently borrowed.</p>
          ) : (
            <div className="space-y-3">
              {currentlyIssued.map((book) => {
                const isOverdue = new Date(book.dueDate) < new Date();
                return (
                  <div key={book.id} className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${isOverdue ? 'bg-red-50/50 border-red-100 dark:border-red-900/30' : 'bg-white/60 dark:bg-white/5 border-slate-100 dark:border-white/10 hover:border-brand-200'}`}>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 truncate">{book.bookTitle}</h4>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Issued: {format(new Date(book.issueDate), 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-3 sm:flex-col sm:items-end">
                      <span className={`badge ${isOverdue ? 'badge-red' : 'badge-blue'}`}>
                        Due: {format(new Date(book.dueDate), 'MMM dd, yyyy')}
                      </span>
                      {isOverdue && <span className="text-xs font-semibold text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Overdue</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* History / Returned */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-5">
          <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-green-500" /> Reading History
          </h3>
          {returnedBooks.length === 0 ? (
            <p className="text-slate-500 text-sm p-4 text-center border border-dashed rounded-xl">No reading history found.</p>
          ) : (
            <div className="space-y-3">
              {returnedBooks.map((book) => (
                <div key={book.id} className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 truncate">{book.bookTitle}</h4>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Returned: {format(new Date(book.returnDate), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                  {book.fine > 0 && (
                    <span className="badge badge-yellow shrink-0">Fine: ₹{book.fine}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ── Admin Dashboard Component ────────────────────────────────────────────────
export default function Dashboard() {
  const { user, isUser } = useAuth();

  if (isUser) {
    return <UserDashboard user={user} />;
  }

  const stats = [
    { icon: BookOpen, label: 'Total Books', value: mockDashboardStats.totalBooks, change: 8, gradient: 'bg-gradient-primary' },
    { icon: BookMarked, label: 'Available Books', value: mockDashboardStats.availableBooks, change: 3, gradient: 'bg-gradient-success' },
    { icon: ArrowRightLeft, label: 'Issued Books', value: mockDashboardStats.issuedBooks, change: -2, gradient: 'bg-gradient-warning' },
    { icon: RotateCcw, label: 'Returned Today', value: mockDashboardStats.returnedToday, change: 12, gradient: 'bg-gradient-info' },
    { icon: Users, label: 'Total Members', value: mockDashboardStats.totalMembers, change: 5, gradient: 'bg-gradient-purple-solid' },
    { icon: UserCheck, label: 'Active Members', value: mockDashboardStats.activeMembers, change: 4, gradient: 'bg-gradient-teal' },
    { icon: ArrowRightLeft, label: "Today's Issues", value: mockDashboardStats.todayIssues, change: 16, gradient: 'bg-gradient-primary' },
    { icon: DollarSign, label: 'Collected Fine', value: `₹${mockDashboardStats.collectedFine.toLocaleString()}`, change: 22, gradient: 'bg-gradient-success' },
  ];

  const upcomingDue = mockIssuedBooks
    .filter((b) => b.status === 'Issued')
    .slice(0, 4)
    .map((b) => ({ ...b, daysLeft: Math.ceil((new Date(b.dueDate) - new Date()) / 86400000) }));

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="card-glass p-6 bg-gradient-primary text-white relative overflow-hidden"
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="relative">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-white/70 text-sm font-medium mb-1">Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'} 👋</p>
              <h1 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
                Welcome, {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-white/70 text-sm">Here's what's happening in your library today.</p>
            </div>
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 cursor-pointer hover:bg-white/30 transition-colors">
                <ArrowRightLeft className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs font-medium">Issue Book</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 cursor-pointer hover:bg-white/30 transition-colors">
                <RotateCcw className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs font-medium">Return Book</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 cursor-pointer hover:bg-white/30 transition-colors hidden md:flex flex-col items-center">
                <Users className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs font-medium">Members</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} delay={i * 0.05} />
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly Issue Chart */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="lg:col-span-2 card-glass p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display font-semibold text-slate-800 dark:text-white">Monthly Issues & Returns</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Books circulated this year</p>
            </div>
            <span className="badge badge-blue"><TrendingUp className="w-3 h-3" /> +14%</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyIssueData} barGap={4} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#64748b' }} />
              <Bar dataKey="issued" name="Issued" fill="#2979FF" radius={[6, 6, 0, 0]} />
              <Bar dataKey="returned" name="Returned" fill="#43A047" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Distribution Pie */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-5">
          <div className="mb-5">
            <h3 className="font-display font-semibold text-slate-800 dark:text-white">Book Categories</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Distribution by genre</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={categoryChartData} cx="50%" cy="50%" outerRadius={75} innerRadius={45} paddingAngle={3} dataKey="value">
                {categoryChartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-3">
            {categoryChartData.slice(0, 6).map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                <span className="text-xs text-slate-500 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fine Chart + Activities + Upcoming Due */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Fine Collection Line Chart */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-5">
          <div className="mb-5">
            <h3 className="font-display font-semibold text-slate-800 dark:text-white">Fine Collection</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Monthly overview (₹)</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={fineCollectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="collected" name="Collected" stroke="#43A047" strokeWidth={2.5} dot={{ r: 4, fill: '#43A047' }} />
              <Line type="monotone" dataKey="pending" name="Pending" stroke="#FB8C00" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 4, fill: '#FB8C00' }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3 justify-center">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-green-500 rounded-full" /><span className="text-xs text-slate-500">Collected</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-orange-500 rounded-full" /><span className="text-xs text-slate-500">Pending</span></div>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-slate-800 dark:text-white">Recent Activities</h3>
            <button className="text-xs text-brand-600 font-medium hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((act) => {
              const cfg = activityConfig[act.icon] || activityConfig.add;
              return (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: act.id * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <div className={`w-8 h-8 ${cfg.bg} dark:bg-white/10 rounded-xl flex items-center justify-center shrink-0 text-base`}>
                    {cfg.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{act.detail}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{act.time}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Upcoming Due Books */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="card-glass p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-slate-800 dark:text-white">Upcoming Due</h3>
            <span className="badge badge-yellow"><Clock className="w-3 h-3" /> Soon</span>
          </div>
          <div className="space-y-3">
            {upcomingDue.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/50 dark:border-white/10 hover:bg-brand-50/50 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="w-9 h-9 bg-gradient-soft rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-brand-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{book.bookTitle}</p>
                  <p className="text-xs text-slate-400 truncate">{book.memberName}</p>
                </div>
                <span className={`badge text-xs shrink-0 ${book.daysLeft <= 2 ? 'badge-red' : book.daysLeft <= 5 ? 'badge-yellow' : 'badge-blue'}`}>
                  {book.daysLeft}d
                </span>
              </motion.div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10 grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-2xl">
              <p className="text-xl font-bold text-red-600">₹{mockDashboardStats.pendingFine.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-0.5">Pending Fine</p>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl">
              <p className="text-xl font-bold text-green-600">{mockDashboardStats.reservedBooks}</p>
              <p className="text-xs text-slate-500 mt-0.5">Reservations</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
