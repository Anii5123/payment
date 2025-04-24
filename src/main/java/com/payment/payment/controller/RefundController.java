package com.payment.payment.controller;

import com.payment.payment.model.Refund;
import com.payment.payment.service.RefundService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/refunds")
@RequiredArgsConstructor
public class RefundController {

    private final RefundService refundService;

    @PostMapping
    public ResponseEntity<Refund> createRefund(@RequestBody Refund refund) {
        return ResponseEntity.ok(refundService.createRefund(refund));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Refund> getRefundById(@PathVariable Long id) {
        return refundService.getRefundById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Refund>> getAllRefunds() {
        List<Refund> refunds = refundService.getAllRefunds();
        return refunds.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(refunds);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Refund> updateRefund(@PathVariable Long id, @RequestBody Refund refund) {
        return ResponseEntity.ok(refundService.updateRefund(id, refund));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRefund(@PathVariable Long id) {
        return ResponseEntity.ok(refundService.deleteRefund(id));
    }
}
