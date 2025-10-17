import { act, renderHook } from '@testing-library/react';
import useDebouncedValue from '../hooks/useDebouncedValue.ts';

describe('useDebouncedValue', () => {
  vi.useFakeTimers();

  it('debounces updates', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 300), {
      initialProps: { value: 'initial' }
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('updated');
  });
});
