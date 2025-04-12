import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ✅ Add this


@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order_tracking.component.html',
  styleUrls: ['./order_tracking.component.scss']
})
export class OrderTrackingComponent {

  constructor(private readonly router: Router) {}

  user = {
    name: 'Aniket',
    role: 'Customer'
  };

  order = {
    id: '12345',
    deliveryPartner: 'John Doe',
    estimatedArrival: '6:30 PM',
    timeRemaining: '30 mins',
    address: '123 Main Street, Pune',
    stages: [
      { name: 'Order Placed', time: '5:00 PM', icon: 'fa-check-circle' },
      { name: 'Preparing', time: '5:15 PM', icon: 'fa-utensils' },
      { name: 'Out for Delivery', time: '', icon: 'fa-truck' }
    ]
  };

  orderItems = [
    { name: 'Margherita Pizza', quantity: 1, price: 8.99 },
    { name: 'Garlic Bread', quantity: 2, price: 3.49 }
  ];

  get totalAmount() {
    return this.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  cancelOrder() {
    this.router.navigate(['/cancel-order']);
  }
}
