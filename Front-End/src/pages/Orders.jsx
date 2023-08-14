import { Nav } from "../components/Nav";
import {MenuPanel} from "../components/menuPanel";
import styles from "../styles/Orders/Orders.module.scss";
import { useState, useEffect, useRef } from "react";
import { OrdersHandle } from "../components/Orders/OrdersHandle";
import { Waitings } from "../components/Orders/WaitingOrders";
import {OrderForm } from "../components/Orders/OrderForm"
import { fetchOrders,fetchWaitingOrders } from "../services/Orders.service";
import { menuItemsData } from "../data/Menu";
import { confirmedOrders, OrdersTrial, waitingOrders } from "../data/Orders";
import { MenuItemForm } from "../components/MenuItems/MenuItemForm";
import OrdersTable from "../components/Orders/OrdersTable";
import { Customers } from "../data/Customers";
import { staffData } from "../data/Staff";
import { fetchCustomers } from "../services/Customers.service";
import {fetchStaff} from "../services/Staff.service";

export const Orders = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [waitings, setWaitings] = useState(OrdersTrial);
  const [orders, setOrders] = useState(OrdersTrial);

  const [menuItems, setMenuItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const backgroundClick = useRef(null);
  const [shouldRefresh ,setShouldRefresh] = useState(true)

  const handleRefreshData = () => {
    handlefetchOrders();
    handlefetchWaitings();
    setShouldRefresh(false);
  };

  useEffect(() => {
    if (shouldRefresh) {
      handleRefreshData();
    }


  }, [shouldRefresh]);

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
          <p className={styles.toggleItem}>Ongoing Orders</p>
          <p className={styles.toggleItem}>Completed Orders</p>
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
            refresher = {setShouldRefresh}
            
          />
        </div>}
      </div>
      <div className={styles.tableContainer}>
        {/* Conditionally Render the Confirmed Reservations and Waiting List according to state */}
        {!isWaiting ? (
          <OrdersTable
          orders={orders}
          isActionable={true}
          isAcceptable={true}
          isRemovable={true}
          refresher = {setShouldRefresh}
        />
        ) : (
          <OrdersTable
          orders={orders}
          isActionable={false}
          isAcceptable={true}
          isRemovable={true}
          refresher = {setShouldRefresh}
        />
        )}
      </div>
      {/* <MenuItemForm/> */}
    </>
  );
};