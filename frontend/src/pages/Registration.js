import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";

import { reset, register } from "../features/auth/authSlice";
import Spinner from '../pages/components/spinner'
import goalIcon from "../images/goalIcon.png";
import { toast } from "react-toastify";
import "../pages/registration.css";

const Registration = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const { name, email, password, cpassword } = signUpData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

    useEffect(() => {
      
      if(isError){
       toast.error(message);
      }
      if(isSuccess || user){
        navigate('/');
      }

      dispatch(reset())

    }, [user,isError,isSuccess,message,dispatch,navigate])
    


  const onSubmitt = (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      toast.error("passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
      
       
      
    }
  };
  if(isLoading){
    <Spinner />
  }

  const handleInput = (e) => {
    e.preventDefault();
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setSignUpData({ ...signUpData, [name]: value });
  };
  
  return (
    <>
      <div className="container-fluid global-container">
        <div className="center">
          <form onSubmit={onSubmitt}>
            <img
              src={goalIcon}
              className="img-fluid goalImg"
              alt="Goal_Image"
             
            />
            <input
              type="text"
              id="asd"
              className="form-control mb-2 my-3"
              name="name"
              value={signUpData.name}
              onChange={handleInput}
              placeholder="Enter Your Name"
            />
            <input
              type="email"
              className="form-control mb-2 my-3"
              name="email"
              value={signUpData.email}
              onChange={handleInput}
              placeholder="Enter Your Email"
            />

            <input
              type="password"
              className="form-control mb-2 my-3"
              name="password"
              value={signUpData.password}
              onChange={handleInput}
              placeholder="Enter Your Password"
            />
            <input
              type="password"
              className="form-control mb-2 my-3"
              name="cpassword"
              value={signUpData.cpassword}
              onChange={handleInput}
              placeholder="Confirm Password"
            />
            <span style={{fontSize:'15px'}}>have Account ?<Link to='/login'>Login</Link> </span>
            <button
              type="submit"
              className="form-control  btn btn-primary my-2 loginbtn"
              
            >
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
