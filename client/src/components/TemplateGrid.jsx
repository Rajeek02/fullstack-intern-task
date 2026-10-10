import { AnimatePresence } from 'framer-motion';
import TemplateCard from './TemplateCard';

export default function TemplateGrid({ templates, onOpen }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {templates.map((t, i) => (
          <TemplateCard key={t.id} template={t} index={i} onOpen={onOpen} />
        ))}
      </AnimatePresence>
    </div>
  );
}
