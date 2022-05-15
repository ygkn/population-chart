import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'ress/dist/ress.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <h1>Hello</h1>
  </StrictMode>
);
