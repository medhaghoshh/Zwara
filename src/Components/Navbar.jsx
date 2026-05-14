import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        Zwara🎵
      </div>

      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/genres">Genres</a></li>
        <li><a href="/about">About Us</a></li>
      </ul>
    </div>
  );
}

export default Navbar;
