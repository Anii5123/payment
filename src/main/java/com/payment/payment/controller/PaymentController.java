package com.payment.payment.controller;

import com.payment.payment.dto.PaymentRequestDto;
import com.payment.payment.model.Payment;
import com.payment.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    // Method to map the Payment entity to DTO
    private PaymentRequestDto mapToDto(Payment payment) {
        return new PaymentRequestDto(
                payment.getPaymentId(),
                payment.getOrder().getUser().getUserId(),
                payment.getOrder().getOrderDate(),
                payment.getOrder().getOrderStatus(),
                payment.getPaymentStatus()
        );
    }

    // Create Payment
    @PostMapping
    public ResponseEntity<PaymentRequestDto> createPayment(@RequestBody Payment payment) {
        Payment createdPayment = paymentService.createPayment(payment);
        return ResponseEntity.ok(mapToDto(createdPayment)); // Return DTO after creation
    }

    // Get Payment by ID
    @GetMapping("/{id}")
    public ResponseEntity<PaymentRequestDto> getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id)
                .map(payment -> ResponseEntity.ok(mapToDto(payment))) // Return DTO for single Payment
                .orElse(ResponseEntity.notFound().build());
    }

    // Get all Payments
    @GetMapping
    public ResponseEntity<List<PaymentRequestDto>> getAllPayments() {
        List<PaymentRequestDto> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments); // Return list of Payment DTOs directly
    }

    // Update Payment
    @PutMapping("/{id}")
    public ResponseEntity<PaymentRequestDto> updatePayment(@PathVariable Long id, @RequestBody Payment payment) {
        Payment updatedPayment = paymentService.updatePayment(id, payment);
        return ResponseEntity.ok(mapToDto(updatedPayment)); // Return updated Payment as DTO
    }

    // Delete Payment
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePayment(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.deletePayment(id));
    }
}