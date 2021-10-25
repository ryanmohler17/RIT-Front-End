import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "src/environments/environment";
import {User} from "./user";

@Injectable()
export class UserService {

  private emptyUser: User = {
    id: 0,
    name: 'user',
    username: '',
    password: '',
    email: '',
    level: 'Reporter'
  };

  private loggedUser = new BehaviorSubject<User>(this.emptyUser);

  constructor(private http: HttpClient) {

  }

  setLoggedUser(user?: User): void {
    if (!user) {
      this.loggedUser.next(this.emptyUser);
    } else {
      this.loggedUser.next(user);
    }
  }

  getLoggerUser(): Observable<User> {
    return this.loggedUser.asObservable();
  }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiURL}/api/users`);
  }

  findById(userId: number): Observable<User> {
    return this.http.get<User>(`${environment.apiURL}/api/users/${userId}`);
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiURL}/api/users`, user);
  }

  delete(userId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiURL}/api/users/${userId}`);
  }

  login(value: any): Observable<User> {
    return this.http.post<User>(`${environment.apiURL}/api/users/login`, value);
  }
}
