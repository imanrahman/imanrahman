import { fireEvent, render, screen } from '@testing-library/react';
import LeadsTable from '../components/results/LeadsTable.tsx';
import type { LeadResult } from '../utils/filterUtils.ts';

const leads: LeadResult[] = [
  {
    id: '1',
    first_name: 'Alice',
    last_name: 'Lee',
    email: 'alice@example.com',
    phone: null,
    position: 'CTO',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    linkedin: 'https://linkedin.com/alice',
    seniority: 'C-Level',
    functions: ['Engineering'],
    org_name: 'TechCorp',
    org_website: 'https://techcorp.com',
    org_linkedin: null,
    founded_year: 2012,
    industry: 'SaaS',
    size: '201-500',
    description: null,
    specialties: null,
    org_city: 'New York',
    org_state: 'NY',
    org_country: 'USA',
    full_name: 'Alice Lee'
  }
];

describe('LeadsTable', () => {
  it('invokes sort change when header clicked', () => {
    const handleSort = vi.fn();
    render(
      <LeadsTable
        leads={leads}
        loading={false}
        sort={{ column: 'org_name', direction: 'asc' }}
        onSortChange={handleSort}
      />
    );

    const header = screen.getByRole('button', { name: /company/i });
    fireEvent.click(header);
    expect(handleSort).toHaveBeenCalledWith({ column: 'org_name', direction: 'desc' });
  });

  it('renders empty state', () => {
    render(
      <LeadsTable leads={[]} loading={false} sort={{ column: 'org_name', direction: 'asc' }} onSortChange={vi.fn()} />
    );

    expect(screen.getByText(/no leads match/i)).toBeInTheDocument();
  });
});
