import type { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import type { LeadFilters, LeadRecord } from '../lib/supabaseClient.ts';

export type LeadResult = LeadRecord & { full_name: string };

export const DEFAULT_PAGE_SIZE = 10;

export type SortState = {
  column: keyof LeadResult;
  direction: 'asc' | 'desc';
};

export type PaginatedResponse = {
  data: LeadResult[];
  count: number;
};

export const toLeadResult = (lead: LeadRecord): LeadResult => ({
  ...lead,
  full_name: `${lead.first_name} ${lead.last_name}`.trim()
});

export const applyFilters = (
  builder: PostgrestFilterBuilder<LeadRecord, LeadRecord[], unknown>,
  filters: LeadFilters
) => {
  const { search, person, company, contact } = filters;

  if (search) {
    builder.or(
      `first_name.ilike.%${search}%,last_name.ilike.%${search}%,org_name.ilike.%${search}%`
    );
  }

  if (person?.position) {
    builder.ilike('position', `%${person.position}%`);
  }

  if (person?.seniority?.length) {
    builder.in('seniority', person.seniority);
  }

  if (company?.industry?.length) {
    builder.in('industry', company.industry);
  }

  if (company?.size?.length) {
    builder.in('size', company.size);
  }

  if (company?.founded_year) {
    const { min, max } = company.founded_year;
    if (min) builder.gte('founded_year', min);
    if (max) builder.lte('founded_year', max);
  }

  if (contact?.email) {
    builder.not('email', 'is', null);
  }

  if (contact?.phone) {
    builder.not('phone', 'is', null);
  }

  if (contact?.linkedin) {
    builder.not('linkedin', 'is', null);
  }

  return builder;
};

export const buildFilterChips = (filters: LeadFilters): string[] => {
  const chips: string[] = [];
  if (filters.search) chips.push(`Search: "${filters.search}"`);
  if (filters.person?.position) chips.push(`Position: ${filters.person.position}`);
  filters.person?.seniority?.forEach((value) => chips.push(`Seniority: ${value}`));
  filters.company?.industry?.forEach((value) => chips.push(`Industry: ${value}`));
  filters.company?.size?.forEach((value) => chips.push(`Size: ${value}`));
  if (filters.company?.founded_year?.min)
    chips.push(`Founded ≥ ${filters.company.founded_year.min}`);
  if (filters.company?.founded_year?.max)
    chips.push(`Founded ≤ ${filters.company.founded_year.max}`);
  if (filters.contact?.email) chips.push('Has Email');
  if (filters.contact?.phone) chips.push('Has Phone');
  if (filters.contact?.linkedin) chips.push('Has LinkedIn');
  return chips;
};

const cloneFilters = (filters: LeadFilters): LeadFilters =>
  JSON.parse(JSON.stringify(filters)) as LeadFilters;

export const removeFilterFromState = (filters: LeadFilters, chip: string): LeadFilters => {
  const next = cloneFilters(filters);

  const normalized = chip.toLowerCase();
  if (normalized.startsWith('search')) {
    delete next.search;
  }

  if (normalized.startsWith('position')) {
    if (next.person) delete next.person.position;
  }

  if (normalized.startsWith('seniority')) {
    const value = chip.split(':')[1]?.trim();
    if (next.person?.seniority) {
      next.person.seniority = next.person.seniority.filter((item) => item !== value);
      if (!next.person.seniority.length) delete next.person.seniority;
    }
  }

  if (normalized.startsWith('industry')) {
    const value = chip.split(':')[1]?.trim();
    if (next.company?.industry) {
      next.company.industry = next.company.industry.filter((item) => item !== value);
      if (!next.company.industry.length) delete next.company.industry;
    }
  }

  if (normalized.startsWith('size')) {
    const value = chip.split(':')[1]?.trim();
    if (next.company?.size) {
      next.company.size = next.company.size.filter((item) => item !== value);
      if (!next.company.size.length) delete next.company.size;
    }
  }

  if (normalized.includes('≥')) {
    if (next.company?.founded_year) delete next.company.founded_year.min;
  }

  if (normalized.includes('≤')) {
    if (next.company?.founded_year) delete next.company.founded_year.max;
  }

  if (normalized.includes('email')) {
    if (next.contact) delete next.contact.email;
  }

  if (normalized.includes('phone')) {
    if (next.contact) delete next.contact.phone;
  }

  if (normalized.includes('linkedin')) {
    if (next.contact) delete next.contact.linkedin;
  }

  return next;
};
