import React from 'react';
import axios from 'axios';
import { IRouterProps } from '../types';
import { useFetchData } from '../../fetcher';
import AuthorList from '../../Components/auhtorList';
import './index.less';
import { Image, Avatar } from 'antd';

interface IAuthorItem {
  id: number;
  name: string;
  avatar: string;
  desc: string;
  unfollow?: boolean;
}

export default function Author(props: IRouterProps) {
  const { authorId } = props;
  const { data, isError, mutate } = useFetchData(
    '/author/detail?id=' + authorId,
    undefined,
    {
      revalidateOnFocus: false,
    }
  );
  if (isError) return <div>isError</div>;

  return (
    <div className='author'>
      <div className='author--bg'></div>
      <Avatar
        className='author--avatar'
        size='large'
        src={
          data.avatar ||
          'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        }
      />
      {/* <span className='author--avatar__border'></span> */}
      <div className='author--detail'>
        <div className='author--detail__name'>{data.name}</div>
        <div className='author--detail__desc'>{data.desc}</div>
      </div>
    </div>
  );
}
