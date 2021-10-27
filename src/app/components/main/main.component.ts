import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {UserService} from "../../../domain/user/user.service";
import {User} from "../../../domain/user/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user?: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router:Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.getLoggerUser().subscribe(user => {
      if (user != null && user.id != 0) {
        this.user = user;
      } else {
        this.user = undefined;
      }
    });
  }

  loggout(): void {
    this.userService.setLoggedUser(undefined);
    this.router.navigate(["/"]);
  }
}
