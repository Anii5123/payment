package com.payment.payment.service;

import com.payment.payment.model.Bill;
import com.payment.payment.repository.BillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BillService {

    private final BillRepository billRepository;

    public Bill createBill(Bill bill) {
        return billRepository.save(bill);
    }

    public Optional<Bill> getBillById(Long id) {
        return billRepository.findById(id);
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public Bill updateBill(Long id, Bill updatedBill) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found"));
        bill.setAmount(updatedBill.getAmount());
        bill.setOrder(updatedBill.getOrder());
        bill.setPayment(updatedBill.getPayment());
        bill.setBillDate(updatedBill.getBillDate());
        return billRepository.save(bill);
    }

    public String deleteBill(Long id) {
        if (!billRepository.existsById(id)) {
            return "Bill not found!";
        }
        billRepository.deleteById(id);
        return "Bill deleted successfully!";
    }

    public Optional<Bill> getBillByOrderId(Long orderId) {
        return billRepository.findByOrder_OrderId(orderId);
    }
}    
