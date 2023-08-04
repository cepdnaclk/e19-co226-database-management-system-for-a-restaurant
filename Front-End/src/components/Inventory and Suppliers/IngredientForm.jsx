import React, { useState } from 'react';
import { createIngredient} from '../../services/Inventory.service';
import styles from "../../styles/InventoryForm.module.scss";

export const IngredientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    description: '',
    quantityType:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    createIngredient(formData);
    console.log(formData);
  };

  return (
    <div className={styles.card}>
    <form onSubmit={handleSubmit}>

    <legend className={styles.legend}>
            <strong>Add an Ingredient</strong>
    </legend>
    <div className={styles.card_content}>
      <div className={styles.select}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
      </div>

      <div className={styles.select}>
        <label htmlFor="quantity">Quantity</label>
        <input type="text" name="quantity" id="quantity" value={formData.quantity} onChange={handleChange} />
      </div>

      <div className={styles.select}>
        <label htmlFor="quantityType">Quantity Type</label>
        <input type="text" name="quantityType" id="quantityType" value={formData.quantityType} onChange={handleChange} />
      </div>
      <div className={styles.select}>
        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" value={formData.description} onChange={handleChange} />
      </div>


      
        
    </div>

    <button type="submit">Submit</button>
    </form>
    </div>
  );
};


