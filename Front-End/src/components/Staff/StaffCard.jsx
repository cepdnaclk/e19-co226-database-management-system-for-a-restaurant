import { useState, useEffect } from "react";
import styles from "../../styles/Staff/StaffCard.module.scss";
import classNames from "classnames";

export const StaffCard = ({ Data }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    setStaffData(Data);
  });

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
                <li>{Data.assignedWork}</li>
                <li>{Data.description}</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
