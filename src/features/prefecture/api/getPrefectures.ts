import { useQuery } from 'react-query';

import type { Prefecture } from '../type';

import type { QueryOptions } from '@/lib/react-query';
import { fetchResasApi } from '@/lib/resasApi/fetchResasApi';

const path = '/api/v1/prefectures' as const;

export const getPrefectures = async (): Promise<Prefecture[]> => {
  const { result } = await fetchResasApi(path);

  return result.map(({ prefCode, prefName }) => ({
    code: prefCode,
    name: prefName,
  }));
};

export const usePrefectures = (
  options?: QueryOptions<Prefecture[], Error, Prefecture[], [typeof path]>
) => useQuery({ ...options, queryKey: [path], queryFn: getPrefectures });
