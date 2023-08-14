package com.kassadinx.restaurantdbinterface.controller;
import com.kassadinx.restaurantdbinterface.dto.MenuItemRequest;
import com.kassadinx.restaurantdbinterface.model.MenuItem;
import com.kassadinx.restaurantdbinterface.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/menuitem")
public class MenuItemController {

    private final MenuItemService menuItemService;

    public MenuItemController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @PostMapping
    public ResponseEntity<MenuItem> createMenuItem(@RequestBody MenuItemRequest menuItemRequest) {


        MenuItem menuItem = menuItemService.createMenuItem(menuItemRequest);
        return new ResponseEntity<>(menuItem, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<MenuItem>> getAllMenuItems(){
        return new ResponseEntity<>(menuItemService.getAllMenuItems(),HttpStatus.OK);
    }
}
