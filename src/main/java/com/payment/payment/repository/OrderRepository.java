package com.payment.payment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payment.payment.model.EmployeeOrderAction;
import com.payment.payment.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // Correct method to find orders by user's ID
    List<Order> findByUser_UserId(Long userId);

    List<EmployeeOrderAction> findByOrderId(Long orderId);
}
