import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./compononents/Nav";
import SearchLibrary from "./compononents/SearchLibrary";
import { useState } from 'react'
import Home from "./Pages/Home";
import AlbumInfo from "./Pages/AlbumInfo";

function App() {
const [searchId, setSearchId] = useState("");

  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path=":name/:artist" element={<AlbumInfo />}></Route>
        </Routes>
      </>
    </Router>
  );
}

export default App;
