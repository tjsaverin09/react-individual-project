import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Home from "./Pages/Home";
import AlbumInfo from "./Pages/AlbumSpotlight";
import Footer from "./compononents/Footer";

function App() {
const [searchId, setSearchId] = useState("");

  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path=":artist/:albumName" element={<AlbumInfo />}></Route>
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
