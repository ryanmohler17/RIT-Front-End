import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User} from 'src/domain/user/user';
import {UserService} from 'src/domain/user/user.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm = this.fb.group({
    name: [null, Validators.required],
    username: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
    level: ['Reporter', Validators.required],
  });

  user: User = {
    id: 0,
    username: '',
    password: '',
    email: '',
    level: 'Reporter'
  };

  constructor(private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const userId: number = parseInt(this.activatedRoute.snapshot.paramMap.get('userId') as string);

      if (userId != 0) {
        this.userService.findById(userId).subscribe(data => {
          this.user = data;
          this.userForm.patchValue(this.user);
        });
      } else {
        this.user = {
          id: 0,
          username: '',
          password: '',
          email: '',
          level: 'Reporter'
        };

        this.userForm.patchValue(this.user);
      }
    });
  }

  onSave(): void {
    this.user = {...this.user, ...this.userForm.value};

    this.userService.save(this.user).subscribe((data) => {
      this.user = data;
      this.snackBar.open("User saved successfully.", "Close", {duration: 10000});
    }, (error) => {
      console.log(error);
      this.snackBar.open("Error while saving user.", "Close");
    });
  }

  onCancel(): void {
    this.router.navigate([`/main/users`]);
  }
}
