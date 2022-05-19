import { FC, useState } from 'react';

import { useTotalPopulationsOfPrefectures } from '../../api/getPopulation';

import { MultiLineChart } from '@/components/Chart/MultiLineChart/MultiLineChart';
import { usePrefectures } from '@/features/prefecture/api/getPrefectures';
import { SelectPrefecture } from '@/features/prefecture/components/SelectPrefecture/SelectPrefecture';
import type { Prefecture } from '@/features/prefecture/types';

export const PrefecturePopulationsChart: FC = () => {
  const [selected, setSelected] = useState<Set<Prefecture['code']>>(new Set());
  const prefecturesQuery = usePrefectures();

  const selectedArray = Array.from(selected);
  const totalPopulationsQuery = useTotalPopulationsOfPrefectures(selectedArray);

  const chartData = totalPopulationsQuery
    .reduce<{ lineKey: number; [prefCode: number]: number }[]>(
      (acc, { data }, index) => {
        const prefectureCode = selectedArray[index];
        if (data === undefined || prefectureCode === undefined) {
          return acc;
        }

        const newAcc = [...acc];

        for (const { year, value } of data) {
          newAcc[year] = {
            ...(newAcc[year] ?? { lineKey: year }),
            [prefectureCode]: value,
          };
        }

        return newAcc;
      },
      []
    )
    .filter(Boolean);

  return (
    <>
      {prefecturesQuery.data && (
        <SelectPrefecture
          prefectures={prefecturesQuery.data}
          selected={selected}
          onChange={setSelected}
        />
      )}
      {prefecturesQuery.data && chartData.length !== 0 && (
        <MultiLineChart
          xLabel="年度"
          yLabel="人口"
          lines={prefecturesQuery.data.map(({ code, name }) => ({
            key: code,
            name,
          }))}
          data={chartData}
        />
      )}
    </>
  );
};
