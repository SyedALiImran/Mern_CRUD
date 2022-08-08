import React from "react";
import { Link } from "react-router-dom";
import {  useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, logOut } from "../../features/auth/authSlice";

import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  useEffect(() => {
    if(!user){
      navigate('/login')
    }
    
  }, [user,navigate])
  
  
  const onLogOut = () =>{
    dispatch(logOut());
    dispatch(reset());
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Make It Happen
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {user ? (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link active btn btn-outline-danger btn-sm form-control"
                      aria-current="page"
                      onClick={onLogOut}
                      style={{marginTop:'10px'}}
                      
                    >
                      SignOut
                    </button>
                  </li>
                </>
              ) : (
                <>
                
              <li className="nav-item">
                    <button
                      className="nav-link active btn btn-outline-danger btn-sm form-control"
                      aria-current="page"
                      onClick={()=>navigate('/')}
                      style={{marginTop:'10px'}}
                      
                    >
                      SignUp
                    </button>
                  </li>
                </>
              )}

              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
