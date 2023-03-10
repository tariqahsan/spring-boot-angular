import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { NotificationService } from 'src/app/employees/shared/notification.service'
import { EmployeeService } from '../shared/employee.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../shared/employee';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService, 
    public notificationService: NotificationService, 
    public dialogRef: MatDialogRef<EmployeeComponent>,
    private changeDetectorRefs: ChangeDetectorRef) { }

    ngOnInit() {
      // this.employeeService.getEmployees().subscribe((res: any) => {
      //   this.dataSource.data = res;
      // });
      this.refresh();
    }

    // datasource refresh to show the changes made
  refresh() {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        // trigger a change detection
        this.changeDetectorRefs.detectChanges();
    });
  }

  submitted = false;
  selected = null;

  dataSource = new MatTableDataSource<Employee>();

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
  //   this.employeeService.form.setValue(checkboxValue ? 'Y' : 'N', this.setValueOptions);
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


