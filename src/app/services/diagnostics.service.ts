// src/app/services/diagnostics.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticsService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Test the login endpoint with different request formats
  testLoginEndpoint(email: string, password: string): void {
    console.log('=== Starting Login Endpoint Diagnostics ===');
    
    // Method 1: GET request with URL parameters
    this.http.get(`${this.baseUrl}/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
      responseType: 'text'
    }).subscribe({
      next: (res) => console.log('GET with URL params success:', res),
      error: (err) => console.log('GET with URL params error:', err.status, err.error)
    });
    
    // Method 2: POST request with URL parameters
    this.http.post(`${this.baseUrl}/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, null, {
      responseType: 'text'
    }).subscribe({
      next: (res) => console.log('POST with URL params success:', res),
      error: (err) => console.log('POST with URL params error:', err.status, err.error)
    });
    
    // Method 3: POST request with HttpParams
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
      
    this.http.post(`${this.baseUrl}/auth/login`, null, { 
      params, 
      responseType: 'text' 
    }).subscribe({
      next: (res) => console.log('POST with HttpParams success:', res),
      error: (err) => console.log('POST with HttpParams error:', err.status, err.error)
    });
    
    // Method 4: POST request with form data
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    
    this.http.post(`${this.baseUrl}/auth/login`, formData, {
      responseType: 'text'
    }).subscribe({
      next: (res) => console.log('POST with FormData success:', res),
      error: (err) => console.log('POST with FormData error:', err.status, err.error)
    });
    
    // Method 5: POST request with JSON body
    this.http.post(`${this.baseUrl}/auth/login`, { email, password }, {
      responseType: 'text',
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (res) => console.log('POST with JSON body success:', res),
      error: (err) => console.log('POST with JSON body error:', err.status, err.error)
    });
  }
}