import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import userImg from "../images/user.png";

import { createGoal, getGoal , reset } from "../features/goalAuth/goalSlice";
import { toast } from "react-toastify";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allGoals,isError,isLoading,message } = useSelector((state) => state.goals);
  const [goal, setGoal] = useState("");

 

  useEffect(() => {
    if(isError){
      console.log('i am is error message'+message)
    }

    if (!user){ 
      navigate("/")
    };
    dispatch(getGoal())
    return ()=>{
     dispatch(reset())

    }
    

  }, [user, navigate,isError ]);

  const onSubmitt = (e) => {
    e.preventDefault();
    
    dispatch(createGoal({goal}));
    toast.success("Goal created");
    setGoal("");
  };

  // if(isLoading){
  //   console.log('Loading Data');
  // }
  return (
    <>
      <div className="container-fluid" style={{ paddingLeft: "20px" }}>
        <div className="row">
          <div className="col-md-3  parent my-4">
            <div className="userImg">
              <img
                src={userImg}
                className="img-fluid"
                alt="userImg"
                height={70}
                width={70}
              />
            </div>
            <div className="userInfo">
              <h5 id="user">
                <b>{user && user.name}</b>
              </h5>
              <span>{user && user.email}</span>
            </div>
          </div>
          {/* //make a goal */}
          <div className="col-md-9 my-4">
            <div className="postsection">
              <div className="makeGoal">
                <form onSubmit={onSubmitt}>
                  <h4>
                    <b>Goal</b>
                  </h4>
                  <input
                    type="text"
                    className="form-control"
                    name="goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  />

                  <button
                  type="submit"
                    className="btn btn-primary btn-sm   my-2 "
                    
                  >
                    Post Goal
                  </button>
                </form>
              </div>
            </div>
              {allGoals.map((userdata)=>{
                return(
                  <h1 key={userdata._id}>{userdata.goal}</h1>
                )
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
