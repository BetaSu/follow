import './App.less';
import * as React from 'react';
import { Router } from '@reach/router';
import User from './User/index';

console.log('test precommit12');
function App() {
  return (
    <div className='App'>
      <Router>
        <User path='/user' />
      </Router>
    </div>
  );
}

export default App;
