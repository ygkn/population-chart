import type { ReactElement } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

type Props<LineKey extends string | number, Value> = {
  xLabel: string;
  yLabel: string;
  lines: { key: LineKey; name: string }[];
  data: ({ [_ in LineKey]: Value | undefined } & { lineKey: LineKey })[];
};

export const MultiLineChart = <K extends string | number, V>({
  xLabel,
  yLabel,
  lines,
  data,
}: Props<K, V>): ReactElement => {
  return (
    <LineChart width={600} height={300} data={data}>
      {lines.map(({ key, name }) => (
        <Line key={key} dataKey={key} name={name} connectNulls />
      ))}
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="lineKey" domain={['dataMin', 'dataMax']} label={xLabel} />
      <YAxis domain={['dataMin', 'dataMax']} label={yLabel} />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};
