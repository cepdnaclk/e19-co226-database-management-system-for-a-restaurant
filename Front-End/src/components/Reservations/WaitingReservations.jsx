import ReservationTable from "./ReservationsTable";
import { useEffect, useState } from "react";
import styles from "../../styles/ReservationsHandle.module.scss"
import classNames from "classnames";

export const Waitings = ({waitings}) => {
    const [waiting, setWaiting] = useState([]);
    const [availableWaiting, setAvailableWaiting] = useState([]);
    const [unavailableWaiting, setUnAvailableWaiting] = useState([]);
  
    useEffect(() => {
      setWaiting(waitings);
    },[])
  
    useEffect(() => {
        setAvailableWaiting(waiting.filter((wait) => wait.available));
        setUnAvailableWaiting(waiting.filter((wait) => !wait.available)); 
    }, [waiting]);
    return (
      <div className={styles.container}>
        <h2 className={styles.pastReservations}>Available for Reservation</h2>
        <p
          className={classNames(
            styles.NoReservations,
            availableWaiting.length === 0 && styles.show
          )}
        >
          You are not in a waiting list for any reservation
        </p>
  
        <ReservationTable
          reservations={availableWaiting}
          isActionable={true}
          isAcceptable={true}
        />
  
        {unavailableWaiting.length !== 0 && (
          <h2 className={styles.pastReservations}>Currently Unavailable</h2>
        )}
  
        <ReservationTable
          reservations={unavailableWaiting}
          isActionable={true}
        />
      </div>
    );
  };
  