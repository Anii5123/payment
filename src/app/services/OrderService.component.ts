import { Injectable } from '@angular/core';

export interface OrderItem {
  title: string;
  image: string;
  size: { name: string; price: number };
  crust: string;
  toppings: { name: string; price: number; selected: boolean }[];
  quantity: number;
  instructions: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private currentOrder: OrderItem | null = null;

  setOrder(order: OrderItem): void {
    this.currentOrder = order;
  }

  getOrder(): OrderItem | null {
    return this.currentOrder;
  }

  clearOrder(): void {
    this.currentOrder = null;
  }
}