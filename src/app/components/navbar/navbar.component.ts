import { Component, OnInit } from '@angular/core';
import {User} from "../../interfaces/user";
import {AccountService} from "../../service/account.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  account: User | null = null;
  private accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  ngOnInit(): void {
    this.accountService.getAccount().subscribe(user => {
      this.account = user;
    })
  }

}
