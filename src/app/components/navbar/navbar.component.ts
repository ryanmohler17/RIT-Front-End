import { Component, OnInit } from '@angular/core';
import {User} from "../../../domain/user/user";
import {UserService} from "../../../domain/user/user.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  account: User | null = null;

  constructor(private accountService: UserService) {
  }

  ngOnInit(): void {
    this.accountService.getLoggerUser().subscribe(user => {
      this.account = user;
    });
  }




}
