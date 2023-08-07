import React, { useState } from "react";
import styles from "../../styles/Reservation/ReservationsTable.module.scss";
import classNames from "classnames";
import { MdClose, MdCreate } from "react-icons/md";

export const IngredientTable = ({ data }) => {
  // console.log(data);
  return (
    <div className={styles.container}>
      <table className={styles.Table}>
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Name</th>
            <th>Quantity</th>
            <th>Quantity Type</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((ingredient) => (
            <tr key={ingredient.id}>
              {/* <td>{ingredient.id}</td> */}
              <td>{ingredient.name}</td>
              <td>{ingredient.quantity}</td>
              <td>{ingredient.quantity_type}</td>
              <td>{ingredient.description}</td>
              <td className={styles.actionColCell}>
                <button className={classNames(styles.btn, styles.editBtn)}>
                  <MdCreate />
                  Edit
                </button>
                <button className={classNames(styles.btn, styles.cancelBtn)}>
                  <MdClose />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
