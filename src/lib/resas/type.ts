import { z } from 'zod';

export type ResasRequestParams = {
  '/api/v1/prefectures': null;
  '/api/v1/population/composition/perYear': {
    prefCode: number;
    cityCode: number | '-';
  };
};

export const resasResponseSchema = {
  '/api/v1/prefectures': z.object({
    result: z.array(
      z.object({
        prefCode: z.number(),
        prefName: z.string(),
      })
    ),
  }),
  '/api/v1/population/composition/perYear': z.object({
    result: z.object({
      boundaryYear: z.number(),
      data: z.array(
        z.union([
          z.object({
            label: z.literal('総人口'),
            data: z.array(
              z.object({
                year: z.number(),
                value: z.number(),
              })
            ),
          }),
          z.object({
            label: z.string(),
            data: z.array(
              z.object({
                year: z.number(),
                value: z.number(),
                rate: z.number(),
              })
            ),
          }),
        ])
      ),
    }),
  }),
};

export type ResasResponse = {
  [K in keyof typeof resasResponseSchema]: z.infer<
    typeof resasResponseSchema[K]
  >;
};
