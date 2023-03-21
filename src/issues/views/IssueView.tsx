import { Link, useParams, Navigate } from 'react-router-dom';
import { IssueComment } from '../components/IssueComment';
import { useIssue } from '../../hooks/useIssue';
import { LoadingSpinner } from '../components/loadingSpinner';

export const IssueView = () => {
  const { id = 0 } = useParams();
  const { issueQuery, commentsQuery } = useIssue(Number(id));

  if (issueQuery.isLoading) return <LoadingSpinner />;

  if (issueQuery.isError) <Navigate to='/' />;
  return (
    <div className='row mb-5'>
      <div className='col-12 mb-3'>
        <Link to='./issues/list'>Go Back</Link>
      </div>

      {/* Primer comentario */}
      <IssueComment item={issueQuery.data!} />

      {commentsQuery.isLoading && <LoadingSpinner />}

      {/* Comentario de otros */}
      {commentsQuery.data?.map((comment) => (
        <IssueComment item={comment} />
      ))}
    </div>
  );
};
