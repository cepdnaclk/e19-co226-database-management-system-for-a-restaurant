package com.kassadinx.restaurantdbinterface.repository;

import com.kassadinx.restaurantdbinterface.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IngredientRepository extends JpaRepository<Ingredient,Long> {

    @Query("SELECT i FROM Ingredient i WHERE i.name LIKE %:name%")
    List<Ingredient> findIngredientsByNameContaining(String name);

}
