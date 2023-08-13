package com.kassadinx.restaurantdbinterface.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//Menu Items use Different Ingredients
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table

public class MenuItemIngredient {

    @ManyToOne
    @Id
    @JsonBackReference
    private MenuItem menuItem;

    @ManyToOne
    @Id
    @JsonManagedReference
    private Ingredient ingredient;

    private int quantity;
}
