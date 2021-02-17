import React from 'react';
import { IRouterProps, MutatieFollow } from '../types';
import { useInfiniteQuery, useMutation, InfiniteData } from 'react-query';
import { axiosInstance, queryClient } from '../../fetcher';
import AuthorList from '../../Components/AuthorList';

interface AuthorItem {
  id: number;
  name: string;
  avatar: string;
  desc: string;
  unfollow?: boolean;
}

const PAGE_SIZE = 20;
const QUERY_KEY = 'recommendList';

const fetchRmdList = (queryKey: any) => {
  console.log('queryKeyqueryKey', queryKey);
  const url = `/follow/recommend`;
  return axiosInstance.get(url, {
    params: {
      page: 1,
      pagesize: PAGE_SIZE
    }
  }).then(res => res.data.data);
};

export default function Recommend(props: IRouterProps) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery<AuthorItem[], unknown, AuthorItem>(QUERY_KEY, fetchRmdList, {
    getNextPageParam: (lastPage, pages) => {
      // 返回undefined后hasNextPage为false
      if (lastPage.length < PAGE_SIZE) {
        return;
      }
      const len = pages.length;
      return len + 1;
    },
  });

  const { mutateAsync } = useMutation<AuthorItem, unknown, MutatieFollow>(
    params => axiosInstance.post('/follow/follow', params).then(res => res.data)
  );

  const onCancelFollow = async (id: number, type: boolean) => {
    const newType = !type;
    await mutateAsync({
      author_id: id,
      type: newType
    });

    queryClient.setQueryData<InfiniteData<AuthorItem[]> | undefined>(QUERY_KEY, old => {
      if (!old) {
        return;
      }
      const { pages } = old;
      return pages.map(d => {
        d.forEach(item => {
          if (item.id === id) {
            item.unfollow = newType;
          }
        })
      })
    })

  };

  // @ts-ignore 无语
  const { pages } = data;
  const hasMore = !isFetching && !isFetchingNextPage && !hasNextPage;
  const data2Use = (pages as AuthorItem[]).reduce<AuthorItem[]>((pre, cur) => pre.concat(cur), []);

  return (
    <React.Fragment>
      <h1>推荐关注</h1>
      <AuthorList
        onCancelFollow={onCancelFollow}
        data={data2Use}
        initialLoad={true}
        recommend={true}
        handleMore={() => {
          fetchNextPage()
        }}
        hasMore={hasMore}
      />
    </React.Fragment>
  );
}
