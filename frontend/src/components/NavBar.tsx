import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPenToSquare,
  faSignOut,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logos/ctrl_hack_del_logo_white.png";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState("");
  const [sliderPosition, setSliderPosition] = useState(0);

  useEffect(() => {
    if (location.pathname === "/home") {
      setActive("home");
      setSliderPosition(-25);
    } else if (location.pathname === "/tailor") {
      setActive("tailor");
      setSliderPosition(25);
    } else if (location.pathname === "/latex") {
      setActive("latex");
      setSliderPosition(50);
    }
  }, [location.pathname, sliderPosition]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center mx-10 my-5">
      <div
        className="w-16 h-16 rounded-lg bg-blue-500 text-white fixed flex text-center items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105"
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          src={logo}
          alt="Ctrl Hack Del Logo"
          className="w-12 h-12 object-contain"
        />
      </div>
      <div className="w-16 h-52 rounded-lg bg-blue-100 flex flex-col items-center justify-center p-3 fixed bottom-m my-5 gap-2">
        <div
          className={`${
            active === "home" ? "bg-m-blue" : "hover:bg-gray-200"
          } rounded-lg px-3 pt-2 mx-2 flex items-center justify-center transition-all duration-200`}
        >
          <button
            onClick={() => {
              navigate("/home");
            }}
            className="pb-2 transition-transform duration-200 hover:scale-110"
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
        <div
          className={`${
            active === "tailor" ? "bg-m-blue" : "hover:bg-gray-200"
          } rounded-lg px-3 pb-2 mx-2 flex items-center justify-center transition-all duration-200`}
        >
          <button
            onClick={() => {
              navigate("/tailor");
            }}
            className="pt-2 transition-transform duration-200 hover:scale-110"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
        <div
          className={`${
            active === "latex" ? "bg-m-blue" : "hover:bg-gray-200"
          } rounded-lg px-3 pb-2 mx-2 flex items-center justify-center transition-all duration-200`}
        >
          <button
            onClick={() => {
              navigate("/latex");
            }}
            className="pt-2 transition-transform duration-200 hover:scale-110"
          >
            <FontAwesomeIcon icon={faCode} />
          </button>
        </div>
        <div
          className={`${
            active === "logout" ? "bg-m-blue" : "hover:bg-gray-200"
          } rounded-lg px-3 pb-2 mx-2 flex items-center justify-center transition-all duration-200`}
        >
          <button
            onClick={handleLogout}
            className="pt-2 transition-transform duration-200 hover:scale-110"
          >
            <FontAwesomeIcon icon={faSignOut} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
