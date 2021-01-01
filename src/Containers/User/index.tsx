import React, { useState, useEffect } from 'react';
import { IRouterProps } from '../types';
import * as axios from 'axios';

// import './style.less';

export default function User(props: IRouterProps) {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios.default.get('http://127.0.0.1:8360/folow').then((res) => {
      setAuthors(res.data);
    });
  });

  return (
    <div>
      <h1>您所订阅的大佬列表</h1>
      {authors.map((author: any) => (
        <div key={author.id}>{author.name}</div>
      ))}
    </div>
  );
}
