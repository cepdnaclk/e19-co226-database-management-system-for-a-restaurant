package com.kassadinx.restaurantdbinterface.service;

import com.kassadinx.restaurantdbinterface.dto.MenuItemRequest;
import com.kassadinx.restaurantdbinterface.model.MenuItem;
import com.kassadinx.restaurantdbinterface.model.MenuItemIngredient;
import com.kassadinx.restaurantdbinterface.repository.IngredientRepository;
import com.kassadinx.restaurantdbinterface.repository.MenuItemRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class MenuItemService {
    private final MenuItemRepository menuItemRepository;

    private final IngredientRepository ingredientRepository;


    public MenuItemService(MenuItemRepository menuItemRepository, IngredientRepository ingredientRepository) {
        this.menuItemRepository = menuItemRepository;
        this.ingredientRepository = ingredientRepository;
    }

    public MenuItem createMenuItem(MenuItemRequest menuItemRequest){
        MenuItem newMenuItem = new MenuItem();
        newMenuItem.setCategory(menuItemRequest.getCategory());
        newMenuItem.setName(menuItemRequest.getName());
        newMenuItem.setPrice(menuItemRequest.getPrice());
        newMenuItem.setDescription(menuItemRequest.getDescription());
        MenuItem savedItem = menuItemRepository.save(newMenuItem);

        List<MenuItemIngredient> ingredientList = new ArrayList<>();
        savedItem.setIngredients(ingredientList);
        var providedList = menuItemRequest.getListOfIngredients();
        for(MenuItemRequest.MenuItemIngredientRequest ingredient:providedList){
            System.out.println(ingredient.toString());
            savedItem.getIngredients().add(new
                    MenuItemIngredient(
                            menuItemRepository.findById(savedItem.getId()).get(),
                    ingredientRepository.findById(ingredient.getIngredientId()).get(),
                    ingredient.getQuantity()));

        }

        return menuItemRepository.save(savedItem);
    }
}
//TODO
//Fix the create method to add Ingredients Properly