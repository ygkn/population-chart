import type { ReactElement } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';

type Props<LineKey extends string | number> = {
  xLabel: string;
  yLabel: string;
  lines: { key: LineKey; name: string }[];
  data: ({ [_ in LineKey]: number | undefined } & { lineKey: LineKey })[];
};

export const MultiLineChart = <LineKey extends string | number>({
  xLabel,
  yLabel,
  lines,
  data,
}: Props<LineKey>): ReactElement => {
  return (
    <ResponsiveContainer aspect={3 / 2}>
      <LineChart
        data={data}
        margin={{
          top: 24,
          right: 24,
          bottom: 24,
          left: 24,
        }}
      >
        {lines.map(({ key, name }) => (
          <Line key={key} dataKey={key} name={name} connectNulls dot />
        ))}
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="lineKey" domain={['dataMin', 'dataMax']}>
          <Label value={xLabel} offset={-15} position="insideBottomRight" />
        </XAxis>
        <YAxis domain={['dataMin', 'dataMax']}>
          <Label value={yLabel} offset={-25} position="insideTopLeft" />
        </YAxis>
        <Tooltip />
        <Legend verticalAlign="top" />
      </LineChart>
    </ResponsiveContainer>
  );
};
