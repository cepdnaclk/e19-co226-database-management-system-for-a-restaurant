import React from 'react';
import './IngredientTable.css';
export const IngredientTable = ({ data }) => {


  return (
    <div>
      
      
      <table className="ingredient-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Quantity Type</th>
            <th>Description</th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {data.map((ingredient, index) => (
            <tr key={index}>
              <td>{ingredient.id}</td>
              <td>{ingredient.name}</td>
              <td>{ingredient.quantity}</td>
              <td>{ingredient.quantity_type}</td>
              <td>{ingredient.description}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


