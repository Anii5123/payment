package com.payment.payment.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employee")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    private Long employeeId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false)
    private String password;

    // Stored as a string: "Employee" or "Manager"
    @Column(name = "role", nullable = false, length = 20)
    private String role;

    @Column(name = "phone_no", nullable = false, length = 10, unique = true)
    private String phoneNo;

    // Convenience setter for enum input
    public void setRole(EmployeeRole role) {
        this.role = role.getValue();
    }

    // Convenience getter to get role as enum
    public EmployeeRole getRoleEnum() {
        return EmployeeRole.fromValue(this.role);
    }
}


