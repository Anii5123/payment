import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/OrderService.component';

@Component({
  selector: 'app-order-customization',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order_customization.component.html',
  styleUrls: ['./order_customization.component.scss']
})
export class OrderCustomizationComponent {
  constructor(
    private readonly router: Router,
    private readonly orderService: OrderService
  ) {}

  sizes = [
    { name: 'Small', price: 150 },
    { name: 'Medium', price: 300 },
    { name: 'Large', price: 500 }
  ];

  crusts = ['Thin', 'Regular', 'Stuffed'];
  toppings = [
    { name: 'Extra Cheese', price: 10, selected: false },
    { name: 'Mushrooms', price: 10, selected: false },
    { name: 'Onions', price: 10, selected: false },
    { name: 'Bell Peppers', price: 10, selected: false }
  ];

  selectedSize = this.sizes[0];
  selectedCrust = this.crusts[0];
  quantity = 1;
  instructions = '';

  get total(): number {
    let base = this.selectedSize.price;
    if (this.selectedCrust === 'Stuffed') base += 10; // Using 10 instead of 2 to match UI
    const toppingsTotal = this.toppings.filter(t => t.selected).reduce((sum, t) => sum + t.price, 0);
    return (base + toppingsTotal) * this.quantity;
  }

  toggleTopping(topping: any) {
    topping.selected = !topping.selected;
  }

  addQuantity() {
    this.quantity++;
  }

  removeQuantity() {
    if (this.quantity > 1) this.quantity--;
  }

  addToOrder() {
    // Save the order details to the service
    this.orderService.setOrder({
      title: 'Margherita Pizza',
      image: 'assets/pizza.jpg',
      size: this.selectedSize,
      crust: this.selectedCrust,
      toppings: [...this.toppings],
      quantity: this.quantity,
      instructions: this.instructions,
      total: this.total
    });
    
    // Navigate to the summary page
    this.router.navigate(['/order-summary']);
  }
}