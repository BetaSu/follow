import React from 'react';
import axios from 'axios';
import { IRouterProps } from '../types';
import { fetcher } from '../../fetcher';
import { useSWRInfinite } from 'swr';
import AuthorList from '../../Components/auhtorList';

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
  return `/follow/recommend?page=${pageIndex}&limit=3`;
};

export default function Recommend(props: IRouterProps) {
  const { data, size, setSize, mutate } = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
  });
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

  const allList = data.reduce((pre, cur) => pre.concat(cur), []);
  return (
    <React.Fragment>
      <AuthorList
        onCancelFollow={onCancelFollow}
        title='推荐关注'
        data={allList}
        recommend={true}
      />
      <button onClick={() => setSize(size + 1)}>Load More</button>
    </React.Fragment>
  );
}
