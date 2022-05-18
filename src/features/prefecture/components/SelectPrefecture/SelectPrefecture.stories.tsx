import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { useCallback, useState } from 'react';

import type { Prefecture } from '../../types';

import { prefectures } from '@/test/fixtures/prefecture';

import { SelectPrefecture } from './SelectPrefecture';

const meta: ComponentMeta<typeof SelectPrefecture> = {
  component: SelectPrefecture,
};

export default meta;

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
