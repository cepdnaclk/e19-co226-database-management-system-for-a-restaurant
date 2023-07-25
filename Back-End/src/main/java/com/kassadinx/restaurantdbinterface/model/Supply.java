package com.kassadinx.restaurantdbinterface.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Supply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;
    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;


    @ManyToOne
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

    private int quantity;

    private LocalDate date;

    private LocalTime time;

    // Constructors, getters, and setters
}
