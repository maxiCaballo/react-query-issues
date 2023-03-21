import { IGithubUser } from './githubUser';
import { IReactions } from './reactions';

export interface IComments {
  url: string;
  html_url: string;
  issue_url: string;
  id: number;
  node_id: string;
  user: IGithubUser;
  created_at: string;
  updated_at: string;
  author_association: string;
  body: string;
  reactions: IReactions;
  performed_via_github_app?: any;
}
