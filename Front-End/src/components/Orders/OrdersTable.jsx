import styles from "../../styles/Orders/OrdersTable.module.scss";
import { MdClose, MdCheck } from "react-icons/md";
import React from "react";
import classNames from "classnames";
import { getTimeString, getDateInFormat, convertTimeToFormat } from "../../utils";
import CollapsibleMenuItemsTable from "./CollapsibleMenuItemsTable";
import {payOrder, upgradeOrder,deleteOrder} from "../../services/Orders.service";

const OrdersTable = ({ orders, isActionable, isAcceptable, isRemovable,refresher }) => {

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "#DFECB3"; // Light Yellow
      case "Processing":
        return "#FBEEE6"; // Light Orange
      case "Ready":
        return "#D5F5E3"; // Light Green
      case "Dining":
        return "#EBF5FB"; // Light Blue
      case "Completed":
        return "#F5EEF8"; // Light Purple
      default:
        return "#EAECEE"; // Light Gray
    }
  };

  const getOrderButtonStyle = (orderStatus) => {
    switch (orderStatus) {
      case "New":
        return styles.acceptBtn; // Customize the style based on your design
      case "Processing":
        return styles.pendingBTN; // Customize the style based on your design
      case "Ready":
        return styles.readyBtn; // Customize the style based on your design
      case "Dining":
        return styles.diningBtn; // Customize the style based on your design
      // Add more cases as needed
      default:
        return styles.btn; // Default style
    }
  };
  
  const getOrderButtonText = (orderStatus) => {
    switch (orderStatus) {
      case "New":
        return "Confirm";
      case "Processing":
        return "Mark Ready";
      case "Ready":
        return "Serve";
      case "Dining":
        return "Complete";
      case "Completed":
          return "Completed"
      // Add more cases as needed
      default:
        return "Action";
    }
  };


  const getNextOrderStatus= (orderStatus) => {
    switch (orderStatus) {
      case "New":
        return "Processing";
      case "Processing":
        return "Ready";
      case "Ready":
        return "Dining";
      case "Dining":
        return "Completed";
      
      default:
        return "Pending";
    }
  };

  // console.log(orders);
  return (
    <div className={classNames(styles.container)}>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>Order Items</th>
            <th>Customer Name</th>
            <th>Staff Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Amount</th>
            <th>Contact Number</th>
            <th>Order Status</th>
            <th>Payment Status</th>
            {isActionable && <th></th>}
            {isActionable && <th></th>}
          </tr>
        </thead>
        <tbody>
        {orders.map((order, index) => {
  if (((order.orderStatus !== "Completed" || order.paymentStatus !=="Paid") & isActionable) || 
  (order.orderStatus === "Completed" & order.paymentStatus === "Paid" & !isActionable)) {
    return (
      <tr key={index} style={{ backgroundColor: getStatusColor(order.orderStatus) }}>
        <td className={styles.firstCol}>
          <CollapsibleMenuItemsTable menuItems={order.menuItems} />
        </td>
        <td>{order.customer.firstName} {order.customer.lastName}</td>
        <td>{order.staff.firstName} {order.staff.lastName}</td>

        <td>{getDateInFormat(new Date(order.placementDate))}</td>
        <td>{getTimeString(convertTimeToFormat(order.placementTime))}</td>
        <td>Rs. {order.amount}.00</td>
        <td>{order.customer.phone[0]}</td>
        <td>{order.orderStatus}</td>

        <td className={styles.statusCell}>
          <button className={classNames(styles.btn, (order.paymentStatus === "Paid") ? styles.paidBtn : styles.pendingBtn)
        
        }
        onClick = {()=>{
          payOrder(order,refresher)
        }}
        disabled = {order.paymentStatus==="Paid"}
        >
            
            
            {order.paymentStatus}
          </button>
        </td>

        {isActionable && <td className={styles.actionColCell}>
          {isAcceptable && 
          <button
            className={classNames(styles.btn, getOrderButtonStyle(order.orderStatus))}

            onClick={() => {
              const newStatus = getNextOrderStatus(order.orderStatus);
              upgradeOrder(order, newStatus,refresher);
              
            }}
            disabled = {order.orderStatus==="Completed"}

          >
            {getOrderButtonText(order.orderStatus)}
          </button>
        
}</td>}

          {isActionable && <td className={styles.cancelColCell}>{isRemovable && (
            <button
              className={classNames(styles.btn, styles.cancelBtn)}
              onClick={() => deleteOrder(order,refresher)}
            >
              <MdClose />
              Cancel
            </button>
          )}</td>
        }
      </tr>
    );
  } else {
    return null; // Exclude completed orders
  }
})}

        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
