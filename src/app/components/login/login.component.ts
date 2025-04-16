// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class LoginComponent {
  selectedRole: string = 'user';
  isLoading: boolean = false;
  errorMessage: string = '';
  debugInfo: string = '';

  constructor(
    private readonly router: Router, 
    private readonly authService: AuthService,
    private readonly http: HttpClient
  ) {}

  selectRole(role: string) {
    this.selectedRole = role;
    this.authService.setRole(role);
  }

  getTitleCase(role: string): string {
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }

  onLogin(email: string, password: string) {
    // Reset states
    this.errorMessage = '';
    this.debugInfo = '';
    
    // Basic validation
    if (!email || !password) {
      this.errorMessage = 'Email and password are required';
      return;
    }

    this.isLoading = true;
    this.debugInfo = `Attempting login with: ${email}, role: ${this.selectedRole}\n`;

    // Try the direct URL method
    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.debugInfo += `Success response: ${response}\n`;
        
        if (response === 'Login successful!') {
          this.authService.setRole(this.selectedRole);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Login failed: ' + response;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.debugInfo += `Error status: ${err.status}\n`;
        this.debugInfo += `Error message: ${err.message}\n`;
        this.debugInfo += `Error details: ${JSON.stringify(err.error || {})}\n`;
        
        this.errorMessage = err.error || 'Invalid credentials. Please try again.';
        
        // Let's try an alternative method if the first one failed
        this.tryAltLogin(email, password);
      }
    });
  }

  // Try an alternative login method
  tryAltLogin(email: string, password: string) {
    this.debugInfo += `\nTrying alternative login method...\n`;
    
    this.authService.loginWithParams(email, password).subscribe({
      next: (response) => {
        this.debugInfo += `Alt method success: ${response}\n`;
        
        if (response === 'Login successful!') {
          this.authService.setRole(this.selectedRole);
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.debugInfo += `Alt method error: ${err.status} - ${err.message}\n`;
      }
    });
  }

  // Try direct fetch API for testing
  async testApiDirectly(email: string, password: string) {
    this.debugInfo = `Testing API directly...\n`;
    
    try {
      // Method 1: URL parameters
      const url = `http://localhost:8080/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
      this.debugInfo += `Testing URL: ${url}\n`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      
      const text = await response.text();
      this.debugInfo += `Response: ${response.status} - ${text}\n`;
      
      if (text === 'Login successful!') {
        this.authService.setRole(this.selectedRole);
        this.router.navigate(['/home']);
      }
    } catch (error) {
      this.debugInfo += `Test error: ${error}\n`;
    }
  }

  navigateToSignUp() {
    this.router.navigate(['/sign-up']);
  }
}