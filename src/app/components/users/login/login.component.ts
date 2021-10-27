import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from "../../../../domain/user/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  addressForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar) {

  }

  onSubmit(): void {
    this.userService.login(this.addressForm.value).subscribe(data => {
      this.router.navigate(["/"]);
      this.snackBar.open("User logged in successfully.", "Close", { duration: 10000 });
      sessionStorage.setItem("id", data)
    }, (error) => {
      console.log(error);
      this.snackBar.open("Error while logging user.", "Close");
    });
  }
}
