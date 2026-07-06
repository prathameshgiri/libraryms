// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { pageTransition } from '../animations/variants';

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-hero dark:bg-none dark:bg-[#0f1729]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <motion.div
            key={location.pathname}
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
