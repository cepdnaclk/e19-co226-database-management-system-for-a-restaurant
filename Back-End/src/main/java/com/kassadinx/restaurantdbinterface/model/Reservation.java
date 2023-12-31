package com.kassadinx.restaurantdbinterface.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String firstName;

    private String lastName;

    private int tableNumber;
    private LocalDate reservationDate;

    @ManyToOne
    @JoinColumn
    @JsonManagedReference
    private Staff staff;

    @ManyToOne
    @JoinColumn
    @JsonManagedReference
    private Customer customer;

}