import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaStepBackward, FaStepForward, FaVolumeUp } from "react-icons/fa";

import "./Common.css";

function Bengali() {

  // ✅ SONG LIST — only filenames, no imports needed
  const songs = [
    {
      title: "Bhalobeshe Shokhi",
      src: "/bengali/audio/s7.mp3",
      cover: "/bengali/covers/c8.jpg",
    },
    {
      title: "Gahana Kusum",
      src: "/bengali/audio/s8.mp3",
      cover: "/bengali/covers/c9.jpg",
    },
    {
      title: "Tumi Sandhyar Meghmala",
      src: "/bengali/audio/s9.mp3",
      cover: "/bengali/covers/c10.webp",
    },
    {
      title: "Majhe Majhe Tobo",
      src: "/bengali/audio/bs4.mp3",
      cover: "/bengali/covers/b4.jpg",
    },
    {
      title: "Hey Shokha",
      src: "/bengali/audio/bs5.mp3",
      cover: "/bengali/covers/b5.jpg",
    },
    {
      title: "Bodhu Kon Aalo Laglo Chokhe",
      src: "/bengali/audio/bs6.mp3",
      cover: "/bengali/covers/b6.jpg",
    },
    {
      title: "Kotobar Bhebchinu",
      src: "/bengali/audio/bs7.mp3",
      cover: "/bengali/covers/b7.jpg",
    },
    {
      title: "Mono Mor Megher",
      src: "/bengali/audio/bs8.mp3",
      cover: "/bengali/covers/b8.jpg",
    },
    {
      title: "Neelo Anjano Ghono",
      src: "/bengali/audio/bs9.mp3",
      cover: "/bengali/covers/b9.jpg",
    },
    {
      title: "Jagorone Jaye Bibhabori",
      src: "/bengali/audio/bs10.mp3",
      cover: "/bengali/covers/b10.jpg",
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
                onClick={() => { setCurrentIndex(i); setIsPlaying(true); setShowPlaylist(false); }}
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

export default Bengali;
