package com.kassadinx.restaurantdbinterface.dto;

import com.kassadinx.restaurantdbinterface.model.Ingredient;
import com.kassadinx.restaurantdbinterface.model.Supplier;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplyRequest {


        private long id;
        private long supplierId;
        private long ingredientId;
        private int quantity;
        private LocalDate date;
        private LocalTime time;

}
