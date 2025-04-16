// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  selectedRole: string = 'user';
  isLoading: boolean = false;
  errorMessage: string = '';

  getRoleDisplayName(role: string): string {
    if (role === 'user') return 'Customer';
    return this.getTitleCase(role);
  }

  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  selectRole(role: string) {
    this.selectedRole = role;
  }

  getTitleCase(role: string): string {
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }

  onRegister(name: string, email: string, phoneNo: string, password: string, confirmPassword: string) {
    // Reset error state
    this.errorMessage = '';
    
    // Basic validation
    if (!name || !email || !phoneNo || !password || !confirmPassword) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNo)) {
      this.errorMessage = 'Phone number must be 10 digits';
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.errorMessage = 'Please enter a valid email';
      return;
    }

    // Create user object
    const user: User = {
      name,
      email,
      phoneNo,
      password,
      role: this.selectedRole
    };

    this.isLoading = true;

    // Register user
    this.authService.register(user).subscribe({
      next: (response) => {
        this.isLoading = false;
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Registration error:', err);
        this.errorMessage = err.error || 'Registration failed. Please try again.';
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}