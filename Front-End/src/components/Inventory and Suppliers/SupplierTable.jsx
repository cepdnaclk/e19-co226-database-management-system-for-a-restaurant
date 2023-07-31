
import React,{useState} from 'react';
import styles from '../../styles/ReservationsTable.module.scss';
import classNames from "classnames";
import { MdClose, MdCreate } from "react-icons/md";

export const SupplierTable = ({ data }) => {


  return (
    <div className={styles.container}>

      
      
      <table className={styles.Table}>

        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {data.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.address}</td>
              <td>{supplier.email}</td>              
              <td>{supplier.number}</td>
              <td className={styles.actionColCell}>
                <button className={classNames(styles.btn, styles.editBtn)}>
                  <MdCreate />
                  Edit
                </button>
                <button className={classNames(styles.btn, styles.cancelBtn)}>
                  <MdClose />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


