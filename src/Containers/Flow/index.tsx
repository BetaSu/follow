import React, { useRef } from 'react';
import { IRouterProps } from '../types';
import { useFetchData } from '../../fetcher';

export default function Flow(props: IRouterProps) {
  const lastUpdateFlowTimeRef = useRef('');
  const { data: { list, time }, isError, mutate } = useFetchData('/flow/list', {
    time: lastUpdateFlowTimeRef.current
  }, {
    revalidateOnFocus: false,
  });

  lastUpdateFlowTimeRef.current = time;

  return (
    <ul>{list.map((a: any) => <li key={a.id}>{a.title}</li>)}</ul>
  );
}
