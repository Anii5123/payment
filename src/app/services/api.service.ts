// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080'; // Server URL

  constructor(private http: HttpClient) {}

  // User registration
  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, user, { responseType: 'text' });
  }

  // User login
  loginUser(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    
    return this.http.post(`${this.baseUrl}/auth/login`, null, { 
      params, 
      responseType: 'text' 
    });
  }

  // Get user by ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/users/${id}`);
  }

  // Get all users
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/auth/users`);
  }

  // Update user
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/auth/users/${id}`, user, { responseType: 'text' });
  }

  // Delete user
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/auth/users/${id}`, { responseType: 'text' });
  }
}