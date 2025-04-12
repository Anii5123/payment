package com.payment.payment.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "bills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bill_id")
    private Long billId;

    @OneToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "bill_date", nullable = false)
    @Builder.Default
    private LocalDateTime billDate = LocalDateTime.now();

    @Column(name = "amount", nullable = false)
    private Double amount;

    @Column(name = "payment", length = 50)
    private String payment; // e.g., 'Paid', 'Unpaid'
}
