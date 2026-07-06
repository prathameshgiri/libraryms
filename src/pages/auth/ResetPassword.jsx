// src/pages/auth/ResetPassword.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { staggerContainer, staggerItem } from '../../animations/variants';

export default function ResetPassword() {
  const [showPass, setShowPass] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password');

  const strength = password
    ? password.length >= 12 ? 'Strong' : password.length >= 8 ? 'Medium' : 'Weak'
    : '';

  const strengthColor = { Strong: 'bg-green-500', Medium: 'bg-yellow-500', Weak: 'bg-red-400' }[strength] || 'bg-slate-200';

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
    toast.success('Password reset successfully!');
    setTimeout(() => navigate('/login'), 2000);
  };

  if (done) {
    return (
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="text-center">
        <motion.div variants={staggerItem} className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </motion.div>
        <motion.h2 variants={staggerItem} className="font-display font-bold text-2xl text-slate-800 dark:text-white mb-2">Password Reset!</motion.h2>
        <motion.p variants={staggerItem} className="text-slate-500 dark:text-slate-400 text-sm">Redirecting to login...</motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={staggerItem} className="mb-8">
        <h2 className="font-display font-bold text-3xl text-slate-800 dark:text-white mb-2">Reset Password 🔒</h2>
        <p className="text-slate-500 dark:text-slate-400">Create a strong new password for your account</p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <motion.div variants={staggerItem}>
          <label className="label-base dark:text-slate-300">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
              type={showPass ? 'text' : 'password'}
              className={`input-base pl-10 pr-10 ${errors.password ? 'input-error' : ''}`}
              placeholder="Enter new password"
            />
            <button type="button" onClick={() => setShowPass((p) => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-300 ${strengthColor} ${strength === 'Strong' ? 'w-full' : strength === 'Medium' ? 'w-2/3' : 'w-1/3'}`} />
              </div>
              <span className={`text-xs font-medium ${strength === 'Strong' ? 'text-green-600' : strength === 'Medium' ? 'text-yellow-600' : 'text-red-500'}`}>{strength}</span>
            </div>
          )}
          {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>}
        </motion.div>

        <motion.div variants={staggerItem}>
          <label className="label-base dark:text-slate-300">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              {...register('confirm', { required: 'Please confirm password', validate: (v) => v === password || "Passwords don't match" })}
              type="password"
              className={`input-base pl-10 ${errors.confirm ? 'input-error' : ''}`}
              placeholder="Re-enter new password"
            />
          </div>
          {errors.confirm && <p className="text-red-500 text-xs mt-1.5">{errors.confirm.message}</p>}
        </motion.div>

        <motion.div variants={staggerItem}>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base font-semibold">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Resetting...</> : 'Reset Password'}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}
