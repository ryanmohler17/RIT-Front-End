import {Injectable} from '@angular/core';
import {Issue} from './issue';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subscriber} from "rxjs";
import {environment} from "../../environments/environment";
import {IssueFollowUpDTO} from "./issue-follow-up.dto";

@Injectable()
export class IssueService {

  constructor(private http: HttpClient) {

  }

  private issuesTest: Issue[] = [
    {
      id: 4,
      title: 'Test 1',
      description: 'This is a Test Issue',
      category: 'test',
      severity: 'test'
    },
    {
      id: 5,
      title: 'Test 2',
      description: 'This is a Test Issue',
      category: 'test',
      severity: 'test'
    },
    {
      id: 6,
      title: 'Test 3',
      description: 'This is a Test Issue',
      category: 'test',
      severity: 'test'
    }
  ]

  private issues = new BehaviorSubject<Issue[]>(this.issuesTest);

  findAll(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${environment.apiURL}/issues/getAllIssues`);
    //return this.issues.asObservable();
  }

  findById(issueId: number): Observable<Issue> {
    return this.http.get<Issue>(`${environment.apiURL}/issues/getIssueById/${issueId}`);
    /*return new Observable(subscriber => {
      subscriber.next(this.issuesTest.filter(issue => {
        return issue.id === issueId
      })[0])
    })*/
  }

  save(issueFollowUpDTO: IssueFollowUpDTO): Observable<IssueFollowUpDTO> {
    console.log(issueFollowUpDTO.issue)
    return this.http.post<IssueFollowUpDTO>(`${environment.apiURL}/issues/createIssue`, issueFollowUpDTO.issue);
  }

/*  findByUser(userId: number): Observable<Issue[]> {
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
  */
}
