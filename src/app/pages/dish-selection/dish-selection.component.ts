import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-dish-selection',
  imports: [CommonModule, FormsModule],
  templateUrl: './dish-selection.component.html',
  styleUrls: ['./dish-selection.component.scss']
})
export class DishSelectionComponent {
  categories = ['All', 'Popular', 'Starters', 'Main Course', 'Desserts', 'Beverages'];
  selectedCategory = 'All';

  dishes = [
    { name: 'Margherita Pizza', price: 9.99 },
    { name: 'Chicken Burger', price: 8.49 },
    { name: 'Caesar Salad', price: 6.99 },
    { name: 'Pasta Carbonara', price: 10.99 },
    { name: 'Fish & Chips', price: 11.49 },
    { name: 'Veggie Wrap', price: 7.99 },
    { name: 'Chocolate Cake', price: 5.99 },
    { name: 'Iced Coffee', price: 4.49 },
    { name: 'Fruit Smoothie', price: 4.99 }
  ];

  addToOrder(dish: any) {
    alert(`${dish.name} added to order!`);
  }
}
