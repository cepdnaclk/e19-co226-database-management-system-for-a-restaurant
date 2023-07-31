import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import styles from "../styles/Home.module.scss"

export const Home = () => {
  return (
    <div className={styles.container}>
      <Nav className={styles.nav}/>
      <MenuPanel />
      <div className={styles.Hero}>
        <h1>AMBROSIA BISTRO</h1>
        <h2>"SAVOR THE DIVINE ESSENCE OF CUISINE"</h2>
      </div>
    </div>
  );
};
