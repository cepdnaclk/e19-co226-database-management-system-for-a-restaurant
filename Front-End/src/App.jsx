import { Routes, Route } from "react-router-dom";
import "./App.scss";
import { Login } from "../src/pages/Login";
import { Home } from "../src/pages/Home";
import { Orders } from "../src/pages/Orders";
import { Inventory } from "./pages/Inventory";
import { Reservations } from "../src/pages/Reservations";
import { Menu } from "./pages/Menu";
import { Staff } from "./pages/Staff";

function App() {
  (function () {
    const buttons = document.querySelectorAll(".content button");

    buttons.forEach((button) => {
      ["mouseenter", "mouseout"].forEach((evt) => {
        button.addEventListener(evt, (e) => {
          let parentOffset = button.getBoundingClientRect(),
            relX = e.pageX - parentOffset.left,
            relY = e.pageY - parentOffset.top;

          const span = button.querySelector("span");

          span.style.top = relY + "px";
          span.style.left = relX + "px";
        });
      });
    });
  })(); // Add opening and closing parentheses here

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/authenticate" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/staff" element={<Staff />} />
      </Routes>
    </div>
  );
}

export default App;
