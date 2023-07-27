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
//form states
  const [ingredient,setIngredient] = useState("");
  const [supplier,setSupplier] = useState("");
  const [date,setDate] = useState("");
  const[quantity,setQuantity] = useState(0);
  const[time,setTime] = useState("15:30");

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

  const handle = (event) =>{
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
        const response = axios.post('http://localhost:8080/api/v1/supply', data);
        console.log('Response:', response.data);
        // Handle successful response here, if needed
      } catch (error) {
        console.error('Error:', error);
        // Handle error here, if needed
      }
    


  }

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
      <form>
            <fieldset className="flex flex-col gap-3">
              <legend>
                <strong>Add Supply Record</strong>
              </legend>
              <select
                style={{ width: "97%", height: "35px" }}
                value={ingredient}
                onClick={(input) => setIngredient(input.target.value)}
                onChange={(input) => setIngredient(input.target.value)}
                id="ingredient"
                name="ingredient"
                className="mx-5 px-3 border border-gray-300 rounded-md"
              >
                <option disabled selected hidden>
                  
                </option>
                {ingredients.map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.id}>
                    {ingredient.id} || {ingredient.name} || {ingredient.type} || age(months): {ingredient.ageInMonths}
                  </option>
                ))}
              </select>
              <select
                style={{ width: "97%", height: "35px" }}
                value={supplier}
                onClick={(input) => setSupplier(input.target.value)}
                onChange={(input) => setSupplier(input.target.value)}
                id="supplier"
                name="supplier"
                className="mx-5 px-3 border border-gray-300 rounded-md"
              >
                <option disabled selected hidden>
                  
                </option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.id} || {supplier.name} || {supplier.type} || age(months): {supplier.ageInMonths}
                  </option>
                ))}
              </select>
              <p className="py-1">Quantity:</p>
              <input
                  type="text"
                  value={quantity}
                  onChange={(input) => setQuantity(input.target.value)}
                  required="requred"
                  className="mx-5 py-1"
                />

              <div className="flex flex-row align-center border-gray-300 justify-start gap-6 border rounded-md ml-5 mr-1 px-4">
                <p className="py-1">Date:</p>
                <input
                  type="date"
                  value={date}
                  onChange={(input) => setDate(input.target.value)}
                  required="requred"
                  className="mx-5 py-1"
                />
              </div>
              <button
                
                className="suggest-date-button bg-gray-600 mx-5 w-1/4"
                onClick = {handle}
              >
                Add Supply Record
              </button>
              
            </fieldset>
          </form>
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
