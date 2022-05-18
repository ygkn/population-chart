import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { describe, expect, test } from 'vitest';

import { getPopulation, prefecturesResponse } from '@/test/server';
import { waitForRequest } from '@/test/util/waitForRequest';

import { fetchResasApi } from './fetchResasApi';

describe('fetchResasApi', () => {
  test('パラメータなしで fetch できる', async () => {
    const result = await fetchResasApi('/api/v1/prefectures');

    expect(result).toEqual(prefecturesResponse);
  });

  test('パラメータありで fetch できる', async () => {
    const result = await fetchResasApi(
      '/api/v1/population/composition/perYear',
      {
        prefCode: 1,
        cityCode: '-',
      }
    );

    expect(result).toEqual(getPopulation(1));
  });

  test('API KEY がリクエストヘッダに含まれる', async () => {
    const pendingRequest = waitForRequest(
      'GET',
      'https://opendata.resas-portal.go.jp/api/v1/prefectures'
    );

    await fetchResasApi('/api/v1/prefectures');

    const request = await pendingRequest;

    expect(request.headers.get('X-API-KEY')).toBe(
      import.meta.env.VITE_RESAS_API_KEY
    );
  });

  test('params がリクエストパラメータに含まれる', async () => {
    const pendingRequest = waitForRequest(
      'GET',
      'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear'
    );

    await fetchResasApi('/api/v1/population/composition/perYear', {
      prefCode: 1,
      cityCode: '-',
    });

    const request = await pendingRequest;

    expect(request.url.searchParams.get('prefCode')).toBe('1');
    expect(request.url.searchParams.get('cityCode')).toBe('-');
  });

  test('想定されていないレスポンスが返ってきた場合はエラーになる', async () => {
    const wrongServer = setupServer(
      rest.get(
        'https://opendata.resas-portal.go.jp/api/v1/prefectures',
        (_, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json({
              result: [
                {
                  prefCode: '1',
                  prefName: null,
                },
              ],
            })
          )
      )
    );

    wrongServer.listen({ onUnhandledRequest: 'error' });

    expect(fetchResasApi('/api/v1/prefectures')).rejects.toThrowError();

    wrongServer.close();
  });
});
