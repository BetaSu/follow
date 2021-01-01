import React from 'react';
import { IRouterProps } from '../types';
import { useFetchData } from '../../Fetch';
import { List, Avatar, Button } from 'antd';

import './index.less';

export default function User(props: IRouterProps) {
  const { data, isError } = useFetchData('/follow');
  if (isError) return <div>isError</div>;

  return (
    <div className='follow'>
      <h1>您所订阅的大佬列表</h1>
      <List
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(author: any) => (
          <List.Item actions={[<Button type='primary'>关注</Button>]}>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={
                    author.avatar ||
                    'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                  }
                />
              }
              title={<a href={'/author/' + author.id}>{author.name}</a>}
              description={author.desc}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
