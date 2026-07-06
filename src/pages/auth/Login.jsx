// src/pages/auth/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { DEMO_USERS, ROLES } from '../../data/roles';
import { staggerContainer, staggerItem } from '../../animations/variants';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(3, 'Password required'),
  remember: z.boolean().optional(),
});

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', remember: false },
  });

  const currentEmail = watch('email');

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password, data.remember);
    if (result.success) {
      const role = result.user.role;
      toast.success(
        `Welcome, ${result.user.name}! ${ROLES[role]?.badge}`,
        { autoClose: 2500 }
      );
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Login failed. Check credentials.');
    }
  };

  const fillCredentials = (user) => {
    setValue('email', user.email);
    setValue('password', user.password);
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={staggerItem} className="mb-7">
        <h2 className="font-display font-bold text-3xl text-slate-800 dark:text-white mb-2">
          Welcome back 👋
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Sign in to your Library MS account
        </p>
      </motion.div>

      {/* Demo Role Cards */}
      <motion.div variants={staggerItem} className="mb-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Quick Demo Login
        </p>
        <div className="grid grid-cols-3 gap-2">
          {DEMO_USERS.map((u) => {
            const role = ROLES[u.role];
            const isActive = currentEmail === u.email;
            return (
              <motion.button
                key={u.id}
                type="button"
                onClick={() => fillCredentials(u)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all text-center ${
                  isActive
                    ? 'border-brand-400 bg-brand-50 dark:bg-brand-900/30'
                    : 'border-slate-100 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-brand-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-role"
                    className="absolute inset-0 rounded-2xl bg-brand-50 dark:bg-brand-900/20 -z-10"
                  />
                )}
                <div className={`w-10 h-10 ${role.color} rounded-xl flex items-center justify-center text-white text-base font-bold mb-2 shadow-sm`}>
                  {role.badge}
                </div>
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 leading-tight">
                  {u.role === 'admin' ? 'Admin' : u.role === 'operator' ? 'Operator' : 'User'}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{u.password}</p>
                {isActive && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[8px]">✓</span>
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <motion.div variants={staggerItem}>
          <label className="label-base dark:text-slate-300">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              {...register('email')}
              type="email"
              className={`input-base pl-10 ${errors.email ? 'input-error' : ''}`}
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>
          )}
        </motion.div>

        {/* Password */}
        <motion.div variants={staggerItem}>
          <label className="label-base dark:text-slate-300">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              {...register('password')}
              type={showPass ? 'text' : 'password'}
              className={`input-base pl-10 pr-10 ${errors.password ? 'input-error' : ''}`}
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPass((p) => !p)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>
          )}
        </motion.div>

        {/* Remember + Forgot */}
        <motion.div variants={staggerItem} className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              {...register('remember')}
              type="checkbox"
              className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-300"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-brand-600 font-medium hover:underline"
          >
            Forgot password?
          </Link>
        </motion.div>

        {/* Submit */}
        <motion.div variants={staggerItem}>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-3.5 text-base font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </motion.div>
      </form>

      <motion.p
        variants={staggerItem}
        className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400"
      >
        Don't have an account?{' '}
        <Link to="/register" className="text-brand-600 font-semibold hover:underline">
          Create account
        </Link>
      </motion.p>
    </motion.div>
  );
}
