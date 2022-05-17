import { ResasRequestParams, ResasResponse, resasResponseSchema } from './type';

const baseUrl = 'https://opendata.resas-portal.go.jp';

/**
 * @see https://opendata.resas-portal.go.jp/docs/api/v1/index.html
 */
export const fetchResasApi = async <Path extends keyof ResasRequestParams>(
  path: Path,
  // Hack to omit `params` argument if unnecessary.
  ...[params]: ResasRequestParams[Path] extends null
    ? []
    : [params: ResasRequestParams[Path]]
): Promise<ResasResponse[Path]> => {
  const url = new URL(path, baseUrl);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, `${value}`);
    }
  }

  const res = await fetch(url.href, {
    headers: {
      'X-API-KEY': import.meta.env['RESAS_API_KEY'],
    },
  });
  const json = await res.json();

  return resasResponseSchema[path].parse(json) as ResasResponse[Path];
};
