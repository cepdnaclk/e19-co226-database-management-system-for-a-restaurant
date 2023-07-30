import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import { IngredientTable } from "../components/Inventory and Suppliers/IngredientTable";
import { SupplierTable } from "../components/Inventory and Suppliers/SupplierTable";
import { SupplyForm } from "../components/Inventory and Suppliers/SupplyForm";
import React, { useState, useEffect ,useRef} from "react";
import styles from "../styles/Inventory.module.scss";
import { ingredients_sample, suppliers_sample } from "../data/InventoryAndSuppliers";

import {
  fetchIngredients,
  fetchSuppliers,
  SearchInputChange,
} from "../services/Inventory.service";

export const Inventory = () => {
  const [ingredients, setIngredients] = useState(ingredients_sample);
  const [suppliers, setSuppliers] = useState(suppliers_sample);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const backgroundClick = useRef(null);

  useEffect(() => {
    handlefetchIngredients();
    handlefetchSuppliers();
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleBackgroundClick);
    return () => {
      document.removeEventListener("click", handleBackgroundClick);
    };
  },[]);

  const handleBackgroundClick = (e) => {
    if (e.target === backgroundClick.current) {
      setShowForm(false);
    }
  };

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

  return (
    <>
      <Nav />
      <MenuPanel />

      <div className={styles.Hero}>
        <h1>Inventory and Suppliers</h1>
      </div>
      <div className={styles.container}>
        {!showForm && <button className={styles.button} onClick={() => setShowForm(true)}>
          Add a Supply Record
        </button>}
        {showForm && <div ref={backgroundClick}>
          <SupplyForm
            suppliers={suppliers}
            ingredients={ingredients}
            onClose={() => {
              setShowForm(false);
            }}
            
          />
        </div>}
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
