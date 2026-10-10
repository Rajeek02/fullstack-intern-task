const styles = {
  'Landing Page': 'from-indigo-500/25 to-fuchsia-500/25 text-indigo-200 border-indigo-400/30',
  Dashboard: 'from-cyan-500/25 to-blue-500/25 text-cyan-200 border-cyan-400/30',
  'E-commerce': 'from-amber-500/25 to-orange-500/25 text-amber-200 border-amber-400/30',
  Portfolio: 'from-emerald-500/25 to-teal-500/25 text-emerald-200 border-emerald-400/30',
  Blog: 'from-rose-500/25 to-purple-500/25 text-rose-200 border-rose-400/30',
};
export const categoryStyle = (c) => styles[c] || 'from-slate-500/25 to-slate-400/25 text-slate-200 border-slate-400/30';
