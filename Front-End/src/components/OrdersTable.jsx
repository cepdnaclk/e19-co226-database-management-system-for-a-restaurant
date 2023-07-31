import styles from "../styles/ReservationsTable.module.scss";
import { MdClose, MdCheck } from "react-icons/md";
import React from "react";
import { spaces } from "../data/Orders";
import classNames from "classnames";
import { getTimeString, getDateInFormat } from "../utils";

const OrdersTable = ({ Orders, isActionable, isAcceptable }) => {
  // console.log(Orders);
  return (
    <div className={classNames(styles.container
      )}>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>Order</th>
            <th>Title</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Responsible Person</th>
            {isActionable &&<th></th>}
          </tr>
        </thead>
        <tbody>
          {Orders.map((Order) => {
            const space = spaces.find((s) => s.id === Order.spaceId);
            return (
              <tr key={Order.id}>
                <td>{space ? space.name : ""}</td>
                <td className={styles.firstCol}>{Order.title}</td>
                <td>{getDateInFormat(new Date(Order.date))}</td>
                <td>{getTimeString(Order.startTime)}</td>
                <td>{getTimeString(Order.endTime)}</td>
                <td>{Order.responsiblePerson}</td>
                {isActionable && (
                  <td className={styles.actionColCell}>
                    {isAcceptable && (
                      <button
                        className={classNames(styles.btn, styles.acceptBtn)}
                        onClick={() => handleOrder(Order)}
                      >
                        <MdCheck />
                        Confirm
                      </button>
                    )}

                    <button
                      className={classNames(styles.btn, styles.cancelBtn)}
                      onClick={() => handleDelete(Order)}
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

export default OrdersTable;
