// src/layouts/AuthLayout.jsx
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Library, BookOpen, Users, Star } from 'lucide-react';
import { fadeIn, floatAnimation } from '../animations/variants';

const stats = [
  { icon: BookOpen, value: '10,000+', label: 'Books' },
  { icon: Users, value: '2,500+', label: 'Members' },
  { icon: Star, value: '4.9', label: 'Rating' },
];

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-gradient-hero dark:bg-[#0f1729]">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col w-[480px] bg-gradient-primary relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative flex flex-col h-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Library className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-white text-xl">Library MS</p>
              <p className="text-white/60 text-xs">Management System</p>
            </div>
          </div>

          {/* Hero Text */}
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex-1 flex flex-col justify-center">
            <h1 className="font-display font-bold text-white text-4xl leading-tight mb-4">
              Your Complete
              <br />
              <span className="text-white/80">Library Solution</span>
            </h1>
            <p className="text-white/70 text-base leading-relaxed mb-12">
              Manage your entire library ecosystem with our powerful, beautiful, and intuitive management system.
            </p>

            {/* Floating Card */}
            <motion.div
              animate={floatAnimation.animate}
              className="bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-6 mb-8"
            >
              <p className="text-white/80 text-sm mb-4 font-medium">📚 Quick Stats</p>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="w-5 h-5 text-white/60 mx-auto mb-1" />
                    <p className="font-bold text-white text-lg">{stat.value}</p>
                    <p className="text-white/60 text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2">
              {['Book Management', 'Member Tracking', 'Fine Collection', 'Analytics', 'Reports'].map((f) => (
                <span key={f} className="px-3 py-1.5 bg-white/15 border border-white/20 text-white/80 text-xs rounded-full backdrop-blur-sm">
                  {f}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Bottom Note */}
          <p className="text-white/40 text-xs mt-8">
            © 2024 Library MS. Enterprise Library Management.
          </p>
        </div>
      </div>

      {/* Right Panel — Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <Library className="w-5 h-5 text-white" />
            </div>
            <p className="font-display font-bold text-slate-800 dark:text-white">Library MS</p>
          </div>

          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
