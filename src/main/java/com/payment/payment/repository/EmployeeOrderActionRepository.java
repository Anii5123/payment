package com.payment.payment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payment.payment.model.EmployeeOrderAction;

public interface EmployeeOrderActionRepository extends JpaRepository<EmployeeOrderAction, Long> {
    List<EmployeeOrderAction> findByEmployee_EmployeeId(Long employeeId);
    List<EmployeeOrderAction> findByOrder_OrderId(Long orderId);
}
