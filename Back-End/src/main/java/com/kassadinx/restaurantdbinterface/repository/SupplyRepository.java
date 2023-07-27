package com.kassadinx.restaurantdbinterface.repository;

import com.kassadinx.restaurantdbinterface.model.Supply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplyRepository extends JpaRepository<Supply,Long> {
}
