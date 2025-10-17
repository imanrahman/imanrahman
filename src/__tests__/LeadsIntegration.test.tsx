import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import LeadsPage from '../pages/LeadsPage.tsx';
import type { LeadRecord } from '../lib/supabaseClient.ts';

const mockLead: LeadRecord = {
  id: '1',
  first_name: 'Jordan',
  last_name: 'Banks',
  email: 'jordan@example.com',
  phone: '+1-555-1234',
  position: 'Head of Revenue',
  city: 'Austin',
  state: 'TX',
  country: 'USA',
  linkedin: 'https://linkedin.com/jordan',
  seniority: 'Director',
  functions: ['Sales'],
  org_name: 'GrowthOps',
  org_website: 'https://growthops.com',
  org_linkedin: 'https://linkedin.com/growthops',
  founded_year: 2018,
  industry: 'SaaS',
  size: '51-200',
  description: null,
  specialties: ['Revenue Operations'],
  org_city: 'Austin',
  org_state: 'TX',
  org_country: 'USA'
};

const buildQuery = () => {
  const query: any = {
    or: vi.fn().mockImplementation(() => query),
    ilike: vi.fn().mockImplementation(() => query),
    in: vi.fn().mockImplementation(() => query),
    gte: vi.fn().mockImplementation(() => query),
    lte: vi.fn().mockImplementation(() => query),
    not: vi.fn().mockImplementation(() => query),
    select: vi.fn().mockImplementation(() => query),
    range: vi.fn().mockImplementation(() => query),
    order: vi.fn().mockImplementation(() => query),
    then: (resolve: (value: { data: LeadRecord[]; count: number; error: null }) => void) =>
      resolve({ data: [mockLead], count: 1, error: null })
  };

  return query;
};

const query = buildQuery();

vi.mock('../lib/supabaseClient.ts', async (original) => {
  const actual = await original();
  return {
    ...actual,
    supabase: {
      from: vi.fn().mockReturnValue(query)
    }
  };
});

describe('Leads integration', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('renders leads returned from Supabase', async () => {
    render(<LeadsPage />);

    expect(await screen.findByText('Jordan Banks')).toBeInTheDocument();
  });

  it('applies filter to supabase query', async () => {
    render(<LeadsPage />);

    const search = screen.getByPlaceholderText('Search by name or company');
    fireEvent.change(search, { target: { value: 'Jordan' } });

    await act(async () => {
      vi.advanceTimersByTime(350);
      await Promise.resolve();
    });

    await waitFor(() => expect(query.or).toHaveBeenCalled());
    expect(query.or).toHaveBeenCalledWith(expect.stringContaining('Jordan'));
  });
});
