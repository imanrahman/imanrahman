import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';

type FilterAccordionProps = {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

const FilterAccordion = ({ title, description, defaultOpen = true, children }: FilterAccordionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-slate-700/60 bg-background-raised/70">
      <button
        type="button"
        className="focus-ring flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span>
          <span className="block text-sm font-semibold text-white">{title}</span>
          {description ? <span className="block text-xs text-slate-400">{description}</span> : null}
        </span>
        <ChevronDown className={clsx('h-5 w-5 transition-transform', open ? 'rotate-180' : 'rotate-0')} />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="space-y-3 border-t border-slate-700/60 px-4 py-4">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default FilterAccordion;
