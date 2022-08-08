import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import userImg from "../images/user.png";

import {
  createGoal,
  deleteGoal,
  getGoal,
  reset,
} from "../features/goalAuth/goalSlice";
import Spinner from "../pages/components/spinner";
import { toast } from "react-toastify";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allGoals, isError, isLoading, message } = useSelector(
    (state) => state.goals
  );
  const [goal, setGoal] = useState("");

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }
    dispatch(getGoal());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, dispatch, message]);

  const onSubmitt = (e) => {
    e.preventDefault();
    if (goal) {
      dispatch(createGoal({ goal }));
      toast.success("Goal created");
      setGoal("");
    } else {
      toast.error("fill the goal field");
    }
  };

  if (isLoading) {
    <Spinner />;
  }
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
                id="userImg"
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
          </div>
        </div>

        <div className="tablee">
            <div className="row">
          {allGoals.map((userdataa) => {
            return (
              <div
                className="card text-black carrd mb-3 border-dark"
                style={{maxWidth: "16rem" , margin:'5px'}}
                key={userdataa._id}
              >
                <div className="card-header border-danger" style={{backgroundColor:'white'}}>{userdataa.createdAt}
                
                </div>
                <div className="card-body">
                  <h5 className="card-title"></h5>
                  <p className="card-text">
                    {userdataa.goal}
                  </p>
                </div>
                <div class="card-footer bg-transparent border-danger"><span onClick={()=>dispatch(deleteGoal(userdataa._id))} className='btn btn-danger btn-sm form-control'>Delete</span></div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
