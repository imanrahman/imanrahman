import { useMemo } from 'react';
import AppHeader from '../components/layout/AppHeader.tsx';
import InfoCards from '../components/layout/InfoCards.tsx';
import FilterPanel from '../components/filter/FilterPanel.tsx';
import LeadsTable from '../components/results/LeadsTable.tsx';
import Pagination from '../components/results/Pagination.tsx';
import ResultsToolbar from '../components/results/ResultsToolbar.tsx';
import FilterChips from '../components/results/FilterChips.tsx';
import useLeadFilters from '../hooks/useLeadFilters.ts';
import { useLeadsQuery } from '../hooks/useLeadsQuery.ts';
import { buildFilterChips, removeFilterFromState } from '../utils/filterUtils.ts';

const LeadsPage = () => {
  const { filters, setFilters, debouncedFilters, resetFilters, page, setPage, pageSize, setPageSize } =
    useLeadFilters();

  const query = useLeadsQuery({ filters: debouncedFilters, page, pageSize });

  const chips = useMemo(() => buildFilterChips(debouncedFilters), [debouncedFilters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <AppHeader />
        <InfoCards />
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[320px,1fr]">
          <FilterPanel filters={filters} onChange={setFilters} onReset={resetFilters} />
          <section className="flex flex-col gap-4">
            <ResultsToolbar
              total={query.count}
              loading={query.status === 'loading'}
              onRefresh={query.refetch}
              sort={query.sort}
              onSortChange={query.setSort}
            />
            <FilterChips
              chips={chips}
              onRemove={(chip) => setFilters((previous) => removeFilterFromState(previous, chip))}
              onClearAll={resetFilters}
            />
            <LeadsTable
              leads={query.data}
              loading={query.status === 'loading'}
              sort={query.sort}
              onSortChange={query.setSort}
            />
            <Pagination
              page={page}
              pageSize={pageSize}
              total={query.count}
              onPageChange={(nextPage) => setPage(nextPage)}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
              }}
            />
            {query.status === 'error' ? (
              <div
                role="alert"
                className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200"
              >
                {query.error}
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
};

export default LeadsPage;
