import {User} from "../user/user";
import {FollowUp} from "../follow-up/follow-up";

export interface Issue {

  id: number,
  title: string,
  description: string,
  category: string,
  createdBy?: User,
  createdAt?: Date,
  updatedAt?: Date,
  severity: string,
  assignedTo?: User
}
