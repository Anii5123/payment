package com.payment.payment.service;

import com.payment.payment.dto.PaymentRequestDto;
import com.payment.payment.model.Payment;
import com.payment.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public List<PaymentRequestDto> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();
        return payments.stream()
                .filter(payment -> payment.getOrder() != null && payment.getOrder().getUser() != null)
                .map(PaymentService::mapToDto)
                .toList();
    }
    

    public Optional<Payment> getPaymentById(Long paymentId) {
        return paymentRepository.findById(paymentId);
    }

    public Payment createPayment(Payment payment) {
        payment.setPaymentStatus(Payment.PaymentStatus.Completed);
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
                payment.getPaymentId(),
                payment.getOrder().getUser().getUserId(),
                payment.getOrder().getOrderDate(),
                payment.getOrder().getOrderStatus(),
                payment.getPaymentStatus()
        );
    }
    
}
