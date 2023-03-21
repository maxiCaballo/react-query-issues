import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getIssues } from '../api';
import { TState } from '../interfaces/issue';

interface Props {
  state?: TState;
  labels: string[];
}

export const useIssues = ({ state, labels }: Props) => {
  const [page, setPage] = useState(1);
  const issuesQuery = useQuery(['issues', { state, labels, page }], () => getIssues({ labels, state, page }));

  useEffect(() => {
    setPage(1);
  }, [labels, state]);

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;

    setPage(page + 1);
  };
  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  return {
    //Properties
    issuesQuery,
    //Getters
    page: issuesQuery.isFetching && issuesQuery ? 'Loading' : page,
    //Setters
    nextPage,
    prevPage
  };
};
