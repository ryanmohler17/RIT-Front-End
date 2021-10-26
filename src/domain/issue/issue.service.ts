import {Injectable} from '@angular/core';
import {Issue} from './issue';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
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

  findByUser(userId: number): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${environment.apiURL}/api/users/${userId}/issues`);

    // const issue: Issue = {
    //   title: 'Test title',
    //   assignedTo: {
    //     id: 3,
    //     password: '',
    //     username: 'test',
    //     email: 'test@email.com',
    //     level: 'Reporter',
    //     name: 'Test Name'
    //   },
    //   id: 4,
    //   category: 'Other',
    //   severity: 'Low',
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   createdBy: {
    //     id: 3,
    //     password: '',
    //     username: 'test',
    //     email: 'test@email.com',
    //     level: 'Reporter',
    //     name: 'Test Name'
    //   }
    // };
    //
    // const data = [issue];
    // return new BehaviorSubject<Issue[]>(data).asObservable();
  }
}
