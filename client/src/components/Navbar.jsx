import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, LayoutGrid, LogOut, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

const linkClass = ({ isActive }) =>
  `relative rounded-lg px-3.5 py-2 text-sm font-medium transition ${
    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
  }`;

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out. See you soon!', { icon: '👋' });
    navigate('/');
  };

  const initials = user?.name
    ?.split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className={`sticky top-0 z-40 transition ${scrolled ? 'glass-strong shadow-card' : 'border-b border-transparent'}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          <NavLink to="/templates" className={linkClass}>
            {({ isActive }) => (
              <>
                <span className="flex items-center gap-2"><LayoutGrid size={16} /> Templates</span>
                {isActive && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-lg bg-white/10" />}
              </>
            )}
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/favorites" className={linkClass}>
              {({ isActive }) => (
                <>
                  <span className="flex items-center gap-2">
                    <Heart size={16} /> My Favorites
                    {favorites.length > 0 && (
                      <span className="rounded-full bg-pink-500/90 px-1.5 text-[11px] font-bold leading-5 text-white">{favorites.length}</span>
                    )}
                  </span>
                  {isActive && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-lg bg-white/10" />}
                </>
              )}
            </NavLink>
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1 pl-1 pr-4">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-pink-500 text-xs font-bold text-white">{initials}</span>
                <span className="max-w-[140px] truncate text-sm font-medium text-slate-200">{user.name}</span>
              </div>
              <button onClick={handleLogout} className="btn-ghost" aria-label="Log out">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">Log in</Link>
              <Link to="/register" className="btn-primary !py-2.5">Get started</Link>
            </>
          )}
        </div>

        <button className="btn-ghost !p-2.5 md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-strong overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              <NavLink to="/templates" className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/10">Templates</NavLink>
              {isAuthenticated ? (
                <>
                  <NavLink to="/favorites" className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/10">
                    My Favorites {favorites.length > 0 && `(${favorites.length})`}
                  </NavLink>
                  <button onClick={handleLogout} className="rounded-xl px-4 py-3 text-left text-sm font-medium text-rose-300 hover:bg-white/10">
                    Logout ({user.name})
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/10">Log in</NavLink>
                  <NavLink to="/register" className="btn-primary mt-2">Get started</NavLink>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
