import { Link } from "react-router-dom";
import "../css/App.css";
import React, { useEffect, useState } from "react";
import { fetchUserInformation } from "../apis/UserAPI";
import { Logout } from "./Logout";
import { useNavigate } from "react-router-dom";


const AppWrapper = ({ childern }) => {
  const [user, setUser] = new useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (user === "") {
        try {
          var result = await fetchUserInformation();
          setUser(result);
        }catch{}
      }
    }

    fetchData();
    // Anything in here is fired on component mount.

    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  const UserLoggedOutButtons = () => {
    if (user === "") {
      return (
        <div>
          <div className="buttonGroup">
            <Link to="/login">
              <button className="button">Login</button>
            </Link>

            <Link to="/signup">
              <button className="button">SignUp</button>
            </Link>
          </div>
        </div>
      );
    } else {
      return "";
    }
  };

  const onLogout = () => {
    setUser("");
    navigate("/login")
  };

  const UserLoggedInInfo = () => {
    if (user !== "") {
      return (
        <div className="row center">
          <div className="userInfo">
            <p>Logged in : {user.username}</p>
          </div>

          <div className="buttonGroup">
            <Logout onSelect={onLogout} />
          </div>
        </div>
      );
    } else {
      return "";
    }
  };

  return (
    <div className="App ">
      <header className="App-header">
    
        <Link to="/" style={{ textDecoration: "none" }}>
          <p style={{ color: "white" }}>Language Translator</p>
        </Link>
        <UserLoggedOutButtons />
        <UserLoggedInInfo />
      </header>
      {childern}
    </div>
  );
};

export default AppWrapper;
