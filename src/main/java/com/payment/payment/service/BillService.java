package com.payment.payment.service;

import com.payment.payment.dto.BillDTO;
import com.payment.payment.model.Bill;
import com.payment.payment.model.Order;
import com.payment.payment.repository.BillRepository;
import com.payment.payment.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BillService {

    private final BillRepository billRepository;
    private final OrderRepository orderRepository;

    public BillDTO createBill(BillDTO dto) {
        Order order = orderRepository.findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Bill bill = Bill.builder()
                .order(order)
                .amount(dto.getAmount())
                .billDate(dto.getBillDate() != null ? dto.getBillDate() : java.time.LocalDateTime.now())
                .payment(dto.getPayment())
                .build();

        return toDto(billRepository.save(bill));
    }

    public Optional<BillDTO> getBillById(Long id) {
        return billRepository.findById(id).map(this::toDto);
    }

    public List<BillDTO> getAllBills() {
        return billRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public BillDTO updateBill(Long id, BillDTO dto) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found"));

        Order order = orderRepository.findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        bill.setAmount(dto.getAmount());
        bill.setOrder(order);
        bill.setPayment(dto.getPayment());
        bill.setBillDate(dto.getBillDate());

        return toDto(billRepository.save(bill));
    }

    public String deleteBill(Long id) {
        if (!billRepository.existsById(id)) {
            return "Bill not found!";
        }
        billRepository.deleteById(id);
        return "Bill deleted successfully!";
    }

    public Optional<BillDTO> getBillByOrderId(Long orderId) {
        return billRepository.findByOrder_OrderId(orderId).map(this::toDto);
    }

    public Optional<Bill> getBillEntityByOrderId(Long orderId) {
        return billRepository.findByOrder_OrderId(orderId);
    }
    

    private BillDTO toDto(Bill bill) {
        return BillDTO.builder()
                .billId(bill.getBillId())
                .orderId(bill.getOrder().getOrderId())
                .amount(bill.getAmount())
                .billDate(bill.getBillDate())
                .payment(bill.getPayment())
                .build();
    }
} 
