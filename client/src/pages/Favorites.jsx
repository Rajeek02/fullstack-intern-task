import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import TemplateGrid from '../components/TemplateGrid';
import TemplateModal from '../components/TemplateModal';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';

export default function Favorites() {
  const { favorites, loading } = useFavorites();
  const { user } = useAuth();
  const [selected, setSelected] = useState(null);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">Your collection</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
          My <span className="text-gradient">Favorites</span>
        </h1>
        <p className="mt-4 text-slate-400">
          {user?.name?.split(' ')[0]}, here are the templates you saved{favorites.length ? ` (${favorites.length})` : ''}.
        </p>
      </header>

      <section className="mt-10">
        {loading && favorites.length === 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : favorites.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No favorites yet"
            text="Tap the heart on any template and it will show up here."
            action={<Link to="/templates" className="btn-primary">Browse templates</Link>}
          />
        ) : (
          <TemplateGrid templates={favorites} onOpen={setSelected} />
        )}
      </section>

      <TemplateModal template={selected} onClose={closeModal} />
    </PageTransition>
  );
}
