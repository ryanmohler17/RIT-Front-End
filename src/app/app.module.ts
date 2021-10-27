import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './components/main/main.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {LoginComponent} from './components/users/login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {IssuesComponent} from './components/issues/list-issues/list-issues.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {EditUserComponent} from './components/users/edit-user/edit-user.component';
import {ReportComponent} from './components/report/report.component';
import {UserService} from 'src/domain/user/user.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {IssueService} from "../domain/issue/issue.service";
import {ListUsersComponent} from './components/users/list-users/list-users.component';
import {MatTabsModule} from "@angular/material/tabs";
import {FollowUpService} from "../domain/follow-up/follow-up.service";
import {MatStepperModule} from "@angular/material/stepper";
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardActions, MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import { BoardComponent } from './components/board/board/board.component';
import { ListComponent } from './components/board/list/list.component';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CorsInterceptor } from 'src/domain/corsHttpIntercept';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    IssuesComponent,
    EditUserComponent,
    ReportComponent,
    ListUsersComponent,
    NavbarComponent,
    HomeComponent,
    BoardComponent,
    ListComponent,
    ClickStopPropagationDirective,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatStepperModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    DragDropModule
  ],
  providers: [
    UserService,
    IssueService,
    { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true },
    FollowUpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
