import type { ReactFramework, StoryContext } from '@storybook/react';
import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';

import { prefectures } from '@/test/fixtures/prefecture';

import type { Props } from './SelectPrefecture';
import * as stories from './SelectPrefecture.stories';

const { Default, Selected } = composeStories(stories);

test('チェックボックスがすべて表示されている', () => {
  const screen = render(<Default />);

  for (const prefecture of prefectures) {
    const checkbox = screen.getByLabelText(prefecture.name);
    expect(checkbox).toBeVisible();
    expect((checkbox as HTMLInputElement).checked).toBe(false);
  }
});

test('項目を選択するとチェックされる', async () => {
  const screen = render(<Selected />);

  await stories.Selected.play?.({
    canvasElement: screen.container,
  } as StoryContext<ReactFramework, Props>);

  const hokkaidoCheckbox = screen.getByLabelText('北海道');
  expect(hokkaidoCheckbox).toBeVisible();
  expect((hokkaidoCheckbox as HTMLInputElement).checked).toBe(false);
});
