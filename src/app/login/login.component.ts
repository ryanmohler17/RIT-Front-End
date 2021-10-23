import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  addressForm = this.fb.group({
    
    username: [null, Validators.required],
    password: [null, Validators.required,Validators.minLength(5), Validators.maxLength(5)],

  });

  hasUnitNumber = false;

  

  constructor(private fb: FormBuilder, private router:Router) {}

  onSubmit(): void {
    this.router.navigate(["/main/issues"]);
  }
}
