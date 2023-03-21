import { IGithubUser } from './githubUser';
import { IReactions } from './reactions';

export interface IIssue {
  url: string;
  html_url: string;
  id: number;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  node_id: string;
  number: number;
  title: string;
  user: IGithubUser;
  labels: (ILabel | ILabels2 | ILabels3)[];
  state: TState;
  locked: boolean;
  assignee?: any;
  assignees: any[];
  milestone?: any;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: any;
  author_association: string;
  active_lock_reason?: any;
  body: string;
  reactions: IReactions;
  timeline_url: string;
  performed_via_github_app?: any;
  state_reason?: string;
  draft?: boolean;
  pull_request?: IPullrequest;
}

export type TState = 'open' | 'closed';

interface IPullrequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  merged_at?: any;
}

interface ILabels3 {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

interface ILabels2 {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description?: string;
}

interface ILabel {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description?: any;
}
