const express = require("express");
const router = express.Router();
const {
  getUserGoal,
  createUserGoal,
  updateUserGoal,
  deleteUserGoal,
} = require("../controller/userController");

const { protect } = require("../middleware/userAuthMiddleware");

router.route("/").get(protect,getUserGoal).post(protect,createUserGoal);
router.route("/:id").delete(protect,deleteUserGoal).put(protect,updateUserGoal);

module.exports = router;
