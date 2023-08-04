package com.kassadinx.restaurantdbinterface.repository;

import com.kassadinx.restaurantdbinterface.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MenuItemRepository extends JpaRepository<MenuItem,Long> {
@Modifying
    @Query(value = "INSERT INTO menu_item_ingredient (menu_item_id, ingredient_id, quantity) VALUES (:menuItemId, :ingredientId, :quantity)", nativeQuery = true)
    void insertMenuItemIngredient(
            @Param("menuItemId") Long menuItemId,
            @Param("ingredientId") Long ingredientId,
            @Param("quantity") int quantity
    );
}
