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

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <motion.div variants={staggerItem} className="group">
          <label className="label-base dark:text-slate-300 mb-1.5 block">Email Address</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors duration-300 z-10 pointer-events-none" strokeWidth={1.75} />
            <input
              {...register('email')}
              type="email"
              className={`input-base pl-12 h-12 bg-white/60 dark:bg-white/5 border-2 hover:border-brand-200 focus:bg-white dark:focus:bg-brand-900/10 shadow-sm transition-all duration-300 ${
                errors.email ? 'border-red-400 focus:border-red-500' : 'border-slate-100 dark:border-white/10 focus:border-brand-500'
              }`}
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-red-500" /> {errors.email.message}
            </p>
          )}
        </motion.div>

        {/* Password */}
        <motion.div variants={staggerItem} className="group">
          <label className="label-base dark:text-slate-300 mb-1.5 block">Password</label>
          <div className="relative flex items-center">
            <Lock className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors duration-300 z-10 pointer-events-none" strokeWidth={1.75} />
            <input
              {...register('password')}
              type={showPass ? 'text' : 'password'}
              className={`input-base pl-12 pr-12 h-12 bg-white/60 dark:bg-white/5 border-2 hover:border-brand-200 focus:bg-white dark:focus:bg-brand-900/10 shadow-sm transition-all duration-300 ${
                errors.password ? 'border-red-400 focus:border-red-500' : 'border-slate-100 dark:border-white/10 focus:border-brand-500'
              }`}
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPass((p) => !p)}
              className="absolute right-4 text-slate-400 hover:text-brand-500 transition-colors duration-300 p-1 rounded-lg hover:bg-brand-50 dark:hover:bg-white/10"
            >
              {showPass ? <EyeOff className="w-4 h-4" strokeWidth={2} /> : <Eye className="w-4 h-4" strokeWidth={2} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-red-500" /> {errors.password.message}
            </p>
          )}
        </motion.div>

        {/* Remember + Forgot */}
        <motion.div variants={staggerItem} className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer group/cb">
            <div className="relative flex items-center justify-center">
              <input
                {...register('remember')}
                type="checkbox"
                className="w-4 h-4 rounded border-2 border-slate-300 text-brand-600 focus:ring-brand-500 focus:ring-offset-0 transition-all cursor-pointer group-hover/cb:border-brand-400"
              />
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover/cb:text-slate-800 dark:group-hover/cb:text-slate-200 transition-colors">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-brand-600 font-semibold hover:text-brand-700 hover:underline decoration-brand-300 underline-offset-4 transition-all"
          >
            Forgot password?
          </Link>
        </motion.div>

        {/* Submit */}
        <motion.div variants={staggerItem} className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full sm:w-auto px-10 py-2.5 !rounded-lg text-sm font-bold shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 transition-all duration-300"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </span>
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
