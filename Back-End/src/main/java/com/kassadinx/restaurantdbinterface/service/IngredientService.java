package com.kassadinx.restaurantdbinterface.service;
import com.kassadinx.restaurantdbinterface.dto.IngredientCreateRequest;
import com.kassadinx.restaurantdbinterface.model.Ingredient;
import com.kassadinx.restaurantdbinterface.repository.IngredientRepository;
import jakarta.transaction.Transactional;
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

    public Ingredient findById(Long id) {
        return ingredientRepository.findById(id).get();
    }

    public Ingredient save(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    public void delete(Long id) {
      ingredientRepository.deleteById(id);
    }

    public List<Ingredient> findIngredientsByNameContaining(String name) {
        return ingredientRepository.findIngredientsByNameContaining(name);
    }


    public Ingredient createIngredient(IngredientCreateRequest request) {
        Ingredient ingredient = new Ingredient();
        ingredient.setName(request.getName());
        ingredient.setQuantity(request.getQuantity());
        ingredient.setQuantityType(request.getQuantityType());
        ingredient.setDescription(request.getDescription());

        Ingredient savedIngredient = ingredientRepository.save(ingredient);
        return savedIngredient;
    }

}
