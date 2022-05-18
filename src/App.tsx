import type { FC } from 'react';

import { AppProviders } from './AppProviders';
import { Layout } from './components/Layout/Layout';

export const App: FC = () => {
  return (
    <AppProviders>
      <Layout>
        <></>
      </Layout>
    </AppProviders>
  );
};
