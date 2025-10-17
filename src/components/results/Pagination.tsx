import { ChevronLeft, ChevronRight } from 'lucide-react';

export type PaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

const pageSizes = [10, 25, 50];

const Pagination = ({ page, pageSize, total, onPageChange, onPageSizeChange }: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-background-surface/80 p-4 shadow-elevated md:flex-row md:items-center md:justify-between">
      <div className="text-xs text-slate-400">
        Showing <span className="text-white">{Math.min(total, (page - 1) * pageSize + 1)}</span> -
        <span className="text-white">
          {Math.min(page * pageSize, total)}
        </span>{' '}
        of <span className="text-white">{total}</span>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-xs text-slate-300">
          Rows per page
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="focus-ring rounded-lg border border-slate-700/60 bg-background-raised px-2 py-1 text-sm text-white"
            aria-label="Rows per page"
          >
            {pageSizes.map((size) => (
              <option key={size} value={size} className="bg-slate-900 text-white">
                {size}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous page"
            disabled={!canGoPrev}
            onClick={() => canGoPrev && onPageChange(page - 1)}
            className="focus-ring flex items-center gap-2 rounded-xl border border-slate-700/60 bg-background-raised px-3 py-2 text-xs text-white transition hover:border-slate-500 disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-600"
          >
            <ChevronLeft className="h-4 w-4" /> Prev
          </button>
          <span className="text-xs text-slate-400">
            Page <span className="text-white">{page}</span> of <span className="text-white">{totalPages}</span>
          </span>
          <button
            type="button"
            aria-label="Next page"
            disabled={!canGoNext}
            onClick={() => canGoNext && onPageChange(page + 1)}
            className="focus-ring flex items-center gap-2 rounded-xl border border-slate-700/60 bg-background-raised px-3 py-2 text-xs text-white transition hover:border-slate-500 disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-600"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
