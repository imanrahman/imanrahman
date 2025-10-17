import { fireEvent, render, screen } from '@testing-library/react';
import FilterAccordion from '../components/filter/FilterAccordion.tsx';

describe('FilterAccordion', () => {
  it('renders children when open and hides when closed', () => {
    render(
      <FilterAccordion title="Section">
        <span>Content</span>
      </FilterAccordion>
    );

    expect(screen.getByText('Content')).toBeVisible();

    const toggle = screen.getByRole('button', { name: /section/i });
    fireEvent.click(toggle);

    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
});
