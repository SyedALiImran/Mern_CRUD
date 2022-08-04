const asyncHandler = require("express-async-handler");

const GGOAL = require("../models/userGoalModel");
const UUSER = require("../models/userModel");

//@dec     getUserGoals
//@route   GET/api/users
//@access  Private
const getUserGoal = asyncHandler(async (req, res) => {
  const userGoals = await GGOAL.find({ user: req.user.id });
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
  const createGoal = await GGOAL.create({
    goal: req.body.goal,
    user: req.user.id,
  });

  res.status(200).json(createGoal);
});

//@dec     updateUserGoals
//@route   PUT/api/users:id
//@access  Private
const updateUserGoal = asyncHandler(async (req, res) => {

  const goalId = await GGOAL.findById(req.params.id);

  if (!goalId) {
    res.status(400);
    throw new Error("Goal not found");
  }
  //---------------- find loged in user in UUSER

  const user = await UUSER.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  //-- make sure corect user loggin

  if (goalId.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("Not Authorized ");
  }

  const updateGoal = await GGOAL.findByIdAndUpdate(
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

  const deleteGoalId = await GGOAL.findById(req.params.id);

  if (!deleteGoalId) {
    res.status(400);
    res.send({ error: "goal not found" });
  }

  // check insure logined user in UUSER MODEL

  const user = await UUSER.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not Found");
  }

  // chckng loggind user is correct user to delte goal or not

  if (deleteGoalId.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("Not Authorized To Delete");
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
