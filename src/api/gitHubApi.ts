import axios from 'axios';
import { IIssue, ILabel, IComments, TState } from '../interfaces';

interface Props {
  labels: string[];
  state?: TState;
  page?: number;
}
interface InfiniteScrollProps {
  pageParam?: number;
  queryKey: (string | Props)[];
}

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time * 1000);
  });
}

const gitHubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization:
      'Bearer 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'
  }
});

export const getLabels = async (): Promise<ILabel[]> => {
  const { data } = await gitHubApi.get<ILabel[]>('/labels');
  return data;
};
export const getIssues = async ({ labels, state, page = 1 }: Props): Promise<IIssue[]> => {
  await sleep(2);

  const params = new URLSearchParams();
  if (state) params.append('state', state);

  if (labels.length > 0) {
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }

  params.append('page', page.toString());
  params.append('per_page', '5');

  const { data } = await gitHubApi.get<IIssue[]>('/issues', { params });
  return data;
};

export const getIssuesInfiniteScroll = async ({ pageParam = 1, queryKey }: InfiniteScrollProps): Promise<IIssue[]> => {
  //El page param en la page 1 viene como undefined entonces si viene udefined lo inicializo en 1
  await sleep(2);

  const [, , args] = queryKey; // La queryKey es en este caso ['issues', 'infinite', {state, labels, page = 1}]
  const { state, labels } = args as Props;

  const params = new URLSearchParams();
  if (state) params.append('state', state);

  if (labels.length > 0) {
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }

  params.append('page', pageParam.toString());
  params.append('per_page', '5');

  const { data } = await gitHubApi.get<IIssue[]>('/issues', { params });
  return data;
};

export const getIssue = async (issueNumber: number): Promise<IIssue> => {
  const { data } = await gitHubApi.get<IIssue>(`/issues/${issueNumber}`);
  return data;
};

export const getComments = async (issueNumber: number): Promise<IComments[]> => {
  const { data } = await gitHubApi.get<IComments[]>(`/issues/${issueNumber}/comments`);
  return data;
};
