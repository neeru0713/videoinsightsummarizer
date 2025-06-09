const { registerUser } = require("../services/signupService");

const signupController = async (req, res) => {
  try {
    const newUser = await registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    console.error("Registration error:", err);

   
    if (err.status && err.message) {
      return res.status(err.status).json({ message: err.message });
    }

    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signupController };
