import {AfterViewInit, OnInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { EmployeeComponent } from '../employee/employee.component';
import { Employee } from '../shared/employee';
import { EmployeeService } from '../shared/employee.service';
import { DialogService } from '../shared/dialog.service';
import { NotificationService } from '../shared/notification.service';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements AfterViewInit {
//export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'address', 'phone', 'email', 'actions'];
  dataSource = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;
  
  constructor(private empService: EmployeeService, 
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private changeDetectorRefs: ChangeDetectorRef) {

    // datasource refresh
    this.refresh();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  // datasource refresh to show the changes made
  refresh() {
    this.empService.getEmployees().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // trigger a change detection
        this.changeDetectorRefs.detectChanges();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  onCreate() {
    this.empService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    //this.dialog.open(EmployeeComponent, dialogConfig);
    // datasource refresh
    this.dialog.open(EmployeeComponent, dialogConfig).afterClosed().subscribe(result => {
      this.refresh();
    });
  }
  onEdit(row: any) {
    this.empService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    // datasource refresh
    this.dialog.open(EmployeeComponent, dialogConfig).afterClosed().subscribe(result => {
      this.refresh();
    });

  }

  onDelete(id: number){
    this.dialogService.openConfirmDialog('Are you sure you want to delete this record?' )
    .afterClosed().subscribe(res =>{
      if(res){
        console.log("response is " + res)
        this.empService.delete(id).subscribe( data => {
              console.log("employee data has been deleted successfully!");
              // datasource refresh
              this.refresh();
            }, (err) => {
              console.log("unable to delete the employee");
            })
        this.notificationService.warn('! Deleted successfully');
      }
    });
  }
}


