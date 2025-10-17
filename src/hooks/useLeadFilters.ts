import { useMemo, useState } from 'react';
import type { LeadFilters } from '../lib/supabaseClient.ts';
import useDebouncedValue from './useDebouncedValue.ts';

export const DEFAULT_FILTERS: LeadFilters = {
  search: '',
  person: {
    position: '',
    seniority: []
  },
  company: {
    industry: [],
    size: [],
    founded_year: { min: undefined, max: undefined }
  },
  contact: {
    email: false,
    phone: false,
    linkedin: false
  }
};

const cloneFilters = (filters: LeadFilters): LeadFilters =>
  JSON.parse(JSON.stringify(filters)) as LeadFilters;

const sanitizeFilters = (filters: LeadFilters): LeadFilters => {
  const sanitized: LeadFilters = {};

  if (filters.search?.trim()) {
    sanitized.search = filters.search.trim();
  }

  if (filters.person) {
    const { position, seniority } = filters.person;
    if (position?.trim()) {
      sanitized.person = { ...sanitized.person, position: position.trim() };
    }
    if (seniority?.length) {
      sanitized.person = {
        ...sanitized.person,
        seniority: seniority.filter(Boolean)
      };
    }
  }

  if (filters.company) {
    const { industry, size, founded_year } = filters.company;
    if (industry?.length) {
      sanitized.company = { ...sanitized.company, industry: industry.filter(Boolean) };
    }
    if (size?.length) {
      sanitized.company = { ...sanitized.company, size: size.filter(Boolean) };
    }
    if (founded_year && (founded_year.min || founded_year.max)) {
      sanitized.company = {
        ...sanitized.company,
        founded_year: {
          min: founded_year.min || undefined,
          max: founded_year.max || undefined
        }
      };
    }
  }

  if (filters.contact) {
    const { email, phone, linkedin } = filters.contact;
    if (email || phone || linkedin) {
      sanitized.contact = { email: !!email, phone: !!phone, linkedin: !!linkedin };
    }
  }

  return sanitized;
};

const useLeadFilters = () => {
  const [filters, setFilters] = useState<LeadFilters>(cloneFilters(DEFAULT_FILTERS));
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const sanitizedFilters = useMemo(() => sanitizeFilters(filters), [filters]);
  const debouncedFilters = useDebouncedValue(sanitizedFilters, 300);

  const resetFilters = () => setFilters(cloneFilters(DEFAULT_FILTERS));

  return {
    filters,
    setFilters,
    sanitizedFilters,
    debouncedFilters,
    resetFilters,
    page,
    setPage,
    pageSize,
    setPageSize
  } as const;
};

export default useLeadFilters;
