import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Menu/MenuForm.module.scss";
import { fetchIngredients } from "../../services/Inventory.service";
//TODO: Put the axios methods to service layer if possible
export const MenuItemForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientQuantities, setIngredientQuantities] = useState({});
  const [price, setPrice] = useState("");

  useEffect(() => {
    // Fetch ingredients from the API on component mount
    handlefetchIngredients();
  }, []);

  const handlefetchIngredients = async () => {
    try {
      const response = await fetchIngredients();
      setIngredients(response);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleIngredientSelection = (event, ingredientId) => {
    if (event.target.checked) {
      const selectedIngredient = ingredients.find(
        (ingredient) => ingredient.id === ingredientId
      );
      setSelectedIngredients([...selectedIngredients, selectedIngredient]);
    } else {
      setSelectedIngredients(
        selectedIngredients.filter(
          (ingredient) => ingredient.id !== ingredientId
        )
      );
    }
  };

  const handleQuantityChange = (event, ingredientId) => {
    setIngredientQuantities({
      ...ingredientQuantities,
      [ingredientId]: event.target.value,
    });
  };

  const handleIngredientAdd = (selectedIngredientId) => {
    const selectedIngredient = ingredients.find(
      (ingredient) => ingredient.id === selectedIngredientId
    );
    setSelectedIngredients([...selectedIngredients, selectedIngredient]);
  };

  const handleIngredientRemove = (selectedIngredientId) => {
    setSelectedIngredients(
      selectedIngredients.filter(
        (ingredient) => ingredient.id !== selectedIngredientId
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const menuItemRequest = {
      name,
      category,
      description,
      listOfIngredients: selectedIngredients.map((ingredient) => ({
        ingredientId: ingredient.id,
        quantity: parseInt(ingredientQuantities[ingredient.id], 10),
      })),
      price: parseFloat(price),
    };
    onClose();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/menuitem",
        menuItemRequest
      );
      console.log("MenuItem created:", response.data);
    } catch (error) {
      console.error("Error creating menu item:", error);
    }
  };

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit}>
        <legend className={styles.legend}>
          <strong>Add a Menu Item</strong>
        </legend>
        <div className={styles.card_content}>
          <div className={styles.select}>
            <label>Name &emsp;&emsp;:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required="requred"
            />
          </div>
          <div className={styles.select}>
            <label>Category &ensp;:</label>

            <select
              id="category"
              name="category"
              value={category}
              onChange={handleCategoryChange}
              required="requred"
            >
              <option value="Hors d'oeuvre">Hors d'oeuvre</option>
              <option value="Soup">Soup</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Salad">Salad</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
            </select>
            {/* <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} /> */}
          </div>
          <div className={styles.select}>
            <label>Description :</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.select}>
            <label>Ingredients :</label>

            <select
              onChange={(e) =>
                handleIngredientAdd(parseInt(e.target.value, 10))
              }
              defaultValue=""
            >
              <option disabled value="">
                Select an ingredient
              </option>
              {ingredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.selectItems}>
            {selectedIngredients.map((ingredient) => (
              <div key={ingredient.id} className={styles.showItems}>
                <p>{ingredient.name} - </p>
                <input
                  type="number"
                  min="0"
                  value={ingredientQuantities[ingredient.id] || ""}
                  onChange={(e) => handleQuantityChange(e, ingredient.id)}
                  required="requred"
                />
                {ingredient.quantity_type}
                <button
                  type="button"
                  onClick={() => handleIngredientRemove(ingredient.id)}
                >
                  X
                </button>
              </div>
            ))}
          </div>

          <div className={styles.select}>
            <label>Price &emsp;&emsp;:</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required="requred"
            />
          </div>
          <button className={styles.button} type="submit">
            Create Menu Item
          </button>
        </div>
      </form>
    </div>
  );
};
