import React, { useState } from "react";
import styles from "../../styles/Orders/CollapsibleMenuItemTable.module.scss";
import classNames from "classnames";

const CollapsibleMenuItemsTable = ({ menuItems }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <button onClick={toggleCollapse} className={styles.button}>
        {collapsed ? "Expand" : "Collapse"}
      </button>

      <table className={styles.Table} style={{ display: collapsed ? "none" : "table" }}>
        <thead>
          <tr>
            <th className={styles.table}>Menu Item</th>
            <th className={styles.table}>Unit Price</th>
            <th className={styles.table}>Quantity</th>
            <th className={styles.table}>Sub Total</th>
          </tr>
        </thead>



        
        
        <tbody>
          {menuItems.map((menuitem) => (
            <tr key={menuitem.menuItem.id}>
              <td>{menuitem.menuItem.name}</td>
              <td>{menuitem.menuItem.price}</td>
              <td>{menuitem.quantity}</td>
              <td>{menuitem.quantity * menuitem.menuItem.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollapsibleMenuItemsTable;
