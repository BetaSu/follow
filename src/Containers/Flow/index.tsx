import React, { useRef, useEffect } from 'react';
import { IRouterProps } from '../types';
import { useFetchFlowData } from '../../fetcher';
import { List, Avatar, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import './style.less';

interface FlowCard {
  author: string;
  author_id: number;
  description: string;
  id: number;
  link: string;
  pubDate: string;
  source: string;
  title: string;
}


function getFlowListRequestUrl(pageIndex?: number) {
  // console.log('pageIndex', pageIndex, pageIndex === 0 ? 'reload' : 'append');
  return `/flow/list?action=${pageIndex === 0 ? 'reload' : 'append'}`;
}

const swrOptions = {

}

export default function Flow(props: IRouterProps) {
  const { data, hasMore, isLoadingMore, setSize, isReachingEnd } = useFetchFlowData(getFlowListRequestUrl, swrOptions);

  const list2Use = data?.reduce((list, curList) => {
    return list.concat(curList);
  }, []) || [];


  console.log('isReachingEnd:', isReachingEnd);

  return (
    <div className="scroll-wrapper">
      <InfiniteScroll
        className='flow'
        initialLoad={false}
        pageStart={1}
        threshold={100}
        loadMore={a => {
          console.log('loadMore:', a);
          setSize(a)
        }}
        hasMore={hasMore}
        useWindow={false}
      >
        <List
          itemLayout='vertical'
          dataSource={list2Use}
          loading={isLoadingMore}
          // size="large"
          renderItem={(card: FlowCard) => (
            <List.Item
              key={card.id}
            // actions={}
            >
              {/* <Skeleton avatar={true} title={false} loading={true} active={true}> */}
              <List.Item.Meta
                avatar={
                  <Avatar
                    size='large'
                    src={
                      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                    }
                  />
                }
                title={card.author}
                description={new Date(card.pubDate).toLocaleString()}
              />
              <div className="flow-card-content" dangerouslySetInnerHTML={{ __html: card.description }} />
              {/* </Skeleton> */}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
}
