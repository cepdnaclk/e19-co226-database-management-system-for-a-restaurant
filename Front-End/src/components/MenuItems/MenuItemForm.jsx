import React, { useState, useEffect } from 'react';
import axios from 'axios';
//TODO: Put the axios methods to service layer if possible
export const MenuItemForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientQuantities, setIngredientQuantities] = useState({});
  const [price, setPrice] = useState('');

  useEffect(() => {
    // Fetch ingredients from the API on component mount
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

  const handleIngredientSelection = (event, ingredientId) => {
    if (event.target.checked) {
      const selectedIngredient = ingredients.find((ingredient) => ingredient.id === ingredientId);
      setSelectedIngredients([...selectedIngredients, selectedIngredient]);
    } else {
      setSelectedIngredients(selectedIngredients.filter((ingredient) => ingredient.id !== ingredientId));
    }
  };

  const handleQuantityChange = (event, ingredientId) => {
    setIngredientQuantities({ ...ingredientQuantities, [ingredientId]: event.target.value });
  };

  const handleIngredientAdd = (selectedIngredientId) => {
    const selectedIngredient = ingredients.find((ingredient) => ingredient.id === selectedIngredientId);
    setSelectedIngredients([...selectedIngredients, selectedIngredient]);
  };

  const handleIngredientRemove = (selectedIngredientId) => {
    setSelectedIngredients(selectedIngredients.filter((ingredient) => ingredient.id !== selectedIngredientId));
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

    try {
      const response = await axios.post('http://localhost:8080/api/v1/menuitem', menuItemRequest);
      console.log('MenuItem created:', response.data);
    } catch (error) {
      console.error('Error creating menu item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Ingredients:</label>
        <div>
          <select onChange={(e) => handleIngredientAdd(parseInt(e.target.value, 10))} defaultValue="">
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
        <div>
          {selectedIngredients.map((ingredient) => (
            <div key={ingredient.id}>
              {ingredient.name} -{' '}
              <input
                type="number"
                min="0"
                value={ingredientQuantities[ingredient.id] || ''}
                onChange={(e) => handleQuantityChange(e, ingredient.id)}
              />
              <button type="button" onClick={() => handleIngredientRemove(ingredient.id)}>
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>Price:</label>
        <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <button type="submit">Create Menu Item</button>
    </form>
  );
};


