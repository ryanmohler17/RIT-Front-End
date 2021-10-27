import {Component, OnInit} from '@angular/core';
import {User} from "../../../domain/user/user";
import {UserService} from "../../../domain/user/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  account: User | null = null;

  constructor(private accountService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.accountService.getLoggerUser().subscribe(user => {
        this.account = user;
      });
    });
  }


}
