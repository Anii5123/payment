declare namespace google {
    namespace payments {
      namespace api {
        interface PaymentDataRequest {
          apiVersion: number;
          apiVersionMinor: number;
          allowedPaymentMethods: any[];
          transactionInfo: any;
          merchantInfo: any;
        }
  
        interface PaymentData {
          paymentMethodData: any;
        }
  
        interface PaymentsClient {
          new (options: { environment: string }): PaymentsClient;
          createButton(options: any): HTMLElement;
          loadPaymentData(paymentDataRequest: PaymentDataRequest): Promise<PaymentData>;
        }
      }
    }
  }
  