import React, { useRef, useEffect } from 'react';
import { IRouterProps } from '../types';
import { useInfiniteQuery } from 'react-query';
import { List, Avatar, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { axiosInstance } from '../../fetcher'

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


function fetchFlowList(queryKey: any) {
  const url = `/flow/list?action=${queryKey.pageIndex === 0 ? 'reload' : 'append'}`;
  return axiosInstance.get(url).then(res => res.data.data);
}

export default function Flow(props: IRouterProps) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery('flowList', fetchFlowList);

  console.log('data', data);

  return <h3>32</h3>

  // return (
  //   <div className="scroll-wrapper">
  //     <InfiniteScroll
  //       className='flow'
  //       initialLoad={false}
  //       pageStart={1}
  //       threshold={100}
  //       loadMore={a => {
  //         console.log('loadMore:', a);
  //       }}
  //       hasMore={hasNextPage}
  //       useWindow={false}
  //     >
  //       <List
  //         itemLayout='vertical'
  //         dataSource={data}
  //         loading={isFetching}
  //         // size="large"
  //         renderItem={(card: FlowCard) => (
  //           <List.Item
  //             key={card.id}
  //           // actions={}
  //           >
  //             {/* <Skeleton avatar={true} title={false} loading={true} active={true}> */}
  //             <List.Item.Meta
  //               avatar={
  //                 <Avatar
  //                   size='large'
  //                   src={
  //                     'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  //                   }
  //                 />
  //               }
  //               title={card.author}
  //               description={new Date(card.pubDate).toLocaleString()}
  //             />
  //             <div className="flow-card-content" dangerouslySetInnerHTML={{ __html: card.description }} />
  //             {/* </Skeleton> */}
  //           </List.Item>
  //         )}
  //       />
  //     </InfiniteScroll>
  //   </div>
  // );
}
