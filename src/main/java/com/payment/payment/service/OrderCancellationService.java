package com.payment.payment.service;

import com.payment.payment.model.*;
import com.payment.payment.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OrderCancellationService {

    private final BillService billService;
    private final PaymentService paymentService;
    private final OrderRepository orderRepository;
    private final RefundRepository refundRepository;

    @Transactional
    public String cancelOrderAndRefund(Long orderId, String refundReason) {

        // 1. Fetch Payment
        Payment payment = paymentService.getPaymentByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found for order"));

        // 2. Fetch Bill
        Bill bill = billService.getBillEntityByOrderId(orderId)
        .orElseThrow(() -> new RuntimeException("Bill not found for order"));


        // 3. Fetch Order
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // 4. Create Refund Record
        Refund refund = Refund.builder()
                .payment(payment)
                .refundAmount(payment.getOrder().gettotalAmount()) // or some calculated refund amount
                // .refundReason(refundReason)
                .refundStatus(Refund.RefundStatus.valueOf("INITIATED")) // You can implement different states like INITIATED, etc.
                // .createdAt(LocalDateTime.now())
                .build();
        refundRepository.save(refund);

        // 5. Delete Bill, Payment, and Order
        billService.deleteBill(bill.getBillId());
        // paymentService.deletePayment(payment.getPaymentId());
        orderRepository.deleteById(orderId);

        return "Order canceled and refund processed successfully!";
    }
}

