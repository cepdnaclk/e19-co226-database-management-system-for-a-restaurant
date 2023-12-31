package com.kassadinx.restaurantdbinterface.controller;

import com.kassadinx.restaurantdbinterface.dto.OrderRequest;
import com.kassadinx.restaurantdbinterface.model.Order;
import com.kassadinx.restaurantdbinterface.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.findAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.findOrderById(id);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Order> addOrder(@RequestBody OrderRequest orderRequest) {
        Order savedOrder = orderService.saveOrder(orderRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order updatedOrder) {
        Order existingOrder = orderService.findOrderById(id);
        if (existingOrder != null) {
            existingOrder.setDiscount(updatedOrder.getDiscount());
            existingOrder.setPaymentStatus(updatedOrder.getPaymentStatus());
            existingOrder.setCompletionDate(updatedOrder.getCompletionDate());
            existingOrder.setOrderStatus(updatedOrder.getOrderStatus());

            Order savedOrder = orderService.update(existingOrder);
            return ResponseEntity.ok(savedOrder);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/upgrade/{id}/{newStatus}")
    public ResponseEntity<Order> upgradeExistingOrder(@PathVariable long id,@PathVariable String newStatus){
        return ResponseEntity.ok(orderService.upgradeOrder(id,newStatus));
    }

    @PutMapping("/pay/{id}")
    public ResponseEntity<Order> payExistingOrder(@PathVariable long id){
        return ResponseEntity.ok(orderService.makeOrderPaid(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        Order order = orderService.findOrderById(id);
        if (order != null) {
            orderService.deleteOrder(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
