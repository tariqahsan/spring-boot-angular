import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { NotificationService } from 'src/app/employees/shared/notification.service'
import { EmployeeService } from '../shared/employee.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService, 
    public notificationService: NotificationService, 
    public dialogRef: MatDialogRef<EmployeeComponent>) { }

  ngOnInit() {}

  submitted = false;

  selected = null;

  onClear() {
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();
  }

  onClose() {
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();
    this.dialogRef.close();
  }

  // checkboxChange(checkboxValue: string) {
  //   this.pinRequestService.form.setValue(checkboxValue ? 'Y' : 'N', this.setValueOptions);
  // }
  // setValueOptions(arg0: string, setValueOptions: string) {
  //   throw new Error('Method not implemented.');
  // }

  onSubmit() {
    if (this.employeeService.form.valid) {

      // For MySQL
      this.employeeService.create(this.employeeService.form.value).subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });

      this.employeeService.form.reset();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }

}


