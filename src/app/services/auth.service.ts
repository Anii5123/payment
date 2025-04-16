// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

export interface User {
  userId?: number;
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080'; // Server URL

  constructor(private http: HttpClient) {}

  register(user: User): Observable<string> {
    return this.http.post(`${this.baseUrl}/auth/register`, user, { responseType: 'text' });
  }

  login(email: string, password: string): Observable<string> {
    console.log('Login attempt with:', { email, password });
    
    // Let's try a completely different approach - direct URL parameters
    const loginUrl = `${this.baseUrl}/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    console.log('Login URL:', loginUrl);
    
    return this.http.post(loginUrl, {}, { 
      responseType: 'text',
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(response => {
        console.log('Raw server response:', response);
        if (response === 'Login successful!') {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', email);
        }
      }),
      catchError(error => {
        console.error('Detailed login error:', error);
        return throwError(() => error);
      })
    );
  }

  // Keep a backup of the alternative implementation
  loginWithParams(email: string, password: string): Observable<string> {
    console.log('Login with params:', { email, password });
    
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    
    console.log('Constructed params:', params.toString());
    
    return this.http.post(`${this.baseUrl}/auth/login`, null, { 
      params,
      responseType: 'text',
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).pipe(
      tap(response => {
        console.log('Raw server response:', response);
        if (response === 'Login successful!') {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', email);
        }
      }),
      catchError(error => {
        console.error('Detailed login error:', error);
        return throwError(() => error);
      })
    );
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  setRole(role: string): void {
    localStorage.setItem('role', role);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('role');
  }
}