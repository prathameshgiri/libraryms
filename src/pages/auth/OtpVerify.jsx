// src/pages/auth/OtpVerify.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { staggerContainer, staggerItem } from '../../animations/variants';

export default function OtpVerify() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer((p) => p - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const handleChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    setOtp([...text.split(''), ...Array(6 - text.length).fill('')]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) return toast.error('Please enter the complete OTP');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success('OTP verified! Reset your password.');
    navigate('/reset-password');
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={staggerItem} className="mb-8">
        <h2 className="font-display font-bold text-3xl text-slate-800 dark:text-white mb-2">Verify OTP 🔑</h2>
        <p className="text-slate-500 dark:text-slate-400">Enter the 6-digit code sent to your email</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={staggerItem} className="flex gap-3 justify-center" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <motion.input
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.06 }}
              className={`w-12 h-14 text-center text-xl font-bold rounded-2xl border-2 transition-all duration-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 bg-white dark:bg-white/10 dark:text-white ${
                digit ? 'border-brand-400 bg-brand-50 dark:bg-brand-900/30' : 'border-slate-200 dark:border-white/20'
              }`}
            />
          ))}
        </motion.div>

        <motion.div variants={staggerItem}>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base font-semibold">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</> : 'Verify OTP'}
          </button>
        </motion.div>
      </form>

      <motion.div variants={staggerItem} className="mt-6 text-center">
        {resendTimer > 0 ? (
          <p className="text-sm text-slate-500">Resend OTP in <strong className="text-brand-600">0:{String(resendTimer).padStart(2, '0')}</strong></p>
        ) : (
          <button onClick={() => setResendTimer(30)} className="text-sm text-brand-600 font-medium hover:underline">
            Resend OTP
          </button>
        )}
      </motion.div>

      <motion.div variants={staggerItem} className="mt-4 text-center">
        <Link to="/forgot-password" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
      </motion.div>
    </motion.div>
  );
}
