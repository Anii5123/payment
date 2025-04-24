package com.payment.payment.repository;

import com.payment.payment.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BillRepository extends JpaRepository<Bill, Long> {
    Optional<Bill> findByOrder_OrderId(Long orderId);
}
