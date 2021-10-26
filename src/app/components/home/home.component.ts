import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../domain/user/user";
import {UserService} from "../../../domain/user/user.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  account: User | null = null;

  constructor(private accountService: UserService) {
  }

  ngOnInit(): void {
    this.accountService.getLoggerUser().subscribe(user => {
      this.account = user;
    })
  }

}
