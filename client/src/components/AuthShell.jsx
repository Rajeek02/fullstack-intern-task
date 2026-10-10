import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';
import PageTransition from './PageTransition';

const perks = [
  { icon: Sparkles, title: 'Handpicked templates', text: 'Landing pages, dashboards, storefronts and more.' },
  { icon: Heart, title: 'Save your favorites', text: 'Build a personal collection you can revisit anytime.' },
  { icon: ShieldCheck, title: 'Secure by design', text: 'JWT sessions and bcrypt-hashed passwords.' },
];

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <PageTransition className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <div className="glass-strong rounded-3xl p-8 shadow-glow sm:p-10">
          <h1 className="font-display text-3xl font-bold text-white">{title}</h1>
          <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
        <p className="mt-6 text-center text-sm text-slate-400">{footer}</p>
      </div>

      <div className="hidden lg:block">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">Templatory</p>
        <h2 className="mt-4 font-display text-5xl font-bold leading-[1.1] text-white">
          Beautiful templates, <span className="text-gradient">one click away.</span>
        </h2>
        <div className="mt-10 space-y-4">
          {perks.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="glass flex items-start gap-4 rounded-2xl p-5"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500/30 to-pink-500/30 text-brand-400">
                <p.icon size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-white">{p.title}</h3>
                <p className="text-sm text-slate-400">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
