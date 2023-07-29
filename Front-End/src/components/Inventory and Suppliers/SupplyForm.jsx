import { useState } from "react";
import { handleForm } from "../../services/Inventory.service";
import styles from "../../styles/InventoryForm.module.scss"

export const SupplyForm = ({ suppliers, ingredients }) => {
  const [ingredient, setIngredient] = useState("");
  const [supplier, setSupplier] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [time, setTime] = useState("15:30");

  const handleSubmit = (event) => {
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
        <form>
          <fieldset>
            <legend className={styles.legend}>
              <strong>Add Supply Record</strong>
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
                          {ingredient.id} || {ingredient.name} || {ingredient.type} ||
                          age(months): {ingredient.ageInMonths}
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
                          {supplier.id} || {supplier.name} || {supplier.type} ||
                          age(months): {supplier.ageInMonths}
                        </option>
                      ))}
                    </select>
                </div>
                <div className={styles.select}>
                <p>Quantity &ensp;:</p>
                    <input
                      type="text"
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
                <button
                  onClick={handleSubmit}
                >
                  Add Supply Record
                </button>
            </div>
          </fieldset>
        </form>
    </div>
  );
};
