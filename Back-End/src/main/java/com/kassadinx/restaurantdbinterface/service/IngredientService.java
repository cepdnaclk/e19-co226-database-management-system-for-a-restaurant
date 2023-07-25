package com.kassadinx.restaurantdbinterface.service;
import com.kassadinx.restaurantdbinterface.model.Ingredient;
import com.kassadinx.restaurantdbinterface.repository.IngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {
    private final IngredientRepository ingredientRepository;


    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public List<Ingredient> findAll() {
        return ingredientRepository.findAll();
    }
}
