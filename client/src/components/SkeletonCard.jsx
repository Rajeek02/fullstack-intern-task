export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60">
      <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <div className="space-y-3 p-5">
        <div className="h-5 w-24 rounded-full bg-white/10" />
        <div className="h-5 w-3/4 rounded-lg bg-white/10" />
        <div className="h-3.5 w-full rounded bg-white/5" />
        <div className="h-3.5 w-2/3 rounded bg-white/5" />
      </div>
    </div>
  );
}
