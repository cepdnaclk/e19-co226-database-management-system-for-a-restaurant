package com.kassadinx.restaurantdbinterface.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
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
    @JoinColumn
    @Id
    @JsonManagedReference
    private MenuItem menuItem;

    @ManyToOne
    @JoinColumn
    @Id
    @JsonBackReference
    private Order order;

    private int quantity;
}
