import { Component, isDevMode, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rit';

  ngOnInit(): void {
    if (!isDevMode()) {
      
    } else {

    }
  }
}
