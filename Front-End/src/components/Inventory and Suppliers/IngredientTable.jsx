
import React,{useState} from 'react';
import styles from '../../styles/ReservationsTable.module.scss';

export const IngredientTable = ({ data }) => {

  console.log(data);
  return (
    <div className={styles.container}>

      
      
      <table className={styles.Table}>

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


