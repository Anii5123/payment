import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'menu',
    loadComponent: () =>
      import('./pages/dish-selection/dish-selection.component').then(
        (m) => m.DishSelectionComponent
      ),
  },
  {
    path: 'order-customization',
    loadComponent: () =>
      import('./pages/order-customization/order_customization.component').then(
        (m) => m.OrderCustomizationComponent
      ),
  },
  {
    path: 'order-summary',
    loadComponent: () =>
      import('./pages/order-summary/order_summary.component').then(
        (m) => m.OrderSummaryComponent
      ),
  },
  {
    path: 'payment-selection',
    loadComponent: () =>
      import('./pages/payment-selection/payment_selection.component').then(
        (m) => m.PaymentSelectionComponent
      ),
  },
  {
    path: 'order-confirmation',
    loadComponent: () =>
      import('./pages/order-confirmation/order_confirmation.component').then(
        (m) => m.OrderConfirmationComponent
      ),
  },
  {
    path: 'order-tracking',
    loadComponent: () =>
      import('./pages/order-tracking/order_tracking.component').then(
        (m) => m.OrderTrackingComponent
      ),
  },
  {
    path: 'cancel-order',
    loadComponent: () =>
      import('./pages/cancel-order/cancel_order.component').then(
        (m) => m.CancelOrderComponent
      ),
  },
  {
    path: 'cancel-confirmation',
    loadComponent: () =>
      import('./pages/cancel-confirmation/cancel_confirmation.component').then(
        (m) => m.CancelConfirmationComponent
      ),
  },
  {
    path: 'refund-request',
    loadComponent: () =>
      import('./pages/refund-request/refund_request.component').then(
        (m) => m.RefundRequestComponent
      ),
  },
  {
    path: 'employee-dashboard',
    loadComponent: () =>
      import('./pages/employee-dashboard/employee_dashboard.component').then(
        (m) => m.EmployeeDashboardComponent
      ),
  },
  {
    path: 'admin-dashboard',
    loadComponent: () =>
      import('./pages/admin-dashboard/admin_dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  {
    path: 'pay-onl',
    loadComponent: () =>import('./pages/online-payment/online-payment.component').then(
      (m) => m.OnlinePayComponent,
    ),
  }
];
