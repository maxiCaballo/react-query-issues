import { useQuery } from '@tanstack/react-query';
import { getComments } from '../api';

export const useComments = (comments_url: string) => {
  const commentsQuery = useQuery(['comments'], () => getComments(comments_url));
  return {
    commentsQuery
  };
};
