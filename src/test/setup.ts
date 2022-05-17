import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll } from 'vitest';

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  import.meta.env['RESAS_API_KEY'] = 'test';
});
