package com.kassadinx.restaurantdbinterface.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String firstName;

    private String lastName;

    private String address;
    @Column(unique = true)
    private String email;
    @ElementCollection
    private List<String> phone;

    @OneToMany(mappedBy = "customer")
    @JsonBackReference
    private List<Order> orders;

    @OneToMany(mappedBy = "customer")
    @JsonBackReference
    private List<Reservation> reservations;
}
