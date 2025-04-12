import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-cancel-confirmation',
  templateUrl: './cancel_order.component.html',
  styleUrls: ['./cancel_order.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class CancelOrderComponent {
  reasons: string[] = [
    'Changed my mind',
    'Ordered by mistake',
    'Delivery time too long',
    'Found better price elsewhere',
    'Other reason'
  ];
  selectedReason: string = '';
  comments: string = '';

  constructor(
    private readonly router: Router,
    private readonly location: Location
  ) {}

  goBack() {
    this.location.back();
  }

  confirmCancellation() {
    if (!this.selectedReason) return;
  
    console.log('Navigating to confirmation page...');
    this.router.navigateByUrl('/cancel-confirmation').then(success => {
      console.log('Navigation success:', success);
    }).catch(err => {
      console.error('Navigation error:', err);
    });
  }
  
}
