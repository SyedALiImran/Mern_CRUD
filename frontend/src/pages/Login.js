import React from "react";
import { useState } from "react";

import goalIcon from "../images/goalIcon.png";
import "../pages/login.css";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const onSubmitt = () => {
    console.log(loginData);
  };

  const handleInput = (e) => {
    e.preventDefault()
    let name, value;

    name = e.target.name;
    value = e.target.value;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <>
      <div className="container-fluid global-container">
        <div className="center">
          <form action="">
            <img
              src={goalIcon}
              className="img-fluid goalImg"
              alt="Goal_Image"
              srcSet="Goal Image"
            />
            <input
              type="email"
              className="form-control mb-3 my-3"
              name="email"
              value={loginData.email}
              onChange={handleInput}
              placeholder="Email"
            />
            
            <input
              type="password"
              className="form-control mb-2"
              name="password"
              value={loginData.password}
              onChange={handleInput}
              placeholder="Password"
            />
            <button
              type="button"
              className="form-control  btn btn-primary mb-3 loginbtn"
              onClick={onSubmitt}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
