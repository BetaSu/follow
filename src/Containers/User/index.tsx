import React from 'react';
import axios from 'axios';
import { IRouterProps } from '../types';
import { useFetchData } from '../../fetcher';
import AuthorList from '../../Components/auhtorList';

interface IAuthorItem {
  id: number;
  name: string;
  avatar: string;
  desc: string;
  unfollow?: boolean;
}

export default function User(props: IRouterProps) {
  const { data, isError, mutate } = useFetchData('/follow', undefined, {
    revalidateOnFocus: false,
  });
  if (isError) return <div>isError</div>;

  const onCancelFollow = async (id: number, type: boolean) => {
    const newData = data.map((d: IAuthorItem) => {
      if (d.id === id) {
        return { ...d, unfollow: !type };
      }
      return d;
    });

    await axios.post('http://localhost:3000/api/follow/follow', {
      author_id: id,
      type: +type,
    });

    mutate(newData, false);
  };

  return (
    <AuthorList
      onCancelFollow={onCancelFollow}
      title='我的关注'
      data={data}
      handleMore={() => {}}
      hasMore={true}
    />
  );
}
