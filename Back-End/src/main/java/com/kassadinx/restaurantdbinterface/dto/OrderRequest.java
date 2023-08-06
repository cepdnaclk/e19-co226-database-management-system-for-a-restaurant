package com.kassadinx.restaurantdbinterface.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    private Long customerId;
    private Long staffId;
    private float discount;
    private String paymentStatus;
    private String orderStatus;
    private List<OrderMenuItemRequest> menuItems;

    // Additional fields for placementDate and placementTime
    private LocalDate placementDate;
    private LocalTime placementTime;

    // Additional field for the total amount
    private float amount;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderMenuItemRequest {
        private Long menuItemId;
        private int quantity;
    }
}
