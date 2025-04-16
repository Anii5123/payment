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
    { name: 'Margherita Pizza', price: 150 },
    { name: 'Chicken Burger', price: 120 },
    { name: 'Caesar Salad', price: 110 },
    { name: 'Pasta Carbonara', price: 150 },
    { name: 'Fish & Chips', price: 160 },
    { name: 'Veggie Wrap', price: 170 },
    { name: 'Chocolate Cake', price: 140 },
    { name: 'Iced Coffee', price: 140 },
    { name: 'Fruit Smoothie', price: 170}
  ];

  addToOrder(dish: any) {
    alert(`${dish.name} added to order!`);
  }
}
