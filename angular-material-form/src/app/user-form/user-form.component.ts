import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from '../user.service'; // Adjust path as necessary
import { User } from '../user.model'; // Adjust path as necessary
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, AfterViewInit {
  userForm!: FormGroup;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'address', 'phone', 'email'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.dataSource = new MatTableDataSource<User>([]);
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, phoneValidator()]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.dataSource.data = users;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData: User = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        address: this.userForm.value.address,
        phone: this.userForm.value.phone,
        email: this.userForm.value.email,
      };

      this.userService.createUser(userData).subscribe(
        response => {
          console.log('User created:', response);
          // Handle success (e.g., show a success message or redirect)
        },
        error => {
          console.error('Error creating user:', error);
          // Handle error (e.g., show an error message)
        }
      );
    }
  }
}

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    //US phone number of any patterns e.g.
    //(202) 000-0000
    //202-000-0000
    //2020000000
    const valid = /^\s*([\(]?)\[?\s*\d{3}\s*\]?[\)]?\s*[\-]?[\.]?\s*\d{3}\s*[\-]?[\.]?\s*\d{4}$/.test(control.value);
    return valid ? null : { 'invalidPhone': { value: control.value } };
  };
}


