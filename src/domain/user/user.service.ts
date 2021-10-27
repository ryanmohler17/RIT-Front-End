import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "src/environments/environment";
import {User} from "./user";

@Injectable()
export class UserService {

  private emptyUser: User = {
    id: 0,
    username: 'user',
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
    return this.http.get<User>(`${environment.apiURL}/users/current`, {
      headers: {
        id: `${sessionStorage.getItem("id")}`
      }
    })
  }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiURL}/users/getAllUsers`);
  }

  findById(userId: number): Observable<User> {
    return this.http.get<User>(`${environment.apiURL}/users/${userId}`);
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiURL}/createUser`, user);
  }

  delete(userId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiURL}/users/${userId}`);
  }

  login(value: any): Observable<string> {
    return this.http.post<string>(`${environment.apiURL}/users/login`, value);
  }
}
