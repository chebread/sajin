import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from 'GlobalStyles';
import Router from 'components/Router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyles />
    <Router />
  </>
);
