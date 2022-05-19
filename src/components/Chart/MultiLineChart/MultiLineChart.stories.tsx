import type { ComponentStory, Meta } from '@storybook/react';

import { totalPopulations } from '@/test/fixtures/population';
import { prefectures } from '@/test/fixtures/prefecture';

import { MultiLineChart } from './MultiLineChart';

const meta: Meta = {
  component: MultiLineChart,
};

export default meta;

const Template: ComponentStory<typeof MultiLineChart> = () => {
  return (
    <MultiLineChart
      xLabel="年度"
      yLabel="人口"
      lines={prefectures.map(({ code, name }) => ({ key: code, name }))}
      data={totalPopulations.map(({ year, ...rest }) => ({
        lineKey: year,
        ...rest,
      }))}
    />
  );
};

export const Default = Template.bind({});
