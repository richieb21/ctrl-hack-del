import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPenToSquare,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [active, setActive] = useState('');
    const [sliderPosition, setSliderPosition] = useState(0);

    useEffect(() => {
        if (location.pathname === '/home') {
            setActive('home');
            setSliderPosition(-25);
        } else if (location.pathname === '/tailor') {
            setActive('tailor');
            setSliderPosition(25);
        }
    }, [location.pathname, sliderPosition]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center mx-10 my-5">
      <div className="w-16 h-16 rounded-lg bg-blue-500 text-white fixed flex text-center items-center justify-center">
        <p>L</p>
      </div>
      <div className="w-16 h-40 rounded-lg bg-blue-100 flex flex-col items-center justify-center p-3 fixed bottom-m my-5 gap-2">
        <div
          className={`${
            active === "home" ? "bg-m-blue" : ""
          } rounded-lg px-3 pt-2 mx-2 flex items-center justify-center`}
        >
          <button
            onClick={() => {
              navigate("/home");
            }}
            className="pb-2"
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
        <div
          className={`${
            active === "tailor" ? "bg-m-blue" : ""
          } rounded-lg px-3 pb-2 mx-2 flex items-center justify-center`}
        >
          <button
            onClick={() => {
              navigate("/tailor");
            }}
            className="pt-2"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
        <div
          className={`${
            active === "logout" ? "bg-m-blue" : ""
          } rounded-lg px-3 pb-2 mx-2 flex items-center justify-center`}
        >
          <button onClick={handleLogout} className="pt-2">
            <FontAwesomeIcon icon={faSignOut} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;;