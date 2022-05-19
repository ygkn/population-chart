import type { Prefecture } from '../prefecture/types';

export type TotalPopulationsOfYear = {
  year: number;
  [prefCode: Prefecture['code']]: number;
};

export type TotalPopulationsOfPrefecture = {
  year: number;
  value: number;
};
