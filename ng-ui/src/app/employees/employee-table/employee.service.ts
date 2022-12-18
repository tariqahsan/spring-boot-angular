import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Employee } from './employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

	private baseUrl = "http://localhost:8080/api/v1";
  	constructor(private http: HttpClient) { }
  	
  	getEmployees(): Observable<Employee[]> {
		return this.http.get<Employee[]>(`${this.baseUrl}/employees`);
	}
}
