package com.kassadinx.restaurantdbinterface.repository;

import com.kassadinx.restaurantdbinterface.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
}
