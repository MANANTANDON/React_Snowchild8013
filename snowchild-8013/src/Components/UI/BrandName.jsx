import React, { useEffect, useState } from "react";

//CSS imports....
import styles from "./BrandName.module.css";

//image import....
import BName from "../images/SCBL.png";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

export const BrandName = () => {
  const [display, setDisplay] = useState(true);
  const updateDisplay = () => {
    setDisplay(window.innerWidth > 632);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDisplay);
    return () => window.removeEventListener("resize", updateDisplay);
  });

  return (
    <React.Fragment>
      <div className={styles.AAA}>
        {window.innerWidth > "632" ? (
          <>
            <img
              src={logo}
              height="70px"
              width="70px"
              className={styles.logoImage}
            />
            {/* <div className={styles.initial}> */}
            <div className={styles.BN1}>
              <img src={BName} alt="Bname" />
            </div>
            <span className={styles.BN4}>Your Disguise Bubble.</span>
            <span className={styles.shadeCircle} />
            {/* </div> */}
            <div className={styles.BN2}>
              <button className={styles.BN5}>
                <span className={styles.BN5shadow}></span>
                <span className={styles.BN5edge}></span>
                <span className={styles.BN5front}>
                  <Link
                    to="/signup"
                    className="text-decoration-none link-light"
                  >
                    Get Started
                  </Link>
                </span>
              </button>
              <button className={styles.BN3}>
                <span className={styles.BN3shadow}></span>
                <span className={styles.BN3edge}></span>
                <span className={styles.BN3front}>
                  <Link to="/login" className="text-decoration-none link-light">
                    Login
                  </Link>
                </span>
              </button>
            </div>
          </>
        ) : (
          <span className={styles.resizeWindow}>
            RESIZE WINDOW TO VIEW CONTENT
          </span>
        )}
      </div>
    </React.Fragment>
  );
};

//commented code

/* <div
              className={
                !opacity ? `${styles.loginBox}` : `${styles.beforeBox}`
              }
            >
              <Login setBackValue={backValueHandler} />
            </div> */
