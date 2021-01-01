import './App.less';
import * as React from 'react';
import { Router } from '@reach/router';
import User from './Containers/User';
import Flow from './Containers/Flow';

export default function App() {
  return (
    <div className='App'>
      <Router>
        <User path='/user' />
        <Flow path='/' />
      </Router>
    </div>
  );
}
