import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/domain/user/user';
import { UserService } from 'src/domain/user/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  userForm = this.fb.group({
    name: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.required],
    level: ['Reporter', Validators.required],
  });

  user: User = {
    name: '',
    username: '',
    password: '',
    email: '',
    level: 'Reporter'
  };

  constructor(private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar) { }

  onSave(): void {
    this.userService.save(this.userForm.value).subscribe((data) => {
      this.user = data;
      this.snackBar.open("User saved successfully.", "Close", { duration: 10000 });
    }, (error) => {
      console.log(error);
      this.snackBar.open("Error while saving user.", "Close", { duration: 10000 });
    });
  }
}
