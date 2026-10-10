import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function FormField({ id, label, icon: Icon, error, type = 'text', ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-300">{label}</label>
      <div className="relative">
        {Icon && <Icon size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />}
        <input
          id={id}
          name={id}
          type={isPassword && show ? 'text' : type}
          className={`input ${isPassword ? 'pr-12' : ''} ${error ? 'input-error' : ''}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 hover:text-white" aria-label={show ? 'Hide password' : 'Show password'}>
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-rose-400">{error}</p>}
    </div>
  );
}
