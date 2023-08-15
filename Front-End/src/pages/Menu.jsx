import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import { MenuHandle } from "../components/MenuItems/MenuHandle";
import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Inventory/Inventory.module.scss";
import { menuItemsData,newMenu } from "../data/Menu";
import { fetchMenu } from "../services/Menu.service";
import { MenuItemForm } from "../components/MenuItems/MenuItemForm";
import { MenuEdit } from "../components/MenuItems/MenuEdit";

export const Menu = () => {
  const [menuItems, setMenuItems] = useState(newMenu);
  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const backgroundClick = useRef(null);
  const backgroundClickEdit = useRef(null);
  const [shouldRefresh,setShouldRefresh] = useState(true)

  useEffect(() => {
    if(shouldRefresh)
    handlefetchMenu();
  }, []);

  const handlefetchMenu = async () => {
    try {
      const response = await fetchMenu();
      setMenuItems(response);
      console.log(response);
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

  const handleBackgroundClickEdit = (e) => {
    if (e.target === backgroundClickEdit.current) {
      setShowEdit(false);
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
            <MenuItemForm onClose={() => setShowForm(false)}/>
          </div>
        )}
        {showEdit && (
          <div className={styles.cardContainer} ref={backgroundClickEdit}>
            <MenuEdit onClose={() => setShowEdit(false)}/>
          </div>
        )}
      </div>
      
      <div className={styles.container}>
        <MenuHandle allMenuItems={menuItems} />
      </div>
    </>
  );
};
