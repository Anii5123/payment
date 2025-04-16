package com.payment.payment.controller;

import com.payment.payment.dto.PaymentRequestDto;
import com.payment.payment.model.Payment;
import com.payment.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    
    @PostMapping
    public ResponseEntity<PaymentRequestDto> createPayment(@RequestBody PaymentRequestDto dto) {
        Payment createdPayment = paymentService.createPayment(dto);
        return ResponseEntity.ok(mapToDto(createdPayment));
    }

   
    @GetMapping("/{id}")
    public ResponseEntity<PaymentRequestDto> getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id)
                .map(payment -> ResponseEntity.ok(mapToDto(payment)))
                .orElse(ResponseEntity.notFound().build());
    }

    
    @GetMapping
    public ResponseEntity<List<PaymentRequestDto>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaymentRequestDto> updatePayment(@PathVariable Long id, @RequestBody Payment payment) {
        Payment updatedPayment = paymentService.updatePayment(id, payment);
        return ResponseEntity.ok(mapToDto(updatedPayment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePayment(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.deletePayment(id));
    }

    private PaymentRequestDto mapToDto(Payment payment) {
        return new PaymentRequestDto(
                payment.getOrder().getUser().getUserId(),
                payment.getOrder().getOrderStatus(),
                payment.getPaymentMode(),
                payment.getPaymentStatus()
        );
    }
}
