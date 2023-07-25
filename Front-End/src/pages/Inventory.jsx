import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel"; 
import {IngredientTable} from "../components/IngredientTable"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styleTable from "../styles/IngredientTable.module.scss"

export const Inventory = () => {

    const [ingredients, setIngredients] = useState([
        { name : 'Tomato', quantity: 7, Description: 'Fresh and juicy red tomatoes' },
        { name : 'Cheese', quantity: 4, Description: 'Your favorite type of cheese' },
        
      ]);

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

    const data = [
        { name : 'Tomato', quantity: 7, Description: 'Fresh and juicy red tomatoes' },
        { name : 'Cheese', quantity: 4, Description: 'Your favorite type of cheese' },
        
      ];
  return (
    <div>
        
      <Nav />
      <MenuPanel />
      <div>
        <h1>Inventory and Suppliers</h1>
      </div>
      {/* <h2>Ambrosia Bistro</h2> */}
      
      <IngredientTable data={ingredients} />
    </div>
  );
};
