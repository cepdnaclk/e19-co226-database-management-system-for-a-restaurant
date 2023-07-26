import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel"; 
import {IngredientTable} from "../components/IngredientTable"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styleTable from "../styles/IngredientTable.module.scss"

export const Inventory = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/ingredients');
      setIngredients(response.data);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const handleSearchInputChange = async (event) => {
    setSearchQuery(event.target.value);
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/ingredients/search?name=${event.target.value}`);
      setIngredients(response.data);
    } catch (error) {
      console.error('Error fetching filtered ingredients:', error);
    }
  };

  

  return (
    <div>
      <Nav />
      <MenuPanel />

      

    <br/>
    <br/>
    <br/>
    <br/>
      <div>
        <h1>Inventory and Suppliers</h1>
      </div>
      {/* <h2>Ambrosia Bistro</h2> */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search ingredients..."
      />
      

      <IngredientTable data={ingredients} />
    </div>
  );
};
