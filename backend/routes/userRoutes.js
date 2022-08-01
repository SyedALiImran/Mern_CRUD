const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/userAuthMiddleware");

const {
  getRegisterUsers,
  createRegisterationUsers,
  updateRegisterUsers,
  deleteRegisterationUsers,
  getMe,
  loginUsers,
} = require("../controller/userRegistrationController");


router.get("/allusers", getRegisterUsers);
router.post("/", createRegisterationUsers);
router.post("/login", loginUsers);
router.get("/me", protect, getMe);

module.exports = router;
