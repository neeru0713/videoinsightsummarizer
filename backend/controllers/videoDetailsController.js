const getVideoData = require("../services/videoDetailsService");

const videoDetailsController = async (req, res) => {
  try {
      const { searchTerm } = req.body;
      console.log("?????req.body", req.body)

    const videoData = await getVideoData(searchTerm);

    res.status(200).json(videoData);
  } catch (err) {
    console.error("YouTube fetch error:", err);
    res.status(500).json({ message: err });
  }
};

module.exports = { videoDetailsController };
