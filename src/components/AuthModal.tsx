import { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Shield, Sparkles, CheckCircle } from 'lucide-react';
import { User, UserRole } from '../types';

interface AuthModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: User, token: string) => void;
  onSuccess?: (user: User) => void;
  defaultRole?: UserRole;
}

export default function AuthModal({
  isOpen = true,
  onClose,
  onLoginSuccess,
  onSuccess,
  defaultRole = 'customer',
}: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>(defaultRole);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const notifySuccess = (user: User, token: string) => {
    if (onLoginSuccess) onLoginSuccess(user, token);
    if (onSuccess) onSuccess(user);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegister
      ? { email, password, fullName, role, phone }
      : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      notifySuccess(data.user, data.token);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error authenticating');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (selectedRole: UserRole) => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/demo-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selectedRole }),
      });
      const data = await res.json();
      notifySuccess(data.user, data.token);
      onClose();
    } catch (err: any) {
      setError('Failed demo login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 my-8 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-slate-950 border border-emerald-500/30 text-emerald-400 mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-white">
            {isRegister ? 'Create Account' : 'Portal Sign In'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            STDTech Group Pvt Ltd Unified Enterprise Hub
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="p-3 mb-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            ⚡ Quick 1-Click Demo Login:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-colors text-left flex items-center justify-between"
            >
              <span>Admin</span>
              <Shield className="w-3 h-3 text-emerald-400" />
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('staff')}
              className="px-2.5 py-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900 text-blue-300 border border-blue-500/30 text-xs font-bold transition-colors text-left flex items-center justify-between"
            >
              <span>Staff</span>
              <Sparkles className="w-3 h-3 text-blue-400" />
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('student')}
              className="px-2.5 py-1.5 rounded-lg bg-pink-950/60 hover:bg-pink-900 text-pink-300 border border-pink-500/30 text-xs font-bold transition-colors text-left flex items-center justify-between"
            >
              <span>Student</span>
              <span className="text-[10px]">🎓</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('customer')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-bold transition-colors text-left flex items-center justify-between"
            >
              <span>Client</span>
              <UserIcon className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Harinath Verma"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@stdtechgroup.com"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Password *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (e.g. STDTech@2026)"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Account Type
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="customer">Client / Business Account</option>
                <option value="student">Student / Academy Learner</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : isRegister ? 'Register Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          {isRegister ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-emerald-400 font-bold hover:underline"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Need a new account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-emerald-400 font-bold hover:underline"
              >
                Register Here
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
