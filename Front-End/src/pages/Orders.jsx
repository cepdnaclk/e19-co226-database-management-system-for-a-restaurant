import { Nav } from "../components/Nav";
import {MenuPanel} from "../components/menuPanel";
import { confirmedOrders, waitingOrders } from "../data/Orders";
import styles from "../styles/Orders.module.scss";
import { useState, useEffect } from "react";
import { OrdersHandle } from "../components/Orders/OrdersHandle";
import { Waitings } from "../components/Orders/WaitingOrders";

import { fetchOrders,fetchWaitingOrders } from "../services/Orders.service";

export const Orders = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [waitings, setWaitings] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handlefetchOrders();
    handlefetchWaitings();
  }, []);
  
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
      <div className={styles.tableContainer}>
        {/* Conditionally Render the Confirmed Reservations and Waiting List according to state */}
        {isWaiting ? (
          <Waitings waitings={waitings}/>
        ) : (
          <OrdersHandle allOrders={orders} />
        )}
      </div>
    </>
  );
};