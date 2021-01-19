import React from 'react';
import axios from 'axios';
import { IRouterProps } from '../types';
import { fetcher } from '../../fetcher';
import { useSWRInfinite } from 'swr';
import AuthorList from '../../Components/AuthorList';

interface IAuthorItem {
  id: number;
  name: string;
  avatar: string;
  desc: string;
  unfollow?: boolean;
}

const getKey = (pageIndex: number, previousPageData: IAuthorItem[] | null) => {
  if (previousPageData && !previousPageData.length) {
    return null;
  }
  return `/follow/recommend?page=${pageIndex + 1}&pagesize=3`;
};


export default function Recommend(props: IRouterProps) {
  const { data, size, error, isValidating, setSize, mutate } = useSWRInfinite(getKey, fetcher);

  const isLoadingInitialData = !data && !error;

  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && data[size - 1] === undefined);

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length === 0);

  const isRefreshing = isValidating && data && data.length === size;


  if (!data) return <div>'loading'</div>;

  const onCancelFollow = async (id: number, type: boolean) => {
    const newData = data.map((list: IAuthorItem[]) => {
      return list.map((d) => {
        if (d.id === id) {
          return { ...d, unfollow: !type };
        }
        return d;
      });
    });
    await axios.post('http://localhost:3000/api/follow/follow', {
      author_id: id,
      type: +!type,
    });

    mutate(newData, false);
  };


  const list2Use = data.reduce((pre, cur) => pre.concat(cur), []);

  const hasMore = !isLoadingMore && !isRefreshing && !isReachingEnd;

  return (
    <React.Fragment>
      <h1>推荐关注</h1>
      <AuthorList
        onCancelFollow={onCancelFollow}
        data={list2Use}
        recommend={true}
        handleMore={setSize}
        hasMore={hasMore}
      />
    </React.Fragment>
  );
}
