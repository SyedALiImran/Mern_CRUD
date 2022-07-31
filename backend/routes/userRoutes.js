const express = require("express");
const router = express.Router();
const {
  getUserGoal,
  createUserGoal,
  updateUserGoal,
  deleteUserGoal,
} = require("../controller/userController");


router.route('/').get(getUserGoal).post(createUserGoal);
router.route('/:id').delete(deleteUserGoal).put(updateUserGoal);



module.exports = router;
