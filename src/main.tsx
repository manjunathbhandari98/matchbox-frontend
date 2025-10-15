import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { store } from './app/store.ts';
import './index.css';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster/>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
