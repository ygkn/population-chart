import { globalStyle } from '@vanilla-extract/css';

import { vars } from './designToken.css';

globalStyle('body', {
  fontFamily: vars.fontFamily.body,
  backgroundColor: vars.color.base.background,
  color: vars.color.base.text,
});
