import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

export default function NotFound() {
  return (
    <PageTransition className="grid min-h-[60vh] place-items-center px-4 text-center">
      <div>
        <p className="font-display text-8xl font-bold text-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-white">This page drifted off into space</h1>
        <p className="mt-2 text-slate-400">The page you are looking for does not exist.</p>
        <Link to="/" className="btn-primary mt-8">Back to home</Link>
      </div>
    </PageTransition>
  );
}
