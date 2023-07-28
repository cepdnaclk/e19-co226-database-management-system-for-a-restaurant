package com.kassadinx.restaurantdbinterface.controller;

import com.kassadinx.restaurantdbinterface.dto.SupplyRequest;
import com.kassadinx.restaurantdbinterface.model.Supply;
import com.kassadinx.restaurantdbinterface.service.SupplyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/supply")
public class SupplyController {
    private final SupplyService supplyService;

    public SupplyController(SupplyService supplyService) {
        this.supplyService = supplyService;
    }

    @PostMapping
    public ResponseEntity<Supply> createSupply(@RequestBody SupplyRequest supplyRequest){
        Supply savedSupply = supplyService.saveSupply(supplyRequest);
        return new ResponseEntity<>(savedSupply, HttpStatus.CREATED);
    }
}
