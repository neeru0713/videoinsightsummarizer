const  {loginService}  = require("../services/signinService");

const signinController = async (req, res) => {
  try {
    const { user, token } = await loginService(req.body);
    res.status(200).json({ user, token });
  } catch (err) {
    console.error("Login error:", err);
    const status = err.status || 500;
    const message = err.message || "Server error";
    res.status(status).json({ message });
  }
};

module.exports = { signinController };
