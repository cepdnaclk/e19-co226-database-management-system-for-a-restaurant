import { Nav } from "../components/Nav";
import {MenuPanel} from "../components/menuPanel";
import styles from "../styles/Reservations.module.scss";

export const Orders = () => {
  return (
    <div>
      <Nav />
      <MenuPanel />
      <dev className={styles.Hero}>
        <h1>Manage Orders</h1>
        {/* <h2>AMBROSIA BISTRO</h2>
        <p>Savor the Divine Essence of Cuisine</p> */}
      </dev>
    </div>
  );
};