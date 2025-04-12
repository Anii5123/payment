import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment_selection.component.html',
  styleUrls: ['./payment_selection.component.scss']
})
export class PaymentSelectionComponent {
  constructor(private readonly router: Router) {}

  // Function for Cash on Delivery
  cod() {
    this.router.navigate(['/order-confirmation']);
  }

  // Function to handle UPI selection (Google Pay)
  onSelectUPI() {
    this.router.navigate(['/pay-onl']); // Navigate to the UPI payment page
  }
}
