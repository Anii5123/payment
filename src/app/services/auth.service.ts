// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

interface User {
  email: string;
  password: string;
}

interface Users {
  [key: string]: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly users: Users = {
    customer: { email: 'customer123@gmail.com', password: 'Customer@123' },
    employee: { email: 'employee123@gmail.com', password: 'Employee@123' },
    admin: { email: 'admin123@gmail.com', password: 'Admin@123' },
  };

  constructor() {}

  login(email: string, password: string, role: string): boolean {
    const user = this.users[role];

    if (user && user.email === email && user.password === password) {
      localStorage.setItem('role', role);
      return true;
    }
    return false;
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  logout(): void {
    localStorage.removeItem('role');
  }
}
