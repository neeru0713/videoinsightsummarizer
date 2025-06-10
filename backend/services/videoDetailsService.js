const axios = require("axios");

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const extractVideoId = (url) => {
  console.log("......url", url);
  const match = url?.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
};

const getVideoData = async (url) => {
  if (!YOUTUBE_API_KEY) {
    throw new Error("YouTube API key is missing in environment variables");
  }

  const videoId = extractVideoId(url);
  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }

  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await axios.get(apiUrl);

    if (response.data?.error) {
      console.error("YouTube API error:", response.data.error);
      throw new Error("YouTube API error: " + response.data.error.message);
    }

    const item = response.data.items?.[0];
    if (!item) {
      throw new Error("Video not found or invalid video ID");
    }

    const { title, thumbnails } = item.snippet;
    const duration = item.contentDetails.duration;

    return {
      title,
      thumbnail: thumbnails?.high?.url || "",
      duration,
    };
  } catch (err) {
    console.error("Failed to fetch video data:", err.message);
    throw new Error(
      `Failed to fetch video data. Please try again later. ${err.message}`
    );
  }
};

module.exports = getVideoData;
