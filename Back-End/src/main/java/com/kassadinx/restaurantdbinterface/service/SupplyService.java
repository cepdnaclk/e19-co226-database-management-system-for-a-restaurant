package com.kassadinx.restaurantdbinterface.service;

import com.kassadinx.restaurantdbinterface.dto.SupplyRequest;
import com.kassadinx.restaurantdbinterface.model.Ingredient;
import com.kassadinx.restaurantdbinterface.model.Supplier;
import com.kassadinx.restaurantdbinterface.model.Supply;
import com.kassadinx.restaurantdbinterface.repository.IngredientRepository;
import com.kassadinx.restaurantdbinterface.repository.SupplierRepository;
import com.kassadinx.restaurantdbinterface.repository.SupplyRepository;
import org.springframework.stereotype.Service;

@Service
public class SupplyService {
    private final IngredientRepository ingredientRepository;
    private final SupplierRepository supplierRepository;
    private final SupplyRepository supplyRepository;

    public SupplyService(IngredientRepository ingredientRepository,
                             SupplierRepository supplierRepository,
                             SupplyRepository supplyRepository) {
        this.ingredientRepository = ingredientRepository;
        this.supplierRepository = supplierRepository;
        this.supplyRepository = supplyRepository;
    }


    public Supply saveSupply(SupplyRequest supplyRequest) {
        Ingredient ingredient = ingredientRepository.findById(supplyRequest.getIngredientId()).get();
        Supplier supplier = supplierRepository.findById(supplyRequest.getSupplierId()).get();

        //Update Ingredient Quantity
        ingredient.setQuantity(ingredient.getQuantity() + supplyRequest.getQuantity());
        ingredientRepository.save(ingredient);

        //Create Supply Object
        Supply newSupply = new Supply();
        newSupply.setTime(supplyRequest.getTime());
        newSupply.setDate(supplyRequest.getDate());
        newSupply.setQuantity(supplyRequest.getQuantity());
        newSupply.setSupplier(supplier);
        newSupply.setIngredient(ingredient);

        return supplyRepository.save(newSupply);


    }
}
