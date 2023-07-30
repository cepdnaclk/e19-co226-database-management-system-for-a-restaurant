import { Nav } from "../components/Nav";
import {MenuPanel} from "../components/menuPanel";
import { confirmedOrders, waitingOrders } from "../data/Orders";
import styles from "../styles/Orders.module.scss";
import { useState } from "react";
import { OrdersHandle } from "../components/Orders/OrdersHandle";
import { Waitings } from "../components/Orders/WaitingOrders";

export const Orders = () => {
  const [isWaiting, setIsWaiting] = useState(false);
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
          <Waitings waitings={waitingOrders}/>
        ) : (
          <OrdersHandle allOrders={confirmedOrders} />
        )}
      </div>
    </>
  );
};