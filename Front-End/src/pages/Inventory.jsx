import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import { IngredientTable } from "../components/IngredientTable";
import { SupplierTable } from "../components/SupplierTable";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Inventory.module.scss";

export const Inventory = () => {
  const [ingredients, setIngredients] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchIngredients();
    fetchSuppliers();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/ingredients"
      );
      setIngredients(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };
  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/suppliers"
      );
      setSuppliers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleSearchInputChange = async (event) => {
    setSearchQuery(event.target.value);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/ingredients/search?name=${event.target.value}`
      );
      setIngredients(response.data);
    } catch (error) {
      console.error("Error fetching filtered ingredients:", error);
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
