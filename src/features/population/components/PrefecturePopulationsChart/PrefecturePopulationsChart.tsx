import { FC, useEffect, useState } from 'react';

import { useTotalPopulationsOfPrefectures } from '../../api/getPopulation';

import { MultiLineChart } from '@/components/Chart/MultiLineChart/MultiLineChart';
import { usePrefectures } from '@/features/prefecture/api/getPrefectures';
import { SelectPrefecture } from '@/features/prefecture/components/SelectPrefecture/SelectPrefecture';
import type { Prefecture } from '@/features/prefecture/types';

import * as styles from './PrefecturePopulationsChart.css';

export const PrefecturePopulationsChart: FC = () => {
  const [selected, setSelected] = useState<Set<Prefecture['code']> | undefined>(
    undefined
  );

  useEffect(() => {
    const setSelectedFromSearch = (): void => {
      const params = new URLSearchParams(window.location.search).get(
        'prefectures'
      );

      setSelected(
        new Set(
          params
            ?.split(',')
            .map((code) => Number(code))
            .filter((code) => !isNaN(code))
        )
      );
    };

    setSelectedFromSearch();

    window.addEventListener('popstate', setSelectedFromSearch);

    return (): void => {
      window.removeEventListener('popstate', setSelectedFromSearch);
    };
  }, []);

  useEffect(() => {
    if (!selected) {
      return;
    }

    const newParams = Array.from(selected)
      .sort((a, b) => a - b)
      .join(',');

    const searchParams = new URLSearchParams(window.location.search);

    if ((searchParams.get('prefectures') ?? '') === newParams) {
      return;
    }

    searchParams.set('prefectures', newParams);

    window.history.replaceState(
      null,
      '',
      newParams === '' ? '?' : `?${searchParams}`
    );
  }, [selected]);

  const prefecturesQuery = usePrefectures();

  const selectedArray = Array.from(selected ?? []);
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
    <div className={styles.wrapper}>
      {prefecturesQuery.data && selected && (
        <SelectPrefecture
          prefectures={prefecturesQuery.data}
          selected={selected}
          onChange={setSelected}
        />
      )}
      {prefecturesQuery.data && selected && selectedArray.length === 0 && (
        <p>都道府県を選択してください。</p>
      )}
      {prefecturesQuery.data && chartData.length !== 0 && selected && (
        <MultiLineChart
          xLabel="年度"
          yLabel="人口"
          lines={prefecturesQuery.data
            .filter(({ code }) => selected.has(code))
            .map(({ code, name }) => ({
              key: code,
              name,
            }))}
          data={chartData}
        />
      )}
    </div>
  );
};
