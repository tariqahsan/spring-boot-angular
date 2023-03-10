import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "http://localhost:8080/api/v1";

  // constructor(private http: HttpClient, public formBuilder: FormBuilder) { }
  constructor(private http: HttpClient) { }

  form:  FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  initializeFormGroup() {
    console.log("Reseting form fields");
      this.form.setValue({
      id: null,
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      email: ''
    })
  }

  // For HttpClient CRUD
  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`);
  }

}
