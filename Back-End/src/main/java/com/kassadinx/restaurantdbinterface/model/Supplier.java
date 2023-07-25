package com.kassadinx.restaurantdbinterface.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;



    private String address;
    @Column(unique = true)
    private String email;
    @ElementCollection
    private List<String> phone;
    @ElementCollection
    private List<String> item;

}