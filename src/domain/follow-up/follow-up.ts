import {Issue} from "../issue/issue";

export interface FollowUp {

  id?: number;
  status: string;
  description: string;
  issue: Issue;
}
