package com.payment.payment.service;

import com.payment.payment.dto.OrderRequestDto;
import com.payment.payment.model.Order;
import com.payment.payment.model.Order.OrderStatus;
import com.payment.payment.model.User;
import com.payment.payment.repository.OrderRepository;
import com.payment.payment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    // ✅ Create order using DTO
    public Order createOrder(OrderRequestDto dto) {
        Long userId = dto.getUserId();
        return userRepository.findById(userId).map(user -> {
            Order order = new Order();
            order.setUser(user);

            // Convert orderStatus string to Enum safely
            try {
                OrderStatus status = OrderStatus.valueOf(dto.getOrderStatus());
                order.setOrderStatus(status);
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid order status: " + dto.getOrderStatus());
            }

            order.setTotalAmount(dto.getTotalAmount().doubleValue());
            order.setOrderDate(LocalDateTime.now());
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }

    public Order updateOrder(Long id, Order updatedOrder) {
        return orderRepository.findById(id).map(existingOrder -> {
            existingOrder.setOrderStatus(updatedOrder.getOrderStatus());
            existingOrder.setTotalAmount(updatedOrder.getTotalAmount());
            existingOrder.setUser(updatedOrder.getUser());
            return orderRepository.save(existingOrder);
        }).orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUser_UserId(userId);
    }

    // ✅ Increment cancellationCount on delete
    public String deleteOrder(Long orderId) {
        return orderRepository.findById(orderId).map(order -> {
            User user = order.getUser();
            user.setCancellationCount(user.getCancellationCount() + 1);
            userRepository.save(user);
            orderRepository.deleteById(orderId);
            return "Order deleted and user cancellation count incremented.";
        }).orElse("Order not found!");
    }
}
