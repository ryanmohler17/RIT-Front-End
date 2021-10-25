import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ListUsersDataSource } from './list-users-datasource';
import {User} from "../../../../domain/user/user";
import {UserService} from "../../../../domain/user/user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;
  dataSource: ListUsersDataSource;
  users: User[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'username', 'email', 'level', 'options'];

  constructor(private router: Router,
              private userService: UserService,
              private snackBar: MatSnackBar) {

    this.dataSource = new ListUsersDataSource();
  }

  ngOnInit(): void {
    this.findAllUsers();
  }

  private findAllUsers(): void {
    this.userService.findAll().subscribe((data) => {
      this.users = data;
      this.updateTableDataSource();
    }, (error) => {
      console.log(error);
      this.snackBar.open("Error while fetching users.", "Close");
    });
  }

  ngAfterViewInit(): void {
    this.updateTableDataSource();
  }

  private updateTableDataSource() {
    this.dataSource = new ListUsersDataSource(this.users);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  editUser(userId: number) {
    this.router.navigate([`/users/${userId}`]);
  }

  deleteUser(userId: number) {
    if (confirm("Are you sure?")) {
      this.userService.delete(userId).subscribe((data) => {
        this.snackBar.open("User deleted successfully.", "Close", { duration: 10000 });
        this.findAllUsers();
      }, (error) => {
        console.log(error);
        this.snackBar.open("Error while deleting user.", "Close");
      });
    }
  }
}
