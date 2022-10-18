import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from 'GlobalStyles';
import App from 'App';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 1500,
      }}
    />
    <GlobalStyles />
    <App />
  </RecoilRoot>
);
