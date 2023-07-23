import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./Login";
import { Home } from "./Home";
import { Orders } from "./Orders";
import { Reservations } from "./Reservations";

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
      </Routes>
    </div>
  );
}

export default App;
