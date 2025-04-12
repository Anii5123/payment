import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-online-payment',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './online-payment.component.html',
  styleUrls: ['./online-payment.component.css']
})
export class OnlinePaymentComponent {
  card = {
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    saveCard: false
  };

  pay() {
    alert(`Paying $32.33 with card ending in ${this.card.number.slice(-4)}`);
  }
}
