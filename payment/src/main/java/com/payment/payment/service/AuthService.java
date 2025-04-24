package com.payment.payment.service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.payment.payment.model.User;
import com.payment.payment.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    private static final Pattern PHONE_PATTERN = Pattern.compile("^\\d{10}$");
    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,}$");
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");

    public String registerUser(User user) {
        if (!EMAIL_PATTERN.matcher(user.getEmail()).matches()) {
            return "Invalid email format!";
        }
        if (!PHONE_PATTERN.matcher(user.getPhoneNo()).matches()) {
            return "Phone number must be exactly 10 digits!";
        }
        if (!PASSWORD_PATTERN.matcher(user.getPassword()).matches()) {
            return "Password must be at least 10 characters long and include an uppercase letter, lowercase letter, a number, and a special character!";
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email is already registered!";
        }
        if (userRepository.existsByPhoneNo(user.getPhoneNo())) {
            return "Phone number is already registered!";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "User registered successfully!";
    }

    public String loginUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return "User not found!";
        }

        User user = userOptional.get();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return "Invalid password!";
        }
        return "Login successful!";
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    public String updateUser(Long userId, User updatedUser) {
        Optional<User> existingUserOpt = userRepository.findById(userId);
        if (existingUserOpt.isEmpty()) {
            return "User not found!";
        }

        User existingUser = existingUserOpt.get();

        if (updatedUser.getEmail() != null && EMAIL_PATTERN.matcher(updatedUser.getEmail()).matches()) {
            if (!existingUser.getEmail().equals(updatedUser.getEmail()) &&
                userRepository.existsByEmail(updatedUser.getEmail())) {
                return "Email already in use!";
            }
            existingUser.setEmail(updatedUser.getEmail());
        }

        if (updatedUser.getPhoneNo() != null && PHONE_PATTERN.matcher(updatedUser.getPhoneNo()).matches()) {
            if (!existingUser.getPhoneNo().equals(updatedUser.getPhoneNo()) &&
                userRepository.existsByPhoneNo(updatedUser.getPhoneNo())) {
                return "Phone number already in use!";
            }
            existingUser.setPhoneNo(updatedUser.getPhoneNo());
        }

        if (updatedUser.getPassword() != null &&
            PASSWORD_PATTERN.matcher(updatedUser.getPassword()).matches()) {
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        userRepository.save(existingUser);
        return "User updated successfully!";
    }

    public String deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            return "User not found!";
        }

        userRepository.deleteById(userId);
        return "User deleted successfully!";
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
