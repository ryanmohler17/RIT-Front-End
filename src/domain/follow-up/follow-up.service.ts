import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {FollowUp} from "./follow-up";

@Injectable()
export class FollowUpService {

  constructor(private http: HttpClient) {

  }

  findByIssueId(issueId: number): Observable<FollowUp[]> {
    return this.http.get<FollowUp[]>(`${environment.apiURL}/status/changeStatus`);
  }
}
