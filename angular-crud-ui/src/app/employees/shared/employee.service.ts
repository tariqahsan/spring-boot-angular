import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "http://localhost:8888/api/v1";

  constructor(private http: HttpClient, public formBuilder: FormBuilder) { }

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

  get(id: any): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/employees/${id}`);
  }

  create(data: any): Observable<Employee> {
    console.log(`${this.baseUrl}/employees/add`)
    console.log(data)
    return this.http.post<Employee>(`${this.baseUrl}/employees/add`, data);
  }

  update(id: any, data: any): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/employees/update/${id}`, data);
  }

  delete(id: any): Observable<Employee> {
    return this.http.delete<Employee>(`${this.baseUrl}/employees/delete/${id}`);
  }

  // deleteAll(): Observable<Employee> {
  //   return this.http.delete<Employee>(this.baseUrl);
  // }

  // findByTitle(title: any): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(`${this.baseUrl}?title=${title}`);
  // }
}
