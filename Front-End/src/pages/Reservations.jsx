import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import "../styles/reservation.scss";

export const Reservations = () => {
  return (
    <div>
      <Nav />
      <MenuPanel />
      <dev className="Hero">
        <h1>Manage Reservations</h1>
        {/* <h2>AMBROSIA BISTRO</h2>
        <p>Savor the Divine Essence of Cuisine</p> */}
      </dev>
    </div>
  );
};
