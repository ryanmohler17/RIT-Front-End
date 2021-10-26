import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/users/login/login.component';
import { IssuesComponent } from './components/issues/list-issues/list-issues.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { ReportComponent } from './components/report/report.component';
import {ListUsersComponent} from "./components/users/list-users/list-users.component";
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'browse/:userId', component: IssuesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users/:userId', component: EditUserComponent },
  { path: 'users', component: ListUsersComponent },
  { path: 'report/:issueId', component: ReportComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
