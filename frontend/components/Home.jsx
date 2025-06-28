import React, { useState } from "react";
import {Link} from "react-router-dom";
import { PuffLoader } from "react-spinners";


const extractVideoId = (url) => {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins} min ${secs} sec`;
};


  const inputChangeHandler = async (e) => {
    const { name, value } = e.target;

    if (name === "searchTerm") {
      setSearchTerm(value);
    }

    const videoId = extractVideoId(value);
    if (!videoId) return;

    try {
      const response = await fetch(
        "http://localhost:3000/api/videoDetails",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ searchTerm: value }),
        }
      );

      const res = await response.json();
      setVideoData(res);
    } catch (error) {
      console.error("Video detail fetch error", error.message);
    }
  };

  const handleSummarise = async (e) => {
    e.preventDefault();
    const videoId = extractVideoId(searchTerm);
    if (!videoId) return alert("Invalid YouTube URL");

    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:3000/api/summarise",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId }),
        }
      );

      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      console.error("Summary error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bg-[#a61f22] p-6">
        <div className="flex justify-between mx-[10%] cursor-pointer">
          <h1 className="text-white font-semibold text-lg">VideoInsight</h1>

          <Link to="/admin" className="text-lg text-white font-semibold">
            Admin
          </Link>
        </div>
        <div className="flex flex-col text-center p-[6%] gap-8">
          <p className="text-4xl text-white font-semibold">
            VideoInsight Summarizer
          </p>

          <div className="flex w-[30%] m-auto gap-2">
            <input
              type="searchTerm"
              name="searchTerm"
              placeholder="Paste your video link here"
              value={searchTerm}
              onChange={inputChangeHandler}
              className="border rounded-sm border-gray-300 p-4 text-xs bg-white m-auto w-[70%]"
            />
              <button
                onClick={handleSummarise}
                className="bg-black text-white font-bold p-2 rounded-md cursor-pointer text-sm flex items-center justify-center min-w-[130px]"
              >
                {loading ? (
                  <>
                    <PuffLoader size={18} color="#ffffff" loading={true} className="mr-2" />
                    Summarizing...
                  </>
                ) : (
                  "Summarise"
                )}
              </button>

          </div>
        </div>
      </div>

      {videoData && (
        <div className="flex flex-col items-center mt-8 gap-2">
          <img
            src={videoData.thumbnail}
            alt="Video Thumbnail"
            className="w-[15%] rounded-lg "
          />
          <p className="text-md font-semibold mt-2">{videoData.title}</p>
          <p className="text-md text-gray-500">
            ⏱ Duration: {formatDuration(videoData.duration)}
          </p>
        </div>
      )}

      {summary && (
        <div className="max-w-xl mx-auto mt-8 p-4 border rounded bg-gray-100">
          <h2 className="font-semibold mb-2">📄 Summary:</h2>
          <div className="max-h-96 overflow-y-scroll pr-2">
            {summary.split('\n').map((line, idx) => {
              // Replace **text** with <strong>text</strong>
              const formatted = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
              return (
                <p
                  key={idx}
                  className="mb-2 whitespace-pre-wrap font-light"
                  dangerouslySetInnerHTML={{ __html: formatted }}
                />
              );
            })}
          </div>
        </div>
      )}

      <div className="intro text-lg max-w-xl mx-auto p-4 my-6">
        <p className="mt-4 font-semibold">
          VideoInsight Summarizer helps you save time by turning videos into
          quick, clear insights. Start summarizing smarter today!
        </p>
        <br />
        <p>🚀 Paste any YouTube URL</p>
        <p>🤖 Get AI-powered video summaries</p>
        <p>📂 Save all summaries in your dashboard</p>
        <p>🔒 Unlock advanced features with a subscription</p>
      </div>
    </div>
  );
};

export default Home;
