import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import { categoryStyle } from './categoryStyles';

const TemplateCard = forwardRef(function TemplateCard({ template, index = 0, onOpen }, ref) {
  // Mouse-follow spotlight (pure CSS variables, no re-render)
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.4), ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60 shadow-card backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-glow"
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--x,50%) var(--y,50%), rgba(167,139,250,0.14), transparent 45%)' }}
      />

      <button type="button" onClick={() => onOpen(template)} className="block w-full text-left" aria-label={`View details for ${template.name}`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-ink-700">
          <img
            src={template.thumbnail_url}
            alt={`${template.name} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
        </div>
        <div className="space-y-3 p-5">
          <span className={`inline-block rounded-full border bg-gradient-to-r px-3 py-1 text-xs font-semibold ${categoryStyle(template.category)}`}>
            {template.category}
          </span>
          <h3 className="flex items-center justify-between font-display text-lg font-semibold text-white">
            {template.name}
            <ArrowUpRight size={18} className="text-slate-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">{template.description}</p>
        </div>
      </button>

      <div className="absolute right-4 top-4 z-20">
        <FavoriteButton template={template} />
      </div>
    </motion.article>
  );
});

export default TemplateCard;
