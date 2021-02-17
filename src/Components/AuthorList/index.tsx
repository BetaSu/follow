import React from 'react';
import { List, Avatar, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import './index.less';

interface IAuthorListProps {
  title?: string;
  data: IAuthorItem[];
  onCancelFollow: (id: number, type: boolean) => void;
  recommend?: boolean;
  handleMore: (size: number) => void;
  hasMore: boolean;
  initialLoad?: boolean;
}

interface IAuthorItem {
  id: number;
  name: string;
  avatar: string;
  desc: string;
  unfollow?: boolean;
}

export default function AuthorList(props: IAuthorListProps) {
  const { data, onCancelFollow, recommend, handleMore, hasMore, initialLoad } = props;

  return (
    <InfiniteScroll
      className='follow'
      initialLoad={!!initialLoad}
      pageStart={1}
      threshold={5}
      loadMore={handleMore}
      hasMore={hasMore}
      useWindow={false}
    >
      <List
        itemLayout='horizontal'
        dataSource={data}
        // size="large"
        renderItem={(author: IAuthorItem) => (
          <List.Item
            key={author.id}
            actions={[
              <Button
                key={author.id}
                type='primary'
                onClick={() => {
                  onCancelFollow(author.id, !!author.unfollow);
                }}
              >
                {author.unfollow
                  ? recommend
                    ? '取消关注'
                    : '关注'
                  : recommend
                    ? '关注'
                    : '取消关注'}
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  size='large'
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
    </InfiniteScroll>
  );
}
