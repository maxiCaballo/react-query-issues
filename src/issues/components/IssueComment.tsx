import { FC } from 'react';
import { IIssue } from '../../interfaces/issue';
import ReactMarkdown from 'react-markdown';
import { IComments } from '../../interfaces/comments';

interface Props {
  item: IIssue | IComments;
}

export const IssueComment: FC<Props> = ({ item }) => {
  return (
    <div className='col-12'>
      <div className='card border-white mt-2'>
        <div className='card-header bg-dark'>
          <img src={item.user.avatar_url} alt='User Avatar' className='avatar' />
          <span className='mx-2'>{item.user.login}</span>
        </div>
        <div className='card-body text-dark'>
          <ReactMarkdown>{item.body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
