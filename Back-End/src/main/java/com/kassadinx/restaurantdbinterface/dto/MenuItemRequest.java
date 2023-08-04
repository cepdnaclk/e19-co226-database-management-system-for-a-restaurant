package com.kassadinx.restaurantdbinterface.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuItemRequest {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MenuItemIngredientRequest{
        private long ingredientId;
        private int quantity;

    }


    private String name;
    private String category;

    private String description;

    private List<MenuItemIngredientRequest> listOfIngredients;
    private float price;
}
