import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query'

import './reset.less';
import App from './App';
import { queryClient } from './fetcher';


// @ts-ignore
const root = ReactDOM.unstable_createRoot(document.getElementById('root'));

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);