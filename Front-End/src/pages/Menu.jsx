import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import { MenuHandle } from "../components/MenuItems/MenuHandle";
import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Inventory/Inventory.module.scss";
import { menuItemsData } from "../data/Menu";
import { fetchMenu } from "../services/Menu.service";
import { MenuItemForm } from "../components/MenuItems/MenuItemForm";

export const Menu = () => {
  const [menuItems, setMenuItems] = useState(menuItemsData);
  const [showForm, setShowForm] = useState(false);
  const backgroundClick = useRef(null);

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

  useEffect(() => {
    document.addEventListener("click", handleBackgroundClick);
    return () => {
      document.removeEventListener("click", handleBackgroundClick);
    };
  }, []);

  const handleBackgroundClick = (e) => {
    if (e.target === backgroundClick.current) {
      setShowForm(false);
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
      <div className={styles.container}>
        {!showForm && (
          <button className={styles.button} onClick={() => setShowForm(true)}>
            Add a Menu Item
          </button>
        )}
        {showForm && (
          <div ref={backgroundClick}>
            <MenuItemForm/>
          </div>
        )}
      </div>
      
      <div className={styles.container}>
        <MenuHandle allMenuItems={menuItems} />
      </div>
    </>
  );
};
