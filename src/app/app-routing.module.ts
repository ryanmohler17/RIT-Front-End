import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './users/login/login.component';
import { IssuesComponent } from './issues/list-issues/list-issues.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ReportComponent } from './report/report.component';
import {ListUsersComponent} from "./users/list-users/list-users.component";

const routes: Routes = [{
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'issues', component: IssuesComponent },
      { path: 'login', component: LoginComponent },
      { path: 'users', component: ListUsersComponent },
      { path: 'users/:userId', component: EditUserComponent },
      { path: 'report/:issueId', component: ReportComponent }
    ],
  },
  { path: '', redirectTo: 'main/issues', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
