import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  address: string;
  paymentMode: string;
  amount: number;
  status: 'active' | 'delivered' | 'cancelled';
  notes: string;
  items: OrderItem[];
}

@Component({
    selector: 'app-employee-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './employee_dashboard.component.html',
    styleUrls: ['./employee_dashboard.component.scss']
  })
export class EmployeeDashboardComponent {
  tabs = ['Active Orders', 'Delivered', 'Cancelled'];
  tabKeys = ['active', 'delivered', 'cancelled'] as const;
  selectedTab: 'active' | 'delivered' | 'cancelled' = 'active';

  orders: Order[] = [
    {
      id: 'ORD-2458',
      address: '123 Main St, Apt 4B',
      paymentMode: 'COD',
      amount: 24.99,
      status: 'active',
      notes: 'Please call when you arrive. The doorbell is broken. Leave at door if no response.',
      items: [
        { name: 'Chicken Burger', quantity: 2, price: 9.99 },
        { name: 'French Fries', quantity: 1, price: 3.5 },
        { name: 'Chocolate Shake', quantity: 1, price: 3.99 },
      ]
    },
    {
      id: 'ORD-2459',
      address: '456 Ocean Ave',
      paymentMode: 'Online',
      amount: 18.5,
      status: 'delivered',
      notes: 'Ring twice and hand over.',
      items: [
        { name: 'Veg Pizza', quantity: 1, price: 12 },
        { name: 'Cola', quantity: 2, price: 3.25 }
      ]
    },
    {
      id: 'ORD-2460',
      address: '789 Sunset Blvd',
      paymentMode: 'COD',
      amount: 15.25,
      status: 'cancelled',
      notes: 'Customer cancelled due to delay.',
      items: [
        { name: 'Paneer Wrap', quantity: 1, price: 7.25 },
        { name: 'Iced Tea', quantity: 2, price: 4 }
      ]
    }
  ];

  selectedOrder: Order | null = null;

  get filteredOrders(): Order[] {
    return this.orders.filter(order => order.status === this.selectedTab);
  }

  changeTab(index: number) {
    this.selectedTab = this.tabKeys[index];
    this.selectedOrder = null;
  }

  selectOrder(order: Order) {
    this.selectedOrder = order;
  }

  markAsDelivered(orderId: string) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = 'delivered';
      alert(`Order ${orderId} marked as delivered.`);
      this.selectedOrder = null;
    }
  }

  confirmCollection(orderId: string) {
    alert(`Cash collected for order ${orderId}.`);
  }

  viewDetails(orderId: string) {
    alert(`Redirecting to detailed view of ${orderId}...`);
  }
}
