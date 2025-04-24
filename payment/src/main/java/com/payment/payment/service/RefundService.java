package com.payment.payment.service;

import com.payment.payment.model.Refund;
import com.payment.payment.repository.RefundRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RefundService {

    private final RefundRepository refundRepository;

    public Refund createRefund(Refund refund) {
        return refundRepository.save(refund);
    }

    public Optional<Refund> getRefundById(Long id) {
        return refundRepository.findById(id);
    }

    public List<Refund> getAllRefunds() {
        return refundRepository.findAll();
    }

    public Refund updateRefund(Long id, Refund refundDetails) {
        return refundRepository.findById(id).map(refund -> {
            refund.setRefundAmount(refundDetails.getRefundAmount());
            refund.setRefundStatus(refundDetails.getRefundStatus());
            refund.setRefundDate(refundDetails.getRefundDate());
            refund.setPayment(refundDetails.getPayment());
            return refundRepository.save(refund);
        }).orElseThrow(() -> new RuntimeException("Refund not found with id " + id));
    }

    public String deleteRefund(Long id) {
        if (!refundRepository.existsById(id)) {
            return "Refund not found!";
        }
        refundRepository.deleteById(id);
        return "Refund deleted successfully!";
    }

    public List<Refund> getRefundsByStatus(String status) {
        return refundRepository.findByRefundStatus(status);
    }
}
