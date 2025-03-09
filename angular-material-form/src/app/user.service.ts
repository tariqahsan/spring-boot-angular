import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model'; // Import your User model

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/user'; // Your API base URL

  constructor(private http: HttpClient) {}

  // Get all contacts
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  // Get contact by ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Create a new contact
  createUser(contact: User): Observable<User> {
    console.log("IN ADD ...")
    return this.http.post<User>(`${this.apiUrl}/add`, contact);
  }

  // Update an existing contact
  updateUser(id: number, contact: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, contact);
  }

  // Delete a contact
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
