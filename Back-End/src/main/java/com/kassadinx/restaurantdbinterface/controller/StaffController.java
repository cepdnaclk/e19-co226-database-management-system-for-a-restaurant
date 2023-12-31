package com.kassadinx.restaurantdbinterface.controller;

import com.kassadinx.restaurantdbinterface.dto.StaffCreateRequest;
import com.kassadinx.restaurantdbinterface.model.Staff;
import com.kassadinx.restaurantdbinterface.service.StaffService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/staff")
public class StaffController {
    private final StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @GetMapping
    public ResponseEntity<List<Staff>> getAllStaff() {
        List<Staff> staffList = staffService.findAllStaff();
        return ResponseEntity.ok(staffList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaffById(@PathVariable Long id) {
        Staff staff = staffService.findStaffById(id);
        if (staff != null) {
            return ResponseEntity.ok(staff);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Staff> addStaff(@RequestBody StaffCreateRequest staffCreateRequest) {
        Staff staff = new Staff();

        //Mapping
        staff.setCategory(staffCreateRequest.getCategory());
        staff.setFirstName(staffCreateRequest.getFirstName());
        staff.setLastName(staffCreateRequest.getLastName());
        staff.setPosition(staffCreateRequest.getPosition());
        staff.setAssignedWork(staffCreateRequest.getAssignedWork());
        staff.setDescription(staffCreateRequest.getDescription());
        staff.setImageUrl(staffCreateRequest.getImageUrl());
        staff.setSalary(staffCreateRequest.getSalary());
        staff.setEmail(staffCreateRequest.getEmail());
        staff.setPhone(staffCreateRequest.getPhone());
        staff.setAddress(staffCreateRequest.getAddress());
        staff.setStartDate(LocalDate.now());

        Staff savedStaff = staffService.saveStaff(staff);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStaff);
    }
    @PostMapping("/bulk")
    public ResponseEntity<Void> addMultipleStaff(@RequestBody List<StaffCreateRequest> staffCreateRequests) {
        for (StaffCreateRequest staffCreateRequest : staffCreateRequests) {
            Staff staff = new Staff();

            // Mapping
            staff.setCategory(staffCreateRequest.getCategory());
            staff.setFirstName(staffCreateRequest.getFirstName());
            staff.setLastName(staffCreateRequest.getLastName());
            staff.setPosition(staffCreateRequest.getPosition());
            staff.setAssignedWork(staffCreateRequest.getAssignedWork());
            staff.setDescription(staffCreateRequest.getDescription());
            staff.setImageUrl(staffCreateRequest.getImageUrl());
            staff.setSalary(staffCreateRequest.getSalary());
            staff.setEmail(staffCreateRequest.getEmail());
            staff.setPhone(staffCreateRequest.getPhone());
            staff.setAddress(staffCreateRequest.getAddress());
            staff.setStartDate(LocalDate.now());

            staffService.saveStaff(staff);
        }

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Staff> updateStaff(@PathVariable Long id, @RequestBody Staff updatedStaff) {
        Staff existingStaff = staffService.findStaffById(id);
        if (existingStaff != null) {
            existingStaff.setFirstName(updatedStaff.getFirstName());
            existingStaff.setLastName(updatedStaff.getLastName());
            existingStaff.setAddress(updatedStaff.getAddress());
            existingStaff.setSalary(updatedStaff.getSalary());
            existingStaff.setPosition(updatedStaff.getPosition());
            existingStaff.setStartDate(updatedStaff.getStartDate());
            existingStaff.setEmail(updatedStaff.getEmail());
            existingStaff.setPhone(updatedStaff.getPhone());

            Staff savedStaff = staffService.saveStaff(existingStaff);
            return ResponseEntity.ok(savedStaff);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable Long id) {
        Staff staff = staffService.findStaffById(id);
        if (staff != null) {
            staffService.deleteStaff(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
