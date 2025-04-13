// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  selectedRole: string = 'customer';

  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  selectRole(role: string) {
    this.selectedRole = role;
  }

  getTitleCase(role: string): string {
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }

  onLogin(email: string, password: string) {
    if (this.authService.login(email, password, this.selectedRole)) {
      switch (this.selectedRole) {
        case 'customer':
          this.router.navigate(['/home']);
          break;
        case 'employee':
          this.router.navigate(['/employee-dashboard']);
          break;
        case 'admin':
          this.router.navigate(['/admin-dashboard']);
          break;
        default:
          console.error('Unknown role');
      }
    } else {
      alert('Invalid credentials');
    }
  }
}
