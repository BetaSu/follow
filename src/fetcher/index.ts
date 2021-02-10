import axios from 'axios';
import useSWR, { ConfigInterface, useSWRInfinite } from 'swr';
import { PlainObject } from '../Containers/types';

export const requestPrefix = 'http://localhost:3000/api';

export const axiosFetcher = (url: string) => {
  url = requestPrefix + url;
  console.log('fetch~', url);
  return axios.get(url).then((res) => res.data.data);
};

// 将请求参数拼装在请求url上
export function parseParams2RequestUrl(url: string, params?: PlainObject) {
  let targetUrl = url;
  if (typeof params === 'object') {
    const sp = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      const val = params[key];
      if (val === undefined || val === null) {
        return;
      }
      sp.set(key, val);
    });
    targetUrl += `?${sp}`;
  }
  return targetUrl;
}


// 请求一般数据
export const useFetchData = (
  url: string,
  swrOption?: ConfigInterface
) => {
  const { data, error, mutate } = useSWR(url, axiosFetcher, {
    suspense: true,
    ...swrOption,
  });

  return {
    data,
    mutate,
    isLoading: !error && !data,
    isError: error,
  };
}

// 请求带分页的流数据
export const useFetchFlowData = (
  requestUrlCreator: (pageIndex: number, prevPageData: any) => string | null,
  swrOption?: ConfigInterface
) => {
  const { data, size, error, isValidating, setSize, mutate } = useSWRInfinite(requestUrlCreator, axiosFetcher, {
    suspense: true,
    persistSize: true,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
    ...swrOption,
  });

  const isLoadingInitialData = !data && !error;

  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && data[size - 1] === undefined);

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length === 0);

  const isRefreshing = isValidating && data && data.length === size;


  return {
    data,
    setSize,
    mutate,
    isLoadingMore,
    isError: error,
    isReachingEnd,
    isRefreshing,
    hasMore: !isLoadingMore && !isRefreshing && !isReachingEnd
  };
}