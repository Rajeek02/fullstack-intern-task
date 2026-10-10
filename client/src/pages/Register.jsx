import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthShell from '../components/AuthShell';
import FormField from '../components/FormField';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage, getFieldErrors } from '../api/client';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function strength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw) || pw.length >= 12) s++;
  return s;
}
const labels = ['Too short', 'Weak', 'Okay', 'Strong', 'Excellent'];
const colors = ['bg-slate-600', 'bg-rose-500', 'bg-amber-500', 'bg-emerald-500', 'bg-cyan-400'];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const score = useMemo(() => (form.password ? strength(form.password) : 0), [form.password]);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (form.name.trim().length < 2) er.name = 'Name must be at least 2 characters';
    if (!EMAIL_RE.test(form.email.trim())) er.email = 'Enter a valid email address';
    if (form.password.length < 8) er.password = 'Password must be at least 8 characters';
    else if (!/[A-Za-z]/.test(form.password) || !/[0-9]/.test(form.password)) er.password = 'Use letters and at least one number';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await register({ name: form.name.trim(), email: form.email.trim(), password: form.password });
      toast.success('Account created. Welcome aboard!', { icon: '🚀' });
      navigate('/templates', { replace: true });
    } catch (err) {
      setErrors(getFieldErrors(err));
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start collecting templates you love."
      footer={<>Already have an account? <Link to="/login" className="font-semibold text-brand-400 hover:text-brand-500">Log in</Link></>}
    >
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <FormField id="name" label="Full name" icon={User} placeholder="Jane Doe" autoComplete="name" value={form.name} onChange={onChange} error={errors.name} />
        <FormField id="email" label="Email" type="email" icon={Mail} placeholder="you@example.com" autoComplete="email" value={form.email} onChange={onChange} error={errors.email} />
        <div>
          <FormField id="password" label="Password" type="password" icon={Lock} placeholder="At least 8 characters" autoComplete="new-password" value={form.password} onChange={onChange} error={errors.password} />
          {form.password && (
            <div className="mt-3" aria-live="polite">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= score ? colors[score] : 'bg-white/10'}`} />
                ))}
              </div>
              <p className="mt-1.5 text-xs text-slate-400">Strength: {labels[score]}</p>
            </div>
          )}
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <Spinner /> : <>Create account <ArrowRight size={16} /></>}
        </button>
      </form>
    </AuthShell>
  );
}
