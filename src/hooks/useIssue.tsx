import { useQuery } from '@tanstack/react-query';
import { getIssue, getComments } from '../api/gitHubApi';

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(['issue', issueNumber], () => getIssue(issueNumber));
  const commentsQuery = useQuery(['issue', issueNumber, 'comments'], () => getComments(issueNumber));
  return {
    issueQuery,
    commentsQuery
  };
};
