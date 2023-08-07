import { useState } from "react";
import { handleForm } from "../../services/Inventory.service";
import styles from "../../styles/Inventory/InventoryForm.module.scss";

export const SupplyForm = ({ suppliers, ingredients, onClose }) => {
  const [ingredient, setIngredient] = useState("");
  const [supplier, setSupplier] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [time, setTime] = useState("15:30");

  const handleSubmit = () => {
    // event.preventDefault();
    // console.log(ingredient);
    // console.log(supplier);

    const data = {
      supplierId: supplier, // Replace 'supplier' with the actual supplier value
      ingredientId: ingredient, // Replace 'ingredient' with the actual ingredient value
      quantity: quantity, // Replace 'quantity' with the actual quantity value
      date: date, // Replace 'date' with the actual date value
      time: time, // Replace 'time' with the actual time value
    };
    console.log(data);

    try {
      const response = handleForm(data);
      console.log("Response:", response);
      // Handle successful response here, if needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error here, if needed
    }
  };

  return (
    <div className={styles.card}>
        {/* <button className={styles.close_button}>X</button> */}
      <form onSubmit={onClose}>
        <fieldset>
          <legend className={styles.legend}>
            <strong>Add a Supply Record</strong>
          </legend>
          <div className={styles.card_content}>
            <div className={styles.select}>
              <p>Select Ingredient &nbsp;:</p>
              <select
                value={ingredient}
                onClick={(input) => setIngredient(input.target.value)}
                onChange={(input) => setIngredient(input.target.value)}
                id="ingredient"
                name="ingredient"
              >
                <option disabled selected hidden></option>
                {ingredients.map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.id}>
                    {ingredient.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.select}>
              <p>Select Supplier &emsp;:</p>
              <select
                value={supplier}
                onClick={(input) => setSupplier(input.target.value)}
                onChange={(input) => setSupplier(input.target.value)}
                id="supplier"
                name="supplier"
              >
                <option disabled selected hidden></option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.select}>
              <p>Quantity &ensp;:</p>
              <input
                type="number"
                value={quantity}
                onChange={(input) => setQuantity(input.target.value)}
                required="requred"
              />
            </div>
            <div className={styles.select}>
              <p>Date &emsp;&emsp;:</p>
              <input
                type="date"
                value={date}
                onChange={(input) => setDate(input.target.value)}
                required="requred"
              />
            </div>
            <div className={styles.select}>
              <p>Time &emsp;&emsp;:</p>
              <input
                type="time"
                value={time}
                onChange={(input) => setTime(input.target.value)}
                required="requred"
              />
            </div>
            <button type="submit" className={styles.button} onClick={handleSubmit()}>
              Add Supply Record
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
