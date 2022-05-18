import { rest } from 'msw';
import { setupServer } from 'msw/node';

import type { ResasRequestParams, ResasResponse } from '@/lib/resasApi/type';

import { totalPopulations } from './fixtures/population';
import { prefectures } from './fixtures/prefecture';

export const prefecturesResponse: ResasResponse['/api/v1/prefectures'] = {
  result: prefectures.map(({ code, name }) => ({
    prefCode: code,
    prefName: name,
  })),
};

export const getPopulation = (
  prefCode: ResasRequestParams['/api/v1/population/composition/perYear']['prefCode']
): ResasResponse['/api/v1/population/composition/perYear'] => ({
  result: {
    boundaryYear: 2015,
    data: [
      {
        label: '総人口',
        data: totalPopulations
          .map((population) => ({
            year: population.year,
            value: population[prefCode],
          }))
          .filter(
            (data): data is { year: number; value: number } =>
              data.value !== undefined
          ),
      },
      {
        label: '年少人口',
        data: totalPopulations
          .map((population) => ({
            year: population.year,
            value: population[prefCode],
          }))
          .filter(
            (data): data is { year: number; value: number } =>
              data.value !== undefined
          )
          .map((data) => ({
            year: data.year,
            value: data.value * 0.1,
            rate: 0.1,
          })),
      },
    ],
  },
});

export const server = setupServer(
  rest.get(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures',
    (_, res, ctx) => res(ctx.status(200), ctx.json(prefecturesResponse))
  ),
  rest.get(
    'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear',
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json(getPopulation(Number(req.url.searchParams.get('prefCode'))))
      )
  )
);
