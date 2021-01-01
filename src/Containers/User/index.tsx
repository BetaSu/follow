import React from 'react';
import { IRouterProps } from '../types';
import { useFetchData } from '../../Fetch';

export default function User(props: IRouterProps) {
  const { data, isError } = useFetchData('/follow');
  if (isError) return <div>isError</div>;

  return (
    <div>
      <h1>您所订阅的大佬列表</h1>
      {(data?.data || []).map((author: any) => (
        <div key={author.id}>{author.name}</div>
      ))}
    </div>
  );
}
