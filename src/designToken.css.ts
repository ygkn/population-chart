import { createGlobalTheme } from '@vanilla-extract/css';

const spaceRatio = 1.5;

const color = {
  primary: {
    background: '#2196f3',
    text: 'rgba(0 0 0 / 0.8)',
  },
  base: {
    background: '#e3f2fd',
    text: 'rgba(0 0 0 / 0.8)',
  },
};

const fontFamily = {
  body: [
    'Helvetica Neue',
    'Arial',
    'Hiragino Kaku Gothic ProN',
    'Hiragino Sans',
    'Meiryo',
    'Noto Sans JP',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji',
  ]
    .map((font) => (font.includes(' ') ? `"${font}"` : font))
    .join(', '),
};

const space = {
  '-5': `${Math.pow(spaceRatio, -5)}rem`,
  '-4': `${Math.pow(spaceRatio, -4)}rem`,
  '-3': `${Math.pow(spaceRatio, -3)}rem`,
  '-2': `${Math.pow(spaceRatio, -2)}rem`,
  '-1': `${Math.pow(spaceRatio, -1)}rem`,
  '0': '1rem',
  '1': `${Math.pow(spaceRatio, 1)}rem`,
  '2': `${Math.pow(spaceRatio, 2)}rem`,
  '3': `${Math.pow(spaceRatio, 3)}rem`,
  '4': `${Math.pow(spaceRatio, 4)}rem`,
  '5': `${Math.pow(spaceRatio, 5)}rem`,
};

export const vars = createGlobalTheme(':root', {
  color,
  fontFamily,
  space,
});
