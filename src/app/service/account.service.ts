import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  public getAccount(): Observable<User | null> {
    return new Observable<User | null>(subscriber => {
      subscriber.next({
        name: 'user',
        avatar: 'test'
      })
    });
  }

}
