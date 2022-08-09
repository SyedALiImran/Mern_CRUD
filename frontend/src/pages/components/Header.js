import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import { reset, logOut } from "../../features/auth/authSlice";

import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  
  const onLogOut = () =>{
    dispatch(logOut());
    dispatch(reset());
    navigate('/')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/registration">
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
                      logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                
                
              
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
