import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-refund-request',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],  // 👈 Add these here
  templateUrl: './refund_request.component.html',
  styleUrls: ['./refund_request.component.scss']
})
export class RefundRequestComponent {
  transactionId: string = '';
  otp: string = '';
  refundSubmitted: boolean = false;
  refundSuccess: boolean = false;

  constructor(private readonly router: Router) {}

  requestOtp() {
    setTimeout(() => {
      alert('OTP has been sent: 123456 (Demo only)');
      this.otp = '123456'; // Autofill for demo/testing
    }, 1000);
  }

  submitRefundRequest() {
    if (!this.transactionId || !this.otp) {
      alert('Please enter both Transaction ID and OTP.');
      return;
    }

    this.refundSubmitted = true;

    setTimeout(() => {
      this.refundSuccess = true;
    }, 3000); // Simulate backend processing delay
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
