import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { describe, expect, test } from 'vitest';

import { waitForRequest } from '@/test/util/waitForRequest';

import { fetchResasApi } from './fetchResasApi';
import type { ResasResponse } from './type';

const prefectures: ResasResponse['/api/v1/prefectures'] = {
  result: [
    {
      prefCode: 1,
      prefName: '北海道',
    },
    {
      prefCode: 2,
      prefName: '青森県',
    },
    {
      prefCode: 3,
      prefName: '岩手県',
    },
  ],
};

const populationCompositionPerYear: ResasResponse['/api/v1/population/composition/perYear'] =
  {
    result: {
      boundaryYear: 2015,
      data: [
        {
          label: '総人口',
          data: [
            {
              year: 2015,
              value: 100,
            },
            {
              year: 2020,
              value: 200,
            },
          ],
        },
        {
          label: '年少人口',
          data: [
            {
              year: 2015,
              value: 10,
              rate: 0.1,
            },
            {
              year: 2020,
              value: 20,
              rate: 0.2,
            },
          ],
        },
      ],
    },
  };

describe('fetchResasApi', () => {
  const server = setupServer(
    rest.get(
      'https://opendata.resas-portal.go.jp/api/v1/prefectures',
      (_, res, ctx) => res(ctx.status(200), ctx.json(prefectures))
    ),
    rest.get(
      'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear',
      (_, res, ctx) =>
        res(ctx.status(200), ctx.json(populationCompositionPerYear))
    )
  );

  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

  afterAll(() => server.close());

  afterEach(() => server.resetHandlers());

  test('パラメータなしで fetch できる', async () => {
    const result = await fetchResasApi('/api/v1/prefectures');

    expect(result).toEqual(prefectures);
  });

  test('パラメータありで fetch できる', async () => {
    const result = await fetchResasApi(
      '/api/v1/population/composition/perYear',
      {
        prefCode: 1,
        cityCode: '-',
      }
    );

    expect(result).toEqual(populationCompositionPerYear);
  });

  test('API KEY がリクエストヘッダに含まれる', async () => {
    const pendingRequest = waitForRequest(
      server,
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
      server,
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
