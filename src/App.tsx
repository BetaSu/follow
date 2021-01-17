import React, { Suspense } from 'react';
import { Router } from '@reach/router';
import User from './Containers/User';
import Flow from './Containers/Flow';
import 'antd/dist/antd.css';
import './App.less';
import Recommend from './Containers/Recommend';
import Author from './Containers/Author';

const Loading = () => {
  return <p>loading~</p>;
};

export default function App() {
  return (
    <div className='f-container'>
      <Suspense fallback={<Loading />}>
        <Router>
          <User path='/user' />
          <Flow path='/' />
          <Recommend path='/recommend' />
          <Author path='/author/:authorId' />
        </Router>
      </Suspense>
    </div>
  );
}
