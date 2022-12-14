import axios from "axios";

const API_URL = "api/goals/";

//create goal

const createGoal = async (goalData, token) => {
  const confiq = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post(API_URL, goalData, confiq);
  return response.data;
};
//get goal

const getGoal = async (token) => {
  const confiq = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(API_URL,confiq);
  return response.data;
};

//delete goal

const deleteGoal = async (id,token) => {
  const confiq = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.delete(API_URL+id,confiq);
  return response.data;
};
const goalService = {
  createGoal,
  getGoal,
  deleteGoal
};

export default goalService;
