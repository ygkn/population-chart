import { ResasRequestParams, ResasResponse, resasResponseSchema } from './type';

const baseUrl = 'https://opendata.resas-portal.go.jp';

/**
 *  Hack to omit `params` argument if unnecessary.
 */
export type FetchResasApiArgs<Path extends keyof ResasRequestParams> =
  ResasRequestParams[Path] extends null
    ? [path: Path, params?: null | undefined]
    : [path: Path, params: ResasRequestParams[Path]];

/**
 * @see https://opendata.resas-portal.go.jp/docs/api/v1/index.html
 */
export const fetchResasApi = async <Path extends keyof ResasRequestParams>(
  ...[path, params]: FetchResasApiArgs<Path>
): Promise<ResasResponse[Path]> => {
  const url = new URL(path, baseUrl);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, `${value}`);
    }
  }

  const res = await fetch(url.href, {
    headers: {
      'X-API-KEY': import.meta.env.VITE_RESAS_API_KEY,
    },
  });
  const json = await res.json();

  return resasResponseSchema[path].parse(json) as ResasResponse[Path];
};
