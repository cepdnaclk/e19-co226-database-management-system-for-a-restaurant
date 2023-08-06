package com.kassadinx.restaurantdbinterface.model;

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
    private MenuItem menuItem;

    @ManyToOne
    @Id
    private Ingredient ingredient;

    private int quantity;
}
