import axios from 'axios';
import { IIssue, ILabel, IComments, TState } from '../interfaces';

interface Props {
  labels: string[];
  state?: TState;
  page?: number;
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
export const getIssue = async (issueNumber: number): Promise<IIssue> => {
  const { data } = await gitHubApi.get<IIssue>(`/issues/${issueNumber}`);
  return data;
};

export const getComments = async (issueNumber: number): Promise<IComments[]> => {
  const { data } = await gitHubApi.get<IComments[]>(`/issues/${issueNumber}/comments`);
  return data;
};
