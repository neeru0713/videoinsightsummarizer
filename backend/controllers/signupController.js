const summariseData = require("../services/signupService");

const signupController = async (req, res) => {
  try {
    const newUser = await summariseData(req.body);

   
  } catch (err) {
   

   
   
  }
};

module.exports = { signupController };
