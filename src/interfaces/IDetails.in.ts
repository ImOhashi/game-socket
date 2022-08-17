export interface IDetails {
  version: string;
  contributors: IContributors[];
  repository_url: string;
}

interface IContributors {
  nickname: string;
  email: string;
  url: string;
}
