import React, { useState } from 'react';
import styles from "../styles/Staff/StaffPage.module.scss"
import staffData from '../data/Staff.Data';
import { Nav } from "../components/Nav";
import {MenuPanel} from "../components/menuPanel";

export const Staff = () => {

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleCard = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
<> <Nav />
      <MenuPanel />
    <div className={styles['staff-page']}>
      {staffData.map((staffMember, index) => (
        
        <div
          className={`${styles['staff-card']} ${expandedIndex === index ? styles['expanded'] : ''}`}
          key={index}
          onClick={() => toggleCard(index)}
        >
          <div className={styles['card-front']}>
            <img src={staffMember.image} alt={staffMember.name} />
            <div className={styles['staff-info']}>
              <h3>{staffMember.name}</h3>
              <p>{staffMember.position}</p>
            </div>
          </div>
          <div className={styles['card-back']}>
            <h3>{staffMember.name}</h3>
            <p>{staffMember.assignedWork}</p>
            <p>{staffMember.description}</p>
          </div>
        </div>
      ))}
    </div></>
  );
};

