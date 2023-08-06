import { Nav } from "../components/Nav";
import {MenuPanel} from "../components/menuPanel";
import styles from "../styles/Orders.module.scss";
import { useState, useEffect, useRef } from "react";
import { OrdersHandle } from "../components/Orders/OrdersHandle";
import { Waitings } from "../components/Orders/WaitingOrders";
import {OrderForm } from "../components/Orders/OrderForm"
import { fetchOrders,fetchWaitingOrders } from "../services/Orders.service";
import { menuItemsData } from "../data/Menu";
import { confirmedOrders, waitingOrders } from "../data/Orders";
import { MenuItemForm } from "../components/MenuItems/MenuItemForm";

export const Orders = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [waitings, setWaitings] = useState(waitingOrders);
  const [orders, setOrders] = useState(confirmedOrders);
  const [menuItems, setMenuItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const backgroundClick = useRef(null);

  useEffect(() => {
    handlefetchOrders();
    handlefetchWaitings();
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleBackgroundClick);
    return () => {
      document.removeEventListener("click", handleBackgroundClick);
    };
  },[]);
  
  const handleBackgroundClick = (e) => {
    if (e.target === backgroundClick.current) {
      setShowForm(false);
    }
  };

  const handlefetchOrders = async () => {
    try {
      const response = await fetchOrders();
      setOrders(response);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching reservatins:", error);
    }
  };
  const handlefetchWaitings = async () => {
    try {
      const response = await fetchWaitingOrders();
      setWaitings(response);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching waitings:", error);
    }
  };


  return (
    <>
      <Nav />
      <MenuPanel />
      <div className={styles.Hero}>
        <h1>Manage Orders</h1>
        {/* <h2>AMBROSIA BISTRO</h2>
        <p>Savor the Divine Essence of Cuisine</p> */}
        <button
          className={`${styles.toggleSwitch}  ${
            isWaiting ? styles.waiting : null
          }`}
          onClick={() => setIsWaiting(!isWaiting)}
        >
          <p className={styles.toggleItem}>Confirmed Orders</p>
          <p className={styles.toggleItem}>Waiting List</p>
        </button>
      </div>
      <div className={styles.container}>
        {!showForm && <button className={styles.button} onClick={() => setShowForm(true)}>
          Make New Order
        </button>}
        {showForm && <div className={styles.cardContainer} ref={backgroundClick}>
          <OrderForm
            menuItems={menuItemsData}
            onClose={() => {
              setShowForm(false);
            }}
            
          />
        </div>}
      </div>
      <div className={styles.tableContainer}>
        {/* Conditionally Render the Confirmed Reservations and Waiting List according to state */}
        {isWaiting ? (
          <Waitings waitings={waitings}/>
        ) : (
          <OrdersHandle allOrders={orders} />
        )}
      </div>
      {/* <MenuItemForm/> */}
    </>
  );
};