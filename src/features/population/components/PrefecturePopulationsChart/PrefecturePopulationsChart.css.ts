import { style } from '@vanilla-extract/css';

import { vars } from '@/designToken.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.space[1],
});

export const chartContainer = style({
  width: '100%',
});

export const chart = style({
  width: '100%',
});
