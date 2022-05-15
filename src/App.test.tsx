import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './App';

describe('Simple working test', () => {
  it('renders without errors', () => {
    const screen = render(<App />);
    expect(screen.container).toBeVisible();
  });
});
