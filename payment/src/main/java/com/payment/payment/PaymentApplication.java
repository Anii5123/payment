package com.payment.payment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

// @SpringBootApplication
// public class PaymentApplication {
//     public static void main(String[] args) {
//         SpringApplication.run(PaymentApplication.class, args);
//     }
// }


@SpringBootApplication
@EntityScan("com.payment.payment.model")
@EnableJpaRepositories("com.payment.payment.repository")
public class PaymentApplication {
    public static void main(String[] args) {
        SpringApplication.run(PaymentApplication.class, args);
    }
}