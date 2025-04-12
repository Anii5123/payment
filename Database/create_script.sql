-- Database: Management

-- DROP DATABASE IF EXISTS "Management";

-- CREATE DATABASE "Management"
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'English_United States.1252'
--     LC_CTYPE = 'English_United States.1252'
--     LOCALE_PROVIDER = 'libc'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;

-- 1️⃣ Users Table (Renamed `user` to `users`)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'User' CHECK (role IN ('User', 'Admin')),
    cancellation_count INT DEFAULT 0
);

-- 2️⃣ Employee Table
CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'Employee' CHECK (role IN ('Employee', 'Manager'))
);

-- 3️⃣ Orders Table (Renamed `order_table` to `orders`)
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    order_date TIMESTAMP DEFAULT NOW(),
    order_status VARCHAR(50) NOT NULL CHECK (order_status IN ('Pending', 'Approved', 'Canceled', 'Completed')),
    total_amount DECIMAL(10,2) NOT NULL
);

-- 4️⃣ Payment Table
CREATE TABLE payment (
    payment_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
    payment_date TIMESTAMP DEFAULT NOW(),
    payment_status VARCHAR(50) NOT NULL CHECK (payment_status IN ('Pending', 'Pending Approval', 'Completed', 'Failed')),
    payment_mode VARCHAR(50) NOT NULL CHECK (payment_mode IN ('Online', 'Cash on Delivery'))
);

-- 5️⃣ Bill Table
CREATE TABLE bill (
    bill_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
    payment_id INT REFERENCES payment(payment_id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    bill_date TIMESTAMP DEFAULT NOW()
);

-- 6️⃣ Refund Table
CREATE TABLE refund (
    refund_id SERIAL PRIMARY KEY,
    payment_id INT REFERENCES payment(payment_id) ON DELETE CASCADE,
    refund_amount DECIMAL(10,2) NOT NULL,
    refund_status VARCHAR(50) NOT NULL CHECK (refund_status IN ('Pending', 'Processed', 'Failed')),
    refund_date TIMESTAMP DEFAULT NOW()
);

-- 7️⃣ Employee Order Action Table
CREATE TABLE employee_order_action (
    action_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employee(employee_id) ON DELETE CASCADE,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
    action_type VARCHAR(50) NOT NULL CHECK (action_type IN ('Approved COD', 'Rejected COD', 'Refund Processed')),
    action_date TIMESTAMP DEFAULT NOW()
);
