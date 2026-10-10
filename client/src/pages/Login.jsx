import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthShell from '../components/AuthShell';
import FormField from '../components/FormField';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage, getFieldErrors } from '../api/client';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/templates';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!EMAIL_RE.test(form.email.trim())) er.email = 'Enter a valid email address';
    if (!form.password) er.password = 'Password is required';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await login({ email: form.email.trim(), password: form.password });
      toast.success('Welcome back!', { icon: '🎉' });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setErrors(getFieldErrors(err));
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to see your favorite templates."
      footer={<>New here? <Link to="/register" className="font-semibold text-brand-400 hover:text-brand-500">Create an account</Link></>}
    >
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <FormField id="email" label="Email" type="email" icon={Mail} placeholder="you@example.com" autoComplete="email" value={form.email} onChange={onChange} error={errors.email} />
        <FormField id="password" label="Password" type="password" icon={Lock} placeholder="Your password" autoComplete="current-password" value={form.password} onChange={onChange} error={errors.password} />
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <Spinner /> : <>Log in <ArrowRight size={16} /></>}
        </button>
      </form>
    </AuthShell>
  );
}
