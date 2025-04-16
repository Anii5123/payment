import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService,OrderItem } from '../../services/OrderService.component';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order_summary.component.html',
  styleUrls: ['./order_summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  order: OrderItem | null = null;
  
  constructor(
    private readonly router: Router,
    private readonly orderService: OrderService
  ) {}

  ngOnInit(): void {
    // Get the order data from the service
    this.order = this.orderService.getOrder();
    
    // If no order data, redirect back to customization
    if (!this.order) {
      this.router.navigate(['/order-customization']);
    }
  }

  get selectedToppings(): string[] {
    if (!this.order) return [];
    return this.order.toppings
      .filter(topping => topping.selected)
      .map(topping => topping.name);
  }

  proceedToPayment() {
    // Navigate to the payment selection page
    this.router.navigate(['/payment-selection']);
  }

  goBack() {
    this.router.navigate(['/order-customization']);
  }
}