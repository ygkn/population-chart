import { style } from '@vanilla-extract/css';

import { vars } from '@/designToken.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

export const header = style({
  padding: vars.space[0],
  backgroundColor: vars.color.primary.background,
  color: vars.color.primary.text,
  textAlign: 'center',
});

export const headerHeading = style({
  fontWeight: 'normal',
  fontSize: '1.5rem',
});

export const main = style({
  flex: 1,
  width: '100%',
  maxWidth: '80ch',
  margin: '0 auto',
  padding: vars.space[0],
});
