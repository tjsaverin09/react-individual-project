import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import Home from "./Pages/Home";
import AlbumInfo from "./Pages/AlbumSpotlight";
import Footer from "./compononents/Footer";
import Nav from "./compononents/Nav";
import axios from "axios";
import SearchLibrary from "./compononents/SearchLibrary";
import { SearchProvider } from "./hooks/SearchProvider";

const ApiContext = createContext();

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  async function fetchAlbumData(searchTerm) {
    if (!searchTerm || searchTerm.trim() === "") {
      console.warn("No search term provided");
      return;
    }
    try {
      const { response } = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(
          searchTerm
        )}&api_key=01a9bc49bbc9abed2dd1966234ac875e&format=json`
      );
      setData(response.results.albummatches.album);
      console.log("Search results:", response);
    } catch (error) {
      console.error("API call failed:", error);
    }
  }

  useEffect(() => {
    fetchAlbumData();
  }, []);

  return (
    <ApiContext.Provider value={data}>
        <Router>
      <SearchProvider>
          <>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/:searchLibrary" element={<SearchLibrary />}></Route>
              <Route path=":artist/:albumName" element={<AlbumInfo />}></Route>
            </Routes>
            <Footer />
          </>
      </SearchProvider>
        </Router>
    </ApiContext.Provider>
  );
}

export const useApiData = () => {
  return useContext(ApiContext);
};

export default App;
