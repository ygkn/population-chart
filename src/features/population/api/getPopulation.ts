import { useQueries, useQuery, UseQueryOptions } from 'react-query';

import type { TotalPopulationsOfPrefecture } from '../types';

import type { Prefecture } from '@/features/prefecture/types';
import type { QueryOptions } from '@/lib/react-query';
import { fetchResasApi } from '@/lib/resasApi/fetchResasApi';

const path = '/api/v1/population/composition/perYear' as const;

export const getTotalPopulationsOfPrefecture = async (
  prefCode: Prefecture['code']
): Promise<TotalPopulationsOfPrefecture[]> => {
  const { result } = await fetchResasApi(path, { prefCode, cityCode: '-' });

  const totalPopulations = result.data.find(
    (x): x is Extract<typeof result.data[number], { label: '総人口' }> =>
      x.label === '総人口'
  )?.data;

  // `totalPopulations` is not undefined,
  // because the schema has '総人口" data (see `@/lib/resasApi/type.ts`),
  // and responses that do not match the schema will throw error (see `@/lib/resasApi/fetchResasApi.test.ts`).
  if (totalPopulations === undefined) {
    throw new Error(
      `RESAS API response is invalid. Response of ${path} prefCode=${prefCode} does not have '総人口' data.`
    );
  }

  return totalPopulations;
};

export const useTotalPopulationsOfPrefecture = (
  prefCode: Prefecture['code'],
  options?: QueryOptions<
    TotalPopulationsOfPrefecture[],
    Error,
    TotalPopulationsOfPrefecture[],
    [typeof path, typeof prefCode]
  >
) =>
  useQuery({
    ...options,
    queryKey: [path, prefCode],
    queryFn: () => getTotalPopulationsOfPrefecture(prefCode),
  });

export const useTotalPopulationsOfPrefectures = (
  prefCodes: Prefecture['code'][],
  options?: QueryOptions<
    TotalPopulationsOfPrefecture[],
    Error,
    TotalPopulationsOfPrefecture[],
    [typeof path, typeof prefCodes[number]]
  >
) =>
  useQueries<
    UseQueryOptions<
      TotalPopulationsOfPrefecture[],
      Error,
      TotalPopulationsOfPrefecture[],
      [typeof path, typeof prefCodes[number]]
    >[]
  >(
    prefCodes.map((prefCode) => ({
      ...options,
      queryKey: [path, prefCode],
      queryFn: () => getTotalPopulationsOfPrefecture(prefCode),
    }))
  );
