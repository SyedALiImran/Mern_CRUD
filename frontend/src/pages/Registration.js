import React from 'react'
import { useState } from 'react';

import goalIcon from "../images/goalIcon.png";

import '../pages/registration.css'

const Registration = () => {
  const [signUpData, setSignUpData] = useState({
    name:"",
    email: "",
    password: "",
    cpassword: ""
  });
  const onSubmitt = () => {
    console.log(signUpData)
  };

  const handleInput = (e) => {
    let name, value;

    name = e.target.name;
    value = e.target.value;
    setSignUpData({ ...signUpData, [name]: value });
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
              type="text"
              className="form-control mb-2 my-3"
              name="text"
              value={signUpData.namel}
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
            <button
              type="button"
              className="form-control  btn btn-primary my-4 loginbtn"
              onClick={onSubmitt}
            >
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
   )
}

export default Registration