import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Templatory home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-pink-500 shadow-glow transition group-hover:rotate-6 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
          <path d="M5 7h14M5 12h14M5 17h8" />
        </svg>
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-white">
        Templat<span className="text-gradient">ory</span>
      </span>
    </Link>
  );
}
