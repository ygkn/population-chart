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
