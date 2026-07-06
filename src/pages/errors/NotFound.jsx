// src/pages/errors/NotFound.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen } from 'lucide-react';
import { fadeIn, floatAnimation, staggerContainer, staggerItem } from '../../animations/variants';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-6">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="text-center max-w-md">
        {/* Illustration */}
        <motion.div animate={floatAnimation.animate} className="mb-8">
          <div className="relative inline-block">
            <div className="w-48 h-48 bg-gradient-primary rounded-full opacity-10 mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 10 }}
                  transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
                  className="text-8xl mb-2"
                >
                  📚
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.h1 variants={staggerItem} className="font-display font-bold text-8xl gradient-text mb-2">
          404
        </motion.h1>
        <motion.h2 variants={staggerItem} className="font-display font-semibold text-2xl text-slate-800 mb-3">
          Page Not Found
        </motion.h2>
        <motion.p variants={staggerItem} className="text-slate-500 mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have wandered off like a misplaced library book. Let's get you back on track.
        </motion.p>

        <motion.div variants={staggerItem} className="flex gap-3 justify-center">
          <Link to="/dashboard" className="btn-primary gap-2 px-8 py-3.5 text-base">
            <Home className="w-5 h-5" /> Back to Dashboard
          </Link>
          <Link to="/books" className="btn-secondary gap-2 px-6">
            <BookOpen className="w-5 h-5" /> Browse Books
          </Link>
        </motion.div>

        <motion.p variants={staggerItem} className="mt-8 text-sm text-slate-400">
          Error code: 404 · Page does not exist
        </motion.p>
      </motion.div>
    </div>
  );
}
