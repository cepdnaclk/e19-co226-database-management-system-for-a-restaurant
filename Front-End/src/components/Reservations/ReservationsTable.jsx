import styles from "../../styles/Reservation/ReservationsTable.module.scss";
import { MdClose, MdCheck } from "react-icons/md";
import React from "react";
import { spaces } from "../../data/Reservations";
import classNames from "classnames";
import { getTimeString, getDateInFormat } from "../../utils";

const ReservationTable = ({ reservations, isActionable, isAcceptable }) => {
  // console.log(reservations);
  return (
    <div className={classNames(styles.container
      )}>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>Reserved Area</th>
            <th>Title</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Responsible Person</th>
            {isActionable &&<th></th>}
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => {
            const space = spaces.find((s) => s.id === reservation.spaceId);
            return (
              <tr key={reservation.id}>
                <td>{space ? space.name : ""}</td>
                <td className={styles.firstCol}>{reservation.title}</td>
                <td>{getDateInFormat(new Date(reservation.date))}</td>
                <td>{getTimeString(reservation.startTime)}</td>
                <td>{getTimeString(reservation.endTime)}</td>
                <td>{reservation.responsiblePerson}</td>
                {isActionable && (
                  <td className={styles.actionColCell}>
                    {isAcceptable && (
                      <button
                        className={classNames(styles.btn, styles.acceptBtn)}
                        onClick={() => handleReservation(reservation)}
                      >
                        <MdCheck />
                        Confirm
                      </button>
                    )}

                    <button
                      className={classNames(styles.btn, styles.cancelBtn)}
                      onClick={() => handleDelete(reservation)}
                    >
                      <MdClose />
                      Cancel
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
