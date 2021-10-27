import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from "../../../domain/user/user";
import {ActivatedRoute, Router} from "@angular/router";

import {MatSnackBar} from "@angular/material/snack-bar";
import {Issue} from 'src/domain/issue/issue';
import {IssueService} from 'src/domain/issue/issue.service';
import {UserService} from "../../../domain/user/user.service";
import {FollowUp} from "../../../domain/follow-up/follow-up";
import {FollowUpService} from "../../../domain/follow-up/follow-up.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  user?: User;
  users: User[] = [];
  followUps: FollowUp[] = [];

  reportForm = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    category: ['Other', Validators.required],
    severity: ['Low', Validators.required],
    status: ['Open', Validators.required],
    assignedTo: [null]
  });

  issue: Issue = {
    id: -1,
    title: '',
    description: '',
    category: 'Other',
    severity: 'Low'
  };

  constructor(private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private issueService: IssueService,
              private followUpService: FollowUpService,
              private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.userService.getLoggerUser().subscribe(data => {
      if (data != null && data.id != 0) {
        this.user = data;
      } else {
        this.user = undefined;
      }
    });

    this.userService.findAll().subscribe(data => {
      this.users = data;
    }, (error) => {
      console.log(error);
      this.snackBar.open("Error while finding users.", "Close");
    });

    this.activatedRoute.params.subscribe(params => {
      const issueId: number = parseInt(this.activatedRoute.snapshot.paramMap.get('issueId') as string);

      if (issueId != 0) {
        this.issueService.findById(issueId).subscribe(data => {
          this.issue = data;
          this.reportForm.patchValue(this.issue);
          this.reportForm.get('assignedTo')?.setValue(this.issue.assignedTo?.id);
          this.loadFollowUps();
        });
      } else {
        this.issue = {
          id: -1,
          title: '',
          description: '',
          category: 'Other',
          severity: 'Low'
        };

        this.reportForm.patchValue(this.issue);
      }
    });
  }

  private loadFollowUps() {
    this.followUpService.findByIssueId(this.issue.id!).subscribe(data => {
      this.followUps = data;
    }, (error) => {
      console.log(error);
      this.snackBar.open("Error while finding follow ups.", "Close");
    });
  }

  onSave(): void {
    this.issue = {...this.issue, ...this.reportForm.value};
    console.log(this.issue);
    this.issue.assignedTo = this.users.find((user) => user.id == this.reportForm.get('assignedTo')?.value);

    const followUp: FollowUp = {...this.reportForm.value}
    followUp.issueId = this.issue.id;
    this.issue.createdBy = this.user;

    this.issueService.save({issue: this.issue, followUp: followUp}).subscribe((data) => {
      //this.issue = data.issue;
      //this.loadFollowUps();
      this.snackBar.open("Issue saved successfully.", "Close", {duration: 10000});
      this.router.navigate(["/"]);
    }, (error) => {
      console.log(error);
      this.snackBar.open("Error while saving issue.", "Close");
    });
  }

  onCancel(): void {
    this.router.navigate([`/main/issues`]);
  }
}


