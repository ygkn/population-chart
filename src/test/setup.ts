import '@testing-library/jest-dom';
import { setGlobalConfig } from '@storybook/testing-react';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

import * as globalStorybookConfig from '../../.storybook/preview';

import { server } from './server';

setGlobalConfig(globalStorybookConfig);

afterEach(() => {
  cleanup();

  server.resetHandlers();
});

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());
