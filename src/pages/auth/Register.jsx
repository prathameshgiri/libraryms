// src/pages/auth/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { staggerContainer, staggerItem } from '../../animations/variants';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { role: 'librarian' },
  });

  const onSubmit = async (data) => {
    const result = await registerUser(data);
    if (result.success) {
      toast.success('Account created! Please log in.');
      navigate('/login');
    }
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={staggerItem} className="mb-8">
        <h2 className="font-display font-bold text-3xl text-slate-800 dark:text-white mb-2">
          Create Account 🎉
        </h2>
        <p className="text-slate-500 dark:text-slate-400">Join Library MS management platform</p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <motion.div variants={staggerItem}>
          <label className="label-base dark:text-slate-300">Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input {...register('name')} className={`input-base pl-10 ${errors.name ? 'input-error' : ''}`} placeholder="John Doe" />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>}
        </motion.div>

        <motion.div variants={staggerItem}>
          <label className="label-base dark:text-slate-300">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input {...register('email')} type="email" className={`input-base pl-10 ${errors.email ? 'input-error' : ''}`} placeholder="you@library.com" />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
        </motion.div>

        <motion.div variants={staggerItem}>
          <label className="label-base dark:text-slate-300">Role</label>
          <select {...register('role')} className="input-base">
            <option value="librarian">Librarian</option>
            <option value="assistant">Assistant Librarian</option>
            <option value="staff">Staff</option>
          </select>
        </motion.div>

        <motion.div variants={staggerItem}>
          <label className="label-base dark:text-slate-300">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input {...register('password')} type={showPass ? 'text' : 'password'} className={`input-base pl-10 pr-10 ${errors.password ? 'input-error' : ''}`} placeholder="Min. 6 characters" />
            <button type="button" onClick={() => setShowPass((p) => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>}
        </motion.div>

        <motion.div variants={staggerItem}>
          <label className="label-base dark:text-slate-300">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input {...register('confirmPassword')} type="password" className={`input-base pl-10 ${errors.confirmPassword ? 'input-error' : ''}`} placeholder="Re-enter password" />
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5">{errors.confirmPassword.message}</p>}
        </motion.div>

        <motion.div variants={staggerItem}>
          <button type="submit" disabled={isLoading} className="btn-primary w-full py-3.5 text-base font-semibold mt-2">
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</> : 'Create Account'}
          </button>
        </motion.div>
      </form>

      <motion.p variants={staggerItem} className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-600 font-semibold hover:underline">Sign in</Link>
      </motion.p>
    </motion.div>
  );
}
