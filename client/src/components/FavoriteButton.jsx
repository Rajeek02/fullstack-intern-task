import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import useFavoriteAction from '../hooks/useFavoriteAction';

export default function FavoriteButton({ template, variant = 'icon' }) {
  const { isFavorite, onClick } = useFavoriteAction(template);

  if (variant === 'full') {
    return (
      <button onClick={onClick} className={isFavorite ? 'btn-ghost !border-pink-500/40 !bg-pink-500/15 !text-pink-200' : 'btn-primary'} aria-pressed={isFavorite}>
        <Heart size={16} className={isFavorite ? 'fill-pink-400 text-pink-400' : ''} />
        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </button>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.82 }}
      onClick={onClick}
      aria-label={isFavorite ? `Remove ${template.name} from favorites` : `Add ${template.name} to favorites`}
      aria-pressed={isFavorite}
      className={`relative grid h-10 w-10 place-items-center rounded-full border backdrop-blur-md transition ${
        isFavorite ? 'border-pink-500/50 bg-pink-500/25' : 'border-white/20 bg-black/30 hover:bg-black/50'
      }`}
    >
      <AnimatePresence initial={false}>
        {isFavorite && (
          <motion.span
            key="burst"
            className="absolute inset-0 rounded-full border-2 border-pink-400"
            initial={{ scale: 0.6, opacity: 0.9 }}
            animate={{ scale: 1.9, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
      <motion.span animate={{ scale: isFavorite ? [1, 1.35, 1] : 1 }} transition={{ duration: 0.4 }}>
        <Heart size={18} className={isFavorite ? 'fill-pink-400 text-pink-400' : 'text-white'} />
      </motion.span>
    </motion.button>
  );
}
