                          import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { reset, login } from "../features/auth/authSlice";

import { toast } from "react-toastify";
import goalIcon from "../images/goalIcon.png";
import "../pages/login.css";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const onSubmitt = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
    let API_URL = "/api/users/";
    console.log(API_URL + "login");
  };

  const handleInput = (e) => {
    e.preventDefault();
    let name, value;

    name = e.target.name;
    value = e.target.value;
    setLoginData({ ...loginData, [name]: value });
  };
  if(isLoading){
    toast.success('Loading Data');
  }
  return (
    <>
      <div className="container-fluid global-container">
        <div className="center">
          <form onSubmit={onSubmitt}>
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
              type="submit"
              className="form-control  btn btn-primary mb-3 loginbtn"
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
