package com.kassadinx.restaurantdbinterface.service;

import com.kassadinx.restaurantdbinterface.model.Staff;
import com.kassadinx.restaurantdbinterface.repository.StaffRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffService {
    private final StaffRepository staffRepository;

    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    public List<Staff> findAllStaff() {
        return staffRepository.findAll();
    }

    public Staff findStaffById(Long id) {
        Optional<Staff> staff = staffRepository.findById(id);
        return staff.orElse(null);
    }

    public Staff saveStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    public void deleteStaff(Long id) {
        staffRepository.deleteById(id);
    }
}
