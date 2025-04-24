package com.payment.payment.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.payment.payment.model.EmployeeOrderAction;
import com.payment.payment.repository.EmployeeOrderActionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeOrderActionService {

    private final EmployeeOrderActionRepository actionRepository;

    public List<EmployeeOrderAction> getActionsByEmployeeId(Long employeeId) {
        // Change this line to use the new method name
        return actionRepository.findByEmployee_EmployeeId(employeeId);
    }

    public List<EmployeeOrderAction> getActionsByOrderId(Long orderId) {
        // Change this line to use the new method name
        return actionRepository.findByOrder_OrderId(orderId);
    }

    public EmployeeOrderAction saveAction(EmployeeOrderAction action) {
        return actionRepository.save(action);
    }
}