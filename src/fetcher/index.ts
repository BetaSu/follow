import axios from 'axios';
import useSWR, { ConfigInterface } from 'swr';
import { PlainObject } from '../Containers/types';

export const fetcher = (url: string) => {
  url = 'http://localhost:3000/api' + url;
  return axios.get(url).then((res) => res.data.data);
};

function createGetUrl(url: string, params?: PlainObject) {
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

export function useFetchData(
  url: string,
  params?: PlainObject,
  swrOption?: ConfigInterface
) {
  if (!url) {
    throw new Error('必须包含url参数！');
  }

  const { data, error, mutate } = useSWR(createGetUrl(url, params), fetcher, {
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
