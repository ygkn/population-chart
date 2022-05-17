import type { FC } from 'react';

import { AppProviders } from './AppProviders';
import { Layout } from './components/Layout/Layout';
import { PopulationChart } from './components/PopulationChart/PopulationChart';

export const App: FC = () => {
  return (
    <AppProviders>
      <Layout>
        <PopulationChart />
      </Layout>
    </AppProviders>
  );
};
