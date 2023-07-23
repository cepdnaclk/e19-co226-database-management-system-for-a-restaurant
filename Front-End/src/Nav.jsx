import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./nav.css";

export const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const logoutConfirmationRef = useRef(null);

  useEffect(() => {
    const menuItems = document.querySelectorAll(".nav li");

    const menuBtn = document.querySelector(".menu-btn");
    const navUl = document.querySelector(".nav ul");

    document.addEventListener("click", handleBackgroundClick);

    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
      ) {
        document.querySelector(".nav").classList.add("mobile");
        return;
      }
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.querySelector(".nav").style.top = "0";
      } else {
        document.querySelector(".nav").style.top = "-100px";
      }
      prevScrollpos = currentScrollPos;
    };

    menuBtn.removeEventListener("click", () => {
      menuBtn.classList.toggle("open");
      navUl.classList.toggle("open");
    });

    menuItems.forEach((item) => {
      ["mouseenter", "mouseout"].forEach((evt) => {
        item.removeEventListener(evt, (e) => {
          const parentOffset = item.getBoundingClientRect();
          const relX = e.clientX - parentOffset.left;
          const relY = e.clientY - parentOffset.top;
          const span = item.querySelector("span");
          span.style.top = relY + "px";
          span.style.left = relX + "px";
        });
      });
    });

    document.removeEventListener("click", handleBackgroundClick);
  }, []);

  const handleItemClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const handleConfirmLogout = () => {
    // Perform logout logic here
    navigate("/authenticate");
  };

  const handleBackgroundClick = (e) => {
    if (e.target === logoutConfirmationRef.current) {
      setShowLogoutConfirmation(false);
    }
  };

  return (
    <div>
      <div className="nav">
        <a />
        <ul className="nav-items">
          <li
            className={location.pathname === "/Home" ? "active" : ""}
            onClick={() => handleItemClick("/Home")}
          >
            Home<span></span>
          </li>
          <li
            className={location.pathname === "/Orders" ? "active" : ""}
            onClick={() => handleItemClick("/Orders")}
          >
            Orders<span></span>
          </li>
          <li
            className={location.pathname === "/Reservations" ? "active" : ""}
            onClick={() => handleItemClick("/Reservations")}
          >
            Reservations<span></span>
          </li>
          <li className="logout-button" onClick={() => handleLogout()}>
            <i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Log Out
            <span></span>
          </li>
        </ul>
        <div className="menu-btn">
          <div class="menu-btn__burger"></div>
        </div>
      </div>
      {showLogoutConfirmation && (
        <div className="logout-confirmation" ref={logoutConfirmationRef}>
          <div className="logout-card">
            <h2>Are you sure you want to logout?</h2>
            <div className="buttons">
              <button
                className="confirm-button"
                onClick={() => handleConfirmLogout()}
              >
                OK
              </button>
              <button
                className="cancel-button"
                onClick={() => handleCancelLogout()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
