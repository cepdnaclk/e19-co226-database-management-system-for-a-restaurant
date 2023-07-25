package com.kassadinx.restaurantdbinterface.controller;

import com.kassadinx.restaurantdbinterface.model.Ingredient;
import com.kassadinx.restaurantdbinterface.service.IngredientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ingredients")
public class IngredientController {

    private final IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping
    public ResponseEntity<List<Ingredient>> getAllIngredients(){
        return ResponseEntity.ok(ingredientService.findAll());
    }

}
