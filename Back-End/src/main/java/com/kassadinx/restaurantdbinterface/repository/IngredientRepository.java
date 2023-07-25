package com.kassadinx.restaurantdbinterface.repository;

import com.kassadinx.restaurantdbinterface.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient,Integer> {

}
