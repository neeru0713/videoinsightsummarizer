import React, { useState } from "react";

const Home = () => {
  const [serachTerm, setSerachTerm] = useState("");

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "serachTerm") {
      setSerachTerm(value);
    }
  };

  const handleSummarise = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({serachTerm}),
      });

      const res = await response.json();
      console.log("......res", res);

    
    } catch (error) {
      console.error("Sign In Error", error.message);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#a61f22] p-6">
        <div className="flex justify-between mx-[10%]">
          <h1 className="text-white font-semibold text-lg">VideoInsight</h1>
        </div>
        <div className="flex flex-col text-center p-[6%] gap-8">
          <p className="text-4xl text-white font-semibold">
            VideoInsight Summarizer
          </p>
          <div className="flex w-[30%] m-auto gap-2">
            <input
              type="serachTerm"
              name="serachTerm"
              placeholder="Paste your video link here"
              value={serachTerm}
              onChange={inputChangeHandler}
              className="border rounded-sm border-gray-300 p-4 text-xs bg-white m-auto w-[70%]"
            />
            <button
              onClick={handleSummarise}
              className="bg-black text-white font-bold p-2 rounded-md cursor-pointer text-sm w-[30%]"
            >
              Summarise
            </button>
          </div>
        </div>
      </div>

      <div class="intro text-lg max-w-xl mx-auto p-4 my-6">
        <p class="mt-4 font-semibold">
          VideoInsight Summarizer helps you save time by turning videos into
          quick, clear insights. Start summarizing smarter today!
        </p>
        <br></br>
        <p>🚀 Paste any YouTube URL</p>
        <p>🤖 Get AI-powered video summaries</p>
        <p>📂 Save all summaries in your dashboard</p>
        <p>🔒 Unlock advanced features with a subscription</p>
      </div>
    </div>
  );
};

export default Home;
