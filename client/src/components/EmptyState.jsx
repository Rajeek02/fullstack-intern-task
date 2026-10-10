import { motion } from 'framer-motion';

export default function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass mx-auto flex max-w-lg flex-col items-center rounded-3xl px-8 py-14 text-center"
    >
      <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/30 to-pink-500/30 text-brand-400">
        <Icon size={28} />
      </div>
      <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-400">{text}</p>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}
