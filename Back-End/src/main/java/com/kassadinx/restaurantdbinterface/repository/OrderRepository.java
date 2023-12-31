package com.kassadinx.restaurantdbinterface.repository;

import com.kassadinx.restaurantdbinterface.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByCustomerId(long customerId);
    @Modifying
    @Query(value = "INSERT INTO order_menu_item (menu_item_id, order_id, quantity) VALUES (:menuItemId, :orderId, :quantity)", nativeQuery = true)
    void insertOrderMenuItem(
            @Param("menuItemId") Long menuItemId,
            @Param("orderId") Long orderId,
            @Param("quantity") int quantity
    );

    @Override
    @Query("SELECT DISTINCT o FROM Order o " +
            "JOIN FETCH o.customer c " +
            "JOIN FETCH o.staff s " +
            "LEFT JOIN FETCH o.menuItems mi " +
            "LEFT JOIN FETCH mi.menuItem m " +
            "LEFT JOIN FETCH m.ingredients i " +
            "ORDER BY o.placementDate DESC, o.placementTime DESC")
    List<Order> findAll();

    @Query("SELECT DISTINCT o FROM Order o " +
            "JOIN FETCH o.customer c " +
            "JOIN FETCH o.staff s " +
            "LEFT JOIN FETCH o.menuItems mi " +
            "LEFT JOIN FETCH mi.menuItem m " +
            "LEFT JOIN FETCH m.ingredients i " +
            "WHERE o.id = :orderId")
    Optional<Order> findByIdWithAssociations(@Param("orderId") Long orderId);

}
