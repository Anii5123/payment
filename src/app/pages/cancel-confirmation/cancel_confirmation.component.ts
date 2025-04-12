import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cancelled',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cancel_confirmation.component.html',
  styleUrls: ['./cancel_confirmation.component.scss']
})
export class CancelConfirmationComponent {
  constructor(private readonly router: Router) {}

  refundPayment() {
    this.router.navigate(['/refund-request']);
  }

  contactSupport() {
    alert("Redirecting to support.");
  }
}
