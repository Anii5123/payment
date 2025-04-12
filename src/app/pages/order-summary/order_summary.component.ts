import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ✅ Add this


@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order_summary.component.html',
  styleUrls: ['./order_summary.component.scss']
})
export class OrderSummaryComponent {
    constructor(private readonly router: Router) {} // ✅ Inject Router

  order = {
    image: 'assets/pizza.jpg',
    title: 'Margherita Pizza',
    size: 'Medium',
    crust: 'Stuffed',
    toppings: ['Extra Cheese', 'Mushrooms'],
    quantity: 2,
    instructions: 'Cut into 6 slices',
    total: 39.98
  };

  proceedToPayment() {
    this.router.navigate(['/payment-selection']); // Navigates to the payment selection route
  }

  goBack() {
    this.router.navigate(['/order-customization']);
  }
}
