import type { FC } from 'react';

import { Layout } from '@/components/Layout/Layout';

import { AppProviders } from './AppProviders';
import { PrefecturePopulationsChart } from './features/population/components/PrefecturePopulationsChart/PrefecturePopulationsChart';

export const App: FC = () => {
  return (
    <AppProviders>
      <Layout>
        <PrefecturePopulationsChart />
      </Layout>
    </AppProviders>
  );
};
