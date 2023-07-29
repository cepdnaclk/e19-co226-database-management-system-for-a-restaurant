import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import { reservations, waitings } from "../data/Reservations";
import styles from "../styles/Reservations.module.scss";
import { ReservationsHandle } from "../components/Reservations/ReservationsHandle";
import { Waitings } from "../components/Reservations/WaitingReservations";
import { useState } from "react";

export const Reservations = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  // console.log(reservations);
  // console.log(waitings);
  return (
    <>
      <Nav />
      <MenuPanel />
      <div className={styles.Hero}>
        <h1>Manage Reservations</h1>
        {/* <h2>AMBROSIA BISTRO</h2>
        <p>Savor the Divine Essence of Cuisine</p> */}
        <button
          className={`${styles.toggleSwitch}  ${
            isWaiting ? styles.waiting : null
          }`}
          onClick={() => setIsWaiting(!isWaiting)}
        >
          <p className={styles.toggleItem}>Confirmed Reservations</p>
          <p className={styles.toggleItem}>Waiting List</p>
        </button>
      </div>
      <div className={styles.tableContainer}>
        {/* Conditionally Render the Confirmed Reservations and Waiting List according to state */}
        {isWaiting ? (
          <Waitings waitings={waitings}/>
        ) : (
          <ReservationsHandle allReservations={reservations} />
        )}
      </div>
    </>
  );
};
