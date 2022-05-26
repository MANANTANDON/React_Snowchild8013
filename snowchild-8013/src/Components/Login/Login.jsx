import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
//CSS
import loginCard from "./Login.module.css";
//images
import backArrow from "../universalImages/backArrow.png";

export const Login = (props) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ifError, setIfError] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();

    try {
      setIfError("");
      setError("");
      setLoading(true);
      await login(emailInput, passwordInput);
      navigate("/homepage");
      props.toggle(false);
    } catch {
      setIfError(true);
      setLoading(false);
      setError("Failed to login ");
    }
  };

  return (
    <React.Fragment>
      <div className={loginCard.backBar}>
        <button className={loginCard.backButton}>
          <Link to="/">
            <img src={backArrow} alt="backArrow" />
          </Link>
        </button>
      </div>
      <div className={loginCard.outerCounter}>
        <div className={loginCard.loginContainer}>
          {ifError && <div className={loginCard.error}>{error}</div>}
          <div className={loginCard.branding1}>SnowChild</div>
          <hr
            style={{
              boxSizing: "border-box",
              border: "2px solid #01579b",
              margin: "auto",
              width: "50%",
            }}
          />
          <form onSubmit={loginHandler} className={loginCard.loginBox}>
            <input
              type="text"
              placeholder="Email or Username"
              onChange={(event) => setEmailInput(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => setPasswordInput(event.target.value)}
            />
            <button
              disabled={loading}
              type="submit"
              className={loginCard.loginButton}
            >
              Login
            </button>
            <hr style={{ width: "90%", margin: "auto", marginTop: "20px" }} />
            <span
              style={{
                boxSizing: "border-box",
                display: "flex",
                width: "fit-content",
                margin: "auto",
                marginTop: "7px",
              }}
            >
              Don't have an
              <span className={loginCard.textDeco}>account</span>?
            </span>
            <button
              className={loginCard.signUp}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Get Started
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

//commented code
/* <input
              type="email"
              placeholder="UserName"
              className={loginCard.UNF}
              
              value={emailInput}
            />
            <input
              type="password"
              placeholder="password"
              className={loginCard.PWD}
              
              value={passwordInput}
            />
            <button
              disabled={loading}
              type="submit"
              className={loginCard.loginButton}
            >
              Log in
            </button> */
