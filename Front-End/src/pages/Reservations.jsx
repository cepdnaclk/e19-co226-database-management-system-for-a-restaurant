import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import styles from "../styles/Reservation/Reservations.module.scss";
import { ReservationsHandle } from "../components/Reservations/ReservationsHandle";
import { Waitings } from "../components/Reservations/WaitingReservations";
import { useState, useEffect } from "react";
import { cReservations, waitingList } from "../data/Reservations";
import { fetchReservations,fetchWaitings } from "../services/Reservations.service";

export const Reservations = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [waitings, setWaitings] = useState(waitingList);
  const [reservations, setResevations] = useState(cReservations);
  // console.log(reservations);
  // console.log(waitings);

  useEffect(() => {
    handlefetchReservations();
    handlefetchWaitings();
  }, []);

  const handlefetchReservations = async () => {
    try {
      const response = await fetchReservations();
      setResevations(response);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching reservatins:", error);
    }
  };
  const handlefetchWaitings = async () => {
    try {
      const response = await fetchWaitings();
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
