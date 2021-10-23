import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "./user";

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {

    }

    findAll(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiURL}/api/users`);
    }

    save(user: User): Observable<User> {
        return this.http.post<User>(`${environment.apiURL}/api/users`, user);
    }

    delete(userId: number): Observable<void> {
        return this.http.delete<void>(`${environment.apiURL}/api/users/${userId}`);
    }
}
