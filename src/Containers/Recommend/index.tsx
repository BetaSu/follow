import React from 'react';
import axios from 'axios';
import { IRouterProps } from '../types';
import { useFetchFlowData, requestPrefix } from '../../fetcher';
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
  return `/follow/recommend?page=${pageIndex + 1}&pagesize=20`;
};

const swrOption = {}

export default function Recommend(props: IRouterProps) {
  const { data, setSize, mutate, hasMore } = useFetchFlowData(getKey, swrOption);


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
    await axios.post(`${requestPrefix}/follow/follow`, {
      author_id: id,
      type: +!type,
    });

    mutate(newData, false);
  };


  const list2Use = data.reduce((pre, cur) => pre.concat(cur), []);

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
