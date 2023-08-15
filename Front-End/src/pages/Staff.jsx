import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import { StaffHandle } from "../components/Staff/StaffHandle";
import React, { useState, useEffect } from "react";
import styles from "../styles/Reservation/Reservations.module.scss";
import {staffData} from "../data/Staff";
import { fetchStaff } from "../services/Staff.service";

import { useDispatch, useSelector } from 'react-redux';
import { fetchStaffMembers } from '../actions/staffActions'; // Import fetchStaffMembers action


export const Staff = () => {
  const staff = useSelector(state => state.staff);
  const [shouldRefresh,setShouldRefresh] = useState(true);

  const dispatch = useDispatch();
  console.log(staff);

  useEffect(() => {
    if(shouldRefresh){
      dispatch(fetchStaffMembers());
      setShouldRefresh(false); 
    }
     
  }, [dispatch,shouldRefresh]);


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
