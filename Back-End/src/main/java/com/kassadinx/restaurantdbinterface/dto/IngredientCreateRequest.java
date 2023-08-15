package com.kassadinx.restaurantdbinterface.dto;

import com.kassadinx.restaurantdbinterface.model.MenuItemIngredient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IngredientCreateRequest {
    private String name;
    private int quantity;
    private String quantityType;
    private String Description;

}
