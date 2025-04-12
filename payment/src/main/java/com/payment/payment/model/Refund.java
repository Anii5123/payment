package com.payment.payment.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "refund")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Refund {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "refund_id")
    private Long refundId;

    @OneToOne
    @JoinColumn(name = "payment_id", nullable = false)
    private Payment payment;

    @Column(name = "refund_amount", nullable = false)
    private Double refundAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "refund_status", length = 50, nullable = false)
    private RefundStatus refundStatus;

    @Column(name = "refund_date", nullable = false)
    @Builder.Default
    private LocalDateTime refundDate = LocalDateTime.now();

    public enum RefundStatus {
        PENDING, PROCESSED, FAILED
    }
}
