import OrdersTable from "./OrdersTable";
import { useEffect, useState } from "react";
import styles from "../../styles/ReservationsHandle.module.scss"

export const OrdersHandle = ({allOrders}) => {
    const [orders, setOrders] = useState([]);
    const [deliverdOrders, setDeliverdOrders] = useState([]);
    const [processingOrders, setProcessingOrders] = useState([]);

    useEffect(() =>{
        setOrders(allOrders);
        // console.log(allOrders);
        // console.log(orders);
    },[allOrders])

    useEffect(() => {
        setDeliverdOrders(
          orders.filter((res) => {
            return res.deliveryStatus;
          })
        );
        // console.log(deliverdOrders);
        setProcessingOrders(
            orders.filter((res) => {
                return !res.deliveryStatus;
              })
        );
        // console.log(processingOrders);
    }, [orders]);

    return (
        <div className={styles.container}>
          {processingOrders.length !== 0 && (
            <h2 className={styles.pastReservations}>Pending Deliveries</h2>
          )}
    
          <OrdersTable
            orders={processingOrders}
            isActionable={true}
            isRemovable={true}

          />
    
          {deliverdOrders.length !== 0 && (
            <h2 className={styles.pastReservations}>Delivered Orders</h2>
          )}
    
          <OrdersTable
            orders={deliverdOrders}
          />
        </div>
      );
}