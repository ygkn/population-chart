import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { useCallback, useState } from 'react';

import type { Prefecture } from '../type';

import { SelectPrefecture } from './SelectPrefecture';

const meta: ComponentMeta<typeof SelectPrefecture> = {
  component: SelectPrefecture,
};

export default meta;

const prefectures: Prefecture[] = [
  {
    code: 1,
    name: '北海道',
  },
  {
    code: 2,
    name: '青森県',
  },
  {
    code: 3,
    name: '岩手県',
  },
];

const Template: ComponentStory<typeof SelectPrefecture> = () => {
  const [selected, setSelected] = useState<Set<Prefecture['code']>>(new Set());

  const handleChange = useCallback((newSelected: Set<Prefecture['code']>) => {
    setSelected(newSelected);
  }, []);

  return (
    <SelectPrefecture
      prefectures={prefectures}
      selected={selected}
      onChange={handleChange}
    />
  );
};

export const Default = Template.bind({});

export const Selected = Template.bind({});
Selected.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const hokkaidoCheckbox = canvas.getByLabelText<HTMLInputElement>('北海道');

  await userEvent.click(hokkaidoCheckbox);
};
