import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import { StaffHandle } from "../components/Staff/StaffHandle";
import React, { useState, useEffect } from "react";
import styles from "../styles/Reservations.module.scss";
import staffData from "../data/Staff";
import { fetchStaff } from "../services/Staff.service";

export const Staff = () => {
  const [staff, setStaff] = useState(staffData);
  console.log(staff);

  useEffect(() => {
    handlefetchStaff();
  }, []);

  const handlefetchStaff = async () => {
    try {
      const response = await fetchStaff();
      setStaff(response);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching reservatins:", error);
    }
  };

  return (
    <>
      <Nav />
      <MenuPanel />
      <div className={styles.Hero}>
        <h1>Staff</h1>
        <h2>"Elevating Experiences, One Plate at a Time."</h2>
        {/* <hr style={{ border: "1.5px solid rgb(233, 190, 110)", width: "93%" }} /> */}
      </div>
      <div className={styles.tableContainer}>
        <StaffHandle StaffData={staff} />
      </div>
    </>
  );
};
