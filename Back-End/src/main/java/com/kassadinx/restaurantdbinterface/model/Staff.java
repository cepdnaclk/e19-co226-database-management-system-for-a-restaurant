package com.kassadinx.restaurantdbinterface.model;

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
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String firstName;

    private String lastName;

    private String address;
    private float salary;
    private String position;

    private LocalDate startDate;
    @Column(unique = true)
    private String email;
    @ElementCollection
    private List<String> phone;


}