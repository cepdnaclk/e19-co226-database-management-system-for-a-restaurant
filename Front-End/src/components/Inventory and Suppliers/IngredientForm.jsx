import React, { useState } from "react";
import { createIngredient } from "../../services/Inventory.service";
import styles from "../../styles/IngredientForm.module.scss";

export const IngredientForm = ({onClose}) => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    description: "",
    quantityType: "",
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
    onClose();
  };

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit}>
        <legend className={styles.legend}>
          <strong>Add an Ingredient</strong>
        </legend>
        <div className={styles.card_content}>
          <div className={styles.select}>
            <label htmlFor="name">Name &emsp;&emsp;&nbsp;:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              required = "true"
              onChange={handleChange}
            />
          </div>

          <div className={styles.select}>
            <label htmlFor="quantity">Quantity &ensp;&ensp;&nbsp;:</label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              required = "true"
              onChange={handleChange}
            />
          </div>

          <div className={styles.select}>
            <label htmlFor="quantityType">Type &ensp;&ensp;&ensp;&ensp;&ensp;&nbsp;:</label>
            <input
              type="text"
              name="quantityType"
              id="quantityType"
              value={formData.quantityType}
              required = "true"
              onChange={handleChange}
            />
          </div>
          <div className={styles.select}>
            <label htmlFor="description">Description :</label>
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              required = "true"
              onChange={handleChange}
            />
          </div>
        

        <button className={styles.button} type="submit">
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};
