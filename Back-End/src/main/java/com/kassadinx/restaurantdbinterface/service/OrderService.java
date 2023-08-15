package com.kassadinx.restaurantdbinterface.service;

import com.kassadinx.restaurantdbinterface.dto.OrderRequest;
import com.kassadinx.restaurantdbinterface.model.*;
import com.kassadinx.restaurantdbinterface.repository.CustomerRepository;
import com.kassadinx.restaurantdbinterface.repository.MenuItemRepository;
import com.kassadinx.restaurantdbinterface.repository.OrderRepository;
import com.kassadinx.restaurantdbinterface.repository.StaffRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final CustomerRepository customerRepository;
    private final StaffRepository staffRepository;
    private final MenuItemRepository menuItemRepository;
    private final OrderRepository orderRepository;


    public OrderService(CustomerRepository customerRepository,
                        StaffRepository staffRepository,
                        MenuItemRepository menuItemRepository,
                        OrderRepository orderRepository) {
        this.customerRepository = customerRepository;
        this.staffRepository = staffRepository;
        this.menuItemRepository = menuItemRepository;
        this.orderRepository = orderRepository;
    }


    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

    public Order findOrderById(Long id) {
        Optional<Order> order = orderRepository.findById(id);
        return order.orElse(null);
    }
    @Transactional
    public Order saveOrder(OrderRequest orderRequest) {
        // Retrieve the customer and staff entities based on the provided IDs
        Customer customer = customerRepository.findById(orderRequest.getCustomerId()).orElse(null);
        Staff staff = staffRepository.findById(orderRequest.getStaffId()).orElse(null);

        if (customer == null || staff == null) {
            // Handle case when customer or staff is not found
            throw new IllegalArgumentException("Customer or Staff not found");
        }

        // Create a new Order entity and set its properties from the OrderRequest
        Order order = new Order();
        order.setCustomer(customer);
        order.setStaff(staff);
        order.setDiscount(orderRequest.getDiscount());
        order.setPaymentStatus("Pending");
        order.setOrderStatus("New");
        order.setPlacementDate(LocalDate.now());
        order.setPlacementTime(LocalTime.now());

        // Save the Order entity to the database
        orderRepository.save(order);

        // Calculate the total amount based on menu items and their quantities
        float totalAmount = 0;
        List<OrderMenuItem> orderMenuItems = new ArrayList<>();
        for (OrderRequest.OrderMenuItemRequest menuItemRequest : orderRequest.getMenuItems()) {
            Long menuItemId = menuItemRequest.getMenuItemId();
            int quantity = menuItemRequest.getQuantity();
            MenuItem menuItem = menuItemRepository.findById(menuItemId).orElse(null);

            if (menuItem == null) {
                // Handle case when menu item is not found
                throw new IllegalArgumentException("Menu item not found");
            }

            orderRepository.insertOrderMenuItem(
                    menuItemId,
                    order.getId(),
                    quantity
            );



            // Calculate the subtotal for this menu item and quantity
            float subtotal = menuItem.getPrice() * quantity;
            totalAmount += subtotal;


        }



        Order circularUpdatedOrder = orderRepository.findById(order.getId()).get();

        // Update the total amount on the order
        circularUpdatedOrder.setAmount(totalAmount);

        // Save the updated order entity to the database
        Order newOrder =  orderRepository.save(circularUpdatedOrder);

        return orderRepository.findByIdWithAssociations(newOrder.getId()).get();


    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    public Order update(Order existingOrder) {
        return orderRepository.save(existingOrder);
    }

    public Order upgradeOrder(Long id,String newStatus){
        Order order = orderRepository.findById(id).get();
        order.setOrderStatus(newStatus);
        return orderRepository.save(order);

    }

    public Order makeOrderPaid(Long id){
        Order order = orderRepository.findById(id).get();
        order.setPaymentStatus("Paid");
        order.setCompletionDate(LocalDate.now());
        return orderRepository.save(order);

    }
}
