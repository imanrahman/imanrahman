import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../components/results/Pagination.tsx';

describe('Pagination', () => {
  it('navigates between pages', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination
        page={2}
        pageSize={10}
        total={100}
        onPageChange={handlePageChange}
        onPageSizeChange={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /previous page/i }));
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });
});
