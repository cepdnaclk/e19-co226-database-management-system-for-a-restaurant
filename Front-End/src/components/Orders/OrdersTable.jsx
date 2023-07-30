import styles from "../../styles/ReservationsTable.module.scss";
import { MdClose, MdCheck } from "react-icons/md";
import React from "react";
import classNames from "classnames";
import { getTimeString, getDateInFormat } from "../../utils";

const OrdersTable = ({ orders, isActionable, isAcceptable, isRemovable }) => {
  console.log(orders);
  return (
    <div className={classNames(styles.container)}>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>Order Items</th>
            <th>Date</th>
            <th>Time</th>
            <th>Amount</th>
            <th>Contact Number</th>
            <th>Delivery Address</th>
            <th>Payment Status</th>
            {isActionable && <th></th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <td className={styles.firstCol}>{order.title}</td>
                <td>{getDateInFormat(new Date(order.date))}</td>
                <td>{getTimeString(order.time)}</td>
                <td>{order.amount}</td>
                <td>{order.number}</td>
                <td>{order.address}</td>

                <td className={styles.statusCell}>
                  <button className={classNames(styles.btn, (order.status === "Paid")?styles.acceptBtn : styles.pendingBtn)}>
                    {order.status}
                  </button>
                </td>

                {isActionable && <td className={styles.actionColCell}>
                  {isAcceptable && (
                    <button
                      className={classNames(styles.btn, styles.acceptBtn)}
                      onClick={() => handleorder(order)}
                    >
                      <MdCheck />
                      Confirm
                    </button>
                  )}

                  {isRemovable && (
                    <button
                      className={classNames(styles.btn, styles.cancelBtn)}
                      onClick={() => handleDelete(order)}
                    >
                      <MdClose />
                      Cancel
                    </button>
                  )}
                </td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
