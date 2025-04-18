package com.payment.payment.repository;

import com.payment.payment.model.Refund;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RefundRepository extends JpaRepository<Refund, Long> {
    List<Refund> findByRefundStatus(String refundStatus);
}
