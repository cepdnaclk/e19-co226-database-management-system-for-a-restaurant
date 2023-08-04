import styles from "../../styles/ReservationsTable.module.scss";
import { MdCreate } from "react-icons/md";
import React from "react";
import classNames from "classnames";

const MenuTable = ({ MenuItems }) => {
  // console.log(MenuItems);
  return (
    <div className={classNames(styles.container)}>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Ingredients</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {MenuItems.map((MenuItem) => {
            return (
              <tr key={MenuItem.id}>
                <td className={styles.firstCol}>{MenuItem.title}</td>
                <td>{MenuItem.description}</td>
                <td>{MenuItem.category}</td>
                <td>{(MenuItem.ingredients).map((item) => {
                  return <li>{item}</li>
                  })}</td>
                <td>Rs. {MenuItem.price}</td>

                <td className={styles.actionColCell}>
                  <button
                    className={classNames(styles.btn, styles.editBtn)}
                    onClick={() => handleMenuItem(MenuItem)}
                  >
                    <MdCreate />
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MenuTable;
