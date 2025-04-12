import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order_confirmation.component.html',
  styleUrls: ['./order_confirmation.component.scss']
})
export class OrderConfirmationComponent {
  paymentMethod: string = 'Cash on Delivery';

  constructor(private readonly router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['paymentMethod']) {
      this.paymentMethod = nav.extras.state['paymentMethod'];
    }
  }

  handleTrackOrder() {
    this.router.navigate(['/order-tracking']);
  }

  navigateToMenu() {
    this.router.navigate(['/menu']);
  }
}
