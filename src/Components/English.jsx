import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaStepBackward, FaStepForward, FaVolumeUp } from "react-icons/fa";

import "./Common.css";

function English() {

  // ✅ SONG LIST — only filenames (no imports needed)
  const songs = [
    {
      title: "What Makes You Beautiful",
      src: "/english/audio/s1.mp3",
      cover: "/english/covers/c1.jpg",
    },
    {
      title: "Good For You",
      src: "/english/audio/s2.mp3",
      cover: "/english/covers/c2.jpg",
    },
    {
      title: "Back To You",
      src: "/english/audio/s3.mp3",
      cover: "/english/covers/c3.jpg",
    },
    {
      title: "Die With A Smile",
      src: "/english/audio/es4.mp3",
      cover: "/english/covers/e4.jpg",
    },
    {
      title: "Perfect",
      src: "/english/audio/es5.mp3",
      cover: "/english/covers/e5.jpg",
    },
    {
      title: "Heat Waves",
      src: "/english/audio/es6.mp3",
      cover: "/english/covers/e6.jpg",
    },
    {
      title: "Attention",
      src: "/english/audio/es7.mp3",
      cover: "/english/covers/e7.jpg",
    },
    {
      title: "Night Changes",
      src: "/english/audio/es8.mp3",
      cover: "/english/covers/e8.jpg",
    },
    {
      title: "Senorita",
      src: "/english/audio/es9.mp3",
      cover: "/english/covers/e9.jpg",
    },
    {
      title: "Let Me Love You",
      src: "/english/audio/es10.mp3",
      cover: "/english/covers/e10.jpg",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [showVolume, setShowVolume] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [durationTime, setDurationTime] = useState("0:00");
  const [showPlaylist, setShowPlaylist] = useState(false);

  const audioRef = useRef(new Audio(songs[currentIndex].src));

  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(songs[currentIndex].src);
    audioRef.current.volume = volume / 100;

    if (isPlaying) audioRef.current.play();

    const updateProgress = () => {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100 || 0
      );
      setCurrentTime(formatTime(audioRef.current.currentTime));
      setDurationTime(formatTime(audioRef.current.duration));
    };

    const handleEnded = () => nextSong();

    audioRef.current.addEventListener("timeupdate", updateProgress);
    audioRef.current.addEventListener("ended", handleEnded);

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateProgress);
      audioRef.current.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex]);

  const togglePlay = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentIndex((currentIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentIndex((currentIndex - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime =
      (audioRef.current.duration * e.target.value) / 100;
    setProgress(e.target.value);
  };

  const handleVolume = (e) => {
    audioRef.current.volume = e.target.value / 100;
    setVolume(e.target.value);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  return (
    <div className={`app-container ${showPlaylist ? "playlist-open" : ""}`}>

      {/* hamburger toggle for small screens */}
      <button
        className="playlist-toggle"
        aria-controls="playlist"
        aria-expanded={showPlaylist}
        onClick={() => setShowPlaylist((s) => !s)}
      >
        ☰
      </button>

      <div className="player-wrapper">

        {/* PLAYLIST COLUMN */}
        <div id="playlist" className={`playlist-section ${showPlaylist ? "open" : ""}`}>

          <div className="playlist-title">
            List of Available Tracks
          </div>

          <div className="playlist">
            {songs.map((song, i) => (
              <div
                key={i}
                className={`song ${i === currentIndex ? "active" : ""}`}
                onClick={() => { 
                  setCurrentIndex(i);
                  setIsPlaying(true);
                  setShowPlaylist(false);
                }}
              >
                {song.title}
              </div>
            ))}
          </div>

        </div>

        {/* PLAYER */}
        <div className="player-container">

          <img 
            src={songs[currentIndex].cover}
            className="cover-art"
            alt="cover"
          />

          <h2 className="song-title">
            {songs[currentIndex].title}
          </h2>

          {/* PROGRESS BAR */}
          <div className="progress-container">
            <span>{currentTime}</span>
            <input type="range" value={progress} onChange={handleSeek} />
            <span>{durationTime}</span>
          </div>

          {/* CONTROLS */}
          <div className="controls-row">

            <div className="controls">
              <FaStepBackward onClick={prevSong}/>
              {isPlaying
                ? <FaPause onClick={togglePlay}/>
                : <FaPlay onClick={togglePlay}/>
              }
              <FaStepForward onClick={nextSong}/>
            </div>

            {/* VOLUME */}
            <div className="volume-btn">
              <div className="volume-icon">
                <FaVolumeUp onClick={() => setShowVolume(!showVolume)} />
                {showVolume && (
                  <input
                    type="range"
                    className="volume-slider"
                    value={volume}
                    onChange={handleVolume}
                  />
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default English;
