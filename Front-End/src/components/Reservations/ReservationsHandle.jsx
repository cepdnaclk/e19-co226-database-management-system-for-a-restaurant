import ReservationTable from "./ReservationsTable";
import { useEffect, useState } from "react";
import styles from "../../styles/Reservation/ReservationsHandle.module.scss"

export const ReservationsHandle = ({allReservations}) => {
    const [reservations, setReservations] = useState([]);
    const [pastReservations, setPastReservations] = useState([]);
    const [currentReservations, setCurrentReservations] = useState([]);

    useEffect(() =>{
        setReservations(allReservations);
    },[allReservations])
   
    useEffect(() => {
        setPastReservations(
          reservations.filter((res) => {
            const date = new Date(res.date);
            // console.log(date);
            const currentDate = new Date();
            return (date <= currentDate)? true : false;
          })
        );
        // console.log(pastReservations);
        setCurrentReservations(
          reservations.filter((res) => {
            const date = new Date(res.date);
            const currentDate = new Date();
            return (date > currentDate) ? true : false;
          })
        );
        // console.log(currentReservations);
    }, [reservations]);
  
  
    return (
      <div className={styles.container}>
        {currentReservations.length !== 0 && (
          <h2 className={styles.pastReservations}>Current Reservations</h2>
        )}
  
        <ReservationTable
          reservations={currentReservations}
          isActionable={true}
        />
  
        {pastReservations.length !== 0 && (
          <h2 className={styles.pastReservations}>Past Reservations</h2>
        )}
  
        <ReservationTable
          reservations={pastReservations}
        />
      </div>
    );
  };