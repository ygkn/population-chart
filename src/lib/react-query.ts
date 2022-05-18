import { QueryClient, UseQueryOptions } from 'react-query';

export const queryClient = new QueryClient();

export type QueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends string | readonly unknown[] = string | readonly unknown[]
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryKey' | 'queryFn'
>;
