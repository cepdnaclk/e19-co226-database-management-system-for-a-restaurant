import OrdersTable from "./OrdersTable";
import { useEffect, useState } from "react";
import styles from "../../styles/ReservationsHandle.module.scss"
import classNames from "classnames";


export const Waitings = ({waitings}) => {
    const [waiting, setWaiting] = useState([]);
    console.log(waiting);
    useEffect(() => {
      setWaiting(waitings);
    },[])
  
    
    return (
      <div className={styles.container}>
        <h2 className={styles.pastReservations}>Waiting Orders</h2>
        <p
          className={classNames(
            styles.NoReservations,
            waitings.length === 0 && styles.show
          )}
        >
          There is no any waiting orders
        </p>
  
        <OrdersTable
          orders={waiting}
          isActionable={true}
          isAcceptable={true}
          isRemovable={true}
        />
      </div>
    );
  };