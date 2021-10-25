import {Issue} from "./issue";
import {FollowUp} from "../follow-up/follow-up";

export interface IssueFollowUpDTO {
  issue: Issue;
  followUp: FollowUp;
}
