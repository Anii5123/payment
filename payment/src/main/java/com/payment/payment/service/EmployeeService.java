package com.payment.payment.service;

import com.payment.payment.model.Employee;
import com.payment.payment.model.EmployeeRole;
import com.payment.payment.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
    private static final Pattern PHONE_PATTERN = Pattern.compile("^\\d{10}$");
    private static final Pattern PASSWORD_PATTERN = Pattern.compile(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,}$"
    );

    public String registerEmployee(Employee employee) {
        if (!EMAIL_PATTERN.matcher(employee.getEmail()).matches()) {
            return "Invalid email format!";
        }

        if (!PHONE_PATTERN.matcher(employee.getPhoneNo()).matches()) {
            return "Phone number must be exactly 10 digits!";
        }

        if (!PASSWORD_PATTERN.matcher(employee.getPassword()).matches()) {
            return "Password must be at least 10 characters long and include an uppercase letter, lowercase letter, a number, and a special character!";
        }

        if (employeeRepository.existsByEmail(employee.getEmail())) {
            return "Email is already registered!";
        }

        // Validate and normalize role
        try {
            EmployeeRole role = EmployeeRole.fromValue(employee.getRole());
            employee.setRole(role);
        } catch (IllegalArgumentException e) {
            return "Role must be either 'Employee' or 'Manager'!";
        }

        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        employeeRepository.save(employee);
        return "Employee registered successfully!";
    }

    public String loginEmployee(String email, String password) {
        Optional<Employee> employeeOptional = employeeRepository.findByEmail(email);
        if (employeeOptional.isEmpty()) {
            return "Employee not found!";
        }

        Employee employee = employeeOptional.get();
        if (!passwordEncoder.matches(password, employee.getPassword())) {
            return "Invalid password!";
        }

        return "Login successful!";
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public String updateEmployee(Long id, Employee updatedEmployee) {
        Optional<Employee> existingEmployeeOpt = employeeRepository.findById(id);
        if (existingEmployeeOpt.isEmpty()) {
            return "Employee not found!";
        }

        Employee existingEmployee = existingEmployeeOpt.get();

        if (updatedEmployee.getEmail() != null &&
            EMAIL_PATTERN.matcher(updatedEmployee.getEmail()).matches()) {
            if (!existingEmployee.getEmail().equals(updatedEmployee.getEmail()) &&
                employeeRepository.existsByEmail(updatedEmployee.getEmail())) {
                return "Email already in use!";
            }
            existingEmployee.setEmail(updatedEmployee.getEmail());
        }

        if (updatedEmployee.getName() != null) {
            existingEmployee.setName(updatedEmployee.getName());
        }

        if (updatedEmployee.getPhoneNo() != null &&
            PHONE_PATTERN.matcher(updatedEmployee.getPhoneNo()).matches()) {
            existingEmployee.setPhoneNo(updatedEmployee.getPhoneNo());
        }

        if (updatedEmployee.getPassword() != null &&
            PASSWORD_PATTERN.matcher(updatedEmployee.getPassword()).matches()) {
            existingEmployee.setPassword(passwordEncoder.encode(updatedEmployee.getPassword()));
        }

        if (updatedEmployee.getRole() != null) {
            try {
                EmployeeRole role = EmployeeRole.fromValue(updatedEmployee.getRole());
                existingEmployee.setRole(role);
            } catch (IllegalArgumentException e) {
                return "Role must be either 'Employee' or 'Manager'!";
            }
        }

        employeeRepository.save(existingEmployee);
        return "Employee updated successfully!";
    }

    public String deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            return "Employee not found!";
        }
        employeeRepository.deleteById(id);
        return "Employee deleted successfully!";
    }
}
