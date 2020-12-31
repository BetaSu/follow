import React, { useState, useEffect } from 'react';
import { IRouterProps } from '../types';
import * as axios from 'axios';

function User(props: IRouterProps) {
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
        <div>{author.name}</div>
      ))}
    </div>
  );
}

export default User;
