package com.kassadinx.restaurantdbinterface.service;

import com.kassadinx.restaurantdbinterface.dto.MenuItemRequest;
import com.kassadinx.restaurantdbinterface.model.MenuItem;
import com.kassadinx.restaurantdbinterface.model.MenuItemIngredient;
import com.kassadinx.restaurantdbinterface.repository.IngredientRepository;
import com.kassadinx.restaurantdbinterface.repository.MenuItemRepository;
import jakarta.transaction.Transactional;
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
    @Transactional
    public MenuItem createMenuItem(MenuItemRequest menuItemRequest){
        MenuItem newMenuItem = new MenuItem();
        newMenuItem.setCategory(menuItemRequest.getCategory());
        newMenuItem.setName(menuItemRequest.getName());
        newMenuItem.setPrice(menuItemRequest.getPrice());
        newMenuItem.setDescription(menuItemRequest.getDescription());
        MenuItem savedItem = menuItemRepository.save(newMenuItem);


        var providedList = menuItemRequest.getListOfIngredients();
        for(MenuItemRequest.MenuItemIngredientRequest ingredient:providedList){
            System.out.println(ingredient.toString() + " " + savedItem.getId());
            menuItemRepository.insertMenuItemIngredient(savedItem.getId(),
                    ingredient.getIngredientId(),
                    ingredient.getQuantity());

        }

        return savedItem;
    }
}
//TODO
//Fix the create method to add Ingredients Properly