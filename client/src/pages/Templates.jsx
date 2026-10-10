import { useCallback, useEffect, useState } from 'react';
import { Search, SearchX, X, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import PageTransition from '../components/PageTransition';
import TemplateGrid from '../components/TemplateGrid';
import TemplateModal from '../components/TemplateModal';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import { templatesApi } from '../api/services';
import { getErrorMessage } from '../api/client';
import useDebounce from '../hooks/useDebounce';

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const debounced = useDebounce(search, 350);
  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    templatesApi
      .categories()
      .then((r) => setCategories(r.data))
      .catch((err) => toast.error(getErrorMessage(err)));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    templatesApi
      .list({ search: debounced || undefined, category: category === 'All' ? undefined : category }, controller.signal)
      .then((res) => setTemplates(res.data))
      .catch((err) => {
        if (err.code === 'ERR_CANCELED') return;
        setError(getErrorMessage(err));
      })
      .finally(() => !controller.signal.aborted && setLoading(false));
    return () => controller.abort();
  }, [debounced, category]);

  const chips = ['All', ...categories];

  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">Template store</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
          Discover <span className="text-gradient">stunning templates</span>
        </h1>
        <p className="mt-4 text-slate-400">Browse the collection, open any template for details, and tap the heart to save your favorites.</p>
      </header>

      <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input !pr-11"
            placeholder="Search templates..."
            aria-label="Search templates"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-500 hover:text-white" aria-label="Clear search">
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {chips.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                category === c
                  ? 'border-transparent bg-gradient-to-r from-brand-600 to-pink-500 text-white shadow-glow'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <section className="mt-10" aria-live="polite">
        {error ? (
          <EmptyState
            icon={AlertTriangle}
            title="Couldn't load templates"
            text={error}
            action={<button className="btn-primary" onClick={() => setCategory((c) => c)}>Try again</button>}
          />
        ) : loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : templates.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No templates found"
            text="Try a different search term or choose another category."
            action={<button className="btn-ghost" onClick={() => { setSearch(''); setCategory('All'); }}>Reset filters</button>}
          />
        ) : (
          <>
            <p className="mb-5 text-sm text-slate-500">{templates.length} template{templates.length === 1 ? '' : 's'}</p>
            <TemplateGrid templates={templates} onOpen={setSelected} />
          </>
        )}
      </section>

      <TemplateModal template={selected} onClose={closeModal} />
    </PageTransition>
  );
}
