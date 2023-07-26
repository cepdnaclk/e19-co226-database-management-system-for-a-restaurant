
import React,{useState} from 'react';
import styles from '../styles/ReservationsTable.module.scss';

export const SupplierTable = ({ data }) => {


  return (
    <div className={styles.container}>

      
      
      <table className={styles.Table}>

        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            
            <th></th>

          </tr>
        </thead>
        <tbody>
          {data.map((supplier, index) => (
            <tr key={index}>
              <td>{supplier.id}</td>
              <td>{supplier.name}</td>
              <td>{supplier.address}</td>
              <td>{supplier.email}</td>              
              
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


