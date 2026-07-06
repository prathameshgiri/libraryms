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
