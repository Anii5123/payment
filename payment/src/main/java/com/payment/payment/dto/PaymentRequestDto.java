package com.payment.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.payment.payment.model.Payment; // Ensure this is the correct package for the Payment class
import com.payment.payment.model.Order; // Ensure this is the correct package for the Order class

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestDto {

    private Long paymentId; // Added paymentId field, but it will be optional
    private Long userId;
    private Long orderId; // Added orderId field
    private Payment.PaymentMode paymentMode;
    private Payment.PaymentStatus paymentStatus;
    private Order.OrderStatus orderStatus; // Added orderStatus field

    // Constructor to initialize without paymentId as it's optional
    public PaymentRequestDto(Long userId, Order.OrderStatus orderStatus, Payment.PaymentMode paymentMode, Payment.PaymentStatus paymentStatus) {
        this.userId = userId;
        this.orderStatus = orderStatus;
        this.paymentMode = paymentMode;
        this.paymentStatus = paymentStatus;
    }

    // Getter and setter for paymentId (even though it's optional, we add it here for consistency)
    public Long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    public Long getOrderId() { 
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }
}
