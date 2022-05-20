import { style } from '@vanilla-extract/css';

import { vars } from '@/designToken.css';

export const labels = style({
  display: 'flex',
  flexWrap: 'wrap',
  rowGap: vars.space[-1],
  columnGap: vars.space[0],
});

export const label = style({
  display: 'flex',
  gap: vars.space[-3],
  alignItems: 'baseline',
});

export const checkbox = style({
  ':focus': {
    outline: 'currentcolor',
    outlineWidth: '2px',
    outlineOffset: '2px',
    outlineStyle: 'solid',
  },
});
