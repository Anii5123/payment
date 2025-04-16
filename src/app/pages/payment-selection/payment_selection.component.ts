import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService,OrderItem } from '../../services/OrderService.component';

@Component({
  selector: 'app-payment-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment_selection.component.html',
  styleUrls: ['./payment_selection.component.scss']
})
export class PaymentSelectionComponent implements OnInit {
  order: OrderItem | null = null;
  deliveryFee: number = 20; // Fixed delivery fee of ₹20
  
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
  
  get subtotal(): number {
    return this.order ? this.order.total : 0;
  }
  
  get totalAmount(): number {
    return this.subtotal + this.deliveryFee;
  }
  
  get selectedToppings(): string[] {
    if (!this.order) return [];
    return this.order.toppings
      .filter(topping => topping.selected)
      .map(topping => topping.name);
  }

  // Function for Cash on Delivery
  cod() {
    this.router.navigate(['/order-confirmation']);
  }

  // Function to handle UPI selection
  onSelectUPI() {
    this.router.navigate(['/pay-onl']); // Navigate to the UPI payment page
  }
}