import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // ✅ Add this

@Component({
  selector: 'app-order-customization',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order_customization.component.html',
  styleUrls: ['./order_customization.component.scss']
})
export class OrderCustomizationComponent {
  constructor(private readonly router: Router) {} // ✅ Inject Router

  sizes = [
    { name: 'Small', price: 12.99 },
    { name: 'Medium', price: 15.99 },
    { name: 'Large', price: 18.99 }
  ];

  crusts = ['Thin', 'Regular', 'Stuffed'];
  toppings = [
    { name: 'Extra Cheese', price: 1.5, selected: false },
    { name: 'Mushrooms', price: 1, selected: false },
    { name: 'Onions', price: 1, selected: false },
    { name: 'Bell Peppers', price: 1, selected: false }
  ];

  selectedSize = this.sizes[0];
  selectedCrust = this.crusts[0];
  quantity = 1;
  instructions = '';

  get total(): number {
    let base = this.selectedSize.price;
    if (this.selectedCrust === 'Stuffed') base += 2;
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
    // You can add logic here to persist the order
    this.router.navigate(['/order-summary']);
  }
}
