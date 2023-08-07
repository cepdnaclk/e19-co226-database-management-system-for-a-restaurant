import MenuTable from "./MenuTable";
import { useEffect, useState } from "react";
import styles from "../../styles/Reservation/ReservationsHandle.module.scss";

export const MenuHandle = ({ allMenuItems }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [hors, setHors] = useState([]);
  const [soups, setSoups] = useState([]);
  const [appetizers, setAppetizers] = useState([]);
  const [salads, setSalads] = useState([]);
  const [mains, setMains] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [beverages, setBeverages] = useState([]);

  useEffect(() => {
    setMenuItems(allMenuItems);
  }, []);

  useEffect(() => {
    setHors(
      menuItems.filter((item) => {
        return item.category === "Hors d'oeuvre" ? true : false;
      })
    );
    setSoups(
      menuItems.filter((item) => {
        return item.category === "Soup" ? true : false;
      })
    );
    setAppetizers(
      menuItems.filter((item) => {
        return item.category === "Appetizer" ? true : false;
      })
    );
    setSalads(
      menuItems.filter((item) => {
        return item.category === "Salad" ? true : false;
      })
    );
    setMains(
      menuItems.filter((item) => {
        return item.category === "Main Course" ? true : false;
      })
    );
    setDesserts(
      menuItems.filter((item) => {
        return item.category === "Desserts" ? true : false;
      })
    );
    setBeverages(
      menuItems.filter((item) => {
        return item.category === "Beverages" ? true : false;
      })
    );
  }, [menuItems]);

  return (
    <div className={styles.container}>
      {hors.length !== 0 && (
        <h2 className={styles.pastReservations}>Hors d'oeuvres</h2>
      )}
      <MenuTable MenuItems={hors} />
      {soups.length !== 0 && <h2 className={styles.pastReservations}>Soups</h2>}
      <MenuTable MenuItems={soups} />
      {appetizers.length !== 0 && (
        <h2 className={styles.pastReservations}>Appetizers</h2>
      )}
      <MenuTable MenuItems={appetizers} />
      {salads.length !== 0 && (
        <h2 className={styles.pastReservations}>Salads</h2>
      )}
      <MenuTable MenuItems={salads} />
      {mains.length !== 0 && (
        <h2 className={styles.pastReservations}>Main Courses</h2>
      )}
      <MenuTable MenuItems={mains} />
      {desserts.length !== 0 && (
        <h2 className={styles.pastReservations}>Desserts</h2>
      )}
      <MenuTable MenuItems={desserts} />
      <hr className={styles.bar}></hr>
      {beverages.length !== 0 && (
        <h2 className={styles.pastReservations}>Beverages</h2>
      )}
      <MenuTable MenuItems={beverages} />
    </div>
  );
};
