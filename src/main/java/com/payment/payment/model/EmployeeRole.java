package com.payment.payment.model;

public enum EmployeeRole {
    EMPLOYEE("Employee"),
    MANAGER("Manager");

    private final String value;

    EmployeeRole(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }

    public static EmployeeRole fromValue(String value) {
        for (EmployeeRole role : values()) {
            if (role.getValue().equalsIgnoreCase(value)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid role: " + value);
    }
}
