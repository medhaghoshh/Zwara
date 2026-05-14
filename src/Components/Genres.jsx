import React from "react";
import { useNavigate } from "react-router-dom";
import "./Genres.css";

function Genres() {

  const navigate = useNavigate();

  return (
    <div className="genres-page">
<div className="box">
      <h1 className="genres-title">Choose Your Genre 🎧</h1>

      <div className="genres-buttons">

        <button onClick={() => navigate("/bollywood")}>
          🎵 Bollywood
        </button>

        <button onClick={() => navigate("/english")}>
          🎧 English Pop
        </button>

        <button onClick={() => navigate("/bengali")}>
          🌼 Bengali
        </button>

      </div>
</div>
    </div>
  );
}

export default Genres;
