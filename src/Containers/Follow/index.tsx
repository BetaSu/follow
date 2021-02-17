import React from 'react';
import axios from 'axios';
import { useQuery, useMutation } from 'react-query';

import { IRouterProps, MutatieFollow } from '../types';
import { axiosInstance } from '../../fetcher';
import AuthorList from '../../Components/AuthorList';

interface IAuthorItem {
  id: number;
  name: string;
  avatar: string;
  desc: string;
  unfollow?: boolean;
}



export default function User(props: IRouterProps) {
  const { data } = useQuery('follow', () => axiosInstance.get('/follow').then(res => res.data.data));
  const { mutate } = useMutation<unknown, unknown, MutatieFollow>(params => axiosInstance.post('/follow/follow', params))

  const onCancelFollow = async (id: number, type: boolean) => {
    mutate({
      author_id: id,
      type,
    });
  };

  return (
    <AuthorList
      onCancelFollow={onCancelFollow}
      title='我的关注'
      data={data}
      handleMore={() => { }}
      hasMore={true}
    />
  );
}
