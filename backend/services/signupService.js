const bcrypt = require("bcrypt");
const User = require("../models/User"); 


const registerUser = async ({ email, username, password }) => {
  if (!email || !username || !password) {
    throw { status: 400, message: "All fields are required" };
  }

  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists) {
    throw { status: 409, message: "Email or username already taken" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, username, password: hashedPassword });
  await newUser.save();

  return newUser;
};

module.exports = { registerUser };
