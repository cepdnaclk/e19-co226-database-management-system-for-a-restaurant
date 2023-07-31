package com.kassadinx.restaurantdbinterface.repository;

import com.kassadinx.restaurantdbinterface.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByCustomerId(long customerId);
}
