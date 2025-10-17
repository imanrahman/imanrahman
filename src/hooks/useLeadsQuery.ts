import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase, type LeadFilters, type LeadRecord } from '../lib/supabaseClient.ts';
import {
  DEFAULT_PAGE_SIZE,
  type LeadResult,
  type PaginatedResponse,
  type SortState,
  applyFilters,
  toLeadResult
} from '../utils/filterUtils.ts';

const DEFAULT_SORT: SortState = { column: 'founded_year', direction: 'desc' };

type LeadsQueryOptions = {
  filters: LeadFilters;
  page: number;
  pageSize?: number;
  sort?: SortState;
};

type LeadsQueryState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  error?: string;
  data: LeadResult[];
  count: number;
  sort: SortState;
};

export const useLeadsQuery = ({ filters, page, pageSize = DEFAULT_PAGE_SIZE, sort }: LeadsQueryOptions) => {
  const [state, setState] = useState<LeadsQueryState>({
    status: 'idle',
    data: [],
    count: 0,
    sort: sort ?? DEFAULT_SORT
  });

  const fetchLeads = useCallback(async () => {
    setState((previous) => ({ ...previous, status: 'loading', error: undefined }));

    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const query = supabase
        .from('leads')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order(state.sort.column, { ascending: state.sort.direction === 'asc' });

      applyFilters(query, filters);

      const { data, error, count } = (await query) as unknown as PaginatedResponse & {
        error: Error | null;
      };

      if (error) throw error;

      setState((previous) => ({
        ...previous,
        status: 'success',
        data: (data ?? []).map(toLeadResult),
        count: count ?? 0
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to fetch leads';
      setState((previous) => ({ ...previous, status: 'error', error: message }));
    }
  }, [filters, page, pageSize, state.sort]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const setSort = useCallback((next: SortState) => {
    setState((previous) => ({ ...previous, sort: next }));
  }, []);

  return useMemo(
    () => ({
      ...state,
      setSort,
      refetch: fetchLeads
    }),
    [fetchLeads, setSort, state]
  );
};

export const sortRecords = (records: LeadRecord[], sort: SortState): LeadRecord[] => {
  return [...records].sort((a, b) => {
    const valueA = a[sort.column as keyof LeadRecord];
    const valueB = b[sort.column as keyof LeadRecord];

    if (valueA === valueB) return 0;

    if (valueA === null || valueA === undefined) return sort.direction === 'asc' ? -1 : 1;
    if (valueB === null || valueB === undefined) return sort.direction === 'asc' ? 1 : -1;

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sort.direction === 'asc' ? valueA - valueB : valueB - valueA;
    }

    return sort.direction === 'asc'
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });
};
