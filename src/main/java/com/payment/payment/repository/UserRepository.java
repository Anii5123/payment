package com.payment.payment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import com.payment.payment.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    List<User> findByRole(String role);
    
    Optional<User> findByPhoneNo(String phoneNo);
    
    boolean existsByEmail(String email);
    
    boolean existsByPhoneNo(String phoneNo);
    
    @Override
    boolean existsById(@NonNull Long userId);
}