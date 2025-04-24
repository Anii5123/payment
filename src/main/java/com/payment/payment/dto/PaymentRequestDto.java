package com.payment.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import com.payment.payment.model.Payment; // Ensure this is the correct package for the Payment class
import com.payment.payment.model.Order; // Ensure this is the correct package for the Order class
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestDto {
    private Long paymentId;
    private Long userId;
    private LocalDateTime orderDate;
    private Order.OrderStatus orderStatus;
    private Payment.PaymentStatus paymentStatus;
}


