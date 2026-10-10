import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Search, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import PageTransition from '../components/PageTransition';
import { templatesApi } from '../api/services';
import { getErrorMessage } from '../api/client';
import { useAuth } from '../context/AuthContext';

const features = [
  { icon: Zap, title: 'Instant browsing', text: 'Fast, responsive catalog with live search and category filters.' },
  { icon: Heart, title: 'Personal favorites', text: 'Save templates to your account and find them on any device.' },
  { icon: Search, title: 'Find the right fit', text: 'Landing pages, dashboards, stores, blogs and portfolios.' },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    templatesApi
      .list()
      .then((r) => setPreview(r.data.slice(0, 3)))
      .catch((err) => toast.error(getErrorMessage(err)));
  }, []);

  const rotations = ['-rotate-6 translate-y-6', 'rotate-0 -translate-y-4 z-10 scale-105', 'rotate-6 translate-y-8'];

  return (
    <PageTransition>
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-300"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Mini SaaS Template Store
        </motion.span>
        <h1 className="mx-auto mt-8 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl">
          Premium templates for <span className="text-gradient bg-[length:200%_200%] animate-gradient">modern products</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          Discover beautifully crafted templates, save the ones you love, and keep your personal collection one click away.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/templates" className="btn-primary !px-7 !py-3.5">Browse templates <ArrowRight size={16} /></Link>
          {!isAuthenticated && <Link to="/register" className="btn-ghost !px-7 !py-3.5">Create free account</Link>}
        </div>

        {preview.length > 0 && (
          <div className="mx-auto mt-20 flex max-w-4xl items-center justify-center">
            {preview.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`-mx-6 w-1/3 min-w-[150px] overflow-hidden rounded-2xl border border-white/15 shadow-glow sm:-mx-4 ${rotations[i]} transition hover:scale-110 hover:z-20`}
              >
                <img src={t.thumbnail_url} alt={t.name} className="aspect-[16/10] w-full object-cover" />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto mt-24 grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-3xl p-7 transition hover:-translate-y-1 hover:border-white/25"
          >
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/30 to-pink-500/30 text-brand-400">
              <f.icon size={22} />
            </div>
            <h3 className="font-display text-lg font-semibold text-white">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.text}</p>
          </motion.div>
        ))}
      </section>
    </PageTransition>
  );
}
