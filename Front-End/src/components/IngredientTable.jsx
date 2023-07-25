import React,{useState} from 'react';
import './IngredientTable.css';
export const IngredientTable = ({ data }) => {
    const [isTableVisible, setIsTableVisible] = useState(true);

    const toggleTableVisibility = () => {
        setIsTableVisible((prevIsTableVisible) => !prevIsTableVisible);
      };
    
      const visibleRows = isTableVisible ? data : data.slice(0, 5);
  return (
    <div>
      <h2>Ingredient Table</h2>
      <button onClick={toggleTableVisibility}>
        {isTableVisible ? 'Hide Table' : 'Show Table'}
      </button>
      <table className="ingredient-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((ingredient, index) => (
            <tr key={index}>
              <td>{ingredient.name}</td>
              <td>{ingredient.quantity}</td>
              <td>{ingredient.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


