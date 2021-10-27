import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Issue } from '../../../../domain/issue/issue';
import { ListIssuesDatasource } from './list-issues-datasource';
import {IssueService} from "../../../../domain/issue/issue.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../../domain/user/user";
import {UserService} from "../../../../domain/user/user.service";

@Component({
  selector: 'app-list-issues',
  templateUrl: './list-issues.component.html',
  styleUrls: ['./list-issues.component.css']
})
export class IssuesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Issue>;
  dataSource: ListIssuesDatasource;
  issues: Issue[] = [];

  user?: User;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'category', 'createdBy', 'assignedTo', 'severity', 'createdAt', 'updatedAt', 'options' ];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private issueService: IssueService,
              private userService: UserService) {

    this.dataSource = new ListIssuesDatasource();
  }

  ngOnInit(): void {
    this.userService.getLoggerUser().subscribe(data => {
      if (data != null && data.id != 0) {
        this.user = data;
      } else {
        this.user = undefined;
      }
    });

    this.activatedRoute.params.subscribe(params => {
      this.loadIssues(params.userId);
    });
  }

  private loadIssues(userId: number) {
    if (userId == 0) {
      this.issueService.findAll().subscribe((data) => {
        this.issues = data;
        this.updateTableDataSource();
      });
    } else {
      this.issueService.findAll().subscribe((data) => {
        data = data.filter(item => {
          return item.createdBy?.id == userId;
        })
        this.issues = data;
        this.updateTableDataSource();
      });
    }
  }

  ngAfterViewInit(): void {
    this.updateTableDataSource();
  }

  updateTableDataSource() {
    this.dataSource = new ListIssuesDatasource(this.issues);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  editIssue(issueId: number) {
    this.router.navigate([`/main/report/${issueId}`]);
  }
}
