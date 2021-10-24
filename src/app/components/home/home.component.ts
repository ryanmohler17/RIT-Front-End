import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {AccountService} from "../../service/account.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
