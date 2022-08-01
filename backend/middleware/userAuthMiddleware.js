const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      /* 
            *-> Get token from header
            *-> exmpl : Bearer032gfsfs2543255dasda split
            with "spaceBar" function make token in array
            form like [ Bearee,032gfsfs2543255dasda] so 
            we defined index of token to get token
            */
      token = req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user info from token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error(" No authorized ");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("no authorized- No TOKEN !!");
  }
});

module.exports = {
  protect,
};
