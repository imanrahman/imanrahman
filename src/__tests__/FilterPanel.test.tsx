import { fireEvent, render, screen } from '@testing-library/react';
import FilterPanel from '../components/filter/FilterPanel.tsx';
import { DEFAULT_FILTERS } from '../hooks/useLeadFilters.ts';
import type { LeadFilters } from '../lib/supabaseClient.ts';

describe('FilterPanel', () => {
  const renderComponent = (override?: Partial<LeadFilters>) => {
    const handleChange = vi.fn<(updater: (filters: LeadFilters) => LeadFilters) => void>().mockImplementation(
      (updater) => {
        updater({ ...DEFAULT_FILTERS, ...override });
      }
    );

    render(
      <FilterPanel
        filters={{ ...DEFAULT_FILTERS, ...override }}
        onChange={handleChange}
        onReset={vi.fn()}
      />
    );

    return { handleChange };
  };

  it('updates search input', () => {
    const { handleChange } = renderComponent();
    const search = screen.getByPlaceholderText('Search by name or company');
    fireEvent.change(search, { target: { value: 'Alice' } });
    expect(handleChange).toHaveBeenCalledWith(expect.any(Function));
  });

  it('toggles seniority chip', () => {
    const { handleChange } = renderComponent();
    const chip = screen.getByRole('button', { name: /individual contributor/i });
    fireEvent.click(chip);
    expect(handleChange).toHaveBeenCalled();
  });

  it('toggles contact options', () => {
    const { handleChange } = renderComponent();
    const email = screen.getByRole('button', { name: /requires email/i });
    fireEvent.click(email);
    expect(handleChange).toHaveBeenCalled();
  });
});
