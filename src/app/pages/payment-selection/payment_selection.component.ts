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

  cod() {
    this.router.navigate(['/order-confirmation']); // Navigates to the payment selection route
  }
  // You can handle the actual selection in future here
}
