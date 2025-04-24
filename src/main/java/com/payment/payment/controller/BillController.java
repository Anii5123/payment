package com.payment.payment.controller;

import com.payment.payment.dto.BillDTO;
import com.payment.payment.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bills")
@RequiredArgsConstructor
public class BillController {

    private final BillService billService;

    @PostMapping
    public ResponseEntity<BillDTO> createBill(@RequestBody BillDTO billDTO) {
        return ResponseEntity.ok(billService.createBill(billDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BillDTO> getBillById(@PathVariable Long id) {
        return billService.getBillById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<BillDTO>> getAllBills() {
        List<BillDTO> bills = billService.getAllBills();
        return bills.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(bills);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BillDTO> updateBill(@PathVariable Long id, @RequestBody BillDTO billDTO) {
        return ResponseEntity.ok(billService.updateBill(id, billDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBill(@PathVariable Long id) {
        return ResponseEntity.ok(billService.deleteBill(id));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<BillDTO> getBillByOrderId(@PathVariable Long orderId) {
        return billService.getBillByOrderId(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
