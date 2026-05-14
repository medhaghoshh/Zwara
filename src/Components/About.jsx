import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-card">
        
        <h1 className="about-title">About Zwara🎵</h1>

        <p className="about-text">
        Not every app understands your vibe.
<b> Zwara does.</b>
        </p>

        <p className="about-text">
          From soulful Bollywood melodies and energetic English pop tracks
          to classic Bengali tunes, Zwara curates vibes for every mood.
        </p>

        <p className="about-text">
          Our mission is simple:
          <b> make music discovery effortless, immersive and personal.</b>
        </p>

        <div className="about-features">
          <span>🎧 Built for moods</span>
          <span>⚡ Tap into vibes</span>
          <span>🌙 2AM energy</span>
          <span>💜 Handpicked tracks</span>
        </div>

        <p className="about-footer">
          Zwara is built with love by a student developer who's learning,
          creating and sharing the joy of music through code.
        </p>

        <p className="about-sign">
          Zwara — press play, disappear into the vibe.
        </p>

      </div>
    </div>
  );
}

export default About;
