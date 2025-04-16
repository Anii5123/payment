package com.payment.payment.service;

import com.payment.payment.dto.PaymentRequestDto;
import com.payment.payment.model.Order;
import com.payment.payment.model.Payment;
import com.payment.payment.repository.OrderRepository;
import com.payment.payment.repository.PaymentRepository;
import com.payment.payment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public List<PaymentRequestDto> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();
        return payments.stream()
                .map(PaymentService::mapToDto)
                .toList();
    }

    public Optional<Payment> getPaymentById(Long paymentId) {
        return paymentRepository.findById(paymentId);
    }

    public Payment createPayment(PaymentRequestDto dto) {
        // Step 1: Fetch user
        userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + dto.getUserId()));
    
        // Step 2: Fetch the existing order using orderId (must be provided)
        Order order = orderRepository.findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + dto.getOrderId()));
    
        // Ensure the order belongs to the user
        if (!order.getUser().getUserId().equals(dto.getUserId())) {
            throw new RuntimeException("Order does not belong to the user.");
        }
    
        // Step 3: Update order status based on payment mode
        if (dto.getPaymentMode() == Payment.PaymentMode.Online) {
            order.setOrderStatus(Order.OrderStatus.Completed);
        } else {
            order.setOrderStatus(Order.OrderStatus.Approved);
        }
        
        orderRepository.save(order); // Save the updated order
    
        // Step 4: Create payment
        Payment payment = Payment.builder()
                .order(order)
                .paymentStatus(dto.getPaymentStatus())
                .paymentMode(dto.getPaymentMode())
                .paymentDate(LocalDateTime.now())
                .build();
    
        // Step 5: Save payment
        return paymentRepository.save(payment);
    }
    

    public Payment updatePayment(Long id, Payment updatedPayment) {
        return paymentRepository.findById(id)
                .map(existingPayment -> {
                    existingPayment.setOrder(updatedPayment.getOrder());
                    existingPayment.setPaymentDate(updatedPayment.getPaymentDate());
                    existingPayment.setPaymentStatus(updatedPayment.getPaymentStatus());
                    existingPayment.setPaymentMode(updatedPayment.getPaymentMode());
                    return paymentRepository.save(existingPayment);
                })
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + id));
    }

    public String deletePayment(Long paymentId) {
        if (!paymentRepository.existsById(paymentId)) {
            return "Payment not found!";
        }
        paymentRepository.deleteById(paymentId);
        return "Payment deleted successfully!";
    }

    public Optional<Payment> getPaymentByOrderId(Long orderId) {
        return paymentRepository.findByOrder_OrderId(orderId);
    }

    private static PaymentRequestDto mapToDto(Payment payment) {
        if (payment == null || payment.getOrder() == null || payment.getOrder().getUser() == null) {
            throw new IllegalArgumentException("Payment, Order, or User cannot be null");
        }

        return new PaymentRequestDto(
                payment.getOrder().getUser().getUserId(),
                payment.getOrder().getOrderStatus(),
                payment.getPaymentMode(),
                payment.getPaymentStatus()
        );
    }
}
