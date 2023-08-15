package com.kassadinx.restaurantdbinterface.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffCreateRequest {
    private String category;
    private String firstName;
    private String lastName;
    private String position;

    private String email;
    private String assignedWork;
    private String description;
    private String imageUrl;

    private String address;
    private float salary;

    private List<String> phone;
}
