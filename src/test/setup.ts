import '@testing-library/jest-dom';
import { setGlobalConfig } from '@storybook/testing-react';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

import * as globalStorybookConfig from '../../.storybook/preview'; // path of your preview.js file

setGlobalConfig(globalStorybookConfig);

afterEach(() => {
  cleanup();
});
