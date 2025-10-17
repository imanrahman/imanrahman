import { AtSign, Briefcase, Building2, Mail, Phone, Search, Users } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import type { LeadFilters } from '../../lib/supabaseClient.ts';
import FilterAccordion from './FilterAccordion.tsx';

const industries = ['SaaS', 'FinTech', 'Healthcare', 'Retail', 'Manufacturing'];
const companySizes = ['1-50', '51-200', '201-500', '501-1000', '1000+'];
const seniorities = ['Individual Contributor', 'Manager', 'Director', 'VP', 'C-Level'];

export type FilterPanelProps = {
  filters: LeadFilters;
  onChange: Dispatch<SetStateAction<LeadFilters>>;
  onReset: () => void;
};

const inputClassName =
  'focus-ring flex items-center gap-2 rounded-xl border border-slate-700/60 bg-background-raised px-3 py-2 text-sm text-white shadow-inner transition hover:border-slate-500';

const cloneFilters = (filters: LeadFilters): LeadFilters => JSON.parse(JSON.stringify(filters)) as LeadFilters;

const FilterPanel = ({ filters, onChange, onReset }: FilterPanelProps) => {
  const toggleMultiSelect = (key: 'industry' | 'size' | 'seniority', value: string) => {
    onChange((previous) => {
      const next = cloneFilters(previous);
      if (key === 'seniority') {
        next.person = next.person ?? {};
        const list = new Set(next.person.seniority ?? []);
        list.has(value) ? list.delete(value) : list.add(value);
        next.person.seniority = Array.from(list);
      } else {
        next.company = next.company ?? {};
        const list = new Set((next.company as Record<typeof key, string[]>)[key] ?? []);
        list.has(value) ? list.delete(value) : list.add(value);
        (next.company as Record<typeof key, string[]>)[key] = Array.from(list);
      }
      return next;
    });
  };

  const toggleContact = (field: 'email' | 'phone' | 'linkedin') => {
    onChange((previous) => ({
      ...previous,
      contact: { ...previous.contact, [field]: !previous.contact?.[field] }
    }));
  };

  return (
    <aside className="flex h-full w-full flex-col gap-4 rounded-2xl bg-background-surface/60 p-4 shadow-elevated">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Filters</h2>
        <button type="button" onClick={onReset} className="text-sm text-primary hover:underline">
          Reset
        </button>
      </div>
      <div className="space-y-3">
        <label className="text-xs uppercase tracking-wide text-slate-400" htmlFor="search">
          Search People & Companies
        </label>
        <div className={inputClassName}>
          <Search className="h-4 w-4 text-slate-400" />
          <input
            id="search"
            aria-label="Search leads"
            value={filters.search ?? ''}
            onChange={(event) => onChange((previous) => ({ ...previous, search: event.target.value }))}
            className="w-full bg-transparent text-sm placeholder:text-slate-500 focus:outline-none"
            placeholder="Search by name or company"
          />
        </div>
      </div>
      <FilterAccordion title="Person" description="Who are you targeting?">
        <div className={inputClassName}>
          <Briefcase className="h-4 w-4 text-slate-400" />
          <input
            aria-label="Filter by role"
            value={filters.person?.position ?? ''}
            onChange={(event) =>
              onChange((previous) => ({
                ...previous,
                person: { ...previous.person, position: event.target.value }
              }))
            }
            placeholder="Role or title"
            className="w-full bg-transparent text-sm placeholder:text-slate-500 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <span className="block text-xs uppercase tracking-wide text-slate-400">Seniority</span>
          <div className="flex flex-wrap gap-2">
            {seniorities.map((level) => {
              const active = filters.person?.seniority?.includes(level);
              return (
                <button
                  key={level}
                  type="button"
                  aria-pressed={active}
                  className={
                    'focus-ring rounded-full border px-3 py-1 text-xs transition ' +
                    (active
                      ? 'border-primary bg-primary/20 text-primary'
                      : 'border-slate-700/60 bg-background-raised text-slate-300 hover:border-slate-500')
                  }
                  onClick={() => toggleMultiSelect('seniority', level)}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>
      </FilterAccordion>
      <FilterAccordion title="Company" description="Understand the organisation" defaultOpen={false}>
        <div className="space-y-2">
          <span className="block text-xs uppercase tracking-wide text-slate-400">Industry</span>
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => {
              const active = filters.company?.industry?.includes(industry);
              return (
                <button
                  key={industry}
                  type="button"
                  aria-pressed={active}
                  className={
                    'focus-ring rounded-full border px-3 py-1 text-xs transition ' +
                    (active
                      ? 'border-primary bg-primary/20 text-primary'
                      : 'border-slate-700/60 bg-background-raised text-slate-300 hover:border-slate-500')
                  }
                  onClick={() => toggleMultiSelect('industry', industry)}
                >
                  {industry}
                </button>
              );
            })}
          </div>
        </div>
        <div className="space-y-2">
          <span className="block text-xs uppercase tracking-wide text-slate-400">Company size</span>
          <div className="flex flex-wrap gap-2">
            {companySizes.map((size) => {
              const active = filters.company?.size?.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  aria-pressed={active}
                  className={
                    'focus-ring rounded-full border px-3 py-1 text-xs transition ' +
                    (active
                      ? 'border-primary bg-primary/20 text-primary'
                      : 'border-slate-700/60 bg-background-raised text-slate-300 hover:border-slate-500')
                  }
                  onClick={() => toggleMultiSelect('size', size)}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col text-xs text-slate-400">
            Founded from
            <input
              type="number"
              inputMode="numeric"
              className="focus-ring mt-1 rounded-lg border border-slate-700/60 bg-background-raised px-2 py-1 text-sm text-white"
              value={filters.company?.founded_year?.min ?? ''}
              onChange={(event) =>
                onChange((previous) => ({
                  ...previous,
                  company: {
                    ...previous.company,
                    founded_year: {
                      ...previous.company?.founded_year,
                      min: event.target.value ? Number(event.target.value) : undefined
                    }
                  }
                }))
              }
            />
          </label>
          <label className="flex flex-col text-xs text-slate-400">
            Up to
            <input
              type="number"
              inputMode="numeric"
              className="focus-ring mt-1 rounded-lg border border-slate-700/60 bg-background-raised px-2 py-1 text-sm text-white"
              value={filters.company?.founded_year?.max ?? ''}
              onChange={(event) =>
                onChange((previous) => ({
                  ...previous,
                  company: {
                    ...previous.company,
                    founded_year: {
                      ...previous.company?.founded_year,
                      max: event.target.value ? Number(event.target.value) : undefined
                    }
                  }
                }))
              }
            />
          </label>
        </div>
      </FilterAccordion>
      <FilterAccordion title="Contact" description="How can we reach them?" defaultOpen={false}>
        <div className="space-y-2">
          <button
            type="button"
            className={inputClassName + (filters.contact?.email ? ' border-primary bg-primary/20 text-primary' : '')}
            aria-pressed={filters.contact?.email}
            onClick={() => toggleContact('email')}
          >
            <Mail className="h-4 w-4 text-slate-400" />
            Requires email
          </button>
          <button
            type="button"
            className={inputClassName + (filters.contact?.phone ? ' border-primary bg-primary/20 text-primary' : '')}
            aria-pressed={filters.contact?.phone}
            onClick={() => toggleContact('phone')}
          >
            <Phone className="h-4 w-4 text-slate-400" />
            Requires phone number
          </button>
          <button
            type="button"
            className={inputClassName + (filters.contact?.linkedin ? ' border-primary bg-primary/20 text-primary' : '')}
            aria-pressed={filters.contact?.linkedin}
            onClick={() => toggleContact('linkedin')}
          >
            <AtSign className="h-4 w-4 text-slate-400" />
            Requires LinkedIn
          </button>
        </div>
      </FilterAccordion>
      <div className="mt-auto space-y-2 rounded-xl border border-slate-700/60 bg-background-raised/80 p-4">
        <h3 className="text-sm font-semibold text-white">Quick Stats</h3>
        <p className="flex items-center gap-2 text-xs text-slate-400">
          <Users className="h-4 w-4" />
          Keep filters tight for higher match quality.
        </p>
        <p className="flex items-center gap-2 text-xs text-slate-400">
          <Building2 className="h-4 w-4" />
          Combine company and contact filters for full-funnel readiness.
        </p>
      </div>
    </aside>
  );
};

export default FilterPanel;
