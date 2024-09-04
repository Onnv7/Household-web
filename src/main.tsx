import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth.context.tsx';
import { LoadingProvider } from './context/loading.context.jsx';
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
// "plugins": ["prettier-plugin-tailwindcss"],
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <LoadingProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LoadingProvider>
    <ToastContainer />
  </Provider>,
);
