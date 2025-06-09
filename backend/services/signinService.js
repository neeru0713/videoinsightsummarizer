const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const jwtSecret = process.env.JWT_SECRET;

const loginService = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 400, message: "Email and password are required" };
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw { status: 404, message: "User not found" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, {
    expiresIn: "1d",
  });

  return { user, token };
};

module.exports = { loginService };

