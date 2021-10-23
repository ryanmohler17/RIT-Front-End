import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  addressForm = this.fb.group({
    id: null,
    title: [null, Validators.required],
    description: [null, Validators.required, Validators.minLength(15), Validators.maxLength(50)],
    category: [null, Validators.required],
    creator: [null, Validators.required],
    reportDate: null,
    severity: null, 

  });

  hasUnitNumber = false;



  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    alert('Thanks!');
  }
}
