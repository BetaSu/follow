import React, { Suspense } from 'react';
import { Router } from '@reach/router';
import User from './Containers/User';
import Flow from './Containers/Flow';
import 'antd/dist/antd.css';
import './App.less';
import Recommend from './Containers/Recommend';

const Loading = () => {
  return <p>loading~</p>;
};

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <User path='/user' />
        <Flow path='/' />
        <Recommend path='/recommend' />
      </Router>
    </Suspense>
  );
}
