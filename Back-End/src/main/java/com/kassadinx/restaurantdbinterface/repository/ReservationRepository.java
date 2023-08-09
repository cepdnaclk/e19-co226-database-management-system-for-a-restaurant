package com.kassadinx.restaurantdbinterface.repository;

import com.kassadinx.restaurantdbinterface.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query(value = "SELECT * FROM reservation WHERE table_number = :tableNumber", nativeQuery = true)
    List<Reservation> findReservationsByTableNumber(@Param("tableNumber") int tableNumber);
}
