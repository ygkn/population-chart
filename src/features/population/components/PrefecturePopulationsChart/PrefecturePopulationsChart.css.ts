import { style } from '@vanilla-extract/css';

import { vars } from '@/designToken.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.space[1],
});
