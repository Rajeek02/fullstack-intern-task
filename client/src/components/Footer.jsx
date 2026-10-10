import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <Logo />
        <p className="text-center sm:text-right">
          © {new Date().getFullYear()} Templatory
          <span className="mx-2 text-slate-700" aria-hidden="true">·</span>
          Designed &amp; built by <span className="text-slate-300">Mohamed Rajeek Shamsudeen</span>
        </p>
      </div>
    </footer>
  );
}
