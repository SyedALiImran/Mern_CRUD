const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegistration = require("../models/userModel");

//@dec     getUsers
//@route   GET/api/users
//@access  Private
const getRegisterUsers = asyncHandler(async (req, res) => {
  const usersList = await userRegistration.find();
  res.status(200).json(usersList);
});

//@dec     Getting Login User Info
//@route   GET/api/users
//@access  Private
const getMe = asyncHandler(async (req, res) => {
  const { name, email, id } = await userRegistration.findById(req.user.id);
  res.status(200).json({ id, name, email });
});

//@dec     SIGN UP PAGE (createUsers)
//@route   Post/api/users
//@access  Public
const createRegisterationUsers = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Kindly fill all the fields correctly");
  }

  // hashing passowrd

  const salt = await bcrypt.genSalt(10);

  const hashPassword = await bcrypt.hash(password, salt);

  // find user already exist or not
  const userExist = await userRegistration.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist ");
  } else {
    const userCreate = await userRegistration.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(201).json({
      _id: userCreate.id,
      name: userCreate.name,
      email: userCreate.email,
      token: generateToken(userCreate.id),
    });
  }
});

//@dec     AUTHENTICATE USER
//@route   Post/api/users
//@access  Public
const loginUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Kindly fill the fields correctly");
  } else {
    // finding user

    const user = await userRegistration.findOne({ email });

    // auth user with email and pass

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Credentials");
    }
  }
});

//@dec     updateUsers
//@route   PUT/api/users
//@access  Private
const updateRegisterUsers = asyncHandler(async (req, res) => {
  const updateId = req.params.id;
  const userExst = await userRegistration.findById(updateId);

  if (!userExst) {
    res.status(400).json("User Not Found");
  }

  const updateUser = await userRegistration.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    {
      new: true,
    }
  );
  res.status(200).json(updateUser);
});

//@dec     DELETE Users
//@route   Delete/api/users
//@access  Private
const deleteRegisterationUsers = asyncHandler(async (req, res) => {
  const findingUserId = await userRegistration.findById(req.params.id);

  if (!findingUserId) {
    res.status(400).json("user not found");
  }
  await userRegistration.deleteOne(findingUserId);
  res.status(200).json(`User removed successfully ${req.params.id}`);
});

//@dec     Generate Token for signup or login

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  getRegisterUsers,
  getMe,
  createRegisterationUsers,
  loginUsers,
  updateRegisterUsers,
  deleteRegisterationUsers,
};
