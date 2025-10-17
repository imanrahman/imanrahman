import { Download, Loader2, RefreshCw } from 'lucide-react';
import type { SortState } from '../../utils/filterUtils.ts';

export type ResultsToolbarProps = {
  total: number;
  onRefresh: () => void;
  loading: boolean;
  sort: SortState;
  onSortChange: (sort: SortState) => void;
};

const sortOptions: { label: string; value: SortState }[] = [
  { label: 'Founded (newest)', value: { column: 'founded_year', direction: 'desc' } },
  { label: 'Founded (oldest)', value: { column: 'founded_year', direction: 'asc' } },
  { label: 'Company name (A-Z)', value: { column: 'org_name', direction: 'asc' } },
  { label: 'Company name (Z-A)', value: { column: 'org_name', direction: 'desc' } },
  { label: 'Seniority', value: { column: 'seniority', direction: 'asc' } }
];

const ResultsToolbar = ({ total, onRefresh, loading, sort, onSortChange }: ResultsToolbarProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-background-surface/80 p-4 shadow-elevated md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold text-white">{total.toLocaleString()} leads</p>
        <p className="text-xs text-slate-400">Live results based on your filters</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-background-raised px-3 py-2 text-xs text-slate-200">
          Sort by
          <select
            value={JSON.stringify(sort)}
            onChange={(event) => onSortChange(JSON.parse(event.target.value))}
            className="bg-transparent text-sm text-white focus:outline-none"
            aria-label="Sort leads"
          >
            {sortOptions.map((option) => (
              <option key={option.label} value={JSON.stringify(option.value)} className="bg-slate-900 text-white">
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          aria-label="Refresh results"
          className="focus-ring flex items-center gap-2 rounded-xl border border-slate-700/60 bg-background-raised px-3 py-2 text-xs text-white transition hover:border-slate-500"
          onClick={onRefresh}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Refresh
        </button>
        <button
          type="button"
          className="focus-ring flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/15 px-3 py-2 text-xs text-primary transition hover:border-primary hover:bg-primary/20"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>
    </div>
  );
};

export default ResultsToolbar;
