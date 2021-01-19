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
}

interface IAuthorItem {
  id: number;
  name: string;
  avatar: string;
  desc: string;
  unfollow?: boolean;
}

export default function AuthorList(props: IAuthorListProps) {
  const { data, onCancelFollow, recommend, handleMore, hasMore } = props;

  return (
    <div className="follow-scroll-wrapper">
      <InfiniteScroll
        className='follow'
        // swr会完成初次请求
        initialLoad={false}
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
    </div>
  );
}
