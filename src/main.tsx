import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'ress/dist/ress.min.css';
import './global.css';

import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

if (import.meta.env.DEV) {
  const { default: axe } = await import('@axe-core/react');
  const React = await import('react');
  const ReactDOM = await import('react-dom');

  axe(React, ReactDOM, 1000);
}
