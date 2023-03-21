import { useQuery } from '@tanstack/react-query';
import { getLabels } from '../api';

export const useLabels = () => {
  const query = useQuery(['labels'], getLabels, {
    staleTime: 1000 * 60 * 60,
    placeholderData: [
      {
        id: 69105383,
        node_id: 'MDU6TGFiZWw2OTEwNTM4Mw==',
        url: 'https://api.github.com/repos/facebook/react/labels/Browser:%20IE',
        name: 'Browser: IE',
        color: 'c7def8',
        default: false
      },
      {
        id: 69105358,
        node_id: 'MDU6TGFiZWw2OTEwNTM1OA==',
        url: 'https://api.github.com/repos/facebook/react/labels/Browser:%20Safari',
        name: 'Browser: Safari',
        color: 'c7def8',
        default: false
      }
    ]
  });
  return query;
};
