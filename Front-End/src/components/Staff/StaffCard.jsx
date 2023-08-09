import { useState, useEffect, useRef } from "react";
import styles from "../../styles/Staff/StaffCard.module.scss";
import classNames from "classnames";
import { AddStaff } from "./AddStaff";

export const StaffCard = ({ Data }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [staffData, setStaffData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const backgroundClick = useRef(null);
 
  useEffect(() => {
    setStaffData(Data);
  });

  useEffect(() => {
    document.addEventListener("click", handleBackgroundClick);
    return () => {
      document.removeEventListener("click", handleBackgroundClick);
    };
  },[]);

  const handleBackgroundClick = (e) => {
    if (e.target === backgroundClick.current) {
      setShowForm(false);
    }
  };

  const toggleCard = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className={styles.staff_page}>
      {staffData.map((Data, index) => (
        <div
          className={classNames(
            styles.staff_card,
            expandedIndex === index ? styles.expanded : ""
          )}
          key={index}
          onClick={() => toggleCard(index)}
        >
          <div className={styles.card_front}>
            <img src={Data.image} alt={Data.name} />
            <div className={styles.staff_info}>
              <h2>{Data.name}</h2>
              <p>{Data.position}</p>
            </div>
          </div>
          <div className={styles.card_back}>
            <h3>{Data.name}</h3>
            <div className={styles.card_info}>
              <ul>
                <p>Assigned Work :</p>
                <li>{Data.assignedWork}</li>
                <p>Description :</p>
                <li>{Data.description}</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
      <div
          className={classNames(
            styles.staff_card,
          )}
          
        >
          <div onClick={() =>{setShowForm(true)}} className={styles.card_front}>
            <img  src="/assets/Staff/AddItem.png"/>
            <div className={styles.staff_info}>
              <h2>Add Member</h2>
              <p>Click Here</p>
            </div>
          </div>
        </div>
        {showForm && <div className={styles.cardContainer} ref={backgroundClick}>
            <AddStaff
            onClose={() => {
              setShowForm(false);
            }}
            />
          </div>}
    </div>
  );
};
