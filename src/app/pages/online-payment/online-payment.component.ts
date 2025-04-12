import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

declare const google: any;

@Component({
  selector: 'app-online-pay',
  templateUrl: './online-payment.component.html',
  styleUrls: ['./online-payment.component.scss']
})
export class OnlinePayComponent implements OnInit {
  totalAmount: string = '21.96'; // Can be made dynamic

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.loadGooglePayButton();
  }

  loadGooglePayButton() {
    const paymentsClient = new google.payments.api.PaymentsClient({
      environment: environment.googlePayEnvironment
    });

    const googlePayButton: HTMLElement = paymentsClient.createButton({
      onClick: this.onGooglePayButtonClick.bind(this),
      buttonType: 'long',
      buttonColor: 'default'
    });

    const buttonContainer = document.getElementById('google-pay-button');
    if (buttonContainer) {
      buttonContainer.appendChild(googlePayButton);
    }
  }

  onGooglePayButtonClick() {
    const paymentsClient = new google.payments.api.PaymentsClient({
      environment: environment.googlePayEnvironment
    });

    const paymentDataRequest: google.payments.api.PaymentDataRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['VISA', 'MASTERCARD']
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'exampleMerchantId'
            }
          }
        }
      ],
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: this.totalAmount,
        currencyCode: 'USD'
      },
      merchantInfo: {
        merchantName: 'Food Franchise',
        merchantId: 'BCR2DN4T67A7V5G4'
      }
    };

    paymentsClient.loadPaymentData(paymentDataRequest)
      .then((paymentData: google.payments.api.PaymentData) => {
        console.log('Payment Data:', paymentData);

        const successSection = document.getElementById('payment-success');
        if (successSection) {
          successSection.classList.remove('hidden');
          successSection.classList.add('visible');
        }

        setTimeout(() => {
          this.router.navigate(['/order-confirmation']);
        }, 3000);
      })
      .catch((err: any) => {
        console.error('Payment failed', err);
        alert('Payment failed. Please try again.');
      });
  }
}
