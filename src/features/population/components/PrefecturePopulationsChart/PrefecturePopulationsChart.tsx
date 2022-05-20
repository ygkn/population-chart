import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FC, useEffect, useState } from 'react';

import { useTotalPopulationsOfPrefectures } from '../../api/getPopulation';

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

  const prefecturePopulationsMap = new Map(
    totalPopulationsQuery.map(
      ({ data }, index) => [selectedArray[index], data] as const
    )
  );

  const chartData = prefecturesQuery.data
    ?.map(({ name, code }) => ({
      name,
      data: prefecturePopulationsMap
        .get(code)
        ?.map(({ year, value }) => [year, value] as const),
    }))
    ?.filter(
      (prefecture) =>
        prefecture.data !== undefined && prefecture.data.length > 0
    );

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
      {chartData !== undefined && chartData.length !== 0 && (
        <HighchartsReact
          highcharts={Highcharts}
          containerProps={{ className: styles.chartContainer }}
          options={{
            className: styles.chart,
            title: {
              text: '都道府県の人口',
            },

            yAxis: {
              title: {
                text: '人口',
              },
            },

            xAxis: {
              title: {
                text: '年度',
              },
            },

            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle',
            },

            series: chartData,
          }}
        />
      )}
    </div>
  );
};
