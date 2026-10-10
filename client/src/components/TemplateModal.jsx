import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { templatesApi } from '../api/services';
import FavoriteButton from './FavoriteButton';
import Spinner from './Spinner';
import { categoryStyle } from './categoryStyles';

/** Opens with the card data instantly, then loads full details from GET /api/templates/:id */
export default function TemplateModal({ template, onClose }) {
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!template) return;
    setDetail(null);
    setError('');
    const controller = new AbortController();
    templatesApi
      .get(template.id, controller.signal)
      .then((res) => setDetail(res.data))
      .catch((err) => {
        if (err.code !== 'ERR_CANCELED') setError('Could not load the latest details.');
      });
    return () => controller.abort();
  }, [template]);

  useEffect(() => {
    if (!template) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [template, onClose]);

  const t = detail || template;

  return (
    <AnimatePresence>
      {template && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-ink-950/80 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${t.name} details`}
        >
          <motion.div
            className="glass-strong relative w-full max-w-3xl overflow-hidden rounded-3xl shadow-glow"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="btn-ghost absolute right-4 top-4 z-10 !rounded-full !p-2" aria-label="Close">
              <X size={18} />
            </button>
            <div className="aspect-[16/9] bg-ink-700">
              <img src={t.thumbnail_url} alt={`${t.name} preview`} className="h-full w-full object-cover" />
            </div>
            <div className="space-y-4 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-full border bg-gradient-to-r px-3 py-1 text-xs font-semibold ${categoryStyle(t.category)}`}>{t.category}</span>
                {!detail && !error && <Spinner className="h-4 w-4 text-slate-500" />}
              </div>
              <h2 className="font-display text-3xl font-bold text-white">{t.name}</h2>
              <p className="leading-relaxed text-slate-300">{t.description}</p>
              {error && <p className="text-sm text-amber-300">{error}</p>}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <FavoriteButton template={t} variant="full" />
                <button onClick={onClose} className="btn-ghost">Close</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
