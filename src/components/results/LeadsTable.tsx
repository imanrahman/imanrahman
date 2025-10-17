import { ArrowDownUp, ExternalLink } from 'lucide-react';
import type { LeadResult } from '../../utils/filterUtils.ts';
import type { SortState } from '../../utils/filterUtils.ts';

export type LeadsTableProps = {
  leads: LeadResult[];
  loading: boolean;
  sort: SortState;
  onSortChange: (sort: SortState) => void;
};

const columns: { key: keyof LeadResult; label: string; width?: string; align?: 'left' | 'center' }[] = [
  { key: 'full_name', label: 'Name', width: '200px' },
  { key: 'position', label: 'Position', width: '200px' },
  { key: 'seniority', label: 'Seniority', width: '160px' },
  { key: 'org_name', label: 'Company', width: '220px' },
  { key: 'industry', label: 'Industry', width: '160px' },
  { key: 'size', label: 'Size', width: '120px', align: 'center' },
  { key: 'founded_year', label: 'Founded', width: '120px', align: 'center' },
  { key: 'org_website', label: 'Website', width: '160px' },
  { key: 'linkedin', label: 'LinkedIn', width: '160px' }
];

const LeadsTable = ({ leads, loading, sort, onSortChange }: LeadsTableProps) => {
  const handleSort = (column: keyof LeadResult) => {
    const nextDirection = sort.column === column && sort.direction === 'asc' ? 'desc' : 'asc';
    onSortChange({ column, direction: nextDirection });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-background-surface/70 shadow-elevated">
      <table className="min-w-full divide-y divide-slate-700/60">
        <thead className="bg-background-raised/80">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key as string}
                style={{ width: column.width }}
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"
              >
                <button
                  type="button"
                  className="focus-ring flex items-center gap-2 text-slate-300 hover:text-white"
                  onClick={() => handleSort(column.key)}
                >
                  {column.label}
                  <ArrowDownUp className="h-3.5 w-3.5" />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-slate-400">
                Loading leads...
              </td>
            </tr>
          ) : leads.length ? (
            leads.map((lead) => (
              <tr
                key={lead.id}
                className="group transition hover:bg-primary/5 focus-within:bg-primary/10"
              >
                <td className="px-4 py-4 text-sm font-medium text-white">
                  <div className="flex flex-col">
                    <span>{lead.full_name}</span>
                    <span className="text-xs text-slate-400">
                      {lead.city ? `${lead.city}, ${lead.country ?? ''}` : lead.country ?? '—'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-slate-200">{lead.position ?? '—'}</td>
                <td className="px-4 py-4 text-sm text-slate-200">{lead.seniority ?? '—'}</td>
                <td className="px-4 py-4 text-sm text-slate-200">{lead.org_name}</td>
                <td className="px-4 py-4 text-sm text-slate-200">{lead.industry ?? '—'}</td>
                <td className="px-4 py-4 text-center text-sm text-slate-200">{lead.size ?? '—'}</td>
                <td className="px-4 py-4 text-center text-sm text-slate-200">{lead.founded_year ?? '—'}</td>
                <td className="px-4 py-4 text-sm text-primary">
                  {lead.org_website ? (
                    <a
                      href={lead.org_website}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring inline-flex items-center gap-1 text-primary hover:text-primary/80"
                    >
                      Visit <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="px-4 py-4 text-sm text-primary">
                  {lead.linkedin ? (
                    <a
                      href={lead.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring inline-flex items-center gap-1 text-primary hover:text-primary/80"
                    >
                      Profile <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-slate-400">
                No leads match your filters yet. Try widening your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
