package com.payment.payment.service;

import com.payment.payment.model.Payment;
import com.payment.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentById(Long paymentId) {
        return paymentRepository.findById(paymentId);
    }

    public Payment createPayment(Payment payment) {
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
}
