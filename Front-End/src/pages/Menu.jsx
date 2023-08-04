import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import { MenuHandle } from "../components/MenuItems/MenuHandle";
import React, { useState, useEffect } from "react";
import styles from "../styles/Reservations.module.scss";
import { menuItemsData } from "../data/Menu";
import { fetchMenu } from "../services/Menu.service";

export const Menu = () => {
  const [menuItems, setMenuItems] = useState(menuItemsData);

  useEffect(() => {
    handlefetchMenu();
  }, []);

  const handlefetchMenu = async () => {
    try {
      const response = await fetchMenu();
      setMenuItems(response);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching reservatins:", error);
    }
  };

  return (
    <>
      <Nav />
      <MenuPanel />
      <div className={styles.Hero}>
        <h1>Menu</h1>
        <h2>- Food & Beverages -</h2>
        <hr style={{ border: "1.5px solid rgb(233, 190, 110)", width: "93%" }} />
      </div>
      <div className={styles.tableContainer}>
        <MenuHandle allMenuItems={menuItems} />
      </div>
    </>
  );
};
