import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import { IngredientTable } from "../components/Inventory and Suppliers/IngredientTable";
import { SupplierTable } from "../components/Inventory and Suppliers/SupplierTable";
import { SupplyForm } from "../components/Inventory and Suppliers/SupplyForm";


import React, { useState, useEffect ,useRef} from "react";

import styles from "../styles/Inventory.module.scss";
import {
  ingredients_sample,
  suppliers_sample,
} from "../data/InventoryAndSuppliers";

import {
  fetchIngredients,
  fetchSuppliers,
  SearchInputChange,
} from "../services/Inventory.service";
import { SupplierForm } from "../components/Inventory and Suppliers/SupplierForm";
import { IngredientForm } from "../components/Inventory and Suppliers/IngredientForm";

export const Inventory = () => {
  const [ingredients, setIngredients] = useState(ingredients_sample);
  const [suppliers, setSuppliers] = useState(suppliers_sample);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const backgroundClickRecord = useRef(null);
  const backgroundClickSupply = useRef(null);
  const backgroundClickIngredient = useRef(null);

  useEffect(() => {
    handlefetchIngredients();
    handlefetchSuppliers();
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleBackgroundClickRecord);
    return () => {
      document.removeEventListener("click", handleBackgroundClickRecord);
    };
  }, []);

  const handleBackgroundClickRecord = (e) => {
    if (e.target === backgroundClickRecord.current) {
      setShowForm(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleBackgroundClickSupply);
    return () => {
      document.removeEventListener("click", handleBackgroundClickSupply);
    };
  }, []);

  const handleBackgroundClickSupply = (e) => {
    if (e.target === backgroundClickSupply.current) {
      setShowSupplierForm(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleBackgroundClickIngredient);
    return () => {
      document.removeEventListener("click", handleBackgroundClickIngredient);
    };
  }, []);

  const handleBackgroundClickIngredient = (e) => {
    if (e.target === backgroundClickIngredient.current) {
      setShowIngredientForm(false);
    }
  };

  const handlefetchIngredients = async () => {
    try {
      const response = await fetchIngredients();
      setIngredients(response);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };
  const handlefetchSuppliers = async () => {
    try {
      const response = await fetchSuppliers();
      setSuppliers(response);
      // console.log(response);
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
        {!showForm && (
          <button className={styles.button} onClick={() => setShowForm(true)}>
            Add a Supply Record
          </button>
        )}
        {showForm && (
          <div ref={backgroundClickRecord}>
            <SupplyForm
              suppliers={suppliers}
              ingredients={ingredients}
              onClose={() => {
                setShowForm(false);
              }}
            />
          </div>
        )}
      </div>

      <div className={styles.container}>
        <h2 className={styles.tableHeadings}>Ingredient Table</h2>
        
        <div className={styles.container}>
          {!showIngredientForm && (
            <button
              className={styles.addElementBtn}
              onClick={() => setShowIngredientForm(true)}
            >
              Add Ingredient
            </button>
          )}

          {showIngredientForm && (
            <div className={styles.cardContainer} ref={backgroundClickIngredient}>
              <IngredientForm
                onClose={() => {
                  setShowIngredientForm(false);
                }}
              />
            </div>
          )}
        </div>
        
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search ingredients..."
          className={styles.searchbar}
        />
        <IngredientTable data={ingredients} />
        <h2 className={styles.tableHeadings}>Supplier Table</h2>
        <div className={styles.container}>
          {!showSupplierForm && (
            <button
              className={styles.addElementBtn}
              onClick={() => setShowSupplierForm(true)}
            >
              Add Supplier
            </button>
          )}

          {showSupplierForm && (
            <div className={styles.cardContainer} ref={backgroundClickSupply}>
              <SupplierForm
                onClose={() => {
                  setShowSupplierForm(false);
                }}
              />
            </div>
          )}
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search Suppliers..."
          className={styles.searchbar}
        />
        <SupplierTable data={suppliers} />
      </div>
    </>
  );
};
