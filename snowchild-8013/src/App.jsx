// react import....
import React, { useState } from "react";

// JS files import...
import { Login } from "./Components/Login/Login";
import { BrandName } from "./Components/UI/BrandName";
import { SignUp } from "./Components/Signup/SignUp";
import { HomePage } from "./Components/homepage/HomePage";

//React Router....
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./privateRoute/PrivateRoute";

//import bootstrap..
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

// CSS files import...
import "./App.css";

//useContext file...
import { AuthProvider } from "./Contexts/AuthContext";
import { Header } from "./Components/UI/Header";
import { Profile } from "./Components/Profile/Profile";
import { Ping } from "./Components/Ping/Ping";

const App = () => {
  const [navBar, setNavBar] = useState(true);

  const setToggle = (data) => {
    setNavBar(data);
  };

  return (
    <React.Fragment>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<BrandName />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login toggle={setToggle} />} />
            <Route element={<PrivateRoute />}>
              <Route
                path="/homepage"
                element={<HomePage toggle={setToggle} />}
              />
              <Route path="/profile" element={<Profile toggle={setToggle} />} />
              <Route path="/ping" element={<Ping />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </React.Fragment>
  );
};

export default App;
