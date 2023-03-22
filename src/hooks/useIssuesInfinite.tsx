import { useInfiniteQuery } from '@tanstack/react-query';
import { TState } from '../interfaces';
import { getIssuesInfiniteScroll } from '../api/gitHubApi';

interface Props {
  state?: TState;
  labels: string[];
}

export const useIssuesInfinite = ({ state, labels }: Props) => {
  const issuesQuery = useInfiniteQuery(
    ['issues', 'infinite', { state, labels }],
    (data) => getIssuesInfiniteScroll(data),
    {
      //getNextPageParam()
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return; //No hay mas paginas no tengo mas datos

        return pages.length + 1;
      }
    }
  );
  return {
    issuesQuery
  };
};
