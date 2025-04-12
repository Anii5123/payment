import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule], // 👈 Add this line
    templateUrl: './admin_dashboard.component.html',
    styleUrls: ['./admin_dashboard.component.scss']
  })
export class AdminDashboardComponent {
  // Summary counters
  orders = 243;
  payments = 12450;
  refunds = 1280;
  employees = 18;

  // Toggles
  showOrders = false;
  showPayments = false;
  showRefunds = false;
  showEmployees = false;

  selectedOrder: any = null;

  orderStatus = [
    { id: '#ORD-5421', customer: 'John Smith', date: 'Oct 10, 2023', amount: '$45.50', status: 'Pending' },
    { id: '#ORD-5420', customer: 'Sarah Johnson', date: 'Oct 10, 2023', amount: '$23.50', status: 'Delivered' },
    { id: '#ORD-5419', customer: 'Michael Brown', date: 'Oct 11, 2023', amount: '$78.25', status: 'Cancelled' },
    { id: '#ORD-5418', customer: 'Emily Davis', date: 'Oct 10, 2023', amount: '$34.50', status: 'Delivered' },
    { id: '#ORD-5417', customer: 'David Wilson', date: 'Oct 10, 2023', amount: '$29.99', status: 'Pending' },
  ];

  employeeActivities = [
    { name: 'Alex Johnson', action: 'Delivered order #ORD-5435', time: '25 minutes ago' },
    { name: 'Maria Garcia', action: 'Assigned to order #ORD-5431', time: '1 hour ago' },
    { name: 'James Wilson', action: 'Processed refund #REF-778', time: '2 hours ago' },
    { name: 'Sophia Lee', action: 'Cancelled order #ORD-5433', time: '3 hours ago' },
  ];

  toggleSection(section: string) {
    this.showOrders = section === 'orders' ? !this.showOrders : false;
    this.showPayments = section === 'payments' ? !this.showPayments : false;
    this.showRefunds = section === 'refunds' ? !this.showRefunds : false;
    this.showEmployees = section === 'employees' ? !this.showEmployees : false;
  }

  viewOrderDetails(order: any) {
    this.selectedOrder = order;
  }

  updateOrderStatus(orderId: string, newStatus: string) {
    const order = this.orderStatus.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
    }
  }

  deleteOrder(orderId: string) {
    this.orderStatus = this.orderStatus.filter(order => order.id !== orderId);
    if (this.selectedOrder?.id === orderId) {
      this.selectedOrder = null;
    }
  }

  closeOrderDetail() {
    this.selectedOrder = null;
  }
}
