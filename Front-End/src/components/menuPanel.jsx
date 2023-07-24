import React, { useState } from "react";
import "../styles/MenuPanel.css";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const MenuPanel = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const navigate = useNavigate();
  return (
    <div className={`menu-panel ${isPanelOpen ? "open" : ""}`}>
      <div className="menu-panel__toggle" onClick={togglePanel}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="menu-panel__content">
        <img
          src="assets/My_project.png"
          alt="Logo"
          className="menu-panel__logo"
          onClick={() => navigate("/Home")}
        />
        <ul>
          <li data-name="Home" onClick={() => navigate("/Home")}>
            <i className="fas fa-home"></i> {/* Home icon */}
          </li>
          <li data-name="Orders" onClick={() => navigate("/Orders")}>
            <i className="fa fa-book" aria-hidden="true"></i>{" "}
          </li>
          <li data-name="Reservation" onClick={() => navigate("/Reservations")}>
            <i className="fa fa-bookmark" aria-hidden="true"></i>{" "}
          </li>
          <li data-name="About" onClick={() => navigate("/About")}>
            <i className="fas fa-info-circle"></i>
          </li>
          <li data-name="Services" onClick={() => navigate("/Services")}>
            <i className="fas fa-cogs"></i>
          </li>
          <li data-name="Contact" onClick={() => navigate("/Contact")}>
            <i className="fas fa-envelope"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};
