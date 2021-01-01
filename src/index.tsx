import React from 'react';
import ReactDOM from 'react-dom';
import './reset.less';
import App from './App';


// @ts-ignore
const root = ReactDOM.unstable_createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);