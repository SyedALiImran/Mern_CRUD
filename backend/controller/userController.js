const asyncHandler = require("express-async-handler");

const userGoalScehma = require("../models/userGoalModel");
const userModel = require("../models/userModel");
//@dec     getUserGoals
//@route   GET/api/users
//@access  Private
const getUserGoal = asyncHandler(async (req, res) => {
  const userGoals = await userGoalScehma.find({ user: req.user.id });
  res.status(200).json(userGoals);
});

//@dec     createUserGoals
//@route   POST/api/users
//@access  Private
const createUserGoal = asyncHandler(async (req, res) => {
  if (!req.body.goal) {
    res.status(400);
    throw new Error("Kindly fill the Goal");
  }
  const createGoal = await userGoalScehma.create({
    goal: req.body.goal,
    user: req.user.id,
  });

  res.status(200).json(createGoal);
});

//@dec     updateUserGoals
//@route   PUT/api/users:id
//@access  Private
const updateUserGoal = asyncHandler(async (req, res) => {
  const goalId = await userGoalScehma.findById(req.params.id);
  if (!goalId) {
    res.status(400);
    throw new Error("Goal not found");
  }
  //---------------- find loged in user in usermodel
  const user = await userModel.findById(req.user.id);
  console.log(user)
  //------------- KAL DEKHUNGA--------------------
  console.log('I AM ID user._id '+user._id)
  console.log('I AM ID userGoalScehma.user '+userGoalScehma.goal)

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  //-- make sure corect user loggin
  if (userGoalScehma.user !== user._id) {
    res.status(401);
    throw new Error("Not Authorized ");
  }
//------------------------YAHAN TAK-----------
  const updateGoal = await userGoalScehma.findByIdAndUpdate(
    req.params.id,
    {
      goal: req.body.goal,
    },
    { new: true }
  );

  res.status(200).json(updateGoal);
});

//@dec     deleteUserGoals
//@route   DELETE/api/users:id
//@access  Private
const deleteUserGoal = asyncHandler(async (req, res) => {
  const deleteGoalId = await userGoalScehma.findById(req.params.id);
  if (!deleteGoalId) {
    res.status(400);
    res.send({ error: "goal not found" });
  }
 
  await deleteGoalId.remove();
  res.status(200).json({ id: `delete goal id ${req.params.id}` });
});

module.exports = {
  getUserGoal,
  createUserGoal,
  deleteUserGoal,
  updateUserGoal,
};
