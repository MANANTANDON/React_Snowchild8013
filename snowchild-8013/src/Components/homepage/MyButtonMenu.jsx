import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";

//import css
import "./MyButtonMenu.css";

//import images
import bName from "../images/SCBL.png";
import { useNavigate } from "react-router-dom";

export const MyButtonMenu = (props) => {
  const { currnetUser, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const printInfo = () => {
    console.log("clicked !");
  };

  const handleLogout = async () => {
    try {
      setError("");
      await logout();
      navigate("/");
      props.toggle(true);
    } catch {
      setError(" Failed to logput ! ");
    }
  };

  return (
    <React.Fragment>
      <img src={bName} alt="logo" height="35px" width="160px" />
      <button onClick={() => navigate("/profile")} className="functionButtons">
        Profile
      </button>
      <button onClick={printInfo} className="functionButtons">
        Around You
      </button>
      <button onClick={() => navigate("/ping")} className="functionButtons">
        Ping
      </button>
      <button onClick={printInfo} className="functionButtons">
        Updates
      </button>
      <button onClick={handleLogout} className="functionButtons">
        Logout
      </button>
    </React.Fragment>
  );
};
