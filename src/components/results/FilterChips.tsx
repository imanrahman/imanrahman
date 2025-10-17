import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export type FilterChipsProps = {
  chips: string[];
  onRemove: (chip: string) => void;
  onClearAll: () => void;
};

const FilterChips = ({ chips, onRemove, onClearAll }: FilterChipsProps) => {
  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <AnimatePresence>
        {chips.map((chip) => (
          <motion.button
            key={chip}
            layout
            type="button"
            aria-label={`Remove filter ${chip}`}
            className="focus-ring flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition hover:border-primary/70 hover:bg-primary/20"
            onClick={() => onRemove(chip)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.2 }}
          >
            <span>{chip}</span>
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </motion.button>
        ))}
      </AnimatePresence>
      <button
        type="button"
        onClick={onClearAll}
        className="text-xs text-slate-400 transition hover:text-slate-200"
      >
        Clear all
      </button>
    </div>
  );
};

export default FilterChips;
