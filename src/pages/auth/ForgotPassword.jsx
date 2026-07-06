// src/pages/auth/ForgotPassword.jsx
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { staggerContainer, staggerItem } from '../../animations/variants';

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    toast.success('Reset link sent to your email!');
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={staggerItem} className="mb-8">
        <h2 className="font-display font-bold text-3xl text-slate-800 dark:text-white mb-2">
          {sent ? 'Check your email 📬' : 'Forgot Password? 🔐'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          {sent
            ? "We've sent a reset link to your email address."
            : "No worries! Enter your email and we'll send you a reset link."}
        </p>
      </motion.div>

      {!sent ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <motion.div variants={staggerItem}>
            <label className="label-base dark:text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })}
                type="email"
                className={`input-base pl-10 ${errors.email ? 'input-error' : ''}`}
                placeholder="your@email.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
          </motion.div>
          <motion.div variants={staggerItem}>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base font-semibold">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Reset Link</>}
            </button>
          </motion.div>
        </form>
      ) : (
        <motion.div variants={staggerItem} className="text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✉️</span>
          </div>
          <p className="text-slate-500 text-sm mb-6">
            Didn't receive it? Check your spam folder or{' '}
            <button onClick={() => setSent(false)} className="text-brand-600 font-medium hover:underline">try again</button>.
          </p>
          <Link to="/otp-verify" className="btn-primary px-8 py-3 inline-flex">
            Verify OTP
          </Link>
        </motion.div>
      )}

      <motion.div variants={staggerItem} className="mt-6 text-center">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Sign In
        </Link>
      </motion.div>
    </motion.div>
  );
}
