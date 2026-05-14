import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import English from "./Components/English";
import Navbar from "./Components/Navbar";
import Genres from "./Components/Genres";
import Home from "./Components/Home";
import Bollywood from "./Components/Bollywood";
import Bengali from "./Components/Bengali";
import About from "./Components/About";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/english" element={<English />} />
        <Route path="/bollywood" element={<Bollywood />} />
        <Route path="/bengali" element={<Bengali />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
