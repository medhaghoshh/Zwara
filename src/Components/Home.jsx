import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/genres"); // goes to Genres page
  };

  return (
    <div className="home-container">
    <div className="box">
      <h1 className="app-name">Zwara🎵</h1>
      <p className="tagline">The new age of music.</p>
      <p className="intro-text">
        Explore your favourite tracks and groove onto seamless listening experiences anytime, anywhere.
      </p>
      <button className="start-btn" onClick={handleStart}>
        START LISTENING
      </button>
    </div>
    </div>
  );
}

export default Home;
