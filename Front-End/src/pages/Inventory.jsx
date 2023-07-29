import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import { IngredientTable } from "../components/Inventory and Suppliers/IngredientTable";
import { SupplierTable } from "../components/Inventory and Suppliers/SupplierTable";
import { SupplyForm } from "../components/Inventory and Suppliers/SupplyForm";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Inventory.module.scss";
import { fetchIngredients,fetchSuppliers,SearchInputChange} from "../services/Inventory.service";

export const Inventory = () => {
  const [ingredients, setIngredients] = useState([]);

  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  

  useEffect(() => {
    handlefetchIngredients();
    handlefetchSuppliers();
  }, []);

  const handlefetchIngredients = async () => {
    try {
      const response = await fetchIngredients();
      setIngredients(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };
  const handlefetchSuppliers = async () => {
    try {
      const response = await fetchSuppliers();
      setSuppliers(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleSearchInputChange = async (event) => {
    setSearchQuery(event.target.value);
    try {
      const response = await SearchInputChange(event);
      setIngredients(response);
    } catch (error) {
      console.error("Error fetching filtered ingredients:", error);
    }
  };

  const handle = (event) => {
    event.preventDefault();
    console.log(ingredient);
    console.log(supplier);

    const data = {
      supplierId: supplier, // Replace 'supplier' with the actual supplier value
      ingredientId: ingredient, // Replace 'ingredient' with the actual ingredient value
      quantity: quantity, // Replace 'quantity' with the actual quantity value
      date: date, // Replace 'date' with the actual date value
      time: time, // Replace 'time' with the actual time value
    };

    try {
      const response = axios.post("http://localhost:8080/api/v1/supply", data);
      console.log("Response:", response.data);
      // Handle successful response here, if needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error here, if needed
    }
  };

  return (
    <>
      <Nav />
      <MenuPanel />

      <br />
      <br />
      <br />
      <br />
      <div className={styles.Hero}>
        <h1>Inventory and Suppliers</h1>
      </div>
      <div className={styles.container}>
        <SupplyForm 
        suppliers={suppliers} 
        ingredients = {ingredients}/>
      </div>
      <div className={styles.container}>
        <h2 className={styles.tableHeadings}>Ingredient Table</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search ingredients..."
          className={styles.searchbar}
        />
        <IngredientTable data={ingredients} />
        <h2 className={styles.tableHeadings}>Supplier Table</h2>
        <SupplierTable data={suppliers} />
      </div>
    </>
  );
};
