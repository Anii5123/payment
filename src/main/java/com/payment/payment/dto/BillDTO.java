package com.payment.payment.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BillDTO {
    private Long billId;
    private Long orderId;
    private LocalDateTime billDate;
    private Double amount;
    private String payment; // Paid or Unpaid
}