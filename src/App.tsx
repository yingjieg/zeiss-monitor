import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Monitor from './pages/Monitor';

import './App.less';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <Monitor />
  </StrictMode>,
);
