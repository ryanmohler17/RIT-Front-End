import {Injectable} from '@angular/core';
import {Issue} from './issue';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {IssueFollowUpDTO} from "./issue-follow-up.dto";

@Injectable()
export class IssueService {

  constructor(private http: HttpClient) {

  }

  findAll(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${environment.apiURL}/api/issues`);
  }

  findById(issueId: number): Observable<Issue> {
    return this.http.get<Issue>(`${environment.apiURL}/api/issues/${issueId}`);
  }

  save(issueFollowUpDTO: IssueFollowUpDTO): Observable<IssueFollowUpDTO> {
    return this.http.post<IssueFollowUpDTO>(`${environment.apiURL}/api/issues`, issueFollowUpDTO);
  }

}
