import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './contact.model'; // Import your Contact model

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/v1/contact'; // Your API base URL

  constructor(private http: HttpClient) {}

  // Get all contacts
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/all`);
  }

  // Get contact by ID
  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  // Create a new contact
  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/add`, contact);
  }

  // Update an existing contact
  updateContact(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact);
  }

  // Delete a contact
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
