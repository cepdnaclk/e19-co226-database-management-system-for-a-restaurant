package com.kassadinx.restaurantdbinterface.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table

public class OrderMenuItem {



    @ManyToOne
    @Id
    private MenuItem menuItem;

    @ManyToOne
    @Id
    private Order order;

    private int quantity;
}
